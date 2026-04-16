<script>
import { ArrowLeftIcon, ArrowRightIcon, LibraryBigIcon } from '@lucide/svelte'

import BoundaryDetail from '~/components/BoundaryDetail.svelte'
import SurahMushafViewer from '~/components/SurahMushafViewer.svelte'
import PlotSurahBoundaryMap from '~/components/charts/PlotSurahBoundaryMap.svelte'
import {
  compact_number,
  format_boundary_kind,
  format_signed_delta,
  format_surah_reference,
  format_verification_status,
  get_surah,
  get_surah_name,
  get_surah_rows,
  get_surah_secondary_name,
  get_system_name,
  get_system_secondary_name,
  get_verification_tone,
  surahs as surah_catalog,
  systems
} from '$lib/dataset.svelte.js'
import { decodeBoundaryHash, getBoundaryTableRowId } from '$lib/mushaf-viewer-dom.js'
import { loadSurahViewer } from '$lib/mushaf-viewer.js'

let { surah } = $props()

const initialHashKey = decodeBoundaryHash(window.location.hash)

let surah_info = $derived(get_surah(surah))
let surah_rows = $derived(get_surah_rows(surah))
let viewerPromise = $derived(surah_info ? loadSurahViewer(surah_info.surah) : Promise.resolve(null))
let selected_key = $state(initialHashKey)
let selection_request = $state(
  initialHashKey
    ? {
        anchorKey: initialHashKey,
        source: 'hash',
        nonce: 1
      }
    : null
)
let last_routed_surah = $state(null)
let active_row = $derived(surah_rows.find(row => row.anchor_key === selected_key) || surah_rows[0] || null)
let previous_surah = $derived(surah_info ? get_surah(surah_info.surah - 1) : null)
let next_surah = $derived(surah_info ? get_surah(surah_info.surah + 1) : null)

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

  if (!currentSurahNumber || currentSurahNumber === last_routed_surah) {
    return
  }

  last_routed_surah = currentSurahNumber

  const hashKey = decodeBoundaryHash(window.location.hash)
  const nextAnchorKey = surah_rows.find(row => row.anchor_key === hashKey)?.anchor_key || surah_rows[0]?.anchor_key || null

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
  const row = active_row

  if (!row) {
    return
  }

  const nextHash = `#${encodeURIComponent(row.anchor_key)}`
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
        <a class="surah_pager_card" href={window.navgo.href('/surahs/' + previous_surah.surah)}>
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
              {compact_number(previous_surah.disputed_points)} موضعًا مختلفًا
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
          <p class="mt-3 text-sm text-ink-soft">{compact_number(surah_info.disputed_points)} موضعًا مختلفًا في هذه السورة</p>
        {:else}
          <div class="metric_label">واصل التصفح</div>
          <div class="mt-4 text-lg font-bold text-ink">انتقل إلى السورة التالية أو السابقة، أو ارجع إلى الفهرس.</div>
        {/if}
        <div class="mt-5">
          <a class="pill_button" href={window.navgo.href('/surahs')}><LibraryBigIcon class="size-4" /> جميع السور</a>
        </div>
      </div>

      {#if next_surah}
        <a class="surah_pager_card" href={window.navgo.href('/surahs/' + next_surah.surah)}>
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
              {compact_number(next_surah.disputed_points)} موضعًا مختلفًا
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
        فيها {compact_number(surah_info.disputed_points)} موضعًا مختلفًا: {compact_number(surah_info.by_kind.end)} نهايات و{compact_number(surah_info.by_kind.internal)} فواصل داخلية.
      </p>
    </div>

    <div class="surface surface_muted p-5">
      <div class="metric_label">العد حسب النظام</div>
      <div class="mt-4 space-y-3 text-sm">
        {#each systems as system (system.id)}
          <div class="flex items-center justify-between gap-3 border-b border-line/60 pb-3 last:border-b-0 last:pb-0">
            <div>
              <div class="font-bold text-ink">{get_system_name(system)}</div>
              {#if get_system_secondary_name(system)}
                <div class="text-base text-ink-soft">{get_system_secondary_name(system)}</div>
              {/if}
            </div>
            <span class="badge" data-tone={surah_info.deltas_from_kufi[system.id] === 0 ? 'ok' : 'warn'}>
              {compact_number(surah_info.counts[system.id])} · {format_signed_delta(surah_info.deltas_from_kufi[system.id])}
            </span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  {#if surah_rows.length === 0}
    <section class="mt-12 surface p-6 sm:p-8">
      <div class="rule_label">لا مواضع خلاف</div>
      <h2 class="section_title mt-4">لا توجد في هذه السورة مواضع خلاف مسجلة.</h2>
      <p class="section_text mt-3">لا تسجل طبقة الأصول هنا فرقًا حدوديًا صالحًا للمراجعة.</p>
    </section>
  {:else}
    <section class="mt-12 surface p-5 sm:p-6">
      <div class="rule_label">مصفوفة المواضع</div>
      <h2 class="section_title mt-4">كيف يعامل كل نظام كل موضع</h2>
      <p class="section_text mt-3 text-sm">إذا تكرر الخلاف داخل آية واحدة استُعملت لواحق مثل 40a و40b.</p>
      <div class="mt-6">
        <PlotSurahBoundaryMap rows={surah_rows} {systems} />
      </div>
    </section>

    <section class="mt-12 split_layout">
      <div class="table_shell">
        <table class="data_table">
          <thead>
            <tr>
              <th>الآية</th>
              <th>الارتكاز</th>
              <th>النوع</th>
              <th>التوثيق</th>
              <th>يعده</th>
            </tr>
          </thead>
          <tbody>
            {#each surah_rows as row (row.anchor_key)}
              <tr
                id={getBoundaryTableRowId(row.anchor_key)}
                data-active={row.anchor_key === active_row?.anchor_key ? 'true' : 'false'}
                onclick={() => setSelectedKey(row.anchor_key, 'table')}
              >
                <td data-label="الآية">
                  <div class="font-bold text-ink">{row.ayah_slot_label}</div>
                  <div class="mt-2 text-xs text-ink-soft">{row.location_label}</div>
                </td>
                <td data-label="الارتكاز">
                  <div class="arabic_title text-xl text-ink">{row.word}</div>
                  <div class="mt-2 text-xs text-ink-soft">{row.anchor_key}</div>
                </td>
                <td data-label="النوع"><span class="badge" data-tone={row.kind === 'internal' ? 'accent' : 'ok'}>{format_boundary_kind(row.kind)}</span></td>
                <td data-label="التوثيق"><span class="badge" data-tone={get_verification_tone(row.verification_status)}>{format_verification_status(row.verification_status)}</span></td>
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

      <div id="boundary-detail-panel">
        <BoundaryDetail row={active_row} />
      </div>
    </section>
  {/if}

  <section class="mt-12" id="surah-mushaf-viewer">
    {#await viewerPromise then viewer}
      {#if viewer}
        <SurahMushafViewer
          {viewer}
          rows={surah_rows}
          {systems}
          selectedKey={active_row?.anchor_key || null}
          selectionRequest={selection_request}
          onselect={anchorKey => setSelectedKey(anchorKey, 'viewer')}
        />
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
