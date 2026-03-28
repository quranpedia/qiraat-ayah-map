<script>
import { ArrowLeftIcon, ArrowRightIcon } from '@lucide/svelte'

import { compact_number, summary, systems } from '$lib/dataset.svelte.js'
import { app_href } from '$lib/nav.js'
</script>

<div class="arabic_doc" dir="rtl" lang="ar">
  <section class="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-start">
    <div>
      <div class="arabic_kicker">مدخل عربي</div>
      <h1 class="display_title mt-5 max-w-4xl text-ink">ما الذي يفعله هذا المشروع؟</h1>
      <p class="section_text mt-5 text-lg text-ink-soft">
        هذا المشروع أطلسٌ مرجعيٌّ لمواضع اختلاف رؤوس الآي بين أنظمة العد المشهورة، مع تحويل هذه المسألة العلمية القديمة إلى طبقة أصول
        مختصرة قابلة للمراجعة، ثم إلى خرائط ربط ومخرجات عملية قابلة لإعادة التوليد.
      </p>
      <p class="section_text mt-5 text-lg text-ink-soft">
        المقصود ليس أن يحل هذا العمل محل كتب العد، بل أن يجعل سؤالها الرئيس ظاهرًا وقابلًا للمراجعة في صورة صغيرة وواضحة:
        هل هذا الموضع معدود رأس آية هنا أم لا؟
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <a class="pill_button" data-tone="accent" href={app_href('/explorer')}>
          افتح المستكشف
          <ArrowLeftIcon class="size-4" />
        </a>
        <a class="pill_button" href={app_href('/project')}>English guide</a>
        <a class="pill_button" href={app_href('/developer')}>صفحة المطوِّرين</a>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
      <div class="surface p-5 sm:p-6">
        <div class="arabic_stat_label">أنظمة العد</div>
        <div class="arabic_metric_value mt-3 text-accent-strong">{compact_number(systems.length)}</div>
        <p class="section_text mt-3 text-sm text-ink-soft">يغطي المشروع الأنظمة الستة المعتمدة التي تدور عليها القراءات العشر.</p>
      </div>

      <div class="surface p-5 sm:p-6">
        <div class="arabic_stat_label">مواضع الخلاف</div>
        <div class="arabic_metric_value mt-3 text-ok">{compact_number(summary.total_points)}</div>
        <p class="section_text mt-3 text-sm text-ink-soft">كل صف هو موضع محدد يمكن أن يراجعه المختص في ضوء كتب العد.</p>
      </div>

      <div class="surface p-5 sm:p-6">
        <div class="arabic_stat_label">شواهد أولية هبطت</div>
        <div class="arabic_metric_value mt-3 text-alert">{compact_number(summary.evidence.points_with_primary_evidence)}</div>
        <p class="section_text mt-3 text-sm text-ink-soft">التوثيق الأولي يزاد موضعًا موضعًا، ولا يُفترض على مستوى النظام كله من غير بينة.</p>
      </div>
    </div>
  </section>

  <section class="mt-12 doc_grid" data-columns="3">
    <div class="surface p-5 sm:p-6">
      <div class="arabic_kicker">المشكلة</div>
      <h2 class="section_title mt-4 text-2xl">قد تبقى الألفاظ نفسها بينما يتغير رقم الآية.</h2>
      <p class="section_text mt-3 text-sm text-ink-soft">
        الخلاف هنا ليس في متن القرآن، وإنما في مواضع انتهاء الآيات وابتداء ما بعدها. فإذا عُدَّ الرأس في نظام ولم يُعَدَّ في آخر، انجرف
        الترقيم بعد ذلك الموضع.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <div class="arabic_kicker">الدافع</div>
      <h2 class="section_title mt-4 text-2xl">التطبيقات والتحقيقات تحتاج إلى جسر عددي ثابت.</h2>
      <p class="section_text mt-3 text-sm text-ink-soft">
        كثير من البرمجيات تتعامل مع <span class="inline_code">السورة + الآية</span> على أنه مرجع عالمي واحد. هذا غير صحيح دائمًا. المشروع يبني
        جسرًا واضحًا بين الأنظمة من غير تخمين.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <div class="arabic_kicker">ما الذي ننشره؟</div>
      <h2 class="section_title mt-4 text-2xl">طبقة أصول صغيرة، ثم مخرجات مولدة.</h2>
      <p class="section_text mt-3 text-sm text-ink-soft">
        المطلوب من المختص أن يراجع طبقة <span class="inline_code">data/</span> أولًا. أما الخرائط الكبيرة تحت <span class="inline_code">dist/</span> فهي ناتج مولد من تلك الطبقة، وليست الأصل العلمي الأول.
      </p>
    </div>
  </section>

  <section class="mt-14">
    <div class="arabic_kicker">المنهج</div>
    <h2 class="section_title mt-4 max-w-4xl">نبدأ بالسؤال الذي تسأله كتب العد، ثم نولد منه ما يحتاجه المطور.</h2>

    <div class="mt-6 doc_grid" data-columns="2">
      <div class="surface p-5 sm:p-6">
        <h3 class="text-2xl font-bold text-ink">١. اتخاذ محور تشغيلي واحد</h3>
        <p class="section_text mt-3 text-sm text-ink-soft">
          يعتمد المشروع الكوفي/حفص محورًا تشغيليًّا للربط. وليس هذا حكمًا في الأفضلية، وإنما اختيار عملي حتى تمر جميع التحويلات عبر مرجع واحد ثابت.
        </p>
      </div>

      <div class="surface p-5 sm:p-6">
        <h3 class="text-2xl font-bold text-ink">٢. تسجيل مواضع الخلاف فقط</h3>
        <p class="section_text mt-3 text-sm text-ink-soft">
          لا نحفظ الخرائط الضخمة يدويًّا. الأصل المختصر يسجل الرأس المختلف عليه مباشرة: إما في آخر آية كوفية، وإما داخلها.
        </p>
      </div>

      <div class="surface p-5 sm:p-6">
        <h3 class="text-2xl font-bold text-ink">٣. فصل الدعوى عن الشاهد</h3>
        <p class="section_text mt-3 text-sm text-ink-soft">
          لكل موضع سجل شواهد مستقل يضبط المصادر، وحالة التحقق، وملاحظات المراجعة. فلا تبدو المخرجات المولدة أرسخ مما تسمح به الكتب.
        </p>
      </div>

      <div class="surface p-5 sm:p-6">
        <h3 class="text-2xl font-bold text-ink">٤. توليد ما يحتاجه الاستعمال العملي</h3>
        <p class="section_text mt-3 text-sm text-ink-soft">
          من هذه الطبقة الصغيرة يولد المشروع خرائط الربط، والخرائط العكسية، وملفات الرواة، وعدد آيات السور، وملفات المراجعة، وبيانات الموقع.
        </p>
      </div>
    </div>
  </section>

  <section class="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] xl:items-start">
    <div class="surface p-5 sm:p-6">
      <div class="arabic_kicker">الضبط بالمصادر</div>
      <h2 class="section_title mt-4">كيف نربط البيانات بالأصول؟</h2>

      <div class="doc_flow mt-5">
        <p class="section_text text-sm text-ink-soft">
          المشروع لا يعد المجاميع وحدها بينة كافية، ولا يعامل سلوك المواقع أو التطبيقات العامة بوصفه أصلًا. لذلك بنيت له طبقة شواهد صريحة وقابلة للمراجعة.
        </p>

        <ul class="doc_list text-sm text-ink-soft">
          <li><span class="font-bold text-ink">الأصل الأولي أولًا.</span> إذا توفر في <span class="inline_code">البيان</span> تطابق مضبوط فهو أول شاهد يعتمد عليه المشروع.</li>
          <li><span class="font-bold text-ink">المتون والشروح شواهد مساعدة.</span> مثل <span class="inline_code">الفرائد الحسان</span> و<span class="inline_code">نفائس البيان</span> لتأكيد المواضع أو شرحها أو إبراز توتراتها.</li>
          <li><span class="font-bold text-ink">حالة تحقق معلنة.</span> كل موضع قد يكون موثقًا أوليًّا، أو ثانويًّا، أو مختلفًا فيه، أو غير محسوم، أو غير موثق بعد.</li>
          <li><span class="font-bold text-ink">المواضع المقلقة تبقى ظاهرة.</span> إذا لم ينسجم المصدر بسهولة مع الطبقة الحالية فلا يدفن الخلاف، بل يسجل ويترك للمراجعة.</li>
        </ul>
      </div>
    </div>

    <div class="surface surface_muted p-5 sm:p-6">
      <div class="arabic_kicker">حدود الدعوى</div>
      <h3 class="mt-4 text-2xl font-bold text-ink">هذا العمل أطلس مراجعة وضبط وربط، لا بديل عن كتب العد.</h3>
      <p class="section_text mt-3 text-sm text-ink-soft">
        موضوع المشروع هو اختلاف رؤوس الآي وآثاره على الترقيم. فهو لا يحاول وصف جميع أوجه الخلاف في القراءات، ولا اختراع مواضع جديدة من المجاميع وحدها.
      </p>
      <div class="mt-5 flex flex-wrap gap-2 text-sm text-ink-soft">
        <span class="stat_chip">لا اختراعات من المجاميع وحدها</span>
        <span class="stat_chip">لا تسوية صامتة للخلافات</span>
        <span class="stat_chip">مخرجات قابلة لإعادة التوليد</span>
      </div>
    </div>
  </section>

  <section class="mt-14 doc_grid" data-columns="2">
    <div class="surface p-5 sm:p-6">
      <div class="arabic_kicker">كيف تجري المراجعة؟</div>
      <h2 class="section_title mt-4 text-2xl">يبقى سؤال المراجعة صغيرًا وطبيعيًّا.</h2>
      <ol class="doc_list mt-4 text-sm text-ink-soft">
        <li>يقرأ المختص الموضع بوصفه دعوى حدٍّ للآية، لا بوصفه مصفوفة برمجية.</li>
        <li>يتحقق: هل هذا الموضع معدود رأس آية في العدد المذكور أم لا؟</li>
        <li>يتأكد من لفظة الإحالة، وهل الموضع رأس في آخر الآية أم رأس داخلي.</li>
        <li>يثبت الشاهد في طبقة التوثيق، أو يترك الموضع معلَّمًا بأنه مختلف فيه أو غير محسوم إن لم تنغلق الصورة.</li>
      </ol>
    </div>

    <div class="surface p-5 sm:p-6">
      <div class="arabic_kicker">من أين أبدأ؟</div>
      <h2 class="section_title mt-4 text-2xl">للقراءة العامة، ثم للمراجعة، ثم للاستعمال البرمجي.</h2>
      <div class="doc_flow mt-4 text-sm text-ink-soft">
        <p>ابدأ بهذه الصفحة إذا أردت فهم الفكرة من غير اصطلاح تقني كثيف.</p>
        <p>ثم انتقل إلى <span class="inline_code">dist/review/</span> أو إلى المستكشف والمقارنة في الموقع إذا أردت تصفح المواضع.</p>
        <p>ثم افتح صفحة المطوِّرين إذا كان همك دمج البيانات في تطبيق قرآن أو واجهة برمجة.</p>
      </div>
      <div class="mt-6 flex flex-wrap gap-3">
        <a class="pill_button" href={app_href('/compare')}>عرض المقارنة</a>
        <a class="pill_button" href={app_href('/developer')}>صفحة المطورين</a>
      </div>
    </div>
  </section>
</div>
