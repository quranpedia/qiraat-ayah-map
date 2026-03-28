# Qiraat Ayah Map — Summary of Phases 1–17

This document summarizes the work completed across the first 17 phases of the project. It focuses on the concrete technical, data, scholarly, and product changes that were made.

## What changed overall

Across these 17 phases, the project moved through four major stages:

1. **Repairing the original dataset**: fixing broken mappings, rawi coverage, reverse mappings, and count-system inconsistencies.
2. **Rebuilding the repo around canonical source data**: replacing large checked-in mapping files with a small scholar-facing primitive layer plus generated outputs.
3. **Adding evidence and review infrastructure**: introducing a point-by-point evidence sidecar, review artifacts, source importers, and cross-references to classical works.
4. **Building a public-facing site and documentation**: creating a Svelte SPA, scholar-facing introductions, developer usage docs, review visuals, and deployment automation.

---

## Phase-by-phase summary

### Phase 1 — Core mapping repair
- Fixed the forward-mapping generator so it could handle **multi-split ayahs**, not just a single extra split.
- Added a normalization pass to materialize full `splits_into` ranges from shipped target numbering.
- Regenerated reverse mappings so target ayahs no longer had `hafs_ayah: null` holes.
- Synced rawi metadata to full coverage:
  - **20 rawi files** present
  - known `_mushaf_id` values populated where available
  - non-Kufi by-rawi aliases expanded to **24 files**
- Strengthened validation to check full target coverage, reverse coverage, and rawi alias integrity.

### Phase 2 — Boundary semantics and reconciliation
- Added `data/boundary-events.json` as a mapping-derived boundary layer.
- Added `data/differences-reconciliation.json` to show where `data/differences.json` agrees or disagrees with the generated mappings.
- Made merge overlap explicit with `merges_with_next: true`, including split+merge cases.
- Updated docs and tests so the documented schema matched the actual generated data.

### Phase 3 — Basri correction
- Moved **Basri** from the legacy shipped mapping path to the generated-from-source path.
- Updated `data/counting-systems.json` and regenerated Basri mappings, reverse mappings, aliases, surah counts, and reconciliation files.
- Result:
  - **Basri total = 6204**
  - **Basri surah 2 = 287**
  - `differences-reconciliation.json` showed `basri.is_exact_match = true`

### Phase 4 — Madani-last repair and API harness fix
- Added the missing **madani-last** split at **67:9** (`نذير`).
- Switched all non-Kufan systems to generate from `data/differences.json`.
- Result:
  - **madani-last total = 6214**
  - all five non-Kufan systems reconciled exactly against the source layer
- Fixed `tests/validate-against-api.mjs` to treat Quranpedia’s `number_in_hafs` as an **array**, not a scalar.
- Makki was also moved through the generated path, producing the then-current generated values:
  - surah 72 = 28
  - surah 91 = 16

### Phase 5 — Classical attestation layer
- Added `data/classical-count-attestations.json` and a generator for it.
- This recorded the difference between:
  - mapping-derived totals
  - classical attested totals
- It made the remaining Makki tension explicit instead of hiding it:
  - generated Makki total = **6221**
  - primary classical total = **6219**
  - delta = **2**

### Phase 6 — Makki total resolved to the primary Dānī riwāya
- Removed two Makki split events from `data/differences.json`:
  - `78:40` (`قريبا`)
  - `91:14` (`فعقروها`)
- Updated `data/counting-systems.json` and regenerated Makki outputs.
- Result:
  - **Makki total = 6219**
  - **Makki surah 78 = 40**
  - **Makki surah 91 = 15**
- The attestation layer kept the disputed points explicit instead of silently forgetting them.

### Phase 7A — Scholar-facing primitive model introduced
- Added `data/book-boundary-primitives.json`.
- Added a schema and tooling for a book-aligned model based on:
  - `end`
  - `internal`
  - `counted_by`
- This was designed to match how classical `ʿadad al-āy` books describe disputed heads.
- The new primitive layer round-tripped exactly back into `differences.json`.

### Phase 7B — Primitive layer became canonical
- Made `book-boundary-primitives.json` the **canonical edited source**.
- Changed `differences.json` into a **generated compatibility view**.
- Changed forward mappings to derive from the primitives, not from `differences.json`.
- Added normalization for the scholar-facing primitive document.
- Updated docs so contributors would edit the book-aligned source first.

### Phase 7C — Hard cutover to source vs generated split
- Reduced `data/` to concise authored source only.
- Moved verbose derived outputs into `dist/`.
- Added cleanup and path utilities for the new repo layout.
- Result:
  - `data/` went from **67 files / ~18 MB** to **3 files / ~57 KB** at that stage
  - generated mappings, rawis, surah counts, and reconciliation files moved under `dist/`

### Phase 8 — Evidence sidecar and scholar review artifacts
- Added `data/book-boundary-evidence.json` as the evidence sidecar to the primitive claims layer.
- Added evidence normalization and review-artifact generation.
- Generated `dist/review/` outputs including:
  - `review-data.json`
  - `master-matrix.csv`
  - `totals.md`
  - `open-questions.md`
  - `systems/*.md`
- Added major documentation:
  - editorial policy
  - methodology
  - source catalog
  - Arabic reviewer guide
- The review layer initially exposed the full review problem honestly:
  - **246 disputed boundary points** total
  - **134 end** points
  - **112 internal** points
  - all **246 initially uncited**

### Phase 9 — Initial Svelte SPA
- Added a new `site/` app based on the provided Svelte template, simplified into a KISS SPA.
- Removed backend/server baggage from the template.
- Added `scripts/generate-site-data.mjs` so site data is generated from the repo source layer.
- Initial routes:
  - `/`
  - `/explorer`
  - `/systems/:system`
  - `/surahs/:surah`
- Initial charting choices:
  - **Observable Plot** for overview and matrix-style views
  - **LayerChart** for interactive system profile views

### Phase 10 — Site polish and data-contract cleanup
- Fixed a key visual correctness issue: multiple disputed points inside one Hafs ayah no longer overlapped invisibly.
- Added stable slot labels like `40a`, `40b`, `40c` for same-ayah internal points.
- Simplified the explorer table and moved detailed per-system interpretation into the side panel.
- Improved the detail panel with:
  - counted-by / omitted-by grouping
  - numbering-effect language
  - evidence and reviewer display
- Tightened the site data contract with fields such as:
  - `location_label`
  - `counted_by_count`
  - `omitted_by_count`
  - `surah_row_index`
  - `ayah_slot_index`
  - `ayah_slot_count`
  - `ayah_slot_label`

### Phase 11 — GitHub Pages deploy and visual roadmap
- Added a simplified GitHub Pages workflow for the SPA.
- Added base-path handling for Vite and Navgo so the app can work under a repo subpath.
- Added `404.html`/`.nojekyll` support for static hosting.
- Added planning docs for:
  - visual roadmap
  - project next steps
- Also evaluated the visuals and identified the next most useful ones:
  - system distance matrix
  - verification coverage bars
  - cumulative surah drift views
  - ayah conversion stepper
  - evidence coverage views

### Phase 12 — First real primary evidence + comparison views
- Added the first real primary citations from **al-Dānī’s *al-Bayān***:
  - **6 primary citations**
  - Kuwait 1414هـ / 1994م edition
  - page **88**
  - covering six **Madanī-first** points
- Added more review outputs:
  - `workload.md`
  - `system-distance.md`
  - `evidence-ledger.md`
- Added a new `/compare` route to the site.
- Added new site visuals/data for:
  - system distance matrix
  - verification coverage bars
  - ranked review workload
  - within-surah drift against Kufi

### Phase 13 — Structured source-bundle importer
- Added an importer for supplied book bundles:
  - `scripts/source-bundles/import-evidence-from-supplied-bundles.mjs`
- Added `docs/source-bundle-workflow.md`.
- Began using uploaded structured data from classical sources in a disciplined way:
  - **البيان** as the primary ingestion layer
  - **نفائس البيان / شرح الفرائد الحسان** as commentary/adjudication
- Imported:
  - **40 exact primary matches** from the supplied `البيان` batch
  - **111 commentary matches** from the supplied `نفائس` bundle
- Evidence state after the pass:
  - `primary_cited`: **45**
  - `secondary_only`: **68**
  - `disputed`: **2**
  - `uncited`: **131**
- Surfaced live tension points such as `3:92`, `3:97`, and `6:73`.

### Phase 14 — Dual use of al-Qāḍī material
- Extended the importer so the uploaded القاضي material was used in two distinct layers:
  - `الفرائد الحسان` as a direct secondary witness
  - `نفائس البيان` as commentary
- This meant covered points could now carry multiple witnesses:
  - primary `البيان`
  - secondary `الفرائد`
  - commentary `نفائس`
- Through the then-current frontier (up to **surah 26**), no covered disputed-point record remained uncited.
- Underlying evidence counts became much richer even where status labels did not change.

### Phase 15 — Integration of a more canonical al-Bayān source
- Integrated a newer, more canonical structured **البيان في عد آي القرآن** bundle.
- Replaced the checked-in `sources/al_bayan/` witness with the new source.
- Coverage of the checked-in primary witness became:
  - pilot material
  - surahs **2–13**
- Added generated cross-references:
  - `dist/review/al-bayan-cross-reference.json`
  - `dist/review/al-bayan-cross-reference.md`
- Result:
  - **52 exact primary matches** across the current checked-in `البيان` frontier
  - **3 frontier exceptions** remained explicit:
    - `3:92:internal:تحبون`
    - `3:97:internal:إبراهيم`
    - `6:73:internal:فيكون`
- Evidence state after the pass:
  - `primary_cited`: **57**
  - `secondary_only`: **56**
  - `disputed`: **2**
  - `uncited`: **131**

### Phase 16 — Developer guide and plain-language project explanation
- Added a new site page: **`/developer`**
  - basic usage for Quran apps
  - forward mapping examples
  - reverse mapping examples
  - rawi metadata examples
  - surah-count examples
  - explanation of `mapped`, `merged`, `split`, and `covers_multiple`
- Added a new site page: **`/project`**
  - plain-language explanation of the problem
  - project motivation
  - approach and workflow
  - how evidence is tied to ground truth
  - what the project does and does not claim
- Added matching repo docs:
  - `docs/developer-usage.md`
  - `docs/project-introduction.md`

### Phase 17 — Arabic scholar-facing introduction
- Added a full Arabic companion introduction:
  - `docs/project-introduction.ar.md`
- Added a matching site route:
  - `/project/ar`
- Wired the Arabic page into the home page, English project page, and footer.
- Fixed a small missing import in the site (`BookOpenCheckIcon`).

---

## Current state after Phase 17

### Canonical source layer
The repo’s hand-maintained source layer now centers on concise, reviewable files:
- `data/counting-systems.json`
- `data/qiraat.json`
- `data/book-boundary-primitives.json`
- `data/book-boundary-evidence.json`

### Generated outputs
Verbose operational artifacts are generated under `dist/`, including:
- mappings
- reverse mappings
- rawi metadata views
- surah counts
- boundary-event views
- reconciliation files
- review packets
- source cross-references

### Evidence state
By the end of Phase 17, the evidence ledger stood at:
- **57** `primary_cited`
- **56** `secondary_only`
- **2** `disputed`
- **131** `uncited`

### Public site
The site includes:
- `/`
- `/explorer`
- `/compare`
- `/systems/:system`
- `/surahs/:surah`
- `/developer`
- `/project`
- `/project/ar`

### What the project can now do
- Represent the six counting systems from a concise, book-shaped primitive layer.
- Generate forward and reverse numbering mappings deterministically.
- Track evidence per disputed boundary point.
- Produce scholar review packets and source cross-references.
- Expose the dataset through a simple SPA for comparison, exploration, and integration guidance.

### What still remains
The main remaining work is no longer structural. It is scholarly and editorial:
- continue the evidence pass beyond the current primary-source frontier
- resolve the remaining frontier exceptions where `البيان` and later witnesses do not line up cleanly
- move more points from `secondary_only` and `uncited` into `primary_cited`
- complete scholar review system by system
