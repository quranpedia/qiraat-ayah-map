<script>
import { ArrowRightIcon, BookOpenCheckIcon, FilesIcon, MilestoneIcon } from '@lucide/svelte'

import PlotSystemDistanceMatrix from '~/components/charts/PlotSystemDistanceMatrix.svelte'
import PlotSystemVerificationBars from '~/components/charts/PlotSystemVerificationBars.svelte'
import SystemReviewWorkload from '~/components/charts/SystemReviewWorkload.svelte'
import { compact_number, get_system_name, review_queue, summary, system_distance_matrix, system_relationships, systems } from '$lib/dataset.svelte.js'
import { app_href } from '$lib/nav.js'

let relationship_rows = $derived.by(() =>
  systems.map(system => {
    const relationships = system_relationships[system.id]

    return {
      system,
      nearest_system_name: get_system_name(relationships?.nearest?.right_system_id),
      nearest_distance: relationships?.nearest?.differing_points ?? 0,
      farthest_system_name: get_system_name(relationships?.farthest?.right_system_id),
      farthest_distance: relationships?.farthest?.differing_points ?? 0
    }
  })
)
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start">
  <div>
    <div class="rule_label">Comparison and review planning</div>
    <h1 class="display_title mt-5 text-ink">Compare systems, size the backlog, and choose the next scholarly pass.</h1>
    <p class="section_text mt-5 text-lg">
      This view answers the practical project questions: which systems are closest, which ones are easiest to review fully, and how much of the
      current counted corpus is still uncited.
    </p>
    <div class="mt-6 flex flex-wrap gap-2 text-sm text-ink-soft">
      <span class="stat_chip">{compact_number(summary.total_points)} disputed points</span>
      <span class="stat_chip">{compact_number(summary.evidence.points_with_primary_evidence)} with primary evidence</span>
      <span class="stat_chip">{compact_number(summary.evidence.points_uncited)} still uncited</span>
    </div>
  </div>

  <div class="surface surface_muted p-5">
    <div class="metric_label">Current signal</div>
    <div class="mt-4 space-y-4 text-sm text-ink-soft">
      <p>
        The matrix below measures pairwise disagreement across the disputed corpus, while the workload chart ranks systems by uncited counted points.
      </p>
      <a class="pill_button w-full" href={app_href('/explorer')}>
        Inspect the cited points
        <ArrowRightIcon class="size-4" />
      </a>
    </div>
  </div>
</section>

<section class="mt-12 surface p-5 sm:p-6">
  <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <div class="rule_label">System distance</div>
      <h2 class="section_title mt-4">How far apart the counting systems are at the disputed points</h2>
      <p class="section_text mt-3 text-sm">
        Each cell shows how many of the disputed boundary points the two systems treat differently. This is the fastest way to see family likeness and isolation.
      </p>
    </div>
    <FilesIcon class="hidden size-10 text-accent-strong sm:block" />
  </div>
  <div class="mt-6">
    <PlotSystemDistanceMatrix cells={system_distance_matrix} {systems} />
  </div>
</section>

<section class="mt-12 grid gap-6 xl:grid-cols-2">
  <div class="surface p-5 sm:p-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="rule_label">Verification coverage</div>
        <h2 class="section_title mt-4">Which counted corpora have begun to accumulate evidence</h2>
        <p class="section_text mt-3 text-sm">
          Bars are restricted to the disputed heads each system actually counts, so the chart reflects real review workload rather than the whole shared matrix.
        </p>
      </div>
      <BookOpenCheckIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>
    <div class="mt-6">
      <PlotSystemVerificationBars />
    </div>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="rule_label">Campaign sizing</div>
        <h2 class="section_title mt-4">Smallest remaining full-pass systems</h2>
        <p class="section_text mt-3 text-sm">
          This rank uses uncited counted points, so it highlights which system can reach a complete evidence pass with the least remaining transcription work.
        </p>
      </div>
      <MilestoneIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>
    <div class="mt-6">
      <SystemReviewWorkload queue={review_queue} />
    </div>
    <div class="mt-6 grid gap-3 sm:grid-cols-3">
      {#each review_queue.slice(0, 3) as entry (entry.system_id)}
        <div class="surface surface_muted p-4">
          <div class="metric_label">{entry.system_id}</div>
          <div class="mt-3 text-xl font-bold text-ink">{entry.name_en}</div>
          <div class="mt-2 text-sm text-ink-soft">{entry.uncited_points} uncited counted points</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="mt-12 surface p-5 sm:p-6">
  <div class="rule_label">Nearest and farthest neighbors</div>
  <h2 class="section_title mt-4">The quickest way to compare similarity at a glance</h2>
  <div class="table_shell mt-6">
    <table class="data_table">
      <thead>
        <tr>
          <th>System</th>
          <th>Nearest</th>
          <th>Distance</th>
          <th>Farthest</th>
          <th>Distance</th>
        </tr>
      </thead>
      <tbody>
        {#each relationship_rows as row (row.system.id)}
          <tr>
            <td>
              <div class="font-bold text-ink">{row.system.name_en}</div>
              <div class="arabic_title text-base text-ink-soft">{row.system.name_ar}</div>
            </td>
            <td>{row.nearest_system_name}</td>
            <td><span class="badge" data-tone="ok">{row.nearest_distance}</span></td>
            <td>{row.farthest_system_name}</td>
            <td><span class="badge" data-tone="warn">{row.farthest_distance}</span></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
