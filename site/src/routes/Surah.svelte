<script>
import { ArrowLeftIcon, ArrowRightIcon, LibraryBigIcon } from '@lucide/svelte'

import BoundaryDetail from '~/components/BoundaryDetail.svelte'
import SurahMushafViewer from '~/components/SurahMushafViewer.svelte'
import {
  compact_number,
  format_surah_reference,
  get_surah,
  get_surah_name,
  get_surah_rows,
  get_surah_secondary_name,
  get_system_name,
  systems
} from '$lib/dataset.svelte.js'
import { decodeBoundaryHash, getBoundaryHash } from '$lib/mushaf-viewer-dom.js'
import { loadSurahViewer } from '$lib/mushaf-viewer.js'
import { getMadhhabHref, replaceMadhhabQuery } from '$lib/route-urls.js'

let { surah, route_hash = '', route_query = {} } = $props()

let surah_info = $derived(get_surah(surah))
let surah_rows = $derived(get_surah_rows(surah))
let viewerPromise = $derived(surah_info ? loadSurahViewer(surah_info.surah) : Promise.resolve(null))
let selected_key = $state(null)
let selection_request = $state(null)
let last_route_selection = $state(null)
let selected_row = $derived(selected_key ? surah_rows.find(row => row.anchor_key === selected_key) || null : null)
let previous_surah = $derived(surah_info ? get_surah(surah_info.surah - 1) : null)
let next_surah = $derived(surah_info ? get_surah(surah_info.surah + 1) : null)
let initial_display_system_id = $derived.by(() => {
  if (!surah_info) {
    return 'kufi'
  }

  const requestedSystemId = route_query.madhhab
  return systems.some(system => system.id === requestedSystemId) ? requestedSystemId : 'kufi'
})
let display_system_id = $state('kufi')
let pager_system_id = $derived(display_system_id || initial_display_system_id)
let display_system = $derived(systems.find(system => system.id === pager_system_id) || systems[0] || null)
let display_count = $derived(surah_info?.counts?.[pager_system_id] ?? surah_info?.counts?.kufi ?? null)

$effect(() => {
  display_system_id = initial_display_system_id
})

function getSurahHref(surahNumber) {
  return getMadhhabHref(window.navgo.href('/surahs/' + surahNumber), pager_system_id)
}

function getPickerHref() {
  return getMadhhabHref(window.navgo.href('/mushaf'), pager_system_id)
}

function setDisplaySystemId(systemId) {
  display_system_id = systemId
  replaceMadhhabQuery(systemId)
}

function setSelectedKey(anchorKey, source = 'list') {
  if (!anchorKey) {
    return
  }

  selected_key = anchorKey
  selection_request = {
    anchorKey,
    source,
    nonce: (selection_request?.nonce || 0) + 1
  }
}

$effect(() => {
  const currentSurahNumber = surah_info?.surah || null
  const selectionKey = `${currentSurahNumber || ''}:${route_hash || ''}`

  if (!currentSurahNumber || selectionKey === last_route_selection) {
    return
  }

  last_route_selection = selectionKey

  const hashKey = decodeBoundaryHash(route_hash)
  const nextAnchorKey = surah_rows.find(row => row.anchor_key === hashKey)?.anchor_key || null

  selected_key = nextAnchorKey
  selection_request = nextAnchorKey
    ? {
        anchorKey: nextAnchorKey,
        source: 'route',
        nonce: (selection_request?.nonce || 0) + 1
      }
    : null
})

$effect(() => {
  const row = selected_row

  if (!row) {
    return
  }

  const nextHash = getBoundaryHash(row.anchor_key)
  const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`

  if (window.location.hash !== nextHash) {
    window.history.replaceState(window.history.state, '', nextUrl)
  }
})
</script>

{#if !surah_info}
  <section class="surface p-6">
    <div class="rule_label">السورة غير موجودة</div>
    <h1 class="section_title mt-4">لا توجد سورة بهذا الرقم</h1>
    <a class="pill_button mt-6" href={window.navgo.href('/mushaf')}>
      <LibraryBigIcon class="size-4" />
      اختيار سورة
    </a>
  </section>
{:else}
  <section class="flex flex-col gap-5 border-b border-line/70 pb-6 lg:flex-row lg:items-end lg:justify-between">
    <div class="max-w-3xl">
      <a class="inline-flex items-center gap-2 text-sm font-bold text-accent-strong underline decoration-line underline-offset-4" href={getPickerHref()}>
        <LibraryBigIcon class="size-4" />
        اختيار سورة
      </a>

      <div class="rule_label mt-6">المصحف</div>
      <h1 class="section_title mt-4">{format_surah_reference(surah_info.surah)} · {get_surah_name(surah_info)}</h1>
      {#if get_surah_secondary_name(surah_info)}
        <p class="arabic_title mt-2 text-ink-soft">{get_surah_secondary_name(surah_info)}</p>
      {/if}
      <p class="section_text mt-4 text-sm">
        الترقيم هنا بمذهب {get_system_name(display_system) || pager_system_id}: {compact_number(display_count)} آية، وفيها {compact_number(surah_info.disputed_points)} رأس آية مختلف فيه.
      </p>
    </div>

    <nav class="flex flex-wrap gap-2" aria-label="التنقل بين السور">
      {#if previous_surah}
        <a class="pill_button" href={getSurahHref(previous_surah.surah)}>
          <ArrowLeftIcon class="size-4" />
          {format_surah_reference(previous_surah.surah)}
        </a>
      {/if}
      {#if next_surah}
        <a class="pill_button" href={getSurahHref(next_surah.surah)}>
          {format_surah_reference(next_surah.surah)}
          <ArrowRightIcon class="size-4" />
        </a>
      {/if}
    </nav>
  </section>

  <section class="mt-6" id="surah-mushaf-viewer">
    {#await viewerPromise then viewer}
      {#if viewer}
        {#key `${surah_info.surah}-${initial_display_system_id}`}
          <SurahMushafViewer
            {viewer}
            rows={surah_rows}
            {systems}
            initialDisplaySystemId={initial_display_system_id}
            selectedKey={selected_row?.anchor_key || null}
            selectionRequest={selection_request}
            onDisplaySystemChange={setDisplaySystemId}
            onselect={anchorKey => setSelectedKey(anchorKey, 'viewer')}
          />
        {/key}
      {:else}
        <div class="surface p-5 text-sm text-ink-soft">بيانات عارض المصحف غير متاحة بعد.</div>
      {/if}
    {:catch}
      <div class="surface p-5 text-sm text-ink-soft">تعذر تحميل بيانات عارض المصحف.</div>
    {/await}
  </section>

  {#if selected_row}
    <section class="mt-6" id="boundary-detail-panel">
      <BoundaryDetail row={selected_row} madhhabId={display_system_id} />
    </section>
  {/if}

  {#if surah_rows.length === 0}
    <section class="mt-6 surface p-5 text-sm text-ink-soft">
      لا رؤوس آي مختلف فيها في هذه السورة. راجع أعداد الآي لمعرفة العدد في كل مذهب.
    </section>
  {:else}
    <details class="mt-6 surface p-5">
      <summary class="cursor-pointer text-base font-bold text-ink">
        رؤوس الآي المختلف فيها في هذه السورة ({compact_number(surah_rows.length)})
      </summary>

      <div class="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {#each surah_rows as row (row.anchor_key)}
          <button
            type="button"
            class="rounded-2xl border border-line/70 bg-white/45 p-4 text-start transition hover:border-accent/40 hover:bg-paper-soft/70"
            data-active={row.anchor_key === selected_row?.anchor_key ? 'true' : 'false'}
            onclick={() => setSelectedKey(row.anchor_key, 'list')}
          >
            <span class="block text-sm font-bold text-ink">{row.ayah_slot_label}</span>
            <span class="mt-1 block text-lg text-ink">الفاصلة: {row.word}</span>
            <span class="mt-2 block text-xs font-semibold text-ink-soft">
              يعده: {row.counted_by.map(get_system_name).join('، ')}
            </span>
          </button>
        {/each}
      </div>
    </details>
  {/if}
{/if}
