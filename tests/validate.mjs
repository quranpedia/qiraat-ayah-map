/**
 * Validation tests for qiraat-ayah-map data.
 *
 * Tests verify data integrity and scholarly correctness using
 * well-established facts from 'ilm al-'add (علم العدّ).
 * NOT based on any application's database.
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

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`  FAIL: ${label}`);
  }
}

function section(label) {
  console.log(`\n--- ${label} ---`);
}

// ===================== Load Data =====================

const countingSystems = load('counting-systems.json');
const qiraat = load('qiraat.json');
const differences = load('differences.json');

const systemIds = Object.keys(countingSystems);
const nonKufiIds = systemIds.filter(id => id !== 'kufi');

// ===================== Structural Integrity =====================

section('Structural Integrity');

assert(systemIds.length === 6, 'Exactly 6 counting systems');
assert(Object.keys(qiraat).length === 10, 'Exactly 10 Qiraat');

for (const [slug, q] of Object.entries(qiraat)) {
  assert(Object.keys(q.rawis).length === 2, `Qiraa "${slug}" has 2 rawis`);
}

const totalRawis = Object.values(qiraat).reduce((sum, q) => sum + Object.keys(q.rawis).length, 0);
assert(totalRawis === 20, '20 total rawis across all Qiraat');

// All IDs use hyphens, not underscores
for (const id of systemIds) {
  assert(!id.includes('_'), `System ID "${id}" — no underscores`);
}
for (const slug of Object.keys(qiraat)) {
  assert(!slug.includes('_'), `Qiraa slug "${slug}" — no underscores`);
}

for (const block of differences.differences) {
  assert(!block.counting_system.includes('_'), `Diff system "${block.counting_system}" — no underscores`);
  for (const item of block.items) {
    assert(item.surah >= 1 && item.surah <= 114, `Valid surah ${item.surah}`);
    assert(item.hafs_ayah >= 1, `Valid hafs_ayah ${item.hafs_ayah}`);
    assert(item.type === 'merge' || item.type === 'split', `Valid type "${item.type}"`);
    assert(typeof item.word === 'string' && item.word.length > 0, 'Has word');
  }
}

// ===================== Cross-Reference Integrity =====================

section('Cross-Reference Integrity');

const qiraatSlugs = Object.keys(qiraat);

for (const [slug, q] of Object.entries(qiraat)) {
  assert(systemIds.includes(q.counting_system), `"${slug}".counting_system → "${q.counting_system}" exists`);
}

for (const [sysId, sys] of Object.entries(countingSystems)) {
  for (const slug of sys.used_by_qiraat) {
    assert(qiraatSlugs.includes(slug), `${sysId}.used_by_qiraat: "${slug}" exists in qiraat.json`);
  }
}

for (const block of differences.differences) {
  assert(systemIds.includes(block.counting_system), `Diff "${block.counting_system}" exists in counting-systems`);
}

// ===================== Kufan Total =====================

section('Kufan Total Ayah Count');

const kufiCountsFile = load('surah-counts/kufi.json');
assert(kufiCountsFile._total_ayahs === 6236, `Kufan total is 6236`);

let kufiSum = 0;
for (let s = 1; s <= 114; s++) kufiSum += kufiCountsFile.surahs[String(s)];
assert(kufiSum === 6236, `Kufan sum of surahs is 6236`);

// ===================== System Totals =====================

section('Counting System Totals');

for (const [sysId, sys] of Object.entries(countingSystems)) {
  if (sysId === 'kufi') { assert(sys.total_ayahs === 6236, 'Kufan total = 6236'); continue; }

  // Verify counting-systems.json total matches surah-counts file
  const surahCountsFile = load(`surah-counts/${sysId}.json`);
  assert(surahCountsFile._total_ayahs === sys.total_ayahs,
    `${sysId}: surah-counts total ${surahCountsFile._total_ayahs} = counting-systems total ${sys.total_ayahs}`);

  // Verify surah-counts sum matches declared total
  let scSum = 0;
  for (let s = 1; s <= 114; s++) scSum += surahCountsFile.surahs[String(s)];
  assert(scSum === surahCountsFile._total_ayahs,
    `${sysId}: surah-counts sum ${scSum} = declared total ${surahCountsFile._total_ayahs}`);

  // Verify mapping file target counts match surah-counts
  const mapping = load(`mappings/by-counting-system/kufi-to-${sysId}.json`);
  for (let s = 1; s <= 114; s++) {
    const mappingCount = mapping.surahs[String(s)].target_ayah_count;
    const scCount = surahCountsFile.surahs[String(s)];
    assert(mappingCount === scCount,
      `${sysId}: surah ${s} mapping count ${mappingCount} = surah-counts ${scCount}`);
  }
}

// ===================== Al-Fatiha =====================

section('Al-Fatiha — All 7 ayahs');

for (const sysId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${sysId}.json`);
  const f = mapping.surahs['1'];
  assert(f.target_ayah_count === 7, `${sysId}: Fatiha target count = 7`);
}

// ===================== Basmalah =====================

section('Basmalah handling in Fatiha');

// Makki (and dimashqi according to some sources) counts basmalah as ayah 1.
// Other systems merge basmalah with what follows.
// We verify that systems which merge basmalah have a split at the end to keep 7 total.
for (const sysId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${sysId}.json`);
  const f = mapping.surahs['1'];

  // Check if basmalah (Hafs 1:1) is merged or mapped
  const a1 = f.ayahs['1'];

  if (a1.status === 'merged') {
    // If basmalah is merged, there must be a split somewhere to compensate
    let merges = 0, splits = 0;
    for (const [_, e] of Object.entries(f.ayahs)) {
      if (e.status === 'merged') merges++;
      if (e.status === 'split') splits++;
    }
    assert(merges === splits, `${sysId}: Fatiha merges (${merges}) = splits (${splits}) for 7→7`);
    // Hafs 1:2 should map to target 1
    assert(f.ayahs['2'].target_ayah === 1, `${sysId}: Hafs 1:2 → target 1`);
  } else {
    // If basmalah is mapped (like Makki), it's a direct 1:1 mapping
    assert(a1.status === 'mapped', `${sysId}: Fatiha basmalah is mapped`);
    assert(a1.target_ayah === 1, `${sysId}: Fatiha basmalah → target 1`);
  }
}

// Systems that are known to merge basmalah: madani-first, madani-last, basri, dimashqi
for (const sysId of ['madani-first', 'madani-last', 'basri', 'dimashqi']) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${sysId}.json`);
  assert(mapping.surahs['1'].ayahs['1'].status === 'merged',
    `${sysId}: Basmalah merged in Fatiha`);
}

// Makki does NOT merge basmalah (counts it as ayah 1, same as Kufi)
{
  const mapping = load('mappings/by-counting-system/kufi-to-makki.json');
  assert(mapping.surahs['1'].ayahs['1'].status === 'mapped',
    'makki: Basmalah is a separate ayah in Fatiha (same as Kufi)');
}

// ===================== Surah 2 (Al-Baqarah) =====================

section('Surah 2 — 285 ayahs in all non-Kufan systems');

for (const sysId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${sysId}.json`);
  const b = mapping.surahs['2'];
  assert(b.hafs_ayah_count === 286, `${sysId}: Surah 2 hafs count = 286`);
  assert(b.target_ayah_count === 285, `${sysId}: Surah 2 target count = 285`);
}

// ===================== الم surahs =====================

section('الم surahs — الم merged in all non-Kufan systems');

// Surahs 2, 3, 29, 30, 31, 32 all start with الم.
// In all non-Kufan systems, الم is merged (not a standalone ayah).
// This means either Hafs ayah 1 or ayah 2 is marked as merged.
// Other compensating splits may exist, so total count may equal Kufan.
const almSurahs = [2, 3, 29, 30, 31, 32];
for (const sysId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${sysId}.json`);
  for (const s of almSurahs) {
    const sd = mapping.surahs[String(s)];
    // At least one of the first two ayahs should be merged (الم merge)
    const a1merged = sd.ayahs['1'].status === 'merged';
    const a2merged = sd.ayahs['2'].status === 'merged';
    assert(a1merged || a2merged,
      `${sysId}: Surah ${s} الم merged (ayah 1 or 2)`);
  }
}

// ===================== Mapping Files =====================

section('Mapping Files');

for (const sysId of nonKufiIds) {
  const fn = `kufi-to-${sysId}.json`;
  let m;
  try { m = load(`mappings/by-counting-system/${fn}`); } catch { failed++; console.error(`  FAIL: Missing ${fn}`); continue; }

  assert(m._source === 'kufi', `${fn}: source=kufi`);
  assert(m._target === sysId, `${fn}: target=${sysId}`);
  assert(typeof m._version === 'string', `${fn}: has _version`);
  assert(Object.keys(m.surahs).length === 114, `${fn}: 114 surahs`);

  // Al-Fatiha: always 7/7
  const f = m.surahs['1'];
  assert(f.hafs_ayah_count === 7 && f.target_ayah_count === 7, `${fn}: Fatiha 7/7`);

  // NO null target_ayah anywhere
  for (const [ss, surah] of Object.entries(m.surahs)) {
    for (const [aa, entry] of Object.entries(surah.ayahs)) {
      assert(entry.target_ayah !== null && entry.target_ayah !== undefined,
        `${fn}: ${ss}:${aa} not null`);
    }
  }

  // Every surah has correct number of hafs ayah entries
  for (const [ss, surah] of Object.entries(m.surahs)) {
    assert(Object.keys(surah.ayahs).length === surah.hafs_ayah_count,
      `${fn}: Surah ${ss} has ${surah.hafs_ayah_count} ayah entries`);
  }

  // Target ayah values are within valid range
  for (const [ss, surah] of Object.entries(m.surahs)) {
    for (const [aa, entry] of Object.entries(surah.ayahs)) {
      assert(entry.target_ayah >= 1 && entry.target_ayah <= surah.target_ayah_count,
        `${fn}: ${ss}:${aa} target ${entry.target_ayah} in range [1, ${surah.target_ayah_count}]`);
      if (entry.splits_into) {
        for (const t of entry.splits_into) {
          assert(t >= 1 && t <= surah.target_ayah_count,
            `${fn}: ${ss}:${aa} split target ${t} in range`);
        }
      }
    }
  }
}

// ===================== Surah Counts =====================

section('Surah Counts Files');

for (const sysId of systemIds) {
  const fn = `${sysId}.json`;
  let c;
  try { c = load(`surah-counts/${fn}`); } catch { failed++; console.error(`  FAIL: Missing ${fn}`); continue; }

  assert(c._counting_system === sysId, `${fn}: system=${sysId}`);
  assert(typeof c._version === 'string', `${fn}: has _version`);
  assert(c._total_ayahs === countingSystems[sysId].total_ayahs,
    `${fn}: total ${c._total_ayahs} = ${countingSystems[sysId].total_ayahs}`);
  assert(Object.keys(c.surahs).length === 114, `${fn}: 114 surahs`);
  assert(c.surahs['1'] === 7, `${fn}: Fatiha = 7`);
}

// ===================== Rawi Files =====================

section('Rawi Files');

const rawisDir = join(dataDir, 'rawis');
const expectedRawis = ['hafs', 'warsh', 'bazzi', 'duri', 'qalun', 'qunbul', 'shuba', 'susi'];

for (const rawiSlug of expectedRawis) {
  const fn = `${rawiSlug}.json`;
  let r;
  try { r = load(`rawis/${fn}`); } catch { failed++; console.error(`  FAIL: Missing rawis/${fn}`); continue; }

  assert(r._rawi === rawiSlug, `${fn}: _rawi = ${rawiSlug}`);
  assert(typeof r._qiraa === 'string', `${fn}: has _qiraa`);
  assert(typeof r._counting_system === 'string', `${fn}: has _counting_system`);
  assert(systemIds.includes(r._counting_system), `${fn}: _counting_system is valid`);
  assert(typeof r._mushaf_id === 'number', `${fn}: has _mushaf_id`);

  // Verify the rawi slug exists in the qiraat.json
  const qiraa = qiraat[r._qiraa];
  assert(!!qiraa, `${fn}: qiraa "${r._qiraa}" exists`);
  if (qiraa) {
    assert(rawiSlug in qiraa.rawis, `${fn}: rawi "${rawiSlug}" exists in qiraa "${r._qiraa}"`);
    assert(qiraa.counting_system === r._counting_system,
      `${fn}: counting system matches qiraa`);
  }

  // If has mapping file, verify it exists
  if (r._mapping_file) {
    assert(existsSync(join(dataDir, r._mapping_file)),
      `${fn}: mapping file "${r._mapping_file}" exists`);
  }
}

// ===================== No Duplicate File =====================

section('Cleanup');

assert(!existsSync(join(dataDir, 'hafs-surah-ayah-counts.json')),
  'hafs-surah-ayah-counts.json removed');

// ===================== Bidirectional Consistency =====================

section('Bidirectional Consistency');

// For each system, verify that surahs with NO differences have identity mapping
for (const sysId of nonKufiIds) {
  let m;
  try { m = load(`mappings/by-counting-system/kufi-to-${sysId}.json`); } catch { continue; }

  // Check surahs where all ayahs are 'mapped' have identity targets
  for (const ss of Object.keys(m.surahs)) {
    const surah = m.surahs[ss];
    const allMapped = Object.values(surah.ayahs).every(e => e.status === 'mapped');
    if (!allMapped) continue;

    let ok = true;
    for (const [aa, e] of Object.entries(surah.ayahs)) {
      if (e.target_ayah !== parseInt(aa)) { ok = false; break; }
    }
    assert(ok, `${sysId}: Surah ${ss} all-mapped identity`);
  }
}

// ===================== Consistency between mappings and surah-counts =====================

section('Mapping ↔ Surah-Counts Consistency');

for (const sysId of nonKufiIds) {
  const mapping = load(`mappings/by-counting-system/kufi-to-${sysId}.json`);
  const sc = load(`surah-counts/${sysId}.json`);

  let totalFromMapping = 0;
  for (let s = 1; s <= 114; s++) {
    totalFromMapping += mapping.surahs[String(s)].target_ayah_count;
  }
  assert(totalFromMapping === sc._total_ayahs,
    `${sysId}: mapping total (${totalFromMapping}) = surah-counts total (${sc._total_ayahs})`);
}

// ===================== Summary =====================

console.log(`\n========================================`);
console.log(`  PASSED: ${passed}`);
console.log(`  FAILED: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
