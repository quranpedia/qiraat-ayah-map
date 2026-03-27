/**
 * Generate scholar-review packets and frontend-friendly review data from the
 * canonical primitive and evidence source layers.
 *
 * Usage: node scripts/generate-review-artifacts.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { flattenBookBoundaryReviewRows, normalizeBookBoundaryEvidenceDocument, VERIFICATION_STATUS_ORDER } from './lib/book-evidence-utils.mjs';
import { normalizeBookBoundaryPrimitivesDocument } from './lib/book-primitives-utils.mjs';
import {
  distPath,
  distReviewDir,
  distReviewSystemsDir,
  repoDir,
  sourcePath
} from './lib/repo-paths.mjs';

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const version = pkg.version;
const countingSystems = JSON.parse(readFileSync(sourcePath('counting-systems.json'), 'utf-8'));
const primitives = JSON.parse(readFileSync(sourcePath('book-boundary-primitives.json'), 'utf-8'));
const evidence = JSON.parse(readFileSync(sourcePath('book-boundary-evidence.json'), 'utf-8'));
const classicalCountAttestations = JSON.parse(readFileSync(distPath('classical-count-attestations.json'), 'utf-8'));

const normalizedPrimitives = normalizeBookBoundaryPrimitivesDocument(primitives, countingSystems, version);
const normalizedEvidence = normalizeBookBoundaryEvidenceDocument(evidence, normalizedPrimitives, countingSystems, version);
const rows = flattenBookBoundaryReviewRows(normalizedPrimitives, normalizedEvidence);
const orderedSystemIds = normalizedPrimitives._counting_system_order;

mkdirSync(distReviewDir, { recursive: true });
mkdirSync(distReviewSystemsDir, { recursive: true });

function summarizeRows() {
  const byKind = Object.fromEntries(['end', 'internal'].map(kind => [kind, 0]));
  const byVerificationStatus = Object.fromEntries(VERIFICATION_STATUS_ORDER.map(status => [status, 0]));
  const bySystem = {};

  for (const systemId of orderedSystemIds) {
    bySystem[systemId] = {
      counts_boundary: 0,
      does_not_count_boundary: 0,
      split_effects: 0,
      merge_effects: 0,
      fully_reviewed_points: 0,
      outstanding_points: 0
    };
  }

  for (const row of rows) {
    byKind[row.kind] += 1;
    byVerificationStatus[row.verification_status] += 1;

    for (const systemId of orderedSystemIds) {
      const view = row.systems[systemId];
      if (view.counts_boundary) {
        bySystem[systemId].counts_boundary += 1;
      } else {
        bySystem[systemId].does_not_count_boundary += 1;
      }

      if (view.numbering_effect === 'split') {
        bySystem[systemId].split_effects += 1;
      }

      if (view.numbering_effect === 'merge') {
        bySystem[systemId].merge_effects += 1;
      }

      if (row.verification_status === 'primary_cited_and_reviewed') {
        bySystem[systemId].fully_reviewed_points += 1;
      } else {
        bySystem[systemId].outstanding_points += 1;
      }
    }
  }

  return {
    total_points: rows.length,
    by_kind: byKind,
    by_verification_status: byVerificationStatus,
    by_system: bySystem
  };
}

const summary = summarizeRows();

const reviewData = {
  _version: version,
  _generated_from: [
    'data/book-boundary-primitives.json',
    'data/book-boundary-evidence.json'
  ],
  _counting_system_order: orderedSystemIds,
  summary,
  rows
};

writeFileSync(
  join(distReviewDir, 'review-data.json'),
  JSON.stringify(reviewData, null, 2) + '\n'
);
console.log('  Generated: dist/review/review-data.json');

function csvEscape(value) {
  const stringValue = value == null ? '' : String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
}

const csvColumns = [
  'surah',
  'hafs_ayah',
  'kind',
  'word',
  ...orderedSystemIds,
  'verification_status',
  'evidence_count',
  'primary_evidence_count',
  'reviewer_count',
  'supported_systems',
  'note'
];

const csvLines = [csvColumns.join(',')];
for (const row of rows) {
  const values = [
    row.surah,
    row.hafs_ayah,
    row.kind,
    row.word,
    ...orderedSystemIds.map(systemId => row.systems[systemId].counts_boundary ? 'counts' : ''),
    row.verification_status,
    row.evidence_count,
    row.primary_evidence_count,
    row.reviewer_count,
    row.supported_systems.join('|'),
    row.note || ''
  ];

  csvLines.push(values.map(csvEscape).join(','));
}

writeFileSync(join(distReviewDir, 'master-matrix.csv'), csvLines.join('\n') + '\n');
console.log('  Generated: dist/review/master-matrix.csv');

function renderMarkdownTable(headers, rowsToRender) {
  const headerLine = `| ${headers.join(' | ')} |`;
  const dividerLine = `| ${headers.map(() => '---').join(' | ')} |`;
  const bodyLines = rowsToRender.map(row => `| ${row.join(' | ')} |`);
  return [headerLine, dividerLine, ...bodyLines].join('\n');
}

function summarizeVerificationStatuses(rowSubset) {
  const counts = Object.fromEntries(VERIFICATION_STATUS_ORDER.map(status => [status, 0]));
  for (const row of rowSubset) {
    counts[row.verification_status] += 1;
  }
  return counts;
}

function numberingEffectLabel(systemId, row) {
  const effect = row.systems[systemId].numbering_effect;
  if (effect === 'split') {
    return 'split';
  }
  if (effect === 'merge') {
    return 'merge';
  }
  return 'same';
}

function projectStanceLabel(systemId, row) {
  return row.systems[systemId].counts_boundary ? 'counts' : 'does not count';
}

for (const systemId of orderedSystemIds) {
  const system = countingSystems[systemId];
  const systemRows = rows.filter(row => row.systems[systemId].counts_boundary);
  const omittedRows = rows.filter(row => !row.systems[systemId].counts_boundary);
  const statusCounts = summarizeVerificationStatuses(rows);

  const countedTableRows = systemRows.map(row => [
    `${row.surah}:${row.hafs_ayah}`,
    row.kind,
    row.word,
    numberingEffectLabel(systemId, row),
    row.verification_status,
    String(row.evidence_count)
  ]);

  const omittedTableRows = omittedRows.map(row => [
    `${row.surah}:${row.hafs_ayah}`,
    row.kind,
    row.word,
    numberingEffectLabel(systemId, row),
    row.verification_status,
    String(row.evidence_count)
  ]);

  const lines = [
    `# Review packet — ${system.name_en} (${system.name_ar})`,
    '',
    'Generated from `data/book-boundary-primitives.json` and `data/book-boundary-evidence.json`.',
    '',
    `- Disputed boundaries counted by this system: ${summary.by_system[systemId].counts_boundary}`,
    `- Disputed boundaries not counted by this system: ${summary.by_system[systemId].does_not_count_boundary}`,
    `- Numbering-changing split points vs. Kufi: ${summary.by_system[systemId].split_effects}`,
    `- Numbering-changing merge points vs. Kufi: ${summary.by_system[systemId].merge_effects}`,
    `- Fully reviewed points: ${summary.by_system[systemId].fully_reviewed_points}`,
    `- Outstanding points: ${summary.by_system[systemId].outstanding_points}`,
    '',
    '## Verification status totals across the master matrix',
    '',
    renderMarkdownTable(
      ['Status', 'Count'],
      VERIFICATION_STATUS_ORDER.map(status => [status, String(statusCounts[status])])
    ),
    '',
    '## Boundaries counted by this system',
    '',
    countedTableRows.length > 0
      ? renderMarkdownTable(['Location', 'Kind', 'Word', 'Effect vs. Kufi', 'Verification', 'Evidence'], countedTableRows)
      : '_None._',
    '',
    '## Boundaries not counted by this system',
    '',
    omittedTableRows.length > 0
      ? renderMarkdownTable(['Location', 'Kind', 'Word', 'Effect vs. Kufi', 'Verification', 'Evidence'], omittedTableRows)
      : '_None._',
    ''
  ];

  writeFileSync(join(distReviewSystemsDir, `${systemId}.md`), lines.join('\n'));
  console.log(`  Generated: dist/review/systems/${systemId}.md`);
}

const totalsRows = orderedSystemIds.map(systemId => {
  const surahCounts = JSON.parse(readFileSync(distPath('surah-counts', `${systemId}.json`), 'utf-8'));
  const attestation = classicalCountAttestations.systems?.[systemId];
  return [
    systemId,
    countingSystems[systemId].name_en,
    String(surahCounts._total_ayahs),
    attestation?.status || 'n/a',
    attestation?.primary_classical_total_ayahs != null ? String(attestation.primary_classical_total_ayahs) : '',
    attestation?.delta_from_primary != null ? String(attestation.delta_from_primary) : ''
  ];
});

writeFileSync(
  join(distReviewDir, 'totals.md'),
  [
    '# Totals review sheet',
    '',
    'Generated from the canonical source layer and the generated classical-count attestation file.',
    '',
    renderMarkdownTable(
      ['System ID', 'Name', 'Mapping total', 'Attestation status', 'Primary attested total', 'Delta'],
      totalsRows
    ),
    ''
  ].join('\n')
);
console.log('  Generated: dist/review/totals.md');

const outstandingRows = rows.filter(row => row.verification_status !== 'primary_cited_and_reviewed');
const outstandingByStatus = summarizeVerificationStatuses(outstandingRows);

const outstandingSummaryRows = VERIFICATION_STATUS_ORDER
  .filter(status => outstandingByStatus[status] > 0)
  .map(status => [status, String(outstandingByStatus[status])]);

const outstandingDetailRows = outstandingRows.map(row => [
  `${row.surah}:${row.hafs_ayah}`,
  row.kind,
  row.word,
  row.counted_by.join(', '),
  row.verification_status,
  String(row.evidence_count)
]);

writeFileSync(
  join(distReviewDir, 'open-questions.md'),
  [
    '# Open questions',
    '',
    `Outstanding disputed-boundary claims: ${outstandingRows.length}`,
    '',
    outstandingSummaryRows.length > 0
      ? renderMarkdownTable(['Verification status', 'Count'], outstandingSummaryRows)
      : '_No outstanding points._',
    '',
    '## Outstanding rows',
    '',
    outstandingDetailRows.length > 0
      ? renderMarkdownTable(['Location', 'Kind', 'Word', 'Counted by', 'Verification', 'Evidence'], outstandingDetailRows)
      : '_No outstanding rows._',
    ''
  ].join('\n')
);
console.log('  Generated: dist/review/open-questions.md');

writeFileSync(
  join(distReviewDir, 'README.md'),
  [
    '# Review artifacts',
    '',
    'This directory is generated from the canonical source files under `data/`.',
    '',
    '- `review-data.json` — frontend-friendly flattened review dataset',
    '- `master-matrix.csv` — spreadsheet-friendly review matrix',
    '- `totals.md` — per-system totals sheet',
    '- `open-questions.md` — points that are not yet `primary_cited_and_reviewed`',
    '- `systems/*.md` — one review packet per counting system',
    ''
  ].join('\n')
);
console.log('  Generated: dist/review/README.md');
