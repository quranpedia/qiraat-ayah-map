<script>
import { tick } from 'svelte'

import { getBoundaryViewerAyahId, getBoundaryViewerMarkerId } from '$lib/mushaf-viewer-dom.js'

const SYSTEM_SHORT_LABELS = {
  'madani-first': 'M1',
  'madani-last': 'M2',
  makki: 'Makki',
  basri: 'Basri',
  dimashqi: 'Dim.',
  kufi: 'Kufi'
}

let {
  viewer = null,
  rows = [],
  systems = [],
  selectedKey = null,
  selectionRequest = null,
  onselect
} = $props()

let script = $state('plain')
let markerScope = $state('differences')
let boundaryKind = $state('all')
let ayahScope = $state('context')
let leftSystemId = $state('kufi')
let rightSystemId = $state('madani-first')

let systemById = $derived(new Map(systems.map(system => [system.id, system])))
let leftSystem = $derived(systemById.get(leftSystemId) || null)
let rightSystem = $derived(systemById.get(rightSystemId) || null)

function getShortLabel(systemId) {
  return SYSTEM_SHORT_LABELS[systemId] || systemId
}


function getSelectedRow() {
  return selectedKey ? rows.find(row => row.anchor_key === selectedKey) || null : null
}

function scrollSelectedBoundaryIntoView(anchorKey) {
  if (!anchorKey) {
    return
  }

  const markerElement = document.getElementById(getBoundaryViewerMarkerId(anchorKey))

  if (markerElement) {
    markerElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    })
    return
  }

  const ayahNumber = viewer?.boundary_positions?.[anchorKey]?.ayah

  if (!ayahNumber) {
    return
  }

  const ayahElement = document.getElementById(getBoundaryViewerAyahId(ayahNumber))

  ayahElement?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest'
  })
}

function revealSelectedBoundary() {
  const row = getSelectedRow()

  if (!row || !selectedMarkerState) {
    return
  }

  boundaryKind = 'all'
  ayahScope = 'context'

  if (selectedMarkerState.leftCounts && selectedMarkerState.rightCounts) {
    markerScope = 'either'
  } else if (!selectedMarkerState.leftCounts && !selectedMarkerState.rightCounts) {
    const preferredCounter = row.counted_by.find(systemId => systemId !== leftSystemId) || row.counted_by[0] || null

    if (preferredCounter) {
      rightSystemId = preferredCounter
      markerScope = 'either'
    }
  }

  tick().then(() => {
    scrollSelectedBoundaryIntoView(row.anchor_key)
  })
}

$effect(() => {
  const request = selectionRequest
  const nonce = request?.nonce || 0

  if (!viewer || !request?.anchorKey || request.source === 'viewer' || nonce === 0) {
    return
  }

  tick().then(() => {
    scrollSelectedBoundaryIntoView(request.anchorKey)
  })
})

function buildMarkerTitle(row, leftCounts, rightCounts) {
  const leftName = leftSystem?.name_en || leftSystemId
  const rightName = rightSystem?.name_en || rightSystemId
  const pointType = row.kind === 'end' ? 'ayah end' : 'internal breakpoint'
  const leftStatus = leftCounts ? 'counts this boundary' : 'continues through it'
  const rightStatus = rightCounts ? 'counts this boundary' : 'continues through it'

  return `${row.location_label} · ${row.word} · ${pointType} — ${leftName} ${leftStatus}; ${rightName} ${rightStatus}.`
}

function getMarkerTone(leftCounts, rightCounts) {
  if (leftCounts && rightCounts) {
    return 'ok'
  }

  if (leftCounts) {
    return 'accent'
  }

  if (rightCounts) {
    return 'alert'
  }

  return 'muted'
}

function getMarkerLabel(leftCounts, rightCounts) {
  if (leftCounts && rightCounts) {
    return `${getShortLabel(leftSystemId)}+${getShortLabel(rightSystemId)}`
  }

  if (leftCounts) {
    return getShortLabel(leftSystemId)
  }

  if (rightCounts) {
    return getShortLabel(rightSystemId)
  }

  return null
}

let markerStatesByKey = $derived.by(() => {
  const states = new Map()

  for (const row of rows) {
    const leftCounts = row.systems[leftSystemId]?.counts_boundary ?? false
    const rightCounts = row.systems[rightSystemId]?.counts_boundary ?? false
    const pairVisible = markerScope === 'differences'
      ? leftCounts !== rightCounts
      : leftCounts || rightCounts
    const kindVisible = boundaryKind === 'all' || row.kind === boundaryKind
    const visible = pairVisible && kindVisible

    states.set(row.anchor_key, {
      leftCounts,
      rightCounts,
      visible,
      label: getMarkerLabel(leftCounts, rightCounts),
      tone: getMarkerTone(leftCounts, rightCounts),
      title: buildMarkerTitle(row, leftCounts, rightCounts)
    })
  }

  return states
})

let selectedMarkerState = $derived(selectedKey ? markerStatesByKey.get(selectedKey) || null : null)
let selectedAyah = $derived(selectedKey && viewer ? viewer.boundary_positions[selectedKey]?.ayah || null : null)
let selectedMarkerHidden = $derived(Boolean(selectedKey && selectedMarkerState && !selectedMarkerState.visible))

let visibleAyahNumbers = $derived.by(() => {
  const ayahs = new Set()

  for (const row of rows) {
    if (markerStatesByKey.get(row.anchor_key)?.visible) {
      ayahs.add(row.hafs_ayah)
    }
  }

  return ayahs
})

let comparisonSummary = $derived.by(() => {
  const summary = {
    visible: 0,
    left_only: 0,
    right_only: 0,
    both: 0,
    end: 0,
    internal: 0
  }

  for (const row of rows) {
    const state = markerStatesByKey.get(row.anchor_key)

    if (!state?.visible) {
      continue
    }

    summary.visible += 1
    summary[row.kind] += 1

    if (state.leftCounts && state.rightCounts) {
      summary.both += 1
    } else if (state.leftCounts) {
      summary.left_only += 1
    } else if (state.rightCounts) {
      summary.right_only += 1
    }
  }

  return summary
})

let focusAyahNumbers = $derived.by(() => {
  const included = new Set()

  if (!viewer) {
    return included
  }

  if (ayahScope === 'full') {
    for (let ayah = 1; ayah <= viewer.kufi_ayah_count; ayah += 1) {
      included.add(ayah)
    }

    return included
  }

  for (const ayah of visibleAyahNumbers) {
    included.add(ayah)
  }

  if (selectedAyah) {
    included.add(selectedAyah)
  }

  if (ayahScope === 'context') {
    const seeds = [...included]

    for (const ayah of seeds) {
      if (ayah > 1) {
        included.add(ayah - 1)
      }

      if (ayah < viewer.kufi_ayah_count) {
        included.add(ayah + 1)
      }
    }
  }

  return included
})

let displayAyahs = $derived.by(() => {
  if (!viewer) {
    return []
  }

  const displayItems = []
  let previousAyah = 0

  for (const ayah of viewer.ayahs) {
    if (!focusAyahNumbers.has(ayah.ayah)) {
      continue
    }

    if (previousAyah > 0 && ayah.ayah - previousAyah > 1) {
      displayItems.push({
        type: 'gap',
        from: previousAyah + 1,
        to: ayah.ayah - 1,
        count: ayah.ayah - previousAyah - 1
      })
    }

    const tokens = script === 'plain' ? ayah.plain_tokens : ayah.uthmani_tokens
    const internalMarkerBuckets = new Map()
    const endMarkers = []
    let hasVisibleMarkers = false
    let hasSelectedMarker = false

    for (const row of rows) {
      const position = viewer.boundary_positions[row.anchor_key]

      if (!position || position.ayah !== ayah.ayah) {
        continue
      }

      hasSelectedMarker = hasSelectedMarker || row.anchor_key === selectedKey

      const state = markerStatesByKey.get(row.anchor_key)

      if (!state?.visible || !state.label) {
        continue
      }

      const marker = {
        anchor_key: row.anchor_key,
        kind: row.kind,
        label: state.label,
        tone: state.tone,
        title: state.title
      }

      if (row.kind === 'end') {
        endMarkers.push(marker)
      } else {
        const afterToken = script === 'plain'
          ? position.plain_after_token
          : position.uthmani_after_token
        const markersAtToken = internalMarkerBuckets.get(afterToken) || []
        markersAtToken.push(marker)
        internalMarkerBuckets.set(afterToken, markersAtToken)
      }

      hasVisibleMarkers = true
    }

    displayItems.push({
      type: 'ayah',
      ayah: ayah.ayah,
      prefix: script === 'uthmani' ? ayah.uthmani_prefix : null,
      tokens,
      internalMarkerBuckets,
      endMarkers,
      hasVisibleMarkers,
      hasSelectedMarker
    })

    previousAyah = ayah.ayah
  }

  return displayItems
})

let displaySummary = $derived.by(() => {
  const shownAyahs = displayAyahs.reduce((count, item) => {
    return item.type === 'ayah' ? count + 1 : count
  }, 0)

  return {
    shownAyahs,
    hiddenAyahs: viewer ? Math.max(viewer.kufi_ayah_count - shownAyahs, 0) : 0
  }
})

let displayBasmala = $derived.by(() => {
  if (script !== 'uthmani') {
    return null
  }

  const firstVisibleAyah = displayAyahs.find(item => item.type === 'ayah' && item.ayah === 1)
  return firstVisibleAyah?.prefix || null
})
</script>

{#if viewer}
  <section class="surface p-5 sm:p-6">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div class="rule_label">Mushaf viewer</div>
        <h2 class="section_title mt-4">Inline boundary markers inside the surah text</h2>
        <p class="section_text mt-3 text-sm">
          Internal breakpoints stay inline after their anchor word. Ayah-end differences sit beside the ayah number so you can read the surah normally while still seeing where the selected systems do or do not stop.
        </p>
      </div>

      <div class="flex flex-wrap gap-2 text-xs text-ink-soft">
        <span class="badge" data-tone="accent">{getShortLabel(leftSystemId)} only: {comparisonSummary.left_only}</span>
        <span class="badge" data-tone="alert">{getShortLabel(rightSystemId)} only: {comparisonSummary.right_only}</span>
        {#if markerScope === 'either'}
          <span class="badge" data-tone="ok">both: {comparisonSummary.both}</span>
        {/if}
      </div>
    </div>

    <div class="mushaf_control_grid mt-6">
      <label>
        <div class="metric_label">Script</div>
        <select class="select mt-2" bind:value={script}>
          <option value="plain">Plain</option>
          <option value="uthmani">Uthmani</option>
        </select>
      </label>

      <label>
        <div class="metric_label">Left system</div>
        <select class="select mt-2" bind:value={leftSystemId}>
          {#each systems as system (system.id)}
            <option value={system.id}>{system.name_en}</option>
          {/each}
        </select>
      </label>

      <label>
        <div class="metric_label">Right system</div>
        <select class="select mt-2" bind:value={rightSystemId}>
          {#each systems as system (system.id)}
            <option value={system.id}>{system.name_en}</option>
          {/each}
        </select>
      </label>

      <label>
        <div class="metric_label">Boundaries</div>
        <select class="select mt-2" bind:value={boundaryKind}>
          <option value="all">All disputed points</option>
          <option value="end">Ayah ends only</option>
          <option value="internal">Internal only</option>
        </select>
      </label>

      <label>
        <div class="metric_label">Ayahs shown</div>
        <select class="select mt-2" bind:value={ayahScope}>
          <option value="context">Changed ayahs + neighbors</option>
          <option value="changed">Changed ayahs only</option>
          <option value="full">Full surah</option>
        </select>
      </label>

      <label>
        <div class="metric_label">Markers</div>
        <select class="select mt-2" bind:value={markerScope}>
          <option value="differences">Differences only</option>
          <option value="either">Any point counted by either system</option>
        </select>
      </label>
    </div>

    <div class="mt-5 flex flex-wrap gap-2 text-xs text-ink-soft">
      <span class="badge" data-tone="accent">{getShortLabel(leftSystemId)} = {leftSystem?.name_en || leftSystemId}</span>
      <span class="badge" data-tone="alert">{getShortLabel(rightSystemId)} = {rightSystem?.name_en || rightSystemId}</span>
      {#if script === 'uthmani'}
        <span class="badge" data-tone="warn">Surah-opening basmala is shown separately when the source file prefixes it onto the first ayah.</span>
      {/if}
    </div>

    <p class="mt-4 text-sm text-ink-soft">
      Showing {displaySummary.shownAyahs} of {viewer.kufi_ayah_count} ayahs. Visible points in this filter: {comparisonSummary.visible} total, with {comparisonSummary.end} ayah ends and {comparisonSummary.internal} internal breakpoints.
    </p>

    {#if selectedMarkerHidden}
      <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
        <p>The currently selected boundary is hidden by this viewer filter or by the current system pair.</p>
        <button type="button" class="pill_button" data-tone="accent" onclick={revealSelectedBoundary}>
          Adjust viewer to show it
        </button>
      </div>
    {/if}

    {#if comparisonSummary.visible === 0 && rows.length > 0}
      <p class="mt-4 text-sm text-ink-soft">
        With this pair and filter, no recorded disputed boundary is currently visible in this surah.
      </p>
    {/if}

    <div class="mushaf_viewer_shell mt-6">
      {#if displayBasmala}
        <div class="mushaf_basmala">{displayBasmala}</div>
      {/if}

      <div class="mushaf_viewer_body">
        {#each displayAyahs as item (`${script}-${item.type}-${item.type === 'ayah' ? item.ayah : `${item.from}-${item.to}`}`)}
          {#if item.type === 'gap'}
            <p class="mushaf_gap_line" dir="ltr">
              <span class="mushaf_gap_pill">
                {item.count === 1 ? '1 ayah hidden' : `${item.count} ayahs hidden`} · {item.from}–{item.to}
              </span>
            </p>
          {:else}
            <p
              id={getBoundaryViewerAyahId(item.ayah)}
              class="mushaf_ayah_line"
              data-has-visible={item.hasVisibleMarkers ? 'true' : 'false'}
              data-active={item.hasSelectedMarker ? 'true' : 'false'}
              dir="rtl"
            >
              {#each item.tokens as token, tokenIndex (`${item.ayah}-${script}-${tokenIndex}`)}
                <span class="mushaf_word">{token}</span>
                {@const markers = item.internalMarkerBuckets.get(tokenIndex + 1) || []}
                {#if markers.length > 0}
                  <span class="mushaf_marker_group">
                    {#each markers as marker (marker.anchor_key)}
                      <button
                        id={getBoundaryViewerMarkerId(marker.anchor_key)}
                        type="button"
                        class="mushaf_marker"
                        data-kind={marker.kind}
                        data-tone={marker.tone}
                        data-active={marker.anchor_key === selectedKey ? 'true' : 'false'}
                        title={marker.title}
                        onclick={() => onselect?.(marker.anchor_key)}
                      >
                        {marker.label}
                      </button>
                    {/each}
                  </span>
                {/if}
                {#if tokenIndex < item.tokens.length - 1}
                  <span> </span>
                {/if}
              {/each}

              {#if item.endMarkers.length > 0}
                <span class="mushaf_end_marker_group">
                  {#each item.endMarkers as marker (marker.anchor_key)}
                    <button
                      id={getBoundaryViewerMarkerId(marker.anchor_key)}
                      type="button"
                      class="mushaf_marker"
                      data-kind={marker.kind}
                      data-tone={marker.tone}
                      data-active={marker.anchor_key === selectedKey ? 'true' : 'false'}
                      title={marker.title}
                      onclick={() => onselect?.(marker.anchor_key)}
                    >
                      {marker.label}
                    </button>
                  {/each}
                </span>
              {/if}

              <span class="mushaf_ayah_number">{item.ayah}</span>
            </p>
          {/if}
        {/each}
      </div>
    </div>
  </section>
{/if}
