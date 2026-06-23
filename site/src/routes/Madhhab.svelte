<script>
import { ArrowRightIcon } from '@lucide/svelte'

import {
  compact_number,
  format_surah_reference,
  get_surah_name,
  get_surah_secondary_name,
  get_system,
  get_system_name,
  get_system_profile,
  get_system_secondary_name,
  surahs,
  titleize_slug
} from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'
import { getMadhhabHref } from '$lib/route-urls.js'

let { madhhab } = $props()

let system_info = $derived(get_system(madhhab))
let profile = $derived(get_system_profile(madhhab))
let current_language = $derived(get_current_language())
let counted_points_by_surah = $derived(new Map(profile.map(entry => [Number(entry.surah), entry.counted_points])))
let related_qiraat = $derived(system_info?.used_by_qiraat.map(titleize_slug).join(current_language === 'en' ? ', ' : '، ') || '')
let surahs_with_counted_points = $derived(profile.filter(entry => entry.counted_points > 0).length)
</script>

{#if !system_info}
  <section class="surface p-6">
    <div class="rule_label">مذهب العدّ غير موجود</div>
    <h1 class="section_title mt-4">لا يوجد مذهب عدّ يطابق “{madhhab}”.</h1>
  </section>
{:else}
  <section class="max-w-4xl">
    <div class="rule_label">مذهب العدّ</div>
    <h1 class="section_title mt-4 text-ink">{get_system_name(system_info)}</h1>
    {#if current_language !== 'en' && get_system_secondary_name(system_info)}
      <p class="mt-3 text-xl text-ink-soft">{get_system_secondary_name(system_info)}</p>
    {/if}
    <p class="section_text mt-4 text-lg">
      اقرأ السور بترقيم هذا المذهب، أو راجع أعداد السور كاملة في الجدول أدناه.
    </p>

    <div class="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft">
      <span><strong class="text-lg text-ink tabular-nums">{compact_number(system_info.total_ayahs)}</strong> آية في القرآن</span>
      <span><strong class="text-lg text-ink tabular-nums">{compact_number(surahs_with_counted_points)}</strong> سورة فيها رؤوس آي مختلف فيها يعدها هذا المذهب</span>
      <span><strong class="text-ink">القراءات المرتبطة:</strong> {related_qiraat || 'لا توجد قراءات مرتبطة محفوظة لهذا المذهب.'}</span>
    </div>

    <div class="mt-6 flex flex-wrap gap-3">
      <a class="pill_button" href={getMadhhabHref(window.navgo.href('/mushaf'), system_info.id)}>
        افتح المصحف بهذا المذهب
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" data-tone="accent" href={getMadhhabHref(window.navgo.href('/explorer'), system_info.id)}>ابحث في رؤوس الآي</a>
    </div>
  </section>

  <section class="mt-10 surface p-4 sm:p-5">
    <div class="rule_label">أعداد السور</div>
    <h2 class="section_title mt-4 text-2xl">عدد آيات كل سورة في {get_system_name(system_info)}</h2>
    <p class="section_text mt-3 text-sm">
      كل رابط يفتح السورة في المصحف مع ترقيم {get_system_name(system_info)}.
    </p>

    <div class="table_shell mt-5">
      <table class="data_table">
        <thead>
          <tr>
            <th>السورة</th>
            <th>عدد الآيات</th>
            <th>رؤوس آي مختلف فيها يعدها</th>
            <th>القراءة</th>
          </tr>
        </thead>
        <tbody>
          {#each surahs as surah (surah.surah)}
            {@const countedPoints = counted_points_by_surah.get(surah.surah) || 0}
            <tr>
              <td>
                <div class="font-bold text-ink">{format_surah_reference(surah.surah)} · {get_surah_name(surah)}</div>
                {#if current_language !== 'en' && get_surah_secondary_name(surah)}
                  <div class="mt-1 text-base text-ink-soft">{get_surah_secondary_name(surah)}</div>
                {/if}
              </td>
              <td class="text-lg font-bold tabular-nums text-ink">{compact_number(surah.counts[system_info.id])}</td>
              <td class="tabular-nums text-ink-soft">{countedPoints ? compact_number(countedPoints) : '—'}</td>
              <td>
                <a class="font-bold text-accent-strong underline decoration-line decoration-1 underline-offset-4" href={getMadhhabHref(window.navgo.href('/surahs/' + surah.surah), system_info.id, '#surah-mushaf-viewer')}>
                  افتح السورة
                </a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
{/if}
