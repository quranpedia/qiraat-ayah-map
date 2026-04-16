<script>
import { compact_number, format_numbering_effect } from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'

import PlotFrame from './PlotFrame.svelte'

let { points, system_name, surah_label } = $props()
const is_english = get_current_language() === 'en'

function stroke_for(effect) {
  if (effect === 'split') return 'var(--accent-strong)'
  if (effect === 'merge') return 'var(--alert)'
  return 'var(--panel-strong)'
}

function format_point_slot(point) {
  if (point.slot_label) {
    return is_english ? `Point ${point.slot_label}` : `الموضع ${point.slot_label}`
  }

  return is_english ? `Step ${compact_number(point.step)}` : `الخطوة ${compact_number(point.step)}`
}

function format_point_word(point) {
  return point.word || (is_english ? 'Start' : 'البداية')
}

function format_cumulative_delta(point) {
  const value = `${point.cumulative_delta > 0 ? '+' : ''}${compact_number(point.cumulative_delta)}`
  return is_english ? `Cumulative ${value}` : `التراكم ${value}`
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
        title: d => [system_name, surah_label, format_point_slot(d), d.location_label, format_point_word(d), format_cumulative_delta(d)].filter(Boolean).join(' · ')
      }),
      Plot.dot(points.filter(point => point.step > 0), {
        x: 'step',
        y: 'cumulative_delta',
        r: 4,
        fill: d => stroke_for(d.numbering_effect),
        title: d => [format_point_slot(d), d.location_label, format_point_word(d), format_numbering_effect(d.numbering_effect), format_cumulative_delta(d)].filter(Boolean).join(' · ')
      })
    ]
  })
}
</script>

<PlotFrame {build_plot} watch={points} aria_label="انجراف الترقيم التراكمي داخل السورة المختارة" />
