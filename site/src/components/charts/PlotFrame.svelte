<script>
import * as Plot from '@observablehq/plot'
import { onMount } from 'svelte'


let { build_plot, aria_label = 'مخطط', watch = null } = $props()

let container
let resize_observer = null
let active_plot = null

function render_plot() {
  if (!container) {
    return
  }

  const width = Math.max(container.clientWidth, 320)
  const next_plot = build_plot({ Plot, width })

  active_plot?.remove()
  active_plot = next_plot
  container.replaceChildren(next_plot)

  // Observable Plot can emit aria-label on decorative <g> rule groups, which is invalid.
  for (const node of container.querySelectorAll('g[aria-label="rule"]')) {
    node.removeAttribute('aria-label')
  }
}

onMount(() => {
  render_plot()

  resize_observer = new ResizeObserver(() => {
    render_plot()
  })
  resize_observer.observe(container)

  return () => {
    resize_observer?.disconnect()
    active_plot?.remove()
  }
})

$effect(() => {
  build_plot
  watch

  if (container) {
    render_plot()
  }
})
</script>

<div class="plot_shell p-3 sm:p-4">
  <div bind:this={container} aria-label={aria_label}></div>
</div>
