<script>
import { ArrowRightIcon } from '@lucide/svelte'

import MetricCard from '~/components/MetricCard.svelte'
import { compact_number, summary, systems } from '$lib/dataset.svelte.js'
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-start">
  <div>
    <div class="rule_label">دليل المشروع</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">مرجع لرؤوس الآي ومذاهب العدّ الستة.</h1>
    <p class="section_text mt-5 text-lg">
      يضع المشروع مواضع الخلاف في رؤوس الآي داخل سياق التلاوة، ويبيّن أي مذاهب العدّ تعدّ الفاصلة رأس آية وأيها لا تعدّها، مع إتاحة الشواهد المختصرة عند الحاجة.
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href={window.navgo.href('/mushaf')}>
        افتح المصحف
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" href={window.navgo.href('/ayah-counts')}>أعداد الآي</a>
      <a class="pill_button" href={window.navgo.href('/explorer')}>ابحث عن رأس آية</a>
    </div>
  </div>

  <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
    <MetricCard label="مذاهب العدّ" value={compact_number(systems.length)} note="مذاهب العدّ الستة المشمولة في هذه النسخة." />
    <MetricCard
      label="رؤوس آي مختلف فيها"
      value={compact_number(summary.total_points)}
      note="كل رأس آية هنا يعدّه بعضهم ولا يعده آخرون."
      tone="ok"
    />
    <MetricCard
      label="السور"
      value={compact_number(114)}
      note="تُقرأ رؤوس الآي داخل السورة لا كأرقام منفصلة عن النص."
      tone="accent"
    />
  </div>
</section>

<section class="mt-12 doc_grid" data-columns="3">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">المسألة</div>
    <h2 class="section_title mt-4 text-2xl">النص واحد وقد يختلف ترقيم الآيات.</h2>
    <p class="section_text mt-3 text-sm">
      الخلاف هنا في مواضع رؤوس الآي: هل تعدّ الفاصلة رأس آية في مذهب عدّ معين أم لا؟ فإذا اختلف الحكم تغيّر رقم الآية مع بقاء النص نفسه.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">طريقة القراءة</div>
    <h2 class="section_title mt-4 text-2xl">ابدأ من المصحف ثم افتح التفصيل.</h2>
    <p class="section_text mt-3 text-sm">
      اختر مذهب العدّ، واقرأ السورة بترقيمه، ثم اضغط على رأس آية مختلف فيه لتعرف من يعدّه ومن لا يعدّه والشواهد المرتبطة به.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الأعداد</div>
    <h2 class="section_title mt-4 text-2xl">المجاميع تظهر في صفحة مستقلة.</h2>
    <p class="section_text mt-3 text-sm">
      صفحة أعداد الآي تعرض مجموع القرآن وعدد آيات كل سورة في كل مذهب من مذاهب العدّ الستة من غير رسوم مقارنة أو مؤشرات تشخيصية.
    </p>
  </div>
</section>

<section class="mt-14">
  <div class="rule_label">فوائد معرفة رؤوس الآي</div>
  <h2 class="section_title mt-4 max-w-4xl">تظهر فائدة عدّ الآي عندما يحتاج الباحث إلى قراءة دقيقة للحدود والترقيم.</h2>

  <div class="mt-6 doc_grid" data-columns="2">
    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">ضبط مواضع الوقف ورؤوس الآيات</h3>
      <p class="section_text mt-3 text-sm">
        معرفة الرأس تساعد القارئ والمعلّم على تمييز موضع انتهاء الآية في مذهب العدّ المختار.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">فهم اختلاف ترقيم الآيات</h3>
      <p class="section_text mt-3 text-sm">
        إذا اختلف رقم الآية بين مصدرين، فالسبب قد يكون اختلاف مذهب العدّ لا اختلاف النص المقروء.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">توحيد الإحالات بين المصادر</h3>
      <p class="section_text mt-3 text-sm">
        معرفة مذهب العدّ تجعل الإحالة إلى السورة والآية أوضح عند الانتقال بين مصاحف وكتب تستعمل ترقيمًا مختلفًا.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">قراءة الشاهد على سؤال محدد</h3>
      <p class="section_text mt-3 text-sm">
        التفصيل لا يبدأ بجدول كبير، بل بسؤال واحد: هل هذه الفاصلة رأس آية عند هذا المذهب أم لا؟
      </p>
    </div>
  </div>
</section>

<section class="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] xl:items-start">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">كيف يُعرض رأس الآية</div>
    <h2 class="section_title mt-4">يعرض التفصيل ما يحتاجه الباحث مباشرة.</h2>

    <div class="doc_flow mt-5">
      <ul class="doc_list text-sm text-ink-soft">
        <li><span class="font-bold text-ink">الفاصلة.</span> الكلمة أو العبارة التي يقع عندها رأس الآية المختلف فيه.</li>
        <li><span class="font-bold text-ink">من يعدّه.</span> قائمة مذاهب العدّ التي تعدّ الفاصلة رأس آية.</li>
        <li><span class="font-bold text-ink">من لا يعدّه.</span> قائمة مذاهب العدّ التي لا تعدّ الفاصلة رأس آية.</li>
        <li><span class="font-bold text-ink">الشواهد.</span> إحالات مختصرة تعين الباحث على تتبع موضع الحكم في المصادر.</li>
      </ul>
    </div>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">حدود المرجع</div>
    <h3 class="mt-4 text-2xl font-bold text-ink">هذا المرجع خاص بعدّ الآي، لا بجميع أوجه القراءات.</h3>
    <p class="section_text mt-3 text-sm">
      يركّز الموقع على حدود الآيات وترقيمها. أما تفاصيل ملفات الربط والاستخدام البرمجي فهي في صفحة المطور حتى تبقى صفحات الباحث مركزة على القراءة والشواهد.
    </p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a class="pill_button" href={window.navgo.href('/mushaf')}>ابدأ بالمصحف</a>
      <a class="pill_button" href={window.navgo.href('/developer')}>صفحة المطور</a>
    </div>
  </div>
</section>
