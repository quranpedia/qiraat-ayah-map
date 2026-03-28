/**
 * Validation tests for qiraat-ayah-map data.
 *
 * Usage: node tests/validate.mjs
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { decodeBoundaryHash, getBoundaryTableRowId, getBoundaryViewerAyahId, getBoundaryViewerMarkerId } from '../site/src/lib/mushaf-viewer-dom.js';
import { buildDifferingAyahSummary } from '../site/src/lib/mushaf-viewer.js';
import { normalizeBookBoundaryEvidenceDocument, flattenBookBoundaryReviewRows, VERIFICATION_STATUS_ORDER } from '../scripts/lib/book-evidence-utils.mjs';
import { buildBookBoundaryPrimitives, expandBookBoundaryPrimitivesToDifferences, getTraditionalSystemOrder, normalizeBookBoundaryPrimitivesDocument } from '../scripts/lib/book-primitives-utils.mjs';
import {
  distMappingsByCountingSystemDir,
  distMappingsByRawiDir,
  distRawisDir,
  distReviewDir,
  distReviewSystemsDir,
  distSurahCountsDir,
  distPath,
  repoDir,
  sourceDataDir,
  sourcePath
} from '../scripts/lib/repo-paths.mjs';

function loadSource(file) {
  return JSON.parse(readFileSync(sourcePath(file), 'utf-8'));
}

function loadDist(file) {
  return JSON.parse(readFileSync(distPath(file), 'utf-8'));
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

function sortDifferenceItems(items) {
  return items
    .slice()
    .sort((left, right) => left.surah - right.surah
      || left.hafs_ayah - right.hafs_ayah
      || left.type.localeCompare(right.type)
      || left.word.localeCompare(right.word, 'ar'));
}

function buildCanonicalDifferenceBlockMap(document) {
  return new Map(
    document.differences.map(block => [
      block.counting_system,
      sortDifferenceItems(block.items)
    ])
  );
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

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const countingSystems = loadSource('counting-systems.json');
const qiraat = loadSource('qiraat.json');
const differences = loadDist('differences.json');
const boundaryEvents = loadDist('boundary-events.json');
const bookBoundaryPrimitives = loadSource('book-boundary-primitives.json');
const bookBoundaryEvidence = loadSource('book-boundary-evidence.json');
const differencesReconciliation = loadDist('differences-reconciliation.json');
const classicalCountAttestations = loadDist('classical-count-attestations.json');
const reviewData = loadDist('review/review-data.json');
const masterMatrixCsv = readFileSync(distPath('review', 'master-matrix.csv'), 'utf-8');
const openQuestionsMarkdown = readFileSync(distPath('review', 'open-questions.md'), 'utf-8');
const totalsMarkdown = readFileSync(distPath('review', 'totals.md'), 'utf-8');
const workloadMarkdown = readFileSync(distPath('review', 'workload.md'), 'utf-8');
const systemDistanceMarkdown = readFileSync(distPath('review', 'system-distance.md'), 'utf-8');
const evidenceLedgerMarkdown = readFileSync(distPath('review', 'evidence-ledger.md'), 'utf-8');
const alBayanCrossReference = loadDist('review/al-bayan-cross-reference.json');
const alBayanCrossReferenceMarkdown = readFileSync(distPath('review', 'al-bayan-cross-reference.md'), 'utf-8');
const siteData = JSON.parse(readFileSync(join(repoDir, 'site', 'src', 'lib', 'data', 'generated', 'site-data.json'), 'utf-8'));
const mushafViewerDir = join(repoDir, 'site', 'public', 'generated', 'mushaf');
const plainMushafLines = readFileSync(join(repoDir, 'sources', 'mushaf-text', 'quran-plain.txt'), 'utf-8').trim().split(/\r?\n/);
const uthmaniMushafLines = readFileSync(join(repoDir, 'sources', 'mushaf-text', 'quran-uthmani.txt'), 'utf-8').trim().split(/\r?\n/);
const UTHMANI_BASMALA = 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ';

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

assert(differences._reference_system === 'kufi', 'differences.json uses kufi as reference system');
assert(typeof differences._version === 'string', 'differences.json has _version');
assert(differences._generated_from === 'book-boundary-primitives.json', 'differences.json records book-boundary-primitives.json as its generated source');

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

assert(bookBoundaryPrimitives._reference_system === 'kufi', 'book-boundary-primitives.json uses kufi as reference system');
assert(typeof bookBoundaryPrimitives._version === 'string', 'book-boundary-primitives.json has _version');
assert(Array.isArray(bookBoundaryPrimitives._counting_system_order), 'book-boundary-primitives.json has _counting_system_order');
assert(bookBoundaryEvidence._paired_primitive_file === 'book-boundary-primitives.json', 'book-boundary-evidence.json records its paired primitive file');
assert(typeof bookBoundaryEvidence._version === 'string', 'book-boundary-evidence.json has _version');
assert(Array.isArray(bookBoundaryEvidence._counting_system_order), 'book-boundary-evidence.json has _counting_system_order');
assert(differencesReconciliation._reference_system === 'kufi', 'differences-reconciliation.json uses kufi as reference system');
assert(typeof differencesReconciliation._version === 'string', 'differences-reconciliation.json has _version');

section('Generation Pipeline');

assert(pkg.scripts.generate.includes('normalize-book-boundary-primitives.mjs'), 'generate pipeline normalizes the canonical book-boundary-primitives.json source');
assert(pkg.scripts.generate.includes('normalize-book-boundary-evidence.mjs'), 'generate pipeline normalizes the canonical book-boundary-evidence.json sidecar');
assert(pkg.scripts.generate.includes('generate-source-cross-references.mjs'), 'generate pipeline builds the al-Bayan cross-reference artifacts');
assert(pkg.scripts.generate.includes('clean-dist.mjs'), 'generate pipeline clears dist before rebuilding generated artifacts');
assert(pkg.scripts.generate.includes('generate-differences-from-book-boundary-primitives.mjs'), 'generate pipeline rebuilds dist/differences.json from book-boundary-primitives.json');
assert(pkg.scripts.generate.includes('generate-review-artifacts.mjs'), 'generate pipeline rebuilds dist/review from the source layer');
assert(!pkg.scripts.generate.includes('generate-book-boundary-primitives.mjs'), 'generate pipeline does not rebuild book-boundary-primitives.json from differences.json');

section('Generated Artifact Layout');

assert(existsSync(distRawisDir), 'dist/rawis exists');
assert(existsSync(distMappingsByCountingSystemDir), 'dist/mappings/by-counting-system exists');
assert(existsSync(distMappingsByRawiDir), 'dist/mappings/by-rawi exists');
assert(existsSync(distSurahCountsDir), 'dist/surah-counts exists');
assert(existsSync(distReviewDir), 'dist/review exists');
assert(existsSync(distReviewSystemsDir), 'dist/review/systems exists');

const sourceFilesOnDisk = readdirSync(sourceDataDir).filter(filename => filename.endsWith('.json')).sort();
assert(JSON.stringify(sourceFilesOnDisk) === JSON.stringify(['book-boundary-evidence.json', 'book-boundary-primitives.json', 'counting-systems.json', 'qiraat.json']), 'data/ contains only the 4 canonical source JSON files');

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

section('Canonical Book-Aligned Primitive File');

const expectedBookOrder = getTraditionalSystemOrder(systemIds);
assert(JSON.stringify(bookBoundaryPrimitives._counting_system_order) === JSON.stringify(expectedBookOrder), 'book-boundary-primitives.json uses the traditional system order');

for (const [surahKey, ayahs] of Object.entries(bookBoundaryPrimitives.surahs)) {
  const surahNumber = Number.parseInt(surahKey, 10);
  assert(surahNumber >= 1 && surahNumber <= 114, `book-boundary-primitives.json: valid surah ${surahKey}`);

  for (const [ayahKey, primitive] of Object.entries(ayahs)) {
    const hafsAyah = Number.parseInt(ayahKey, 10);
    assert(Number.isInteger(hafsAyah) && hafsAyah >= 1, `book-boundary-primitives.json: valid hafs ayah ${surahKey}:${ayahKey}`);
    assert(primitive.end || primitive.internal, `book-boundary-primitives.json: ${surahKey}:${ayahKey} has end or internal data`);

    if (primitive.end) {
      assert(typeof primitive.end.word === 'string' && primitive.end.word.length > 0, `book-boundary-primitives.json: ${surahKey}:${ayahKey} end has word`);
      assert(Array.isArray(primitive.end.counted_by) && primitive.end.counted_by.length >= 1, `book-boundary-primitives.json: ${surahKey}:${ayahKey} end has counted_by`);
      assert(primitive.end.counted_by.includes('kufi'), `book-boundary-primitives.json: ${surahKey}:${ayahKey} end includes kufi`);
      assert(primitive.end.counted_by.length < systemIds.length, `book-boundary-primitives.json: ${surahKey}:${ayahKey} end is actually disputed`);
      for (const systemId of primitive.end.counted_by) {
        assert(systemIds.includes(systemId), `book-boundary-primitives.json: ${surahKey}:${ayahKey} end uses known system ${systemId}`);
      }
    }

    for (const internalPoint of primitive.internal || []) {
      assert(typeof internalPoint.word === 'string' && internalPoint.word.length > 0, `book-boundary-primitives.json: ${surahKey}:${ayahKey} internal has word`);
      assert(Array.isArray(internalPoint.counted_by) && internalPoint.counted_by.length >= 1, `book-boundary-primitives.json: ${surahKey}:${ayahKey} internal has counted_by`);
      assert(!internalPoint.counted_by.includes('kufi'), `book-boundary-primitives.json: ${surahKey}:${ayahKey} internal excludes kufi`);
      for (const systemId of internalPoint.counted_by) {
        assert(systemIds.includes(systemId), `book-boundary-primitives.json: ${surahKey}:${ayahKey} internal uses known system ${systemId}`);
      }
    }
  }
}

{
  const expandedDifferences = expandBookBoundaryPrimitivesToDifferences(bookBoundaryPrimitives);
  const originalBlocks = buildCanonicalDifferenceBlockMap(differences);
  const expandedBlocks = buildCanonicalDifferenceBlockMap(expandedDifferences);

  for (const systemId of nonKufiIds) {
    assert(expandedBlocks.has(systemId), `book-boundary-primitives.json generates ${systemId}`);
    assert(JSON.stringify(expandedBlocks.get(systemId)) === JSON.stringify(originalBlocks.get(systemId)), `book-boundary-primitives.json generates differences.json exactly for ${systemId}`);
  }
}

{
  const rebuiltPrimitives = buildBookBoundaryPrimitives(differences, countingSystems);
  assert(rebuiltPrimitives._reference_system === bookBoundaryPrimitives._reference_system, 'differences.json projects back to the same primitive reference system');
  assert(JSON.stringify(rebuiltPrimitives._counting_system_order) === JSON.stringify(bookBoundaryPrimitives._counting_system_order), 'differences.json projects back to the same primitive counting-system order');
  assert(JSON.stringify(rebuiltPrimitives.surahs) === JSON.stringify(bookBoundaryPrimitives.surahs), 'differences.json projects back to book-boundary-primitives.json exactly');
}


section('Canonical Evidence Sidecar');

const normalizedPrimitives = normalizeBookBoundaryPrimitivesDocument(bookBoundaryPrimitives, countingSystems, pkg.version);
const normalizedEvidence = normalizeBookBoundaryEvidenceDocument(bookBoundaryEvidence, normalizedPrimitives, countingSystems, pkg.version);
assert(JSON.stringify(normalizedEvidence) === JSON.stringify(bookBoundaryEvidence), 'book-boundary-evidence.json is normalized and aligned to the primitive layer');
assert(JSON.stringify(bookBoundaryEvidence._counting_system_order) === JSON.stringify(expectedBookOrder), 'book-boundary-evidence.json uses the traditional system order');

for (const [surahKey, ayahs] of Object.entries(bookBoundaryEvidence.surahs)) {
  for (const [ayahKey, record] of Object.entries(ayahs)) {
    const primitive = bookBoundaryPrimitives.surahs[surahKey][ayahKey];
    assert(Boolean(primitive), `book-boundary-evidence.json: ${surahKey}:${ayahKey} exists in the primitive layer`);

    if (record.end) {
      assert(record.end.word === primitive.end.word, `book-boundary-evidence.json: ${surahKey}:${ayahKey} end word matches the primitive`);
      assert(VERIFICATION_STATUS_ORDER.includes(record.end.verification_status), `book-boundary-evidence.json: ${surahKey}:${ayahKey} end has a valid verification status`);
    }

    for (const evidencePoint of record.internal || []) {
      const primitivePoint = (primitive.internal || []).find(point => point.word === evidencePoint.word);
      assert(Boolean(primitivePoint), `book-boundary-evidence.json: ${surahKey}:${ayahKey} internal ${evidencePoint.word} exists in the primitive layer`);
      assert(VERIFICATION_STATUS_ORDER.includes(evidencePoint.verification_status), `book-boundary-evidence.json: ${surahKey}:${ayahKey} internal ${evidencePoint.word} has a valid verification status`);
    }
  }
}

const faraidWork = 'الفرائد الحسان في عدّ آي القرآن';
const nafaisWork = 'نفائس البيان — شرح الفرائد الحسان';

for (const [surahKey, ayahs] of Object.entries(bookBoundaryEvidence.surahs)) {
  const surahNumber = Number.parseInt(surahKey, 10);

  if (surahNumber > 26) {
    continue;
  }

  for (const record of Object.values(ayahs)) {
    const evidencePoints = [];

    if (record.end) {
      evidencePoints.push(record.end);
    }

    evidencePoints.push(...(record.internal || []));

    for (const point of evidencePoints) {
      const works = new Set(point.evidence.map(item => item.work));
      assert(point.verification_status !== 'uncited', `book-boundary-evidence.json: ${surahKey}:${point.word} is cited within the current bundle frontier`);
      assert(works.has(faraidWork), `book-boundary-evidence.json: ${surahKey}:${point.word} includes الفرائد الحسان support within the current bundle frontier`);
      assert(works.has(nafaisWork), `book-boundary-evidence.json: ${surahKey}:${point.word} includes نفائس البيان support within the current bundle frontier`);
    }
  }
}

section('Generated Review Artifacts');

assert(reviewData._generated_from.includes('data/book-boundary-primitives.json'), 'review-data.json records book-boundary-primitives.json as a source');
assert(reviewData._generated_from.includes('data/book-boundary-evidence.json'), 'review-data.json records book-boundary-evidence.json as a source');
assert(JSON.stringify(reviewData._counting_system_order) === JSON.stringify(expectedBookOrder), 'review-data.json uses the traditional system order');

const expectedReviewRows = flattenBookBoundaryReviewRows(normalizedPrimitives, normalizedEvidence);
assert(JSON.stringify(reviewData.rows) === JSON.stringify(expectedReviewRows), 'review-data.json rows match the flattened source layer exactly');
assert(reviewData.summary.total_points === reviewData.rows.length, 'review-data.json summary.total_points matches row count');
assert(reviewData.summary.by_kind.end + reviewData.summary.by_kind.internal === reviewData.rows.length, 'review-data.json kind totals sum to row count');

const reviewStatusSum = Object.values(reviewData.summary.by_verification_status).reduce((sum, value) => sum + value, 0);
assert(reviewStatusSum === reviewData.rows.length, 'review-data.json verification-status totals sum to row count');

const masterMatrixLines = masterMatrixCsv.trim().split('\n');
assert(masterMatrixLines.length === reviewData.rows.length + 1, 'master-matrix.csv has one header line plus one row per disputed point');
assert(masterMatrixLines[0].includes('verification_status'), 'master-matrix.csv header includes verification_status');

const expectedSystemPacketFilenames = systemIds.map(systemId => `${systemId}.md`).sort();
const systemPacketFilenames = readdirSync(distReviewSystemsDir).filter(filename => filename.endsWith('.md')).sort();
assert(JSON.stringify(systemPacketFilenames) === JSON.stringify(expectedSystemPacketFilenames), 'dist/review/systems contains one packet per counting system');

const outstandingRows = reviewData.rows.filter(row => row.verification_status !== 'primary_cited_and_reviewed');
assert(openQuestionsMarkdown.includes(`Outstanding disputed-boundary claims: ${outstandingRows.length}`), 'open-questions.md reports the outstanding-point count');
assert(totalsMarkdown.includes('Mapping total'), 'totals.md includes the totals review table');
assert(workloadMarkdown.includes('Counted points'), 'workload.md includes the workload table');
assert(systemDistanceMarkdown.includes('System distance matrix'), 'system-distance.md includes the system distance heading');
assert(evidenceLedgerMarkdown.includes('Evidence ledger'), 'evidence-ledger.md includes the evidence ledger heading');

const expectedAlBayanFrontierSurahs = Array.from({ length: 13 }, (_, index) => index + 1);
const expectedAlBayanExceptionAnchors = [
  '3:92:internal:تحبون',
  '3:97:internal:إبراهيم',
  '6:73:internal:فيكون'
].sort();

assert(alBayanCrossReference._generated_from.includes('sources/al_bayan'), 'al-bayan-cross-reference.json records the checked-in al-Bayan source bundle');
assert(JSON.stringify(alBayanCrossReference.covered_surahs) === JSON.stringify(expectedAlBayanFrontierSurahs), 'al-bayan-cross-reference.json covers the structured al-Bayan frontier through surah 13');
assert(alBayanCrossReference.summary.frontier_point_count === 55, 'al-bayan-cross-reference.json reports the full project frontier point count');
assert(alBayanCrossReference.summary.exact_primary_match_count === 52, 'al-bayan-cross-reference.json reports exact primary matches across the current frontier');
assert(alBayanCrossReference.summary.exception_count === expectedAlBayanExceptionAnchors.length, 'al-bayan-cross-reference.json reports the expected frontier exception count');
assert(alBayanCrossReference.summary.exact_rows_missing_primary_evidence === 0, 'every exact al-Bayan frontier match is represented in the canonical evidence layer');
assert(JSON.stringify(alBayanCrossReference.exceptions.map(row => row.anchor_key).sort()) === JSON.stringify(expectedAlBayanExceptionAnchors), 'al-bayan-cross-reference.json records the three frontier exceptions explicitly');
assert(alBayanCrossReferenceMarkdown.includes('al-Bayān cross-reference'), 'al-bayan-cross-reference.md includes the heading');
assert(alBayanCrossReferenceMarkdown.includes('Frontier exceptions'), 'al-bayan-cross-reference.md includes the exception table');
assert(siteData._generated_from.includes('dist/review/al-bayan-cross-reference.json'), 'site-data.json records al-bayan-cross-reference.json as an input');
assert(JSON.stringify(siteData.source_frontiers.al_bayan.covered_surahs) === JSON.stringify(expectedAlBayanFrontierSurahs), 'site-data.json exposes the checked-in al-Bayan frontier coverage');
assert(siteData.summary.primary_source_frontier.al_bayan.exact_rows_missing_primary_evidence === 0, 'site-data.json exposes the al-Bayan primary frontier completeness summary');

section('Mushaf pair summaries');

for (const surahData of siteData.surahs) {
  const surahRows = siteData.rows.filter(row => row.surah === surahData.surah);

  for (const leftSystemId of systemIds) {
    for (const rightSystemId of systemIds) {
      const summary = buildDifferingAyahSummary(surahRows, leftSystemId, rightSystemId);
      const expectedPoints = surahRows.filter(row => (row.systems[leftSystemId]?.counts_boundary ?? false) !== (row.systems[rightSystemId]?.counts_boundary ?? false));
      const expectedAyahs = [...new Set(expectedPoints.map(row => row.hafs_ayah))].sort((left, right) => left - right);
      const expandedRanges = summary.ranges.flatMap(range => buildRange(range.start, range.end));
      const expectedEndPoints = expectedPoints.filter(row => row.kind === 'end').length;
      const expectedInternalPoints = expectedPoints.filter(row => row.kind === 'internal').length;

      assert(summary.total_points === expectedPoints.length, `surah ${surahData.surah} ${leftSystemId}/${rightSystemId}: pair-summary point count matches boundary rows`);
      assert(summary.total_ayahs === expectedAyahs.length, `surah ${surahData.surah} ${leftSystemId}/${rightSystemId}: pair-summary ayah count matches boundary rows`);
      assert(JSON.stringify(summary.ayahs.map(entry => entry.ayah)) === JSON.stringify(expectedAyahs), `surah ${surahData.surah} ${leftSystemId}/${rightSystemId}: pair-summary ayah list matches boundary rows`);
      assert(JSON.stringify(expandedRanges) === JSON.stringify(expectedAyahs), `surah ${surahData.surah} ${leftSystemId}/${rightSystemId}: pair-summary ranges expand back to the ayah list`);
      assert(summary.by_kind.end === expectedEndPoints, `surah ${surahData.surah} ${leftSystemId}/${rightSystemId}: pair-summary end count matches boundary rows`);
      assert(summary.by_kind.internal === expectedInternalPoints, `surah ${surahData.surah} ${leftSystemId}/${rightSystemId}: pair-summary internal count matches boundary rows`);
      assert(summary.range_label === summary.range_labels.join(', '), `surah ${surahData.surah} ${leftSystemId}/${rightSystemId}: pair-summary range label joins the visible ranges`);

      if (leftSystemId === rightSystemId) {
        assert(summary.total_points === 0 && summary.total_ayahs === 0, `surah ${surahData.surah} ${leftSystemId}/${rightSystemId}: identical systems yield no pair differences`);
      }
    }
  }
}

section('Mushaf viewer data');

assert(existsSync(mushafViewerDir), 'site/public/generated/mushaf exists');
const mushafViewerFiles = readdirSync(mushafViewerDir).filter(filename => filename.endsWith('.json')).sort();
assert(mushafViewerFiles.length === 114, '114 mushaf viewer surah files are generated');
assert(plainMushafLines.length === 6236, 'attached plain mushaf has 6236 Kufi-indexed lines');
assert(uthmaniMushafLines.length === 6236, 'attached Uthmani mushaf has 6236 Kufi-indexed lines');

let mushafLineOffset = 0;
for (const surahData of siteData.surahs) {
  const paddedSurah = String(surahData.surah).padStart(3, '0');
  const filename = `surah-${paddedSurah}.json`;
  const filePath = join(mushafViewerDir, filename);

  assert(existsSync(filePath), `${filename} exists`);

  if (!existsSync(filePath)) {
    mushafLineOffset += surahData.counts.kufi;
    continue;
  }

  const viewer = JSON.parse(readFileSync(filePath, 'utf-8'));
  const surahRows = siteData.rows.filter(row => row.surah === surahData.surah);

  assert(viewer.surah === surahData.surah, `${filename}: surah number matches`);
  assert(viewer.kufi_ayah_count === surahData.counts.kufi, `${filename}: Kufi ayah count matches site-data`);
  assert(Array.isArray(viewer.ayahs) && viewer.ayahs.length === surahData.counts.kufi, `${filename}: ayah array length matches Kufi count`);
  assert(Object.keys(viewer.boundary_positions).length === surahRows.length, `${filename}: boundary position count matches disputed rows in the surah`);

  for (const ayahRecord of viewer.ayahs) {
    const globalLineIndex = mushafLineOffset + ayahRecord.ayah - 1;
    const expectedPlain = plainMushafLines[globalLineIndex];
    const expectedUthmani = uthmaniMushafLines[globalLineIndex];
    const combinedUthmani = ayahRecord.uthmani_prefix
      ? `${ayahRecord.uthmani_prefix} ${ayahRecord.uthmani_text}`
      : ayahRecord.uthmani_text;

    assert(ayahRecord.plain_text === expectedPlain, `${filename}: ayah ${ayahRecord.ayah} plain text matches source`);
    assert(combinedUthmani === expectedUthmani, `${filename}: ayah ${ayahRecord.ayah} Uthmani text matches source after optional basmala split`);
    assert(Array.isArray(ayahRecord.plain_tokens) && ayahRecord.plain_tokens.length > 0, `${filename}: ayah ${ayahRecord.ayah} plain tokens are present`);
    assert(Array.isArray(ayahRecord.uthmani_tokens) && ayahRecord.uthmani_tokens.length > 0, `${filename}: ayah ${ayahRecord.ayah} Uthmani tokens are present`);

    if (surahData.surah > 1 && surahData.surah !== 9 && ayahRecord.ayah === 1 && expectedUthmani.startsWith(`${UTHMANI_BASMALA} `)) {
      assert(ayahRecord.uthmani_prefix === UTHMANI_BASMALA, `${filename}: surah-opening basmala is split out for Uthmani ayah 1`);
    } else {
      assert(ayahRecord.uthmani_prefix === null, `${filename}: no unexpected Uthmani basmala prefix is exposed`);
    }
  }

  for (const row of surahRows) {
    const position = viewer.boundary_positions[row.anchor_key];

    assert(Boolean(position), `${filename}: boundary position exists for ${row.anchor_key}`);

    if (!position) {
      continue;
    }

    const ayahRecord = viewer.ayahs[position.ayah - 1];
    assert(position.ayah === row.hafs_ayah, `${filename}: ${row.anchor_key} ayah index matches`);
    assert(position.kind === row.kind, `${filename}: ${row.anchor_key} kind matches`);
    assert(position.word === row.word, `${filename}: ${row.anchor_key} anchor word matches`);
    assert(position.plain_after_token >= 1 && position.plain_after_token <= ayahRecord.plain_tokens.length, `${filename}: ${row.anchor_key} plain token position is in range`);
    assert(position.uthmani_after_token >= 1 && position.uthmani_after_token <= ayahRecord.uthmani_tokens.length, `${filename}: ${row.anchor_key} Uthmani token position is in range`);
    assert(['exact', 'approximate'].includes(position.uthmani_resolution), `${filename}: ${row.anchor_key} Uthmani resolution uses a known value`);

    if (row.kind === 'end') {
      assert(position.plain_after_token === ayahRecord.plain_tokens.length, `${filename}: ${row.anchor_key} plain end marker lands on the ayah end`);
      assert(position.uthmani_after_token === ayahRecord.uthmani_tokens.length, `${filename}: ${row.anchor_key} Uthmani end marker lands on the ayah end`);
    } else {
      assert(position.plain_after_token < ayahRecord.plain_tokens.length, `${filename}: ${row.anchor_key} plain internal marker lands before the ayah end`);
      assert(position.uthmani_after_token < ayahRecord.uthmani_tokens.length, `${filename}: ${row.anchor_key} Uthmani internal marker lands before the ayah end`);
    }
  }

  mushafLineOffset += surahData.counts.kufi;
}

section('Kufan Total Ayah Count');

const kufiCountsFile = loadDist('surah-counts/kufi.json');
assert(kufiCountsFile._total_ayahs === 6236, 'Kufan total = 6236');

let kufiSum = 0;
for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
  kufiSum += kufiCountsFile.surahs[String(surahNumber)];
}
assert(kufiSum === 6236, 'Kufan surah-count sum = 6236');

section('Counting System Totals');

for (const [systemId, system] of Object.entries(countingSystems)) {
  const surahCountsFile = loadDist(`surah-counts/${systemId}.json`);
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

  const mapping = loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const mappingCount = mapping.surahs[String(surahNumber)].target_ayah_count;
    const countFileCount = surahCountsFile.surahs[String(surahNumber)];
    assert(mappingCount === countFileCount, `${systemId}: surah ${surahNumber} mapping count matches surah-counts`);
  }
}

section('Al-Fatiha — All 7 ayahs');

for (const systemId of nonKufiIds) {
  const mapping = loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  assert(mapping.surahs['1'].target_ayah_count === 7, `${systemId}: Fatiha target count = 7`);
}

section('Basmalah handling in Fatiha');

for (const systemId of nonKufiIds) {
  const mapping = loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);
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
  const mapping = loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  assert(mapping.surahs['1'].ayahs['1'].status === 'merged', `${systemId}: Basmalah merged in Fatiha`);
}

{
  const mapping = loadDist('mappings/by-counting-system/kufi-to-makki.json');
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
  const mapping = loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  const baqarah = mapping.surahs['2'];
  assert(baqarah.hafs_ayah_count === 286, `${systemId}: Surah 2 Hafs count = 286`);
  assert(baqarah.target_ayah_count === expectedBaqarahCounts[systemId], `${systemId}: Surah 2 target count = ${expectedBaqarahCounts[systemId]}`);
}

section('Last Madinan scholarly totals');

{
  const counts = loadDist('surah-counts/madani-last.json');
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
  const counts = loadDist('surah-counts/basri.json');
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
  const counts = loadDist('surah-counts/makki.json');
  const mapping = loadDist('mappings/by-counting-system/kufi-to-makki.json');
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
  const mapping = loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);
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
    mapping = loadDist(`mappings/by-counting-system/${filename}`);
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
    reverse = loadDist(`mappings/by-counting-system/${filename}`);
  } catch {
    assert(false, `Missing mappings/by-counting-system/${filename}`);
    continue;
  }

  const forward = loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);

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
  const forward = loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  const aggregateFromFile = buildDifferenceAggregate(block.items);
  const aggregateFromForward = buildBoundaryAggregateFromForwardMapping(forward);
  const totalFromBoundaryFile = kufiCountsFile._total_ayahs - aggregateFromFile.mergeCount + aggregateFromFile.splitCount;

  assert(block._source_mapping_file === `mappings/by-counting-system/kufi-to-${systemId}.json`, `${systemId}: boundary block points at the correct source mapping within dist`);
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
    counts = loadDist(`surah-counts/${filename}`);
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

const rawisDir = distRawisDir;
const rawiFilesOnDisk = new Set(readdirSync(rawisDir).filter(filename => filename.endsWith('.json')));
assert(rawiFilesOnDisk.size === 20, 'There are 20 rawi metadata files');

for (const { rawiSlug, qiraaSlug, countingSystem } of allRawis) {
  const filename = `${rawiSlug}.json`;
  assert(rawiFilesOnDisk.has(filename), `rawis/${filename} exists`);
  if (!rawiFilesOnDisk.has(filename)) {
    continue;
  }

  const rawi = loadDist(`rawis/${filename}`);
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
    assert(existsSync(distPath(rawi._mapping_file)), `${filename}: _mapping_file exists`);
  }
}

section('Rawi Alias Mapping Files');

const rawiMappingsDir = distMappingsByRawiDir;
const rawiAliasFiles = new Set(readdirSync(rawiMappingsDir).filter(filename => filename.endsWith('.json')));
assert(rawiAliasFiles.size === nonKufiRawis.length * 2, 'There are 2 alias mapping files for every non-Kufi rawi');

for (const { rawiSlug, countingSystem } of nonKufiRawis) {
  const forwardAlias = `hafs-to-${rawiSlug}.json`;
  const reverseAlias = `${rawiSlug}-to-hafs.json`;
  assert(rawiAliasFiles.has(forwardAlias), `mappings/by-rawi/${forwardAlias} exists`);
  assert(rawiAliasFiles.has(reverseAlias), `mappings/by-rawi/${reverseAlias} exists`);

  const forward = loadDist(`mappings/by-rawi/${forwardAlias}`);
  const reverse = loadDist(`mappings/by-rawi/${reverseAlias}`);
  assert(forward._rawi === rawiSlug, `${forwardAlias}: _rawi matches`);
  assert(forward._source === 'kufi' && forward._target === countingSystem, `${forwardAlias}: source/target are correct`);
  assert(reverse._rawi === rawiSlug, `${reverseAlias}: _rawi matches`);
  assert(reverse._source === countingSystem && reverse._target === 'kufi', `${reverseAlias}: source/target are correct`);
}

section('Site Data');

assert(Array.isArray(siteData.system_order) && siteData.system_order.length === systemIds.length, 'site data includes full system order');
assert(JSON.stringify(siteData.review_status_order) === JSON.stringify(VERIFICATION_STATUS_ORDER), 'site data preserves verification status order');
assert(siteData.summary.total_points === reviewData.summary.total_points, 'site data summary total_points matches review data');
assert(siteData.summary.evidence.total_items === siteData.rows.reduce((sum, row) => sum + row.evidence_count, 0), 'site data evidence total matches row evidence counts');
assert(siteData.summary.evidence.points_uncited === siteData.summary.by_verification_status.uncited, 'site data uncited evidence summary matches verification summary');
assert(siteData.summary.attestations.with_explicit_policy === Object.keys(siteData.attestations).length, 'site data attestation summary matches attestation records');
assert(siteData.systems.length === systemIds.length, 'site data includes all systems');
assert(siteData.surahs.length === 114, 'site data includes 114 surah summaries');
assert(siteData.rows.length === reviewData.rows.length, 'site data includes every review row');

const siteRowsBySurah = new Map(Array.from({ length: 114 }, (_, index) => [index + 1, []]));
for (const row of siteData.rows) {
  siteRowsBySurah.get(row.surah).push(row);
  assert(row.location_label === `${row.surah}:${row.hafs_ayah}`, `site data row ${row.anchor_key} has canonical location_label`);
  assert(row.counted_by_count === row.counted_by.length, `site data row ${row.anchor_key} counted_by_count matches counted_by length`);
  assert(row.omitted_by_count === row.omitted_by.length, `site data row ${row.anchor_key} omitted_by_count matches omitted_by length`);
}

for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
  const labels = siteRowsBySurah.get(surahNumber).map(row => row.ayah_slot_label);
  assert(new Set(labels).size === labels.length, `site data surah ${surahNumber} has unique ayah_slot_label values`);
}

for (const system of siteData.systems) {
  const reviewSummary = reviewData.summary.by_system[system.id];
  const profile = siteData.system_profiles[system.id];
  const verificationProfile = siteData.verification_profiles[system.id];
  const relationship = siteData.system_relationships[system.id];
  assert(!!reviewSummary, `site data: ${system.id} exists in review summary`);
  assert(Array.isArray(profile) && profile.length === 114, `site data: ${system.id} has 114 profile rows`);
  assert(system.counts_boundary === reviewSummary.counts_boundary, `site data: ${system.id} counts_boundary matches review data`);
  assert(system.merge_effects === reviewSummary.merge_effects, `site data: ${system.id} merge_effects match review data`);
  assert(verificationProfile.total_points === system.counts_boundary, `site data: ${system.id} verification profile total matches counted points`);
  const verificationSum = Object.values(verificationProfile.by_status).reduce((sum, value) => sum + value, 0);
  assert(verificationSum === verificationProfile.total_points, `site data: ${system.id} verification-status totals sum correctly`);
  assert(relationship.nearest.right_system_id !== system.id, `site data: ${system.id} nearest system is another system`);
  assert(relationship.farthest.right_system_id !== system.id, `site data: ${system.id} farthest system is another system`);
}

assert(siteData.system_distance_matrix.length === systemIds.length * systemIds.length, 'site data includes every pairwise system-distance cell');

for (const cell of siteData.system_distance_matrix) {
  if (cell.left_system_id === cell.right_system_id) {
    assert(cell.differing_points === 0, `site data distance diagonal ${cell.left_system_id} = 0`);
  }

  const mirror = siteData.system_distance_matrix.find(other => other.left_system_id === cell.right_system_id && other.right_system_id === cell.left_system_id);
  assert(Boolean(mirror), `site data distance mirror exists for ${cell.left_system_id}/${cell.right_system_id}`);
  if (mirror) {
    assert(cell.differing_points === mirror.differing_points, `site data distance matrix is symmetric for ${cell.left_system_id}/${cell.right_system_id}`);
  }
}

assert(siteData.review_queue.length === systemIds.length, 'site data review queue includes every system');
for (let index = 1; index < siteData.review_queue.length; index += 1) {
  const previous = siteData.review_queue[index - 1];
  const current = siteData.review_queue[index];
  assert(previous.uncited_points <= current.uncited_points, 'site data review queue is ordered by uncited counted points');
}

for (const system of siteData.systems) {
  const profile = siteData.system_profiles[system.id];
  for (const entry of profile) {
    const drift = siteData.surah_drifts[system.id][String(entry.surah)];
    assert(Array.isArray(drift) && drift.length >= 1, `site data: ${system.id} surah ${entry.surah} has a drift profile`);
    const finalPoint = drift[drift.length - 1];
    assert(finalPoint.cumulative_delta === entry.delta_from_kufi, `site data: ${system.id} surah ${entry.surah} drift closes at the correct delta`);
  }
}

section('Cleanup');

assert(!existsSync(sourcePath('hafs-surah-ayah-counts.json')), 'Deprecated hafs-surah-ayah-counts.json is absent');
assert(!existsSync(sourcePath('differences.json')), 'Source data omits generated differences.json');
assert(!existsSync(sourcePath('boundary-events.json')), 'Source data omits generated boundary-events.json');
assert(!existsSync(sourcePath('differences-reconciliation.json')), 'Source data omits generated differences-reconciliation.json');
assert(!existsSync(sourcePath('classical-count-attestations.json')), 'Source data omits generated classical-count-attestations.json');
assert(!existsSync(sourcePath('rawis')), 'Source data omits generated rawis directory');
assert(!existsSync(sourcePath('mappings')), 'Source data omits generated mappings directory');
assert(!existsSync(sourcePath('surah-counts')), 'Source data omits generated surah-counts directory');

section('Bidirectional Consistency');

for (const systemId of nonKufiIds) {
  const forward = loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  const reverse = loadDist(`mappings/by-counting-system/${systemId}-to-kufi.json`);

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
  const mapping = loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);
  const counts = loadDist(`surah-counts/${systemId}.json`);

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
