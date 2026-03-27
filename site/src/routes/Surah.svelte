<script>
import BoundaryDetail from '~/components/BoundaryDetail.svelte'
import PlotSurahBoundaryMap from '~/components/charts/PlotSurahBoundaryMap.svelte'
import { format_verification_status, get_surah, get_surah_rows, get_system_name, get_verification_tone, systems } from '$lib/dataset.svelte.js'

let { surah } = $props()

let surah_info = $derived(get_surah(surah))
let surah_rows = $derived(get_surah_rows(surah))
let selected_key = $state(null)
let active_row = $derived(surah_rows.find(row => row.anchor_key === selected_key) || surah_rows[0] || null)
</script>

{#if !surah_info}
  <section class="surface p-6">
    <div class="rule_label">Surah not found</div>
    <h1 class="section_title mt-4">No surah matches “{surah}”.</h1>
  </section>
{:else}
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
              <tr data-active={row.anchor_key === active_row?.anchor_key ? 'true' : 'false'} onclick={() => (selected_key = row.anchor_key)}>
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

      <div>
        <BoundaryDetail row={active_row} />
      </div>
    </section>
  {/if}
{/if}
