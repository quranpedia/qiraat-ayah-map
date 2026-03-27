<script>
import PlotFrame from './PlotFrame.svelte'

let { cells, systems } = $props()

const system_names = $derived(systems.map(system => system.name_en))

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
      Plot.cell(cells, {
        x: 'left_name',
        y: 'right_name',
        fill: 'differing_points',
        inset: 1,
        title: d => `${d.left_name} ↔ ${d.right_name} · ${d.differing_points} differing points`
      }),
      Plot.text(cells, {
        x: 'left_name',
        y: 'right_name',
        text: d => String(d.differing_points),
        fill: d => text_fill_for(d.difference_ratio),
        fontSize: 12,
        fontWeight: 700
      })
    ]
  })
}
</script>

<PlotFrame {build_plot} watch={cells} aria_label="Pairwise disagreement matrix between counting systems" />
