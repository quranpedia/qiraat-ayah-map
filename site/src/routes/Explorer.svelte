<script>
import { ArrowRightIcon, SearchIcon } from '@lucide/svelte'

import BoundaryDetail from '~/components/BoundaryDetail.svelte'
import {
  compact_number,
  format_surah_reference,
  get_surah_name,
  get_system_name,
  rows,
  surahs,
  systems
} from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'
import { getBoundaryHash } from '$lib/mushaf-viewer-dom.js'
import { getMadhhabHref, replaceMadhhabQuery } from '$lib/route-urls.js'

const RESULT_LIMIT = 80

let { route_query = {} } = $props()

let route_system_id = $derived(systems.some(system => system.id === route_query.madhhab) ? route_query.madhhab : 'kufi')
let search = $state('')
let surah_filter = $state('all')
let selected_system_id = $state(route_system_id)
let boundary_filter = $state('all')
let selected_key = $state(null)
let current_language = $derived(get_current_language())

let selected_system = $derived(systems.find(system => system.id === selected_system_id) || systems[0] || null)
let normalized_query = $derived(search.trim().toLowerCase())
let has_search_criteria = $derived(Boolean(normalized_query || surah_filter !== 'all' || boundary_filter !== 'all'))

$effect(() => {
  selected_system_id = route_system_id
})

$effect(() => {
  replaceMadhhabQuery(selected_system_id)
})

function join_system_names(list) {
  const separator = current_language === 'en' ? ', ' : '، '
  return list.map(get_system_name).join(separator)
}

function clear_search() {
  search = ''
  surah_filter = 'all'
  boundary_filter = 'all'
  selected_key = null
}

function use_example(next) {
  search = next.search || ''
  surah_filter = next.surah || 'all'
  boundary_filter = next.boundary || 'all'
  selected_key = null
}

function counts_selected(row) {
  return row.systems[selected_system_id]?.counts_boundary ?? false
}

function matches_query(row) {
  if (!normalized_query) {
    return true
  }

  const surahName = get_surah_name(row.surah)
  const haystack = [
    row.word,
    row.location_label,
    format_surah_reference(row.surah),
    surahName,
    row.counted_by.map(get_system_name).join(' '),
    row.omitted_by.map(get_system_name).join(' ')
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(normalized_query)
}

let filtered_rows = $derived.by(() => rows.filter(row => {
  if (!has_search_criteria) {
    return false
  }

  if (surah_filter !== 'all' && row.surah !== Number(surah_filter)) {
    return false
  }

  const selectedCounts = counts_selected(row)

  if (boundary_filter === 'counted' && !selectedCounts) {
    return false
  }

  if (boundary_filter === 'not_counted' && selectedCounts) {
    return false
  }

  return matches_query(row)
}))


let selected_row = $derived(selected_key ? filtered_rows.find(row => row.anchor_key === selected_key) || null : null)
let visible_rows = $derived(has_search_criteria ? filtered_rows.slice(0, RESULT_LIMIT) : [])
let hidden_result_count = $derived(Math.max(0, filtered_rows.length - visible_rows.length))

function get_boundary_href(row) {
  return getMadhhabHref(window.navgo.href('/surahs/' + row.surah), selected_system_id, getBoundaryHash(row.anchor_key))
}
</script>

<section class="max-w-3xl">
  <div class="rule_label">البحث</div>
  <h1 class="section_title mt-4">ابحث عن رأس آية مختلف فيه</h1>
  <p class="section_text mt-4 text-lg">
    اكتب فاصلة أو اختر سورة، ثم افتح النتيجة في المصحف لرؤية رأس الآية في سياق القراءة.
  </p>
</section>

<section class="mt-8 surface p-4 sm:p-5" aria-label="مرشحات البحث">
  <label>
    <span class="field_label">البحث</span>
    <div class="relative mt-3">
      <SearchIcon class="pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-ink-soft" />
      <input class="search text-lg" data-icon="true" bind:value={search} placeholder="ابحث بفاصلة أو رقم آية" />
    </div>
  </label>

  <div class="mt-4 grid gap-3 md:grid-cols-3">
    <label>
      <span class="field_label">السورة</span>
      <select class="select mt-2" bind:value={surah_filter}>
        <option value="all">كل السور</option>
        {#each surahs as surah (surah.surah)}
          <option value={String(surah.surah)}>{format_surah_reference(surah.surah)} · {get_surah_name(surah)}</option>
        {/each}
      </select>
    </label>

    <label>
      <span class="field_label">مذهب العدّ</span>
      <select class="select mt-2" bind:value={selected_system_id}>
        {#each systems as system (system.id)}
          <option value={system.id}>{get_system_name(system)}</option>
        {/each}
      </select>
    </label>

    <label>
      <span class="field_label">حكم الرأس</span>
      <select class="select mt-2" bind:value={boundary_filter}>
        <option value="all">كل النتائج المطابقة</option>
        <option value="counted">يعده مذهب العدّ المختار</option>
        <option value="not_counted">لا يعده مذهب العدّ المختار</option>
      </select>
    </label>
  </div>

  {#if has_search_criteria}
    <div class="mt-4">
      <button class="pill_button" onclick={clear_search}>امسح البحث</button>
    </div>
  {/if}
</section>

{#if !has_search_criteria}
  <section class="mt-8 surface surface_muted p-5 sm:p-6">
    <div class="rule_label">ابدأ بالبحث</div>
    <h2 class="section_title mt-4 text-2xl">ابدأ بكتابة فاصلة أو اختيار سورة</h2>
    <p class="section_text mt-3 text-sm">
      أو جرّب أحد هذه المداخل.
    </p>

    <div class="mt-5 flex flex-wrap gap-2">
      <button class="pill_button" type="button" onclick={() => use_example({ search: 'الرحيم' })}>ابحث عن “الرحيم”</button>
      <button class="pill_button" type="button" onclick={() => use_example({ surah: '1' })}>رؤوس الفاتحة</button>
      <button class="pill_button" type="button" onclick={() => use_example({ boundary: 'not_counted' })}>ما لا يعده المذهب المختار</button>
    </div>
  </section>
{:else if filtered_rows.length === 0}
  <section class="mt-8 surface p-6 sm:p-8">
    <div class="rule_label">لا نتائج</div>
    <h2 class="section_title mt-4 text-2xl">لا نتائج لهذا البحث</h2>
    <p class="section_text mt-3">غيّر النص أو المرشحات ثم جرّب من جديد.</p>
    <div class="mt-6">
      <button class="pill_button" data-tone="accent" onclick={clear_search}>أعد ضبط البحث</button>
    </div>
  </section>
{:else}
  <section class="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)] xl:items-start">
    <div class="surface overflow-hidden">
      <div class="border-b border-line/70 px-4 py-3 text-sm font-semibold text-ink-soft sm:px-5">
        {compact_number(filtered_rows.length)} نتيجة مطابقة{#if hidden_result_count > 0} · تظهر أول {compact_number(visible_rows.length)} نتيجة فقط{/if}
      </div>

      <div class="divide-y divide-line/70">
        {#each visible_rows as row (row.anchor_key)}
          {@const selectedCounts = counts_selected(row)}
          <article class="p-4 transition hover:bg-paper-soft/60 data-[active=true]:bg-paper-soft/70 sm:p-5" data-active={row.anchor_key === selected_row?.anchor_key ? 'true' : 'false'}>
            <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0">
                <div class="text-sm font-bold text-ink-soft">{format_surah_reference(row.surah)} · {get_surah_name(row.surah)} · {row.location_label}</div>
                <div class="arabic_title mt-2 text-2xl text-ink">{row.word}</div>
                <p class="mt-3 text-sm text-ink-soft">
                  {get_system_name(selected_system)} {selectedCounts ? 'يعده رأس آية' : 'لا يعده رأس آية'}.
                  يعده: {row.counted_by.length ? join_system_names(row.counted_by) : 'لا أحد'}.
                </p>
              </div>

              <div class="flex shrink-0 flex-wrap gap-2">
                <button class="pill_button" type="button" onclick={() => (selected_key = row.anchor_key)}>تفاصيل</button>
                <a class="pill_button" data-tone="accent" href={get_boundary_href(row)}>
                  افتح في المصحف
                  <ArrowRightIcon class="size-4" />
                </a>
              </div>
            </div>
          </article>
        {/each}
      </div>
    </div>

    {#if selected_row}
      <BoundaryDetail row={selected_row} madhhabId={selected_system_id} />
    {/if}
  </section>
{/if}
