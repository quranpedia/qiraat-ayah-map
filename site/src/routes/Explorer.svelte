<script>
import BoundaryDetail from '~/components/BoundaryDetail.svelte'
import {
  compact_number,
  get_system_name,
  rows,
  system_order
} from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'
import { getBoundaryHash } from '$lib/mushaf-viewer-dom.js'
import { getMadhhabHref } from '$lib/route-urls.js'

let search = $state('')
let system_filter = $state('all')
let hafs_filter = $state('all')
let selected_key = $state(null)
let current_language = $derived(get_current_language())

function join_system_names(list) {
  const separator = current_language === 'en' ? ', ' : '، '
  return list.map(get_system_name).join(separator)
}

function clear_filters() {
  search = ''
  system_filter = 'all'
  hafs_filter = 'all'
  selected_key = null
}

let filtered_rows = $derived.by(() => {
  const query = search.trim().toLowerCase()

  return rows.filter(row => {
    if (system_filter !== 'all' && !row.systems[system_filter].counts_boundary) {
      return false
    }

    const countedByHafs = row.systems.kufi?.counts_boundary ?? false

    if (hafs_filter === 'counted' && !countedByHafs) {
      return false
    }

    if (hafs_filter === 'not_counted' && countedByHafs) {
      return false
    }

    if (!query) {
      return true
    }

    const haystack = [
      row.anchor_key,
      row.word,
      row.location_label,
      row.kind,
      row.counted_by.join(' '),
      row.omitted_by.join(' '),
      row.supported_systems.join(' ')
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(query)
  })
})

let filtered_summary = $derived.by(() => {
  const summary = { counted_by_hafs: 0, not_counted_by_hafs: 0 }

  for (const row of filtered_rows) {
    if (row.systems.kufi?.counts_boundary) {
      summary.counted_by_hafs += 1
    } else {
      summary.not_counted_by_hafs += 1
    }
  }

  return summary
})

let has_filters = $derived(search.trim().length > 0 || system_filter !== 'all' || hafs_filter !== 'all')
let selected_row = $derived(selected_key ? filtered_rows.find(row => row.anchor_key === selected_key) || null : null)
let selected_madhhab_id = $derived(system_filter === 'all' ? 'kufi' : system_filter)

function get_boundary_href(row) {
  return getMadhhabHref(window.navgo.href('/surahs/' + row.surah), selected_madhhab_id, getBoundaryHash(row.anchor_key))
}
</script>

<section>
  <div class="rule_label">المستكشف</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h1 class="section_title">ابحث عن مواضع الخلاف في رؤوس الآي</h1>
      <p class="section_text mt-3">
        قم بتصفية رؤوس الآي المختلف فيها بحسب مذهب العدّ أو بحسب حكمها في حفص/الكوفي، أو ابحث عن رأس آية، ثم اضغط على الموضع المطلوب لعرض تفاصيله في القائمة الجانبية.
      </p>
    </div>
    <div class="stat_chip">{compact_number(filtered_rows.length)} نتيجة ظاهرة</div>
  </div>

  <div class="mt-4 flex flex-wrap gap-2 text-sm text-ink-soft">
    <span class="stat_chip">{compact_number(filtered_summary.counted_by_hafs)} يعده حفص</span>
    <span class="stat_chip">{compact_number(filtered_summary.not_counted_by_hafs)} لا يعده حفص</span>
  </div>
</section>

<section class="mt-8 split_layout">
  <div class="space-y-4">
    <div class="surface p-4 sm:p-5">
      <div class="grid gap-3 md:grid-cols-3">
        <label>
          <span class="metric_label">البحث</span>
          <input class="search mt-3" bind:value={search} placeholder="ابحث عن رأس آية" />
        </label>

        <label>
          <span class="metric_label">مذهب العدّ الذي يعده</span>
          <select class="select mt-3" bind:value={system_filter}>
            <option value="all">كل مذاهب العدّ</option>
            {#each system_order as system_id}
              <option value={system_id}>{get_system_name(system_id)}</option>
            {/each}
          </select>
        </label>

        <label>
          <span class="metric_label">في حفص/الكوفي</span>
          <select class="select mt-3" bind:value={hafs_filter}>
            <option value="all">كل رؤوس الآي</option>
            <option value="counted">يعده حفص</option>
            <option value="not_counted">لا يعده حفص</option>
          </select>
        </label>
      </div>

      {#if has_filters}
        <div class="mt-4">
          <button class="pill_button" onclick={clear_filters}>امسح المرشحات</button>
        </div>
      {/if}
    </div>

    {#if filtered_rows.length === 0}
      <div class="surface p-6 sm:p-8">
        <div class="rule_label">لا نتائج</div>
        <h2 class="section_title mt-4">لا يوجد رأس آية يطابق المرشحات الحالية.</h2>
        <p class="section_text mt-3">امسح بعض المرشحات ثم جرّب من جديد.</p>
        {#if has_filters}
          <div class="mt-6">
            <button class="pill_button" data-tone="accent" onclick={clear_filters}>أعد ضبط المستكشف</button>
          </div>
        {/if}
      </div>
    {:else}
      <div class="table_shell">
        <table class="data_table">
          <thead>
            <tr>
              <th>رأس الآية</th>
              <th>الفاصلة</th>
              <th>في حفص/الكوفي</th>
              <th>يعده</th>
            </tr>
          </thead>
          <tbody>
            {#each filtered_rows as row (row.anchor_key)}
              <tr data-active={row.anchor_key === selected_row?.anchor_key ? 'true' : 'false'} onclick={() => (selected_key = row.anchor_key)}>
                <td data-label="رأس الآية">
                  <a class="font-bold text-ink underline decoration-line decoration-1 underline-offset-4" href={get_boundary_href(row)}>{row.location_label}</a>
                </td>
                <td data-label="الفاصلة">
                  <div class="arabic_title text-xl text-ink">{row.word}</div>
                  <div class="mt-2 text-xs text-ink-soft">{row.anchor_key}</div>
                </td>
                <td data-label="في حفص/الكوفي">
                  <span class="badge" data-tone={row.systems.kufi?.counts_boundary ? 'ok' : 'warn'}>
                    {row.systems.kufi?.counts_boundary ? 'يعده حفص' : 'لا يعده حفص'}
                  </span>
                </td>
                <td data-label="يعده">
                  <div class="flex flex-wrap gap-2">
                    <span class="badge" data-tone="ok">{compact_number(row.counted_by_count)} من {compact_number(system_order.length)} يعده</span>
                    <span class="badge" data-tone="warn">{compact_number(row.omitted_by_count)} لا يعده</span>
                  </div>
                  <div class="mt-2 text-xs text-ink-soft">{join_system_names(row.counted_by)}</div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>

  <div>
    <BoundaryDetail row={selected_row} madhhabId={selected_madhhab_id} />
  </div>
</section>
