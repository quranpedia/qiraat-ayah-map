import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { VERIFICATION_STATUS_ORDER } from './lib/book-evidence-utils.mjs'
import { distPath, repoDir, sourcePath } from './lib/repo-paths.mjs'

function load_json(path) {
  return JSON.parse(readFileSync(path, 'utf-8'))
}

function write_json(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`)
}

function suffix_for_index(index) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  return alphabet[index - 1] || String(index)
}

function summarize_evidence(rows) {
  return {
    total_items: rows.reduce((sum, row) => sum + row.evidence_count, 0),
    total_primary_items: rows.reduce((sum, row) => sum + row.primary_evidence_count, 0),
    points_with_evidence: rows.filter(row => row.evidence_count > 0).length,
    points_with_primary_evidence: rows.filter(row => row.primary_evidence_count > 0).length,
    points_reviewed: rows.filter(row => row.verification_status === 'primary_cited_and_reviewed').length,
    points_uncited: rows.filter(row => row.verification_status === 'uncited').length
  }
}

function summarize_attestations(attestations, system_order) {
  const by_status = {}

  for (const system_id of system_order) {
    const status = attestations?.[system_id]?.status || 'missing'
    by_status[status] = (by_status[status] || 0) + 1
  }

  return {
    total_recorded: Object.keys(attestations || {}).length,
    with_explicit_policy: system_order.filter(system_id => Boolean(attestations?.[system_id])).length,
    by_status
  }
}

const counting_systems = load_json(sourcePath('counting-systems.json'))
const review_data = load_json(distPath('review', 'review-data.json'))
const classical_attestations = load_json(distPath('classical-count-attestations.json'))
const system_order = review_data._counting_system_order
const kufi_surah_counts = load_json(distPath('surah-counts', 'kufi.json')).surahs
const surah_counts_by_system = Object.fromEntries(
  system_order.map(system_id => [system_id, load_json(distPath('surah-counts', `${system_id}.json`)).surahs])
)

const rows_by_surah = new Map()
for (let surah = 1; surah <= 114; surah += 1) {
  rows_by_surah.set(surah, [])
}
for (const row of review_data.rows) {
  rows_by_surah.get(row.surah).push(row)
}

const rows = []
for (let surah = 1; surah <= 114; surah += 1) {
  const surah_rows = rows_by_surah.get(surah)
  const duplicate_totals = surah_rows.reduce((map, row) => {
    map.set(row.hafs_ayah, (map.get(row.hafs_ayah) || 0) + 1)
    return map
  }, new Map())
  const seen_within_ayah = new Map()

  surah_rows.forEach((row, index) => {
    const ayah_slot_index = (seen_within_ayah.get(row.hafs_ayah) || 0) + 1
    const ayah_slot_count = duplicate_totals.get(row.hafs_ayah) || 1
    seen_within_ayah.set(row.hafs_ayah, ayah_slot_index)

    rows.push({
      ...row,
      location_label: `${row.surah}:${row.hafs_ayah}`,
      counted_by_count: row.counted_by.length,
      omitted_by_count: row.omitted_by.length,
      surah_row_index: index + 1,
      ayah_slot_index,
      ayah_slot_count,
      ayah_slot_label: `${row.hafs_ayah}${ayah_slot_count > 1 ? suffix_for_index(ayah_slot_index) : ''}`
    })
  })
}

const evidence_summary = summarize_evidence(rows)
const attestation_summary = summarize_attestations(classical_attestations.systems, system_order)

const system_profiles = {}
const systems = system_order.map(system_id => {
  const system = counting_systems[system_id]
  const summary = review_data.summary.by_system[system_id]
  const attestation = classical_attestations.systems?.[system_id] || null

  system_profiles[system_id] = Array.from({ length: 114 }, (_, index) => {
    const surah = index + 1
    const surah_rows = rows_by_surah.get(surah)
    const counted_points = surah_rows.filter(row => row.systems[system_id].counts_boundary).length
    const omitted_points = surah_rows.length - counted_points
    const split_effects = surah_rows.filter(row => row.systems[system_id].numbering_effect === 'split').length
    const merge_effects = surah_rows.filter(row => row.systems[system_id].numbering_effect === 'merge').length
    const ayah_count = surah_counts_by_system[system_id][String(surah)]
    const kufi_ayah_count = kufi_surah_counts[String(surah)]

    return {
      surah,
      ayah_count,
      kufi_ayah_count,
      delta_from_kufi: ayah_count - kufi_ayah_count,
      disputed_points: surah_rows.length,
      counted_points,
      omitted_points,
      split_effects,
      merge_effects
    }
  })

  return {
    id: system_id,
    name_en: system.name_en,
    name_ar: system.name_ar,
    total_ayahs: system.total_ayahs,
    delta_from_kufi: system.total_ayahs - counting_systems.kufi.total_ayahs,
    used_by_qiraat: system.used_by_qiraat,
    counts_boundary: summary.counts_boundary,
    does_not_count_boundary: summary.does_not_count_boundary,
    split_effects: summary.split_effects,
    merge_effects: summary.merge_effects,
    fully_reviewed_points: summary.fully_reviewed_points,
    outstanding_points: summary.outstanding_points,
    attestation_status: attestation?.status || null,
    attestation_total: attestation?.primary_classical_total_ayahs || null,
    attestation_delta: attestation?.delta_from_primary ?? null
  }
})

const surahs = Array.from({ length: 114 }, (_, index) => {
  const surah = index + 1
  const surah_rows = rows_by_surah.get(surah)
  const by_kind = {
    end: surah_rows.filter(row => row.kind === 'end').length,
    internal: surah_rows.filter(row => row.kind === 'internal').length
  }
  const by_verification_status = Object.fromEntries(
    VERIFICATION_STATUS_ORDER.map(status => [status, surah_rows.filter(row => row.verification_status === status).length])
  )

  return {
    surah,
    disputed_points: surah_rows.length,
    by_kind,
    by_verification_status,
    counts: Object.fromEntries(system_order.map(system_id => [system_id, surah_counts_by_system[system_id][String(surah)]])),
    deltas_from_kufi: Object.fromEntries(
      system_order.map(system_id => [
        system_id,
        surah_counts_by_system[system_id][String(surah)] - kufi_surah_counts[String(surah)]
      ])
    )
  }
})

const site_data = {
  _version: '0.1.0',
  _generated_from: [
    'data/counting-systems.json',
    'dist/review/review-data.json',
    'dist/classical-count-attestations.json',
    'dist/surah-counts/*.json'
  ],
  system_order,
  review_status_order: VERIFICATION_STATUS_ORDER,
  summary: {
    ...review_data.summary,
    evidence: evidence_summary,
    attestations: attestation_summary
  },
  systems,
  surahs,
  system_profiles,
  rows,
  attestations: classical_attestations.systems || {}
}

const target_dir = join(repoDir, 'site', 'src', 'lib', 'data', 'generated')
mkdirSync(target_dir, { recursive: true })
write_json(join(target_dir, 'site-data.json'), site_data)
