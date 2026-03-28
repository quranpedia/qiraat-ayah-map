<script>
import { app_href } from '$lib/nav.js'
</script>

<footer class="px-3 pb-6 sm:px-5 sm:pb-8">
  <div class="page_shell border-t border-line/70 pt-6 text-sm text-ink-soft">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="max-w-2xl">
          Demo shell for exploring the scholar-facing primitive layer, evidence scaffold, generated review artifacts, and practical app usage.
        </p>
        <p class="arabic_title mt-3 text-base text-ink-soft">طبقة العرض مبنية على البيانات المولَّدة من طبقة الأصول المختصرة</p>
      </div>

      <div class="flex flex-wrap gap-2">
        <a class="stat_chip" href={app_href('/project')}>Project guide</a>
        <a class="stat_chip" href={app_href('/developer')}>Developer usage</a>
      </div>
    </div>
  </div>
</footer>
