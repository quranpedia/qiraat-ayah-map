<script>
import { ArrowRightIcon } from '@lucide/svelte'

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
import { getMadhhabHref } from '$lib/route-urls.js'

let current_language = $derived(get_current_language())
</script>

<section class="max-w-3xl">
  <div class="rule_label">أعداد الآي</div>
  <h1 class="section_title mt-4 text-ink">أعداد الآي في مذاهب العدّ الستة</h1>
  <p class="section_text mt-4 text-lg">
    قارن مجموع آيات القرآن وعدد آيات كل سورة بين المذاهب الستة. واختلاف العدد راجعٌ إلى مواضع رؤوس الآي، لا إلى وجوه القراءة.
  </p>
  <div class="mt-6">
    <a class="pill_button" href={window.navgo.href('/mushaf')}>
      افتح المصحف
      <ArrowRightIcon class="size-4" />
    </a>
  </div>
</section>

<section class="mt-10 surface p-4 sm:p-5">
  <div class="rule_label">مجموع القرآن</div>
  <h2 class="section_title mt-4 text-2xl">عدد الآيات في كل مذهب عدّ</h2>

  <div class="table_shell mt-5">
    <table class="data_table">
      <thead>
        <tr>
          <th>مذهب العدّ</th>
          <th>مجموع الآيات</th>
          <th>القراءة</th>
        </tr>
      </thead>
      <tbody>
        {#each systems as system (system.id)}
          <tr>
            <td>
              <a class="font-bold text-ink underline decoration-line decoration-1 underline-offset-4" href={window.navgo.href('/madhhabs/' + system.id)}>{get_system_name(system)}</a>
              {#if current_language !== 'en' && get_system_secondary_name(system)}
                <div class="mt-1 text-base text-ink-soft">{get_system_secondary_name(system)}</div>
              {/if}
            </td>
            <td class="text-lg font-bold tabular-nums text-ink">{compact_number(system.total_ayahs)}</td>
            <td>
              <a class="font-bold text-accent-strong underline decoration-line decoration-1 underline-offset-4" href={getMadhhabHref(window.navgo.href('/mushaf'), system.id)}>افتح المصحف</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<section class="mt-10 surface p-4 sm:p-5">
  <div class="rule_label">أعداد السور</div>
  <h2 class="section_title mt-4 text-2xl">عدد آيات كل سورة</h2>
  <p class="section_text mt-3 text-sm">
    اختر رقمًا من الجدول لفتح السورة مباشرة بترقيم مذهب العدّ الموافق لذلك العمود.
  </p>

  <div class="table_shell mt-5">
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
            <td>
              <div class="font-bold text-ink">{format_surah_reference(surah.surah)} · {get_surah_name(surah)}</div>
              {#if current_language !== 'en' && get_surah_secondary_name(surah)}
                <div class="mt-1 text-base text-ink-soft">{get_surah_secondary_name(surah)}</div>
              {/if}
            </td>
            {#each systems as system (system.id)}
              <td>
                <a class="font-bold tabular-nums text-accent-strong underline decoration-line decoration-1 underline-offset-4" href={getMadhhabHref(window.navgo.href('/surahs/' + surah.surah), system.id, '#surah-mushaf-viewer')}>
                  {compact_number(surah.counts[system.id])}
                </a>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
