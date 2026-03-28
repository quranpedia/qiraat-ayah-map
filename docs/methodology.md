> New here? Read [`project-introduction.md`](project-introduction.md) first, or [`project-introduction.ar.md`](project-introduction.ar.md) for the Arabic companion. This file describes the technical model after that broader introduction.

# Methodology

## Core model

The project models disputed Quran ayah boundaries in a book-aligned way.

The canonical scholarly claim lives in `data/book-boundary-primitives.json`:

- `end` = a disputed boundary at the end of a Kufan/Hafs ayah
- `internal` = a disputed boundary inside that Kufan/Hafs ayah
- `counted_by` = the counting systems that count the point as a ra's ayah

The evidence sidecar lives in `data/book-boundary-evidence.json` and tracks:

- verification status
- citations
- reviewer notes

Everything else is generated.

## Derivation flow

`npm run generate` performs these steps:

1. normalize the primitive source layer
2. normalize and synchronize the evidence sidecar
3. generate the legacy compatibility projection (`dist/differences.json`)
4. generate forward mappings
5. normalize forward mappings
6. generate reverse mappings
7. generate boundary-event and reconciliation layers
8. generate rawi metadata and surah counts
9. generate classical total attestation notes
10. generate scholar-review packets under `dist/review/`
11. generate the checked-in `البيان` cross-reference report under `dist/review/`
12. generate the SPA UI contract under `site/src/lib/data/generated/`

## Why this model is reviewable

Traditional books of `ʿadad al-āy` are naturally read as boundary claims, not as reverse maps or array arithmetic.

The project therefore asks the scholar-facing question directly:

- Is this point a ra's ayah in this counting system?

That is easier to verify than reviewing large expanded mapping files.

## Why generated mappings still matter

The mapping files remain important for downstream consumers:

- apps that convert ayah numbers across rawis and counting systems
- reverse lookup workflows
- public API comparisons
- surah-count tables

But they are reproducible outputs, not the primary scholarly document.

## Validation gates

The project now has three validation gates.

### 1. Source validation

Checks the canonical files under `data/` for schema, alignment, ordering, and evidence coverage rules.

### 2. Derivation validation

Checks that generated forward and reverse mappings, surah counts, and rawi aliases are fully consistent.

### 3. Review validation

Checks that review packets are in sync with the source layer and that evidence statuses are represented accurately in generated review artifacts.

## Review outputs

The generated review layer under `dist/review/` is intended for scholar outreach and UI work. The site consumes a reduced JSON contract generated into `site/src/lib/data/generated/site-data.json` for fast client-side exploration:

- `review-data.json` — frontend-friendly flattened rows
- `master-matrix.csv` — spreadsheet review matrix
- `systems/*.md` — system-by-system packets
- `totals.md` — totals sheet
- `open-questions.md` — unresolved or unreviewed claims
- `al-bayan-cross-reference.{json,md}` — exact-match and exception tracking against the checked-in structured `البيان` witness


## Site deployment note

The SPA is deployed as a static GitHub Pages artifact. The frontend build must receive the Pages base path, and the built output must include a `404.html` fallback so client-side routes can recover on direct loads.


## Source-witness pass

The repo now checks in its current structured witness frontier under `sources/`.

- `sources/al_bayan` provides the current primary structured frontier for `البيان`
- `sources/nafais` provides the current poem/commentary frontier for `الفرائد الحسان` and `نفائس البيان`

These witnesses still do not replace the canonical authored claim layer in `data/`, but they are now first-class curator aids. The al-Dānī witness feeds `primary` entries and also generates a cross-reference report under `dist/review/`; the embedded `الفرائد الحسان` poem segments from the al-Qāḍī bundle feed direct `secondary` entries; and the bundled `نفائس البيان` commentary segments feed `commentary` entries. The full curator workflow is documented in `docs/source-bundle-workflow.md`.
