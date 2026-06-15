<script>
import { ArrowRightIcon, LibraryBigIcon } from '@lucide/svelte'

import MetricCard from '~/components/MetricCard.svelte'
import {
  compact_number,
  format_surah_reference,
  get_surah,
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
let surahs_with_counted_points = $derived(profile.filter(entry => entry.counted_points > 0))
let counted_points_by_surah = $derived(new Map(profile.map(entry => [Number(entry.surah), entry.counted_points])))
let top_surahs = $derived.by(() =>
  [...surahs_with_counted_points]
    .sort((left, right) => right.counted_points - left.counted_points || left.surah - right.surah)
    .slice(0, 12)
    .map(entry => ({ ...entry, ...(get_surah(entry.surah) || {}) }))
)
</script>

{#if !system_info}
  <section class="surface p-6">
    <div class="rule_label">مذهب العدّ غير موجود</div>
    <h1 class="section_title mt-4">لا يوجد مذهب عدّ يطابق “{madhhab}”.</h1>
  </section>
{:else}
  <section class="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-start">
    <div>
      <div class="rule_label">ملف مذهب العدّ</div>
      <h1 class="display_title mt-5 text-ink">{get_system_name(system_info)}</h1>
      {#if current_language !== 'en' && get_system_secondary_name(system_info)}
        <p class="mt-4 text-2xl text-ink-soft">{get_system_secondary_name(system_info)}</p>
      {/if}
      <p class="section_text mt-5">
        يعرض هذا الملف مجموع الآيات، والقراءات المرتبطة، والسور التي تظهر فيها رؤوس آي لهذا المذهب داخل المادة الحالية.
      </p>
    </div>

    <div class="surface surface_muted p-5">
      <div class="metric_label">القراءات المرتبطة</div>
      <div class="mt-4 flex flex-wrap gap-2">
        {#each system_info.used_by_qiraat as qiraa (qiraa)}
          <span class="badge" data-tone="accent">{titleize_slug(qiraa)}</span>
        {:else}
          <span class="text-sm text-ink-soft">لا توجد قراءات مرتبطة محفوظة لهذا المذهب.</span>
        {/each}
      </div>
    </div>
  </section>

  <section class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <MetricCard label="مجموع الآيات" value={compact_number(system_info.total_ayahs)} note="المجموع النهائي في هذا المذهب." />
    <MetricCard label="رؤوس يعدها" value={compact_number(system_info.counts_boundary)} note="رؤوس الآي المختلف فيها التي يعدها هذا المذهب." tone="ok" />
    <MetricCard label="السور ذات رؤوس الآي" value={compact_number(surahs_with_counted_points.length)} note="السور التي يظهر فيها لهذا المذهب رأس آية مختلف فيه واحد أو أكثر." tone="accent" />
    <MetricCard label="القراءات المرتبطة" value={compact_number(system_info.used_by_qiraat.length)} note="الروايات أو القراءات المرتبطة بهذا المذهب في البيانات." tone="ok" />
  </section>

  <section class="mt-12 surface p-5 sm:p-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="rule_label">السور</div>
        <h2 class="section_title mt-4">أوضح السور في {get_system_name(system_info)}</h2>
        <p class="section_text mt-3 text-sm">
          ابدأ بهذه السور إذا أردت رؤية رؤوس الآي في سياق النص.
        </p>
      </div>
      <LibraryBigIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>

    {#if top_surahs.length === 0}
      <p class="mt-6 text-sm text-ink-soft">لا توجد رؤوس آي مختلف فيها يعدها هذا المذهب ضمن المادة الحالية.</p>
    {:else}
      <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {#each top_surahs as surah (surah.surah)}
          <a class="surface block p-4 transition-transform duration-200 hover:-translate-y-0.5" href={getMadhhabHref(window.navgo.href('/surahs/' + surah.surah), system_info.id, '#surah-mushaf-viewer')}>
            <div class="metric_label">{format_surah_reference(surah.surah)}</div>
            <div class="mt-3 text-xl font-bold text-ink">{get_surah_name(surah)}</div>
            {#if current_language !== 'en' && get_surah_secondary_name(surah)}
              <div class="mt-1 text-base text-ink-soft">{get_surah_secondary_name(surah)}</div>
            {/if}
            <div class="mt-4 text-sm text-ink-soft">{compact_number(surah.counted_points)} رؤوس يعدها هذا المذهب</div>
            <div class="mt-5 flex items-center gap-2 font-bold text-accent-strong">
              <span>افتح السورة</span>
              <ArrowRightIcon class="size-4" />
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </section>

  <section class="mt-12 surface p-5 sm:p-6">
    <div class="rule_label">أعداد السور</div>
    <h2 class="section_title mt-4">عدد آيات كل سورة في {get_system_name(system_info)}</h2>
    <p class="section_text mt-3 text-sm">
      هذا جدول العدّ المقبول لكل سورة في هذا المذهب، مع رابط مباشر لقراءة السورة بالترقيم نفسه.
    </p>

    <div class="table_shell mt-6">
      <table class="data_table">
        <thead>
          <tr>
            <th>السورة</th>
            <th>عدد الآيات</th>
            <th>رؤوس يعدها هذا المذهب</th>
            <th>القراءة</th>
          </tr>
        </thead>
        <tbody>
          {#each surahs as surah (surah.surah)}
            <tr>
              <td data-label="السورة">
                <div class="font-bold text-ink">{format_surah_reference(surah.surah)} · {get_surah_name(surah)}</div>
                {#if current_language !== 'en' && get_surah_secondary_name(surah)}
                  <div class="mt-1 text-base text-ink-soft">{get_surah_secondary_name(surah)}</div>
                {/if}
              </td>
              <td data-label="عدد الآيات"><span class="badge" data-tone="ok">{compact_number(surah.counts[system_info.id])}</span></td>
              <td data-label="رؤوس يعدها هذا المذهب"><span class="badge" data-tone={counted_points_by_surah.get(surah.surah) ? 'accent' : 'ok'}>{compact_number(counted_points_by_surah.get(surah.surah) || 0)}</span></td>
              <td data-label="القراءة">
                <a class="font-bold text-accent-strong underline decoration-line decoration-1 underline-offset-4" href={getMadhhabHref(window.navgo.href('/surahs/' + surah.surah), system_info.id, '#surah-mushaf-viewer')}>افتح السورة</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <section class="mt-12 surface surface_muted p-5 sm:p-6">
    <div class="rule_label">الخطوة التالية</div>
    <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <p class="section_text text-sm">
        للقراءة في السياق افتح المصحف بهذا المذهب. وللوصول إلى رأس آية محدد مباشرة استخدم المستكشف.
      </p>
      <div class="flex flex-wrap gap-3">
        <a class="pill_button" href={getMadhhabHref(window.navgo.href('/mushaf'), system_info.id)}>افتح المصحف</a>
        <a class="pill_button" data-tone="accent" href={window.navgo.href('/explorer')}>
          المستكشف
          <ArrowRightIcon class="size-4" />
        </a>
      </div>
    </div>
  </section>
{/if}
