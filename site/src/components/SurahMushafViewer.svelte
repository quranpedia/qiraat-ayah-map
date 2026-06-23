<script>
import { tick } from 'svelte'

import {
  compact_number,
  format_boundary_action,
  format_difference_count,
  get_system_name
} from '$lib/dataset.svelte.js'
import { buildCountingMadhhabAyahs } from '$lib/mushaf-viewer.js'
import { getBoundaryViewerAyahId, getBoundaryViewerMarkerId } from '$lib/mushaf-viewer-dom.js'

const SYSTEM_SHORT_LABELS = {
  'madani-first': 'مد١',
  'madani-last': 'مد٢',
  makki: 'مك',
  basri: 'بص',
  dimashqi: 'دم',
  kufi: 'كو'
}

let {
  viewer = null,
  rows = [],
  systems = [],
  selectedKey = null,
  selectionRequest = null,
  initialDisplaySystemId = 'kufi',
  onDisplaySystemChange,
  onselect
} = $props()

let script = $state('plain')
let viewMode = $state('all')
let markerStatus = $state('all')
let ayahScope = $state('full')
let displaySystemId = $state(initialDisplaySystemId)
let comparisonSystemId = $state(initialDisplaySystemId === 'madani-first' ? 'kufi' : 'madani-first')

let systemById = $derived(new Map(systems.map(system => [system.id, system])))
let displaySystem = $derived(systemById.get(displaySystemId) || null)
let comparisonSystem = $derived(systemById.get(comparisonSystemId) || null)
let displayedMushaf = $derived(buildCountingMadhhabAyahs(viewer, rows, displaySystemId, script))
let boundaryPositions = $derived(displayedMushaf.boundary_positions)

$effect(() => {
  onDisplaySystemChange?.(displaySystemId)
})

function getShortLabel(systemId) {
  return SYSTEM_SHORT_LABELS[systemId] || systemId
}

function formatDisplayAyahLabel(ayahNumber) {
  return ayahNumber === 0 ? 'البسملة' : compact_number(ayahNumber)
}

function countsIn(row, systemId) {
  return row.systems[systemId]?.counts_boundary ?? false
}

function getSelectedRow() {
  return selectedKey ? rows.find(row => row.anchor_key === selectedKey) || null : null
}

function scrollAyahIntoView(ayahNumber) {
  if (ayahNumber == null) {
    return
  }

  const ayahElement = document.getElementById(getBoundaryViewerAyahId(ayahNumber))
  ayahElement?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest'
  })
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

  scrollAyahIntoView(boundaryPositions[anchorKey]?.ayah)
}

function revealSelectedBoundary() {
  const row = getSelectedRow()

  if (!row) {
    return
  }

  viewMode = 'all'
  markerStatus = 'all'
  ayahScope = 'context'

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

function buildMarkerTitle(row, displayCounts, comparisonCounts) {
  const displayName = get_system_name(displaySystem) || displaySystemId
  const displayStatus = format_boundary_action(displayCounts)

  if (viewMode !== 'pair') {
    return `${row.location_label} · الفاصلة: ${row.word} — ${displayName} ${displayStatus}.`
  }

  const comparisonName = get_system_name(comparisonSystem) || comparisonSystemId
  const comparisonStatus = format_boundary_action(comparisonCounts)
  return `${row.location_label} · الفاصلة: ${row.word} — ${displayName} ${displayStatus}؛ ${comparisonName} ${comparisonStatus}.`
}

function getMarkerTone(displayCounts, comparisonCounts) {
  if (viewMode !== 'pair') {
    return displayCounts ? 'ok' : 'warn'
  }

  return displayCounts && !comparisonCounts ? 'accent' : 'alert'
}

function getMarkerLabel(displayCounts, comparisonCounts) {
  if (viewMode !== 'pair') {
    return displayCounts ? getShortLabel(displaySystemId) : 'لا'
  }

  return displayCounts && !comparisonCounts ? getShortLabel(displaySystemId) : getShortLabel(comparisonSystemId)
}

let markerStatesByKey = $derived.by(() => {
  const states = new Map()

  for (const row of rows) {
    const displayCounts = countsIn(row, displaySystemId)
    const comparisonCounts = countsIn(row, comparisonSystemId)
    const modeVisible = viewMode === 'pair' ? displayCounts !== comparisonCounts : true
    const statusVisible =
      markerStatus === 'all'
      || (markerStatus === 'counted' && displayCounts)
      || (markerStatus === 'not_counted' && !displayCounts)
    const visible = Boolean(boundaryPositions[row.anchor_key]) && modeVisible && statusVisible

    states.set(row.anchor_key, {
      displayCounts,
      comparisonCounts,
      visible,
      label: getMarkerLabel(displayCounts, comparisonCounts),
      tone: getMarkerTone(displayCounts, comparisonCounts),
      title: buildMarkerTitle(row, displayCounts, comparisonCounts)
    })
  }

  return states
})

let selectedMarkerState = $derived(selectedKey ? markerStatesByKey.get(selectedKey) || null : null)
let selectedAyah = $derived(selectedKey ? boundaryPositions[selectedKey]?.ayah ?? null : null)
let selectedMarkerHidden = $derived(Boolean(selectedKey && selectedMarkerState && !selectedMarkerState.visible))

function getPairAyahTone(entry) {
  if (entry.displayOnlyCount > 0 && entry.comparisonOnlyCount > 0) {
    return 'warn'
  }

  return entry.displayOnlyCount > 0 ? 'accent' : 'alert'
}

function buildPairAyahTitle(entry) {
  return `${formatDisplayAyahLabel(entry.ayah)}: ${format_difference_count(entry.pointCount, 'رأس آية مختلف فيه', 'رؤوس آي مختلف فيها')}`
}

let pairDifferenceSummary = $derived.by(() => {
  const ayahMap = new Map()
  const summary = {
    pointCount: 0,
    ayahCount: 0,
    displayOnlyCount: 0,
    comparisonOnlyCount: 0,
    ayahs: []
  }

  for (const row of rows) {
    const displayCounts = countsIn(row, displaySystemId)
    const comparisonCounts = countsIn(row, comparisonSystemId)

    if (displayCounts === comparisonCounts) {
      continue
    }

    const ayahNumber = boundaryPositions[row.anchor_key]?.ayah

    if (ayahNumber == null) {
      continue
    }

    const entry = ayahMap.get(ayahNumber) || {
      ayah: ayahNumber,
      anchorKey: row.anchor_key,
      pointCount: 0,
      displayOnlyCount: 0,
      comparisonOnlyCount: 0
    }

    entry.pointCount += 1

    if (displayCounts) {
      entry.displayOnlyCount += 1
      summary.displayOnlyCount += 1
    } else {
      entry.comparisonOnlyCount += 1
      summary.comparisonOnlyCount += 1
    }

    ayahMap.set(ayahNumber, entry)
    summary.pointCount += 1
  }

  summary.ayahs = [...ayahMap.values()]
    .sort((left, right) => left.ayah - right.ayah)
    .map(entry => ({
      ...entry,
      tone: getPairAyahTone(entry),
      title: buildPairAyahTitle(entry)
    }))
  summary.ayahCount = summary.ayahs.length

  return summary
})

function focusPairAyah(entry) {
  if (!entry) {
    return
  }

  const needsReveal = !focusAyahNumbers.has(entry.ayah) || !markerStatesByKey.get(entry.anchorKey)?.visible

  if (needsReveal) {
    viewMode = 'pair'
    markerStatus = 'all'
    ayahScope = 'context'
  }

  onselect?.(entry.anchorKey)

  tick().then(() => {
    scrollAyahIntoView(entry.ayah)
  })
}

let visibleAyahNumbers = $derived.by(() => {
  const ayahs = new Set()

  for (const row of rows) {
    if (markerStatesByKey.get(row.anchor_key)?.visible) {
      const position = boundaryPositions[row.anchor_key]

      if (position) {
        ayahs.add(position.ayah)
      }
    }
  }

  return ayahs
})

let markerSummary = $derived.by(() => {
  const summary = {
    visible: 0,
    counted: 0,
    not_counted: 0
  }

  for (const row of rows) {
    const state = markerStatesByKey.get(row.anchor_key)

    if (!state?.visible) {
      continue
    }

    summary.visible += 1

    if (state.displayCounts) {
      summary.counted += 1
    } else {
      summary.not_counted += 1
    }
  }

  return summary
})

let focusAyahNumbers = $derived.by(() => {
  const included = new Set()
  const totalAyahs = displayedMushaf.total_ayah_count

  if (!viewer) {
    return included
  }

  if (rows.length === 0 || ayahScope === 'full') {
    for (let ayah = 1; ayah <= totalAyahs; ayah += 1) {
      included.add(ayah)
    }

    return included
  }

  for (const ayah of visibleAyahNumbers) {
    included.add(ayah)
  }

  if (selectedAyah !== null) {
    included.add(selectedAyah)
  }

  if (ayahScope === 'context') {
    const seeds = [...included]

    for (const ayah of seeds) {
      if (ayah > 1) {
        included.add(ayah - 1)
      }

      if (ayah < totalAyahs) {
        included.add(ayah + 1)
      }
    }
  }

  return included
})

function buildDisplayLine(unit) {
  const internalMarkerBuckets = new Map()
  const endMarkers = []
  let hasVisibleMarkers = false
  let hasSelectedMarker = false

  for (const row of rows) {
    const position = boundaryPositions[row.anchor_key]

    if (!position || position.ayah !== unit.ayah) {
      continue
    }

    hasSelectedMarker = hasSelectedMarker || row.anchor_key === selectedKey

    const state = markerStatesByKey.get(row.anchor_key)

    if (!state?.visible || !state.label) {
      continue
    }

    const marker = {
      anchor_key: row.anchor_key,
      kind: position.is_display_end ? 'end' : 'internal',
      label: state.label,
      tone: state.tone,
      title: state.title
    }

    if (position.is_display_end) {
      endMarkers.push(marker)
    } else {
      const markersAtToken = internalMarkerBuckets.get(position.after_token) || []
      markersAtToken.push(marker)
      internalMarkerBuckets.set(position.after_token, markersAtToken)
    }

    hasVisibleMarkers = true
  }

  return {
    type: unit.type,
    ayah: unit.ayah,
    kufi_start: unit.kufi_start,
    kufi_end: unit.kufi_end,
    prefix: unit.prefix,
    tokens: unit.tokens,
    internalMarkerBuckets,
    endMarkers,
    hasVisibleMarkers,
    hasSelectedMarker
  }
}

let displayAyahs = $derived.by(() => {
  const displayItems = []
  let previousAyah = 0
  const showPreamble = ayahScope === 'full' || focusAyahNumbers.has(0) || focusAyahNumbers.has(1)

  for (const unit of displayedMushaf.display_units) {
    if (unit.type === 'preamble') {
      if (showPreamble) {
        displayItems.push(buildDisplayLine(unit))
      }

      continue
    }

    if (!focusAyahNumbers.has(unit.ayah)) {
      continue
    }

    if (previousAyah > 0 && unit.ayah - previousAyah > 1) {
      displayItems.push({
        type: 'gap',
        from: previousAyah + 1,
        to: unit.ayah - 1,
        count: unit.ayah - previousAyah - 1
      })
    }

    displayItems.push(buildDisplayLine(unit))
    previousAyah = unit.ayah
  }

  return displayItems
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
  <section id="mushaf" class="surface p-4 sm:p-5">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div class="max-w-2xl">
        <div class="rule_label">عارض المصحف</div>
        <p class="section_text mt-3 text-sm">
          يقرأ النص بترقيم مذهب العدّ المعروض، وتظهر علامات رؤوس الآي المختلف فيها داخل موضعها من السورة.
        </p>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 lg:w-[34rem]">
        <label>
          <div class="field_label">مذهب العدّ المعروض</div>
          <select class="select mt-2" bind:value={displaySystemId}>
            {#each systems as system (system.id)}
              <option value={system.id}>{get_system_name(system)}</option>
            {/each}
          </select>
        </label>

        <label>
          <div class="field_label">الرسم</div>
          <select class="select mt-2" bind:value={script}>
            <option value="plain">إملائي</option>
            <option value="uthmani">عثماني</option>
          </select>
        </label>
      </div>
    </div>

    <details class="mt-5 border-t border-line/70 pt-4">
      <summary class="cursor-pointer text-sm font-bold text-ink-soft">خيارات متقدمة</summary>

      <div class="mushaf_control_grid mt-4">
        <label>
          <div class="field_label">نمط العلامات</div>
          <select class="select mt-2" bind:value={viewMode}>
            <option value="all">كل الفواصل المختلف فيها</option>
            <option value="pair">مقارنة زوجية</option>
          </select>
        </label>

        {#if viewMode === 'pair'}
          <label>
            <div class="field_label">مذهب المقارنة</div>
            <select class="select mt-2" bind:value={comparisonSystemId}>
              {#each systems as system (system.id)}
                <option value={system.id}>{get_system_name(system)}</option>
              {/each}
            </select>
          </label>
        {/if}

        <label>
          <div class="field_label">حكم الرأس في المذهب المعروض</div>
          <select class="select mt-2" bind:value={markerStatus}>
            <option value="all">كل رؤوس الآي المختلف فيها</option>
            <option value="counted">يعدها المذهب المعروض</option>
            <option value="not_counted">لا يعدها المذهب المعروض</option>
          </select>
        </label>

        <label>
          <div class="field_label">الآيات المعروضة</div>
          <select class="select mt-2" bind:value={ayahScope}>
            <option value="full">السورة كاملة</option>
            <option value="context">رؤوس الآي المختلف فيها مع الجوار</option>
            <option value="changed">رؤوس الآي المختلف فيها فقط</option>
          </select>
        </label>
      </div>

      {#if viewMode === 'pair'}
        <div class="mushaf_pair_summary mt-5">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div class="field_label">المقارنة الزوجية</div>
              {#if displaySystemId === comparisonSystemId}
                <p class="mt-3 text-sm text-ink-soft">
                  مذهب العدّ المعروض ومذهب المقارنة كلاهما {get_system_name(displaySystem) || displaySystemId}، لذلك لا يظهر فرق زوجي.
                </p>
              {:else if pairDifferenceSummary.ayahCount === 0}
                <p class="mt-3 text-sm text-ink-soft">
                  لا يختلف {get_system_name(displaySystem) || displaySystemId} و{get_system_name(comparisonSystem) || comparisonSystemId} في أي رأس آية مسجل هنا.
                </p>
              {:else}
                <p class="mt-3 text-sm text-ink-soft">
                  يختلف {get_system_name(displaySystem) || displaySystemId} و{get_system_name(comparisonSystem) || comparisonSystemId} في {format_difference_count(pairDifferenceSummary.pointCount, 'رأس آية مسجل', 'رؤوس آي مسجلة')} عبر {format_difference_count(pairDifferenceSummary.ayahCount, 'آية معروضة', 'آيات معروضة')}.
                </p>
              {/if}
            </div>

            <p class="text-xs font-bold text-ink-soft">
              {getShortLabel(displaySystemId)} فقط: {compact_number(pairDifferenceSummary.displayOnlyCount)} · {getShortLabel(comparisonSystemId)} فقط: {compact_number(pairDifferenceSummary.comparisonOnlyCount)}
            </p>
          </div>

          {#if pairDifferenceSummary.ayahs.length > 0}
            <div class="mt-4 text-[0.72rem] font-bold tracking-[0.16em] text-ink-soft uppercase">الآيات ذات الفرق الزوجي</div>
            <div class="mushaf_pair_range_list mt-3">
              {#each pairDifferenceSummary.ayahs as entry (entry.ayah)}
                <button
                  type="button"
                  class="mushaf_pair_range_chip"
                  data-tone={entry.tone}
                  data-active={entry.ayah === selectedAyah ? 'true' : 'false'}
                  title={entry.title}
                  onclick={() => focusPairAyah(entry)}
                >
                  {formatDisplayAyahLabel(entry.ayah)}
                </button>
              {/each}
            </div>
            <p class="mt-3 text-xs text-ink-soft">
              أرقام الآيات هنا بحسب مذهب العدّ المعروض، لا بحسب ترقيم حفص إلا إذا كان الكوفي هو المذهب المعروض.
            </p>
          {/if}
        </div>
      {/if}

      {#if displayedMushaf.preamble}
        <p class="mt-4 text-sm text-ink-soft">تظهر بسملة الفاتحة بلا رقم في مذهب العدّ المعروض.</p>
      {:else if script === 'uthmani' && displayBasmala}
        <p class="mt-4 text-sm text-ink-soft">تظهر البسملة قبل الآية الأولى حين يثبتها المصدر مستقلة عن النص.</p>
      {/if}

      {#if selectedMarkerHidden}
        <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
          <p>رأس الآية المحدد مخفي بهذا الترشيح.</p>
          <button type="button" class="pill_button" data-tone="accent" onclick={revealSelectedBoundary}>
            اضبط العارض لإظهاره
          </button>
        </div>
      {/if}

      {#if markerSummary.visible === 0 && rows.length > 0}
        <p class="mt-4 text-sm text-ink-soft">
          لا يظهر بهذا الترشيح أي رأس آية مختلف فيه.
        </p>
      {/if}
    </details>

    <div class="mushaf_viewer_shell mt-6">
      {#if displayBasmala}
        <div class="mushaf_basmala">{displayBasmala}</div>
      {/if}

      <div class="mushaf_viewer_body">
        {#each displayAyahs as item (`${script}-${displaySystemId}-${item.type}-${item.type === 'ayah' || item.type === 'preamble' ? item.ayah : `${item.from}-${item.to}`}`)}
          {#if item.type === 'gap'}
            <p class="mushaf_gap_line" dir="ltr">
              <span class="mushaf_gap_pill">
                {item.count === 1 ? 'آية واحدة مخفية' : `${compact_number(item.count)} آيات مخفية`} · {compact_number(item.from)}–{compact_number(item.to)}
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

              {#if item.type === 'preamble'}
                <span class="mushaf_ayah_number" data-unnumbered="true">بلا رقم</span>
              {:else}
                <span class="mushaf_ayah_number">{compact_number(item.ayah)}</span>
              {/if}
            </p>
          {/if}
        {/each}
      </div>
    </div>
  </section>
{/if}
