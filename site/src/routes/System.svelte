<script>
import { ArrowRightIcon, FingerprintIcon, LibraryBigIcon, MilestoneIcon } from '@lucide/svelte'

import MetricCard from '~/components/MetricCard.svelte'
import PlotSurahDrift from '~/components/charts/PlotSurahDrift.svelte'
import SystemFingerprint from '~/components/charts/SystemFingerprint.svelte'
import {
  attestations,
  compact_number,
  format_attestation_status,
  format_primary_total,
  format_signed_delta,
  format_surah_reference,
  get_surah,
  get_surah_drift,
  get_surah_name,
  get_surah_secondary_name,
  get_system,
  get_system_name,
  get_system_profile,
  get_system_relationship,
  get_system_secondary_name,
  get_verification_profile,
  titleize_slug
} from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'

let { system } = $props()

let selected_surah = $state(null)
let system_info = $derived(get_system(system))
let profile = $derived(get_system_profile(system))
let attestation = $derived(attestations[system] || null)
let verification = $derived(get_verification_profile(system))
let relationship = $derived(get_system_relationship(system))
let top_surahs = $derived.by(() =>
  profile
    .filter(entry => entry.counted_points > 0 || entry.delta_from_kufi !== 0)
    .sort(
      (left, right) =>
        right.counted_points - left.counted_points
        || Math.abs(right.delta_from_kufi) - Math.abs(left.delta_from_kufi)
        || left.surah - right.surah
    )
    .slice(0, 8)
    .map(entry => ({ ...entry, ...(get_surah(entry.surah) || {}) }))
)
let active_surah_number = $derived(selected_surah ?? top_surahs[0]?.surah ?? 1)
let active_surah = $derived(get_surah(active_surah_number))
let drift_points = $derived(get_surah_drift(system, active_surah_number))
let attestation_policy = $derived(
  attestation
    ? get_current_language() === 'en'
      ? attestation.policy_en || attestation.policy_ar || ''
      : attestation.policy_ar || attestation.policy_en || ''
    : ''
)
</script>

{#if !system_info}
  <section class="surface p-6">
    <div class="rule_label">النظام غير موجود</div>
    <h1 class="section_title mt-4">لا يوجد نظام عد يطابق “{system}”.</h1>
  </section>
{:else}
  <section class="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-start">
    <div>
      <div class="rule_label">ملف النظام</div>
      <h1 class="display_title mt-5 text-ink">{get_system_name(system_info)}</h1>
      {#if get_system_secondary_name(system_info)}
        <p class="mt-4 text-2xl text-ink-soft">{get_system_secondary_name(system_info)}</p>
      {/if}
      <p class="section_text mt-5">يربط السجل الحالي هذه القراءات بهذا التقليد العددي.</p>
      <div class="mt-4 flex flex-wrap gap-2">
        {#each system_info.used_by_qiraat as qiraa (qiraa)}
          <span class="badge" data-tone="accent">{titleize_slug(qiraa)}</span>
        {/each}
      </div>
    </div>

    <div class="surface surface_muted p-5">
      <div class="metric_label">سياسة المجموع الكلي</div>
      {#if attestation}
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <span class="badge" data-tone={attestation.delta_from_primary === 0 ? 'ok' : 'warn'}>{format_attestation_status(attestation.status)}</span>
          {#if attestation.primary_classical_total_ayahs}
            <span class="badge" data-tone="ok">{format_primary_total(attestation.primary_classical_total_ayahs)}</span>
          {/if}
        </div>
        {#if attestation_policy}
          <p class="mt-4 text-sm text-ink-soft">{attestation_policy}</p>
        {/if}
      {:else}
        <p class="mt-3 text-sm text-ink-soft">لا توجد ملاحظة صريحة محفوظة بعد عن سياسة المجموع الكلي لهذا النظام.</p>
      {/if}
    </div>
  </section>

  <section class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
    <MetricCard label="مجموع الآيات" value={compact_number(system_info.total_ayahs)} note="مشتق من طبقة الأصول المعيارية." />
    <MetricCard label="عن الكوفي" value={format_signed_delta(system_info.delta_from_kufi)} note="الأثر الصافي بالنسبة إلى العدد الكوفي المرجعي." tone={system_info.delta_from_kufi === 0 ? 'ok' : 'accent'} />
    <MetricCard label="الرؤوس المعدودة" value={compact_number(system_info.counts_boundary)} note="عدد الرؤوس المختلف فيها التي يعدها هذا النظام فعلًا." tone="ok" />
    <MetricCard label="الرؤوس المعدودة الموثقة" value={compact_number(system_info.cited_points)} note="عدد الرؤوس المعدودة المختلف فيها التي لحقها أي شاهد." tone={system_info.cited_points > 0 ? 'accent' : 'warn'} />
    <MetricCard label="آثار الدمج" value={compact_number(system_info.merge_effects)} note="المواضع التي يؤدي فيها الإسقاط إلى دمج الترقيم بعد ذلك." tone="alert" />
  </section>

  <section class="mt-12 grid gap-6 xl:grid-cols-2">
    <div class="surface p-5 sm:p-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="rule_label">هيئة التوثيق</div>
          <h2 class="section_title mt-4">كم من المادة المعدودة في هذا النظام لها شواهد</h2>
          <p class="section_text mt-3 text-sm">
            تقتصر هذه المجاميع على الرؤوس المختلف فيها التي يعدها {get_system_name(system_info)} فعلًا.
          </p>
        </div>
        <MilestoneIcon class="hidden size-10 text-accent-strong sm:block" />
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="surface surface_muted p-4">
          <div class="metric_label">موثق</div>
          <div class="mt-3 text-3xl font-bold text-ink">{compact_number(verification?.cited_points || 0)}</div>
          <div class="mt-2 text-sm text-ink-soft">له أي شاهد مرفق</div>
        </div>
        <div class="surface surface_muted p-4">
          <div class="metric_label">غير موثق</div>
          <div class="mt-3 text-3xl font-bold text-ink">{compact_number(verification?.uncited_points || 0)}</div>
          <div class="mt-2 text-sm text-ink-soft">ما يزال يحتاج إلى تفريغ من المصادر</div>
        </div>
      </div>

      <div class="mt-5 flex flex-wrap gap-2 text-sm">
        <span class="badge" data-tone="ok">الشواهد الأصلية {compact_number(verification?.points_with_primary_evidence || 0)}</span>
        <span class="badge" data-tone="warn">المواضع المراجعة {compact_number(verification?.points_reviewed || 0)}</span>
      </div>
    </div>

    <div class="surface p-5 sm:p-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="rule_label">الجوار</div>
          <h2 class="section_title mt-4">أي الأنظمة أقرب وأيها أبعد</h2>
          <p class="section_text mt-3 text-sm">
            تعني المسافة هنا عدد المواضع المختلف فيها التي يعاملها النظامان على وجه مختلف.
          </p>
        </div>
        <MilestoneIcon class="hidden size-10 text-accent-strong sm:block" />
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="surface surface_muted p-4">
          <div class="metric_label">الأقرب</div>
          <div class="mt-3 text-2xl font-bold text-ink">{get_system_name(relationship?.nearest?.right_system_id)}</div>
          <div class="mt-2 text-sm text-ink-soft">{compact_number(relationship?.nearest?.differing_points ?? 0)} موضعًا مختلفًا</div>
        </div>
        <div class="surface surface_muted p-4">
          <div class="metric_label">الأبعد</div>
          <div class="mt-3 text-2xl font-bold text-ink">{get_system_name(relationship?.farthest?.right_system_id)}</div>
          <div class="mt-2 text-sm text-ink-soft">{compact_number(relationship?.farthest?.differing_points ?? 0)} موضعًا مختلفًا</div>
        </div>
      </div>

      <a class="pill_button mt-6 w-full" href="/compare">
        افتح عرض المقارنة
        <ArrowRightIcon class="size-4" />
      </a>
    </div>
  </section>

  <section class="mt-12 surface p-5 sm:p-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="rule_label">الانجراف داخل السورة</div>
        <h2 class="section_title mt-4">كيف يبتعد الترقيم عن الكوفي داخل السورة</h2>
        <p class="section_text mt-3 text-sm">
          يرتفع الخط بمقدار +1 حين يعد هذا النظام موضع فصل داخلي، وينخفض بمقدار −1 حين يسقط رأسًا كوفيًا في نهاية آية.
        </p>
      </div>

      <label class="block lg:w-72">
        <span class="metric_label">سورة المعاينة</span>
        <select class="select mt-3" bind:value={selected_surah}>
          {#each top_surahs as surah (surah.surah)}
            <option value={surah.surah}>{format_surah_reference(surah.surah)} · {get_surah_name(surah)}</option>
          {/each}
        </select>
      </label>
    </div>

    <div class="mt-6">
      <PlotSurahDrift points={drift_points} system_name={get_system_name(system_info)} surah_label={get_surah_name(active_surah) || format_surah_reference(active_surah_number)} />
    </div>
  </section>

  <section class="mt-12 surface p-5 sm:p-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="rule_label">البصمة التفاعلية</div>
        <h2 class="section_title mt-4">أعلى السور بحسب الرؤوس المختلف فيها التي يعدها النظام</h2>
        <p class="section_text mt-3 text-sm">
          يعطي هذا الترتيب قراءة سريعة لبصمة النظام، فيقدّم السور التي يظهر فيها أثر هذا التقليد العددي بأوضح صورة.
        </p>
      </div>
      <FingerprintIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>

    <div class="mt-6">
      <SystemFingerprint {profile} limit={18} />
    </div>
  </section>

  <section class="mt-12 surface p-5 sm:p-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="rule_label">بؤر السور</div>
        <h2 class="section_title mt-4">أين تظهر بصمة {get_system_name(system_info)} بأقوى صورة</h2>
      </div>
      <LibraryBigIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {#each top_surahs as surah (surah.surah)}
        <a class="surface block p-4 transition-transform duration-200 hover:-translate-y-0.5" href="/surahs/{surah.surah}">
          <div class="metric_label">{format_surah_reference(surah.surah)}</div>
          <div class="mt-3 text-xl font-bold text-ink">{get_surah_name(surah)}</div>
          {#if get_surah_secondary_name(surah)}
            <div class="mt-2 text-lg text-ink-soft">{get_surah_secondary_name(surah)}</div>
          {/if}
          <div class="mt-4 flex flex-wrap gap-2 text-xs">
            <span class="badge" data-tone="ok">يعد {compact_number(surah.counted_points)}</span>
            <span class="badge" data-tone={surah.delta_from_kufi === 0 ? 'ok' : 'warn'}>{format_signed_delta(surah.delta_from_kufi)}</span>
          </div>
          <div class="mt-4 flex items-center gap-2 font-bold text-accent-strong">
            <span>افتح السورة</span>
            <ArrowRightIcon class="size-4" />
          </div>
        </a>
      {/each}
    </div>
  </section>
{/if}
