import { loadLocale } from 'wuchale/load-utils'

// Document metadata is chosen explicitly per language rather than routed through
// the message catalogue. These are a brand name and a meta description, not UI
// strings, and an index-based lookup renders an unrelated message whenever the
// catalogue is regenerated.
// @wc-ignore
const DOCUMENT_TITLE = { ar: 'مرجع عدِّ الآي', en: 'Ayah Count Reference' }
// @wc-ignore
const DOCUMENT_DESCRIPTION = {
  ar: 'واجهة تفاعلية لعدِّ الآي بين مذاهب العدّ الستة المستعملة مع القراءات العشر.',
  en: 'An interactive reference for Quranic ayah counting across the six counting madhhabs used with the ten qiraat.'
}

const LANGUAGE_KEY = 'qiraat-language'
const DEFAULT_LANGUAGE = 'ar'

function apply_language(lang) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

export function resolve_language(value = '') {
  if (typeof value === 'string' && value.toLowerCase().startsWith('en')) {
    return 'en'
  }

  return DEFAULT_LANGUAGE
}

export function get_saved_language() {
  try {
    return resolve_language(localStorage.getItem(LANGUAGE_KEY) || document.documentElement.lang || navigator.language)
  } catch {
    return resolve_language(document.documentElement.lang || navigator.language)
  }
}

export function get_current_language() {
  if (typeof document === 'undefined') {
    return DEFAULT_LANGUAGE
  }

  return resolve_language(document.documentElement.lang || DEFAULT_LANGUAGE)
}

export async function init_i18n(lang = get_saved_language()) {
  const next_language = resolve_language(lang)

  apply_language(next_language)
  await loadLocale(next_language)

  document.title = DOCUMENT_TITLE[next_language]
  document.querySelector('meta[name="description"]')?.setAttribute('content', DOCUMENT_DESCRIPTION[next_language])
}

export function set_language(lang) {
  const next_language = resolve_language(lang)

  try {
    localStorage.setItem(LANGUAGE_KEY, next_language)
  } catch {
    // ignore storage failures and still switch for the current session
  }

  apply_language(next_language)
  location.reload()
}
