import { get_current_language } from './i18n.js'

function format_number(value) {
  return new Intl.NumberFormat(get_current_language(), { maximumFractionDigits: 0 }).format(Number(value) || 0)
}

export function titleize_slug(value) {
  return value
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function format_verification_status(status) {
  const labels = {
    uncited: 'غير موثق',
    secondary_only: 'شواهد ثانوية فقط',
    primary_cited: 'موثق أوليًا',
    primary_cited_and_reviewed: 'موثق أوليًا ومراجع',
    disputed: 'مختلف فيه',
    unresolved: 'غير محسوم'
  }

  return labels[status] || status.replaceAll('_', ' ')
}

export function format_numbering_effect(effect) {
  const labels = {
    split: 'يفصل الترقيم',
    merge: 'يضم الترقيم',
    none: 'مثل الكوفي'
  }

  return labels[effect] || effect
}

export function format_attestation_status(status) {
  const labels = {
    resolved: 'محسوم',
    resolved_to_primary_riwaya: 'محسوم إلى الرواية الأصلية',
    unresolved_source_reconciliation: 'يحتاج إلى توفيق بين المصادر'
  }

  if (!status) {
    return 'لا توجد ملاحظة إثبات'
  }

  return labels[status] || status.replaceAll('_', ' ')
}

export function format_boundary_kind(kind, mode = 'default') {
  if (kind === 'end') {
    return mode === 'viewer' ? 'نهاية آية' : 'نهاية'
  }

  if (kind === 'internal') {
    return mode === 'viewer' ? 'فاصل داخلي' : 'داخلي'
  }

  return kind
}

export function format_boundary_decision(counts_boundary) {
  return counts_boundary ? 'يعد' : 'يسقط'
}

export function format_boundary_action(counts_boundary) {
  return counts_boundary ? 'يعد هذا الموضع' : 'يتجاوزه'
}

export function format_surah_reference(surah_number) {
  return `سورة ${format_number(surah_number)}`
}

export function format_ayah_reference(ayah_number) {
  return `الآية ${format_number(ayah_number)}`
}

export function format_difference_count(count, singular_label, plural_label) {
  const number = format_number(count)
  return `${number} ${count === 1 ? singular_label : plural_label}`
}

export function format_signed_delta(delta) {
  const number = `${delta > 0 ? '+' : ''}${format_number(delta)}`
  return get_current_language() === 'en' ? `${number} vs Kufi` : `${number} عن الكوفي`
}

export function format_primary_total(value) {
  return `الأصل الكلاسيكي ${format_number(value)}`
}

export function format_evidence_tier(tier) {
  const labels = {
    primary: 'أصلي',
    secondary: 'ثانوي',
    commentary: 'تعليقي'
  }

  return labels[tier] || tier
}

export function format_evidence_strength(strength) {
  const labels = {
    direct: 'مباشر',
    derived: 'مستفاد'
  }

  return labels[strength] || strength
}
