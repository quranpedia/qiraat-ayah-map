<script>
import { ArrowRightIcon } from '@lucide/svelte'

import { compact_number } from '$lib/dataset.svelte.js'
import { app_href } from '$lib/nav.js'

let { system } = $props()
</script>

<a class="surface block p-5 transition-transform duration-200 hover:-translate-y-0.5" href={app_href('/systems/' + system.id)}>
  <div class="flex items-start justify-between gap-4">
    <div>
      <div class="rule_label">{system.name_en}</div>
      <h3 class="mt-3 text-2xl font-bold text-ink">{compact_number(system.total_ayahs)}</h3>
      <p class="mt-1 arabic_title text-lg text-ink-soft">{system.name_ar}</p>
    </div>
    <span class="badge" data-tone={system.delta_from_kufi === 0 ? 'ok' : 'warn'}>
      {system.delta_from_kufi > 0 ? '+' : ''}{system.delta_from_kufi} vs kufi
    </span>
  </div>

  <div class="mt-5 grid grid-cols-2 gap-3 text-sm text-ink-soft">
    <div>
      <div class="font-bold text-ink">{system.counts_boundary}</div>
      <div>counts disputed heads</div>
    </div>
    <div>
      <div class="font-bold text-ink">{system.split_effects}</div>
      <div>split effects</div>
    </div>
  </div>

  <div class="mt-5 flex items-center gap-2 font-bold text-accent-strong">
    <span>Open system profile</span>
    <ArrowRightIcon class="size-4" />
  </div>
</a>
