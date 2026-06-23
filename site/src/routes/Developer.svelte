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
</script>

<section class="max-w-4xl">
  <div class="rule_label">استخدام المطور</div>
  <h1 class="page_title mt-5 text-ink">استعمل ملفات الربط من غير أن تعقد تطبيقك.</h1>
  <p class="section_text mt-5 text-lg">
    ثبّت محورًا داخليًا واحدًا، ثم حوّل منه فقط عند العرض أو الإدخال. في هذه البيانات يكون المحور العملي هو الكوفي/حفص.
  </p>
  <p class="section_text mt-4 text-sm">
    هذه الصفحة ثانوية وموجهة لمن يدمج البيانات أو يراجعها. مسار الباحث يبدأ من المصحف وأعداد الآي والبحث.
  </p>

  <div class="mt-8 flex flex-wrap gap-3">
    <a class="pill_button" href={window.navgo.href('/project')}>اقرأ دليل المشروع</a>
    <a class="pill_button" data-tone="accent" href={window.navgo.href('/developer/diagnostics')}>
      افتح تشخيص المطور
      <ArrowRightIcon class="size-4" />
    </a>
  </div>
</section>

<section class="mt-12 max-w-5xl border-t border-line/70 pt-8">
  <div class="rule_label">الملفات الأساسية</div>
  <h2 class="section_title mt-4">معظم التطبيقات تحتاج هذه الملفات فقط.</h2>

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
          <td>لإرجاع ترقيم خارجي إلى المحور الداخلي.</td>
        </tr>
        <tr>
          <td><span class="inline_code">dist/rawis/&#123;rawi&#125;.json</span></td>
          <td>عندما يبدأ تطبيقك من اسم الراوي لا من اسم مذهب العدّ.</td>
        </tr>
        <tr>
          <td><span class="inline_code">dist/surah-counts/&#123;system&#125;.json</span></td>
          <td>لعرض عدد آيات السورة أو التحقق من حدود التنقل.</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section class="mt-12 max-w-5xl border-t border-line/70 pt-8">
  <div class="rule_label">أمثلة قصيرة</div>
  <h2 class="section_title mt-4">ابدأ بالمحمّل ثم افتح المثال الذي تحتاجه.</h2>

  <div class="mt-6 grid gap-5">
    <details class="border-b border-line/70 pb-5" open>
      <summary class="cursor-pointer font-bold text-ink">محمّل JSON أساسي</summary>
      <p class="section_text mt-3 text-sm">استبدله بمحمّل الملفات أو نظام الاستيراد الذي تعتمد عليه.</p>
      <pre class="code_block mt-4"><code>{load_json_example}</code></pre>
    </details>

    <details class="border-b border-line/70 pb-5">
      <summary class="cursor-pointer font-bold text-ink">حوّل من حفص/الكوفي إلى مذهب عدّ آخر</summary>
      <pre class="code_block mt-4"><code>{forward_example}</code></pre>
    </details>

    <details class="border-b border-line/70 pb-5">
      <summary class="cursor-pointer font-bold text-ink">أعد ترقيمًا آخر إلى حفص/الكوفي</summary>
      <pre class="code_block mt-4"><code>{reverse_example}</code></pre>
    </details>

    <details class="border-b border-line/70 pb-5">
      <summary class="cursor-pointer font-bold text-ink">اربط الراوي بمذهب العدّ</summary>
      <pre class="code_block mt-4"><code>{rawi_example}</code></pre>
    </details>

    <details class="border-b border-line/70 pb-5">
      <summary class="cursor-pointer font-bold text-ink">اقرأ عدد آيات السورة</summary>
      <pre class="code_block mt-4"><code>{counts_example}</code></pre>
    </details>
  </div>
</section>

<section class="mt-12 max-w-5xl border-t border-line/70 pt-8">
  <div class="rule_label">قواعد عملية</div>
  <ul class="doc_list mt-5 text-ink-soft">
    <li>لا تستنتج الترقيم من مجموع عدد الآيات وحده.</li>
    <li>افصل طبقة التحويل عن طبقة النص القرآني عندك.</li>
    <li>إذا كانت واجهتك تُظهر أسماء الرواة، فاستخدم بيانات الراوي لاختيار ملف مذهب العدّ الصحيح.</li>
    <li>الرواة الكوفيون يطابقون حفصًا في الترقيم، فلا يحتاجون طبقة تحويل مستقلة.</li>
  </ul>
</section>

{#if technical_doc_groups.length > 0}
  <section class="mt-12 max-w-5xl border-t border-line/70 pt-8">
    <div class="rule_label">وثائق المطور</div>
    <h2 class="section_title mt-4">تفاصيل البنية وحزم المصادر.</h2>
    <div class="mt-6 grid gap-6">
      {#each technical_doc_groups as group (group.id)}
        <section>
          <h3 class="text-lg font-bold text-ink">{group.title}</h3>
          <div class="mt-3 grid gap-3">
            {#each group.docs as doc (doc.slug)}
              <a class="block border-b border-line/70 pb-3 last:border-b-0" href={window.navgo.href('/docs/' + doc.slug)}>
                <div class="font-bold text-ink" dir={doc.direction}>{doc.title}</div>
                <p class="section_text mt-1 text-sm" dir={doc.direction}>{doc.excerpt}</p>
              </a>
            {/each}
          </div>
        </section>
      {/each}
    </div>
  </section>
{/if}

<section class="mt-12 max-w-5xl border-t border-line/70 pt-8">
  <div class="rule_label">تشغيل محلي</div>
  <pre class="code_block mt-5"><code>pnpm install
pnpm dev
pnpm build</code></pre>
  <p class="section_text mt-4 text-sm">
    إذا كان الموقع تحت مسار فرعي، مرّر <span class="inline_code">BASE_PATH</span> إلى Vite حتى تبقى الأصول والمسارات صحيحة.
  </p>
</section>
