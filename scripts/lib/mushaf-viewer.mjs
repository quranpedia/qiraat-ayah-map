/**
 * Rebuild a surah under one counting madhhab's numbering, from the generated
 * muṣḥaf viewer data.
 *
 * This lived in the retired `site/` app. It stays in the repository because it
 * is the only thing that proves the generated data is usable: `tests/validate.mjs`
 * runs it over all 114 surahs in all six madhhabs and checks that the rebuilt
 * ayah counts are the published totals. The consumer that renders it now lives
 * elsewhere; this is the reference implementation the data is checked against.
 */
function formatAyahRange(start, end) {
  return start === end ? String(start) : `${start}–${end}`
}

function getTokens(ayah, script) {
  return script === 'uthmani' ? ayah.uthmani_tokens : ayah.plain_tokens
}

function getPositionAfterToken(position, script) {
  return script === 'uthmani' ? position.uthmani_after_token : position.plain_after_token
}

function getRowsByKufiAyah(rows, viewer) {
  const rowsByAyah = new Map()

  for (const row of rows) {
    const position = viewer.boundary_positions[row.anchor_key]

    if (!position) {
      continue
    }

    const ayahRows = rowsByAyah.get(position.ayah) || []
    ayahRows.push(row)
    rowsByAyah.set(position.ayah, ayahRows)
  }

  return rowsByAyah
}

function addSpan(segment, ayahNumber, startToken, endToken, displayOffset) {
  if (endToken <= startToken) {
    return
  }

  segment.kufi_start = Math.min(segment.kufi_start, ayahNumber)
  segment.kufi_end = Math.max(segment.kufi_end, ayahNumber)
  segment.spans.push({
    ayah: ayahNumber,
    start_token: startToken,
    end_token: endToken,
    display_offset: displayOffset
  })
}

function findDisplayPosition(displayUnits, position, afterToken) {
  for (const unit of displayUnits) {
    const span = unit.spans.find(item => item.ayah === position.ayah && item.start_token < afterToken && afterToken <= item.end_token)

    if (!span) {
      continue
    }

    const unitAfterToken = span.display_offset + afterToken - span.start_token

    return {
      ayah: unit.ayah,
      after_token: unitAfterToken,
      is_display_end: unitAfterToken === unit.tokens.length,
      is_preamble: unit.type === 'preamble',
      source_ayah: position.ayah
    }
  }

  return null
}

function isUncountedOpeningBasmalah(viewer, kufiAyah, endRow, systemId) {
  return viewer.surah === 1
    && kufiAyah.ayah === 1
    && endRow
    && !(endRow.systems[systemId]?.counts_boundary ?? false)
}

export function buildCountingMadhhabAyahs(viewer, rows, systemId, script = 'plain') {
  if (!viewer || !systemId) {
    return {
      ayahs: [],
      preamble: null,
      display_units: [],
      boundary_positions: {},
      total_ayah_count: 0
    }
  }

  const rowsByAyah = getRowsByKufiAyah(rows, viewer)
  const ayahs = []
  let preamble = null
  let current = null
  let ayahNumber = 1

  function startSegment(prefix = null) {
    current = {
      type: 'ayah',
      ayah: ayahNumber,
      kufi_start: Number.POSITIVE_INFINITY,
      kufi_end: 0,
      prefix,
      tokens: [],
      spans: []
    }
  }

  function closeSegment() {
    if (!current || current.tokens.length === 0) {
      return
    }

    ayahs.push(current)
    ayahNumber += 1
    current = null
  }

  for (const kufiAyah of viewer.ayahs) {
    const tokens = getTokens(kufiAyah, script)
    const ayahRows = rowsByAyah.get(kufiAyah.ayah) || []
    const endRow = ayahRows.find(row => row.kind === 'end') || null
    const boundaries = ayahRows
      .filter(row => row.kind === 'internal' && (row.systems[systemId]?.counts_boundary ?? false))
      .map(row => getPositionAfterToken(viewer.boundary_positions[row.anchor_key], script))

    if (isUncountedOpeningBasmalah(viewer, kufiAyah, endRow, systemId)) {
      preamble = {
        type: 'preamble',
        ayah: 0,
        source_ayah: kufiAyah.ayah,
        prefix: null,
        tokens,
        spans: [{
          ayah: kufiAyah.ayah,
          start_token: 0,
          end_token: tokens.length,
          display_offset: 0
        }]
      }
      continue
    }

    if (!endRow || (endRow.systems[systemId]?.counts_boundary ?? false)) {
      boundaries.push(tokens.length)
    }

    boundaries.sort((left, right) => left - right)

    let cursor = 0

    if (!current) {
      startSegment(script === 'uthmani' ? kufiAyah.uthmani_prefix : null)
    }

    for (const boundary of boundaries) {
      if (boundary === cursor) {
        continue
      }

      const displayOffset = current.tokens.length
      current.tokens.push(...tokens.slice(cursor, boundary))
      addSpan(current, kufiAyah.ayah, cursor, boundary, displayOffset)
      closeSegment()
      cursor = boundary

      if (cursor < tokens.length) {
        startSegment(null)
      }
    }

    if (cursor < tokens.length) {
      if (!current) {
        startSegment(null)
      }

      const displayOffset = current.tokens.length
      current.tokens.push(...tokens.slice(cursor))
      addSpan(current, kufiAyah.ayah, cursor, tokens.length, displayOffset)
    }
  }

  closeSegment()

  const displayUnits = preamble ? [preamble, ...ayahs] : ayahs
  const boundaryPositions = {}

  for (const row of rows) {
    const position = viewer.boundary_positions[row.anchor_key]

    if (!position) {
      continue
    }

    const displayPosition = findDisplayPosition(displayUnits, position, getPositionAfterToken(position, script))

    if (displayPosition) {
      boundaryPositions[row.anchor_key] = displayPosition
    }
  }

  return {
    ayahs,
    preamble,
    display_units: displayUnits,
    boundary_positions: boundaryPositions,
    total_ayah_count: ayahs.length
  }
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
