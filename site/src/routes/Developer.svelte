<script>
import { ArrowRightIcon } from '@lucide/svelte'

import { get_grouped_docs } from '$lib/docs.js'
import { get_current_language } from '$lib/i18n.js'

let current_language = $derived(get_current_language())
let technical_doc_groups = $derived(
  get_grouped_docs(current_language, { include_internal: true })
    .map(group => ({
      ...group,
      docs: group.docs.filter(doc => group.internal || doc.internal)
    }))
    .filter(group => group.docs.length)
)

const load_json_example = `async function load_json(path) {
  const response = await fetch(path)
  return response.json()
}`

const forward_example = `const kufi_to_madani_last = await load_json(
  'dist/mappings/by-counting-system/kufi-to-madani-last.json'
)

function map_from_hafs(mapping, surah, hafs_ayah) {
  return mapping.surahs[String(surah)].ayahs[String(hafs_ayah)]
}

const entry = map_from_hafs(kufi_to_madani_last, 1, 1)
// => { target_ayah: 1, status: 'merged', merges_with_next: true }

const target_number = entry.target_ayah
// show 1 in your target numbering layer`

const reverse_example = `const madani_last_to_kufi = await load_json(
  'dist/mappings/by-counting-system/madani-last-to-kufi.json'
)

function map_to_hafs(reverse_mapping, surah, target_ayah) {
  return reverse_mapping.surahs[String(surah)].ayahs[String(target_ayah)]
}

const entry = map_to_hafs(madani_last_to_kufi, 1, 1)
// => { hafs_ayah: 1, hafs_ayahs: [1, 2], status: 'covers_multiple' }

const normalized_hafs_ayah = entry.hafs_ayah`

const rawi_example = `const warsh = await load_json('dist/rawis/warsh.json')
// warsh._counting_system === 'madani-last'
// warsh._mapping_file === 'mappings/by-counting-system/kufi-to-madani-last.json'

const hafs_to_warsh = await load_json('dist/mappings/by-rawi/hafs-to-warsh.json')
const entry = hafs_to_warsh.surahs['1'].ayahs['7']
// => { target_ayah: 6, status: 'split', splits_into: [6, 7] }`

const counts_example = `const counts = await load_json('dist/surah-counts/madani-last.json')
const al_baqarah_count = counts.surahs['2']
// => 285`
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-start">
  <div>
    <div class="rule_label">استخدام المطور</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">استعمل ملفات الربط من غير أن تعقد تطبيقك.</h1>
    <p class="section_text mt-5 text-lg">
      القاعدة الأبسط لمعظم التطبيقات: ثبّت محورًا واحدًا داخليًا، ثم حوّل منه فقط عند العرض أو الإدخال.
      وهذه البيانات تختار لك هذا المحور سلفًا: الكوفي/حفص.
    </p>
    <p class="section_text mt-4 text-sm text-ink-soft">
      هذه البيانات للترقيم فقط، لا للنص نفسه. أرقام السور ثابتة، والمتغير هو حدود الآيات وأرقامها.
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href={window.navgo.href('/project')}>
        اقرأ دليل المشروع
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" href={window.navgo.href('/explorer')}>شاهد أمثلة حية في المستكشف</a>
    </div>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">نقطة البداية الأبسط</div>
    <h2 class="mt-4 text-2xl font-bold text-ink">معظم التطبيقات لا تحتاج إلا إلى أربعة أشياء.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li><span class="font-bold text-ink">الربط الأمامي</span> لتحويل حفص/الكوفي إلى ترقيم الهدف</li>
      <li><span class="font-bold text-ink">الربط العكسي</span> لإرجاع ترقيم الهدف إلى حفص/الكوفي</li>
      <li><span class="font-bold text-ink">بيانات الراوي</span> عندما يختار المستخدم الرواية لا اسم مذهب العدّ</li>
      <li><span class="font-bold text-ink">أعداد السور</span> عندما تحتاج مجموع آيات كل سورة داخل مذهب عدّ معين</li>
    </ul>
  </div>
</section>

{#if technical_doc_groups.length > 0}
  <section class="mt-12 surface p-5 sm:p-6">
    <div class="rule_label">وثائق المطور</div>
    <h2 class="section_title mt-4">التفاصيل الفنية انتقلت إلى هذا المسار.</h2>
    <p class="section_text mt-3 text-sm">
      هذه الروابط مخصصة لمن يحتاج بنية الملفات، وحزم المصادر، وعقود البيانات. لذلك لا تظهر في مكتبة الباحث العامة.
    </p>

    <div class="doc_grid mt-6" data-columns="3">
      {#each technical_doc_groups as group (group.id)}
        {#each group.docs as doc (doc.slug)}
          <a class="surface surface_muted flex h-full flex-col gap-3 p-4" href={window.navgo.href('/docs/' + doc.slug)}>
            <div class="metric_label">{group.title}</div>
            <h3 class="text-lg font-bold text-ink" dir={doc.direction}>{doc.title}</h3>
            <p class="section_text text-sm" dir={doc.direction}>{doc.excerpt}</p>
          </a>
        {/each}
      {/each}
    </div>
  </section>
{/if}

<section class="mt-12 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الملف ١</div>
    <h2 class="section_title mt-4 text-2xl">الربط الأمامي</h2>
    <p class="section_text mt-3 text-sm">
      استخدم <span class="inline_code">dist/mappings/by-counting-system/kufi-to-*.json</span> إذا كان تطبيقك يخزن حفص/الكوفي أصلًا ويحتاج فقط إلى عرض مذهب عدّ آخر.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الملف ٢</div>
    <h2 class="section_title mt-4 text-2xl">الربط العكسي</h2>
    <p class="section_text mt-3 text-sm">
      استخدم <span class="inline_code">dist/mappings/by-counting-system/*-to-kufi.json</span> إذا كان الإدخال أو المصدر الخارجي يأتي بترقيم غير كوفي/حفصي وتريد إرجاعه إلى المحور الداخلي.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الملف ٣</div>
    <h2 class="section_title mt-4 text-2xl">بيانات الراوي</h2>
    <p class="section_text mt-3 text-sm">
      استخدم <span class="inline_code">dist/rawis/&#123;rawi&#125;.json</span> إذا كانت واجهتك مبنية على أسماء الرواة مثل ورش أو قالون. هذه البيانات تخبرك أي مذهب عدّ يتبعه الراوي.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الملف ٤</div>
    <h2 class="section_title mt-4 text-2xl">أعداد السور</h2>
    <p class="section_text mt-3 text-sm">
      استخدم <span class="inline_code">dist/surah-counts/&#123;system&#125;.json</span> للتحقق، ولمجاميع الواجهة، ولعناصر التنقل التي تحتاج عدد آيات السورة.
    </p>
  </div>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">محمّل أساسي</div>
  <h2 class="section_title mt-4">حمّل JSON بالطريقة التي تناسب مكدسك</h2>
  <p class="section_text mt-3 text-sm">
    الأمثلة أدناه تستعمل مساعدًا صغيرًا في المتصفح. استبدله بمحمّل الملفات أو نظام الاستيراد الذي تعتمد عليه.
  </p>
  <pre class="code_block mt-5"><code>{load_json_example}</code></pre>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">مثال ١</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h2 class="section_title">حوّل من حفص/الكوفي إلى ترقيم آخر</h2>
      <p class="section_text mt-3 text-sm">
        هذه هي الحالة الأشهر: لديك مرجع حفصي وتريد رقمه في مذهب عدّ آخر.
      </p>
    </div>
    <span class="stat_chip">الربط الأمامي</span>
  </div>
  <pre class="code_block mt-5"><code>{forward_example}</code></pre>
  <p class="section_text mt-4 text-sm">
    في هذا المثال يبقى رقم الهدف <span class="inline_code">1</span>، لكن <span class="inline_code">merged</span> تعني أن آية الهدف تغطي أكثر من آية حفصية.
  </p>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">مثال ٢</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h2 class="section_title">أعد ترقيمًا آخر إلى محور حفص</h2>
      <p class="section_text mt-3 text-sm">
        استعمل الربط العكسي إذا أدخل المستخدم رقمًا على مذهب عدّ آخر، أو جاءك مصدر خارجي غير حفصي.
      </p>
    </div>
    <span class="stat_chip">الربط العكسي</span>
  </div>
  <pre class="code_block mt-5"><code>{reverse_example}</code></pre>
  <p class="section_text mt-4 text-sm">
    عندما تكون الحالة <span class="inline_code">covers_multiple</span> فإن آية الهدف تغطي عدة آيات متتالية على ضبط حفص. البداية في <span class="inline_code">hafs_ayah</span> والمدى الكامل في <span class="inline_code">hafs_ayahs</span>.
  </p>
</section>

<section class="mt-14 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">مثال ٣</div>
    <h2 class="section_title mt-4 text-2xl">اربط اسم الراوي بمذهب عدّه</h2>
    <p class="section_text mt-3 text-sm">
      إذا كان المستخدم يختار ورشًا أو قالون أو الدوري أو غيرهم، فابدأ ببيانات الراوي. منها تعرف ملف مذهب العدّ المطلوب.
    </p>
    <pre class="code_block mt-5"><code>{rawi_example}</code></pre>
    <p class="section_text mt-4 text-sm">
      إذا كان تطبيقك يعرف بالفعل معرّف مذهب العدّ، فتجاوز طبقة الراوي واستعمل ملفات الربط بحسب مذهب العدّ مباشرة.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">مثال ٤</div>
    <h2 class="section_title mt-4 text-2xl">اقرأ عدد آيات السورة</h2>
    <p class="section_text mt-3 text-sm">
      استخدم أعداد السور عندما تحتاج عناصر الواجهة أو أدوات التحقق إلى عدد آيات السورة داخل مذهب عدّ معين.
    </p>
    <pre class="code_block mt-5"><code>{counts_example}</code></pre>
  </div>
</section>

<section class="mt-14 doc_grid" data-columns="3">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الحالة</div>
    <h2 class="section_title mt-4 text-2xl"><span class="inline_code">mapped</span></h2>
    <p class="section_text mt-3 text-sm">مطابقة عادية واحد إلى واحد: آية واحدة في حفص تقابل آية واحدة في مذهب العدّ الهدف.</p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الحالة</div>
    <h2 class="section_title mt-4 text-2xl"><span class="inline_code">merged</span></h2>
    <p class="section_text mt-3 text-sm">
      تعني أن هذه الآية على ضبط حفص لا تنتهي بوصفها آية مستقلة في مذهب العدّ الهدف، بل تستمر مادتها إلى تغطية الآية التالية.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الحالة</div>
    <h2 class="section_title mt-4 text-2xl"><span class="inline_code">split</span></h2>
    <p class="section_text mt-3 text-sm">
      تعني أن آية واحدة على ضبط حفص تنقسم إلى عدة آيات في الهدف. اقرأ المدى الكامل في <span class="inline_code">splits_into</span>.
    </p>
  </div>
</section>

<section class="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)] xl:items-start">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">قواعد عملية</div>
    <h2 class="section_title mt-4">عادات صغيرة تجعل الدمج أنظف.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li>احتفظ بمحور ترقيم داخلي واحد. وفي هذه البيانات ذلك المحور هو الكوفي/حفص.</li>
      <li>لا تستنتج الترقيم من مجموع عدد الآيات وحده.</li>
      <li>افصل طبقة التحويل عن طبقة النص القرآني عندك.</li>
      <li>إذا كنت تدعم مذهب عدّ واحدًا غير كوفي فقط، فحمّل ملفيه الأمامي والعكسي وحدهما.</li>
      <li>إذا كانت واجهتك تُظهر أسماء الرواة، فاستخدم بيانات الراوي لاختيار ملف مذهب العدّ الصحيح.</li>
      <li>الرواة الكوفيون يطابقون حفصًا في الترقيم، فلا يحتاجون طبقة تحويل مستقلة.</li>
    </ul>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">خطأ شائع</div>
    <h3 class="mt-4 text-2xl font-bold text-ink">هذه البيانات لا تخبرك كيف ترسم النص نفسه.</h3>
    <p class="section_text mt-3 text-sm">
      هي تخبرك فقط كيف يتحول الترقيم. أما الكلمات والرسم فخذها من مصدر النص أو بيانات المصحف التي تعتمدها.
    </p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a class="pill_button" href={window.navgo.href('/project')}>لماذا بُني المشروع بهذه الصورة</a>
      <a class="pill_button" data-tone="accent" href={window.navgo.href('/developer/diagnostics')}>
        افتح تشخيص المطور
        <ArrowRightIcon class="size-4" />
      </a>
    </div>
  </div>
</section>

<section class="mt-14 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">موقع العرض</div>
    <h2 class="section_title mt-4 text-2xl">ما الذي يشغّل الواجهة</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li><span class="font-bold text-ink">المكدس</span> Svelte 5، وVite، وNavgo، وObservable Plot، وLayerChart، وWuchale.</li>
      <li><span class="font-bold text-ink">ملف البيانات</span> <span class="inline_code">src/lib/data/generated/site-data.json</span></li>
      <li>تقرأ الواجهة منه المجاميع، وملخصات مذاهب العدّ والسور، وصفوف الخلاف، ومصفوفة المسافات، وسلاسل الانجراف.</li>
    </ul>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">المسارات الأساسية</div>
    <h2 class="section_title mt-4 text-2xl">دليل سريع لأقسام الموقع.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li><span class="inline_code">/</span> للمدخل العام.</li>
      <li><span class="inline_code">/mushaf</span> لاختيار السورة ومذهب العدّ قبل فتح عارض المصحف.</li>
      <li><span class="inline_code">/developer/diagnostics</span> لأدوات التشخيص وتخطيط المراجعة.</li>
      <li><span class="inline_code">/developer</span> للدليل العملي ودمج البيانات.</li>
      <li><span class="inline_code">/ayah-counts</span> لجدول أعداد الآي المقبولة.</li>
      <li><span class="inline_code">/explorer</span> للمستكشف القابل للترشيح.</li>
      <li><span class="inline_code">/project</span> للدليل العام للمشروع.</li>
      <li><span class="inline_code">/madhhabs/:madhhab</span> لملف مذهب العدّ المختار، مع بقاء <span class="inline_code">/systems/:madhhab</span> كتوافق خلفي.</li>
      <li><span class="inline_code">/surahs/:surah</span> لصفحة السورة وتفصيل رؤوس الآي فيها.</li>
    </ul>
  </div>
</section>

<section class="mt-14 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">تشغيل موقع العرض</div>
    <h2 class="section_title mt-4 text-2xl">تشغيل محلي</h2>
    <pre class="code_block mt-5"><code>pnpm install
pnpm dev
pnpm build</code></pre>
    <p class="section_text mt-4 text-sm">
      أمر البناء يشغّل <span class="inline_code">vite build</span> ثم يجهّز ملفات النشر للمسارات العميقة.
    </p>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">ملاحظات نشر</div>
    <h2 class="section_title mt-4 text-2xl">إذا كان الموقع تحت مسار فرعي</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li>مرّر <span class="inline_code">BASE_PATH</span> إلى Vite حتى تبقى الأصول والمسارات صحيحة.</li>
      <li>يكتب البناء <span class="inline_code">dist/404.html</span> و <span class="inline_code">dist/.nojekyll</span> حتى تعمل الروابط العميقة بعد النشر.</li>
    </ul>
  </div>
</section>
