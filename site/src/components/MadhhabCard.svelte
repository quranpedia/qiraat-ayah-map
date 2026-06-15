<script>
import { ArrowRightIcon } from '@lucide/svelte'

import { compact_number, get_system_name, get_system_secondary_name } from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'

let { madhhab } = $props()
let current_language = $derived(get_current_language())
</script>

<a class="surface block p-5 transition-transform duration-200 hover:-translate-y-0.5" href={window.navgo.href('/madhhabs/' + madhhab.id)}>
  <div>
    <div class="rule_label">مذهب عدّ</div>
    <h3 class="mt-3 text-2xl font-bold text-ink">{get_system_name(madhhab)}</h3>
    {#if current_language !== 'en' && get_system_secondary_name(madhhab)}
      <p class="mt-2 text-lg text-ink-soft">{get_system_secondary_name(madhhab)}</p>
    {/if}
  </div>

  <div class="mt-5 grid grid-cols-2 gap-3 text-sm text-ink-soft">
    <div>
      <div class="font-bold text-ink">{compact_number(madhhab.total_ayahs)}</div>
      <div>مجموع الآيات</div>
    </div>
    <div>
      <div class="font-bold text-ink">{compact_number(madhhab.used_by_qiraat.length)}</div>
      <div>القراءات المرتبطة</div>
    </div>
  </div>

  <div class="mt-5 flex items-center gap-2 font-bold text-accent-strong">
    <span>افتح ملف مذهب العدّ</span>
    <ArrowRightIcon class="size-4" />
  </div>
</a>
