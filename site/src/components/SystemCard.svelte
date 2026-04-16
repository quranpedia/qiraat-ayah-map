<script>
import { ArrowRightIcon } from '@lucide/svelte'

import { compact_number, format_signed_delta, get_system_name, get_system_secondary_name } from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'

let { system } = $props()
let current_language = $derived(get_current_language())
</script>

<a class="surface block p-5 transition-transform duration-200 hover:-translate-y-0.5" href={window.navgo.href('/systems/' + system.id)}>
  <div class="flex items-start justify-between gap-4">
    <div>
      <div class="rule_label">{get_system_name(system)}</div>
      <h3 class="mt-3 text-2xl font-bold text-ink">{compact_number(system.total_ayahs)}</h3>
      {#if current_language !== 'en' && get_system_secondary_name(system)}
        <p class="mt-1 text-lg text-ink-soft">{get_system_secondary_name(system)}</p>
      {/if}
    </div>
    <span class="badge" data-tone={system.delta_from_kufi === 0 ? 'ok' : 'warn'}>
      {format_signed_delta(system.delta_from_kufi)}
    </span>
  </div>

  <div class="mt-5 grid grid-cols-2 gap-3 text-sm text-ink-soft">
    <div>
      <div class="font-bold text-ink">{compact_number(system.counts_boundary)}</div>
      <div>رؤوس مختلف فيها</div>
    </div>
    <div>
      <div class="font-bold text-ink">{compact_number(system.split_effects)}</div>
      <div>آثار التفريق</div>
    </div>
  </div>

  <div class="mt-5 flex items-center gap-2 font-bold text-accent-strong">
    <span>افتح ملف النظام</span>
    <ArrowRightIcon class="size-4" />
  </div>
</a>
