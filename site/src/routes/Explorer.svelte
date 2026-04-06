<script>
import BoundaryDetail from '~/components/BoundaryDetail.svelte'
import {
  compact_number,
  format_boundary_kind,
  format_verification_status,
  get_system_name,
  get_verification_tone,
  review_status_order,
  rows,
  system_order
} from '$lib/dataset.svelte.js'

let search = $state('')
let system_filter = $state('all')
let kind_filter = $state('all')
let status_filter = $state('all')
let selected_key = $state(null)

function clear_filters() {
  search = ''
  system_filter = 'all'
  kind_filter = 'all'
  status_filter = 'all'
  selected_key = null
}

let filtered_rows = $derived.by(() => {
  const query = search.trim().toLowerCase()

  return rows.filter(row => {
    if (system_filter !== 'all' && !row.systems[system_filter].counts_boundary) {
      return false
    }

    if (kind_filter !== 'all' && row.kind !== kind_filter) {
      return false
    }

    if (status_filter !== 'all' && row.verification_status !== status_filter) {
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
      row.verification_status,
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
  const by_kind = { end: 0, internal: 0 }
  const by_status = Object.fromEntries(review_status_order.map(status => [status, 0]))

  for (const row of filtered_rows) {
    by_kind[row.kind] += 1
    by_status[row.verification_status] += 1
  }

  return {
    by_kind,
    by_status
  }
})

let has_filters = $derived(
  search.trim().length > 0
  || system_filter !== 'all'
  || kind_filter !== 'all'
  || status_filter !== 'all'
)

let active_row = $derived(filtered_rows.find(row => row.anchor_key === selected_key) || filtered_rows[0] || null)
</script>

<section>
  <div class="rule_label">المستكشف</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h1 class="section_title">افحص طبقة مواضع الخلاف</h1>
      <p class="section_text mt-3">
        رشِّح المادة بحسب النظام أو نوع الموضع أو حالة المراجعة أو كلمة الارتكاز. وتحافظ اللوحة الجانبية على ربط الموضع الحالي بأثره في الترقيم.
      </p>
    </div>
    <div class="stat_chip">{compact_number(filtered_rows.length)} سطرًا ظاهرًا</div>
  </div>

  <div class="mt-4 flex flex-wrap gap-2 text-sm text-ink-soft">
    <span class="stat_chip">{compact_number(filtered_summary.by_kind.end)} نهاية</span>
    <span class="stat_chip">{compact_number(filtered_summary.by_kind.internal)} داخلي</span>
    {#each review_status_order as status (status)}
      {#if filtered_summary.by_status[status] > 0}
        <span class="stat_chip">{compact_number(filtered_summary.by_status[status])} {format_verification_status(status)}</span>
      {/if}
    {/each}
  </div>
</section>

<section class="mt-8 split_layout">
  <div class="space-y-4">
    <div class="surface p-4 sm:p-5">
      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label>
          <span class="metric_label">البحث</span>
          <input class="search mt-3" bind:value={search} placeholder="كلمة أو مفتاح ارتكاز أو 2:219" />
        </label>

        <label>
          <span class="metric_label">النظام الذي يعده</span>
          <select class="select mt-3" bind:value={system_filter}>
            <option value="all">جميع الأنظمة</option>
            {#each system_order as system_id}
              <option value={system_id}>{get_system_name(system_id)}</option>
            {/each}
          </select>
        </label>

        <label>
          <span class="metric_label">نوع الموضع</span>
          <select class="select mt-3" bind:value={kind_filter}>
            <option value="all">جميع الأنواع</option>
            <option value="end">{format_boundary_kind('end')}</option>
            <option value="internal">{format_boundary_kind('internal')}</option>
          </select>
        </label>

        <label>
          <span class="metric_label">حالة التوثيق</span>
          <select class="select mt-3" bind:value={status_filter}>
            <option value="all">جميع الحالات</option>
            {#each review_status_order as status (status)}
              <option value={status}>{format_verification_status(status)}</option>
            {/each}
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
        <h2 class="section_title mt-4">لا يوجد موضع يطابق المرشحات الحالية.</h2>
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
              <th>الموضع</th>
              <th>الارتكاز</th>
              <th>النوع</th>
              <th>الحالة</th>
              <th>يعده</th>
            </tr>
          </thead>
          <tbody>
            {#each filtered_rows as row (row.anchor_key)}
              <tr data-active={row.anchor_key === active_row?.anchor_key ? 'true' : 'false'} onclick={() => (selected_key = row.anchor_key)}>
                <td>
                  <a class="font-bold text-ink underline decoration-line decoration-1 underline-offset-4" href="/surahs/{row.surah}">{row.location_label}</a>
                </td>
                <td>
                  <div class="arabic_title text-xl text-ink">{row.word}</div>
                  <div class="mt-2 text-xs text-ink-soft">{row.anchor_key}</div>
                </td>
                <td><span class="badge" data-tone={row.kind === 'internal' ? 'accent' : 'ok'}>{format_boundary_kind(row.kind)}</span></td>
                <td><span class="badge" data-tone={get_verification_tone(row.verification_status)}>{format_verification_status(row.verification_status)}</span></td>
                <td>
                  <div class="flex flex-wrap gap-2">
                    <span class="badge" data-tone="ok">{compact_number(row.counted_by_count)} من {compact_number(system_order.length)} يعده</span>
                    <span class="badge" data-tone="warn">{compact_number(row.omitted_by_count)} يسقطه</span>
                  </div>
                  <div class="mt-2 text-xs text-ink-soft">{row.counted_by.map(get_system_name).join('، ')}</div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>

  <div>
    <BoundaryDetail row={active_row} />
  </div>
</section>
