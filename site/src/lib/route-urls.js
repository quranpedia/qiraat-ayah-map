const DEFAULT_MADHHAB_ID = 'kufi'

export function getMadhhabHref(href, madhhabId, hash = '') {
  const [withoutHash, existingHash = ''] = href.split('#')
  const [path, search = ''] = withoutHash.split('?')
  const params = new URLSearchParams(search)

  if (!madhhabId || madhhabId === DEFAULT_MADHHAB_ID) {
    params.delete('madhhab')
  } else {
    params.set('madhhab', madhhabId)
  }

  const nextSearch = params.toString()
  const nextHash = hash || (existingHash ? `#${existingHash}` : '')

  return `${path}${nextSearch ? `?${nextSearch}` : ''}${nextHash}`
}

export function replaceMadhhabQuery(madhhabId) {
  const params = new URLSearchParams(window.location.search)

  if (!madhhabId || madhhabId === DEFAULT_MADHHAB_ID) {
    params.delete('madhhab')
  } else {
    params.set('madhhab', madhhabId)
  }

  const search = params.toString()
  const nextUrl = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (nextUrl !== currentUrl) {
    window.history.replaceState(window.history.state, '', nextUrl)
  }
}
