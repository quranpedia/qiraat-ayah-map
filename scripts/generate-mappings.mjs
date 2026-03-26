/**
 * Generate pre-computed mapping files from the raw differences data.
 *
 * Outputs:
 *   data/mappings/hafs-to-{system}.json   — full ayah-by-ayah mapping from Hafs
 *   data/surah-counts/{system}.json       — per-surah ayah counts for each system
 *
 * Usage: node scripts/generate-mappings.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
const VERSION = pkg.version;

// Load source data — counting-systems.json is now an object keyed by ID
const countingSystems = JSON.parse(readFileSync(join(dataDir, 'counting-systems.json'), 'utf-8'));
const differencesFile = JSON.parse(readFileSync(join(dataDir, 'differences.json'), 'utf-8'));

// Hafs surah counts — hardcoded reference (the single source of truth)
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

mkdirSync(join(dataDir, 'mappings'), { recursive: true });
mkdirSync(join(dataDir, 'surah-counts'), { recursive: true });

// Build lookup: counting_system_id -> sorted items
const diffsBySystem = {};
for (const block of differencesFile.differences) {
  diffsBySystem[block.counting_system] = block.items.sort(
    (a, b) => a.surah - b.surah || a.hafs_ayah - b.hafs_ayah
  );
}

function getDiffsForSurah(systemId, surah) {
  return (diffsBySystem[systemId] || []).filter(d => d.surah === surah);
}

function calculateOffset(hafsAyah, sortedDiffs) {
  let offset = 0;
  for (const diff of sortedDiffs) {
    if (diff.hafs_ayah >= hafsAyah) break;
    if (diff.type === 'merge') offset--;
    else if (diff.type === 'split') offset++;
  }
  return hafsAyah + offset;
}

// Generate for each non-Kufan system
for (const [systemId, system] of Object.entries(countingSystems)) {
  if (systemId === 'kufi') continue;

  const mapping = {
    _version: VERSION,
    _description: `Pre-computed ayah mapping: Hafs (Kufan) → ${system.name_en} (${system.name_ar}).`,
    _source: 'kufi',
    _target: systemId,
    surahs: {}
  };

  const surahCounts = {
    _version: VERSION,
    _description: `Per-surah ayah counts for the ${system.name_en} (${system.name_ar}) counting system.`,
    _counting_system: systemId,
    _total_ayahs: 0,
    surahs: {}
  };

  for (let s = 1; s <= 114; s++) {
    const hafsCount = HAFS_COUNTS[s];
    const diffs = getDiffsForSurah(systemId, s);
    const sortedDiffs = [...diffs].sort((a, b) => a.hafs_ayah - b.hafs_ayah);

    let countOffset = 0;
    for (const d of sortedDiffs) {
      if (d.type === 'merge') countOffset--;
      else if (d.type === 'split') countOffset++;
    }
    const targetCount = hafsCount + countOffset;

    const surahMapping = {};

    for (let h = 1; h <= hafsCount; h++) {
      const isMerged = sortedDiffs.some(d => d.type === 'merge' && d.hafs_ayah === h);
      const isSplit = sortedDiffs.some(d => d.type === 'split' && d.hafs_ayah === h);

      if (isMerged) {
        const mergedInto = calculateOffset(h + 1, sortedDiffs);
        surahMapping[String(h)] = {
          target_ayah: mergedInto,
          status: 'merged'
        };
      } else if (isSplit) {
        const firstTarget = calculateOffset(h, sortedDiffs);
        surahMapping[String(h)] = {
          target_ayah: firstTarget,
          status: 'split',
          splits_into: [firstTarget, firstTarget + 1]
        };
      } else {
        const targetAyah = calculateOffset(h, sortedDiffs);
        surahMapping[String(h)] = {
          target_ayah: targetAyah,
          status: 'mapped'
        };
      }
    }

    mapping.surahs[String(s)] = {
      hafs_ayah_count: hafsCount,
      target_ayah_count: targetCount,
      ayahs: surahMapping
    };

    surahCounts.surahs[String(s)] = targetCount;
    surahCounts._total_ayahs += targetCount;
  }

  const mappingPath = join(dataDir, 'mappings', `hafs-to-${systemId}.json`);
  writeFileSync(mappingPath, JSON.stringify(mapping, null, 2) + '\n');
  console.log(`  Generated: mappings/hafs-to-${systemId}.json`);

  const countsPath = join(dataDir, 'surah-counts', `${systemId}.json`);
  writeFileSync(countsPath, JSON.stringify(surahCounts, null, 2) + '\n');
  console.log(`  Generated: surah-counts/${systemId}.json`);
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
console.log('  Generated: surah-counts/kufi.json');

console.log('\nAll mapping files generated successfully.');
