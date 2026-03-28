const viewerCache = new Map()

function padSurahNumber(surah) {
  return String(surah).padStart(3, '0')
}

export function loadSurahViewer(surah) {
  const numericSurah = Number(surah)

  if (!Number.isInteger(numericSurah) || numericSurah < 1 || numericSurah > 114) {
    return Promise.resolve(null)
  }

  if (!viewerCache.has(numericSurah)) {
    const path = `${import.meta.env.BASE_URL}generated/mushaf/surah-${padSurahNumber(numericSurah)}.json`
    const promise = fetch(path)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load mushaf viewer data for surah ${numericSurah}`)
        }

        return response.json()
      })
      .catch(error => {
        console.error(error)
        return null
      })

    viewerCache.set(numericSurah, promise)
  }

  return viewerCache.get(numericSurah)
}
