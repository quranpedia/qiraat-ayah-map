<script>
import { compact_number, format_difference_count, get_system_name } from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'

import PlotFrame from './PlotFrame.svelte'

let { systems } = $props()
const is_english = get_current_language() === 'en'

let chart_rows = $derived.by(() =>
  systems.map(system => ({
    ...system,
    display_name: get_system_name(system)
  }))
)

function build_plot({ Plot, width }) {
  return Plot.plot({
    width,
    height: 330,
    marginTop: 20,
    marginRight: 16,
    marginBottom: 56,
    marginLeft: 58,
    style: {
      background: 'transparent',
      color: 'var(--ink)'
    },
    x: {
      label: null,
      tickRotate: -28
    },
    y: {
      grid: true,
      label: is_english ? 'Total ayahs' : 'مجموع الآيات'
    },
    marks: [
      Plot.ruleY([0], { stroke: 'var(--line)' }),
      Plot.barY(chart_rows, {
        x: 'display_name',
        y: 'total_ayahs',
        fill: 'var(--accent-strong)',
        title: d => `${d.display_name}: ${format_difference_count(d.total_ayahs, 'آية', 'آيات')}`
      }),
      Plot.text(chart_rows, {
        x: 'display_name',
        y: 'total_ayahs',
        dy: -8,
        text: d => compact_number(d.total_ayahs),
        fontSize: 11,
        fill: 'var(--ink)'
      })
    ]
  })
}
</script>

<PlotFrame {build_plot} watch={chart_rows} aria_label="مجموع الآيات حسب نظام العد" />
