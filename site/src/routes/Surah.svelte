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
  get_system_secondary_name,
  surahs as surah_catalog,
  systems
} from '$lib/dataset.svelte.js'
import { decodeBoundaryHash, getBoundaryHash, getBoundaryTableRowId } from '$lib/mushaf-viewer-dom.js'
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

$effect(() => {
  display_system_id = initial_display_system_id
})

function getSurahHref(surahNumber) {
  return getMadhhabHref(window.navgo.href('/surahs/' + surahNumber), pager_system_id)
}

function setDisplaySystemId(systemId) {
  display_system_id = systemId
  replaceMadhhabQuery(systemId)
}

function setSelectedKey(anchorKey, source = 'table') {
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

{#snippet surahPager(showMeta)}
  <section aria-label="التنقل بين السور">
    <div class="surah_pager_grid">
      {#if previous_surah}
        <a class="surah_pager_card" href={getSurahHref(previous_surah.surah)}>
          <div class="metric_label flex items-center gap-2"><ArrowLeftIcon class="size-4" /> السورة السابقة</div>
          <div class="mt-3 flex items-center gap-2 text-sm font-bold text-ink">
            <ArrowLeftIcon class="size-4" />
            <span>{format_surah_reference(previous_surah.surah)}</span>
          </div>
          <div class="mt-4 text-xl font-bold text-ink">{get_surah_name(previous_surah)}</div>
          {#if get_surah_secondary_name(previous_surah)}
            <p class="mt-2 text-lg text-ink-soft">{get_surah_secondary_name(previous_surah)}</p>
          {/if}
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="badge" data-tone={previous_surah.disputed_points === 0 ? 'ok' : 'accent'}>
              {compact_number(previous_surah.disputed_points)} رأس آية مختلف فيه
            </span>
          </div>
        </a>
      {:else}
        <div class="surah_pager_card" data-disabled="true">
          <div class="metric_label flex items-center gap-2"><ArrowLeftIcon class="size-4" /> السورة السابقة</div>
          <div class="mt-4 text-xl font-bold text-ink">بداية المصحف</div>
          <p class="section_text mt-3 text-sm">هذه أول سورة.</p>
        </div>
      {/if}

      <div class="surah_pager_card surah_pager_status">
        {#if showMeta}
          <div class="metric_label">التنقل بين السور</div>
          <div class="mt-4 text-2xl font-bold text-ink">{format_surah_reference(surah_info.surah)} من {compact_number(surah_catalog.length)}</div>
          <div class="mt-3 text-lg font-bold text-ink">{get_surah_name(surah_info)}</div>
          {#if get_surah_secondary_name(surah_info)}
            <p class="mt-2 text-xl text-ink-soft">{get_surah_secondary_name(surah_info)}</p>
          {/if}
          <p class="mt-3 text-sm text-ink-soft">{compact_number(surah_info.disputed_points)} رأس آية مختلف فيه في هذه السورة</p>
        {:else}
          <div class="metric_label">واصل التصفح</div>
          <div class="mt-4 text-lg font-bold text-ink">انتقل إلى السورة التالية أو السابقة، أو ارجع إلى الفهرس.</div>
        {/if}
        <div class="mt-5">
          <a class="pill_button" href={window.navgo.href('/surahs')}><LibraryBigIcon class="size-4" /> جميع السور</a>
        </div>
      </div>

      {#if next_surah}
        <a class="surah_pager_card" href={getSurahHref(next_surah.surah)}>
          <div class="metric_label flex items-center justify-end gap-2">السورة التالية <ArrowRightIcon class="size-4" /></div>
          <div class="mt-3 flex items-center justify-end gap-2 text-sm font-bold text-ink">
            <span>{format_surah_reference(next_surah.surah)}</span>
            <ArrowRightIcon class="size-4" />
          </div>
          <div class="mt-4 text-xl font-bold text-ink">{get_surah_name(next_surah)}</div>
          {#if get_surah_secondary_name(next_surah)}
            <p class="mt-2 text-lg text-ink-soft">{get_surah_secondary_name(next_surah)}</p>
          {/if}
          <div class="mt-4 flex flex-wrap justify-end gap-2">
            <span class="badge" data-tone={next_surah.disputed_points === 0 ? 'ok' : 'accent'}>
              {compact_number(next_surah.disputed_points)} رأس آية مختلف فيه
            </span>
          </div>
        </a>
      {:else}
        <div class="surah_pager_card" data-disabled="true">
          <div class="metric_label flex items-center justify-end gap-2">السورة التالية <ArrowRightIcon class="size-4" /></div>
          <div class="mt-4 text-xl font-bold text-ink">نهاية المصحف</div>
          <p class="section_text mt-3 text-sm">هذه آخر سورة.</p>
        </div>
      {/if}
    </div>
  </section>
{/snippet}

{#if !surah_info}
  <section class="surface p-6">
    <div class="rule_label">السورة غير موجودة</div>
    <h1 class="section_title mt-4">لا توجد سورة تطابق “{surah}”.</h1>
  </section>
{:else}
  <div class="mb-6">
    {@render surahPager(true)}
  </div>

  <section class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] lg:items-start">
    <div>
      <div class="rule_label">ملف السورة</div>
      <h1 class="display_title mt-5 text-ink">{format_surah_reference(surah_info.surah)}</h1>
      <h2 class="mt-4 text-3xl font-bold text-ink">{get_surah_name(surah_info)}</h2>
      {#if get_surah_secondary_name(surah_info)}
        <p class="mt-3 text-3xl text-ink-soft">{get_surah_secondary_name(surah_info)}</p>
      {/if}
      <p class="section_text mt-5">
        في هذه السورة {compact_number(surah_info.disputed_points)} رأس آية مختلف فيه ضمن البيانات الحالية.
      </p>
    </div>

    <div class="surface surface_muted p-5">
      <div class="metric_label">العد حسب مذهب العدّ</div>
      <div class="mt-4 space-y-3 text-sm">
        {#each systems as system (system.id)}
          <div class="flex items-center justify-between gap-3 border-b border-line/60 pb-3 last:border-b-0 last:pb-0">
            <div>
              <div class="font-bold text-ink">{get_system_name(system)}</div>
              {#if get_system_secondary_name(system)}
                <div class="text-base text-ink-soft">{get_system_secondary_name(system)}</div>
              {/if}
            </div>
            <span class="badge" data-tone="ok">{compact_number(surah_info.counts[system.id])} آية</span>
          </div>
        {/each}
      </div>
      <a class="pill_button mt-5 w-full" href={window.navgo.href('/ayah-counts')}>كل أعداد الآي</a>
    </div>
  </section>

  {#if surah_rows.length === 0}
    <section class="mt-12 surface p-6 sm:p-8">
      <div class="rule_label">لا رؤوس آي مختلف فيها</div>
      <h2 class="section_title mt-4">لا توجد في هذه السورة رؤوس آي مختلف فيها ضمن البيانات الحالية.</h2>
      <p class="section_text mt-3">أعداد مذاهب العدّ الستة لهذه السورة معروضة في بطاقة العد أعلاه.</p>
    </section>
  {:else}
    <section class="mt-12 split_layout">
      <div class="space-y-4">
        <div class="surface p-5 sm:p-6">
          <div class="rule_label">رؤوس الآي المختلف فيها</div>
          <h2 class="section_title mt-4">رؤوس الآي التي تختلف فيها مذاهب العدّ داخل السورة</h2>
          <p class="section_text mt-3 text-sm">
            اختر رأس آية لعرض الفاصلة، وحكم حفص/الكوفي فيه، ومذاهب العدّ التي تعده.
          </p>
        </div>

        <div class="table_shell">
          <table class="data_table">
            <thead>
              <tr>
                <th>رأس الآية</th>
                <th>الفاصلة</th>
                <th>في حفص/الكوفي</th>
                <th>يعده</th>
              </tr>
            </thead>
            <tbody>
              {#each surah_rows as row (row.anchor_key)}
                <tr
                  id={getBoundaryTableRowId(row.anchor_key)}
                  data-active={row.anchor_key === selected_row?.anchor_key ? 'true' : 'false'}
                  onclick={() => setSelectedKey(row.anchor_key, 'table')}
                >
                  <td data-label="رأس الآية">
                    <div class="font-bold text-ink">{row.ayah_slot_label}</div>
                    <div class="mt-2 text-xs text-ink-soft">{row.location_label}</div>
                  </td>
                  <td data-label="الفاصلة">
                    <div class="arabic_title text-xl text-ink">{row.word}</div>
                    <div class="mt-2 text-xs text-ink-soft">{row.anchor_key}</div>
                  </td>
                  <td data-label="في حفص/الكوفي">
                    <span class="badge" data-tone={row.systems.kufi?.counts_boundary ? 'ok' : 'warn'}>
                      {row.systems.kufi?.counts_boundary ? 'يعده حفص' : 'لا يعده حفص'}
                    </span>
                  </td>
                  <td data-label="يعده">
                    <div class="flex flex-wrap gap-2">
                      {#each row.counted_by as system_id (system_id)}
                        <span class="badge" data-tone="ok">{get_system_name(system_id)}</span>
                      {/each}
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <div id="boundary-detail-panel">
        <BoundaryDetail row={selected_row} madhhabId={display_system_id} />
      </div>
    </section>
  {/if}

  <section class="mt-12" id="surah-mushaf-viewer">
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

  <div class="mt-12">
    {@render surahPager(false)}
  </div>
{/if}
