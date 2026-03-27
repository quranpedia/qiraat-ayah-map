/**
 * Generate curated classical-count attestation notes for systems where the
 * repository needs an explicit primary-riwaya decision beyond the raw
 * word-level differences table.
 *
 * Usage: node scripts/generate-classical-count-attestations.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoDir = join(__dirname, '..');
const dataDir = join(repoDir, 'data');

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const version = pkg.version;

function load(file) {
  return JSON.parse(readFileSync(join(dataDir, file), 'utf-8'));
}

function isCountedAsSplit(entry) {
  return Array.isArray(entry?.splits_into) && entry.splits_into.length > 1;
}

const makkiCounts = load('surah-counts/makki.json');
const makkiMapping = load('mappings/by-counting-system/kufi-to-makki.json');

const disputedBoundaries = [
  {
    surah: 78,
    hafs_ayah: 40,
    word: 'قريبا',
    primary_riwaya_decision: 'excluded',
    note_en: 'Abu Amr al-Dani reports this boundary for Basri only, not for Makki.',
    note_ar: 'نصَّ أبو عمرو الداني على عدِّ هذا الموضع للبصري فقط دون المكي.'
  },
  {
    surah: 91,
    hafs_ayah: 14,
    word: 'فعقروها',
    primary_riwaya_decision: 'excluded',
    note_en: 'Abu Amr al-Dani marks the Makki count here as disputed (بخلاف عنه); the repository excludes it to preserve the primary Makki total of 6219.',
    note_ar: 'ذكر أبو عمرو الداني عدَّ هذا الموضع للمكي بخلاف عنه؛ واعتمد المستودع تركه محافظةً على الجملة الأصلية للعدد المكي (6219).'
  }
].map(item => {
  const entry = makkiMapping.surahs[String(item.surah)]?.ayahs?.[String(item.hafs_ayah)];
  return {
    ...item,
    current_mapping_decision: isCountedAsSplit(entry) ? 'counted' : 'excluded'
  };
});

const primaryClassicalTotal = 6219;
const mappingTotal = makkiCounts._total_ayahs;

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
      policy_ar: 'يُقدَّم مجموع العدد المكي الذي رواه أبو عمرو الداني إذا لم يمكن بلوغ الجمل الأخرى إلا بعدِّ مواضع مختلف فيها.',
      disputed_boundaries: disputedBoundaries
    }
  }
};

writeFileSync(
  join(dataDir, 'classical-count-attestations.json'),
  JSON.stringify(document, null, 2) + '\n'
);

console.log('  Generated: data/classical-count-attestations.json');
