<script>
import { ArrowRightIcon } from '@lucide/svelte'


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
    <h1 class="display_title mt-5 max-w-4xl text-ink">استعمل الخرائط من غير أن تعقد تطبيقك.</h1>
    <p class="section_text mt-5 text-lg">
      القاعدة البسيطة لمعظم تطبيقات القرآن هي: ثبّت محورًا واحدًا داخليًا، ثم حوّل منه فقط حين تحتاج إلى إظهار نظام ترقيم آخر أو استقبال مدخل به.
      وهذه البيانات تختار ذلك المحور عنك سلفًا: الكوفي/حفص.
    </p>
    <p class="section_text mt-4 text-sm text-ink-soft">
      البيانات هنا خاصة بالترقيم، لا بتحميل نص القرآن نفسه. اربطها بطبقة النص أو الواجهة البرمجية التي تعتمدها. أرقام السور ثابتة، والمتغير هو حدود الآيات وأرقامها.
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href="/project">
        اقرأ دليل المشروع
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" href="/explorer">شاهد أمثلة حية في المستكشف</a>
    </div>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">نقطة البداية الأبسط</div>
    <h2 class="mt-4 text-2xl font-bold text-ink">معظم التطبيقات لا تحتاج إلا إلى أربعة أشياء.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li><span class="font-bold text-ink">الخريطة الأمامية</span> لتحويل حفص/الكوفي إلى ترقيم الهدف</li>
      <li><span class="font-bold text-ink">الخريطة العكسية</span> لإرجاع ترقيم الهدف إلى حفص/الكوفي</li>
      <li><span class="font-bold text-ink">بيانات الراوي</span> عندما يختار المستخدم الرواية لا اسم نظام العد</li>
      <li><span class="font-bold text-ink">أعداد السور</span> عندما تحتاج مجموع آيات كل سورة داخل نظام معين</li>
    </ul>
  </div>
</section>

<section class="mt-12 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الملف ١</div>
    <h2 class="section_title mt-4 text-2xl">الخريطة الأمامية</h2>
    <p class="section_text mt-3 text-sm">
      استخدم <span class="inline_code">dist/mappings/by-counting-system/kufi-to-*.json</span> إذا كان تطبيقك يخزن أرقام حفص/الكوفي أصلًا، ويحتاج فقط إلى عرض نظام آخر.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الملف ٢</div>
    <h2 class="section_title mt-4 text-2xl">الخريطة العكسية</h2>
    <p class="section_text mt-3 text-sm">
      استخدم <span class="inline_code">dist/mappings/by-counting-system/*-to-kufi.json</span> إذا كان مدخل المستخدم أو بيانات خارجية تأتي بنظام غير حفص، وتريد إرجاعها إلى المحور الداخلي.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الملف ٣</div>
    <h2 class="section_title mt-4 text-2xl">بيانات الراوي</h2>
    <p class="section_text mt-3 text-sm">
      استخدم <span class="inline_code">dist/rawis/&#123;rawi&#125;.json</span> إذا كانت واجهتك منظمة بحسب أسماء الرواة مثل ورش أو قالون. هذه البيانات تخبرك أي نظام عد يتبع ذلك الراوي.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الملف ٤</div>
    <h2 class="section_title mt-4 text-2xl">أعداد السور</h2>
    <p class="section_text mt-3 text-sm">
      استخدم <span class="inline_code">dist/surah-counts/&#123;system&#125;.json</span> للتحقق، أو لمجاميع الواجهة، أو لعناصر التنقل التي تحتاج عدد آيات السورة داخل نظام معين.
    </p>
  </div>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">محمّل أساسي</div>
  <h2 class="section_title mt-4">حمّل JSON بالطريقة التي تناسب مكدسك</h2>
  <p class="section_text mt-3 text-sm">
    تستخدم الأمثلة أدناه مساعدًا صغيرًا في المتصفح. استبدله بمحمّل الملفات أو نظام الاستيراد أو طبقة التخزين التي تعتمدها.
  </p>
  <pre class="code_block mt-5"><code>{load_json_example}</code></pre>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">مثال ١</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h2 class="section_title">حوّل من حفص/الكوفي إلى نظام ترقيم آخر</h2>
      <p class="section_text mt-3 text-sm">
        هذه أكثر حالة شيوعًا في التطبيقات: لديك مرجع على ضبط حفص، وتريد رقم الآية المطابق له في نظام آخر.
      </p>
    </div>
    <span class="stat_chip">الخريطة الأمامية</span>
  </div>
  <pre class="code_block mt-5"><code>{forward_example}</code></pre>
  <p class="section_text mt-4 text-sm">
    في هذا المثال يبقى رقم الهدف <span class="inline_code">1</span> لكن الحالة <span class="inline_code">merged</span> تعني أن آية الهدف هذه تغطي أكثر من آية واحدة على ضبط حفص.
  </p>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">مثال ٢</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h2 class="section_title">أعد نظامًا آخر إلى محور حفص</h2>
      <p class="section_text mt-3 text-sm">
        استعمل الخريطة العكسية حين يكتب المستخدم رقم آية على نظام آخر، أو حين تأتي البيانات من مصدر خارجي غير حفصي.
      </p>
    </div>
    <span class="stat_chip">الخريطة العكسية</span>
  </div>
  <pre class="code_block mt-5"><code>{reverse_example}</code></pre>
  <p class="section_text mt-4 text-sm">
    عندما تكون الحالة <span class="inline_code">covers_multiple</span> فإن آية الهدف تغطي عدة آيات متتالية على ضبط حفص. أولها يظهر في <span class="inline_code">hafs_ayah</span> والمدى الكامل في <span class="inline_code">hafs_ayahs</span>.
  </p>
</section>

<section class="mt-14 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">مثال ٣</div>
    <h2 class="section_title mt-4 text-2xl">اربط اسم الراوي بنظام عدِّه</h2>
    <p class="section_text mt-3 text-sm">
      إذا كان المستخدم يختار ورشًا أو قالون أو الدوري أو غيرهم، فابدأ ببيانات الراوي. هي التي تحدد لك أي ملف من ملفات أنظمة العد تحتاج.
    </p>
    <pre class="code_block mt-5"><code>{rawi_example}</code></pre>
    <p class="section_text mt-4 text-sm">
      إذا كان تطبيقك يعرف بالفعل معرّف نظام العد، فتجاوز طبقة الراوي واستعمل الخرائط بحسب النظام مباشرة.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">مثال ٤</div>
    <h2 class="section_title mt-4 text-2xl">اقرأ عدد آيات السورة</h2>
    <p class="section_text mt-3 text-sm">
      استخدم أعداد السور بحسب النظام متى احتاجت عناصر الواجهة أو أدوات التحقق إلى معرفة عدد آيات السورة داخل ذلك النظام.
    </p>
    <pre class="code_block mt-5"><code>{counts_example}</code></pre>
  </div>
</section>

<section class="mt-14 doc_grid" data-columns="3">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الحالة</div>
    <h2 class="section_title mt-4 text-2xl"><span class="inline_code">mapped</span></h2>
    <p class="section_text mt-3 text-sm">مطابقة عادية واحد إلى واحد: آية واحدة في حفص تقابل آية واحدة في نظام الهدف.</p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">الحالة</div>
    <h2 class="section_title mt-4 text-2xl"><span class="inline_code">merged</span></h2>
    <p class="section_text mt-3 text-sm">
      تعني أن هذه الآية على ضبط حفص لا تنتهي بوصفها آية مستقلة في نظام الهدف، بل تستمر مادتها إلى تغطية الآية التالية.
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
    <h2 class="section_title mt-4">بعض العادات الصغيرة تجعل الدمج أنظف.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li>احتفظ بمحور ترقيم داخلي واحد. وفي هذه البيانات ذلك المحور هو الكوفي/حفص.</li>
      <li>لا تستنتج الترقيم من مجموع عدد الآيات وحده.</li>
      <li>افصل طبقة التحويل عن طبقة النص القرآني عندك.</li>
      <li>إذا كنت تدعم نظامًا واحدًا غير حفصي فقط، فحمّل ملفيه الأمامي والعكسي وحدهما.</li>
      <li>إذا كانت واجهتك تُظهر أسماء الرواة، فاستخدم بيانات الراوي لاختيار ملف نظام العد الصحيح.</li>
      <li>الرواة الكوفيون يطابقون حفصًا في الترقيم، فلا يحتاجون طبقة تحويل مستقلة.</li>
    </ul>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">خطأ شائع</div>
    <h3 class="mt-4 text-2xl font-bold text-ink">هذه البيانات لا تخبرك كيف ترسم النص نفسه.</h3>
    <p class="section_text mt-3 text-sm">
      هي تخبرك فقط كيف يتحول ترقيم الآيات. أما الكلمات والرسوم فخذها من مصدر النص أو بيانات المصحف أو الواجهة البرمجية التي تعتمدها.
    </p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a class="pill_button" href="/project">لماذا بُني المشروع بهذه الصورة</a>
      <a class="pill_button" data-tone="accent" href="/compare">
        قارن بين الأنظمة مباشرة
        <ArrowRightIcon class="size-4" />
      </a>
    </div>
  </div>
</section>

<section class="mt-14 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">حول موقع العرض</div>
    <h2 class="section_title mt-4 text-2xl">الملاحظات التقنية الخاصة بالموقع نفسه صارت هنا داخل التطبيق.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li><span class="font-bold text-ink">المكدس</span> Svelte 5، وVite، وNavgo، وObservable Plot، وLayerChart، وWuchale.</li>
      <li><span class="font-bold text-ink">ملف البيانات</span> <span class="inline_code">src/lib/data/generated/site-data.json</span></li>
      <li>يولَّد هذا الملف من مسار <span class="inline_code">npm run generate</span> في جذر المستودع، ثم يستهلكه الموقع مباشرة.</li>
      <li>ويحمل المجاميع العامة، وملخصات الأنظمة والسور، وصفوف المواضع المختلف فيها، ومصفوفة المسافات، وملفات التحقق، وسلاسل الانجراف.</li>
    </ul>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">المسارات الأساسية</div>
    <h2 class="section_title mt-4 text-2xl">خريطة سريعة لأقسام الموقع.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li><span class="inline_code">/</span> للنظرة العامة ومداخل الأنظمة.</li>
      <li><span class="inline_code">/compare</span> للمقارنة وتخطيط المراجعة.</li>
      <li><span class="inline_code">/developer</span> للدليل العملي ودمج البيانات.</li>
      <li><span class="inline_code">/explorer</span> للمستكشف القابل للترشيح.</li>
      <li><span class="inline_code">/project</span> للدليل العام للمشروع.</li>
      <li><span class="inline_code">/systems/:system</span> لملف نظام العد المختار.</li>
      <li><span class="inline_code">/surahs/:surah</span> لصفحة السورة وتفصيل مواضعها.</li>
    </ul>
  </div>
</section>

<section class="mt-14 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">تشغيل الموقع</div>
    <h2 class="section_title mt-4 text-2xl">ابدأ محليًا بهذه الأوامر.</h2>
    <pre class="code_block mt-5"><code>pnpm install
pnpm dev
pnpm build</code></pre>
    <p class="section_text mt-4 text-sm">
      أمر البناء يشغّل <span class="inline_code">vite build</span> ثم يحضّر ملفات GitHub Pages اللازمة.
    </p>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">النشر على GitHub Pages</div>
    <h2 class="section_title mt-4 text-2xl">هناك ثلاث قواعد صغيرة حتى تعمل الروابط العميقة كما ينبغي.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li>يشغّل مسار النشر أولًا توليد البيانات من جذر المستودع.</li>
      <li>يقرأ Vite المتغير <span class="inline_code">BASE_PATH</span> حتى تعمل الأصول والمسارات تحت مجلد المستودع.</li>
      <li>ويكتب البناء <span class="inline_code">dist/404.html</span> و <span class="inline_code">dist/.nojekyll</span> حتى تبقى صفحات المسارات العميقة عاملة.</li>
    </ul>
  </div>
</section>

