<script>
import { compact_number, format_boundary_kind, format_surah_reference } from '$lib/dataset.svelte.js'

import PlotFrame from './PlotFrame.svelte'

let { surahs } = $props()

let cells = $derived(
  surahs.flatMap(surah => [
    { surah: surah.surah, kind: 'end', count: surah.by_kind.end },
    { surah: surah.surah, kind: 'internal', count: surah.by_kind.internal }
  ])
)

function build_plot({ Plot, width }) {
  return Plot.plot({
    width,
    height: 260,
    marginTop: 10,
    marginRight: 16,
    marginBottom: 40,
    marginLeft: 70,
    style: {
      background: 'transparent',
      color: 'var(--ink)'
    },
    color: {
      type: 'linear',
      range: ['#f7efe1', '#3f7059']
    },
    x: {
      label: 'السورة',
      ticks: 12
    },
    y: {
      label: null,
      domain: ['end', 'internal']
    },
    marks: [
      Plot.cell(cells, {
        x: 'surah',
        y: 'kind',
        fill: 'count',
        inset: 0.7,
        title: d => `${format_surah_reference(d.surah)} · ${format_boundary_kind(d.kind)} مختلفة: ${compact_number(d.count)}`
      }),
      Plot.text(cells, {
        x: 'surah',
        y: 'kind',
        text: d => (d.count > 0 ? compact_number(d.count) : ''),
        fontSize: 10,
        fill: d => (d.count > 3 ? 'white' : 'var(--ink)')
      })
    ]
  })
}
</script>

<PlotFrame {build_plot} watch={surahs} aria_label="خريطة حرارية لمواضع الخلاف حسب السورة والنوع" />
