const viewerCache = new Map()

function padSurahNumber(surah) {
  return String(surah).padStart(3, '0')
}

function formatAyahRange(start, end) {
  return start === end ? String(start) : `${start}–${end}`
}

export function buildDifferingAyahSummary(rows, leftSystemId, rightSystemId) {
  const ayahMap = new Map()
  let totalPoints = 0
  let endPoints = 0
  let internalPoints = 0
  let totalLeftOnly = 0
  let totalRightOnly = 0

  for (const row of rows) {
    const leftCounts = row.systems[leftSystemId]?.counts_boundary ?? false
    const rightCounts = row.systems[rightSystemId]?.counts_boundary ?? false

    if (leftCounts === rightCounts) {
      continue
    }

    totalPoints += 1

    if (row.kind === 'end') {
      endPoints += 1
    } else {
      internalPoints += 1
    }

    if (!ayahMap.has(row.hafs_ayah)) {
      ayahMap.set(row.hafs_ayah, {
        ayah: row.hafs_ayah,
        point_count: 0,
        end_count: 0,
        internal_count: 0,
        left_only_count: 0,
        right_only_count: 0,
        first_anchor_key: row.anchor_key
      })
    }

    const ayahEntry = ayahMap.get(row.hafs_ayah)
    ayahEntry.point_count += 1

    if (row.kind === 'end') {
      ayahEntry.end_count += 1
    } else {
      ayahEntry.internal_count += 1
    }

    if (leftCounts) {
      ayahEntry.left_only_count += 1
      totalLeftOnly += 1
    }

    if (rightCounts) {
      ayahEntry.right_only_count += 1
      totalRightOnly += 1
    }
  }

  const ayahs = [...ayahMap.values()].sort((left, right) => left.ayah - right.ayah)
  const ranges = []

  for (const ayahEntry of ayahs) {
    const currentRange = ranges[ranges.length - 1]

    if (!currentRange || ayahEntry.ayah !== currentRange.end + 1) {
      ranges.push({
        start: ayahEntry.ayah,
        end: ayahEntry.ayah
      })
      continue
    }

    currentRange.end = ayahEntry.ayah
  }

  const rangeLabels = ranges.map(range => formatAyahRange(range.start, range.end))

  return {
    ayahs,
    ranges,
    range_labels: rangeLabels,
    range_label: rangeLabels.join(', '),
    total_ayahs: ayahs.length,
    total_points: totalPoints,
    total_left_only: totalLeftOnly,
    total_right_only: totalRightOnly,
    by_kind: {
      end: endPoints,
      internal: internalPoints
    }
  }
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
