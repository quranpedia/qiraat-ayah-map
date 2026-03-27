# Contributing to Qiraat Ayah Map

Thank you for contributing.

## Understand the four data layers first

This repository now has four related but distinct layers:

1. **Word-level scholarly notes** — `data/differences.json`
   - includes `word`
   - best for scholarly/source correction work

2. **Operational forward mappings** — `data/mappings/by-counting-system/kufi-to-*.json`
   - these are generated artifacts
   - they are the practical source of truth for the shipped dataset at runtime
   - all reverse mappings, rawi aliases, surah counts, and generated audits are derived from these

3. **Generated reconciliation layers**
   - `data/boundary-events.json`
   - `data/differences-reconciliation.json`
   - do not edit these by hand; regenerate them

4. **Curated classical-count attestations** — `data/classical-count-attestations.json`
   - records explicit primary-riwaya total decisions for disputed aggregate counts
   - currently used for the Makki total
   - do not edit generated fields by hand; regenerate them

## Common contribution types

### 1) Scholarly word-level correction

Use this path when you have a source that identifies the exact **word** where an ayah boundary differs.

1. Edit `data/differences.json`
2. Regenerate the dataset (all non-Kufan systems are generated from word-level data):
   ```bash
   npm run generate
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. In your pull request, include:
   - the scholarly source
   - the counting system
   - the surah and ayah range affected
   - whether the change is a `merge` or `split`

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
   - whether the correction also needs a follow-up scholarly update in `data/differences.json`

## Forward mapping semantics

Forward entries always keep an integer `target_ayah`.

Examples:

```json
{ "target_ayah": 4, "status": "mapped" }
{ "target_ayah": 1, "status": "merged", "merges_with_next": true }
{ "target_ayah": 5, "status": "split", "splits_into": [5, 6] }
```

A split entry may also carry `"merges_with_next": true` in the rare case where one Hafs ayah both splits and then shares its final target ayah with the following Hafs ayah.

## Word-level differences format

`data/differences.json` uses items like this:

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

`data/boundary-events.json` is generated from the normalized forward mappings and uses items like this:

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

- `npm run generate` refreshes all derived data, including classical-count attestations
- `npm test` runs the local structural and consistency checks
- `npm run test:api` checks known public mushaf IDs against Quranpedia

## Pull request checklist

Before opening a PR:

- confirm whether your change is **scholarly**, **operational**, or both
- regenerate the derived files
- run the test suite
- mention the source or rationale in the PR description
- note any unresolved reconciliation work still left in `data/differences-reconciliation.json` or `data/classical-count-attestations.json`

## Code of conduct

This is a scholarly project in service of the Muslim community. Please keep discussion respectful, precise, and constructive.
