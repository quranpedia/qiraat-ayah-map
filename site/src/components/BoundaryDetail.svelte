<script>
import { ArrowRightIcon, BookOpenTextIcon } from '@lucide/svelte'

import { get_system_name } from '$lib/dataset.svelte.js'
import { getBoundaryHash } from '$lib/mushaf-viewer-dom.js'
import { get_current_language } from '$lib/i18n.js'
import { getMadhhabHref } from '$lib/route-urls.js'

let { row, madhhabId = 'kufi' } = $props()
let current_language = $derived(get_current_language())

function join_system_names(list) {
  const separator = current_language === 'en' ? ', ' : '، '
  return list.map(get_system_name).join(separator)
}

function get_mushaf_href(row) {
  return getMadhhabHref(window.navgo.href('/surahs/' + row.surah), madhhabId, getBoundaryHash(row.anchor_key))
}
</script>

{#if row}
  <div class="surface p-5 sm:p-6">
    <div>
      <div class="rule_label">تفصيل رأس الآية</div>
      <h3 class="mt-3 text-2xl font-bold text-ink">{row.location_label}</h3>
      <p class="arabic_title mt-2 text-2xl text-ink">الفاصلة: {row.word}</p>
      <div class="mt-3 flex flex-wrap gap-2 text-xs text-ink-soft">
        <span class="badge" data-tone={row.systems.kufi.counts_boundary ? 'ok' : 'warn'}>
          {row.systems.kufi.counts_boundary ? 'يعده حفص/الكوفي' : 'لا يعده حفص/الكوفي'}
        </span>
        <span class="badge">{row.anchor_key}</span>
      </div>
    </div>

    <p class="section_text mt-5 text-sm">
      يعده {row.counted_by.length > 0 ? join_system_names(row.counted_by) : 'لا أحد'}، ولا يعده {row.omitted_by.length > 0 ? join_system_names(row.omitted_by) : 'لا أحد'}.
    </p>

    <div class="mt-5 grid gap-4 lg:grid-cols-2">
      <div class="surface surface_muted p-4">
        <div class="metric_label">يعده رأس آية</div>
        <div class="mt-3 flex flex-wrap gap-2">
          {#each row.counted_by as system_id (system_id)}
            <span class="badge" data-tone="ok">{get_system_name(system_id)}</span>
          {/each}
        </div>
      </div>

      <div class="surface surface_muted p-4">
        <div class="metric_label">لا يعده رأس آية</div>
        <div class="mt-3 flex flex-wrap gap-2">
          {#each row.omitted_by as system_id (system_id)}
            <span class="badge" data-tone="warn">{get_system_name(system_id)}</span>
          {/each}
        </div>
      </div>
    </div>

    {#if row.evidence.length > 0}
      <div class="mt-5 surface surface_muted p-4">
        <div class="flex items-center gap-2 text-ink"><BookOpenTextIcon class="size-4" /> الشواهد</div>

        <div class="mt-4 space-y-3 text-sm text-ink-soft">
          {#each row.evidence as item, index (`${row.anchor_key}-${index}`)}
            <div class="rounded-3xl border border-line/70 bg-white/50 p-4">
              <div class="font-bold text-ink">{item.work}</div>
              <div class="mt-1 text-ink-soft">{item.locator}</div>
              {#if item.edition}
                <div class="mt-1 text-xs">الطبعة: {item.edition}</div>
              {/if}
              {#if item.supports.length > 0}
                <div class="mt-3 flex flex-wrap gap-2">
                  {#each item.supports as system_id (system_id)}
                    <span class="badge" data-tone="ok">{get_system_name(system_id)}</span>
                  {/each}
                </div>
              {/if}
              {#if item.note}
                <p class="mt-3 text-ink">{item.note}</p>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <a class="pill_button mt-5 w-full" href={get_mushaf_href(row)}>
      افتح هذا الرأس في المصحف
      <ArrowRightIcon class="size-4" />
    </a>
  </div>
{:else}
  <div class="surface p-5 text-sm text-ink-soft">اختر رأس آية لعرض قرار مذاهب العدّ فيه.</div>
{/if}
