<script>
import { compact_number, format_verification_status, get_system_name, review_status_order, systems, verification_profiles } from '$lib/dataset.svelte.js'

import PlotFrame from './PlotFrame.svelte'

const status_colors = {
  uncited: 'var(--warn)',
  secondary_only: 'var(--alert)',
  primary_cited: 'var(--accent-strong)',
  primary_cited_and_reviewed: 'var(--ok)',
  disputed: 'var(--alert)',
  unresolved: 'var(--ink-soft)'
}

let stacked_rows = $derived.by(() =>
  systems.flatMap(system =>
    review_status_order
      .filter(status => (verification_profiles[system.id]?.by_status?.[status] || 0) > 0)
      .map(status => ({
        system_name: get_system_name(system),
        status,
        count: verification_profiles[system.id].by_status[status]
      }))
  )
)

let total_rows = $derived.by(() =>
  systems.map(system => ({
    system_name: get_system_name(system),
    total_points: verification_profiles[system.id].total_points
  }))
)

function build_plot({ Plot, width }) {
  return Plot.plot({
    width,
    height: Math.max(320, systems.length * 60),
    marginTop: 16,
    marginRight: 52,
    marginBottom: 28,
    marginLeft: 112,
    style: {
      background: 'transparent',
      color: 'var(--ink)'
    },
    color: {
      domain: review_status_order,
      range: review_status_order.map(status => status_colors[status])
    },
    x: {
      grid: true,
      label: 'الرؤوس المختلف فيها التي يعدها النظام'
    },
    y: {
      label: null,
      domain: systems.map(system => get_system_name(system))
    },
    marks: [
      Plot.ruleX([0], { stroke: 'var(--line)' }),
      Plot.barX(stacked_rows, {
        x: 'count',
        y: 'system_name',
        fill: 'status',
        title: d => `${d.system_name} · ${format_verification_status(d.status)}: ${compact_number(d.count)}`
      }),
      Plot.text(total_rows, {
        x: 'total_points',
        y: 'system_name',
        dx: 12,
        text: d => compact_number(d.total_points),
        fontSize: 11,
        fill: 'var(--ink)'
      })
    ]
  })
}
</script>

<PlotFrame {build_plot} watch={stacked_rows} aria_label="حالة التوثيق في الرؤوس المختلف فيها التي يعدها كل نظام" />
