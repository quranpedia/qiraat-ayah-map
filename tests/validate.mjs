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

const systemIds = Object.keys(countingSystems);
const nonKufiIds = systemIds.filter(id => id !== 'kufi');
const allRawis = Object.entries(qiraat)
  .flatMap(([qiraaSlug, qiraa]) => Object.keys(qiraa.rawis).map(rawiSlug => ({ rawiSlug, qiraaSlug, countingSystem: qiraa.counting_system })));
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

section('Cross-Reference Integrity');

for (const [slug, qiraa] of Object.entries(qiraat)) {
  assert(systemIds.includes(qiraa.counting_system), `"${slug}".counting_system exists`);
}

for (const [systemId, system] of Object.entries(countingSystems)) {
  for (const slug of system.used_by_qiraat) {
    assert(slug in qiraat, `${systemId}.used_by_qiraat includes known qiraa "${slug}"`);
  }
}

for (const block of differences.differences) {
  assert(systemIds.includes(block.counting_system), `Diff system "${block.counting_system}" exists in counting-systems.json`);
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

section('Surah 2 — 285 ayahs in all non-Kufan systems');

for (const systemId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  const baqarah = mapping.surahs['2'];
  assert(baqarah.hafs_ayah_count === 286, `${systemId}: Surah 2 Hafs count = 286`);
  assert(baqarah.target_ayah_count === 285, `${systemId}: Surah 2 target count = 285`);
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
    for (const [hafsAyah, entry] of Object.entries(surah.ayahs)) {
      assert(Number.isInteger(entry.target_ayah), `${filename}: ${surahNumber}:${hafsAyah} has integer target_ayah`);
      assert(entry.target_ayah >= 1 && entry.target_ayah <= surah.target_ayah_count, `${filename}: ${surahNumber}:${hafsAyah} target in range`);

      if (entry.status === 'split') {
        assert(Array.isArray(entry.splits_into) && entry.splits_into.length >= 2, `${filename}: ${surahNumber}:${hafsAyah} split has splits_into`);
        if (Array.isArray(entry.splits_into) && entry.splits_into.length >= 2) {
          const expectedTargets = buildRange(entry.target_ayah, entry.target_ayah + entry.splits_into.length - 1);
          assert(JSON.stringify(entry.splits_into) === JSON.stringify(expectedTargets), `${filename}: ${surahNumber}:${hafsAyah} split targets are contiguous`);
        }
      } else {
        assert(!('splits_into' in entry), `${filename}: ${surahNumber}:${hafsAyah} non-split has no splits_into`);
      }

      for (const target of getTargets(entry)) {
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
