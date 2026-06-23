<script>
import { ArrowRightIcon } from '@lucide/svelte'
</script>

<section class="mx-auto max-w-3xl py-6 sm:py-10">
  <div class="rule_label">مرجع رؤوس الآي</div>
  <h1 class="page_title mt-5 text-ink">ابدأ بالقراءة في المصحف.</h1>
  <p class="section_text mt-5 text-lg">
    اختر مذهب العدّ، ثم اختر السورة، واقرأ ترقيم الآيات بحسب ذلك المذهب. عند الحاجة فقط، افتح تفصيل رأس الآية المختلف فيه.
  </p>

  <div class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
    <a class="pill_button" data-tone="accent" href={window.navgo.href('/mushaf')}>
      افتح المصحف
      <ArrowRightIcon class="size-4" />
    </a>
    <a class="font-bold text-accent-strong underline decoration-line decoration-1 underline-offset-4" href={window.navgo.href('/ayah-counts')}>أعداد الآي</a>
    <a class="font-bold text-accent-strong underline decoration-line decoration-1 underline-offset-4" href={window.navgo.href('/explorer')}>البحث</a>
    <a class="font-bold text-accent-strong underline decoration-line decoration-1 underline-offset-4" href={window.navgo.href('/project')}>المشروع</a>
  </div>

  <p class="mt-8 text-sm text-ink-soft">
    يشمل المرجع مذاهب العدّ الستة، وسور القرآن كلها، ورؤوس الآي المختلف فيها ضمن البيانات الحالية.
  </p>
</section>
