/**
 * Generate pre-computed mapping files from the quranpedia.net differences data.
 *
 * Systems WITH ground truth mushaf data (madani-last, makki, basri) already
 * have their mapping files extracted from equals_ayah_id. This script only
 * generates mappings for systems WITHOUT mushafs (madani-first, dimashqi).
 *
 * It also generates surah-counts for ALL systems (reading from whatever
 * mapping files exist) and the Kufan reference counts.
 *
 * The mapping logic matches quranpedia.net's equals_ayah_id behavior:
 *   - offset=1 (merge): Kufan counts this as an ayah end, target does NOT.
 *     The target system has one fewer ayah boundary → cumulative offset decreases.
 *   - offset=-1 (split): Target counts an extra ayah end that Kufan does NOT.
 *     The target system has one more ayah boundary → cumulative offset increases.
 *
 * For a given Hafs ayah, the target ayah = hafs_ayah + cumulative_offset,
 * where cumulative_offset is the sum of all offsets at or before this ayah.
 *
 * When a merge occurs AT a specific hafs_ayah, that Hafs ayah's word is NOT
 * an ayah boundary in the target system — meaning the target absorbs it into
 * the previous target ayah.
 *
 * Usage: node scripts/generate-mappings.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
const VERSION = pkg.version;

const countingSystems = JSON.parse(readFileSync(join(dataDir, 'counting-systems.json'), 'utf-8'));
const differencesFile = JSON.parse(readFileSync(join(dataDir, 'differences.json'), 'utf-8'));

// Hafs surah counts (Kufan counting — the reference)
const HAFS_COUNTS = {
  1:7,2:286,3:200,4:176,5:120,6:165,7:206,8:75,9:129,10:109,
  11:123,12:111,13:43,14:52,15:99,16:128,17:111,18:110,19:98,20:135,
  21:112,22:78,23:118,24:64,25:77,26:227,27:93,28:88,29:69,30:60,
  31:34,32:30,33:73,34:54,35:45,36:83,37:182,38:88,39:75,40:85,
  41:54,42:53,43:89,44:59,45:37,46:35,47:38,48:29,49:18,50:45,
  51:60,52:49,53:62,54:55,55:78,56:96,57:29,58:22,59:24,60:13,
  61:14,62:11,63:11,64:18,65:12,66:12,67:30,68:52,69:52,70:44,
  71:28,72:28,73:20,74:56,75:40,76:31,77:50,78:40,79:46,80:42,
  81:29,82:19,83:36,84:25,85:22,86:17,87:19,88:26,89:30,90:20,
  91:15,92:21,93:11,94:8,95:8,96:19,97:5,98:8,99:8,100:11,
  101:11,102:8,103:3,104:9,105:5,106:4,107:7,108:3,109:6,110:3,
  111:5,112:4,113:5,114:6
};

// Systems that have ground truth mapping files from equals_ayah_id.
// These are NOT regenerated — only their surah-counts are derived.
const GROUND_TRUTH_SYSTEMS = ['madani-last', 'makki', 'basri'];

// Systems that need mappings computed from the differences table.
const COMPUTED_SYSTEMS = ['madani-first', 'dimashqi'];

mkdirSync(join(dataDir, 'mappings'), { recursive: true });
mkdirSync(join(dataDir, 'surah-counts'), { recursive: true });

// Build lookup: system_id -> { surah -> [sorted diffs] }
const diffsBySystem = {};
for (const block of differencesFile.differences) {
  const bysurah = {};
  for (const item of block.items) {
    if (!bysurah[item.surah]) bysurah[item.surah] = [];
    bysurah[item.surah].push(item);
  }
  // Sort each surah's diffs by hafs_ayah
  for (const s of Object.keys(bysurah)) {
    bysurah[s].sort((a, b) => a.hafs_ayah - b.hafs_ayah);
  }
  diffsBySystem[block.counting_system] = bysurah;
}

// Generate mapping files ONLY for computed systems (no ground truth)
for (const systemId of COMPUTED_SYSTEMS) {
  const system = countingSystems[systemId];
  if (!system) { console.error(`Unknown system: ${systemId}`); continue; }

  const systemDiffs = diffsBySystem[systemId] || {};

  const mapping = {
    _version: VERSION,
    _description: `Pre-computed ayah mapping: Hafs (Kufan) → ${system.name_en} (${system.name_ar}).`,
    _source: 'kufi',
    _target: systemId,
    surahs: {}
  };

  for (let s = 1; s <= 114; s++) {
    const hafsCount = HAFS_COUNTS[s];
    const diffs = systemDiffs[s] || [];

    // Build a map of hafs_ayah -> list of diffs at that ayah
    const diffsAtAyah = {};
    for (const d of diffs) {
      if (!diffsAtAyah[d.hafs_ayah]) diffsAtAyah[d.hafs_ayah] = [];
      diffsAtAyah[d.hafs_ayah].push(d);
    }

    let cumulativeOffset = 0;
    const surahMapping = {};

    for (let h = 1; h <= hafsCount; h++) {
      const ayahDiffs = diffsAtAyah[h] || [];

      // FIRST: compute target with CURRENT offset (before this ayah's diffs)
      const targetAyah = h + cumulativeOffset;

      // THEN: apply diffs to update offset for SUBSEQUENT ayahs
      let isMerged = false;
      let isSplit = false;

      for (const d of ayahDiffs) {
        if (d.type === 'merge') {
          cumulativeOffset--;
          isMerged = true;
        } else if (d.type === 'split') {
          cumulativeOffset++;
          isSplit = true;
        }
      }

      if (isMerged && isSplit) {
        surahMapping[String(h)] = {
          target_ayah: targetAyah,
          status: 'split',
          splits_into: [targetAyah, targetAyah + 1]
        };
      } else if (isMerged) {
        surahMapping[String(h)] = {
          target_ayah: targetAyah,
          status: 'merged'
        };
      } else if (isSplit) {
        surahMapping[String(h)] = {
          target_ayah: targetAyah,
          status: 'split',
          splits_into: [targetAyah, targetAyah + 1]
        };
      } else {
        surahMapping[String(h)] = {
          target_ayah: targetAyah,
          status: 'mapped'
        };
      }
    }

    const targetCount = hafsCount + cumulativeOffset;

    mapping.surahs[String(s)] = {
      hafs_ayah_count: hafsCount,
      target_ayah_count: targetCount,
      ayahs: surahMapping
    };

    // Reset for next surah
    cumulativeOffset = 0;
  }

  writeFileSync(
    join(dataDir, 'mappings', 'by-counting-system', `kufi-to-${systemId}.json`),
    JSON.stringify(mapping, null, 2) + '\n'
  );
  console.log(`  Generated: by-counting-system/kufi-to-${systemId}.json`);
}

// Generate surah-counts for ALL non-Kufan systems from their mapping files
for (const [systemId, system] of Object.entries(countingSystems)) {
  if (systemId === 'kufi') continue;

  const mappingPath = join(dataDir, 'mappings', 'by-counting-system', `kufi-to-${systemId}.json`);
  if (!existsSync(mappingPath)) {
    console.error(`  SKIP surah-counts for ${systemId}: no mapping file`);
    continue;
  }

  const mapping = JSON.parse(readFileSync(mappingPath, 'utf-8'));

  const surahCounts = {
    _version: VERSION,
    _description: `Per-surah ayah counts for the ${system.name_en} (${system.name_ar}) counting system.`,
    _counting_system: systemId,
    _total_ayahs: 0,
    surahs: {}
  };

  for (let s = 1; s <= 114; s++) {
    const surahData = mapping.surahs[String(s)];
    const targetCount = surahData.target_ayah_count;
    surahCounts.surahs[String(s)] = targetCount;
    surahCounts._total_ayahs += targetCount;
  }

  writeFileSync(
    join(dataDir, 'surah-counts', `${systemId}.json`),
    JSON.stringify(surahCounts, null, 2) + '\n'
  );
  console.log(`  Generated: surah-counts/${systemId}.json (total: ${surahCounts._total_ayahs})`);
}

// Generate Kufan counts
const kufiCounts = {
  _version: VERSION,
  _description: 'Per-surah ayah counts for the Kufan (الكوفي) counting system — the Hafs reference.',
  _counting_system: 'kufi',
  _total_ayahs: 0,
  surahs: {}
};
for (let s = 1; s <= 114; s++) {
  kufiCounts.surahs[String(s)] = HAFS_COUNTS[s];
  kufiCounts._total_ayahs += HAFS_COUNTS[s];
}
writeFileSync(join(dataDir, 'surah-counts', 'kufi.json'), JSON.stringify(kufiCounts, null, 2) + '\n');
console.log(`  Generated: surah-counts/kufi.json (total: ${kufiCounts._total_ayahs})`);

console.log('\nAll mapping files generated successfully.');
