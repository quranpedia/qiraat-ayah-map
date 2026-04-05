const LANGUAGE_KEY = 'qiraat-language'

function resolve_language(value) {
  if (typeof value === 'string' && value.toLowerCase().startsWith('en')) {
    return 'en'
  }

  return 'ar'
}

let language = 'ar'

try {
  language = resolve_language(localStorage.getItem(LANGUAGE_KEY) || document.documentElement.lang || navigator.language)
} catch {
  language = resolve_language(document.documentElement.lang || navigator.language)
}

document.documentElement.lang = language
document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
