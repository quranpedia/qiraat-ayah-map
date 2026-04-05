<script>
import { format_boundary_decision, format_numbering_effect, get_system_name } from '$lib/dataset.svelte.js'

import PlotFrame from './PlotFrame.svelte'

let { rows, systems } = $props()

let system_names = $derived(systems.map(system => get_system_name(system)))
let slot_labels = $derived(rows.map(row => row.ayah_slot_label))
let points = $derived.by(() =>
  rows.flatMap(row =>
    systems.map(system => ({
      slot_label: row.ayah_slot_label,
      location_label: row.location_label,
      word: row.word,
      system: get_system_name(system),
      counts_boundary: row.systems[system.id].counts_boundary,
      numbering_effect: row.systems[system.id].numbering_effect,
      symbol:
        row.systems[system.id].numbering_effect === 'split'
          ? '+'
          : row.systems[system.id].numbering_effect === 'merge'
            ? '−'
            : '='
    }))
  )
)

function fill_for(effect) {
  if (effect === 'split') return 'var(--accent-strong)'
  if (effect === 'merge') return 'var(--alert)'
  return 'var(--panel-strong)'
}

function text_fill_for(effect) {
  return effect === 'none' ? 'var(--ink)' : 'white'
}

function build_plot({ Plot, width }) {
  return Plot.plot({
    width,
    height: Math.max(230, systems.length * 42 + 78),
    marginTop: 14,
    marginRight: 16,
    marginBottom: 72,
    marginLeft: 96,
    style: {
      background: 'transparent',
      color: 'var(--ink)'
    },
    x: {
      label: 'موضع الخلاف في ترتيب القراءة',
      domain: slot_labels,
      tickRotate: -35
    },
    y: {
      label: null,
      domain: system_names
    },
    marks: [
      Plot.cell(points, {
        x: 'slot_label',
        y: 'system',
        fill: d => fill_for(d.numbering_effect),
        inset: 1,
        title: d => `${d.system} · ${d.location_label} · ${d.word} · ${format_boundary_decision(d.counts_boundary)} · ${format_numbering_effect(d.numbering_effect)}`
      }),
      Plot.text(points, {
        x: 'slot_label',
        y: 'system',
        text: 'symbol',
        fill: d => text_fill_for(d.numbering_effect),
        fontSize: 12,
        fontWeight: 700
      })
    ]
  })
}
</script>

<PlotFrame {build_plot} watch={points} aria_label="مصفوفة المواضع في السورة المختارة" />
