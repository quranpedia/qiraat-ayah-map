import { loadLocale } from 'wuchale/load-utils'

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

  document.title = 'أطلس عدِّ الآي'
  document.querySelector('meta[name="description"]')?.setAttribute(
    'content',
    'واجهة تفاعلية لعدِّ الآي بين الأنظمة الستة المعيارية المستعملة مع القراءات العشر.'
  )
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
