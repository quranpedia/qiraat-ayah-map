<script>
import { get_doc, get_doc_group, get_neighbor_docs } from '$lib/docs.js'
import { get_current_language } from '$lib/i18n.js'

const { slug } = $props()

function format_language(language) {
  return language === 'ar' ? 'عربي' : 'English'
}

let current_language = $derived(get_current_language())
let doc = $derived(get_doc(slug))
let group = $derived(doc ? get_doc_group(doc.group) : null)
let neighbors = $derived(get_neighbor_docs(slug))
let alternate_doc = $derived(doc?.alternateSlug ? get_doc(doc.alternateSlug) : null)
let same_language_as_ui = $derived(doc ? doc.language === current_language : false)
</script>

{#if !doc}
  <section class="grid gap-4">
    <div class="rule_label">الوثيقة غير موجودة</div>
    <h1 class="section_title mt-4">لا توجد وثيقة بهذا المعرّف داخل المكتبة.</h1>
    <div class="flex flex-wrap gap-3 pt-2">
      <a class="pill_button" href="/docs">ارجع إلى مكتبة الوثائق</a>
      <a class="pill_button" href="/project">دليل المشروع</a>
    </div>
  </section>
{:else}
  <section class="grid gap-6">
    <div class="flex flex-wrap items-center gap-3">
      <a class="pill_button" href="/docs">العودة إلى الوثائق</a>
      {#if group}
        <span class="stat_chip">{group.title}</span>
      {/if}
      <span class="stat_chip">{format_language(doc.language)}</span>
      <span class="stat_chip">{doc.headers.length} عنوانًا فرعيًا</span>
    </div>

    <section class="surface p-5 sm:p-7">
      <div class="rule_label">وثيقة كاملة</div>
      <h1 class="display_title mt-5 max-w-5xl text-ink" dir={doc.direction}>{doc.title}</h1>
      <p class="section_text mt-5 max-w-3xl text-base sm:text-lg" dir={doc.direction}>{doc.excerpt}</p>

      <div class="mt-5 flex flex-wrap gap-3">
        {#if alternate_doc}
          <a class="pill_button" href={`/docs/${alternate_doc.slug}`}>
            {alternate_doc.language === 'ar' ? 'افتح النسخة العربية' : 'Open the English version'}
          </a>
        {/if}

        {#if !same_language_as_ui}
          <span class="stat_chip">واجهة الموقع الآن بلغة مختلفة عن لغة هذه الوثيقة</span>
        {/if}
      </div>
    </section>

    {#if doc.headers.length}
      <section class="surface p-5 sm:p-6">
        <div class="rule_label">في هذه الصفحة</div>
        <div class="doc_grid mt-5" data-columns="3">
          {#each doc.headers as header (header.id)}
            <a class="surface surface_muted block p-4" href={`#${header.id}`}>
              <div class="metric_label">H{header.level}</div>
              <div class="mt-2 text-sm font-bold text-ink" dir={doc.direction}>{header.title}</div>
            </a>
          {/each}
        </div>
      </section>
    {/if}

    <article class="surface markdown_doc p-5 sm:p-8" lang={doc.language} dir={doc.direction}>
      {@html doc.html}
    </article>

    <section class="doc_grid" data-columns="2">
      {#if neighbors.previous}
        <a class="surface surface_muted h-full p-5 sm:p-6" href={`/docs/${neighbors.previous.slug}`}>
          <div class="metric_label">الوثيقة السابقة</div>
          <div class="mt-3 text-xl font-bold text-ink" dir={neighbors.previous.direction}>{neighbors.previous.title}</div>
        </a>
      {/if}

      {#if neighbors.next}
        <a class="surface surface_muted h-full p-5 sm:p-6" href={`/docs/${neighbors.next.slug}`}>
          <div class="metric_label">الوثيقة التالية</div>
          <div class="mt-3 text-xl font-bold text-ink" dir={neighbors.next.direction}>{neighbors.next.title}</div>
        </a>
      {/if}
    </section>
  </section>
{/if}
