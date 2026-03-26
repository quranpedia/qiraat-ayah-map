/**
 * Validation tests for qiraat-ayah-map data.
 *
 * Tests verify data integrity and scholarly correctness using
 * well-established facts from 'ilm al-'add (علم العدّ).
 * NOT based on any application's database.
 *
 * Usage: node tests/validate.mjs
 */

import { readFileSync, existsSync } from 'fs';
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
    assert(typeof item.description_ar === 'string' && item.description_ar.length > 0, 'Arabic desc');
    assert(typeof item.description_en === 'string' && item.description_en.length > 0, 'English desc');
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

  const block = differences.differences.find(d => d.counting_system === sysId);
  if (!block) { failed++; console.error(`  FAIL: No diffs for ${sysId}`); continue; }

  let computed = 6236;
  for (const item of block.items) {
    if (item.type === 'merge') computed--;
    else if (item.type === 'split') computed++;
  }
  assert(computed === sys.total_ayahs, `${sysId}: computed ${computed} = stored ${sys.total_ayahs}`);
}

// ===================== Al-Fatiha =====================

section('Al-Fatiha — All 7 ayahs');

for (const block of differences.differences) {
  const fatihaDiffs = block.items.filter(d => d.surah === 1);
  let offset = 0;
  for (const d of fatihaDiffs) { if (d.type === 'merge') offset--; else if (d.type === 'split') offset++; }
  assert(7 + offset === 7, `${block.counting_system}: Fatiha = ${7 + offset}`);
}

// ===================== Basmalah =====================

section('Basmalah merged in all non-Kufan');

for (const block of differences.differences) {
  const bm = block.items.find(d => d.surah === 1 && d.hafs_ayah === 1 && d.type === 'merge');
  assert(!!bm, `${block.counting_system}: Basmalah merge`);
}

// ===================== Huruf Muqatta'at =====================

section('الم surahs (2, 3, 29, 30, 31, 32)');

for (const block of differences.differences) {
  for (const s of [2, 3, 29, 30, 31, 32]) {
    assert(!!block.items.find(d => d.surah === s && d.hafs_ayah === 1 && d.type === 'merge'),
      `${block.counting_system}: الم merged in ${s}`);
  }
}

for (const block of differences.differences) {
  const s2 = block.items.filter(d => d.surah === 2);
  let off = 0;
  for (const d of s2) { if (d.type === 'merge') off--; else if (d.type === 'split') off++; }
  assert(286 + off === 285, `${block.counting_system}: Surah 2 = ${286 + off}`);
}

section('الر surahs (10-15)');

for (const sysId of ['madani-last', 'madani-first', 'basri']) {
  const block = differences.differences.find(d => d.counting_system === sysId);
  if (!block) continue;
  for (const s of [10, 11, 12, 14, 15]) {
    assert(!!block.items.find(d => d.surah === s && d.hafs_ayah === 1 && d.type === 'merge'),
      `${sysId}: الر merged in ${s}`);
  }
}

section('حم surahs (40-46)');

for (const sysId of ['madani-last', 'madani-first', 'basri']) {
  const block = differences.differences.find(d => d.counting_system === sysId);
  if (!block) continue;
  for (const s of [40, 41, 42, 43, 44, 45, 46]) {
    assert(!!block.items.find(d => d.surah === s && d.hafs_ayah === 1 && d.type === 'merge'),
      `${sysId}: حم merged in ${s}`);
  }
}

// ===================== Mapping Files =====================

section('Mapping Files');

for (const sysId of nonKufiIds) {
  const fn = `hafs-to-${sysId}.json`;
  let m;
  try { m = load(`mappings/${fn}`); } catch { failed++; console.error(`  FAIL: Missing ${fn}`); continue; }

  assert(m._source === 'kufi', `${fn}: source=kufi`);
  assert(m._target === sysId, `${fn}: target=${sysId}`);
  assert(typeof m._version === 'string', `${fn}: has _version`);
  assert(Object.keys(m.surahs).length === 114, `${fn}: 114 surahs`);

  // Al-Fatiha checks
  const f = m.surahs['1'];
  assert(f.hafs_ayah_count === 7 && f.target_ayah_count === 7, `${fn}: Fatiha 7/7`);
  assert(f.ayahs['1'].status === 'merged', `${fn}: Basmalah merged`);
  assert(typeof f.ayahs['1'].target_ayah === 'number', `${fn}: merged has numeric target_ayah`);
  assert(f.ayahs['2'].target_ayah === 1, `${fn}: Hafs 1:2 → 1`);
  assert(f.ayahs['6'].status === 'split', `${fn}: Hafs 1:6 is split`);
  assert(Array.isArray(f.ayahs['6'].splits_into), `${fn}: Hafs 1:6 has splits_into`);

  // Surah 2
  const b = m.surahs['2'];
  assert(b.hafs_ayah_count === 286 && b.target_ayah_count === 285, `${fn}: Surah 2 286/285`);
  assert(b.ayahs['1'].status === 'merged', `${fn}: الم merged`);
  assert(typeof b.ayahs['1'].target_ayah === 'number', `${fn}: الم has numeric target_ayah`);
  assert(b.ayahs['286'].target_ayah === 285, `${fn}: Hafs 2:286 → 285`);

  // NO null target_ayah anywhere
  for (const [ss, surah] of Object.entries(m.surahs)) {
    for (const [aa, entry] of Object.entries(surah.ayahs)) {
      assert(entry.target_ayah !== null && entry.target_ayah !== undefined,
        `${fn}: ${ss}:${aa} not null`);
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

// ===================== No Duplicate File =====================

section('Cleanup');

assert(!existsSync(join(dataDir, 'hafs-surah-ayah-counts.json')),
  'hafs-surah-ayah-counts.json removed');

// ===================== Bidirectional =====================

section('Bidirectional Consistency');

for (const sysId of nonKufiIds) {
  let m;
  try { m = load(`mappings/hafs-to-${sysId}.json`); } catch { continue; }

  const diffBlock = differences.differences.find(d => d.counting_system === sysId);
  const affected = new Set((diffBlock?.items || []).map(d => d.surah));

  for (const ss of Object.keys(m.surahs)) {
    if (affected.has(parseInt(ss))) continue;
    const surah = m.surahs[ss];
    let ok = true;
    for (const [aa, e] of Object.entries(surah.ayahs)) {
      if (e.status !== 'mapped' || e.target_ayah !== parseInt(aa)) { ok = false; break; }
    }
    assert(ok, `${sysId}: Surah ${ss} identity`);
  }
}

// ===================== Summary =====================

console.log(`\n========================================`);
console.log(`  PASSED: ${passed}`);
console.log(`  FAILED: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
