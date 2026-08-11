<script>
import { ArrowRightIcon } from '@lucide/svelte'

import {
  compact_number,
  get_system_name,
  get_system_secondary_name,
  review_queue,
  summary,
  system_distance_matrix,
  system_relationships,
  systems
} from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'

let current_language = $derived(get_current_language())

let distance_cells = $derived(
  new Map(system_distance_matrix.map(cell => [`${cell.left_system_id}:${cell.right_system_id}`, cell]))
)

let relationship_rows = $derived.by(() =>
  systems.map(system => {
    const relationships = system_relationships[system.id]

    return {
      system,
      nearest_system_name: get_system_name(relationships?.nearest?.right_system_id),
      farthest_system_name: get_system_name(relationships?.farthest?.right_system_id),
      nearest_distance: relationships?.nearest?.differing_points ?? 0,
      farthest_distance: relationships?.farthest?.differing_points ?? 0
    }
  })
)

function get_distance(left_system_id, right_system_id) {
  return distance_cells.get(`${left_system_id}:${right_system_id}`)?.differing_points ?? 0
}
</script>

<section class="max-w-4xl">
  <div class="rule_label">تشخيص المطور</div>
  <h1 class="page_title mt-5 text-ink">سلامة البيانات وعبء المراجعة</h1>
  <p class="section_text mt-5 text-lg">
    تابع ما ينقص من الشواهد، وقدّر العمل المتبقي في كل مذهب عدّ.
  </p>
  <div class="mt-7 flex flex-wrap gap-3">
    <a class="pill_button" href={window.navgo.href('/developer')}>استخدام المطور</a>
    <a class="pill_button" data-tone="accent" href={window.navgo.href('/explorer')}>
      افتح البحث
      <ArrowRightIcon class="size-4" />
    </a>
  </div>
</section>

<section class="mt-12 max-w-5xl border-t border-line/70 pt-8">
  <div class="rule_label">عبء المراجعة</div>
  <h2 class="section_title mt-4">الرؤوس المعدودة التي تحتاج إلى شواهد</h2>
  <p class="section_text mt-3 text-sm">
    العمل المتبقي في كل مذهب عدّ.
  </p>

  <div class="table_shell mt-6">
    <table class="data_table">
      <thead>
        <tr>
          <th>مذهب العدّ</th>
          <th>الرؤوس المعدودة</th>
          <th>بلا شاهد</th>
          <th>مع شاهد</th>
          <th>فواصل داخلية</th>
          <th>نهايات لا يعدّها</th>
        </tr>
      </thead>
      <tbody>
        {#each review_queue as entry (entry.system_id)}
          <tr>
            <td>
              <div class="font-bold text-ink">{get_system_name(entry.system_id)}</div>
              {#if current_language !== 'en' && get_system_secondary_name(entry.system_id)}
                <div class="text-base text-ink-soft">{get_system_secondary_name(entry.system_id)}</div>
              {/if}
            </td>
            <td>{compact_number(entry.counted_points)}</td>
            <td>{compact_number(entry.uncited_points)}</td>
            <td>{compact_number(entry.cited_points)}</td>
            <td>{compact_number(entry.split_effects)}</td>
            <td>{compact_number(entry.merge_effects)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<section class="mt-12 max-w-5xl border-t border-line/70 pt-8">
  <div class="rule_label">ملخص الشواهد</div>
  <h2 class="section_title mt-4">اكتمال التوثيق</h2>
  <dl class="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-3">
    <div>
      <dt class="field_label">رؤوس مختلفة</dt>
      <dd class="mt-2 text-2xl font-bold text-ink">{compact_number(summary.total_points)}</dd>
    </div>
    <div>
      <dt class="field_label">مع شاهد أصلي</dt>
      <dd class="mt-2 text-2xl font-bold text-ink">{compact_number(summary.evidence.points_with_primary_evidence)}</dd>
    </div>
    <div>
      <dt class="field_label">بلا شاهد</dt>
      <dd class="mt-2 text-2xl font-bold text-ink">{compact_number(summary.evidence.points_uncited)}</dd>
    </div>
  </dl>
</section>

<section class="mt-12 max-w-5xl border-t border-line/70 pt-8">
  <div class="rule_label">مسافات داخلية</div>
  <h2 class="section_title mt-4">التشابه بين مذاهب العدّ</h2>
  <p class="section_text mt-3 text-sm">
    عدد المواضع التي يفترق فيها كل مذهبين.
  </p>

  <details class="mt-6 border-b border-line/70 pb-5" open>
    <summary class="cursor-pointer font-bold text-ink">أقرب وأبعد مذهب لكل مذهب</summary>
    <div class="table_shell mt-5">
      <table class="data_table">
        <thead>
          <tr>
            <th>مذهب العدّ</th>
            <th>الأقرب</th>
            <th>الفروق</th>
            <th>الأبعد</th>
            <th>الفروق</th>
          </tr>
        </thead>
        <tbody>
          {#each relationship_rows as row (row.system.id)}
            <tr>
              <td>
                <div class="font-bold text-ink">{get_system_name(row.system)}</div>
                {#if current_language !== 'en' && get_system_secondary_name(row.system)}
                  <div class="text-base text-ink-soft">{get_system_secondary_name(row.system)}</div>
                {/if}
              </td>
              <td>{row.nearest_system_name}</td>
              <td>{compact_number(row.nearest_distance)}</td>
              <td>{row.farthest_system_name}</td>
              <td>{compact_number(row.farthest_distance)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </details>

  <details class="mt-5 border-b border-line/70 pb-5">
    <summary class="cursor-pointer font-bold text-ink">مصفوفة الفروق الكاملة</summary>
    <div class="table_shell mt-5">
      <table class="data_table">
        <thead>
          <tr>
            <th>مذهب العدّ</th>
            {#each systems as system (system.id)}
              <th>{get_system_name(system)}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each systems as left_system (left_system.id)}
            <tr>
              <td>
                <div class="font-bold text-ink">{get_system_name(left_system)}</div>
              </td>
              {#each systems as right_system (right_system.id)}
                <td>{compact_number(get_distance(left_system.id, right_system.id))}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </details>
</section>
