<script>
import { get_doc, get_doc_group, get_neighbor_docs } from '$lib/docs.js'
import { get_current_language } from '$lib/i18n.js'

const { slug } = $props()

let current_language = $derived(get_current_language())
let doc = $derived(get_doc(slug))
let group = $derived(doc ? get_doc_group(doc.group) : null)
let neighbors = $derived(get_neighbor_docs(slug))
let alternate_doc = $derived(doc?.alternateSlug ? get_doc(doc.alternateSlug) : null)
let same_language_as_ui = $derived(doc ? doc.language === current_language : false)
let index_href = $derived(doc && (doc.internal || group?.internal) ? '/developer' : '/docs')
let index_label = $derived(index_href === '/developer' ? 'العودة إلى صفحة المطور' : 'العودة إلى الوثائق')
let metadata = $derived(
  doc
    ? [group?.title, doc.language === 'ar' ? 'عربي' : 'English', `${doc.headers.length} عنوانًا فرعيًا`]
        .filter(Boolean)
        .join(' · ')
    : ''
)
</script>

{#if !doc}
  <section class="grid max-w-4xl gap-4">
    <div class="rule_label">الوثيقة غير موجودة</div>
    <h1 class="section_title mt-4">لا توجد وثيقة بهذا المعرّف داخل المكتبة.</h1>
    <div class="flex flex-wrap gap-3 pt-2">
      <a class="pill_button" href={window.navgo.href('/docs')}>ارجع إلى مكتبة الوثائق</a>
      <a class="pill_button" href={window.navgo.href('/project')}>دليل المشروع</a>
    </div>
  </section>
{:else}
  <section class="grid max-w-4xl gap-8">
    <div>
      <a class="text-sm font-bold text-accent-strong" href={window.navgo.href(index_href)}>{index_label}</a>
      <div class="rule_label mt-6">وثيقة كاملة</div>
      <h1 class="page_title mt-5 text-ink" dir={doc.direction}>{doc.title}</h1>
      <p class="section_text mt-5 text-base sm:text-lg" dir={doc.direction}>{doc.excerpt}</p>
      <p class="mt-4 text-sm font-bold text-ink-soft">{metadata}</p>

      <div class="mt-5 flex flex-wrap gap-3">
        {#if alternate_doc}
          <a class="pill_button" href={window.navgo.href('/docs/' + alternate_doc.slug)}>
            {alternate_doc.language === 'ar' ? 'افتح النسخة العربية' : 'Open the English version'}
          </a>
        {/if}

        {#if !same_language_as_ui}
          <span class="text-sm text-ink-soft">واجهة الموقع الآن بلغة مختلفة عن لغة هذه الوثيقة.</span>
        {/if}
      </div>
    </div>

    {#if doc.headers.length}
      <details class="border-y border-line/70 py-4">
        <summary class="cursor-pointer font-bold text-ink">في هذه الصفحة</summary>
        <ol class="mt-4 grid gap-2 text-sm text-ink-soft">
          {#each doc.headers as header (header.id)}
            <li class={header.level > 2 ? 'pr-4' : ''}>
              <a class="hover:text-ink" href="#{header.id}" dir={doc.direction}>{header.title}</a>
            </li>
          {/each}
        </ol>
      </details>
    {/if}

    <article class="markdown_doc" lang={doc.language} dir={doc.direction}>
      {@html doc.html}
    </article>

    <nav class="grid gap-4 border-t border-line/70 pt-6 sm:grid-cols-2">
      {#if neighbors.previous}
        <a class="block" href={window.navgo.href('/docs/' + neighbors.previous.slug)}>
          <div class="text-sm font-bold text-ink-soft">الوثيقة السابقة</div>
          <div class="mt-1 text-lg font-bold text-ink" dir={neighbors.previous.direction}>{neighbors.previous.title}</div>
        </a>
      {/if}

      {#if neighbors.next}
        <a class="block" href={window.navgo.href('/docs/' + neighbors.next.slug)}>
          <div class="text-sm font-bold text-ink-soft">الوثيقة التالية</div>
          <div class="mt-1 text-lg font-bold text-ink" dir={neighbors.next.direction}>{neighbors.next.title}</div>
        </a>
      {/if}
    </nav>
  </section>
{/if}
