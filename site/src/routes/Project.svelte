<script>
import { ArrowRightIcon } from '@lucide/svelte'

import MetricCard from '~/components/MetricCard.svelte'
import { compact_number, summary, systems } from '$lib/dataset.svelte.js'
import { app_href } from '$lib/nav.js'
</script>

<section class="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-start">
  <div>
    <div class="rule_label">Project guide</div>
    <h1 class="display_title mt-5 max-w-4xl text-ink">What this project does, in plain terms.</h1>
    <p class="section_text mt-5 text-lg">
      This project is a reference atlas for the places where the canonical counting systems of the Qurʾān disagree about ayah boundaries.
      It turns that old scholarly problem into reviewable source data and reproducible mapping files.
    </p>
    <p class="arabic_title mt-5 max-w-3xl text-ink-soft">
      هذا المشروع أطلسٌ مرجعيٌّ لمواضع اختلاف عدِّ الآي بين الأنظمة المشهورة، مع ربط كل موضعٍ بطبقة أصول قابلة للمراجعة وطبقة شواهدٍ قابلة
      للتحقق.
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href={app_href('/explorer')}>
        Explore disputed points
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" href={app_href('/project/ar')}>المدخل العربي</a>
      <a class="pill_button" href={app_href('/developer')}>Developer usage</a>
    </div>
  </div>

  <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
    <MetricCard label="Counting systems" value={compact_number(systems.length)} note="The atlas covers the six canonical counting systems used by the ten Qiraat." />
    <MetricCard
      label="Disputed points"
      value={compact_number(summary.total_points)}
      note="Each point is a concrete place where a boundary is counted in some systems and omitted in others."
      tone="ok"
    />
    <MetricCard
      label="Primary evidence landed"
      value={compact_number(summary.evidence.points_with_primary_evidence)}
      note="Primary citations are being added point by point instead of being assumed globally."
      tone="alert"
    />
  </div>
</section>

<section class="mt-12 doc_grid" data-columns="3">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">The problem</div>
    <h2 class="section_title mt-4 text-2xl">The words can stay the same while the numbering changes.</h2>
    <p class="section_text mt-3 text-sm">
      The project is about <span class="inline_code">ʿadad al-āy</span>: where one ayah ends and the next begins. When a boundary is counted in one system but not
      in another, the ayah numbers drift even though the Qurʾānic text itself may remain the same.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">Why it matters</div>
    <h2 class="section_title mt-4 text-2xl">Apps, APIs, research notes, and mushaf tools need a stable bridge.</h2>
    <p class="section_text mt-3 text-sm">
      Quran software often assumes that <span class="inline_code">surah + ayah</span> is universal. It is not. This project gives downstream tools a clear way to move between
      numbering systems without guessing.
    </p>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">What we publish</div>
    <h2 class="section_title mt-4 text-2xl">A small canonical source layer, then generated maps.</h2>
    <p class="section_text mt-3 text-sm">
      Scholars should review the concise source files in <span class="inline_code">data/</span>. Developers usually consume the generated files in <span class="inline_code">dist/</span>.
      The large mapping tables are outputs, not the primary scholarly document.
    </p>
  </div>
</section>

<section class="mt-14">
  <div class="rule_label">Our approach</div>
  <h2 class="section_title mt-4 max-w-4xl">We ask the book-shaped question first, then generate everything else from it.</h2>

  <div class="mt-6 doc_grid" data-columns="2">
    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">1. Fix one reference numbering</h3>
      <p class="section_text mt-3 text-sm">
        The project uses Kufi/Hafs as the operational hub. That does not mean other systems are secondary in value. It simply gives apps and review tools one stable coordinate
        system to pivot through.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">2. Record only the disputed heads</h3>
      <p class="section_text mt-3 text-sm">
        Instead of hand-maintaining huge mapping tables, the canonical source layer records the disputed ayah heads directly: either a disputed end of a Hafs ayah or a disputed
        internal break inside it.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">3. Tie each point to evidence</h3>
      <p class="section_text mt-3 text-sm">
        Each disputed point has a matching evidence record. That is where citations, source notes, review status, and unresolved tensions live. We do not want the mapping layer
        to look more certain than the books justify.
      </p>
    </div>

    <div class="surface p-5 sm:p-6">
      <h3 class="text-xl font-bold text-ink">4. Generate the developer-facing outputs</h3>
      <p class="section_text mt-3 text-sm">
        From that concise source layer the repository regenerates forward maps, reverse maps, surah counts, rawi aliases, review packets, and the site data used in this atlas.
      </p>
    </div>
  </div>
</section>

<section class="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] xl:items-start">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">Ground truth</div>
    <h2 class="section_title mt-4">How we tie the data to the books</h2>

    <div class="doc_flow mt-5">
      <p class="section_text text-sm">
        The project does not treat totals alone as proof, and it does not silently absorb website or API behavior as if that were ground truth. The evidence layer is meant to stay
        close to the transmitted count literature itself.
      </p>

      <ul class="doc_list text-sm text-ink-soft">
        <li><span class="font-bold text-ink">Primary witnesses first.</span> Classical works such as <span class="inline_code">البيان</span> are the first-stop witness whenever the project has a structured match.</li>
        <li><span class="font-bold text-ink">Later manuals as witnesses, not replacements.</span> Works such as <span class="inline_code">الفرائد الحسان</span> and <span class="inline_code">نفائس البيان</span> help confirm, explain, or flag tensions.</li>
        <li><span class="font-bold text-ink">Explicit evidence status.</span> A point can be primary cited, secondary only, disputed, unresolved, or still uncited. Missing proof is surfaced, not hidden.</li>
        <li><span class="font-bold text-ink">Checked-in source frontier.</span> Structured witnesses under <span class="inline_code">sources/</span> make the current evidence frontier inspectable and reproducible.</li>
        <li><span class="font-bold text-ink">Open exceptions remain open.</span> If a source does not line up cleanly with the current primitive, the mismatch is preserved for review instead of being normalized away.</li>
      </ul>
    </div>
  </div>

  <div class="surface surface_muted p-5 sm:p-6">
    <div class="rule_label">Current posture</div>
    <h3 class="mt-4 text-2xl font-bold text-ink">This is a reviewable atlas, not a claim that every point is fully settled.</h3>
    <p class="section_text mt-3 text-sm">
      Some regions already have primary support. Others are still on secondary witnesses or are waiting for more primary transcription. The point of the structure is to make that
      state legible.
    </p>
    <div class="mt-5 flex flex-wrap gap-2 text-sm text-ink-soft">
      <span class="stat_chip">no totals-only inventions</span>
      <span class="stat_chip">no silent conflict smoothing</span>
      <span class="stat_chip">reproducible generated outputs</span>
    </div>
  </div>
</section>

<section class="mt-14 doc_grid" data-columns="2">
  <div class="surface p-5 sm:p-6">
    <div class="rule_label">What this project does not do</div>
    <h2 class="section_title mt-4 text-2xl">Clear boundaries keep the claims honest.</h2>
    <ul class="doc_list mt-4 text-sm text-ink-soft">
      <li>It does not replace the classical books. It is a structured review and interoperability layer built from them.</li>
      <li>It does not attempt to settle unresolved points by arithmetic alone.</li>
      <li>It does not try to model every textual variant of the Qiraat. Its focus is ayah boundaries and numbering.</li>
      <li>It does not ask scholars to review generated array output first. It asks the smaller, more natural question: is this point counted as a raʾs ayah here or not?</li>
    </ul>
  </div>

  <div class="surface p-5 sm:p-6">
    <div class="rule_label">How to review it</div>
    <h2 class="section_title mt-4 text-2xl">The scholar-facing workflow is intentionally small.</h2>
    <ol class="doc_list mt-4 text-sm text-ink-soft">
      <li>Read the disputed point as a boundary claim, not as a developer map.</li>
      <li>Check whether the named counting system counts that point as a raʾs ayah.</li>
      <li>Confirm the anchor word and whether the point is an ayah end or an internal break.</li>
      <li>Record the witness in the evidence sidecar, or mark the point disputed or unresolved if the sources do not collapse cleanly.</li>
    </ol>
    <div class="mt-6 flex flex-wrap gap-3">
      <a class="pill_button" href={app_href('/compare')}>Review comparison view</a>
      <a class="pill_button" href={app_href('/explorer')}>Open explorer</a>
    </div>
  </div>
</section>

<section class="mt-14 surface p-5 sm:p-6">
  <div class="rule_label">Next useful read</div>
  <div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h2 class="section_title">If you are introducing the project to Quranic-science experts, open the Arabic companion first.</h2>
      <p class="section_text mt-3 text-sm">
        The English guide explains the structure. The Arabic companion slows down the introduction, frames the problem in the vocabulary of Qurʾanic sciences, and is a better first handoff for scholar outreach.
      </p>
    </div>
    <div class="flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href={app_href('/project/ar')}>
        Arabic companion
        <ArrowRightIcon class="size-4" />
      </a>
      <a class="pill_button" href={app_href('/developer')}>Developer usage</a>
    </div>
  </div>
</section>
