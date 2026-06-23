<script>
import { get_current_language } from '$lib/i18n.js'
import { primary_navigation_items, secondary_navigation_items } from '$lib/navigation.js'

const footer_items = [...primary_navigation_items, ...secondary_navigation_items]
let current_language = $derived(get_current_language())
</script>

<footer class="px-3 pb-6 sm:px-5 sm:pb-8">
  <div class="page_shell border-t border-line/70 pt-5 text-sm text-ink-soft">
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <p class="max-w-2xl">
        مرجع لرؤوس الآي في مذاهب العدّ الستة؛ يبدأ من القراءة في المصحف ثم يتيح البحث والتفصيل عند الحاجة.
      </p>

      <nav class="flex flex-wrap gap-x-4 gap-y-2" aria-label="روابط إضافية">
        {#each footer_items as item (item.id)}
          <a class="footer_link" href={window.navgo.href(item.href)}>{current_language === 'en' ? item.label_en : item.label_ar}</a>
        {/each}
      </nav>
    </div>
  </div>
</footer>
