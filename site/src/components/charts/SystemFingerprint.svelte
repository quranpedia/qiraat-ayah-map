<script>
import { BarChart, defaultChartPadding } from 'layerchart'

import { format_surah_reference, get_surah, get_surah_name } from '$lib/dataset.svelte.js'

let { profile, limit = 12 } = $props()

let ranked_profile = $derived.by(() =>
  profile
    .filter(entry => entry.counted_points > 0 || entry.delta_from_kufi !== 0)
    .map(entry => {
      const surah = get_surah(entry.surah)
      return {
        ...entry,
        surah_label: `${format_surah_reference(entry.surah)} · ${get_surah_name(surah) || format_surah_reference(entry.surah)}`
      }
    })
    .sort(
      (left, right) =>
        right.counted_points - left.counted_points
        || Math.abs(right.delta_from_kufi) - Math.abs(left.delta_from_kufi)
        || left.surah - right.surah
    )
    .slice(0, limit)
)

let chart_height = $derived(Math.max(280, ranked_profile.length * 34 + 28))
</script>

<div class="plot_shell p-3 sm:p-4">
  {#if ranked_profile.length > 0}
    <BarChart
      data={ranked_profile}
      x="counted_points"
      y="surah_label"
      orientation="horizontal"
      cRange={['var(--accent-strong)']}
      padding={defaultChartPadding({ left: 112, right: 18 })}
      height={chart_height}
    />
  {:else}
    <div class="flex h-56 items-center justify-center text-sm text-ink-soft">
      لا توجد فروق على مستوى السور لهذا النظام.
    </div>
  {/if}
</div>
