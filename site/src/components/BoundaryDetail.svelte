<script>
import { BookOpenTextIcon, MilestoneIcon } from '@lucide/svelte'

import {
  compact_number,
  format_boundary_decision,
  format_evidence_strength,
  format_evidence_tier,
  format_numbering_effect,
  format_verification_status,
  get_effect_tone,
  get_system_name,
  get_system_secondary_name,
  get_verification_tone,
  systems
} from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'

let { row } = $props()
let current_language = $derived(get_current_language())

function join_system_names(list) {
  const separator = current_language === 'en' ? ', ' : '، '
  return list.map(get_system_name).join(separator)
}
</script>

{#if row}
  <div class="surface p-5 sm:p-6">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div class="rule_label">تفصيل الموضع</div>
        <h3 class="mt-3 text-2xl font-bold text-ink">{row.location_label}</h3>
        <p class="arabic_title mt-2 text-2xl text-ink">{row.word}</p>
        <p class="mt-2 text-xs text-ink-soft">{row.anchor_key}</p>
      </div>
      <span class="badge" data-tone={get_verification_tone(row.verification_status)}>{format_verification_status(row.verification_status)}</span>
    </div>

    <p class="section_text mt-5 text-sm">
      يعده {row.counted_by.length > 0 ? join_system_names(row.counted_by) : 'لا أحد'}، ويسقطه {row.omitted_by.length > 0 ? join_system_names(row.omitted_by) : 'لا أحد'}.
    </p>

    <div class="mt-5 grid gap-4 lg:grid-cols-2">
      <div class="surface surface_muted p-4">
        <div class="metric_label">يعده</div>
        <div class="mt-3 flex flex-wrap gap-2">
          {#each row.counted_by as system_id (system_id)}
            <span class="badge" data-tone="ok">{get_system_name(system_id)}</span>
          {/each}
        </div>
      </div>

      <div class="surface surface_muted p-4">
        <div class="metric_label">يسقطه</div>
        <div class="mt-3 flex flex-wrap gap-2">
          {#each row.omitted_by as system_id (system_id)}
            <span class="badge" data-tone="warn">{get_system_name(system_id)}</span>
          {/each}
        </div>
      </div>
    </div>

    <div class="mt-5 surface surface_muted p-4">
      <div class="flex items-center gap-2 text-ink"><MilestoneIcon class="size-4" /> أثره في كل نظام</div>
      <div class="mt-3 space-y-3 text-sm text-ink-soft">
        {#each systems as system (system.id)}
          <div class="flex items-center justify-between gap-3 border-b border-line/60 pb-3 last:border-b-0 last:pb-0">
            <div>
              <div class="font-bold text-ink">{get_system_name(system)}</div>
              {#if current_language !== 'en' && get_system_secondary_name(system)}
                <div class="text-base text-ink-soft">{get_system_secondary_name(system)}</div>
              {/if}
            </div>
            <span class="badge" data-tone={get_effect_tone(row.systems[system.id].numbering_effect)}>
              {format_boundary_decision(row.systems[system.id].counts_boundary)} · {format_numbering_effect(row.systems[system.id].numbering_effect)}
            </span>
          </div>
        {/each}
      </div>
    </div>

    <div class="mt-5 surface surface_muted p-4">
      <div class="flex flex-wrap items-center justify-between gap-3 text-ink">
        <div class="flex items-center gap-2"><BookOpenTextIcon class="size-4" /> الشواهد</div>
        <div class="flex flex-wrap gap-2">
          <span class="badge" data-tone={row.primary_evidence_count > 0 ? 'ok' : 'warn'}>{compact_number(row.primary_evidence_count)} أصلي</span>
          <span class="badge" data-tone={row.evidence_count > 0 ? 'accent' : 'warn'}>{compact_number(row.evidence_count)} كل الشواهد</span>
          <span class="badge" data-tone={row.reviewer_count > 0 ? 'ok' : 'warn'}>{compact_number(row.reviewer_count)} مراجعون</span>
        </div>
      </div>

      {#if row.evidence.length > 0}
        <div class="mt-4 space-y-3 text-sm text-ink-soft">
          {#each row.evidence as item, index (`${row.anchor_key}-${index}`)}
            <div class="rounded-3xl border border-line/70 bg-white/50 p-4">
              <div class="flex flex-wrap items-center gap-2">
                <span class="badge" data-tone={item.tier === 'primary' ? 'ok' : item.tier === 'secondary' ? 'warn' : 'accent'}>{format_evidence_tier(item.tier)}</span>
                <span class="badge" data-tone={item.strength === 'direct' ? 'ok' : 'warn'}>{format_evidence_strength(item.strength)}</span>
              </div>
              <div class="mt-3 font-bold text-ink">{item.work}</div>
              <div class="mt-1 text-ink-soft">{item.locator}</div>
              {#if item.edition}
                <div class="mt-1 text-xs">الطبعة: {item.edition}</div>
              {/if}
              <div class="mt-3 flex flex-wrap gap-2">
                {#each item.supports as system_id (system_id)}
                  <span class="badge" data-tone="ok">{get_system_name(system_id)}</span>
                {/each}
              </div>
              {#if item.note}
                <p class="mt-3 text-ink">{item.note}</p>
              {/if}
            </div>
          {/each}
        </div>
      {:else}
        <p class="mt-4 text-sm text-ink-soft">
          لا يوجد شاهد مرفق بعد. الموضع جاهز للتفريغ والمراجعة.
        </p>
      {/if}

      {#if row.reviewers.length > 0}
        <div class="mt-4 border-t border-line/70 pt-4 text-sm text-ink-soft">
          <div class="metric_label">المراجعون</div>
          <div class="mt-3 space-y-2">
            {#each row.reviewers as reviewer, index (`${row.anchor_key}-reviewer-${index}`)}
              <div>
                <span class="font-bold text-ink">{reviewer.name}</span>
                {#if reviewer.role}
                  <span> · {reviewer.role}</span>
                {/if}
                {#if reviewer.date}
                  <span> · {reviewer.date}</span>
                {/if}
                {#if reviewer.note}
                  <div class="mt-1">{reviewer.note}</div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      {#if row.note}
        <p class="mt-4 border-t border-line/70 pt-4 text-sm text-ink">{row.note}</p>
      {/if}
    </div>
  </div>
{:else}
  <div class="surface p-5 text-sm text-ink-soft">اختر موضعًا لعرض أثره بين الأنظمة وحالة شواهده.</div>
{/if}
