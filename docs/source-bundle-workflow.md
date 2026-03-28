# Source-bundle workflow

This project keeps its canonical scholarly claim layer in:

- `data/book-boundary-primitives.json`
- `data/book-boundary-evidence.json`

Structured source witnesses now live under `sources/` and are used in two ways:

- to advance `data/book-boundary-evidence.json`
- to generate scholar-facing cross-reference artifacts under `dist/review/`

They still do **not** replace the canonical authored claim layer under `data/`.

## The supplied bundles play three evidentiary roles

### 1. `البيان في عدّ آي القرآن` bundle

Use the structured `al_bayan_*surah_*.json` files as the **primary-source ingestion layer**.

Best use cases:

- exact phrase-level matches against a primitive point
- direct school-level support for `counted_by`
- strong `primary` citations for surahs already covered by the structured batch

Current checked-in coverage in `sources/al_bayan`:

- pilot for surah 1
- surahs 2–13 in structured form

Generated cross-reference artifact:

- `dist/review/al-bayan-cross-reference.{json,md}`

Project rule:

- when the bundle gives an exact phrase-level match and the imported school set matches the current primitive, promote the point to `primary_cited`

### 2. `الفرائد الحسان في عدّ آي القرآن` within the القاضي bundle

The supplied القاضي bundle is not commentary only. It also embeds `kind: poem` segments from the matn of
`الفرائد الحسان`.

Use those poem segments as a **direct later-manual witness**.

Best use cases:

- strengthening already-covered points with a second explicit count-book witness
- preserving the exact compact count phrasing used by the poem
- giving reviewers a direct matn-level citation separate from the sharḥ

Project rule:

- cite these poem segments as `tier: secondary`
- do **not** treat them as equivalent to the primary classical witness of `البيان`

Current bundle frontier for poem support:

- disputed points through surah 26

### 3. `نفائس البيان — شرح الفرائد الحسان` within the same القاضي bundle

Use the `kind: commentary` and `kind: technical_note` segments as the **commentary and adjudication layer**.

Best use cases:

- points not yet covered by the current `البيان` batch
- places where the commentator explicitly names the counted and omitted schools
- occurrence qualification such as “the first” / “the second”
- narrator-level or Madani-internal nuance that helps explain why a six-system projection is difficult
- reviewer-facing prose that is easier to audit than raw entry compression

Project rule:

- when the commentary supports the current primitive and no direct primary witness has been entered yet, keep the point `secondary_only`
- when commentary and current primary ingestion materially diverge, keep the point `disputed` or `unresolved` rather than forcing a silent harmonization

Current bundle frontier for commentary support:

- disputed points through surah 26

## Current decision tree

### Exact primary alignment

Result:

- add a `primary` evidence entry from `البيان`
- keep or upgrade the point to `primary_cited`
- optionally add a `secondary` entry from `الفرائد الحسان`
- optionally add a `commentary` entry from `نفائس البيان`

### Later-manual alignment without current primary coverage

Result:

- add a `secondary` evidence entry from `الفرائد الحسان` where the poem segment is clear
- add a `commentary` evidence entry from `نفائس البيان` where the sharḥ is available
- mark the point `secondary_only`
- leave a note if the current `البيان` bundle simply does not cover that point yet

### Primary / later-manual tension

Result:

- keep the supporting `secondary` / `commentary` entries
- do **not** coerce the point into `primary_cited`
- mark the point `disputed` or `unresolved`
- record the reason in the point note

## Concrete examples from the current pass

### `3:92` — `تحبون`

- `الفرائد الحسان` and `نفائس البيان` support the current project reading through the Makkan, Dimashqi, and the Madani line represented here by Shaybah
- the supplied `البيان` batch carries an internal note about Madani split transmission at this location
- the project therefore keeps the point visible but marks it `disputed`

### `3:97` — `إبراهيم`

- `الفرائد الحسان` and `نفائس البيان` explicitly support the current project primitive
- the current `البيان` batch does not yet expose a matching primary item for this point
- the project therefore keeps it `secondary_only`

### `6:73` — `فيكون`

- `الفرائد الحسان` and `نفائس البيان` support the current project primitive
- the supplied `البيان` batch instead surfaces the second `إلى صراط مستقيم` after `كن فيكون` together with `دينا قيما`
- the project therefore keeps the point `disputed` until the primary witness is reconciled directly

## Import command

Dry run:

```bash
node scripts/source-bundles/import-evidence-from-supplied-bundles.mjs \
  --al-bayan /path/to/al_bayan_cumulative_through_batch10.zip \
  --nafais /path/to/phase1_data_through_installment_17.zip
```

Apply changes to `data/book-boundary-evidence.json`:

```bash
node scripts/source-bundles/import-evidence-from-supplied-bundles.mjs \
  --al-bayan /path/to/al_bayan_cumulative_through_batch10.zip \
  --nafais /path/to/phase1_data_through_installment_17.zip \
  --apply \
  --report /tmp/source-bundle-report.json
```

## What this importer deliberately does not do

- it does not rewrite `data/book-boundary-primitives.json`
- it does not silently resolve school-level ambiguities
- it does not replace direct review of the primary witness where the bundles disagree
- it does not become part of `npm run generate`

The canonical repo must remain reproducible from its checked-in scholarly source layer under `data/`.
The checked-in witness bundles under `sources/` are curator and cross-reference tools, not replacements for that authored source layer.
