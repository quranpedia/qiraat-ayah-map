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
    <h1 class="display_title mt-5 text-ink">قارن بين الأنظمة، وقدِّر بقايا العمل، واختر المسار العلمي التالي.</h1>
    <p class="section_text mt-5 text-lg">
      تجيب هذه الصفحة عن الأسئلة العملية للمشروع: ما الأنظمة الأقرب، وأيها أسهل للوصول به إلى مراجعة كاملة، وكم بقي من المادة المعدودة بلا شاهد.
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
        تقيس المصفوفة أدناه مقدار التباين بين كل زوج من الأنظمة عبر مادة الخلاف، بينما يرتب مخطط العمل الأنظمة بحسب الرؤوس المعدودة غير الموثقة.
      </p>
      <a class="pill_button w-full" href="/explorer">
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
      <h2 class="section_title mt-4">كم يبتعد كل نظام عن الآخر في مواضع الخلاف</h2>
      <p class="section_text mt-3 text-sm">
        تُظهر كل خلية عدد المواضع المختلف فيها التي يعاملها النظامان على وجه مختلف. وهذا أسرع طريق لرؤية التشابه والعزلة.
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
        <h2 class="section_title mt-4">أي المواد المعدودة بدأت تتراكم لها الشواهد</h2>
        <p class="section_text mt-3 text-sm">
          تقتصر الأشرطة هنا على الرؤوس المختلف فيها التي يعدها كل نظام فعلًا، لذلك يعكس المخطط عبء المراجعة الحقيقي لا كامل المصفوفة المشتركة.
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
        <h2 class="section_title mt-4">أصغر الأنظمة الباقية للوصول إلى مرور كامل</h2>
        <p class="section_text mt-3 text-sm">
          يرتب هذا العرض الأنظمة بحسب الرؤوس المعدودة غير الموثقة، فيُظهر أيها يمكن أن يصل إلى مرور شاهد كامل بأقل قدر من العمل المتبقي.
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
  <h2 class="section_title mt-4">أسرع طريقة لرؤية التشابه في لمحة</h2>
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
            <td>
              <div class="font-bold text-ink">{get_system_name(row.system)}</div>
              {#if get_system_secondary_name(row.system)}
                <div class="text-base text-ink-soft">{get_system_secondary_name(row.system)}</div>
              {/if}
            </td>
            <td>{row.nearest_system_name}</td>
            <td><span class="badge" data-tone="ok">{compact_number(row.nearest_distance)}</span></td>
            <td>{row.farthest_system_name}</td>
            <td><span class="badge" data-tone="warn">{compact_number(row.farthest_distance)}</span></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
