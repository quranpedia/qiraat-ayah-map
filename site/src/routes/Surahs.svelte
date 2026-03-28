<script>
import { ArrowRightIcon, SearchIcon } from '@lucide/svelte'

import { summary, surahs } from '$lib/dataset.svelte.js'
import { app_href } from '$lib/nav.js'

let query = $state('')
let sort_mode = $state('canonical')
let show_only_disputed = $state(false)

let visible_surahs = $derived.by(() => {
  const normalized_query = query.trim().toLowerCase()
  const results = surahs
    .filter(surah => {
      if (show_only_disputed && surah.disputed_points === 0) {
        return false
      }

      if (!normalized_query) {
        return true
      }

      const haystack = [String(surah.surah), surah.name_en, surah.name_ar].join(' ').toLowerCase()
      return haystack.includes(normalized_query)
    })
    .slice()

  if (sort_mode === 'disputed') {
    results.sort((left, right) => right.disputed_points - left.disputed_points || left.surah - right.surah)
  } else if (sort_mode === 'internal') {
    results.sort((left, right) => right.by_kind.internal - left.by_kind.internal || left.surah - right.surah)
  } else if (sort_mode === 'end') {
    results.sort((left, right) => right.by_kind.end - left.by_kind.end || left.surah - right.surah)
  } else {
    results.sort((left, right) => left.surah - right.surah)
  }

  return results
})

let disputed_surah_count = $derived(surahs.filter(surah => surah.disputed_points > 0).length)
let has_filters = $derived(query.trim().length > 0 || sort_mode !== 'canonical' || show_only_disputed)

function clear_filters() {
  query = ''
  sort_mode = 'canonical'
  show_only_disputed = false
}
</script>

<section>
  <div class="rule_label">Surah index</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h1 class="section_title">Browse surahs and jump straight into the viewer</h1>
      <p class="section_text mt-3">
        Open any surah to get its boundary matrix, evidence-backed detail panel, and the inline mushaf viewer on one page.
      </p>
    </div>
    <div class="stat_chip">{visible_surahs.length} surahs visible</div>
  </div>

  <div class="mt-4 flex flex-wrap gap-2 text-sm text-ink-soft">
    <span class="stat_chip">114 surahs</span>
    <span class="stat_chip">{disputed_surah_count} with disputed points</span>
    <span class="stat_chip">{summary.total_points} disputed points total</span>
  </div>
</section>

<section class="mt-8 surface p-4 sm:p-5">
  <div class="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(12rem,0.8fr)_auto] md:items-end">
    <label>
      <span class="metric_label">Search</span>
      <div class="relative mt-3">
        <SearchIcon class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-soft" />
        <input class="search pl-10" bind:value={query} placeholder="surah name or number" />
      </div>
    </label>

    <label>
      <span class="metric_label">Sort</span>
      <select class="select mt-3" bind:value={sort_mode}>
        <option value="canonical">Canonical order</option>
        <option value="disputed">Most disputed points</option>
        <option value="end">Most end boundaries</option>
        <option value="internal">Most internal breakpoints</option>
      </select>
    </label>

    <label class="flex items-center gap-3 rounded-2xl border border-line/70 bg-paper-soft/60 px-4 py-3 text-sm font-semibold text-ink-soft">
      <input bind:checked={show_only_disputed} type="checkbox" />
      <span>Only disputed surahs</span>
    </label>
  </div>

  {#if has_filters}
    <div class="mt-4">
      <button class="pill_button" onclick={clear_filters}>Reset surah filters</button>
    </div>
  {/if}
</section>

{#if visible_surahs.length === 0}
  <section class="mt-8 surface p-6 sm:p-8">
    <div class="rule_label">No matches</div>
    <h2 class="section_title mt-4">No surahs match the current filters.</h2>
    <p class="section_text mt-3">Try a different name, number, or reset the filters.</p>
    {#if has_filters}
      <div class="mt-6">
        <button class="pill_button" data-tone="accent" onclick={clear_filters}>Show all surahs</button>
      </div>
    {/if}
  </section>
{:else}
  <section class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {#each visible_surahs as surah (surah.surah)}
      <a class="surface block p-5 transition-transform duration-200 hover:-translate-y-0.5" href={app_href('/surahs/' + surah.surah)}>
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="metric_label">Surah {surah.surah}</div>
            <div class="mt-3 text-2xl font-bold text-ink">{surah.name_en}</div>
            <div class="arabic_title mt-2 text-xl text-ink-soft">{surah.name_ar}</div>
          </div>
          <span class="badge" data-tone={surah.disputed_points === 0 ? 'ok' : 'accent'}>
            {surah.disputed_points}
          </span>
        </div>

        <div class="mt-5 flex flex-wrap gap-2 text-xs">
          <span class="badge" data-tone="ok">{surah.by_kind.end} end</span>
          <span class="badge" data-tone="accent">{surah.by_kind.internal} internal</span>
          <span class="badge" data-tone="warn">Kufi {surah.counts.kufi}</span>
        </div>

        <div class="mt-5 flex items-center gap-2 font-bold text-accent-strong">
          <span>Open surah profile</span>
          <ArrowRightIcon class="size-4" />
        </div>
      </a>
    {/each}
  </section>
{/if}
