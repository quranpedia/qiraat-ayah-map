<script>
import { ArrowRightIcon } from '@lucide/svelte'
</script>

<section class="max-w-4xl">
  <div class="rule_label">دليل المشروع</div>
  <h1 class="page_title mt-5 text-ink">مرجع لرؤوس الآي ومذاهب العدّ الستة.</h1>
  <p class="section_text mt-5 text-lg">
    يضع المشروع مواضع الخلاف في رؤوس الآي داخل سياق التلاوة، ويبيّن أي مذاهب العدّ تعدّ الفاصلة رأس آية وأيها لا تعدّها.
  </p>

  <div class="mt-8 flex flex-wrap gap-3">
    <a class="pill_button" data-tone="accent" href={window.navgo.href('/mushaf')}>
      افتح المصحف
      <ArrowRightIcon class="size-4" />
    </a>
    <a class="pill_button" href={window.navgo.href('/ayah-counts')}>راجع أعداد الآي</a>
    <a class="pill_button" href={window.navgo.href('/explorer')}>ابحث عن رأس آية</a>
  </div>
</section>

<section class="mt-12 max-w-4xl border-t border-line/70 pt-8">
  <div class="rule_label">المسار العملي</div>
  <ol class="mt-6 grid gap-5 text-ink-soft">
    <li>
      <span class="font-bold text-ink">اختر مذهب العدّ.</span>
      يبدأ المرجع من الترقيم الذي تريد القراءة به، لا من جدول مقارنة عام.
    </li>
    <li>
      <span class="font-bold text-ink">اختر السورة.</span>
      تظهر الآيات مرقمة بحسب المذهب المختار حتى يبقى النص هو مركز التجربة.
    </li>
    <li>
      <span class="font-bold text-ink">افتح التفصيل عند الحاجة.</span>
      عند رأس الآية المختلف فيه يظهر من يعدّه ومن لا يعدّه مع الشواهد المتاحة.
    </li>
  </ol>
</section>

<section class="mt-12 max-w-4xl border-t border-line/70 pt-8">
  <div class="rule_label">فوائد معرفة رؤوس الآي</div>
  <h2 class="section_title mt-4">الفائدة الأساسية هي ضبط الحدود والإحالات من غير تغيير النص.</h2>

  <div class="mt-6 grid gap-5 text-ink-soft">
    <p>
      معرفة الرأس تساعد القارئ والمعلّم على تمييز موضع انتهاء الآية في مذهب العدّ المختار.
    </p>
    <p>
      إذا اختلف رقم الآية بين مصدرين، فالسبب قد يكون اختلاف مذهب العدّ لا اختلاف النص المقروء.
    </p>
    <p>
      عند الانتقال بين مصاحف وكتب تستعمل ترقيمًا مختلفًا، يجعل مذهب العدّ الإحالة إلى السورة والآية أوضح.
    </p>
  </div>
</section>

<section class="mt-12 max-w-4xl border-t border-line/70 pt-8">
  <div class="rule_label">حدود المرجع</div>
  <h2 class="section_title mt-4">هذا المرجع خاص بعدّ الآي، لا بجميع أوجه القراءات.</h2>
  <p class="section_text mt-4">
    يركّز الموقع على حدود الآيات وترقيمها. التفاصيل الفنية وملفات الربط تبقى في صفحة المطور حتى تظل صفحات الباحث مركزة على القراءة والشواهد.
  </p>
</section>
