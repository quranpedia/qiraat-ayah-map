<script>
import { ArrowRightIcon, BookOpenCheckIcon, FilesIcon, SigmaIcon } from '@lucide/svelte'

import MetricCard from '~/components/MetricCard.svelte'
import SystemCard from '~/components/SystemCard.svelte'
import PlotSurahHeatmap from '~/components/charts/PlotSurahHeatmap.svelte'
import PlotTotals from '~/components/charts/PlotTotals.svelte'
import SystemFingerprint from '~/components/charts/SystemFingerprint.svelte'
import { compact_number, get_system, get_system_profile, summary, surahs, systems } from '$lib/dataset.svelte.js'
import { app_href } from '$lib/nav.js'

let selected_system_id = $state('makki')
let selected_system = $derived(get_system(selected_system_id))
let selected_profile = $derived(get_system_profile(selected_system_id))
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-start">
  <div>
    <div class="rule_label">Canonical review layer</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">An editorial atlas for disputed Qurʾānic ayah boundaries.</h1>
    <p class="section_text mt-5 text-lg">
      The site turns the scholar-facing primitive layer into something you can scan, compare, and challenge: where a head is counted,
      where it is omitted, and how that decision changes numbering downstream.
    </p>
    <p class="arabic_title mt-5 max-w-3xl text-ink-soft">
      هذا العرض يجعل مواضع اختلاف رؤوس الآي قابلةً للمسح والمراجعة: أين يُعَدُّ الرأس، وأين يُترك، وما أثر ذلك على ترقيم الآيات.
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href={app_href('/explorer')}>
        Explore disputed points
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" href={app_href('/compare')}>Compare systems and workload</a>
    </div>

    <div class="mt-6 flex flex-wrap gap-2 text-sm text-ink-soft">
      <span class="stat_chip">{summary.by_kind.end} end points</span>
      <span class="stat_chip">{summary.by_kind.internal} internal points</span>
      <span class="stat_chip">{summary.evidence.points_with_primary_evidence} with primary evidence</span>
      <span class="stat_chip">{summary.evidence.points_uncited} uncited</span>
    </div>
  </div>

  <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
    <MetricCard label="Disputed points" value={compact_number(summary.total_points)} note="Every row is a scholar-reviewable boundary decision." />
    <MetricCard
      label="End / internal"
      value={`${compact_number(summary.by_kind.end)} · ${compact_number(summary.by_kind.internal)}`}
      note="The disputed corpus divides into verse-end heads and internal breakpoints."
      tone="ok"
    />
    <MetricCard
      label="Citation coverage"
      value={`${compact_number(summary.evidence.points_with_evidence)} / ${compact_number(summary.total_points)}`}
      note="Primary citations have started to land, but most of the counted corpus still needs evidence transcription."
      tone="alert"
    />
  </div>
</section>

<section class="mt-12 grid gap-4 lg:grid-cols-3">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">How to read it</div>
    <h2 class="section_title mt-4 text-2xl">End</h2>
    <p class="section_text mt-3 text-sm">
      A disputed boundary at the end of a Hafs ayah. Kufi counts it by definition, and omitting it merges numbering against Kufi.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">How to read it</div>
    <h2 class="section_title mt-4 text-2xl">Internal</h2>
    <p class="section_text mt-3 text-sm">
      A disputed boundary inside a Hafs ayah. Kufi omits it, and counting it splits numbering against Kufi.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">Chart symbols</div>
    <h2 class="section_title mt-4 text-2xl">+, −, =</h2>
    <p class="section_text mt-3 text-sm">
      Surah matrices use + when a system splits numbering, − when it merges numbering, and = when it agrees with Kufi at that point.
    </p>
  </div>
</section>

<section class="mt-14 grid gap-6 xl:grid-cols-2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">System totals</div>
    <div class="mt-4 flex items-end justify-between gap-4">
      <div>
        <h2 class="section_title">How the six counting systems settle the whole mushaf</h2>
        <p class="section_text mt-3 text-sm">
          Observable Plot handles the overview here: one clean totals view that lets the count traditions read like a compact reference table.
        </p>
      </div>
      <SigmaIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>
    <div class="mt-6">
      <PlotTotals {systems} />
    </div>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">Surah heatmap</div>
    <div class="mt-4 flex items-end justify-between gap-4">
      <div>
        <h2 class="section_title">Where the disputed corpus clusters</h2>
        <p class="section_text mt-3 text-sm">
          This chart counts disputed points by surah and kind. It shows density in the source layer, not the downstream effect of each system.
        </p>
      </div>
      <FilesIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>
    <div class="mt-6">
      <PlotSurahHeatmap {surahs} />
    </div>
  </div>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <div class="rule_label">System fingerprint</div>
      <h2 class="section_title mt-4">Where a system counts the most disputed heads</h2>
      <p class="section_text mt-3 text-sm">
        LayerChart is used here for an interactive ranked view: choose a counting system, then scan the surahs where its counted boundary profile is strongest.
      </p>
    </div>

    <label class="block lg:w-72">
      <span class="metric_label">Preview system</span>
      <select class="select mt-3" bind:value={selected_system_id}>
        {#each systems as system (system.id)}
          <option value={system.id}>{system.name_en}</option>
        {/each}
      </select>
    </label>
  </div>

  <div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:items-start">
    <SystemFingerprint profile={selected_profile} limit={10} />

    <div class="surface surface_muted p-5">
      <div class="rule_label">Current read</div>
      <h3 class="mt-3 text-2xl font-bold text-ink">{selected_system.name_en}</h3>
      <p class="arabic_title mt-2 text-xl text-ink-soft">{selected_system.name_ar}</p>
      <div class="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div class="font-bold text-ink">{selected_system.counts_boundary}</div>
          <div class="text-ink-soft">counted disputed heads</div>
        </div>
        <div>
          <div class="font-bold text-ink">{selected_system.merge_effects}</div>
          <div class="text-ink-soft">merge effects</div>
        </div>
      </div>
      <a class="pill_button mt-6 w-full" href={app_href('/systems/' + selected_system.id)}>
        Open full profile
        <ArrowRightIcon class="size-4" />
      </a>
    </div>
  </div>
</section>

<section class="mt-14">
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <div class="rule_label">Canonical systems</div>
      <h2 class="section_title mt-4">Jump into a count tradition</h2>
    </div>
    <div class="flex items-center gap-2 text-sm text-ink-soft">
      <BookOpenCheckIcon class="size-4" />
      <span>Every card opens a route backed by the generated review layer.</span>
    </div>
  </div>

  <div class="system_grid mt-6">
    {#each systems as system (system.id)}
      <SystemCard {system} />
    {/each}
  </div>
</section>
