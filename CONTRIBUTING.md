# Contributing to Qiraat Ayah Map

Thank you for contributing.

## Understand the source and generated layers first

This repository now has six related but distinct layers:

1. **Book-aligned boundary primitives** — `data/book-boundary-primitives.json`
   - canonical authored scholarly claim layer
   - groups disputed boundary points by location and word
   - lists the counting systems that count that point as a ra's ayah

2. **Boundary evidence sidecar** — `data/book-boundary-evidence.json`
   - canonical authored evidence and review layer
   - tracks verification status, citations, and reviewer state for each primitive point

3. **Word-level compatibility view** — `dist/differences.json`
   - generated from the canonical primitive layer
   - preserves the legacy per-system word-level shape

4. **Operational forward mappings** — `dist/mappings/by-counting-system/kufi-to-*.json`
   - generated runtime artifacts
   - all reverse mappings, rawi aliases, surah counts, and generated audits are derived from these

5. **Generated review and audit layers**
   - `dist/review/`
   - `dist/boundary-events.json`
   - `dist/differences-reconciliation.json`
   - do not edit these by hand; regenerate them

6. **Curated classical-count attestations** — `dist/classical-count-attestations.json`
   - records explicit primary-riwaya total decisions for disputed aggregate counts
   - do not edit generated fields by hand; regenerate them

## Common contribution types

### 1) Scholarly boundary correction

Use this path when you have a source that identifies the exact **word** where an ayah boundary differs.

1. Edit `data/book-boundary-primitives.json`
2. Add or update the matching entry in `data/book-boundary-evidence.json`
3. Regenerate the dataset:
   ```bash
   npm run generate
   ```
4. Run tests:
   ```bash
   npm test
   ```
5. In your pull request, include:
   - the scholarly source
   - the disputed boundary word
   - whether it is an `end` boundary or an `internal` boundary
   - which counting systems should count it
   - the evidence tier, locator, and verification-status change

### 2) Operational mapping correction

Use this path when the shipped mapping itself is wrong or incomplete, regardless of whether the word-level source file is already reconciled.

1. Edit the relevant generator or normalization logic
2. Regenerate derived files:
   ```bash
   npm run generate
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. In your pull request, explain:
   - what was wrong in the generated mapping behavior
   - whether the correction also needs a follow-up scholarly update in `data/book-boundary-primitives.json`

### 3) Evidence and reviewer-state update

Use this path when the primitive claim stays the same but the scholarly support gets stronger or clearer.

1. Edit `data/book-boundary-evidence.json`
2. Regenerate:
   ```bash
   npm run generate
   ```
3. Re-run validation:
   ```bash
   npm test
   ```
4. Confirm that the generated review files under `dist/review/` reflect the intended status and citations

## Forward mapping semantics

Forward entries always keep an integer `target_ayah`.

Examples:

```json
{ "target_ayah": 4, "status": "mapped" }
{ "target_ayah": 1, "status": "merged", "merges_with_next": true }
{ "target_ayah": 5, "status": "split", "splits_into": [5, 6] }
```

A split entry may also carry `"merges_with_next": true` in the rare case where one Hafs ayah both splits and then shares its final target ayah with the following Hafs ayah.

## Book-aligned primitive format

`data/book-boundary-primitives.json` uses grouped disputed-boundary points like this:

```json
{
  "2": {
    "219": {
      "internal": [
        { "word": "ينفقون", "counted_by": ["madani-first"] }
      ],
      "end": {
        "word": "تتفكرون",
        "counted_by": ["makki", "basri", "dimashqi", "kufi"]
      }
    }
  }
}
```

Rules:

- `end` = disputed boundary at the end of the specified Kufan/Hafs ayah
- `internal` = disputed boundary inside the specified Kufan/Hafs ayah, after the named word
- `counted_by` names the systems that count that point as a ra's ayah
- ordinary undisputed Kufan ends are implicit and omitted

See the in-site schema doc at `https://quranpedia.github.io/qiraat-ayah-map/docs/schema-book-boundary-primitives-v1` for the full schema contract.

## Word-level compatibility format

`dist/differences.json` is generated from `data/book-boundary-primitives.json` and uses items like this:

```json
{
  "surah": 2,
  "hafs_ayah": 1,
  "word": "الم",
  "type": "merge"
}
```

Fields:

- `surah` — 1 to 114
- `hafs_ayah` — ayah number in the Kufan/Hafs reference
- `word` — the word at which the boundary note is anchored
- `type` — `merge` or `split`

## Generated boundary-events format

`dist/boundary-events.json` is generated from the normalized forward mappings and uses items like this:

```json
{
  "surah": 2,
  "hafs_ayah": 1,
  "type": "merge",
  "count": 1
}
```

This file is count-based, not word-based.

## Validation commands

```bash
npm run generate
npm test
npm run test:api
```

- `npm run generate` refreshes all generated data under `dist/`, including review packets under `dist/review/`
- `npm test` runs the local structural and consistency checks across both the scholarly source layer and the generated artifacts
- `npm run test:api` checks known public mushaf IDs against Quranpedia

## Pull request checklist

Before opening a PR:

- confirm whether your change is **scholarly**, **operational**, or both
- regenerate the derived files
- run the test suite
- mention the source or rationale in the PR description
- note any unresolved reconciliation work still left in `dist/differences-reconciliation.json`, `dist/classical-count-attestations.json`, or `dist/review/open-questions.md`

## Code of conduct

This is a scholarly project in service of the Muslim community. Please keep discussion respectful, precise, and constructive.

## Evidence status workflow

The canonical evidence file supports these statuses:

- `uncited`
- `secondary_only`
- `primary_cited`
- `primary_cited_and_reviewed`
- `disputed`
- `unresolved`

The intended direction is:

`uncited` → `secondary_only` / `primary_cited` → `primary_cited_and_reviewed`

When sources conflict or remain unclear, use `disputed` or `unresolved` instead of forcing a premature conclusion.

See also:

- `https://quranpedia.github.io/qiraat-ayah-map/docs/editorial-policy`
- `https://quranpedia.github.io/qiraat-ayah-map/docs/methodology`
- `https://quranpedia.github.io/qiraat-ayah-map/docs/source-catalog`
- `https://quranpedia.github.io/qiraat-ayah-map/docs/reviewer-guide-ar`
