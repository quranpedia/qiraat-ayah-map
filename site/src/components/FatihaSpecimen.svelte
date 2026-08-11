<script>
import { loadSurahViewer } from '$lib/mushaf-viewer.js'

/**
 * The two disputed positions in al-Fatiha, rendered over identical words.
 *
 * Kufi/Makki count the basmala and leave ayah 7 whole; the other four count a
 * break inside ayah 7 and leave the basmala uncounted. Both reach seven ayahs,
 * so the divergence shows only in where the markers sit and in what الحمد لله
 * is numbered. Text and token offsets come from the generated viewer data
 * rather than being transcribed here.
 */
let viewer = $state(null)

$effect(() => {
  loadSurahViewer(1).then(data => {
    viewer = data
  })
})

function ayah_tokens(number) {
  return viewer?.ayahs.find(entry => entry.ayah === number)?.uthmani_tokens ?? []
}

// The internal break in ayah 7 falls after this many tokens.
let internal_split = $derived(viewer?.boundary_positions['1:7:internal:عليهم']?.uthmani_after_token ?? 4)

let basmala = $derived(ayah_tokens(1).join(' '))
let hamd = $derived(ayah_tokens(2).join(' '))
let ayah7 = $derived(ayah_tokens(7))
let ayah7_first = $derived(ayah7.slice(0, internal_split).join(' '))
let ayah7_rest = $derived(ayah7.slice(internal_split).join(' '))
</script>

{#if viewer}
  <figure class="specimen">
    <figcaption class="specimen_head">
      <span class="specimen_who">الكوفي والمكي</span>
      <span class="specimen_total">٧ آيات</span>
    </figcaption>

    <p class="specimen_line">
      {basmala}<span class="ayah_marker">١</span>
      {hamd}<span class="ayah_marker">٢</span>
    </p>

    <p class="specimen_line">
      {ayah7_first}<span class="ayah_marker" data-absent="true">−</span>
      {ayah7_rest}<span class="ayah_marker">٧</span>
    </p>

    <p class="specimen_note">تُعَدُّ البسملة آية، وتبقى الآية السابعة موصولة.</p>
  </figure>

  <figure class="specimen">
    <figcaption class="specimen_head">
      <span class="specimen_who">المدنيان والبصري والدمشقي</span>
      <span class="specimen_total">٧ آيات</span>
    </figcaption>

    <p class="specimen_line">
      {basmala}<span class="ayah_marker" data-absent="true">−</span>
      {hamd}<span class="ayah_marker">١</span>
    </p>

    <p class="specimen_line">
      {ayah7_first}<span class="ayah_marker">٦</span>
      {ayah7_rest}<span class="ayah_marker">٧</span>
    </p>

    <p class="specimen_note">لا تُعَدُّ البسملة آية، ويُعَدُّ الوقف على ﴿أنعمت عليهم﴾ رأس آية.</p>
  </figure>
{/if}
