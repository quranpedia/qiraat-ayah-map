export function decodeBoundaryHash(hash = '') {
  if (!hash || hash === '#') {
    return null
  }

  try {
    return decodeURIComponent(hash.replace(/^#/, '')) || null
  } catch {
    return null
  }
}

function buildBoundaryId(prefix, anchorKey) {
  return `${prefix}-${encodeURIComponent(anchorKey)}`
}

export function getBoundaryTableRowId(anchorKey) {
  return buildBoundaryId('boundary-row', anchorKey)
}

export function getBoundaryViewerMarkerId(anchorKey) {
  return buildBoundaryId('boundary-marker', anchorKey)
}

export function getBoundaryViewerAyahId(ayahNumber) {
  return `boundary-ayah-${ayahNumber}`
}
