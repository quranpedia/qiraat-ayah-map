<script>
import { BarChart, defaultChartPadding } from 'layerchart'

import { get_system_name } from '$lib/dataset.svelte.js'

let { queue } = $props()

let chart_rows = $derived.by(() =>
  queue.map(entry => ({
    ...entry,
    system_label: get_system_name(entry)
  }))
)

let chart_height = $derived(Math.max(280, chart_rows.length * 42 + 28))
</script>

<div class="plot_shell p-3 sm:p-4">
  {#if chart_rows.length > 0}
    <BarChart
      data={chart_rows}
      x="uncited_points"
      y="system_label"
      orientation="horizontal"
      cRange={['var(--accent-strong)']}
      padding={defaultChartPadding({ left: 118, right: 18 })}
      height={chart_height}
    />
  {:else}
    <div class="flex h-56 items-center justify-center text-sm text-ink-soft">
      لا يوجد عبء مراجعة معروض حاليًا.
    </div>
  {/if}
</div>
