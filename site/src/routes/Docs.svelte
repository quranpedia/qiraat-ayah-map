<script>
import { BookOpenCheckIcon, LibraryBigIcon } from '@lucide/svelte'

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
      href: '/mushaf',
      label: 'المصحف',
      note: 'ابدأ باختيار مذهب العدّ والسورة ثم اقرأ رؤوس الآي في سياقها.',
      icon: LibraryBigIcon
    },
    {
      href: '/ayah-counts',
      label: 'أعداد الآي',
      note: 'راجع مجموع القرآن وعدد آيات كل سورة في مذاهب العدّ الستة.',
      icon: BookOpenCheckIcon
    }
  ]
}

let current_language = $derived(get_current_language())
let quick_links = $derived(get_quick_links())
let grouped_docs = $derived(get_grouped_docs(current_language))
let total_docs = $derived(grouped_docs.reduce((total, group) => total + group.docs.length, 0))
</script>

<section class="grid gap-8">
  <div>
    <div class="rule_label">الوثائق</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">مكتبة الباحث في رؤوس الآي.</h1>
    <p class="section_text mt-5 max-w-3xl text-base sm:text-lg">
      ستجد هنا الدليل العام، ومنهج قراءة رؤوس الآي، وإرشادات المراجع العلمي. أما تفاصيل ملفات الربط والعقود الفنية فمكانها صفحة المطور.
    </p>
  </div>

  <section class="doc_grid" data-columns="3">
    {#each quick_links as item (item.href)}
      <a class="surface surface_muted flex h-full flex-col gap-4 p-5 sm:p-6" href={window.navgo.href(item.href)}>
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
      <span class="stat_chip">العربية والإنجليزية بحسب الأصل</span>
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
          <a class="surface flex h-full flex-col gap-4 p-5 sm:p-6" href={window.navgo.href('/docs/' + doc.slug)}>
            <div class="flex flex-wrap items-center gap-2">
              <span class="stat_chip">{doc.language === 'ar' ? 'عربي' : 'English'}</span>
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
