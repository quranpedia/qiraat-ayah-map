/**
 * Generate forward mapping files from the differences table for systems that do
 * not already ship with curated forward mappings.
 *
 * Usage: node scripts/generate-mappings.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { buildRange, normalizeForwardMappingDocument } from './lib/mapping-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
const version = pkg.version;

const countingSystems = JSON.parse(readFileSync(join(dataDir, 'counting-systems.json'), 'utf-8'));
const differencesFile = JSON.parse(readFileSync(join(dataDir, 'differences.json'), 'utf-8'));

const hafsCounts = {
  1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109,
  11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98, 20: 135,
  21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88, 29: 69, 30: 60,
  31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85,
  41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18, 50: 45,
  51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29, 58: 22, 59: 24, 60: 13,
  61: 14, 62: 11, 63: 11, 64: 18, 65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44,
  71: 28, 72: 28, 73: 20, 74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42,
  81: 29, 82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20,
  91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11,
  101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6, 110: 3,
  111: 5, 112: 4, 113: 5, 114: 6
};

const computedSystems = ['madani-first', 'dimashqi'];

mkdirSync(join(dataDir, 'mappings', 'by-counting-system'), { recursive: true });
mkdirSync(join(dataDir, 'surah-counts'), { recursive: true });

function buildDiffLookup() {
  const lookup = {};

  for (const block of differencesFile.differences) {
    const bySurah = {};

    for (const item of block.items) {
      const surahKey = String(item.surah);
      const ayahKey = String(item.hafs_ayah);
      if (!bySurah[surahKey]) {
        bySurah[surahKey] = {};
      }
      if (!bySurah[surahKey][ayahKey]) {
        bySurah[surahKey][ayahKey] = [];
      }
      bySurah[surahKey][ayahKey].push(item);
    }

    lookup[block.counting_system] = bySurah;
  }

  return lookup;
}

function buildForwardEntry(startTargetAyah, splitCount, hasMerge) {
  const targets = buildRange(startTargetAyah, startTargetAyah + splitCount);

  if (targets.length === 1) {
    return {
      target_ayah: startTargetAyah,
      status: hasMerge ? 'merged' : 'mapped'
    };
  }

  return {
    target_ayah: startTargetAyah,
    status: 'split',
    splits_into: targets
  };
}

function generateComputedForwardMapping(systemId, systemDiffs) {
  const system = countingSystems[systemId];
  if (!system) {
    throw new Error(`Unknown system: ${systemId}`);
  }

  const mapping = {
    _version: version,
    _description: `Pre-computed ayah mapping: Hafs (Kufan) → ${system.name_en} (${system.name_ar}).`,
    _source: 'kufi',
    _target: systemId,
    surahs: {}
  };

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const hafsAyahCount = hafsCounts[surahNumber];
    const diffsByAyah = systemDiffs[String(surahNumber)] || {};
    const ayahs = {};
    let currentTargetAyah = 1;

    for (let hafsAyah = 1; hafsAyah <= hafsAyahCount; hafsAyah += 1) {
      const entries = diffsByAyah[String(hafsAyah)] || [];
      const splitCount = entries.filter(entry => entry.type === 'split').length;
      const mergeCount = entries.filter(entry => entry.type === 'merge').length;

      if (mergeCount > 1) {
        throw new Error(
          `More than one merge at ${systemId} ${surahNumber}:${hafsAyah}. This dataset expects at most one end-of-ayah merge.`
        );
      }

      const hasMerge = mergeCount === 1;
      ayahs[String(hafsAyah)] = buildForwardEntry(currentTargetAyah, splitCount, hasMerge);
      currentTargetAyah += splitCount + (hasMerge ? 0 : 1);
    }

    mapping.surahs[String(surahNumber)] = {
      hafs_ayah_count: hafsAyahCount,
      target_ayah_count: currentTargetAyah - 1,
      ayahs
    };
  }

  return normalizeForwardMappingDocument(mapping);
}

const diffsBySystem = buildDiffLookup();

for (const systemId of computedSystems) {
  const mapping = generateComputedForwardMapping(systemId, diffsBySystem[systemId] || {});
  const outputPath = join(dataDir, 'mappings', 'by-counting-system', `kufi-to-${systemId}.json`);
  writeFileSync(outputPath, JSON.stringify(mapping, null, 2) + '\n');
  console.log(`  Generated: mappings/by-counting-system/kufi-to-${systemId}.json`);
}

for (const [systemId, system] of Object.entries(countingSystems)) {
  if (systemId === 'kufi') {
    continue;
  }

  const mappingPath = join(dataDir, 'mappings', 'by-counting-system', `kufi-to-${systemId}.json`);
  if (!existsSync(mappingPath)) {
    console.error(`  SKIP surah-counts for ${systemId}: missing mapping file`);
    continue;
  }

  const mapping = normalizeForwardMappingDocument(JSON.parse(readFileSync(mappingPath, 'utf-8')));
  const surahCounts = {
    _version: version,
    _description: `Per-surah ayah counts for the ${system.name_en} (${system.name_ar}) counting system.`,
    _counting_system: systemId,
    _total_ayahs: 0,
    surahs: {}
  };

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const key = String(surahNumber);
    const targetAyahCount = mapping.surahs[key].target_ayah_count;
    surahCounts.surahs[key] = targetAyahCount;
    surahCounts._total_ayahs += targetAyahCount;
  }

  writeFileSync(
    join(dataDir, 'surah-counts', `${systemId}.json`),
    JSON.stringify(surahCounts, null, 2) + '\n'
  );
  console.log(`  Generated: surah-counts/${systemId}.json (total: ${surahCounts._total_ayahs})`);
}

const kufiCounts = {
  _version: version,
  _description: 'Per-surah ayah counts for the Kufan (الكوفي) counting system — the Hafs reference.',
  _counting_system: 'kufi',
  _total_ayahs: 0,
  surahs: {}
};

for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
  const key = String(surahNumber);
  kufiCounts.surahs[key] = hafsCounts[surahNumber];
  kufiCounts._total_ayahs += hafsCounts[surahNumber];
}

writeFileSync(join(dataDir, 'surah-counts', 'kufi.json'), JSON.stringify(kufiCounts, null, 2) + '\n');
console.log('  Generated: surah-counts/kufi.json');
