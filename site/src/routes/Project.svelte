<script>
import { ArrowRightIcon } from '@lucide/svelte'

import MetricCard from '~/components/MetricCard.svelte'
import { compact_number, summary, systems } from '$lib/dataset.svelte.js'
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-start">
  <div>
    <div class="rule_label">دليل المشروع</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">ما الذي يفعله هذا المشروع بعبارة واضحة.</h1>
    <p class="section_text mt-5 text-lg">
      هذا المشروع أطلس مرجعي للمواضع التي تختلف فيها أنظمة عدِّ الآي المعيارية في القرآن. وهو يحوّل هذه المسألة العلمية القديمة إلى بيانات أصول قابلة للمراجعة وملفات تحويل قابلة لإعادة الإنتاج.
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href="/explorer">
        استكشف مواضع الخلاف
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" href="/developer">استخدام المطور</a>
    </div>
  </div>

  <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
    <MetricCard label="أنظمة العد" value={compact_number(systems.length)} note="يغطي الأطلس الأنظمة الستة المعيارية المستعملة مع القراءات العشر." />
    <MetricCard
      label="المواضع المختلف فيها"
      value={compact_number(summary.total_points)}
      note="كل موضع هنا نقطة ملموسة يُعد فيها الحد في بعض الأنظمة ويُسقط في أنظمة أخرى."
      tone="ok"
    />
    <MetricCard
      label="الشواهد الأصلية المضافة"
      value={compact_number(summary.evidence.points_with_primary_evidence)}
      note="تُضاف الشواهد الأصلية موضعًا موضعًا بدل افتراضها على مستوى الجملة كلها."
      tone="alert"
    />
  </div>
</section>

<section class="mt-12 doc_grid" data-columns="3">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">المشكلة</div>
    <h2 class="section_title mt-4 text-2xl">قد تبقى الكلمات نفسها بينما يتغير الترقيم.</h2>
    <p class="section_text mt-3 text-sm">
      هذا المشروع معنيٌّ بعدِّ الآي: أين تنتهي الآية وأين تبدأ التي بعدها. فإذا عُدَّ الموضع في نظام ولم يُعد في آخر انجرفت أرقام الآيات مع بقاء النص القرآني نفسه في كثير من المواضع.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">لماذا يهم</div>
    <h2 class="section_title mt-4 text-2xl">التطبيقات والواجهات البرمجية وأدوات المصحف تحتاج إلى جسر ثابت.</h2>
    <p class="section_text mt-3 text-sm">
      كثير من البرمجيات تفترض أن اقتران السورة بالآية ثابت على وجه كوني، وليس الأمر كذلك. يمنح هذا المشروع الأدوات اللاحقة طريقة واضحة للانتقال بين أنظمة الترقيم من غير تخمين.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">ما الذي ننشره</div>
    <h2 class="section_title mt-4 text-2xl">طبقة أصول صغيرة معيارية، ثم مخرجات مولدة منها.</h2>
    <p class="section_text mt-3 text-sm">
      يراجع الباحث طبقة الأصول المختصرة في <span class="inline_code">data/</span> عادةً، بينما يستهلك المطور الملفات المولدة في <span class="inline_code">dist/</span>. جداول التحويل الكبيرة نواتج مشتقة، لا الوثيقة العلمية الأولى.
    </p>
  </div>
</section>

<section class="mt-14">
  <div class="rule_label">منهجنا</div>
  <h2 class="section_title mt-4 max-w-4xl">نبدأ بالسؤال الذي يشبه بناء الكتاب، ثم نولّد ما بعده منه.</h2>

  <div class="mt-6 doc_grid" data-columns="2">
    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">١. تثبيت محور ترقيم مرجعي</h3>
      <p class="section_text mt-3 text-sm">
        يعتمد المشروع الكوفي/حفص محورًا تشغيليًا. ولا يعني هذا أن غيره أقل قيمة، وإنما يوفّر للتطبيقات وأدوات المراجعة إحداثية ثابتة تدور من خلالها.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">٢. تسجيل الرؤوس المختلف فيها فقط</h3>
      <p class="section_text mt-3 text-sm">
        بدل صيانة جداول تحويل ضخمة يدويًا، تسجل طبقة الأصول المعيارية رؤوس الآي المختلف فيها مباشرة: إما نهاية مختلف فيها لآية على ضبط حفص، أو فاصلًا داخليًا داخلها.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">٣. ربط كل موضع بالشاهد</h3>
      <p class="section_text mt-3 text-sm">
        لكل موضع مختلف فيه سجل شواهد مطابق. هناك تعيش الإحالات وملاحظات المصادر وحالة المراجعة ونقاط التوتر غير المحسومة. لا نريد طبقة التحويل أن تبدو أقطع مما تحتمله الكتب.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">٤. توليد المخرجات الموجهة للمطور</h3>
      <p class="section_text mt-3 text-sm">
        من هذه الطبقة المختصرة يُعاد توليد الخرائط الأمامية والعكسية، وعدد آيات السور، وأسماء الرواة، ورزم المراجعة، وبيانات الموقع المستعملة في هذا الأطلس.
      </p>
    </div>
  </div>
</section>

<section class="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] xl:items-start">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">موضع الحقيقة المرجعية</div>
    <h2 class="section_title mt-4">كيف نربط البيانات بالكتب</h2>

    <div class="doc_flow mt-5">
      <p class="section_text text-sm">
        لا يعامل المشروع المجاميع وحدها على أنها برهان، ولا يمتص سلوك المواقع أو الواجهات البرمجية بصمت كأنه حقيقة نهائية. طبقة الشواهد مقصودة لتبقى قريبة من أدب عدِّ الآي المنقول نفسه.
      </p>

      <ul class="doc_list text-sm text-ink-soft">
        <li><span class="font-bold text-ink">الشهود الأُول أولًا.</span> تكون الكتب الكلاسيكية مثل <span class="inline_code">البيان</span> الشاهد الأول متى وُجد تطابق منظم مع البنية الحالية.</li>
        <li><span class="font-bold text-ink">المصنفات اللاحقة شواهد لا بدائل.</span> تُستعمل أعمال مثل <span class="inline_code">الفرائد الحسان</span> و <span class="inline_code">نفائس البيان</span> للتأكيد أو الشرح أو التنبيه إلى مواضع التوتر.</li>
        <li><span class="font-bold text-ink">حالة الشاهد صريحة.</span> قد يكون الموضع موثقًا أصلًا، أو ثانويًا فقط، أو مختلفًا فيه، أو غير محسوم، أو بلا شاهد بعد. النقص يظهر ولا يخفى.</li>
        <li><span class="font-bold text-ink">حد الشواهد المودعة داخل المستودع.</span> تجعل الشواهد المهيكلة تحت <span class="inline_code">sources/</span> جبهة الشواهد الحالية قابلة للفحص وإعادة الإنتاج.</li>
        <li><span class="font-bold text-ink">الاستثناءات المفتوحة تبقى مفتوحة.</span> إذا لم ينطبق الشاهد نظيفًا على البنية الحالية، يبقى عدم التطابق محفوظًا للمراجعة بدل تسويته خفية.</li>
      </ul>
    </div>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">الوضع الحالي</div>
    <h3 class="mt-4 text-2xl font-bold text-ink">هذا أطلس قابل للمراجعة، لا دعوى بأن كل موضع قد حُسم تمامًا.</h3>
    <p class="section_text mt-3 text-sm">
      بعض المناطق لها دعم أصلي بالفعل، وأخرى ما زالت على شواهد ثانوية أو تنتظر مزيدًا من التفريغ من الأصول. وظيفة البناء هنا أن يجعل هذه الحال مقروءة.
    </p>
    <div class="mt-5 flex flex-wrap gap-2 text-sm text-ink-soft">
      <span class="stat_chip">لا اختراعات من المجاميع وحدها</span>
      <span class="stat_chip">لا تمليس صامت للخلاف</span>
      <span class="stat_chip">مخرجات مولدة قابلة لإعادة الإنتاج</span>
    </div>
  </div>
</section>

<section class="mt-14 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">ما الذي لا يفعله المشروع</div>
    <h2 class="section_title mt-4 text-2xl">وضوح الحدود يحفظ صدق الدعوى.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li>لا يستبدل الكتب الكلاسيكية، بل يبني منها طبقة مراجعة وتوافقية منظمة.</li>
      <li>لا يحاول حسم المواضع غير المحسومة بالحساب وحده.</li>
      <li>لا يحاول نمذجة كل أوجه الاختلاف النصي في القراءات؛ تركيزه على حدود الآيات وترقيمها.</li>
      <li>لا يطلب من المختص أن يراجع المصفوفة المولدة أولًا، بل يسأل السؤال الأصغر والأقرب للطبيعة: هل يعد هذا الموضع رأس آية هنا أم لا؟</li>
    </ul>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">كيف يُراجع</div>
    <h2 class="section_title mt-4 text-2xl">سير العمل الموجه للمختص صغير عمدًا.</h2>
    <ol class="doc_list mt-4 text-sm text-ink-soft">
      <li>اقرأ الموضع المختلف فيه على أنه دعوى حدودية، لا على أنه خريطة مطور.</li>
      <li>تحقق هل النظام المذكور يعد ذلك الموضع رأس آية أم لا.</li>
      <li>أثبت كلمة الارتكاز، وهل الموضع نهاية آية أم فاصل داخلي.</li>
      <li>سجل الشاهد في الملف الجانبي للشواهد، أو علّم الموضع مختلفًا فيه أو غير محسوم إذا لم تنطبق المصادر على صورة واحدة.</li>
    </ol>
    <div class="mt-6 flex flex-wrap gap-3">
      <a class="pill_button" href="/compare">افتح عرض المقارنة</a>
      <a class="pill_button" href="/explorer">افتح المستكشف</a>
    </div>
  </div>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">القراءة التالية النافعة</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h2 class="section_title">استخدم البيانات في التطبيق من غير أن تعيد حل المسألة العلمية كلها</h2>
      <p class="section_text mt-3 text-sm">
        تعرض صفحة المطور الطريق العملي الأبسط: ثبّت محورًا ترقيميًا واحدًا، ثم استعمل الخرائط الأمامية والعكسية المولدة فقط عند الحاجة إلى تغيير الترقيم.
      </p>
    </div>
    <a class="pill_button" data-tone="accent" href="/developer">
      افتح صفحة المطور
      <ArrowRightIcon class="size-4" />
    </a>
  </div>
</section>
