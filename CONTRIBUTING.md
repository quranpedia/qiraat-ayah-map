# Contributing to the Qiraat Ayah Count Reference

Thank you for contributing.

## Two counting fields, and which one to join on

A counting madhhab is **attributed** to a qāriʾ. A numbering is **printed** by an
edition. These are two different questions, and this repository answers them in
two different files with two different field names:

| question | field | where it lives |
|---|---|---|
| which madhhab of ʿadd al-āy is this qāriʾ associated with? | `counting_system_associated_with_qari` | `data/qiraat.json`, one per qāriʾ |
| which numbering does this printed muṣḥaf actually carry? | `counting_system_printed` | `data/printed-editions.json`, one per measured printing |

Both appear on every generated rāwī file under `dist/rawis/` as
`_counting_system_associated_with_qari` and `_counting_system_printed`, beside
`_mapping_file_associated_with_qari` and `_mapping_file_printed`.

**The worked example, which is why the two fields exist.** Abū ʿAmr al-Baṣrī is
attributed the Baṣrī count, and `qiraat.json` says so. Both King Fahd Complex
muṣḥafs of his rāwīs measure onto the First Madinan count instead — al-Dūrī at
distance 0, al-Sūsī at distance 1, against 97 and 98 from Baṣrī. Neither figure
is an error. The attribution is a fact about the qāriʾ; the measurement is a
fact about a printing. Before the split there was one field, so anything joining
this repository to one that published the other answer got a contradiction with
nothing in either file saying the two were answering different questions.

Rules:

- **Never derive one from the other.** An attribution is a scholarly claim and
  is changed only with a source. A printed value is a measurement and is changed
  only by re-measuring.
- **Absence means unmeasured.** A rāwī with no entry in `printed-editions.json`
  has `_counting_system_printed: null`. That is not a statement that its printing
  follows the attributed count; it is a statement that nobody has measured one.
- **A printed value is tied to the package it was measured from.** Every entry
  names its `source_package` and `release_year`, because printings of the same
  muṣḥaf disagree with each other — three King Fahd al-Dūrī printings carry two
  different āyah divisions and three different colophons. A new release is a new
  measurement, not an update to an old one.
- **`_counting_system` and `_mapping_file` are deprecated aliases** of the
  attributed pair. Their values and meaning are unchanged, so nothing that reads
  them breaks; they are kept only so consumers can move at their own pace. New
  code should read the explicit names. `dist/rawis/*.json` lists them under
  `_deprecated`.

The matching fields in [`quran-ws/quran-text`](https://github.com/quran-ws/quran-text)
are deliberately the same words: `counting.system_associated_with_qari` and
`counting.system_printed` on each edition, with `differs_from_association`.

## Understand the source and generated layers first

This repository now has seven related but distinct layers:

1. **Book-aligned boundary primitives** — `data/book-boundary-primitives.json`
   - canonical authored scholarly claim layer
   - groups disputed boundary points by location and word
   - lists the counting madhhabs that count that point as a ra's ayah

2. **Printed-edition measurements** — `data/printed-editions.json`
   - canonical authored measurement layer
   - one entry per printed muṣḥaf that has actually been measured
   - records `counting_system_printed`, the distance to it, the distance to the
     count attributed to the qāriʾ, and the package and year measured from
   - never populated by inference from `qiraat.json`

3. **Boundary evidence sidecar** — `data/book-boundary-evidence.json`
   - canonical authored evidence and review layer
   - tracks verification status, citations, and reviewer state for each primitive point

4. **Word-level compatibility view** — `dist/differences.json`
   - generated from the canonical primitive layer
   - preserves the legacy word-level compatibility shape

5. **Operational forward mappings** — `dist/mappings/by-counting-system/kufi-to-*.json`
   - generated runtime artifacts
   - all reverse mappings, rawi aliases, surah counts, and generated audits are derived from these

6. **Generated review and audit layers**
   - `dist/review/`
   - `dist/boundary-events.json`
   - `dist/differences-reconciliation.json`
   - do not edit these by hand; regenerate them

7. **Curated classical-count attestations** — `dist/classical-count-attestations.json`
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
   - which counting madhhabs should count it
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

### 3) A printed-edition measurement

Use this path when a printed muṣḥaf has been measured, or re-measured against a
newer release.

1. Measure the edition's own āyah ends against every madhhab's boundaries in
   this repository. Do not assume, and do not copy the qāriʾ's attribution.
2. Add or update the entry in `data/printed-editions.json`, naming the exact
   `source_package` and `release_year` the measurement was taken from
3. Regenerate and test:
   ```bash
   npm run generate
   npm test
   ```
4. In your pull request, include the distances to all six madhhabs, not only the
   winning one, and say plainly whether it differs from the attribution

A newer release of a muṣḥaf is a **new measurement**, never an edit to an old
one with the package name changed.

### 4) Evidence and reviewer-state update

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
- `counted_by` names the counting madhhabs that count that point as a ra's ayah
- ordinary undisputed Kufan ends are implicit and omitted

See the schema doc at `https://quran.ws/docs/reference/qiraat-ayah-map/source-files/` for the full schema contract.

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

- `https://quran.ws/docs/reference/qiraat-ayah-map/method/` — the editorial method, the evidence tiers, and what each documentation state means
- `https://quran.ws/docs/reference/qiraat-ayah-map/source-files/` — the file contracts, and where the transcribed witnesses live
