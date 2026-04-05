import site_data from '$lib/data/generated/site-data.json'
import {
  format_attestation_status,
  format_ayah_reference,
  format_boundary_action,
  format_boundary_decision,
  format_boundary_kind,
  format_difference_count,
  format_evidence_strength,
  format_evidence_tier,
  format_numbering_effect,
  format_primary_total,
  format_signed_delta,
  format_surah_reference,
  format_verification_status,
  titleize_slug
} from './format.js'
import { get_current_language } from './i18n.js'
import { surah_name_map } from './surah_names.js'

export const dataset = site_data
export const system_order = dataset.system_order
export const systems = dataset.systems
export const rows = dataset.rows
export const summary = dataset.summary
export const attestations = dataset.attestations
export const review_status_order = dataset.review_status_order
export const verification_profiles = dataset.verification_profiles
export const system_distance_matrix = dataset.system_distance_matrix
export const system_relationships = dataset.system_relationships
export const review_queue = dataset.review_queue
export const surah_drifts = dataset.surah_drifts

const system_map = new Map(systems.map(system => [system.id, system]))
export const surahs = dataset.surahs.map(entry => ({
  ...entry,
  ...surah_name_map[entry.surah]
}))
const surah_map = new Map(surahs.map(entry => [entry.surah, entry]))
const rows_by_surah = new Map(surahs.map(entry => [entry.surah, []]))

for (const row of rows) {
  rows_by_surah.get(row.surah)?.push(row)
}

function get_primary_text(english, arabic, fallback = '') {
  if (get_current_language() === 'ar') {
    return arabic || english || fallback
  }

  return english || arabic || fallback
}

function get_secondary_text(english, arabic) {
  const primary = get_primary_text(english, arabic)
  const secondary = get_current_language() === 'ar' ? english : arabic

  return secondary && secondary !== primary ? secondary : ''
}

function normalize_system(system_like) {
  if (!system_like) {
    return null
  }

  if (typeof system_like === 'string') {
    return get_system(system_like)
  }

  return system_like
}

function normalize_surah(surah_like) {
  if (!surah_like) {
    return null
  }

  if (typeof surah_like === 'number' || typeof surah_like === 'string') {
    return get_surah(surah_like)
  }

  return surah_like
}

export function get_system(system_id) {
  return system_map.get(system_id) || null
}

export function get_system_name(system_like) {
  const system = normalize_system(system_like)
  return get_primary_text(system?.name_en, system?.name_ar, system_like || '')
}

export function get_system_secondary_name(system_like) {
  const system = normalize_system(system_like)
  return get_secondary_text(system?.name_en, system?.name_ar)
}

export function get_surah(surah_number) {
  return surah_map.get(Number(surah_number)) || null
}

export function get_surah_name(surah_like) {
  const surah = normalize_surah(surah_like)
  return get_primary_text(surah?.name_en, surah?.name_ar, String(surah_like || ''))
}

export function get_surah_secondary_name(surah_like) {
  const surah = normalize_surah(surah_like)
  return get_secondary_text(surah?.name_en, surah?.name_ar)
}

export function get_surah_rows(surah_number) {
  return rows_by_surah.get(Number(surah_number)) || []
}

export function get_system_profile(system_id) {
  return dataset.system_profiles[system_id] || []
}

export function get_verification_profile(system_id) {
  return verification_profiles[system_id] || null
}

export function get_system_relationship(system_id) {
  return system_relationships[system_id] || null
}

export function get_surah_drift(system_id, surah_number) {
  return surah_drifts[system_id]?.[String(Number(surah_number))] || []
}

export function get_verification_tone(status) {
  if (status === 'primary_cited_and_reviewed') return 'ok'
  if (status === 'primary_cited') return 'accent'
  if (status === 'secondary_only') return 'warn'
  if (status === 'disputed' || status === 'unresolved') return 'alert'
  return 'warn'
}

export function get_effect_tone(effect) {
  if (effect === 'split') return 'accent'
  if (effect === 'merge') return 'alert'
  return 'ok'
}

export function compact_number(value) {
  return new Intl.NumberFormat(get_current_language(), { maximumFractionDigits: 0 }).format(value)
}

export {
  format_attestation_status,
  format_evidence_strength,
  format_evidence_tier,
  format_ayah_reference,
  format_boundary_action,
  format_boundary_decision,
  format_boundary_kind,
  format_difference_count,
  format_numbering_effect,
  format_primary_total,
  format_signed_delta,
  format_surah_reference,
  format_verification_status,
  titleize_slug
}
