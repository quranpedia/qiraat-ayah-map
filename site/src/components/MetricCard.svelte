<script>
let { label, value, note = '', tone = 'accent' } = $props()
</script>

<div class="surface p-5">
  <div class="metric_label">{label}</div>
  <div class="metric_value mt-3" style:color={tone === 'alert' ? 'var(--alert)' : tone === 'ok' ? 'var(--ok)' : 'var(--accent-strong)'}>{value}</div>
  {#if note}
    <p class="mt-3 text-sm text-ink-soft">{note}</p>
  {/if}
</div>
