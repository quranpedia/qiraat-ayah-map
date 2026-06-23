<script>
import { ArrowRightIcon, BookOpenTextIcon } from '@lucide/svelte'

import { compact_number, get_system_name } from '$lib/dataset.svelte.js'
import { getBoundaryHash } from '$lib/mushaf-viewer-dom.js'
import { get_current_language } from '$lib/i18n.js'
import { getMadhhabHref } from '$lib/route-urls.js'

let { row, madhhabId = 'kufi' } = $props()
let current_language = $derived(get_current_language())
let selected_madhhab_name = $derived(get_system_name(madhhabId))
let selected_madhhab_counts = $derived(row?.systems?.[madhhabId]?.counts_boundary ?? false)

function join_system_names(list) {
  const separator = current_language === 'en' ? ', ' : '، '
  return list.map(get_system_name).join(separator)
}

function get_mushaf_href(row) {
  return getMadhhabHref(window.navgo.href('/surahs/' + row.surah), madhhabId, getBoundaryHash(row.anchor_key))
}
</script>

{#if row}
  <aside class="surface p-5 sm:p-6">
    <div class="rule_label">تفصيل رأس الآية</div>
    <h3 class="mt-3 text-2xl font-bold text-ink">{row.location_label}</h3>
    <p class="arabic_title mt-2 text-2xl text-ink">الفاصلة: {row.word}</p>

    <p class="section_text mt-5 text-sm">
      في {selected_madhhab_name}: {selected_madhhab_counts ? 'يعده رأس آية' : 'لا يعده رأس آية'}.
    </p>

    <div class="mt-5 space-y-3 text-sm text-ink-soft">
      <p><span class="font-bold text-ink">يعده:</span> {row.counted_by.length > 0 ? join_system_names(row.counted_by) : 'لا أحد'}.</p>
      <p><span class="font-bold text-ink">لا يعده:</span> {row.omitted_by.length > 0 ? join_system_names(row.omitted_by) : 'لا أحد'}.</p>
    </div>

    {#if row.evidence.length > 0}
      <details class="mt-5 border-t border-line/70 pt-4">
        <summary class="flex cursor-pointer items-center gap-2 text-sm font-bold text-ink">
          <BookOpenTextIcon class="size-4" />
          الشواهد ({compact_number(row.evidence.length)})
        </summary>

        <div class="mt-4 space-y-4 text-sm text-ink-soft">
          {#each row.evidence as item, index (`${row.anchor_key}-${index}`)}
            <div>
              <div class="font-bold text-ink">{item.work}</div>
              <div class="mt-1">{item.locator}</div>
              {#if item.supports.length > 0}
                <div class="mt-1">يسند: {join_system_names(item.supports)}</div>
              {/if}
              {#if item.edition}
                <div class="mt-1 text-xs">الطبعة: {item.edition}</div>
              {/if}
            </div>
          {/each}
        </div>
      </details>
    {/if}

    <a class="pill_button mt-5 w-full" href={get_mushaf_href(row)}>
      افتح هذا الرأس في المصحف
      <ArrowRightIcon class="size-4" />
    </a>
  </aside>
{/if}
