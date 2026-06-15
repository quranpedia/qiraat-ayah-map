<script>
import { ArrowRightIcon, SearchIcon } from '@lucide/svelte'

import {
  compact_number,
  format_surah_reference,
  get_surah_name,
  get_surah_secondary_name,
  get_system_name,
  get_system_secondary_name,
  summary,
  surahs,
  systems
} from '$lib/dataset.svelte.js'
import { getMadhhabHref, replaceMadhhabQuery } from '$lib/route-urls.js'

let { route_query = {} } = $props()

let route_system_id = $derived(systems.some(system => system.id === route_query.madhhab) ? route_query.madhhab : 'kufi')

let query = $state('')
let selected_system_id = $state(route_system_id)
let show_only_disputed = $state(false)

let selected_system = $derived(systems.find(system => system.id === selected_system_id) || systems[0] || null)
let visible_surahs = $derived.by(() => {
  const normalized_query = query.trim().toLowerCase()

  return surahs
    .filter(surah => {
      if (show_only_disputed && surah.disputed_points === 0) {
        return false
      }

      if (!normalized_query) {
        return true
      }

      const haystack = [String(surah.surah), surah.name_en, surah.name_ar].join(' ').toLowerCase()
      return haystack.includes(normalized_query)
    })
    .sort((left, right) => left.surah - right.surah)
})

let disputed_surah_count = $derived(surahs.filter(surah => surah.disputed_points > 0).length)
let has_filters = $derived(query.trim().length > 0 || selected_system_id !== 'kufi' || show_only_disputed)

$effect(() => {
  selected_system_id = route_system_id
})

$effect(() => {
  replaceMadhhabQuery(selected_system_id)
})

function clear_filters() {
  query = ''
  selected_system_id = 'kufi'
  show_only_disputed = false
}

function get_mushaf_href(surah) {
  return getMadhhabHref(window.navgo.href('/surahs/' + surah.surah), selected_system_id, '#surah-mushaf-viewer')
}
</script>

<section class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start">
  <div>
    <div class="rule_label">المصحف</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">اقرأ السورة بحسب مذهب العدّ المختار.</h1>
    <p class="section_text mt-5 text-lg">
      اختر مذهب العدّ أولًا، ثم افتح السورة ليعرض عارض المصحف ترقيم الآيات بحسب ذلك المذهب مع رؤوس الآي المختلف فيها داخل النص.
    </p>
    <div class="mt-6 flex flex-wrap gap-2 text-sm text-ink-soft">
      <span class="stat_chip">{compact_number(systems.length)} مذاهب العدّ</span>
      <span class="stat_chip">{compact_number(summary.total_points)} رأس آية مختلف فيه</span>
      <span class="stat_chip">{compact_number(disputed_surah_count)} سورة فيها خلاف</span>
    </div>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="metric_label">مذهب العدّ المختار</div>
    {#if selected_system}
      <div class="mt-4 text-2xl font-bold text-ink">{get_system_name(selected_system)}</div>
      {#if get_system_secondary_name(selected_system)}
        <div class="mt-2 text-base text-ink-soft">{get_system_secondary_name(selected_system)}</div>
      {/if}
      <p class="mt-4 text-sm text-ink-soft">
        ستفتح كل سورة أدناه بهذا الاختيار، ويمكن تغييره داخل عارض المصحف أيضًا.
      </p>
    {/if}
  </div>
</section>

<section class="mt-10 surface p-4 sm:p-5">
  <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.6fr)_auto] lg:items-end">
    <label>
      <span class="metric_label">اختر سورة</span>
      <div class="relative mt-3">
        <SearchIcon class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-soft" />
        <input class="search pl-10" bind:value={query} placeholder="ابحث عن اسم السورة أو رقمها" />
      </div>
    </label>

    <label>
      <span class="metric_label">مذهب العدّ</span>
      <select class="select mt-3" bind:value={selected_system_id}>
        {#each systems as system (system.id)}
          <option value={system.id}>{get_system_name(system)}</option>
        {/each}
      </select>
    </label>

    <label class="flex items-center gap-3 rounded-2xl border border-line/70 bg-paper-soft/60 px-4 py-3 text-sm font-semibold text-ink-soft">
      <input bind:checked={show_only_disputed} type="checkbox" />
      <span>ذات رؤوس آي مختلف فيها فقط</span>
    </label>
  </div>

  {#if has_filters}
    <div class="mt-4">
      <button class="pill_button" onclick={clear_filters}>أعد الضبط</button>
    </div>
  {/if}
</section>

{#if visible_surahs.length === 0}
  <section class="mt-8 surface p-6 sm:p-8">
    <div class="rule_label">لا نتائج</div>
    <h2 class="section_title mt-4">لا توجد سورة تطابق هذه المرشحات.</h2>
    <p class="section_text mt-3">جرّب اسمًا آخر أو أعد الضبط.</p>
    {#if has_filters}
      <div class="mt-6">
        <button class="pill_button" data-tone="accent" onclick={clear_filters}>أظهر جميع السور</button>
      </div>
    {/if}
  </section>
{:else}
  <section class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {#each visible_surahs as surah (surah.surah)}
      <a class="surface block p-5 transition-transform duration-200 hover:-translate-y-0.5" href={get_mushaf_href(surah)}>
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="metric_label">{format_surah_reference(surah.surah)}</div>
            <div class="mt-3 text-2xl font-bold text-ink">{get_surah_name(surah)}</div>
            {#if get_surah_secondary_name(surah)}
              <div class="mt-2 text-xl text-ink-soft">{get_surah_secondary_name(surah)}</div>
            {/if}
          </div>
          <span class="badge" data-tone={surah.disputed_points === 0 ? 'ok' : 'accent'}>
            {compact_number(surah.disputed_points)} رأس آية
          </span>
        </div>

        <div class="mt-5 flex flex-wrap gap-2 text-xs">
          <span class="badge" data-tone="ok">{compact_number(surah.counts[selected_system_id])} آية في {get_system_name(selected_system)}</span>
        </div>

        <div class="mt-5 flex items-center gap-2 font-bold text-accent-strong">
          <span>افتح في عارض المصحف</span>
          <ArrowRightIcon class="size-4" />
        </div>
      </a>
    {/each}
  </section>
{/if}
