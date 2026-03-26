/**
 * Validate mapping data against quranpedia.net API.
 *
 * For each available mushaf, picks 50 random ayahs and compares
 * our computed target_ayah with the API's number_in_hafs field.
 *
 * The API returns { number_in_hafs } for each ayah, which tells us
 * what the Hafs equivalent is. We reverse-check: for a given target
 * system ayah, does our mapping agree with the API?
 *
 * Usage: node tests/validate-against-api.mjs
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

function load(file) {
  return JSON.parse(readFileSync(join(dataDir, file), 'utf-8'));
}

// Mushaf ID → our counting system mapping
const MUSHAF_TO_SYSTEM = {
  4: 'madani-last',   // Warsh
  7: 'madani-last',   // Qalun
  5: 'makki',         // Bazzi
  8: 'makki',         // Qunbul
  6: 'basri',         // Duri
  10: 'basri',        // Susi
  9: 'kufi',          // Shu'ba (same as Hafs — identity check)
};

const MUSHAF_NAMES = {
  4: 'Warsh (madani-last)',
  7: 'Qalun (madani-last)',
  5: 'Bazzi (makki)',
  8: 'Qunbul (makki)',
  6: 'Duri (basri)',
  10: 'Susi (basri)',
  9: "Shu'ba (kufi)",
};

const API_BASE = 'https://api.quranpedia.net/v1';

async function fetchAyah(mushafId, surahId, ayahNumber) {
  const url = `${API_BASE}/mushafs/${mushafId}/${surahId}/${ayahNumber}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

// Generate random test cases: 50 random (surah, ayah) pairs
function generateTestCases(surahCounts, count) {
  const cases = [];
  const allAyahs = [];

  for (const [surah, ayahCount] of Object.entries(surahCounts.surahs)) {
    for (let a = 1; a <= ayahCount; a++) {
      allAyahs.push({ surah: parseInt(surah), ayah: a });
    }
  }

  // Shuffle and pick
  for (let i = allAyahs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAyahs[i], allAyahs[j]] = [allAyahs[j], allAyahs[i]];
  }

  return allAyahs.slice(0, count);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let totalPassed = 0;
let totalFailed = 0;

async function validateMushaf(mushafId) {
  const systemId = MUSHAF_TO_SYSTEM[mushafId];
  const name = MUSHAF_NAMES[mushafId];

  console.log(`\n--- ${name} (mushaf ${mushafId}) ---`);

  let mapping, surahCounts;

  if (systemId === 'kufi') {
    // For Kufan, every ayah should map to itself
    surahCounts = load('surah-counts/kufi.json');
    mapping = null; // Identity
  } else {
    mapping = load(`mappings/by-counting-system/kufi-to-${systemId}.json`);
    surahCounts = load(`surah-counts/${systemId}.json`);
  }

  // For non-Kufan: we need to test the REVERSE direction.
  // API gives us: for a target mushaf ayah → what is number_in_hafs?
  // Our mapping gives: for a hafs_ayah → what is target_ayah?
  // So we build a reverse lookup from our mapping.

  const reverseMap = {}; // { surah: { target_ayah: [hafs_ayahs] } }
  if (mapping) {
    for (const [surah, surahData] of Object.entries(mapping.surahs)) {
      reverseMap[surah] = {};
      for (const [hafsAyah, entry] of Object.entries(surahData.ayahs)) {
        // Add the primary target_ayah
        const ta = entry.target_ayah;
        if (!reverseMap[surah][ta]) reverseMap[surah][ta] = [];
        reverseMap[surah][ta].push(parseInt(hafsAyah));

        // For splits, also add the additional target ayahs from splits_into
        if (entry.splits_into) {
          for (const splitTa of entry.splits_into) {
            if (splitTa !== ta) {
              if (!reverseMap[surah][splitTa]) reverseMap[surah][splitTa] = [];
              reverseMap[surah][splitTa].push(parseInt(hafsAyah));
            }
          }
        }
      }
    }
  }

  const testCases = generateTestCases(surahCounts, 50);
  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    const apiData = await fetchAyah(mushafId, tc.surah, tc.ayah);
    await sleep(100); // Rate limiting

    if (!apiData) {
      console.log(`  SKIP: ${tc.surah}:${tc.ayah} — API returned null`);
      continue;
    }

    const apiHafsNumber = parseInt(apiData.number_in_hafs);

    if (systemId === 'kufi') {
      // Identity: ayah number should equal number_in_hafs
      if (tc.ayah === apiHafsNumber) {
        passed++;
      } else {
        failed++;
        console.log(`  FAIL: ${tc.surah}:${tc.ayah} — expected hafs=${tc.ayah}, API says hafs=${apiHafsNumber}`);
      }
    } else {
      // Check: our reverse map for this target ayah should include apiHafsNumber
      const expectedHafs = reverseMap[String(tc.surah)]?.[String(tc.ayah)] || [];

      if (expectedHafs.includes(apiHafsNumber)) {
        passed++;
      } else {
        failed++;
        console.log(`  FAIL: ${tc.surah}:${tc.ayah} — our mapping says hafs=${JSON.stringify(expectedHafs)}, API says hafs=${apiHafsNumber}`);
      }
    }
  }

  console.log(`  Result: ${passed} passed, ${failed} failed out of ${passed + failed}`);
  totalPassed += passed;
  totalFailed += failed;
}

// Run all validations
async function main() {
  console.log('Validating mapping data against quranpedia.net API...\n');

  for (const mushafId of Object.keys(MUSHAF_TO_SYSTEM)) {
    await validateMushaf(parseInt(mushafId));
  }

  console.log(`\n========================================`);
  console.log(`  TOTAL PASSED: ${totalPassed}`);
  console.log(`  TOTAL FAILED: ${totalFailed}`);
  console.log(`========================================\n`);

  if (totalFailed > 0) process.exit(1);
}

main().catch(console.error);
