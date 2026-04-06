<script>
import { ArrowRightIcon, BookOpenCheckIcon, FilesIcon, SigmaIcon } from '@lucide/svelte'

import MetricCard from '~/components/MetricCard.svelte'
import SystemCard from '~/components/SystemCard.svelte'
import PlotSurahHeatmap from '~/components/charts/PlotSurahHeatmap.svelte'
import PlotTotals from '~/components/charts/PlotTotals.svelte'
import SystemFingerprint from '~/components/charts/SystemFingerprint.svelte'
import {
  compact_number,
  get_system,
  get_system_name,
  get_system_profile,
  get_system_secondary_name,
  summary,
  surahs,
  systems
} from '$lib/dataset.svelte.js'

let selected_system_id = $state('makki')
let selected_system = $derived(get_system(selected_system_id))
let selected_profile = $derived(get_system_profile(selected_system_id))
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-start">
  <div>
    <div class="rule_label">طبقة مراجعة معيارية</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">أطلس تحريري لمواضع الخلاف في رؤوس آي القرآن.</h1>
    <p class="section_text mt-5 text-lg">
      يحوّل الموقع طبقة الأصول الموجهة للمختصين إلى شيء يمكن مسحه ومقارنته ومناقشته: أين يُعد رأس الآية، وأين يُسقط، وكيف يغيّر ذلك الترقيم في المواضع اللاحقة.
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href={window.navgo.href('/explorer')}>
        استكشف مواضع الخلاف
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" href={window.navgo.href('/project')}>اقرأ دليل المشروع</a>
      <a class="pill_button" href={window.navgo.href('/developer')}>استخدام المطور</a>
    </div>

    <div class="mt-6 flex flex-wrap gap-2 text-sm text-ink-soft">
      <span class="stat_chip">{compact_number(summary.by_kind.end)} موضع نهاية</span>
      <span class="stat_chip">{compact_number(summary.by_kind.internal)} موضع داخلي</span>
      <span class="stat_chip">{compact_number(summary.evidence.points_with_primary_evidence)} مع شاهد أصلي</span>
      <span class="stat_chip">{compact_number(summary.evidence.points_uncited)} غير موثق</span>
    </div>
  </div>

  <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
    <MetricCard label="المواضع المختلف فيها" value={compact_number(summary.total_points)} note="كل سطر هنا قرار حدودي صالح للمراجعة العلمية." />
    <MetricCard
      label="النهايات / الداخلية"
      value={compact_number(summary.by_kind.end) + ' · ' + compact_number(summary.by_kind.internal)}
      note="تنقسم مادة الخلاف إلى رؤوس آي في آخر الآية ومواضع فصل داخلية."
      tone="ok"
    />
    <MetricCard
      label="تغطية الشواهد"
      value={compact_number(summary.evidence.points_with_evidence) + ' / ' + compact_number(summary.total_points)}
      note="بدأت الشواهد الأصلية تهبط موضعًا موضعًا، لكن أكثر المادة المعدودة لا يزال يحتاج إلى تفريغ من المصادر."
      tone="alert"
    />
  </div>
</section>

<section class="mt-12 grid gap-4 lg:grid-cols-3">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">كيف يقرأ</div>
    <h2 class="section_title mt-4 text-2xl">نهاية</h2>
    <p class="section_text mt-3 text-sm">
      هذا موضع خلاف في نهاية آية على ضبط حفص. الكوفي يعده بحكم التعريف، وإسقاطه يدمج الترقيم بالنسبة إلى الكوفي.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">كيف يقرأ</div>
    <h2 class="section_title mt-4 text-2xl">داخلي</h2>
    <p class="section_text mt-3 text-sm">
      هذا موضع خلاف داخل آية على ضبط حفص. الكوفي لا يعده، وعدُّه في نظام آخر يفصل الترقيم بالنسبة إلى الكوفي.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">رموز المخطط</div>
    <h2 class="section_title mt-4 text-2xl">+, −, =</h2>
    <p class="section_text mt-3 text-sm">
      تستخدم مصفوفات السور الرمز + عندما يفصل النظام الترقيم، والرمز − عندما يدمجه، والرمز = عندما يوافق الكوفي في ذلك الموضع.
    </p>
  </div>
</section>

<section class="mt-14 grid gap-6 xl:grid-cols-2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">مجاميع الأنظمة</div>
    <div class="mt-4 flex items-end justify-between gap-4">
      <div>
        <h2 class="section_title">كيف تستقر الأنظمة الستة في مجموع المصحف كله</h2>
        <p class="section_text mt-3 text-sm">
          يعرض هذا المخطط نظرة كلية نظيفة تجعل مذاهب العد تُقرأ كجدول مرجعي سريع.
        </p>
      </div>
      <SigmaIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>
    <div class="mt-6">
      <PlotTotals {systems} />
    </div>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">خريطة السور الحرارية</div>
    <div class="mt-4 flex items-end justify-between gap-4">
      <div>
        <h2 class="section_title">أين تتكاثف مادة الخلاف</h2>
        <p class="section_text mt-3 text-sm">
          يعد هذا المخطط مواضع الخلاف بحسب السورة والنوع. وهو يصف كثافة طبقة الأصول نفسها، لا الأثر اللاحق لكل نظام.
        </p>
      </div>
      <FilesIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>
    <div class="mt-6">
      <PlotSurahHeatmap {surahs} />
    </div>
  </div>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <div class="rule_label">بصمة النظام</div>
      <h2 class="section_title mt-4">أين يعد النظام أكبر عدد من الرؤوس المختلف فيها</h2>
      <p class="section_text mt-3 text-sm">
        يعطي هذا العرض الترتيبي قراءة تفاعلية لبصمة النظام: اختر مذهبًا ثم امسح السور التي تظهر فيها مادته المعدودة بأوضح صورة.
      </p>
    </div>

    <label class="block lg:w-72">
      <span class="metric_label">نظام المعاينة</span>
      <select class="select mt-3" bind:value={selected_system_id}>
        {#each systems as system (system.id)}
          <option value={system.id}>{get_system_name(system)}</option>
        {/each}
      </select>
    </label>
  </div>

  <div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:items-start">
    <SystemFingerprint profile={selected_profile} limit={10} />

    <div class="surface surface_muted p-5">
      <div class="rule_label">المعاينة الحالية</div>
      <h3 class="mt-3 text-2xl font-bold text-ink">{get_system_name(selected_system)}</h3>
      {#if get_system_secondary_name(selected_system)}
        <p class="mt-2 text-xl text-ink-soft">{get_system_secondary_name(selected_system)}</p>
      {/if}
      <div class="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div class="font-bold text-ink">{compact_number(selected_system.counts_boundary)}</div>
          <div class="text-ink-soft">رؤوس مختلف فيها</div>
        </div>
        <div>
          <div class="font-bold text-ink">{compact_number(selected_system.merge_effects)}</div>
          <div class="text-ink-soft">آثار الدمج</div>
        </div>
      </div>
      <a class="pill_button mt-6 w-full" href={window.navgo.href('/systems/' + selected_system.id)}>
        افتح ملف النظام الكامل
        <ArrowRightIcon class="size-4" />
      </a>
    </div>
  </div>
</section>

<section class="mt-14">
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <div class="rule_label">الأنظمة المعيارية</div>
      <h2 class="section_title mt-4">ادخل إلى أحد مذاهب العد</h2>
    </div>
    <div class="flex items-center gap-2 text-sm text-ink-soft">
      <BookOpenCheckIcon class="size-4" />
      <span>كل بطاقة تفتح مسارًا مبنيًا على طبقة المراجعة المولدة.</span>
    </div>
  </div>

  <div class="system_grid mt-6">
    {#each systems as system (system.id)}
      <SystemCard {system} />
    {/each}
  </div>
</section>
