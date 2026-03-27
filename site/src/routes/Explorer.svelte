<script>
import BoundaryDetail from '~/components/BoundaryDetail.svelte'
import {
  format_verification_status,
  get_system_name,
  get_verification_tone,
  review_status_order,
  rows,
  system_order
} from '$lib/dataset.svelte.js'
import { app_href } from '$lib/nav.js'

let search = $state('')
let system_filter = $state('all')
let kind_filter = $state('all')
let status_filter = $state('all')
let selected_key = $state(null)

function clear_filters() {
  search = ''
  system_filter = 'all'
  kind_filter = 'all'
  status_filter = 'all'
  selected_key = null
}

let filtered_rows = $derived.by(() => {
  const query = search.trim().toLowerCase()

  return rows.filter(row => {
    if (system_filter !== 'all' && !row.systems[system_filter].counts_boundary) {
      return false
    }

    if (kind_filter !== 'all' && row.kind !== kind_filter) {
      return false
    }

    if (status_filter !== 'all' && row.verification_status !== status_filter) {
      return false
    }

    if (!query) {
      return true
    }

    const haystack = [
      row.anchor_key,
      row.word,
      row.location_label,
      row.kind,
      row.verification_status,
      row.counted_by.join(' '),
      row.omitted_by.join(' '),
      row.supported_systems.join(' ')
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(query)
  })
})

let filtered_summary = $derived.by(() => {
  const by_kind = { end: 0, internal: 0 }
  const by_status = Object.fromEntries(review_status_order.map(status => [status, 0]))

  for (const row of filtered_rows) {
    by_kind[row.kind] += 1
    by_status[row.verification_status] += 1
  }

  return {
    by_kind,
    by_status
  }
})

let has_filters = $derived(
  search.trim().length > 0
  || system_filter !== 'all'
  || kind_filter !== 'all'
  || status_filter !== 'all'
)

let active_row = $derived(filtered_rows.find(row => row.anchor_key === selected_key) || filtered_rows[0] || null)
</script>

<section>
  <div class="rule_label">Explorer</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h1 class="section_title">Inspect the disputed boundary layer</h1>
      <p class="section_text mt-3">
        Filter the corpus by system, boundary kind, review status, or word anchor. The right-hand panel keeps the current point grounded in its numbering effect.
      </p>
    </div>
    <div class="stat_chip">{filtered_rows.length} rows visible</div>
  </div>

  <div class="mt-4 flex flex-wrap gap-2 text-sm text-ink-soft">
    <span class="stat_chip">{filtered_summary.by_kind.end} end</span>
    <span class="stat_chip">{filtered_summary.by_kind.internal} internal</span>
    {#each review_status_order as status (status)}
      {#if filtered_summary.by_status[status] > 0}
        <span class="stat_chip">{filtered_summary.by_status[status]} {format_verification_status(status)}</span>
      {/if}
    {/each}
  </div>
</section>

<section class="mt-8 split_layout">
  <div class="space-y-4">
    <div class="surface p-4 sm:p-5">
      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label>
          <span class="metric_label">Search</span>
          <input class="search mt-3" bind:value={search} placeholder="word, anchor key, or 2:219" />
        </label>

        <label>
          <span class="metric_label">System counts it</span>
          <select class="select mt-3" bind:value={system_filter}>
            <option value="all">All systems</option>
            {#each system_order as system_id}
              <option value={system_id}>{get_system_name(system_id)}</option>
            {/each}
          </select>
        </label>

        <label>
          <span class="metric_label">Boundary kind</span>
          <select class="select mt-3" bind:value={kind_filter}>
            <option value="all">All kinds</option>
            <option value="end">End</option>
            <option value="internal">Internal</option>
          </select>
        </label>

        <label>
          <span class="metric_label">Verification</span>
          <select class="select mt-3" bind:value={status_filter}>
            <option value="all">All statuses</option>
            {#each review_status_order as status (status)}
              <option value={status}>{format_verification_status(status)}</option>
            {/each}
          </select>
        </label>
      </div>

      {#if has_filters}
        <div class="mt-4">
          <button class="pill_button" onclick={clear_filters}>Clear filters</button>
        </div>
      {/if}
    </div>

    {#if filtered_rows.length === 0}
      <div class="surface p-6 sm:p-8">
        <div class="rule_label">No matches</div>
        <h2 class="section_title mt-4">No boundary points match the current filters.</h2>
        <p class="section_text mt-3">Clear one or more filters and try again.</p>
        {#if has_filters}
          <div class="mt-6">
            <button class="pill_button" data-tone="accent" onclick={clear_filters}>Reset explorer</button>
          </div>
        {/if}
      </div>
    {:else}
      <div class="table_shell">
        <table class="data_table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Anchor</th>
              <th>Kind</th>
              <th>Status</th>
              <th>Counted by</th>
            </tr>
          </thead>
          <tbody>
            {#each filtered_rows as row (row.anchor_key)}
              <tr data-active={row.anchor_key === active_row?.anchor_key ? 'true' : 'false'} onclick={() => (selected_key = row.anchor_key)}>
                <td>
                  <a class="font-bold text-ink underline decoration-line decoration-1 underline-offset-4" href={app_href('/surahs/' + row.surah)}>{row.location_label}</a>
                </td>
                <td>
                  <div class="arabic_title text-xl text-ink">{row.word}</div>
                  <div class="mt-2 text-xs text-ink-soft">{row.anchor_key}</div>
                </td>
                <td><span class="badge" data-tone={row.kind === 'internal' ? 'accent' : 'ok'}>{row.kind}</span></td>
                <td><span class="badge" data-tone={get_verification_tone(row.verification_status)}>{format_verification_status(row.verification_status)}</span></td>
                <td>
                  <div class="flex flex-wrap gap-2">
                    <span class="badge" data-tone="ok">{row.counted_by_count} / {system_order.length} count</span>
                    <span class="badge" data-tone="warn">{row.omitted_by_count} omit</span>
                  </div>
                  <div class="mt-2 text-xs text-ink-soft">{row.counted_by.map(get_system_name).join(', ')}</div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>

  <div>
    <BoundaryDetail row={active_row} />
  </div>
</section>
