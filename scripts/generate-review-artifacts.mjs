/**
 * Generate scholar-review packets and frontend-friendly review data from the
 * canonical primitive and evidence source layers.
 *
 * Usage: node scripts/generate-review-artifacts.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import {
  flattenBookBoundaryReviewRows,
  normalizeBookBoundaryEvidenceDocument,
  VERIFICATION_STATUS_ORDER
} from './lib/book-evidence-utils.mjs'
import { normalizeBookBoundaryPrimitivesDocument } from './lib/book-primitives-utils.mjs'
import {
  distPath,
  distReviewDir,
  distReviewSystemsDir,
  repoDir,
  sourcePath
} from './lib/repo-paths.mjs'

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'))
const version = pkg.version
const counting_systems = JSON.parse(readFileSync(sourcePath('counting-systems.json'), 'utf-8'))
const primitives = JSON.parse(readFileSync(sourcePath('book-boundary-primitives.json'), 'utf-8'))
const evidence = JSON.parse(readFileSync(sourcePath('book-boundary-evidence.json'), 'utf-8'))
const classical_count_attestations = JSON.parse(readFileSync(distPath('classical-count-attestations.json'), 'utf-8'))

const normalized_primitives = normalizeBookBoundaryPrimitivesDocument(primitives, counting_systems, version)
const normalized_evidence = normalizeBookBoundaryEvidenceDocument(evidence, normalized_primitives, counting_systems, version)
const rows = flattenBookBoundaryReviewRows(normalized_primitives, normalized_evidence)
const ordered_system_ids = normalized_primitives._counting_system_order

mkdirSync(distReviewDir, { recursive: true })
mkdirSync(distReviewSystemsDir, { recursive: true })

function summarize_verification_statuses(row_subset) {
  const counts = Object.fromEntries(VERIFICATION_STATUS_ORDER.map(status => [status, 0]))

  for (const row of row_subset) {
    counts[row.verification_status] += 1
  }

  return counts
}

function summarize_rows() {
  const by_kind = Object.fromEntries(['end', 'internal'].map(kind => [kind, 0]))
  const by_verification_status = Object.fromEntries(VERIFICATION_STATUS_ORDER.map(status => [status, 0]))
  const by_system = {}

  for (const system_id of ordered_system_ids) {
    by_system[system_id] = {
      counts_boundary: 0,
      does_not_count_boundary: 0,
      split_effects: 0,
      merge_effects: 0,
      fully_reviewed_points: 0,
      outstanding_points: 0
    }
  }

  for (const row of rows) {
    by_kind[row.kind] += 1
    by_verification_status[row.verification_status] += 1

    for (const system_id of ordered_system_ids) {
      const view = row.systems[system_id]

      if (view.counts_boundary) {
        by_system[system_id].counts_boundary += 1
      } else {
        by_system[system_id].does_not_count_boundary += 1
      }

      if (view.numbering_effect === 'split') {
        by_system[system_id].split_effects += 1
      }

      if (view.numbering_effect === 'merge') {
        by_system[system_id].merge_effects += 1
      }

      if (row.verification_status === 'primary_cited_and_reviewed') {
        by_system[system_id].fully_reviewed_points += 1
      } else {
        by_system[system_id].outstanding_points += 1
      }
    }
  }

  return {
    total_points: rows.length,
    by_kind,
    by_verification_status,
    by_system
  }
}

function build_system_distance_matrix() {
  const cells = []

  for (const left_system_id of ordered_system_ids) {
    for (const right_system_id of ordered_system_ids) {
      let differing_points = 0
      let same_numbering_effect_points = 0

      for (const row of rows) {
        const left_view = row.systems[left_system_id]
        const right_view = row.systems[right_system_id]

        if (left_view.counts_boundary !== right_view.counts_boundary) {
          differing_points += 1
        }

        if (left_view.numbering_effect === right_view.numbering_effect) {
          same_numbering_effect_points += 1
        }
      }

      const total_points = rows.length
      cells.push({
        left_system_id,
        right_system_id,
        left_name: counting_systems[left_system_id].name_en,
        right_name: counting_systems[right_system_id].name_en,
        differing_points,
        agreement_points: total_points - differing_points,
        difference_ratio: total_points === 0 ? 0 : differing_points / total_points,
        same_numbering_effect_points
      })
    }
  }

  return cells
}

function build_system_verification_profiles() {
  const profiles = {}

  for (const system_id of ordered_system_ids) {
    const counted_rows = rows.filter(row => row.systems[system_id].counts_boundary)
    const by_status = summarize_verification_statuses(counted_rows)

    profiles[system_id] = {
      total_points: counted_rows.length,
      by_status,
      points_with_evidence: counted_rows.filter(row => row.evidence_count > 0).length,
      points_with_primary_evidence: counted_rows.filter(row => row.primary_evidence_count > 0).length,
      points_reviewed: counted_rows.filter(row => row.reviewer_count > 0).length,
      uncited_points: by_status.uncited,
      cited_points: counted_rows.length - by_status.uncited
    }
  }

  return profiles
}

function build_evidence_ledger() {
  const ledger = new Map()

  for (const row of rows) {
    for (const item of row.evidence) {
      const key = `${item.work}||${item.edition || ''}`

      if (!ledger.has(key)) {
        ledger.set(key, {
          work: item.work,
          edition: item.edition || null,
          evidence_items: 0,
          point_keys: new Set(),
          system_ids: new Set(),
          locations: []
        })
      }

      const entry = ledger.get(key)
      entry.evidence_items += 1
      entry.point_keys.add(row.anchor_key)
      item.supports.forEach(system_id => entry.system_ids.add(system_id))
      entry.locations.push(`${row.surah}:${row.hafs_ayah} ${row.word}`)
    }
  }

  return Array.from(ledger.values())
    .map(entry => ({
      work: entry.work,
      edition: entry.edition,
      evidence_items: entry.evidence_items,
      cited_points: entry.point_keys.size,
      system_ids: ordered_system_ids.filter(system_id => entry.system_ids.has(system_id)),
      sample_locations: entry.locations.slice(0, 8)
    }))
    .sort((left, right) => right.cited_points - left.cited_points || left.work.localeCompare(right.work, 'ar'))
}

function build_review_queue(system_verification_profiles) {
  return ordered_system_ids
    .map(system_id => ({
      system_id,
      name_en: counting_systems[system_id].name_en,
      name_ar: counting_systems[system_id].name_ar,
      counted_points: summary.by_system[system_id].counts_boundary,
      uncited_points: system_verification_profiles[system_id].uncited_points,
      cited_points: system_verification_profiles[system_id].cited_points,
      split_effects: summary.by_system[system_id].split_effects,
      merge_effects: summary.by_system[system_id].merge_effects
    }))
    .sort((left, right) => left.uncited_points - right.uncited_points || left.counted_points - right.counted_points || left.system_id.localeCompare(right.system_id))
}

function csv_escape(value) {
  const string_value = value == null ? '' : String(value)

  if (string_value.includes(',') || string_value.includes('"') || string_value.includes('\n')) {
    return `"${string_value.replaceAll('"', '""')}"`
  }

  return string_value
}

function render_markdown_table(headers, rows_to_render) {
  const header_line = `| ${headers.join(' | ')} |`
  const divider_line = `| ${headers.map(() => '---').join(' | ')} |`
  const body_lines = rows_to_render.map(row => `| ${row.join(' | ')} |`)
  return [header_line, divider_line, ...body_lines].join('\n')
}

function numbering_effect_label(system_id, row) {
  const effect = row.systems[system_id].numbering_effect

  if (effect === 'split') {
    return 'split'
  }

  if (effect === 'merge') {
    return 'merge'
  }

  return 'same'
}

const summary = summarize_rows()
const system_distance_matrix = build_system_distance_matrix()
const system_verification_profiles = build_system_verification_profiles()
const evidence_ledger = build_evidence_ledger()
const review_queue = build_review_queue(system_verification_profiles)

const review_data = {
  _version: version,
  _generated_from: [
    'data/book-boundary-primitives.json',
    'data/book-boundary-evidence.json'
  ],
  _counting_system_order: ordered_system_ids,
  summary,
  rows
}

writeFileSync(join(distReviewDir, 'review-data.json'), `${JSON.stringify(review_data, null, 2)}\n`)
console.log('  Generated: dist/review/review-data.json')

const csv_columns = [
  'surah',
  'hafs_ayah',
  'kind',
  'word',
  ...ordered_system_ids,
  'verification_status',
  'evidence_count',
  'primary_evidence_count',
  'reviewer_count',
  'supported_systems',
  'note'
]

const csv_lines = [csv_columns.join(',')]
for (const row of rows) {
  const values = [
    row.surah,
    row.hafs_ayah,
    row.kind,
    row.word,
    ...ordered_system_ids.map(system_id => row.systems[system_id].counts_boundary ? 'counts' : ''),
    row.verification_status,
    row.evidence_count,
    row.primary_evidence_count,
    row.reviewer_count,
    row.supported_systems.join('|'),
    row.note || ''
  ]

  csv_lines.push(values.map(csv_escape).join(','))
}

writeFileSync(join(distReviewDir, 'master-matrix.csv'), `${csv_lines.join('\n')}\n`)
console.log('  Generated: dist/review/master-matrix.csv')

for (const system_id of ordered_system_ids) {
  const system = counting_systems[system_id]
  const counted_rows = rows.filter(row => row.systems[system_id].counts_boundary)
  const omitted_rows = rows.filter(row => !row.systems[system_id].counts_boundary)
  const counted_status_counts = summarize_verification_statuses(counted_rows)
  const omitted_status_counts = summarize_verification_statuses(omitted_rows)

  const counted_table_rows = counted_rows.map(row => [
    `${row.surah}:${row.hafs_ayah}`,
    row.kind,
    row.word,
    numbering_effect_label(system_id, row),
    row.verification_status,
    String(row.evidence_count)
  ])

  const omitted_table_rows = omitted_rows.map(row => [
    `${row.surah}:${row.hafs_ayah}`,
    row.kind,
    row.word,
    numbering_effect_label(system_id, row),
    row.verification_status,
    String(row.evidence_count)
  ])

  const lines = [
    `# Review packet — ${system.name_en} (${system.name_ar})`,
    '',
    'Generated from `data/book-boundary-primitives.json` and `data/book-boundary-evidence.json`.',
    '',
    `- Disputed boundaries counted by this system: ${summary.by_system[system_id].counts_boundary}`,
    `- Disputed boundaries not counted by this system: ${summary.by_system[system_id].does_not_count_boundary}`,
    `- Numbering-changing split points vs. Kufi: ${summary.by_system[system_id].split_effects}`,
    `- Numbering-changing merge points vs. Kufi: ${summary.by_system[system_id].merge_effects}`,
    `- Cited counted points: ${system_verification_profiles[system_id].cited_points}`,
    `- Uncited counted points: ${system_verification_profiles[system_id].uncited_points}`,
    `- Fully reviewed points: ${summary.by_system[system_id].fully_reviewed_points}`,
    `- Outstanding points: ${summary.by_system[system_id].outstanding_points}`,
    '',
    '## Verification status among boundaries counted by this system',
    '',
    render_markdown_table(
      ['Status', 'Count'],
      VERIFICATION_STATUS_ORDER.map(status => [status, String(counted_status_counts[status])])
    ),
    '',
    '## Verification status among boundaries omitted by this system',
    '',
    render_markdown_table(
      ['Status', 'Count'],
      VERIFICATION_STATUS_ORDER.map(status => [status, String(omitted_status_counts[status])])
    ),
    '',
    '## Boundaries counted by this system',
    '',
    counted_table_rows.length > 0
      ? render_markdown_table(['Location', 'Kind', 'Word', 'Effect vs. Kufi', 'Verification', 'Evidence'], counted_table_rows)
      : '_None._',
    '',
    '## Boundaries not counted by this system',
    '',
    omitted_table_rows.length > 0
      ? render_markdown_table(['Location', 'Kind', 'Word', 'Effect vs. Kufi', 'Verification', 'Evidence'], omitted_table_rows)
      : '_None._',
    ''
  ]

  writeFileSync(join(distReviewSystemsDir, `${system_id}.md`), lines.join('\n'))
  console.log(`  Generated: dist/review/systems/${system_id}.md`)
}

const totals_rows = ordered_system_ids.map(system_id => {
  const surah_counts = JSON.parse(readFileSync(distPath('surah-counts', `${system_id}.json`), 'utf-8'))
  const attestation = classical_count_attestations.systems?.[system_id]

  return [
    system_id,
    counting_systems[system_id].name_en,
    String(surah_counts._total_ayahs),
    attestation?.status || 'n/a',
    attestation?.primary_classical_total_ayahs != null ? String(attestation.primary_classical_total_ayahs) : '',
    attestation?.delta_from_primary != null ? String(attestation.delta_from_primary) : ''
  ]
})

writeFileSync(
  join(distReviewDir, 'totals.md'),
  [
    '# Totals review sheet',
    '',
    'Generated from the canonical source layer and the generated classical-count attestation file.',
    '',
    render_markdown_table(
      ['System ID', 'Name', 'Mapping total', 'Attestation status', 'Primary attested total', 'Delta'],
      totals_rows
    ),
    ''
  ].join('\n')
)
console.log('  Generated: dist/review/totals.md')

const workload_rows = review_queue.map(entry => [
  entry.system_id,
  entry.name_en,
  String(entry.counted_points),
  String(entry.uncited_points),
  String(entry.cited_points),
  String(entry.split_effects),
  String(entry.merge_effects)
])

writeFileSync(
  join(distReviewDir, 'workload.md'),
  [
    '# Review workload',
    '',
    'Smaller uncited totals are the easiest full-pass campaigns to complete first.',
    '',
    render_markdown_table(
      ['System ID', 'Name', 'Counted points', 'Uncited', 'Cited', 'Split effects', 'Merge effects'],
      workload_rows
    ),
    ''
  ].join('\n')
)
console.log('  Generated: dist/review/workload.md')

const distance_header = ['System', ...ordered_system_ids.map(system_id => counting_systems[system_id].name_en)]
const distance_rows = ordered_system_ids.map(left_system_id => [
  counting_systems[left_system_id].name_en,
  ...ordered_system_ids.map(right_system_id => {
    const cell = system_distance_matrix.find(
      entry => entry.left_system_id === left_system_id && entry.right_system_id === right_system_id
    )
    return String(cell?.differing_points || 0)
  })
])

writeFileSync(
  join(distReviewDir, 'system-distance.md'),
  [
    '# System distance matrix',
    '',
    'Each cell shows how many disputed boundary points two systems treat differently.',
    '',
    render_markdown_table(distance_header, distance_rows),
    ''
  ].join('\n')
)
console.log('  Generated: dist/review/system-distance.md')

const evidence_rows = evidence_ledger.map(entry => [
  entry.work,
  entry.edition || '',
  String(entry.cited_points),
  String(entry.evidence_items),
  entry.system_ids.join(', '),
  entry.sample_locations.join(' · ')
])

writeFileSync(
  join(distReviewDir, 'evidence-ledger.md'),
  [
    '# Evidence ledger',
    '',
    'Grouped by cited work and edition.',
    '',
    evidence_rows.length > 0
      ? render_markdown_table(['Work', 'Edition', 'Cited points', 'Evidence items', 'Supports', 'Sample locations'], evidence_rows)
      : '_No evidence entries have been recorded yet._',
    ''
  ].join('\n')
)
console.log('  Generated: dist/review/evidence-ledger.md')

const outstanding_rows = rows.filter(row => row.verification_status !== 'primary_cited_and_reviewed')
const outstanding_by_status = summarize_verification_statuses(outstanding_rows)
const outstanding_summary_rows = VERIFICATION_STATUS_ORDER
  .filter(status => outstanding_by_status[status] > 0)
  .map(status => [status, String(outstanding_by_status[status])])
const outstanding_detail_rows = outstanding_rows.map(row => [
  `${row.surah}:${row.hafs_ayah}`,
  row.kind,
  row.word,
  row.counted_by.join(', '),
  row.verification_status,
  String(row.evidence_count)
])

writeFileSync(
  join(distReviewDir, 'open-questions.md'),
  [
    '# Open questions',
    '',
    `Outstanding disputed-boundary claims: ${outstanding_rows.length}`,
    '',
    outstanding_summary_rows.length > 0
      ? render_markdown_table(['Verification status', 'Count'], outstanding_summary_rows)
      : '_No outstanding points._',
    '',
    '## Outstanding rows',
    '',
    outstanding_detail_rows.length > 0
      ? render_markdown_table(['Location', 'Kind', 'Word', 'Counted by', 'Verification', 'Evidence'], outstanding_detail_rows)
      : '_No outstanding rows._',
    ''
  ].join('\n')
)
console.log('  Generated: dist/review/open-questions.md')

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
    '- `workload.md` — citation backlog and campaign sizing by system',
    '- `system-distance.md` — pairwise disagreement counts between systems',
    '- `evidence-ledger.md` — cited works grouped by edition and supported points',
    '- `open-questions.md` — points that are not yet `primary_cited_and_reviewed`',
    '- `systems/*.md` — one review packet per counting system',
    ''
  ].join('\n')
)
console.log('  Generated: dist/review/README.md')
