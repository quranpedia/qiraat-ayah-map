/**
 * Validation tests for qiraat-ayah-map data.
 *
 * Usage: node tests/validate.mjs
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

function load(file) {
  return JSON.parse(readFileSync(join(dataDir, file), 'utf-8'));
}

function buildRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getTargets(entry) {
  return Array.isArray(entry.splits_into) ? entry.splits_into : [entry.target_ayah];
}

function getMergeFlag(surah, hafsAyah) {
  if (hafsAyah >= surah.hafs_ayah_count) {
    return false;
  }

  const current = surah.ayahs[String(hafsAyah)];
  const next = surah.ayahs[String(hafsAyah + 1)];
  const targets = getTargets(current);
  return targets[targets.length - 1] === next.target_ayah;
}

function buildDifferenceAggregate(items) {
  const bySurah = {};
  let mergeCount = 0;
  let splitCount = 0;

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    bySurah[String(surahNumber)] = {};
  }

  for (const item of items) {
    const surahKey = String(item.surah);
    const ayahKey = String(item.hafs_ayah);
    const count = Number.isInteger(item.count) ? item.count : 1;

    if (!bySurah[surahKey][ayahKey]) {
      bySurah[surahKey][ayahKey] = {
        merge: 0,
        split: 0
      };
    }

    bySurah[surahKey][ayahKey][item.type] += count;

    if (item.type === 'merge') {
      mergeCount += count;
    } else {
      splitCount += count;
    }
  }

  return {
    bySurah,
    mergeCount,
    splitCount
  };
}

function buildBoundaryAggregateFromForwardMapping(mapping) {
  const items = [];

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const surah = mapping.surahs[String(surahNumber)];

    for (let hafsAyah = 1; hafsAyah <= surah.hafs_ayah_count; hafsAyah += 1) {
      const entry = surah.ayahs[String(hafsAyah)];
      const targets = getTargets(entry);
      const splitCount = targets.length - 1;
      const mergeCount = getMergeFlag(surah, hafsAyah) ? 1 : 0;

      if (mergeCount > 0) {
        items.push({
          surah: surahNumber,
          hafs_ayah: hafsAyah,
          type: 'merge',
          count: mergeCount
        });
      }

      if (splitCount > 0) {
        items.push({
          surah: surahNumber,
          hafs_ayah: hafsAyah,
          type: 'split',
          count: splitCount
        });
      }
    }
  }

  return buildDifferenceAggregate(items);
}

function buildExpectedReconciliation(wordLevelAggregate, mappingAggregate, kufiCountsFile, systemTotal) {
  const mismatchedSurahs = [];

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const surahKey = String(surahNumber);
    const hafsAyahCount = kufiCountsFile.surahs[surahKey];
    const wordLevelByAyah = wordLevelAggregate.bySurah[surahKey];
    const mappingByAyah = mappingAggregate.bySurah[surahKey];

    let wordLevelMerge = 0;
    let wordLevelSplit = 0;
    let mappingMerge = 0;
    let mappingSplit = 0;
    const mismatchedHafsAyahs = [];

    for (let hafsAyah = 1; hafsAyah <= hafsAyahCount; hafsAyah += 1) {
      const ayahKey = String(hafsAyah);
      const wordLevelCounts = wordLevelByAyah[ayahKey] || { merge: 0, split: 0 };
      const mappingCounts = mappingByAyah[ayahKey] || { merge: 0, split: 0 };

      wordLevelMerge += wordLevelCounts.merge;
      wordLevelSplit += wordLevelCounts.split;
      mappingMerge += mappingCounts.merge;
      mappingSplit += mappingCounts.split;

      if (
        wordLevelCounts.merge !== mappingCounts.merge
        || wordLevelCounts.split !== mappingCounts.split
      ) {
        mismatchedHafsAyahs.push({
          hafs_ayah: hafsAyah,
          word_level: {
            merge_count: wordLevelCounts.merge,
            split_count: wordLevelCounts.split
          },
          mapping: {
            merge_count: mappingCounts.merge,
            split_count: mappingCounts.split
          }
        });
      }
    }

    if (mismatchedHafsAyahs.length > 0) {
      mismatchedSurahs.push({
        surah: surahNumber,
        word_level: {
          merge_count: wordLevelMerge,
          split_count: wordLevelSplit,
          target_ayah_count: hafsAyahCount - wordLevelMerge + wordLevelSplit
        },
        mapping: {
          merge_count: mappingMerge,
          split_count: mappingSplit,
          target_ayah_count: hafsAyahCount - mappingMerge + mappingSplit
        },
        mismatched_hafs_ayahs: mismatchedHafsAyahs
      });
    }
  }

  return {
    is_exact_match: mismatchedSurahs.length === 0,
    word_level_merge_count: wordLevelAggregate.mergeCount,
    word_level_split_count: wordLevelAggregate.splitCount,
    word_level_total_ayahs: kufiCountsFile._total_ayahs - wordLevelAggregate.mergeCount + wordLevelAggregate.splitCount,
    mapping_merge_count: mappingAggregate.mergeCount,
    mapping_split_count: mappingAggregate.splitCount,
    mapping_total_ayahs: systemTotal,
    mismatched_surahs: mismatchedSurahs
  };
}

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    passed += 1;
  } else {
    failed += 1;
    console.error(`  FAIL: ${label}`);
  }
}

function section(label) {
  console.log(`\n--- ${label} ---`);
}

const countingSystems = load('counting-systems.json');
const qiraat = load('qiraat.json');
const differences = load('differences.json');
const boundaryEvents = load('boundary-events.json');
const differencesReconciliation = load('differences-reconciliation.json');
const classicalCountAttestations = load('classical-count-attestations.json');

const systemIds = Object.keys(countingSystems);
const nonKufiIds = systemIds.filter(id => id !== 'kufi');
const allRawis = Object.entries(qiraat)
  .flatMap(([qiraaSlug, qiraa]) => Object.keys(qiraa.rawis).map(rawiSlug => ({
    rawiSlug,
    qiraaSlug,
    countingSystem: qiraa.counting_system
  })));
const nonKufiRawis = allRawis.filter(item => item.countingSystem !== 'kufi');
const knownMushafIds = new Map([
  ['hafs', 1],
  ['warsh', 4],
  ['bazzi', 5],
  ['duri', 6],
  ['qalun', 7],
  ['qunbul', 8],
  ['shuba', 9],
  ['susi', 10]
]);
const boundaryBlocks = new Map(boundaryEvents.differences.map(block => [block.counting_system, block]));
const differenceBlocks = new Map(differences.differences.map(block => [block.counting_system, block]));

section('Structural Integrity');

assert(systemIds.length === 6, 'Exactly 6 counting systems');
assert(Object.keys(qiraat).length === 10, 'Exactly 10 Qiraat');

for (const [slug, qiraa] of Object.entries(qiraat)) {
  assert(Object.keys(qiraa.rawis).length === 2, `Qiraa "${slug}" has 2 rawis`);
}

assert(allRawis.length === 20, '20 total rawis across all Qiraat');

for (const id of systemIds) {
  assert(!id.includes('_'), `System ID "${id}" uses hyphens only`);
}
for (const slug of Object.keys(qiraat)) {
  assert(!slug.includes('_'), `Qiraa slug "${slug}" uses hyphens only`);
}

for (const block of differences.differences) {
  assert(!block.counting_system.includes('_'), `Diff system "${block.counting_system}" uses hyphens only`);
  for (const item of block.items) {
    assert(item.surah >= 1 && item.surah <= 114, `Valid surah ${item.surah}`);
    assert(item.hafs_ayah >= 1, `Valid hafs_ayah ${item.hafs_ayah}`);
    assert(item.type === 'merge' || item.type === 'split', `Valid type "${item.type}"`);
    assert(typeof item.word === 'string' && item.word.length > 0, 'Has diff word');
  }
}

assert(boundaryEvents._reference_system === 'kufi', 'boundary-events.json uses kufi as reference system');
assert(typeof boundaryEvents._version === 'string', 'boundary-events.json has _version');

for (const block of boundaryEvents.differences) {
  assert(!block.counting_system.includes('_'), `Boundary system "${block.counting_system}" uses hyphens only`);
  assert(typeof block._source_mapping_file === 'string', `${block.counting_system}: boundary block has source mapping file`);
  for (const item of block.items) {
    assert(item.surah >= 1 && item.surah <= 114, `Boundary item has valid surah ${item.surah}`);
    assert(item.hafs_ayah >= 1, `Boundary item has valid hafs_ayah ${item.hafs_ayah}`);
    assert(item.type === 'merge' || item.type === 'split', `Boundary item has valid type "${item.type}"`);
    assert(Number.isInteger(item.count) && item.count >= 1, 'Boundary item has positive integer count');
  }
}

assert(differencesReconciliation._reference_system === 'kufi', 'differences-reconciliation.json uses kufi as reference system');
assert(typeof differencesReconciliation._version === 'string', 'differences-reconciliation.json has _version');

section('Cross-Reference Integrity');

for (const [slug, qiraa] of Object.entries(qiraat)) {
  assert(systemIds.includes(qiraa.counting_system), `"${slug}".counting_system exists`);
}

for (const [systemId, system] of Object.entries(countingSystems)) {
  for (const slug of system.used_by_qiraat) {
    assert(slug in qiraat, `${systemId}.used_by_qiraat includes known qiraa "${slug}"`);
  }
}

for (const systemId of nonKufiIds) {
  assert(differenceBlocks.has(systemId), `differences.json contains block for ${systemId}`);
  assert(boundaryBlocks.has(systemId), `boundary-events.json contains block for ${systemId}`);
  assert(systemId in differencesReconciliation.systems, `differences-reconciliation.json contains system ${systemId}`);
}

section('Kufan Total Ayah Count');

const kufiCountsFile = load('surah-counts/kufi.json');
assert(kufiCountsFile._total_ayahs === 6236, 'Kufan total = 6236');

let kufiSum = 0;
for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
  kufiSum += kufiCountsFile.surahs[String(surahNumber)];
}
assert(kufiSum === 6236, 'Kufan surah-count sum = 6236');

section('Counting System Totals');

for (const [systemId, system] of Object.entries(countingSystems)) {
  const surahCountsFile = load(`surah-counts/${systemId}.json`);
  assert(surahCountsFile._counting_system === systemId, `${systemId}: surah-counts file id matches`);
  assert(surahCountsFile._total_ayahs === system.total_ayahs, `${systemId}: declared total matches counting-systems.json`);

  let sum = 0;
  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    sum += surahCountsFile.surahs[String(surahNumber)];
  }
  assert(sum === surahCountsFile._total_ayahs, `${systemId}: surah-counts sum matches declared total`);

  if (systemId === 'kufi') {
    continue;
  }

  const mapping = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const mappingCount = mapping.surahs[String(surahNumber)].target_ayah_count;
    const countFileCount = surahCountsFile.surahs[String(surahNumber)];
    assert(mappingCount === countFileCount, `${systemId}: surah ${surahNumber} mapping count matches surah-counts`);
  }
}

section('Al-Fatiha — All 7 ayahs');

for (const systemId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  assert(mapping.surahs['1'].target_ayah_count === 7, `${systemId}: Fatiha target count = 7`);
}

section('Basmalah handling in Fatiha');

for (const systemId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  const fatiha = mapping.surahs['1'];
  const firstAyah = fatiha.ayahs['1'];

  if (firstAyah.status === 'merged') {
    let merges = 0;
    let splits = 0;
    for (const entry of Object.values(fatiha.ayahs)) {
      if (entry.status === 'merged') {
        merges += 1;
      }
      if (entry.status === 'split') {
        splits += 1;
      }
    }
    assert(merges === splits, `${systemId}: Fatiha merges = splits`);
    assert(fatiha.ayahs['2'].target_ayah === 1, `${systemId}: Hafs 1:2 maps to target 1`);
  } else {
    assert(firstAyah.status === 'mapped', `${systemId}: Fatiha basmalah is mapped`);
    assert(firstAyah.target_ayah === 1, `${systemId}: Fatiha basmalah target = 1`);
  }
}

for (const systemId of ['madani-first', 'madani-last', 'basri', 'dimashqi']) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  assert(mapping.surahs['1'].ayahs['1'].status === 'merged', `${systemId}: Basmalah merged in Fatiha`);
}

{
  const mapping = load('mappings/by-counting-system/kufi-to-makki.json');
  assert(mapping.surahs['1'].ayahs['1'].status === 'mapped', 'makki: Basmalah remains a standalone ayah in Fatiha');
}

section('Surah 2 — per-system target counts');

const expectedBaqarahCounts = {
  'madani-first': 285,
  'madani-last': 285,
  makki: 285,
  basri: 287,
  dimashqi: 285
};

for (const systemId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  const baqarah = mapping.surahs['2'];
  assert(baqarah.hafs_ayah_count === 286, `${systemId}: Surah 2 Hafs count = 286`);
  assert(baqarah.target_ayah_count === expectedBaqarahCounts[systemId], `${systemId}: Surah 2 target count = ${expectedBaqarahCounts[systemId]}`);
}

section('Last Madinan scholarly totals');

{
  const counts = load('surah-counts/madani-last.json');
  const expected = {
    16: 128,
    67: 31,
    91: 15
  };

  assert(counts._total_ayahs === 6214, 'madani-last: total ayahs = 6214');
  for (const [surahNumber, targetCount] of Object.entries(expected)) {
    assert(counts.surahs[surahNumber] === targetCount, `madani-last: Surah ${surahNumber} target count = ${targetCount}`);
  }
}

section('Basran scholarly totals');

{
  const counts = load('surah-counts/basri.json');
  const expected = {
    1: 7,
    2: 287,
    3: 200,
    4: 175,
    5: 123,
    6: 166
  };

  assert(counts._total_ayahs === 6204, 'basri: total ayahs = 6204');
  for (const [surahNumber, targetCount] of Object.entries(expected)) {
    assert(counts.surahs[surahNumber] === targetCount, `basri: Surah ${surahNumber} target count = ${targetCount}`);
  }
}

section('Makkan scholarly totals');

{
  const counts = load('surah-counts/makki.json');
  const mapping = load('mappings/by-counting-system/kufi-to-makki.json');
  const expected = {
    72: 28,
    78: 40,
    91: 15
  };

  assert(counts._total_ayahs === 6219, 'makki: total ayahs = 6219');
  for (const [surahNumber, targetCount] of Object.entries(expected)) {
    assert(counts.surahs[surahNumber] === targetCount, `makki: Surah ${surahNumber} target count = ${targetCount}`);
  }

  assert(mapping.surahs['78'].ayahs['40'].status === 'mapped', 'makki: 78:40 is not counted as an extra ayah');
  assert(mapping.surahs['91'].ayahs['14'].status === 'mapped', 'makki: 91:14 is not counted as an extra ayah');
}

section('Classical count attestation file');

{
  const makki = classicalCountAttestations.systems.makki;
  assert(typeof classicalCountAttestations._version === 'string', 'classical-count-attestations.json: has _version');
  assert(makki.status === 'resolved_to_primary_riwaya', 'classical-count-attestations.json: makki status resolved_to_primary_riwaya');
  assert(makki.mapping_total_ayahs === 6219, 'classical-count-attestations.json: makki mapping total = 6219');
  assert(makki.primary_classical_total_ayahs === 6219, 'classical-count-attestations.json: makki primary classical total = 6219');
  assert(makki.delta_from_primary === 0, 'classical-count-attestations.json: makki delta = 0');
  assert(Array.isArray(makki.disputed_boundaries) && makki.disputed_boundaries.length === 2, 'classical-count-attestations.json: makki has 2 disputed boundaries');

  const boundaryKey = item => `${item.surah}:${item.hafs_ayah}:${item.word}`;
  const boundaries = new Map(makki.disputed_boundaries.map(item => [boundaryKey(item), item]));

  assert(boundaries.get('78:40:قريبا')?.current_mapping_decision === 'excluded', 'classical-count-attestations.json: makki 78:40 currently excluded');
  assert(boundaries.get('91:14:فعقروها')?.current_mapping_decision === 'excluded', 'classical-count-attestations.json: makki 91:14 currently excluded');
}

section('الم surahs — الم merged in all non-Kufan systems');

for (const systemId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  for (const surahNumber of [2, 3, 29, 30, 31, 32]) {
    const surah = mapping.surahs[String(surahNumber)];
    const a1Merged = surah.ayahs['1'].status === 'merged';
    const a2Merged = surah.ayahs['2'].status === 'merged';
    assert(a1Merged || a2Merged, `${systemId}: Surah ${surahNumber} merges الم in ayah 1 or 2`);
  }
}

section('Forward Mapping Files');

for (const systemId of nonKufiIds) {
  const filename = `kufi-to-${systemId}.json`;
  let mapping;
  try {
    mapping = load(`mappings/by-counting-system/${filename}`);
  } catch {
    assert(false, `Missing mappings/by-counting-system/${filename}`);
    continue;
  }

  assert(mapping._source === 'kufi', `${filename}: source = kufi`);
  assert(mapping._target === systemId, `${filename}: target = ${systemId}`);
  assert(typeof mapping._version === 'string', `${filename}: has _version`);
  assert(Object.keys(mapping.surahs).length === 114, `${filename}: contains 114 surahs`);
  assert(mapping.surahs['1'].hafs_ayah_count === 7 && mapping.surahs['1'].target_ayah_count === 7, `${filename}: Fatiha is 7/7`);

  for (const [surahNumber, surah] of Object.entries(mapping.surahs)) {
    assert(Object.keys(surah.ayahs).length === surah.hafs_ayah_count, `${filename}: Surah ${surahNumber} has one entry per Hafs ayah`);

    const coveredTargets = new Set();
    for (const [hafsAyahStr, entry] of Object.entries(surah.ayahs)) {
      const hafsAyah = Number.parseInt(hafsAyahStr, 10);
      const targets = getTargets(entry);
      const expectedMergesWithNext = getMergeFlag(surah, hafsAyah);

      assert(Number.isInteger(entry.target_ayah), `${filename}: ${surahNumber}:${hafsAyah} has integer target_ayah`);
      assert(entry.target_ayah >= 1 && entry.target_ayah <= surah.target_ayah_count, `${filename}: ${surahNumber}:${hafsAyah} target in range`);
      assert(!('merges_with_next' in entry) || entry.merges_with_next === true, `${filename}: ${surahNumber}:${hafsAyah} merges_with_next is only stored as true`);
      assert(Boolean(entry.merges_with_next) === expectedMergesWithNext, `${filename}: ${surahNumber}:${hafsAyah} merges_with_next matches target overlap`);

      if (entry.status === 'split') {
        assert(Array.isArray(entry.splits_into) && entry.splits_into.length >= 2, `${filename}: ${surahNumber}:${hafsAyah} split has splits_into`);
        if (Array.isArray(entry.splits_into) && entry.splits_into.length >= 2) {
          const expectedTargets = buildRange(entry.target_ayah, entry.target_ayah + entry.splits_into.length - 1);
          assert(JSON.stringify(entry.splits_into) === JSON.stringify(expectedTargets), `${filename}: ${surahNumber}:${hafsAyah} split targets are contiguous`);
        }
      } else {
        assert(!('splits_into' in entry), `${filename}: ${surahNumber}:${hafsAyah} non-split has no splits_into`);
      }

      if (entry.status === 'merged') {
        assert(targets.length === 1, `${filename}: ${surahNumber}:${hafsAyah} merged entry covers exactly one target number`);
        assert(entry.merges_with_next === true, `${filename}: ${surahNumber}:${hafsAyah} merged entry is explicitly marked`);
      }

      for (const target of targets) {
        assert(target >= 1 && target <= surah.target_ayah_count, `${filename}: ${surahNumber}:${hafsAyah} covers target ${target} in range`);
        coveredTargets.add(target);
      }
    }

    assert(coveredTargets.size === surah.target_ayah_count, `${filename}: Surah ${surahNumber} covers every target ayah exactly somewhere`);
  }
}

section('Reverse Mapping Files');

for (const systemId of nonKufiIds) {
  const filename = `${systemId}-to-kufi.json`;
  let reverse;
  try {
    reverse = load(`mappings/by-counting-system/${filename}`);
  } catch {
    assert(false, `Missing mappings/by-counting-system/${filename}`);
    continue;
  }

  const forward = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);

  assert(reverse._source === systemId, `${filename}: source = ${systemId}`);
  assert(reverse._target === 'kufi', `${filename}: target = kufi`);
  assert(typeof reverse._version === 'string', `${filename}: has _version`);
  assert(Object.keys(reverse.surahs).length === 114, `${filename}: contains 114 surahs`);

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const key = String(surahNumber);
    const reverseSurah = reverse.surahs[key];
    const forwardSurah = forward.surahs[key];
    assert(reverseSurah.source_ayah_count === forwardSurah.target_ayah_count, `${filename}: Surah ${surahNumber} source count matches forward target count`);
    assert(reverseSurah.hafs_ayah_count === forwardSurah.hafs_ayah_count, `${filename}: Surah ${surahNumber} Hafs count matches forward`);
    assert(Object.keys(reverseSurah.ayahs).length === reverseSurah.source_ayah_count, `${filename}: Surah ${surahNumber} has one entry per source ayah`);

    for (let targetAyah = 1; targetAyah <= reverseSurah.source_ayah_count; targetAyah += 1) {
      const entry = reverseSurah.ayahs[String(targetAyah)];

      assert(!!entry, `${filename}: Surah ${surahNumber} has entry for target ayah ${targetAyah}`);
      if (!entry) {
        continue;
      }

      assert(Number.isInteger(entry.hafs_ayah), `${filename}: ${surahNumber}:${targetAyah} has integer hafs_ayah`);
      assert(entry.hafs_ayah >= 1 && entry.hafs_ayah <= reverseSurah.hafs_ayah_count, `${filename}: ${surahNumber}:${targetAyah} hafs_ayah in range`);

      const forwardTargets = getTargets(forwardSurah.ayahs[String(entry.hafs_ayah)]);
      assert(forwardTargets.includes(targetAyah), `${filename}: ${surahNumber}:${targetAyah} round-trips through forward mapping`);

      if (entry.status === 'covers_multiple') {
        assert(Array.isArray(entry.hafs_ayahs) && entry.hafs_ayahs.length >= 2, `${filename}: ${surahNumber}:${targetAyah} covers_multiple has hafs_ayahs`);
        if (Array.isArray(entry.hafs_ayahs) && entry.hafs_ayahs.length >= 2) {
          const expected = buildRange(entry.hafs_ayahs[0], entry.hafs_ayahs[0] + entry.hafs_ayahs.length - 1);
          assert(JSON.stringify(entry.hafs_ayahs) === JSON.stringify(expected), `${filename}: ${surahNumber}:${targetAyah} hafs_ayahs are contiguous`);
        }
      }
    }
  }
}

section('Boundary Events File');

for (const systemId of nonKufiIds) {
  const block = boundaryBlocks.get(systemId);
  const forward = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  const aggregateFromFile = buildDifferenceAggregate(block.items);
  const aggregateFromForward = buildBoundaryAggregateFromForwardMapping(forward);
  const totalFromBoundaryFile = kufiCountsFile._total_ayahs - aggregateFromFile.mergeCount + aggregateFromFile.splitCount;

  assert(block._source_mapping_file === `mappings/by-counting-system/kufi-to-${systemId}.json`, `${systemId}: boundary block points at the correct source mapping`);
  assert(totalFromBoundaryFile === countingSystems[systemId].total_ayahs, `${systemId}: boundary events total matches declared system total`);
  assert(aggregateFromFile.mergeCount === aggregateFromForward.mergeCount, `${systemId}: boundary merge total matches forward mapping`);
  assert(aggregateFromFile.splitCount === aggregateFromForward.splitCount, `${systemId}: boundary split total matches forward mapping`);

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const surahKey = String(surahNumber);
    const hafsAyahCount = kufiCountsFile.surahs[surahKey];

    for (let hafsAyah = 1; hafsAyah <= hafsAyahCount; hafsAyah += 1) {
      const ayahKey = String(hafsAyah);
      const fromFile = aggregateFromFile.bySurah[surahKey][ayahKey] || { merge: 0, split: 0 };
      const fromForward = aggregateFromForward.bySurah[surahKey][ayahKey] || { merge: 0, split: 0 };
      assert(fromFile.merge === fromForward.merge, `${systemId}: boundary merge count matches forward at ${surahNumber}:${hafsAyah}`);
      assert(fromFile.split === fromForward.split, `${systemId}: boundary split count matches forward at ${surahNumber}:${hafsAyah}`);
    }
  }
}

section('Differences Reconciliation File');

for (const systemId of nonKufiIds) {
  const report = differencesReconciliation.systems[systemId];
  assert(report.is_exact_match === true, `${systemId}: generated forward mapping fully reconciles with differences.json`);
  const expected = buildExpectedReconciliation(
    buildDifferenceAggregate(differenceBlocks.get(systemId).items),
    buildDifferenceAggregate(boundaryBlocks.get(systemId).items),
    kufiCountsFile,
    countingSystems[systemId].total_ayahs
  );

  assert(report.is_exact_match === expected.is_exact_match, `${systemId}: reconciliation exact-match flag is correct`);
  assert(report.word_level_merge_count === expected.word_level_merge_count, `${systemId}: reconciliation word-level merge total is correct`);
  assert(report.word_level_split_count === expected.word_level_split_count, `${systemId}: reconciliation word-level split total is correct`);
  assert(report.word_level_total_ayahs === expected.word_level_total_ayahs, `${systemId}: reconciliation word-level total is correct`);
  assert(report.mapping_merge_count === expected.mapping_merge_count, `${systemId}: reconciliation mapping merge total is correct`);
  assert(report.mapping_split_count === expected.mapping_split_count, `${systemId}: reconciliation mapping split total is correct`);
  assert(report.mapping_total_ayahs === expected.mapping_total_ayahs, `${systemId}: reconciliation mapping total is correct`);
  assert(report.mismatched_surahs.length === expected.mismatched_surahs.length, `${systemId}: reconciliation mismatch count is correct`);
  assert(JSON.stringify(report.mismatched_surahs) === JSON.stringify(expected.mismatched_surahs), `${systemId}: reconciliation mismatch details are exact`);
}

section('Surah Counts Files');

for (const systemId of systemIds) {
  const filename = `${systemId}.json`;
  let counts;
  try {
    counts = load(`surah-counts/${filename}`);
  } catch {
    assert(false, `Missing surah-counts/${filename}`);
    continue;
  }

  assert(counts._counting_system === systemId, `${filename}: _counting_system matches file name`);
  assert(typeof counts._version === 'string', `${filename}: has _version`);
  assert(Object.keys(counts.surahs).length === 114, `${filename}: contains 114 surahs`);
  assert(counts.surahs['1'] === 7, `${filename}: Fatiha count = 7`);
}

section('Rawi Files');

const rawisDir = join(dataDir, 'rawis');
const rawiFilesOnDisk = new Set(readdirSync(rawisDir).filter(filename => filename.endsWith('.json')));
assert(rawiFilesOnDisk.size === 20, 'There are 20 rawi metadata files');

for (const { rawiSlug, qiraaSlug, countingSystem } of allRawis) {
  const filename = `${rawiSlug}.json`;
  assert(rawiFilesOnDisk.has(filename), `rawis/${filename} exists`);
  if (!rawiFilesOnDisk.has(filename)) {
    continue;
  }

  const rawi = load(`rawis/${filename}`);
  assert(rawi._rawi === rawiSlug, `${filename}: _rawi matches slug`);
  assert(rawi._qiraa === qiraaSlug, `${filename}: _qiraa matches qiraat.json`);
  assert(rawi._counting_system === countingSystem, `${filename}: _counting_system matches qiraat.json`);

  if (knownMushafIds.has(rawiSlug)) {
    assert(rawi._mushaf_id === knownMushafIds.get(rawiSlug), `${filename}: known _mushaf_id is correct`);
  } else {
    assert(rawi._mushaf_id === null, `${filename}: unknown _mushaf_id is null`);
  }

  if (countingSystem === 'kufi') {
    assert(rawi._mapping_file === null, `${filename}: kufi rawi has no external mapping file`);
  } else {
    const expectedPath = `mappings/by-counting-system/kufi-to-${countingSystem}.json`;
    assert(rawi._mapping_file === expectedPath, `${filename}: _mapping_file points at counting-system mapping`);
    assert(existsSync(join(dataDir, rawi._mapping_file)), `${filename}: _mapping_file exists`);
  }
}

section('Rawi Alias Mapping Files');

const rawiMappingsDir = join(dataDir, 'mappings', 'by-rawi');
const rawiAliasFiles = new Set(readdirSync(rawiMappingsDir).filter(filename => filename.endsWith('.json')));
assert(rawiAliasFiles.size === nonKufiRawis.length * 2, 'There are 2 alias mapping files for every non-Kufi rawi');

for (const { rawiSlug, countingSystem } of nonKufiRawis) {
  const forwardAlias = `hafs-to-${rawiSlug}.json`;
  const reverseAlias = `${rawiSlug}-to-hafs.json`;
  assert(rawiAliasFiles.has(forwardAlias), `mappings/by-rawi/${forwardAlias} exists`);
  assert(rawiAliasFiles.has(reverseAlias), `mappings/by-rawi/${reverseAlias} exists`);

  const forward = load(`mappings/by-rawi/${forwardAlias}`);
  const reverse = load(`mappings/by-rawi/${reverseAlias}`);
  assert(forward._rawi === rawiSlug, `${forwardAlias}: _rawi matches`);
  assert(forward._source === 'kufi' && forward._target === countingSystem, `${forwardAlias}: source/target are correct`);
  assert(reverse._rawi === rawiSlug, `${reverseAlias}: _rawi matches`);
  assert(reverse._source === countingSystem && reverse._target === 'kufi', `${reverseAlias}: source/target are correct`);
}

section('Cleanup');

assert(!existsSync(join(dataDir, 'hafs-surah-ayah-counts.json')), 'Deprecated hafs-surah-ayah-counts.json is absent');

section('Bidirectional Consistency');

for (const systemId of nonKufiIds) {
  const forward = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  const reverse = load(`mappings/by-counting-system/${systemId}-to-kufi.json`);

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const key = String(surahNumber);
    const forwardSurah = forward.surahs[key];
    const reverseSurah = reverse.surahs[key];

    for (let hafsAyah = 1; hafsAyah <= forwardSurah.hafs_ayah_count; hafsAyah += 1) {
      const entry = forwardSurah.ayahs[String(hafsAyah)];
      for (const targetAyah of getTargets(entry)) {
        const reverseEntry = reverseSurah.ayahs[String(targetAyah)];
        const reverseHafsAyahs = reverseEntry.hafs_ayahs || [reverseEntry.hafs_ayah];
        assert(reverseHafsAyahs.includes(hafsAyah), `${systemId}: ${surahNumber}:${hafsAyah} ↔ ${targetAyah} is bidirectionally consistent`);
      }
    }
  }
}

section('Mapping ↔ Surah-Counts Consistency');

for (const systemId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  const counts = load(`surah-counts/${systemId}.json`);

  let totalFromMapping = 0;
  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    totalFromMapping += mapping.surahs[String(surahNumber)].target_ayah_count;
  }
  assert(totalFromMapping === counts._total_ayahs, `${systemId}: mapping total matches surah-counts total`);
}

console.log(`\n========================================`);
console.log(`  PASSED: ${passed}`);
console.log(`  FAILED: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
