<script>
import { get_grouped_docs } from '$lib/docs.js'
import { get_current_language } from '$lib/i18n.js'

let current_language = $derived(get_current_language())
let grouped_docs = $derived(get_grouped_docs(current_language))
</script>

<section class="max-w-4xl">
  <div class="rule_label">الوثائق</div>
  <h1 class="page_title mt-5 text-ink">مكتبة مختصرة للباحث.</h1>
  <p class="section_text mt-5 text-base sm:text-lg">
    تضم هذه الصفحة الوثائق العامة فقط: التعريف بالمشروع، والمنهج، وإرشادات المراجعة العلمية. تفاصيل الملفات الفنية موجودة في صفحة المطور.
  </p>
</section>

<section class="mt-12 grid max-w-5xl gap-10">
  {#each grouped_docs as group (group.id)}
    <section class="border-t border-line/70 pt-7">
      <div class="rule_label">{group.title}</div>
      <h2 class="section_title mt-4 text-2xl">{group.description}</h2>

      <div class="mt-6 grid gap-5">
        {#each group.docs as doc (doc.slug)}
          <a class="block border-b border-line/70 pb-5 last:border-b-0" href={window.navgo.href('/docs/' + doc.slug)}>
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 class="text-xl font-bold text-ink" dir={doc.direction}>{doc.title}</h3>
              <span class="text-sm font-bold text-ink-soft">{doc.language === 'ar' ? 'عربي' : 'English'}</span>
            </div>
            <p class="section_text mt-2 text-sm" dir={doc.direction}>{doc.excerpt}</p>
          </a>
        {/each}
      </div>
    </section>
  {/each}
</section>
