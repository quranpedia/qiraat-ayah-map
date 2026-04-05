<script>
import { BookOpenCheckIcon, FilesIcon, LibraryBigIcon } from '@lucide/svelte'

import { docs } from '$lib/docs.generated.js'
import { get_grouped_docs } from '$lib/docs.js'
import { get_current_language } from '$lib/i18n.js'

function get_quick_links() {
  return [
    {
      href: '/project',
      label: 'دليل المشروع',
      note: 'المدخل الأبسط قبل الغوص في الوثائق المفصلة.',
      icon: BookOpenCheckIcon
    },
    {
      href: '/developer',
      label: 'استخدام المطور',
      note: 'الاستعمال العملي للخرائط وملفات JSON في التطبيقات.',
      icon: FilesIcon
    },
    {
      href: '/surahs',
      label: 'فهرس السور',
      note: 'العارض العملي للسور ومواضع الخلاف داخلها.',
      icon: LibraryBigIcon
    }
  ]
}

function format_language(language) {
  return language === 'ar' ? 'عربي' : 'English'
}

let current_language = $derived(get_current_language())
let quick_links = $derived(get_quick_links())
let grouped_docs = $derived(get_grouped_docs(current_language))
let total_docs = $derived(docs.length)
</script>

<section class="grid gap-8">
  <div>
    <div class="rule_label">الوثائق</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">المواد التي كانت في مجلد الوثائق صارت داخل الموقع.</h1>
    <p class="section_text mt-5 max-w-3xl text-base sm:text-lg">
      ستجد هنا المدخلات العامة، وسياسة التحرير، ووثائق المصادر، وملخص المراحل، وعقود الملفات العلمية.
      صفحات المشروع والمطور بقيت أفضل نقطة بداية سريعة، وهذه المكتبة تحفظ التفاصيل الكاملة داخل التطبيق نفسه.
    </p>
  </div>

  <section class="doc_grid" data-columns="3">
    {#each quick_links as item (item.href)}
      <a class="surface surface_muted flex h-full flex-col gap-4 p-5 sm:p-6" href={item.href}>
        <div class="flex items-center gap-3 text-accent-strong">
          <item.icon class="size-5" />
          <span class="metric_label">مسار سريع</span>
        </div>
        <div>
          <h2 class="text-xl font-bold text-ink">{item.label}</h2>
          <p class="section_text mt-2 text-sm">{item.note}</p>
        </div>
      </a>
    {/each}
  </section>

  <section class="surface p-5 sm:p-6">
    <div class="flex flex-wrap items-center gap-3">
      <span class="stat_chip">{total_docs} وثيقة</span>
      <span class="stat_chip">{grouped_docs.length} أقسام</span>
      <span class="stat_chip">الوثائق تعرض بلغتها الأصلية</span>
    </div>
  </section>

  {#each grouped_docs as group (group.id)}
    <section class="grid gap-5">
      <div>
        <div class="rule_label">{group.title}</div>
        <h2 class="section_title mt-4 text-2xl">{group.description}</h2>
      </div>

      <div class="doc_grid" data-columns="3">
        {#each group.docs as doc (doc.slug)}
          <a class="surface flex h-full flex-col gap-4 p-5 sm:p-6" href={`/docs/${doc.slug}`}>
            <div class="flex flex-wrap items-center gap-2">
              <span class="stat_chip">{format_language(doc.language)}</span>
              <span class="stat_chip">{doc.title}</span>
            </div>

            <div class="grid gap-3">
              <h3 class="text-xl font-bold text-ink" dir={doc.direction}>{doc.title}</h3>
              <p class="section_text text-sm" dir={doc.direction}>{doc.excerpt}</p>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/each}
</section>
