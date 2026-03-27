<script>
import { ArrowRightIcon, FingerprintIcon, LibraryBigIcon } from '@lucide/svelte'

import MetricCard from '~/components/MetricCard.svelte'
import SystemFingerprint from '~/components/charts/SystemFingerprint.svelte'
import {
  attestations,
  compact_number,
  format_attestation_status,
  get_surah,
  get_system,
  get_system_profile,
  titleize_slug
} from '$lib/dataset.svelte.js'
import { app_href } from '$lib/nav.js'

let { system } = $props()

let system_info = $derived(get_system(system))
let profile = $derived(get_system_profile(system))
let attestation = $derived(attestations[system] || null)
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
</script>

{#if !system_info}
  <section class="surface p-6">
    <div class="rule_label">System not found</div>
    <h1 class="section_title mt-4">No counting system matches “{system}”.</h1>
  </section>
{:else}
  <section class="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-start">
    <div>
      <div class="rule_label">System profile</div>
      <h1 class="display_title mt-5 text-ink">{system_info.name_en}</h1>
      <p class="arabic_title mt-4 text-2xl text-ink-soft">{system_info.name_ar}</p>
      <p class="section_text mt-5">The current registry maps these qirāʾāt to this counting tradition.</p>
      <div class="mt-4 flex flex-wrap gap-2">
        {#each system_info.used_by_qiraat as qiraa (qiraa)}
          <span class="badge" data-tone="accent">{titleize_slug(qiraa)}</span>
        {/each}
      </div>
    </div>

    <div class="surface surface_muted p-5">
      <div class="metric_label">Total-count policy</div>
      {#if attestation}
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <span class="badge" data-tone={attestation.delta_from_primary === 0 ? 'ok' : 'warn'}>{format_attestation_status(attestation.status)}</span>
          {#if attestation.primary_classical_total_ayahs}
            <span class="badge" data-tone="ok">primary total {compact_number(attestation.primary_classical_total_ayahs)}</span>
          {/if}
        </div>
        {#if attestation.policy_en}
          <p class="mt-4 text-sm text-ink-soft">{attestation.policy_en}</p>
        {/if}
      {:else}
        <p class="mt-3 text-sm text-ink-soft">No explicit total-count policy note is stored for this system yet.</p>
      {/if}
    </div>
  </section>

  <section class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <MetricCard label="Total ayahs" value={compact_number(system_info.total_ayahs)} note="Derived from the canonical primitive layer." />
    <MetricCard label="Vs kufi" value={`${system_info.delta_from_kufi > 0 ? '+' : ''}${system_info.delta_from_kufi}`} note="Net effect against the Kufan reference count." tone={system_info.delta_from_kufi === 0 ? 'ok' : 'accent'} />
    <MetricCard label="Counted heads" value={compact_number(system_info.counts_boundary)} note="How many disputed heads this system actively counts." tone="ok" />
    <MetricCard label="Merge effects" value={compact_number(system_info.merge_effects)} note="Places where omission collapses numbering downstream." tone="alert" />
  </section>

  <section class="mt-12 surface p-5 sm:p-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="rule_label">Interactive fingerprint</div>
        <h2 class="section_title mt-4">Top surahs by counted disputed heads</h2>
        <p class="section_text mt-3 text-sm">
          LayerChart is used here for a ranked read of the system signature: the chart pulls forward the surahs where this count tradition actively counts the most disputed heads.
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
        <div class="rule_label">Surah hotspots</div>
        <h2 class="section_title mt-4">Where {system_info.name_en} shows its strongest signature</h2>
      </div>
      <LibraryBigIcon class="hidden size-10 text-accent-strong sm:block" />
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {#each top_surahs as surah (surah.surah)}
        <a class="surface block p-4 transition-transform duration-200 hover:-translate-y-0.5" href={app_href('/surahs/' + surah.surah)}>
          <div class="metric_label">Surah {surah.surah}</div>
          <div class="mt-3 text-xl font-bold text-ink">{surah.name_en}</div>
          <div class="arabic_title mt-2 text-lg text-ink-soft">{surah.name_ar}</div>
          <div class="mt-4 flex flex-wrap gap-2 text-xs">
            <span class="badge" data-tone="ok">counts {surah.counted_points}</span>
            <span class="badge" data-tone={surah.delta_from_kufi === 0 ? 'ok' : 'warn'}>{surah.delta_from_kufi > 0 ? '+' : ''}{surah.delta_from_kufi} vs kufi</span>
          </div>
          <div class="mt-4 flex items-center gap-2 font-bold text-accent-strong">
            <span>Open surah</span>
            <ArrowRightIcon class="size-4" />
          </div>
        </a>
      {/each}
    </div>
  </section>
{/if}
