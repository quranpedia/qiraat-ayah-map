/**
 * Validate mapping data against quranpedia.net API.
 *
 * For each rawi with a known public mushaf ID, pick 50 random ayahs and compare
 * our reverse mapping against the API's number_in_hafs field.
 *
 * Usage: node tests/validate-against-api.mjs
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { distRawisDir, distPath, sourcePath } from '../scripts/lib/repo-paths.mjs';

function loadSource(file) {
  return JSON.parse(readFileSync(sourcePath(file), 'utf-8'));
}

function loadDist(file) {
  return JSON.parse(readFileSync(distPath(file), 'utf-8'));
}

const qiraat = loadSource('qiraat.json');
const API_BASE = 'https://api.quranpedia.net/v1';

function listPublicMushafs() {
  const mushafs = [];

  for (const filename of readdirSync(distRawisDir).sort()) {
    if (!filename.endsWith('.json')) {
      continue;
    }

    const meta = loadDist(`rawis/${filename}`);
    if (!Number.isInteger(meta._mushaf_id)) {
      continue;
    }

    const rawiInfo = qiraat[meta._qiraa]?.rawis?.[meta._rawi];
    const qiraaInfo = qiraat[meta._qiraa];

    mushafs.push({
      mushafId: meta._mushaf_id,
      rawiSlug: meta._rawi,
      rawiName: rawiInfo?.name_en || meta._rawi,
      qiraaName: qiraaInfo?.name_en || meta._qiraa,
      systemId: meta._counting_system
    });
  }

  return mushafs.sort((a, b) => a.mushafId - b.mushafId);
}

async function fetchAyah(mushafId, surahId, ayahNumber) {
  const url = `${API_BASE}/mushafs/${mushafId}/${surahId}/${ayahNumber}`;
  const res = await fetch(url);
  if (!res.ok) {
    return null;
  }

  return res.json();
}

function generateTestCases(surahCounts, count) {
  const cases = [];
  const allAyahs = [];

  for (const [surah, ayahCount] of Object.entries(surahCounts.surahs)) {
    for (let ayah = 1; ayah <= ayahCount; ayah += 1) {
      allAyahs.push({ surah: Number.parseInt(surah, 10), ayah });
    }
  }

  for (let i = allAyahs.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAyahs[i], allAyahs[j]] = [allAyahs[j], allAyahs[i]];
  }

  return allAyahs.slice(0, count);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeApiNumberInHafs(value) {
  if (Array.isArray(value)) {
    return [...new Set(value.map(item => Number.parseInt(item, 10)).filter(Number.isInteger))]
      .sort((a, b) => a - b);
  }

  if (Number.isInteger(value)) {
    return [value];
  }

  if (typeof value === 'string') {
    return [...new Set(
      value
        .split(',')
        .map(part => Number.parseInt(part.trim(), 10))
        .filter(Number.isInteger)
    )].sort((a, b) => a - b);
  }

  return [];
}

function arraysEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

let totalPassed = 0;
let totalFailed = 0;

async function validateMushaf(mushaf) {
  const label = `${mushaf.rawiName} (${mushaf.qiraaName}, ${mushaf.systemId})`;
  console.log(`\n--- ${label} — mushaf ${mushaf.mushafId} ---`);

  const surahCounts = loadDist(`surah-counts/${mushaf.systemId}.json`);
  const reverse = mushaf.systemId === 'kufi'
    ? null
    : loadDist(`mappings/by-counting-system/${mushaf.systemId}-to-kufi.json`);

  const testCases = generateTestCases(surahCounts, 50);
  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    const apiData = await fetchAyah(mushaf.mushafId, tc.surah, tc.ayah);
    await sleep(100);

    if (!apiData) {
      console.log(`  SKIP: ${tc.surah}:${tc.ayah} — API returned null`);
      continue;
    }

    const apiHafsNumbers = normalizeApiNumberInHafs(apiData.number_in_hafs);

    if (mushaf.systemId === 'kufi') {
      const expectedHafs = [tc.ayah];
      if (arraysEqual(expectedHafs, apiHafsNumbers)) {
        passed += 1;
      } else {
        failed += 1;
        console.log(`  FAIL: ${tc.surah}:${tc.ayah} — expected hafs=${JSON.stringify(expectedHafs)}, API says hafs=${JSON.stringify(apiHafsNumbers)}`);
      }
      continue;
    }

    const reverseEntry = reverse.surahs[String(tc.surah)]?.ayahs?.[String(tc.ayah)];
    const expectedHafs = (reverseEntry?.hafs_ayahs || (reverseEntry ? [reverseEntry.hafs_ayah] : []))
      .slice()
      .sort((a, b) => a - b);

    if (arraysEqual(expectedHafs, apiHafsNumbers)) {
      passed += 1;
    } else {
      failed += 1;
      console.log(`  FAIL: ${tc.surah}:${tc.ayah} — our mapping says hafs=${JSON.stringify(expectedHafs)}, API says hafs=${JSON.stringify(apiHafsNumbers)}`);
    }
  }

  console.log(`  Result: ${passed} passed, ${failed} failed out of ${passed + failed}`);
  totalPassed += passed;
  totalFailed += failed;
}

async function main() {
  console.log('Validating mapping data against quranpedia.net API...\n');

  const mushafs = listPublicMushafs();
  for (const mushaf of mushafs) {
    await validateMushaf(mushaf);
  }

  console.log(`\n========================================`);
  console.log(`  TOTAL PASSED: ${totalPassed}`);
  console.log(`  TOTAL FAILED: ${totalFailed}`);
  console.log(`========================================\n`);

  if (totalFailed > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
