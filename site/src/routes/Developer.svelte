<script>
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

const forward_example = `const mapping = await load_json(
  'dist/mappings/by-counting-system/kufi-to-madani-last.json'
)

const entry = mapping.surahs['1'].ayahs['1']
// => { target_ayah: 1, status: 'merged', merges_with_next: true }`

const reverse_example = `const reverse = await load_json(
  'dist/mappings/by-counting-system/madani-last-to-kufi.json'
)

const entry = reverse.surahs['1'].ayahs['1']
// => { hafs_ayah: 1, hafs_ayahs: [1, 2], status: 'covers_multiple' }`

const rawi_example = `const warsh = await load_json('dist/rawis/warsh.json')
// warsh._counting_system === 'madani-last'
// warsh._mapping_file === 'mappings/by-counting-system/kufi-to-madani-last.json'`

const counts_example = `const counts = await load_json('dist/surah-counts/madani-last.json')
const al_baqarah_count = counts.surahs['2']
// => 285`

const forward_statuses = [
  { status: 'mapped', body: 'آية واحدة في حفص تقابل آية واحدة في المذهب المطلوب.', extra: '—' },
  { status: 'merged', body: 'الآية تُدمج مع التي بعدها في المذهب المطلوب.', extra: 'merges_with_next' },
  { status: 'split', body: 'الآية تُقسم إلى آيتين أو أكثر في المذهب المطلوب.', extra: 'splits_into' }
]

const reverse_statuses = [
  { status: 'mapped', body: 'آية واحدة تقابل آية واحدة في حفص.', extra: '—' },
  { status: 'covers_multiple', body: 'الآية الواحدة تقابل أكثر من آية في حفص.', extra: 'hafs_ayahs' }
]
</script>

<section class="leaf">
  <span class="marginal">استخدام المطور</span>
  <div class="leaf_body">
    <h1 class="page_title">حوّل أرقام الآيات بين مذاهب العدّ</h1>
    <p class="lede mt-5">
      احفظ أرقام الآيات في تطبيقك بترقيم حفص، وحوّلها إلى مذهب آخر عند العرض فقط.
    </p>

    <div class="mt-7 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href={window.navgo.href('/developer/diagnostics')}>افتح فحص البيانات</a>
      <a class="pill_button" href={window.navgo.href('/project')}>اقرأ دليل المشروع</a>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">البداية السريعة</span>
  <div class="leaf_body">
    <h2 class="section_title">خطوات الدمج</h2>
    <ol class="numbered_steps mt-7" style="color:var(--ink-soft)">
      <li>
        <div>
          <b>احفظ الأرقام بترقيم حفص.</b>
          <span>استعمله وحده في قاعدة البيانات وفي روابط التطبيق.</span>
        </div>
      </li>
      <li>
        <div>
          <b>حمّل ملفّي التحويل.</b>
          <span>واحد يحوّل من حفص إلى المذهب المطلوب، والآخر يحوّل منه إلى حفص.</span>
        </div>
      </li>
      <li>
        <div>
          <b>اقرأ حقل status مع الرقم.</b>
          <span>الرقم وحده لا يكفي: قد تكون الآية دُمجت مع التالية أو قُسمت إلى آيتين.</span>
        </div>
      </li>
    </ol>
  </div>
</section>

<section class="leaf">
  <span class="marginal">الملفات الأساسية</span>
  <div class="leaf_body" style="max-width:none">
    <h2 class="section_title">الملفات التي تحتاجها</h2>
    <div class="table_shell mt-6">
      <table class="data_table">
        <thead>
          <tr>
            <th>الملف</th>
            <th>متى تستخدمه</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="inline_code">dist/mappings/by-counting-system/kufi-to-*.json</span></td>
            <td>لتحويل رقم حفص/الكوفي إلى مذهب عدّ آخر عند العرض.</td>
          </tr>
          <tr>
            <td><span class="inline_code">dist/mappings/by-counting-system/*-to-kufi.json</span></td>
            <td>لتحويل رقم من مذهب آخر إلى ترقيم حفص.</td>
          </tr>
          <tr>
            <td><span class="inline_code">dist/rawis/&#123;rawi&#125;.json</span></td>
            <td>عندما يبدأ تطبيقك من اسم الراوي لا من اسم مذهب العدّ.</td>
          </tr>
          <tr>
            <td><span class="inline_code">dist/surah-counts/&#123;system&#125;.json</span></td>
            <td>لعرض عدد آيات السورة، أو للتحقق من صحة رقم الآية.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">قيم status</span>
  <div class="leaf_body" style="max-width:none">
    <h2 class="section_title">اقرأ حقل status قبل أن تعرض الرقم</h2>
    <p class="section_text mt-4">
      لكل آية في ملف التحويل حقل status يوضّح نوع التحويل. وإن تجاهلته، ستعرض أرقامًا خاطئة عند الآيات المدموجة أو المقسومة.
    </p>

    <h3 class="mt-7 font-bold" style="color:var(--rubric)">في ملفات التحويل من حفص</h3>
    <div class="table_shell mt-3">
      <table class="data_table">
        <thead>
          <tr><th>القيمة</th><th>معناها</th><th>حقل إضافي</th></tr>
        </thead>
        <tbody>
          {#each forward_statuses as row (row.status)}
            <tr>
              <td><span class="inline_code">{row.status}</span></td>
              <td>{row.body}</td>
              <td><span class="inline_code">{row.extra}</span></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <h3 class="mt-8 font-bold" style="color:var(--rubric)">في ملفات التحويل إلى حفص</h3>
    <div class="table_shell mt-3">
      <table class="data_table">
        <thead>
          <tr><th>القيمة</th><th>معناها</th><th>حقل إضافي</th></tr>
        </thead>
        <tbody>
          {#each reverse_statuses as row (row.status)}
            <tr>
              <td><span class="inline_code">{row.status}</span></td>
              <td>{row.body}</td>
              <td><span class="inline_code">{row.extra}</span></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">أمثلة قصيرة</span>
  <div class="leaf_body" style="max-width:none">
    <h2 class="section_title">انسخ المثال الذي تحتاجه</h2>

    <div class="mt-6 grid gap-5">
      <details class="border-b pb-5" style="border-color:var(--line)" open>
        <summary class="cursor-pointer font-bold" style="color:var(--ink)">دالة تحميل JSON</summary>
        <p class="section_text mt-3 text-sm">استبدلها بطريقة تحميل الملفات في مشروعك.</p>
        <pre class="code_block mt-4"><code>{load_json_example}</code></pre>
      </details>

      <details class="border-b pb-5" style="border-color:var(--line)">
        <summary class="cursor-pointer font-bold" style="color:var(--ink)">حوّل من حفص إلى مذهب آخر</summary>
        <p class="section_text mt-3 text-sm">
          الرقم لم يتغير، لكن <span class="inline_code">status: merged</span> يعني أن هذه الآية تُدمج مع التي بعدها.
        </p>
        <pre class="code_block mt-4"><code>{forward_example}</code></pre>
      </details>

      <details class="border-b pb-5" style="border-color:var(--line)">
        <summary class="cursor-pointer font-bold" style="color:var(--ink)">حوّل من مذهب آخر إلى حفص</summary>
        <p class="section_text mt-3 text-sm">
          عند <span class="inline_code">covers_multiple</span> استعمل المصفوفة <span class="inline_code">hafs_ayahs</span> كاملة، لا الرقم الأول فقط.
        </p>
        <pre class="code_block mt-4"><code>{reverse_example}</code></pre>
      </details>

      <details class="border-b pb-5" style="border-color:var(--line)">
        <summary class="cursor-pointer font-bold" style="color:var(--ink)">اربط الراوي بمذهب العدّ</summary>
        <pre class="code_block mt-4"><code>{rawi_example}</code></pre>
      </details>

      <details class="border-b pb-5" style="border-color:var(--line)">
        <summary class="cursor-pointer font-bold" style="color:var(--ink)">اقرأ عدد آيات السورة</summary>
        <pre class="code_block mt-4"><code>{counts_example}</code></pre>
      </details>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">قواعد عملية</span>
  <div class="leaf_body">
    <h2 class="section_title">تجنّب هذه الأخطاء</h2>
    <ul class="doc_list mt-5" style="color:var(--ink-soft)">
      <li>لا تعرف مذهب العدّ من مجموع الآيات وحده؛ فقد يتفق المجموع وتختلف المواضع، كما في الفاتحة.</li>
      <li>هذه البيانات للترقيم فقط، وليست نصًّا قرآنيًّا. احتفظ بنص المصحف في مصدر منفصل.</li>
      <li>إذا كانت واجهتك تُظهر أسماء الرواة، فاستخدم بيانات الراوي لاختيار ملف مذهب العدّ الصحيح.</li>
      <li>الرواة الكوفيون ترقيمهم مطابق لحفص، فلا يحتاجون تحويلًا.</li>
    </ul>
  </div>
</section>

{#if technical_doc_groups.length > 0}
  <section class="leaf">
    <span class="marginal">وثائق المطور</span>
    <div class="leaf_body">
      <h2 class="section_title">تفاصيل البنية وحزم المصادر</h2>
      <div class="mt-6 grid gap-8">
        {#each technical_doc_groups as group (group.id)}
          <section>
            <h3 class="font-bold" style="color:var(--rubric)">{group.title}</h3>
            {#if group.description}
              <p class="mt-1 text-sm" style="color:var(--ink-faint)">{group.description}</p>
            {/if}
            <dl class="gloss mt-4">
              {#each group.docs as doc (doc.slug)}
                <div>
                  <dt>
                    <a class="text_link" href={window.navgo.href('/docs/' + doc.slug)} dir={doc.direction}>{doc.title}</a>
                  </dt>
                  <dd dir={doc.direction}>{doc.excerpt}</dd>
                </div>
              {/each}
            </dl>
          </section>
        {/each}
      </div>
    </div>
  </section>
{/if}

<section class="leaf">
  <span class="marginal">تشغيل محلي</span>
  <div class="leaf_body">
    <h2 class="section_title">شغّل الموقع على جهازك</h2>
    <pre class="code_block mt-5"><code>pnpm install
pnpm dev
pnpm build</code></pre>
    <p class="section_text mt-4 text-sm">
      إذا نشرت الموقع في مسار فرعي، مرّر <span class="inline_code">BASE_PATH</span> إلى Vite.
    </p>
  </div>
</section>
