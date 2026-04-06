<script>
import { tick } from 'svelte'

import {
  compact_number,
  format_ayah_reference,
  format_boundary_action,
  format_boundary_kind,
  format_difference_count,
  get_system_name
} from '$lib/dataset.svelte.js'
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

function getBoundaryAyahNumber(row) {
  return viewer?.boundary_positions?.[row.anchor_key]?.ayah || row.hafs_ayah
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
  const leftName = get_system_name(leftSystem) || leftSystemId
  const rightName = get_system_name(rightSystem) || rightSystemId
  const pointType = format_boundary_kind(row.kind, 'viewer')
  const leftStatus = format_boundary_action(leftCounts)
  const rightStatus = format_boundary_action(rightCounts)

  return `${row.location_label} · ${row.word} · ${pointType} — ${leftName} ${leftStatus}؛ ${rightName} ${rightStatus}.`
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

function getPairAyahTone(entry) {
  if (entry.endCount > 0 && entry.internalCount > 0) {
    return 'warn'
  }

  if (entry.internalCount > 0) {
    return 'accent'
  }

  return 'ok'
}

function buildPairAyahTitle(entry) {
  const kindLabel = entry.endCount > 0 && entry.internalCount > 0
    ? 'فروق نهايات وداخلية'
    : entry.internalCount > 0
      ? 'فروق داخلية'
      : 'فروق في نهايات الآيات'
  const pointLabel = format_difference_count(entry.pointCount, 'موضع مختلف', 'مواضع مختلفة')

  return `${format_ayah_reference(entry.ayah)}: ${kindLabel}؛ لهذا الزوج ${pointLabel}`
}

function scrollAyahIntoView(ayahNumber) {
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

let pairDifferenceSummary = $derived.by(() => {
  const ayahMap = new Map()
  const summary = {
    pointCount: 0,
    ayahCount: 0,
    endAyahCount: 0,
    internalAyahCount: 0,
    ayahs: []
  }

  for (const row of rows) {
    const leftCounts = row.systems[leftSystemId]?.counts_boundary ?? false
    const rightCounts = row.systems[rightSystemId]?.counts_boundary ?? false

    if (leftCounts === rightCounts) {
      continue
    }

    const ayahNumber = getBoundaryAyahNumber(row)
    const entry = ayahMap.get(ayahNumber) || {
      ayah: ayahNumber,
      anchorKey: row.anchor_key,
      pointCount: 0,
      endCount: 0,
      internalCount: 0
    }

    entry.pointCount += 1
    entry[row.kind === 'end' ? 'endCount' : 'internalCount'] += 1
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
  summary.endAyahCount = summary.ayahs.filter(entry => entry.endCount > 0).length
  summary.internalAyahCount = summary.ayahs.filter(entry => entry.internalCount > 0).length

  return summary
})

function focusPairAyah(entry) {
  if (!entry) {
    return
  }

  const anchorKey = entry.anchorKey || null
  const needsReveal = !focusAyahNumbers.has(entry.ayah) || (anchorKey && !markerStatesByKey.get(anchorKey)?.visible)

  if (needsReveal) {
    boundaryKind = 'all'
    ayahScope = 'context'
  }

  if (anchorKey) {
    onselect?.(anchorKey)
  }

  tick().then(() => {
    scrollAyahIntoView(entry.ayah)
  })
}

let visibleAyahNumbers = $derived.by(() => {
  const ayahs = new Set()

  for (const row of rows) {
    if (markerStatesByKey.get(row.anchor_key)?.visible) {
      ayahs.add(getBoundaryAyahNumber(row))
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

  if (rows.length === 0 || ayahScope === 'full') {
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
        <div class="rule_label">عارض المصحف</div>
        <h2 class="section_title mt-4">علامات الحدود داخل نص السورة</h2>
        <p class="section_text mt-3 text-sm">
          تبقى الفواصل الداخلية مضمّنة بعد كلمة الارتكاز، بينما تظهر فروق نهايات الآيات بجوار رقم الآية حتى تتمكن من قراءة السورة قراءة طبيعية مع بقاء مواضع الوقف المختلفة ظاهرة.
        </p>
      </div>

      <div class="flex flex-wrap gap-2 text-xs text-ink-soft">
        <span class="badge" data-tone="accent">{getShortLabel(leftSystemId)} فقط: {compact_number(comparisonSummary.left_only)}</span>
        <span class="badge" data-tone="alert">{getShortLabel(rightSystemId)} فقط: {compact_number(comparisonSummary.right_only)}</span>
        {#if markerScope === 'either'}
          <span class="badge" data-tone="ok">كلاهما: {compact_number(comparisonSummary.both)}</span>
        {/if}
      </div>
    </div>

    <div class="mushaf_pair_summary mt-6">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div class="metric_label">ملخص الزوج الحالي</div>
          {#if leftSystemId === rightSystemId}
            <p class="mt-3 text-sm text-ink-soft">
              المحددان كلاهما على {get_system_name(leftSystem) || leftSystemId}، لذلك لا توجد فروق زوجية تُذكر في هذه السورة.
            </p>
          {:else if pairDifferenceSummary.ayahCount === 0}
            <p class="mt-3 text-sm text-ink-soft">
              لا يختلف {get_system_name(leftSystem) || leftSystemId} و{get_system_name(rightSystem) || rightSystemId} في أي موضع مسجل داخل هذه السورة.
            </p>
          {:else}
            <p class="mt-3 text-sm text-ink-soft">
              يختلف {get_system_name(leftSystem) || leftSystemId} و{get_system_name(rightSystem) || rightSystemId} في {format_difference_count(pairDifferenceSummary.pointCount, 'موضع مسجل', 'مواضع مسجلة')} عبر {format_difference_count(pairDifferenceSummary.ayahCount, 'آية', 'آيات')} داخل هذه السورة.
            </p>
          {/if}
        </div>

        <div class="flex flex-wrap gap-2 text-xs text-ink-soft">
          <span class="badge" data-tone="accent">{format_difference_count(pairDifferenceSummary.ayahCount, 'آية مختلفة', 'آيات مختلفة')}</span>
          <span class="badge" data-tone="ok">{compact_number(pairDifferenceSummary.endAyahCount)} مع فروق في النهايات</span>
          <span class="badge" data-tone="warn">{compact_number(pairDifferenceSummary.internalAyahCount)} مع فروق داخلية</span>
        </div>
      </div>

      {#if pairDifferenceSummary.ayahs.length > 0}
        <div class="mt-4 text-[0.72rem] font-bold tracking-[0.16em] text-ink-soft uppercase">الآيات المختلفة</div>
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
              {compact_number(entry.ayah)}
            </button>
          {/each}
        </div>
        <p class="mt-3 text-xs text-ink-soft">
          اضغط رقم الآية للانتقال إليها. وتستعمل الآيات ذات فروق النهايات لون النهاية، والآيات ذات الفروق الداخلية لون الداخل، والآيات التي تجمع النوعين لونًا مركبًا.
        </p>
      {/if}
    </div>

    <div class="mushaf_control_grid mt-6">
      <label>
        <div class="metric_label">الرسم</div>
        <select class="select mt-2" bind:value={script}>
          <option value="plain">إملائي</option>
          <option value="uthmani">عثماني</option>
        </select>
      </label>

      <label>
        <div class="metric_label">النظام الأيسر</div>
        <select class="select mt-2" bind:value={leftSystemId}>
          {#each systems as system (system.id)}
            <option value={system.id}>{get_system_name(system)}</option>
          {/each}
        </select>
      </label>

      <label>
        <div class="metric_label">النظام الأيمن</div>
        <select class="select mt-2" bind:value={rightSystemId}>
          {#each systems as system (system.id)}
            <option value={system.id}>{get_system_name(system)}</option>
          {/each}
        </select>
      </label>

      <label>
        <div class="metric_label">المواضع</div>
        <select class="select mt-2" bind:value={boundaryKind}>
          <option value="all">جميع مواضع الخلاف</option>
          <option value="end">نهايات الآيات فقط</option>
          <option value="internal">الداخلية فقط</option>
        </select>
      </label>

      <label>
        <div class="metric_label">الآيات المعروضة</div>
        <select class="select mt-2" bind:value={ayahScope}>
          <option value="context">الآيات المتغيرة مع الجوار</option>
          <option value="changed">الآيات المتغيرة فقط</option>
          <option value="full">السورة كاملة</option>
        </select>
      </label>

      <label>
        <div class="metric_label">العلامات</div>
        <select class="select mt-2" bind:value={markerScope}>
          <option value="differences">مواضع الاختلاف فقط</option>
          <option value="either">أي موضع يعده أحد النظامين</option>
        </select>
      </label>
    </div>

    <div class="mt-5 flex flex-wrap gap-2 text-xs text-ink-soft">
      <span class="badge" data-tone="accent">{getShortLabel(leftSystemId)} = {get_system_name(leftSystem) || leftSystemId}</span>
      <span class="badge" data-tone="alert">{getShortLabel(rightSystemId)} = {get_system_name(rightSystem) || rightSystemId}</span>
      {#if script === 'uthmani'}
        <span class="badge" data-tone="warn">تُعرض بسملة افتتاح السورة مستقلة إذا كان ملف المصدر يسبق بها الآية الأولى.</span>
      {/if}
    </div>

    <p class="mt-4 text-sm text-ink-soft">
      يظهر {compact_number(displaySummary.shownAyahs)} من أصل {compact_number(viewer.kufi_ayah_count)} آية. والمواضع الظاهرة في هذا الترشيح هي {compact_number(comparisonSummary.visible)} موضعًا: منها {compact_number(comparisonSummary.end)} من نهايات الآيات و{compact_number(comparisonSummary.internal)} من الفواصل الداخلية.
    </p>

    {#if selectedMarkerHidden}
      <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
        <p>الموضع المحدد حاليًا مخفي بهذا الترشيح أو بهذا الزوج من الأنظمة.</p>
        <button type="button" class="pill_button" data-tone="accent" onclick={revealSelectedBoundary}>
          اضبط العارض لإظهاره
        </button>
      </div>
    {/if}

    {#if comparisonSummary.visible === 0 && rows.length > 0}
      <p class="mt-4 text-sm text-ink-soft">
        مع هذا الزوج وهذا الترشيح لا يظهر الآن أي موضع خلاف مسجل في هذه السورة.
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

              <span class="mushaf_ayah_number">{compact_number(item.ayah)}</span>
            </p>
          {/if}
        {/each}
      </div>
    </div>
  </section>
{/if}
