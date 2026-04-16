<script>
import { compact_number, get_system_name } from '$lib/dataset.svelte.js'
import { format_difference_count } from '$lib/format.js'

import PlotFrame from './PlotFrame.svelte'

let { cells, systems } = $props()

const localized_cells = $derived.by(() =>
  cells.map(cell => ({
    ...cell,
    left_name: get_system_name(cell.left_system_id),
    right_name: get_system_name(cell.right_system_id)
  }))
)

const system_names = $derived(systems.map(system => get_system_name(system)))

function text_fill_for(difference_ratio) {
  return difference_ratio > 0.52 ? 'white' : 'var(--ink)'
}

function build_plot({ Plot, width }) {
  return Plot.plot({
    width,
    height: Math.max(320, systems.length * 68),
    marginTop: 12,
    marginRight: 16,
    marginBottom: 70,
    marginLeft: 122,
    style: {
      background: 'transparent',
      color: 'var(--ink)'
    },
    color: {
      type: 'linear',
      range: ['#f7efe1', '#cfe3d8', '#3f7059']
    },
    x: {
      label: null,
      domain: system_names,
      tickRotate: -28
    },
    y: {
      label: null,
      domain: system_names
    },
    marks: [
      Plot.cell(localized_cells, {
        x: 'left_name',
        y: 'right_name',
        fill: 'differing_points',
        inset: 1,
        title: d => `${d.left_name} ↔ ${d.right_name} · ${format_difference_count(d.differing_points, 'موضع مختلف', 'مواضع مختلفة')}`
      }),
      Plot.text(localized_cells, {
        x: 'left_name',
        y: 'right_name',
        text: d => compact_number(d.differing_points),
        fill: d => text_fill_for(d.difference_ratio),
        fontSize: 12,
        fontWeight: 700
      })
    ]
  })
}
</script>

<PlotFrame {build_plot} watch={localized_cells} aria_label="مصفوفة التباين بين أنظمة العد" />
