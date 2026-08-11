<script>
import { ArrowRightIcon, SearchIcon } from '@lucide/svelte'

import {
  compact_number,
  format_surah_reference,
  get_surah_name,
  get_surah_secondary_name,
  get_system_name,
  surahs,
  systems
} from '$lib/dataset.svelte.js'
import { getMadhhabHref, replaceMadhhabQuery } from '$lib/route-urls.js'

let { route_query = {} } = $props()

let route_system_id = $derived(systems.some(system => system.id === route_query.madhhab) ? route_query.madhhab : 'kufi')
let query = $state('')
let selected_system_id = $state(route_system_id)

let selected_system = $derived(systems.find(system => system.id === selected_system_id) || systems[0] || null)
let normalized_query = $derived(query.trim().toLowerCase())
let visible_surahs = $derived.by(() => surahs.filter(surah => {
  if (!normalized_query) {
    return true
  }

  const haystack = [String(surah.surah), surah.name_en, surah.name_ar].join(' ').toLowerCase()
  return haystack.includes(normalized_query)
}))
let has_query = $derived(normalized_query.length > 0)

$effect(() => {
  selected_system_id = route_system_id
})

$effect(() => {
  replaceMadhhabQuery(selected_system_id)
})

function clear_query() {
  query = ''
}

function get_mushaf_href(surah) {
  return getMadhhabHref(window.navgo.href('/surahs/' + surah.surah), selected_system_id, '#surah-mushaf-viewer')
}
</script>

<section class="max-w-4xl">
  <div class="rule_label">المصحف</div>
  <h1 class="section_title mt-4">اختر مذهب العدّ ثم السورة</h1>
  <p class="section_text mt-4 text-lg">
    تُعرض رؤوس الآي المختلف فيها في مواضعها من النص.
  </p>
</section>

<section class="mt-8 surface p-4 sm:p-5" aria-label="اختيار القراءة">
  <div class="grid gap-4 md:grid-cols-[minmax(13rem,0.42fr)_minmax(0,1fr)] md:items-end">
    <label>
      <span class="field_label">مذهب العدّ</span>
      <select class="select mt-3" bind:value={selected_system_id}>
        {#each systems as system (system.id)}
          <option value={system.id}>{get_system_name(system)}</option>
        {/each}
      </select>
    </label>

    <label>
      <span class="field_label">السورة</span>
      <div class="relative mt-3">
        <SearchIcon class="pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-ink-soft" />
        <input class="search" data-icon="true" bind:value={query} placeholder="ابحث عن سورة" />
      </div>
    </label>
  </div>

  {#if selected_system}
    <p class="mt-4 text-sm text-ink-soft">
      تفتح السورة بترقيم {get_system_name(selected_system)}.
    </p>
  {/if}
</section>

<section class="mt-8">
  <div class="mb-3 flex flex-wrap items-baseline justify-between gap-3">
    <h2 class="text-lg font-bold text-ink">قائمة السور</h2>
    <div class="text-sm font-semibold text-ink-soft">{compact_number(visible_surahs.length)} من {compact_number(surahs.length)}</div>
  </div>

  {#if visible_surahs.length === 0}
    <div class="surface p-6 sm:p-8">
      <h2 class="section_title text-2xl">لا توجد سورة بهذا الاسم</h2>
      <p class="section_text mt-3">جرّب اسمًا آخر أو رقم سورة.</p>
      {#if has_query}
        <div class="mt-6">
          <button class="pill_button" data-tone="accent" onclick={clear_query}>أظهر جميع السور</button>
        </div>
      {/if}
    </div>
  {:else}
    <div class="surface overflow-hidden">
      {#each visible_surahs as surah (surah.surah)}
        <a class="group flex items-center justify-between gap-4 border-b border-line/70 px-4 py-3 last:border-b-0 hover:bg-paper-soft/70 sm:px-5" href={get_mushaf_href(surah)}>
          <div class="flex min-w-0 items-baseline gap-3">
            <span class="w-20 shrink-0 text-sm font-bold text-ink-soft sm:w-24">{format_surah_reference(surah.surah)}</span>
            <span class="truncate text-lg font-bold text-ink">{get_surah_name(surah)}</span>
            {#if get_surah_secondary_name(surah)}
              <span class="hidden truncate text-sm text-ink-soft sm:inline">{get_surah_secondary_name(surah)}</span>
            {/if}
          </div>

          <div class="flex shrink-0 items-center gap-3 text-sm font-semibold text-ink-soft">
            <span class="hidden sm:inline">{compact_number(surah.counts[selected_system_id])} آية في {get_system_name(selected_system)} · {compact_number(surah.disputed_points)} رأس آية مختلف فيه</span>
            <span class="text-accent-strong">اقرأ</span>
            <ArrowRightIcon class="arrow_nudge size-4 text-accent-strong" />
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>
