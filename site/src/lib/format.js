export function titleize_slug(value) {
  return value
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function format_verification_status(status) {
  return status.replaceAll('_', ' ')
}

export function format_numbering_effect(effect) {
  if (effect === 'split') return 'splits numbering'
  if (effect === 'merge') return 'merges numbering'
  return 'same as kufi'
}

export function format_attestation_status(status) {
  if (!status) return 'No attestation note'
  if (status === 'resolved') return 'Resolved'
  if (status === 'resolved_to_primary_riwaya') return 'Resolved to the primary riwāya'
  if (status === 'unresolved_source_reconciliation') return 'Needs source reconciliation'
  return status.replaceAll('_', ' ')
}
