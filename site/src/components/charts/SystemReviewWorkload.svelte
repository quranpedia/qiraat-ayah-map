<script>
import { BarChart, defaultChartPadding } from 'layerchart'

let { queue } = $props()

let chart_rows = $derived.by(() =>
  queue.map(entry => ({
    ...entry,
    system_label: `${entry.name_en}`
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
      No review workload is available.
    </div>
  {/if}
</div>
