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
import { get_current_language } from '$lib/i18n.js'

let selected_system_id = $state('makki')
let selected_system = $derived(get_system(selected_system_id))
let selected_profile = $derived(get_system_profile(selected_system_id))
let current_language = $derived(get_current_language())
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-start">
  <div>
    <div class="rule_label">طبقة مراجعة معيارية</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">أطلس تحريري لمواضع الخلاف في رؤوس آي القرآن.</h1>
    <p class="section_text mt-5 text-lg">
      مرجع تفاعلي يبيّن أين يختلف عدُّ الآي بين الأنظمة الستة، وكيف يغيّر ذلك ترقيم الآيات داخل السورة.
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
    <MetricCard label="المواضع المختلف فيها" value={compact_number(summary.total_points)} note="كل موضع هنا نقطة خلاف قابلة للفحص والمراجعة." />
    <MetricCard
      label="النهايات / الداخلية"
      value={compact_number(summary.by_kind.end) + ' · ' + compact_number(summary.by_kind.internal)}
      note="بين مواضع في آخر الآية ومواضع فصل داخلية داخلها."
      tone="ok"
    />
    <MetricCard
      label="تغطية الشواهد"
      value={compact_number(summary.evidence.points_with_evidence) + ' / ' + compact_number(summary.total_points)}
      note="جزء من المادة موثق، والجزء الأكبر ما يزال ينتظر مزيدًا من الشواهد."
      tone="alert"
    />
  </div>
</section>

<section class="mt-12 grid gap-4 lg:grid-cols-3">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">كيف يقرأ</div>
    <h2 class="section_title mt-4 text-2xl">نهاية</h2>
    <p class="section_text mt-3 text-sm">
      موضع يقع عند نهاية آية على ضبط حفص. إذا أسقطه نظام آخر انزاح الترقيم بعده.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">كيف يقرأ</div>
    <h2 class="section_title mt-4 text-2xl">داخلي</h2>
    <p class="section_text mt-3 text-sm">
      موضع يقع داخل الآية على ضبط حفص. إذا عدّه نظام آخر انفصل الترقيم عنده.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">رموز المخطط</div>
    <h2 class="section_title mt-4 text-2xl">+, −, =</h2>
    <p class="section_text mt-3 text-sm">
      يشير + إلى فصل الترقيم، و− إلى دمجه، و= إلى موافقة الكوفي في الموضع نفسه.
    </p>
  </div>
</section>

<section class="mt-14 grid gap-6 xl:grid-cols-2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">مجاميع الأنظمة</div>
    <div class="mt-4 flex items-end justify-between gap-4">
      <div>
        <h2 class="section_title">مجاميع الأنظمة الستة</h2>
        <p class="section_text mt-3 text-sm">
          نظرة سريعة إلى مجموع الآيات في كل نظام.
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
        <h2 class="section_title">أين تتركز مواضع الخلاف</h2>
        <p class="section_text mt-3 text-sm">
          يوزع مواضع الخلاف بحسب السورة والنوع.
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
      <h2 class="section_title mt-4">أوضح السور لكل نظام</h2>
      <p class="section_text mt-3 text-sm">
        اختر نظامًا لترى السور التي يظهر فيها أثره بأوضح صورة.
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
      <div class="rule_label">النظام الحالي</div>
      <h3 class="mt-3 text-2xl font-bold text-ink">{get_system_name(selected_system)}</h3>
      {#if current_language !== 'en' && get_system_secondary_name(selected_system)}
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
        <h2 class="section_title mt-4">اختر نظامًا للعرض</h2>
      </div>
    <div class="flex items-center gap-2 text-sm text-ink-soft">
      <BookOpenCheckIcon class="size-4" />
      <span>كل بطاقة تفتح ملف النظام وملخصه.</span>
    </div>
  </div>

  <div class="system_grid mt-6">
    {#each systems as system (system.id)}
      <SystemCard {system} />
    {/each}
  </div>
</section>
