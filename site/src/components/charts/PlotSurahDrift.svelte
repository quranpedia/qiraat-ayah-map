<script>
import { compact_number, format_numbering_effect } from '$lib/dataset.svelte.js'

import PlotFrame from './PlotFrame.svelte'

let { points, system_name, surah_label } = $props()

function stroke_for(effect) {
  if (effect === 'split') return 'var(--accent-strong)'
  if (effect === 'merge') return 'var(--alert)'
  return 'var(--panel-strong)'
}

function build_plot({ Plot, width }) {
  return Plot.plot({
    width,
    height: 280,
    marginTop: 12,
    marginRight: 20,
    marginBottom: 44,
    marginLeft: 56,
    style: {
      background: 'transparent',
      color: 'var(--ink)'
    },
    x: {
      label: 'موضع الخلاف في ترتيب القراءة'
    },
    y: {
      grid: true,
      label: 'التغير التراكمي عن الكوفي'
    },
    marks: [
      Plot.ruleY([0], { stroke: 'var(--line)' }),
      Plot.line(points, {
        x: 'step',
        y: 'cumulative_delta',
        curve: 'step-after',
        stroke: 'var(--accent-strong)',
        strokeWidth: 2,
        title: d => `${system_name} · ${surah_label} · الموضع ${d.slot_label} · ${d.location_label} · ${d.word || 'البداية'} · التراكم ${d.cumulative_delta > 0 ? '+' : ''}${compact_number(d.cumulative_delta)}`
      }),
      Plot.dot(points.filter(point => point.step > 0), {
        x: 'step',
        y: 'cumulative_delta',
        r: 4,
        fill: d => stroke_for(d.numbering_effect),
        title: d => `${d.location_label} · ${d.word} · ${format_numbering_effect(d.numbering_effect)} · التراكم ${d.cumulative_delta > 0 ? '+' : ''}${compact_number(d.cumulative_delta)}`
      })
    ]
  })
}
</script>

<PlotFrame {build_plot} watch={points} aria_label="انجراف الترقيم التراكمي داخل السورة المختارة" />
