import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { normalizeBookBoundaryEvidenceDocument } from './lib/book-evidence-utils.mjs';
import { normalizeBookBoundaryPrimitivesDocument } from './lib/book-primitives-utils.mjs';
import {
  AL_BAYAN_EDITION,
  AL_BAYAN_WORK,
  anchorKey,
  buildAlBayanLocator,
  buildDefaultCheckedInAlBayanDir,
  findPrimitivePointEntries,
  loadAlBayanBundle,
  resolveAlBayanMatch
} from './lib/al-bayan-source-utils.mjs';
import { distReviewDir, repoDir, sourcePath } from './lib/repo-paths.mjs';

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function loadCanonicalDocuments() {
  const packageJson = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
  const countingSystems = JSON.parse(readFileSync(sourcePath('counting-systems.json'), 'utf-8'));
  const primitives = JSON.parse(readFileSync(sourcePath('book-boundary-primitives.json'), 'utf-8'));
  const evidence = JSON.parse(readFileSync(sourcePath('book-boundary-evidence.json'), 'utf-8'));

  const normalizedPrimitives = normalizeBookBoundaryPrimitivesDocument(primitives, countingSystems, packageJson.version);
  const normalizedEvidence = normalizeBookBoundaryEvidenceDocument(evidence, normalizedPrimitives, countingSystems, packageJson.version);

  return {
    version: packageJson.version,
    primitives: normalizedPrimitives,
    evidence: normalizedEvidence
  };
}

function ensureEvidencePoint(evidenceDocument, point) {
  const record = evidenceDocument.surahs[String(point.surah)][String(point.hafsAyah)];

  if (point.kind === 'end') {
    return record.end;
  }

  return record.internal.find(item => item.word === point.word);
}

function buildExactMatchRow(point, sourceBundleRecord, evidencePoint, match) {
  const { item, sourceCountedBy } = match.exactItems[0];
  const alBayanEvidence = (evidencePoint.evidence || []).filter(entry => entry.work === AL_BAYAN_WORK && entry.tier === 'primary');

  return {
    anchor_key: anchorKey(point),
    surah: point.surah,
    hafs_ayah: point.hafsAyah,
    kind: point.kind,
    word: point.word,
    project_counted_by: point.countedBy,
    evidence_verification_status: evidencePoint.verification_status,
    has_primary_evidence_entry: alBayanEvidence.length > 0,
    file: sourceBundleRecord.fileName,
    locator: buildAlBayanLocator(sourceBundleRecord.document.structured_data),
    source_phrase_ar: item.phrase_ar,
    source_counted_by: sourceCountedBy,
    occurrence_qualifier_en: item.occurrence_qualifier_en || null,
    cross_surah_note_en: item.cross_surah_note_en || null,
    match_status: 'exact_primary_match'
  };
}

function buildExceptionRow(point, sourceBundleRecord, evidencePoint, match) {
  return {
    anchor_key: anchorKey(point),
    surah: point.surah,
    hafs_ayah: point.hafsAyah,
    kind: point.kind,
    word: point.word,
    project_counted_by: point.countedBy,
    evidence_verification_status: evidencePoint.verification_status,
    has_primary_evidence_entry: (evidencePoint.evidence || []).some(entry => entry.work === AL_BAYAN_WORK && entry.tier === 'primary'),
    file: sourceBundleRecord?.fileName || null,
    locator: sourceBundleRecord ? buildAlBayanLocator(sourceBundleRecord.document.structured_data) : null,
    match_status: match.status,
    candidates: match.overlappingItems.map(({ item, sourceCountedBy }) => ({
      phrase_ar: item.phrase_ar,
      source_counted_by: sourceCountedBy,
      occurrence_qualifier_en: item.occurrence_qualifier_en || null,
      school_level_note_en: item.school_level_note_en || null,
      cross_surah_note_en: item.cross_surah_note_en || null
    })),
    point_note: evidencePoint.note || null
  };
}

function buildMarkdown(report) {
  const lines = [
    '# al-Bayān cross-reference',
    '',
    `Work: ${AL_BAYAN_WORK}`,
    '',
    `Edition: ${AL_BAYAN_EDITION}`,
    '',
    `Covered surahs in checked-in structured bundle: ${report.covered_surahs.join(', ')}`,
    '',
    `Project points inside this frontier: ${report.summary.frontier_point_count}`,
    '',
    `Exact primary matches: ${report.summary.exact_primary_match_count}`,
    '',
    `Frontier exceptions: ${report.summary.exception_count}`,
    ''
  ];

  if (report.summary.exception_count > 0) {
    lines.push('## Frontier exceptions', '', '| Anchor | Status | Source file | Notes |', '| --- | --- | --- | --- |');

    for (const row of report.exceptions) {
      const note = row.point_note || row.candidates.map(item => item.phrase_ar).join(' / ') || '—';
      lines.push(`| ${row.anchor_key} | ${row.match_status} | ${row.file || '—'} | ${note.replace(/\|/g, '\\|')} |`);
    }

    lines.push('');
  }

  lines.push('## Summary', '', '| Metric | Value |', '| --- | ---: |');
  lines.push(`| Exact rows already carrying a primary al-Bayān evidence entry | ${report.summary.exact_rows_with_primary_evidence} |`);
  lines.push(`| Exact rows still missing a primary al-Bayān evidence entry | ${report.summary.exact_rows_missing_primary_evidence} |`);
  lines.push('');

  return `${lines.join('\n')}\n`;
}

function main() {
  const { version, primitives, evidence } = loadCanonicalDocuments();
  const alBayanDir = buildDefaultCheckedInAlBayanDir(repoDir);

  if (!existsSync(alBayanDir)) {
    console.log('No checked-in sources/al_bayan directory found; skipping cross-reference generation.');
    return;
  }

  const alBayanBySurah = loadAlBayanBundle(alBayanDir);
  const coveredSurahs = Array.from(alBayanBySurah.keys()).map(Number).sort((left, right) => left - right);
  const rows = [];
  const exceptions = [];

  for (const point of findPrimitivePointEntries(primitives, coveredSurahs)) {
    const sourceBundleRecord = alBayanBySurah.get(point.surah);
    const evidencePoint = ensureEvidencePoint(evidence, point);
    const match = resolveAlBayanMatch(point, sourceBundleRecord);

    if (match.status === 'exact_primary_match') {
      rows.push(buildExactMatchRow(point, sourceBundleRecord, evidencePoint, match));
      continue;
    }

    exceptions.push(buildExceptionRow(point, sourceBundleRecord, evidencePoint, match));
  }

  const report = {
    _version: version,
    _generated_from: [
      'data/book-boundary-primitives.json',
      'data/book-boundary-evidence.json',
      'sources/al_bayan'
    ],
    work: AL_BAYAN_WORK,
    edition: AL_BAYAN_EDITION,
    covered_surahs: coveredSurahs,
    summary: {
      frontier_point_count: rows.length + exceptions.length,
      exact_primary_match_count: rows.length,
      exception_count: exceptions.length,
      exact_rows_with_primary_evidence: rows.filter(row => row.has_primary_evidence_entry).length,
      exact_rows_missing_primary_evidence: rows.filter(row => !row.has_primary_evidence_entry).length
    },
    exact_matches: rows,
    exceptions
  };

  ensureDir(distReviewDir);
  writeFileSync(join(distReviewDir, 'al-bayan-cross-reference.json'), JSON.stringify(report, null, 2) + '\n');
  writeFileSync(join(distReviewDir, 'al-bayan-cross-reference.md'), buildMarkdown(report));
}

main();
