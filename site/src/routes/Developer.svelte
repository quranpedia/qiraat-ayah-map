<script>
import { ArrowRightIcon } from '@lucide/svelte'

import { app_href } from '$lib/nav.js'

const load_json_example = `async function load_json(path) {
  const response = await fetch(path)
  return response.json()
}`

const forward_example = `const kufi_to_madani_last = await load_json(
  'dist/mappings/by-counting-system/kufi-to-madani-last.json'
)

function map_from_hafs(mapping, surah, hafs_ayah) {
  return mapping.surahs[String(surah)].ayahs[String(hafs_ayah)]
}

const entry = map_from_hafs(kufi_to_madani_last, 1, 1)
// => { target_ayah: 1, status: 'merged', merges_with_next: true }

const target_number = entry.target_ayah
// show 1 in your target numbering layer`

const reverse_example = `const madani_last_to_kufi = await load_json(
  'dist/mappings/by-counting-system/madani-last-to-kufi.json'
)

function map_to_hafs(reverse_mapping, surah, target_ayah) {
  return reverse_mapping.surahs[String(surah)].ayahs[String(target_ayah)]
}

const entry = map_to_hafs(madani_last_to_kufi, 1, 1)
// => { hafs_ayah: 1, hafs_ayahs: [1, 2], status: 'covers_multiple' }

const normalized_hafs_ayah = entry.hafs_ayah`

const rawi_example = `const warsh = await load_json('dist/rawis/warsh.json')
// warsh._counting_system === 'madani-last'
// warsh._mapping_file === 'mappings/by-counting-system/kufi-to-madani-last.json'

const hafs_to_warsh = await load_json('dist/mappings/by-rawi/hafs-to-warsh.json')
const entry = hafs_to_warsh.surahs['1'].ayahs['7']
// => { target_ayah: 6, status: 'split', splits_into: [6, 7] }`

const counts_example = `const counts = await load_json('dist/surah-counts/madani-last.json')
const al_baqarah_count = counts.surahs['2']
// => 285`
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-start">
  <div>
    <div class="rule_label">Developer usage</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">Use the maps without overcomplicating your app.</h1>
    <p class="section_text mt-5 text-lg">
      For most Quran apps the rule is simple: keep one stable hub, then map outward only when you need to display or accept another numbering system.
      This dataset already chooses that hub for you: Kufi/Hafs.
    </p>
    <p class="section_text mt-4 text-sm text-ink-soft">
      The data is about numbering, not about loading Qurʾān text. Pair it with your own text layer or API. Surah numbers stay the same; only ayah boundaries and ayah numbers change.
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href={app_href('/project')}>
        Read the project guide
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" href={app_href('/explorer')}>See live examples in the explorer</a>
    </div>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">KISS starting point</div>
    <h2 class="mt-4 text-2xl font-bold text-ink">Most apps only need four things.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li><span class="font-bold text-ink">Forward map</span> for Hafs/Kufi → target numbering</li>
      <li><span class="font-bold text-ink">Reverse map</span> for target numbering → Hafs/Kufi</li>
      <li><span class="font-bold text-ink">Rawi metadata</span> when users choose a riwāyah rather than a counting-system name</li>
      <li><span class="font-bold text-ink">Surah counts</span> when you need per-surah totals</li>
    </ul>
  </div>
</section>

<section class="mt-12 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">File 1</div>
    <h2 class="section_title mt-4 text-2xl">Forward map</h2>
    <p class="section_text mt-3 text-sm">
      Use <span class="inline_code">dist/mappings/by-counting-system/kufi-to-*.json</span> when your app already stores Hafs/Kufi ayah numbers and only needs to display another numbering system.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">File 2</div>
    <h2 class="section_title mt-4 text-2xl">Reverse map</h2>
    <p class="section_text mt-3 text-sm">
      Use <span class="inline_code">dist/mappings/by-counting-system/*-to-kufi.json</span> when user input or external data comes in another numbering system and you want to normalize back to Hafs.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">File 3</div>
    <h2 class="section_title mt-4 text-2xl">Rawi metadata</h2>
    <p class="section_text mt-3 text-sm">
      Use <span class="inline_code">dist/rawis/&#123;rawi&#125;.json</span> when your UI is organized by riwāyah names such as Warsh or Qālūn. The metadata tells you which counting system that rawi follows.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">File 4</div>
    <h2 class="section_title mt-4 text-2xl">Surah counts</h2>
    <p class="section_text mt-3 text-sm">
      Use <span class="inline_code">dist/surah-counts/&#123;system&#125;.json</span> for validation, UI totals, or paging controls that need the ayah count of a surah in a specific system.
    </p>
  </div>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">Basic loader</div>
  <h2 class="section_title mt-4">Load JSON however your stack prefers</h2>
  <p class="section_text mt-3 text-sm">
    The examples below use a tiny browser helper. Replace it with your own file loader, import system, or storage layer.
  </p>
  <pre class="code_block mt-5"><code>{load_json_example}</code></pre>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">Example 1</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h2 class="section_title">Map from Hafs/Kufi into another numbering system</h2>
      <p class="section_text mt-3 text-sm">
        This is the most common app case. You already have a Hafs reference and want the matching ayah number in another system.
      </p>
    </div>
    <span class="stat_chip">forward map</span>
  </div>
  <pre class="code_block mt-5"><code>{forward_example}</code></pre>
  <p class="section_text mt-4 text-sm">
    In this example the target number is still <span class="inline_code">1</span>, but the status is <span class="inline_code">merged</span>, which tells you that this target ayah spans more than one Hafs ayah.
  </p>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">Example 2</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h2 class="section_title">Normalize another numbering system back to Hafs</h2>
      <p class="section_text mt-3 text-sm">
        Use the reverse map when a user types a target-system ayah number, or when another dataset arrives in a non-Hafs numbering system.
      </p>
    </div>
    <span class="stat_chip">reverse map</span>
  </div>
  <pre class="code_block mt-5"><code>{reverse_example}</code></pre>
  <p class="section_text mt-4 text-sm">
    When the status is <span class="inline_code">covers_multiple</span>, the target ayah covers multiple consecutive Hafs ayahs. The first one is exposed as <span class="inline_code">hafs_ayah</span>, and the full span is in <span class="inline_code">hafs_ayahs</span>.
  </p>
</section>

<section class="mt-14 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">Example 3</div>
    <h2 class="section_title mt-4 text-2xl">Resolve a rawi to its counting system</h2>
    <p class="section_text mt-3 text-sm">
      If your users choose Warsh, Qālūn, Dūrī, or another rawi, check the rawi metadata first. That tells you which counting-system file you need.
    </p>
    <pre class="code_block mt-5"><code>{rawi_example}</code></pre>
    <p class="section_text mt-4 text-sm">
      If your app already knows the counting-system id, you can skip the rawi layer and use the by-counting-system maps directly.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">Example 4</div>
    <h2 class="section_title mt-4 text-2xl">Read the ayah count of a surah</h2>
    <p class="section_text mt-3 text-sm">
      Use the per-system surah counts whenever UI controls or validators need to know how many ayahs a surah has in that numbering system.
    </p>
    <pre class="code_block mt-5"><code>{counts_example}</code></pre>
  </div>
</section>

<section class="mt-14 doc_grid" data-columns="3">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">Status</div>
    <h2 class="section_title mt-4 text-2xl">mapped</h2>
    <p class="section_text mt-3 text-sm">Normal 1:1 correspondence. One Hafs ayah maps to one target ayah.</p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">Status</div>
    <h2 class="section_title mt-4 text-2xl">merged</h2>
    <p class="section_text mt-3 text-sm">
      This Hafs ayah does not end as its own target ayah. Its content continues into the next Hafs ayah's target coverage.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">Status</div>
    <h2 class="section_title mt-4 text-2xl">split</h2>
    <p class="section_text mt-3 text-sm">
      One Hafs ayah becomes multiple target ayahs. Read the full target span from <span class="inline_code">splits_into</span>.
    </p>
  </div>
</section>

<section class="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)] xl:items-start">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">Practical rules</div>
    <h2 class="section_title mt-4">A few habits keep integrations clean.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li>Keep one internal hub numbering. In this dataset that hub is Kufi/Hafs.</li>
      <li>Do not try to infer numbering from total ayah counts alone.</li>
      <li>Keep the mapping layer separate from your Qurʾān text layer.</li>
      <li>If you only support one non-Hafs system, load just that system's forward and reverse files.</li>
      <li>If your app labels by rawi, use the rawi metadata to pick the correct counting-system map.</li>
      <li>Kufan rawis are identity-numbered with Hafs, so they do not need separate conversion logic.</li>
    </ul>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">Common mistake</div>
    <h3 class="mt-4 text-2xl font-bold text-ink">This dataset does not tell you how to render the text.</h3>
    <p class="section_text mt-3 text-sm">
      It only tells you how ayah numbering shifts. Use your own text source, mushaf data, or API for the actual words and glyphs.
    </p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a class="pill_button" href={app_href('/project')}>Why the project is structured this way</a>
      <a class="pill_button" data-tone="accent" href={app_href('/compare')}>
        Compare systems live
        <ArrowRightIcon class="size-4" />
      </a>
    </div>
  </div>
</section>
