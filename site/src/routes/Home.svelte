<script>
import { ArrowRightIcon, BookOpenCheckIcon, LibraryBigIcon, SearchIcon } from '@lucide/svelte'

import MadhhabCard from '~/components/MadhhabCard.svelte'
import { compact_number, summary, systems } from '$lib/dataset.svelte.js'
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.85fr)] lg:items-start">
  <div>
    <div class="rule_label">مرجع رؤوس الآي</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">مرجع تفاعلي لرؤوس الآي بين مذاهب العدّ الستة.</h1>
    <p class="section_text mt-5 text-lg">
      اختر سورة، واقرأ رؤوس الآي المختلف فيها داخل سياقها، ثم افتح التفصيل المختصر لمعرفة أي مذاهب العدّ تعد الرأس.
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href={window.navgo.href('/mushaf')}>
        افتح المصحف
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" href={window.navgo.href('/ayah-counts')}>أعداد الآي</a>
      <a class="pill_button" href={window.navgo.href('/explorer')}>استكشف رؤوس الآي</a>
    </div>

    <div class="mt-6 flex flex-wrap gap-2 text-sm text-ink-soft">
      <span class="stat_chip">{compact_number(systems.length)} مذاهب العدّ</span>
      <span class="stat_chip">{compact_number(summary.total_points)} رأس آية مختلف فيه</span>
      <span class="stat_chip">{compact_number(114)} سورة</span>
    </div>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">ابدأ من هنا</div>
    <h2 class="section_title mt-4 text-2xl">القراءة داخل السورة هي المسار الأساسي.</h2>
    <p class="section_text mt-3 text-sm">
      صفحات السور تجمع نص المصحف، ورؤوس الآي المختلف فيها، وتفصيل كل رأس في مكان واحد.
    </p>
    <a class="pill_button mt-6 w-full" href={window.navgo.href('/mushaf')}>
      اختر سورة في المصحف
      <ArrowRightIcon class="size-4" />
    </a>
  </div>
</section>

<section class="mt-12 grid gap-4 lg:grid-cols-3">
  <a class="surface block p-5 transition-transform duration-200 hover:-translate-y-0.5" href={window.navgo.href('/mushaf')}>
    <LibraryBigIcon class="size-8 text-accent-strong" />
    <h2 class="section_title mt-4 text-2xl">اقرأ في المصحف</h2>
    <p class="section_text mt-3 text-sm">
      افتح السورة، وشاهد رؤوس الآي المختلف فيها داخل النص بدلًا من البدء بالجداول التحليلية.
    </p>
    <div class="mt-5 flex items-center gap-2 font-bold text-accent-strong">
      <span>المصحف</span>
      <ArrowRightIcon class="size-4" />
    </div>
  </a>

  <a class="surface block p-5 transition-transform duration-200 hover:-translate-y-0.5" href={window.navgo.href('/explorer')}>
    <SearchIcon class="size-8 text-accent-strong" />
    <h2 class="section_title mt-4 text-2xl">استكشف رأس آية</h2>
    <p class="section_text mt-3 text-sm">
      ابحث برأس الآية أو السورة، ثم راجع أي مذاهب العدّ تعده وأيها لا تعده.
    </p>
    <div class="mt-5 flex items-center gap-2 font-bold text-accent-strong">
      <span>المستكشف</span>
      <ArrowRightIcon class="size-4" />
    </div>
  </a>

  <a class="surface block p-5 transition-transform duration-200 hover:-translate-y-0.5" href={window.navgo.href('/ayah-counts')}>
    <BookOpenCheckIcon class="size-8 text-accent-strong" />
    <h2 class="section_title mt-4 text-2xl">راجع أعداد الآي</h2>
    <p class="section_text mt-3 text-sm">
      اعرض مجموع القرآن وعدد آيات كل سورة في مذاهب العدّ الستة من غير رسوم مقارنة.
    </p>
    <div class="mt-5 flex items-center gap-2 font-bold text-accent-strong">
      <span>أعداد الآي</span>
      <ArrowRightIcon class="size-4" />
    </div>
  </a>
</section>

<section class="mt-14">
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <div class="rule_label">مذاهب العدّ الستة</div>
      <h2 class="section_title mt-4">افتح ملف مذهب العدّ</h2>
      <p class="section_text mt-3 text-sm">
        كل ملف يعرض مجموع الآيات ورؤوس الآي المرتبطة بذلك المذهب داخل المادة الحالية.
      </p>
    </div>
  </div>

  <div class="madhhab_grid mt-6">
    {#each systems as system (system.id)}
      <MadhhabCard madhhab={system} />
    {/each}
  </div>
</section>
