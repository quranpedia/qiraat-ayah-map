<script>
import PlotFrame from './PlotFrame.svelte'

let { systems } = $props()

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
      label: 'Total ayahs'
    },
    marks: [
      Plot.ruleY([0], { stroke: 'var(--line)' }),
      Plot.barY(systems, {
        x: 'name_en',
        y: 'total_ayahs',
        fill: 'var(--accent-strong)',
        title: d => `${d.name_en}: ${d.total_ayahs.toLocaleString()} ayahs`
      }),
      Plot.text(systems, {
        x: 'name_en',
        y: 'total_ayahs',
        dy: -8,
        text: d => d.total_ayahs.toLocaleString(),
        fontSize: 11,
        fill: 'var(--ink)'
      })
    ]
  })
}
</script>

<PlotFrame {build_plot} watch={systems} aria_label="Total ayah count by counting system" />
