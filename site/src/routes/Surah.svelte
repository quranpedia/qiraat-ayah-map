<script>
import { ArrowLeftIcon, ArrowRightIcon, LibraryBigIcon } from '@lucide/svelte'

import BoundaryDetail from '~/components/BoundaryDetail.svelte'
import SurahMushafViewer from '~/components/SurahMushafViewer.svelte'
import PlotSurahBoundaryMap from '~/components/charts/PlotSurahBoundaryMap.svelte'
import {
  format_verification_status,
  get_surah,
  get_surah_rows,
  get_system_name,
  get_verification_tone,
  surahs as surah_catalog,
  systems
} from '$lib/dataset.svelte.js'
import { app_href } from '$lib/nav.js'
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
  <section aria-label="Surah navigation">
    <div class="surah_pager_grid">
      {#if previous_surah}
        <a class="surah_pager_card" href={app_href('/surahs/' + previous_surah.surah)}>
          <div class="metric_label flex items-center gap-2"><ArrowLeftIcon class="size-4" /> Previous surah</div>
          <div class="mt-3 flex items-center gap-2 text-sm font-bold text-ink">
            <ArrowLeftIcon class="size-4" />
            <span>Surah {previous_surah.surah}</span>
          </div>
          <div class="mt-4 text-xl font-bold text-ink">{previous_surah.name_en}</div>
          <p class="arabic_title mt-2 text-lg text-ink-soft">{previous_surah.name_ar}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="badge" data-tone={previous_surah.disputed_points === 0 ? 'ok' : 'accent'}>
              {previous_surah.disputed_points} disputed points
            </span>
          </div>
        </a>
      {:else}
        <div class="surah_pager_card" data-disabled="true">
          <div class="metric_label flex items-center gap-2"><ArrowLeftIcon class="size-4" /> Previous surah</div>
          <div class="mt-4 text-xl font-bold text-ink">Beginning of the mushaf</div>
          <p class="section_text mt-3 text-sm">This is the first surah in the sequence.</p>
        </div>
      {/if}

      <div class="surah_pager_card surah_pager_status">
        {#if showMeta}
          <div class="metric_label">Surah navigation</div>
          <div class="mt-4 text-2xl font-bold text-ink">Surah {surah_info.surah} of {surah_catalog.length}</div>
          <div class="mt-3 text-lg font-bold text-ink">{surah_info.name_en}</div>
          <p class="arabic_title mt-2 text-xl text-ink-soft">{surah_info.name_ar}</p>
          <p class="mt-3 text-sm text-ink-soft">{surah_info.disputed_points} disputed points in this surah</p>
        {:else}
          <div class="metric_label">Continue browsing</div>
          <div class="mt-4 text-lg font-bold text-ink">Move to the next or previous surah, or return to the full index.</div>
        {/if}
        <div class="mt-5">
          <a class="pill_button" href={app_href('/surahs')}><LibraryBigIcon class="size-4" /> All surahs</a>
        </div>
      </div>

      {#if next_surah}
        <a class="surah_pager_card" href={app_href('/surahs/' + next_surah.surah)}>
          <div class="metric_label flex items-center justify-end gap-2">Next surah <ArrowRightIcon class="size-4" /></div>
          <div class="mt-3 flex items-center justify-end gap-2 text-sm font-bold text-ink">
            <span>Surah {next_surah.surah}</span>
            <ArrowRightIcon class="size-4" />
          </div>
          <div class="mt-4 text-xl font-bold text-ink">{next_surah.name_en}</div>
          <p class="arabic_title mt-2 text-lg text-ink-soft">{next_surah.name_ar}</p>
          <div class="mt-4 flex flex-wrap justify-end gap-2">
            <span class="badge" data-tone={next_surah.disputed_points === 0 ? 'ok' : 'accent'}>
              {next_surah.disputed_points} disputed points
            </span>
          </div>
        </a>
      {:else}
        <div class="surah_pager_card" data-disabled="true">
          <div class="metric_label flex items-center justify-end gap-2">Next surah <ArrowRightIcon class="size-4" /></div>
          <div class="mt-4 text-xl font-bold text-ink">End of the mushaf</div>
          <p class="section_text mt-3 text-sm">This is the final surah in the sequence.</p>
        </div>
      {/if}
    </div>
  </section>
{/snippet}

{#if !surah_info}
  <section class="surface p-6">
    <div class="rule_label">Surah not found</div>
    <h1 class="section_title mt-4">No surah matches “{surah}”.</h1>
  </section>
{:else}
  <div class="mb-6">
    {@render surahPager(true)}
  </div>

  <section class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] lg:items-start">
    <div>
      <div class="rule_label">Surah profile</div>
      <h1 class="display_title mt-5 text-ink">Surah {surah_info.surah}</h1>
      <h2 class="mt-4 text-3xl font-bold text-ink">{surah_info.name_en}</h2>
      <p class="arabic_title mt-3 text-3xl text-ink-soft">{surah_info.name_ar}</p>
      <p class="section_text mt-5">
        {surah_info.disputed_points} disputed points appear in this surah: {surah_info.by_kind.end} end boundaries and {surah_info.by_kind.internal} internal breakpoints.
      </p>
    </div>

    <div class="surface surface_muted p-5">
      <div class="metric_label">Per-system ayah counts</div>
      <div class="mt-4 space-y-3 text-sm">
        {#each systems as system (system.id)}
          <div class="flex items-center justify-between gap-3 border-b border-line/60 pb-3 last:border-b-0 last:pb-0">
            <div>
              <div class="font-bold text-ink">{system.name_en}</div>
              <div class="arabic_title text-base text-ink-soft">{system.name_ar}</div>
            </div>
            <span class="badge" data-tone={surah_info.deltas_from_kufi[system.id] === 0 ? 'ok' : 'warn'}>
              {surah_info.counts[system.id]} · {surah_info.deltas_from_kufi[system.id] > 0 ? '+' : ''}{surah_info.deltas_from_kufi[system.id]}
            </span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  {#if surah_rows.length === 0}
    <section class="mt-12 surface p-6 sm:p-8">
      <div class="rule_label">No disputed points</div>
      <h2 class="section_title mt-4">This surah has no recorded disputed boundary points.</h2>
      <p class="section_text mt-3">The canonical primitive layer does not place any scholar-reviewable boundary differences inside this surah.</p>
    </section>
  {:else}
    <section class="mt-12 surface p-5 sm:p-6">
      <div class="rule_label">Boundary matrix</div>
      <h2 class="section_title mt-4">Which systems split, merge, or match Kufi at each point</h2>
      <p class="section_text mt-3 text-sm">
        Observable Plot is used here as a matrix. If more than one disputed point falls inside the same Hafs ayah, the chart uses slot labels such as 40a and 40b instead of stacking them on top of each other.
      </p>
      <div class="mt-6">
        <PlotSurahBoundaryMap rows={surah_rows} {systems} />
      </div>
    </section>

    <section class="mt-12 split_layout">
      <div class="table_shell">
        <table class="data_table">
          <thead>
            <tr>
              <th>Ayah</th>
              <th>Anchor</th>
              <th>Kind</th>
              <th>Verification</th>
              <th>Counted by</th>
            </tr>
          </thead>
          <tbody>
            {#each surah_rows as row (row.anchor_key)}
              <tr
                id={getBoundaryTableRowId(row.anchor_key)}
                data-active={row.anchor_key === active_row?.anchor_key ? 'true' : 'false'}
                onclick={() => setSelectedKey(row.anchor_key, 'table')}
              >
                <td>
                  <div class="font-bold text-ink">{row.ayah_slot_label}</div>
                  <div class="mt-2 text-xs text-ink-soft">{row.location_label}</div>
                </td>
                <td>
                  <div class="arabic_title text-xl text-ink">{row.word}</div>
                  <div class="mt-2 text-xs text-ink-soft">{row.anchor_key}</div>
                </td>
                <td><span class="badge" data-tone={row.kind === 'internal' ? 'accent' : 'ok'}>{row.kind}</span></td>
                <td><span class="badge" data-tone={get_verification_tone(row.verification_status)}>{format_verification_status(row.verification_status)}</span></td>
                <td>
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
        <div class="surface p-5 text-sm text-ink-soft">The mushaf viewer data for this surah is not available yet.</div>
      {/if}
    {:catch}
      <div class="surface p-5 text-sm text-ink-soft">The mushaf viewer data could not be loaded for this surah.</div>
    {/await}
  </section>

  <div class="mt-12">
    {@render surahPager(false)}
  </div>
{/if}
