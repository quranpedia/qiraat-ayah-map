<script>
import { ArrowRightIcon, LibraryBigIcon } from '@lucide/svelte'

import {
  compact_number,
  format_surah_reference,
  get_surah_name,
  get_surah_secondary_name,
  get_system_name,
  get_system_secondary_name,
  surahs,
  systems
} from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'

let current_language = $derived(get_current_language())
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start">
  <div>
    <div class="rule_label">أعداد الآي</div>
    <h1 class="display_title mt-5 text-ink">الأعداد المقبولة في مذاهب العدّ الستة.</h1>
    <p class="section_text mt-5 text-lg">
      هذه الصفحة تجمع مجموع آيات القرآن، وعدد آيات كل سورة، بحسب كل مذهب عدّ مشمول في البيانات الحالية.
      اختلاف العدد هنا اختلاف في رؤوس الآي وترقيمها، لا في نص القرآن.
    </p>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">طريقة القراءة</div>
    <h2 class="section_title mt-4 text-2xl">ابدأ بالعدد، ثم افتح السورة للسياق.</h2>
    <p class="section_text mt-3 text-sm">
      إذا اختلف العدد بين مذهبين فافتح صفحة السورة لرؤية رؤوس الآي المختلف فيها داخل النص.
    </p>
    <a class="pill_button mt-6 w-full" href={window.navgo.href('/mushaf')}>
      افتح المصحف
      <ArrowRightIcon class="size-4" />
    </a>
  </div>
</section>

<section class="mt-12 surface p-5 sm:p-6">
  <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <div class="rule_label">مجموع القرآن</div>
      <h2 class="section_title mt-4">عدد الآيات في كل مذهب عدّ</h2>
    </div>
    <LibraryBigIcon class="hidden size-10 text-accent-strong sm:block" />
  </div>

  <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {#each systems as system (system.id)}
      <a class="surface block p-4 transition-transform duration-200 hover:-translate-y-0.5" href={window.navgo.href('/madhhabs/' + system.id)}>
        <div class="metric_label">{get_system_name(system)}</div>
        {#if current_language !== 'en' && get_system_secondary_name(system)}
          <div class="mt-2 text-base text-ink-soft">{get_system_secondary_name(system)}</div>
        {/if}
        <div class="mt-4 text-3xl font-bold text-ink">{compact_number(system.total_ayahs)}</div>
        <div class="mt-2 text-sm text-ink-soft">آية في هذا المذهب</div>
      </a>
    {/each}
  </div>
</section>

<section class="mt-12 surface p-5 sm:p-6">
  <div class="rule_label">أعداد السور</div>
  <h2 class="section_title mt-4">جدول عدد آيات كل سورة</h2>
  <p class="section_text mt-3 text-sm">
    يعرض الجدول العدد المعتمد لكل سورة في كل مذهب عدّ، من غير مقارنات تحليلية أو دلتا حسابية.
  </p>

  <div class="table_shell mt-6">
    <table class="data_table">
      <thead>
        <tr>
          <th>السورة</th>
          {#each systems as system (system.id)}
            <th>{get_system_name(system)}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each surahs as surah (surah.surah)}
          <tr>
            <td data-label="السورة">
              <a class="font-bold text-ink underline decoration-line decoration-1 underline-offset-4" href={window.navgo.href('/surahs/' + surah.surah)}>
                {format_surah_reference(surah.surah)} · {get_surah_name(surah)}
              </a>
              {#if current_language !== 'en' && get_surah_secondary_name(surah)}
                <div class="mt-1 text-base text-ink-soft">{get_surah_secondary_name(surah)}</div>
              {/if}
            </td>
            {#each systems as system (system.id)}
              <td data-label={get_system_name(system)}>
                <span class="badge" data-tone="ok">{compact_number(surah.counts[system.id])}</span>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
