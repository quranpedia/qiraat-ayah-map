/**
 * Generate curated classical-count attestation notes for systems where the
 * repository needs an explicit primary-riwaya decision beyond the raw
 * word-level differences table.
 *
 * Usage: node scripts/generate-classical-count-attestations.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { distPath, repoDir } from './lib/repo-paths.mjs';

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const version = pkg.version;

function loadDist(file) {
  return JSON.parse(readFileSync(distPath(file), 'utf-8'));
}

function isCountedAsSplit(entry) {
  return Array.isArray(entry?.splits_into) && entry.splits_into.length > 1;
}

function withMappingDecision(items, mapping) {
  return items.map(item => {
    const entry = mapping.surahs[String(item.surah)]?.ayahs?.[String(item.hafs_ayah)];
    return {
      ...item,
      current_mapping_decision: isCountedAsSplit(entry) ? 'counted' : 'excluded'
    };
  });
}

const makkiCounts = loadDist('surah-counts/makki.json');
const makkiMapping = loadDist('mappings/by-counting-system/kufi-to-makki.json');

const disputedBoundaries = withMappingDecision([
  {
    surah: 78,
    hafs_ayah: 40,
    word: 'قريبا',
    primary_riwaya_decision: 'excluded',
    note_en: 'Abu Amr al-Dani reports this boundary for Basri only, not for Makki.',
    note_ar: 'نصَّ أبو عمرو الداني على عدِّ هذا الموضع للبصري فقط دون المكي.'
  },
  {
    surah: 91,
    hafs_ayah: 14,
    word: 'فعقروها',
    primary_riwaya_decision: 'excluded',
    note_en: 'Abu Amr al-Dani marks the Makki count here as disputed (بخلاف عنه); the repository excludes it to preserve the primary Makki total of 6219.',
    note_ar: 'ذكر أبو عمرو الداني عدَّ هذا الموضع للمكي بخلاف عنه؛ واعتمد المستودع تركه محافظةً على الجملة الأصلية للعدد المكي (6219).'
  }
], makkiMapping);

const primaryClassicalTotal = 6219;
const mappingTotal = makkiCounts._total_ayahs;

// First Madinan. Al-Dani gives 6217; the map derives 6214. The gap is four
// places where he says Abu Ja'far alone does not count the ending while Shayba
// and "the rest" do, and the map leaves madani-first out of all four. Reading
// him plainly would add all four and give 6218, which is not his 6217 either,
// so the reconstruction is left alone until a specialist settles it. Only the
// attested total is recorded here.
const madaniFirstCounts = loadDist('surah-counts/madani-first.json');
const madaniFirstMapping = loadDist('mappings/by-counting-system/kufi-to-madani-first.json');

const madaniFirstDisputed = withMappingDecision([
  { surah: 3, hafs_ayah: 92, word: 'تحبون' },
  { surah: 37, hafs_ayah: 167, word: 'ليقولون' },
  { surah: 80, hafs_ayah: 24, word: 'طعامه' },
  { surah: 81, hafs_ayah: 26, word: 'تذهبون' }
].map(item => ({
  ...item,
  primary_riwaya_decision: 'unresolved',
  note_en: 'Al-Dani says Abu Ja\'far alone does not count this ending and that Shayba and the rest do, which reads as including madani-first. The map excludes it. See data/book-boundary-evidence.json.',
  note_ar: 'نصَّ الداني على أن أبا جعفر وحده لا يعدُّ هذا الموضع وأن شيبة والباقين يعدّونه، وظاهره دخول المدني الأول فيهم؛ والخريطة تُخرجه. انظر data/book-boundary-evidence.json.'
})), madaniFirstMapping);

const madaniFirstPrimaryTotal = 6217;
const madaniFirstMappingTotal = madaniFirstCounts._total_ayahs;

const document = {
  _version: version,
  _description: 'Curated classical total-count attestations and explicit repository decisions for disputed counting-system totals.',
  systems: {
    makki: {
      status: mappingTotal === primaryClassicalTotal
        ? 'resolved_to_primary_riwaya'
        : 'drift_from_primary_riwaya',
      mapping_total_ayahs: mappingTotal,
      primary_classical_total_ayahs: primaryClassicalTotal,
      delta_from_primary: mappingTotal - primaryClassicalTotal,
      policy_en: 'Prefer the primary Makki total reported by Abu Amr al-Dani when later computed variants can be reproduced only by disputed boundary positions.',
      policy_ar: 'يُقدَّم مجموع العدد المكي الذي رواه أبو عمرو الداني إذا لم يمكن بلوغ الجمل الأخرى إلا بعدِّ مواضع مختلف فيها.',
      disputed_boundaries: disputedBoundaries
    },
    'madani-first': {
      status: madaniFirstMappingTotal === madaniFirstPrimaryTotal
        ? 'resolved_to_primary_riwaya'
        : 'drift_from_primary_riwaya',
      mapping_total_ayahs: madaniFirstMappingTotal,
      primary_classical_total_ayahs: madaniFirstPrimaryTotal,
      delta_from_primary: madaniFirstMappingTotal - madaniFirstPrimaryTotal,
      attested_by: [
        'البيان في عدّ آي القرآن، أبو عمرو الداني: «جميع عدد آي القرآن في المدني الأول ستة آلاف آية ومئتا آية وسبع عشرة آية»',
        'مصحف المدينة برواية الدوري، مجمع الملك فهد، طبعة 1436هـ: «وعدد آي القرآن على طريقتهم (6217)»',
        'الجداول المنشورة المتداولة لمذاهب العدّ الستة'
      ],
      policy_en: 'The 6217 total is well attested and is recorded here. The point-by-point reconstruction that would reach it is not settled, so the boundary map is left unchanged and the difference is reported rather than absorbed.',
      policy_ar: 'جملة 6217 ثابتة بالنقل وتُسجَّل هنا. وأما تحرير المواضع الذي يُبلَّغ به فغير محسوم، فتُركت الخريطة على حالها ويُبيَّن الفرق ولا يُطوى.',
      disputed_boundaries: madaniFirstDisputed
    }
  }
};

writeFileSync(
  distPath('classical-count-attestations.json'),
  JSON.stringify(document, null, 2) + '\n'
);

console.log('  Generated: dist/classical-count-attestations.json');
