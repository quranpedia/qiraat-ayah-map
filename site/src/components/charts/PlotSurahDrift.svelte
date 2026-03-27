<script>
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
      label: 'Disputed boundary slot in reading order'
    },
    y: {
      grid: true,
      label: 'Cumulative delta vs. Kufi'
    },
    marks: [
      Plot.ruleY([0], { stroke: 'var(--line)' }),
      Plot.line(points, {
        x: 'step',
        y: 'cumulative_delta',
        curve: 'step-after',
        stroke: 'var(--accent-strong)',
        strokeWidth: 2,
        title: d => `${system_name} · ${surah_label} · slot ${d.slot_label} · ${d.location_label} · ${d.word || 'start'} · cumulative ${d.cumulative_delta > 0 ? '+' : ''}${d.cumulative_delta}`
      }),
      Plot.dot(points.filter(point => point.step > 0), {
        x: 'step',
        y: 'cumulative_delta',
        r: 4,
        fill: d => stroke_for(d.numbering_effect),
        title: d => `${d.location_label} · ${d.word} · ${d.numbering_effect === 'none' ? 'same as Kufi' : d.numbering_effect} · cumulative ${d.cumulative_delta > 0 ? '+' : ''}${d.cumulative_delta}`
      })
    ]
  })
}
</script>

<PlotFrame {build_plot} watch={points} aria_label="Cumulative numbering drift within the selected surah" />
