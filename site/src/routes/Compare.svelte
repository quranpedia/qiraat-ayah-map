<script>
import { ArrowRightIcon, BookOpenCheckIcon, FilesIcon, MilestoneIcon } from '@lucide/svelte'

import PlotSystemDistanceMatrix from '~/components/charts/PlotSystemDistanceMatrix.svelte'
import PlotSystemVerificationBars from '~/components/charts/PlotSystemVerificationBars.svelte'
import SystemReviewWorkload from '~/components/charts/SystemReviewWorkload.svelte'
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
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start">
  <div>
    <div class="rule_label">المقارنة وتخطيط المراجعة</div>
    <h1 class="display_title mt-5 text-ink">قارن بين الأنظمة، وقدِّر الباقي، واختر المسار التالي.</h1>
    <p class="section_text mt-5 text-lg">
      هنا ترى الأقرب، وتراكم الشواهد، وأولوية المراجعة.
    </p>
    <div class="mt-6 flex flex-wrap gap-2 text-sm text-ink-soft">
      <span class="stat_chip">{compact_number(summary.total_points)} موضع مختلف فيه</span>
      <span class="stat_chip">{compact_number(summary.evidence.points_with_primary_evidence)} مع شاهد أصلي</span>
      <span class="stat_chip">{compact_number(summary.evidence.points_uncited)} ما يزال غير موثق</span>
    </div>
  </div>

  <div class="surface surface_muted p-5">
    <div class="metric_label">المؤشر الحالي</div>
    <div class="mt-4 space-y-4 text-sm text-ink-soft">
      <p>
        المصفوفة للمسافات، ومخطط العمل لأولويات المراجعة.
      </p>
      <a class="pill_button w-full" href={window.navgo.href('/explorer')}>
        افحص المواضع الموثقة
        <ArrowRightIcon class="size-4" />
      </a>
    </div>
  </div>
</section>

<section class="mt-12 surface p-5 sm:p-6">
  <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
        <div class="rule_label">مسافة الأنظمة</div>
        <h2 class="section_title mt-4">كم يفصل بين الأنظمة من مواضع مختلفة</h2>
        <p class="section_text mt-3 text-sm">
          كل خلية = عدد المواضع المختلفة بين النظامين.
        </p>
    </div>
    <FilesIcon class="hidden size-10 text-accent-strong sm:block" />
  </div>
  <div class="mt-6">
    <PlotSystemDistanceMatrix cells={system_distance_matrix} {systems} />
  </div>
</section>

<section class="mt-12 grid gap-6 xl:grid-cols-2">
  <div class="surface p-5 sm:p-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="rule_label">تغطية التوثيق</div>
        <h2 class="section_title mt-4">أين تتراكم الشواهد</h2>
        <p class="section_text mt-3 text-sm">
          يعرض فقط ما يعده كل نظام، لذلك يقيس عبء المراجعة الحقيقي.
        </p>
      </div>
      <BookOpenCheckIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>
    <div class="mt-6">
      <PlotSystemVerificationBars />
    </div>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="rule_label">تحجيم حملة المراجعة</div>
        <h2 class="section_title mt-4">من أين يبدأ المرور الكامل</h2>
        <p class="section_text mt-3 text-sm">
          يرتب الأنظمة بحسب الرؤوس المعدودة غير الموثقة.
        </p>
      </div>
      <MilestoneIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>
    <div class="mt-6">
      <SystemReviewWorkload queue={review_queue} />
    </div>
    <div class="mt-6 grid gap-3 sm:grid-cols-3">
      {#each review_queue.slice(0, 3) as entry (entry.system_id)}
        <div class="surface surface_muted p-4">
          <div class="metric_label">{entry.system_id}</div>
          <div class="mt-3 text-xl font-bold text-ink">{get_system_name(entry)}</div>
          <div class="mt-2 text-sm text-ink-soft">{compact_number(entry.uncited_points)} رأسًا معدودًا غير موثق</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="mt-12 surface p-5 sm:p-6">
  <div class="rule_label">أقرب الجيران وأبعدهم</div>
  <h2 class="section_title mt-4">أسرع لمحة للتشابه</h2>
  <div class="table_shell mt-6">
    <table class="data_table">
      <thead>
        <tr>
          <th>النظام</th>
          <th>الأقرب</th>
          <th>المسافة</th>
          <th>الأبعد</th>
          <th>المسافة</th>
        </tr>
      </thead>
      <tbody>
        {#each relationship_rows as row (row.system.id)}
          <tr>
            <td data-label="النظام">
              <div class="font-bold text-ink">{get_system_name(row.system)}</div>
              {#if current_language !== 'en' && get_system_secondary_name(row.system)}
                <div class="text-base text-ink-soft">{get_system_secondary_name(row.system)}</div>
              {/if}
            </td>
            <td data-label="الأقرب">{row.nearest_system_name}</td>
            <td data-label="المسافة الأقرب"><span class="badge" data-tone="ok">{compact_number(row.nearest_distance)}</span></td>
            <td data-label="الأبعد">{row.farthest_system_name}</td>
            <td data-label="المسافة الأبعد"><span class="badge" data-tone="warn">{compact_number(row.farthest_distance)}</span></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
