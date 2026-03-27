# Book boundary evidence v1

This document defines the canonical scholar-facing evidence sidecar stored at:

- `data/book-boundary-evidence.json`

It is paired one-to-one with:

- `data/book-boundary-primitives.json`

## Purpose

The primitive file stores the scholarly claim.
The evidence file stores the support for that claim.

## Top-level shape

```json
{
  "_version": "0.1.0",
  "_description": "...",
  "_paired_primitive_file": "book-boundary-primitives.json",
  "_counting_system_order": ["madani-first", "madani-last", "makki", "basri", "dimashqi", "kufi"],
  "_verification_status_descriptions": { "uncited": "..." },
  "_evidence_tier_descriptions": { "primary": "..." },
  "surahs": {
    "2": {
      "219": {
        "internal": [
          {
            "word": "ينفقون",
            "verification_status": "uncited",
            "evidence": []
          }
        ],
        "end": {
          "word": "تتفكرون",
          "verification_status": "uncited",
          "evidence": []
        }
      }
    }
  }
}
```

## Alignment rule

Every disputed point present in `book-boundary-primitives.json` must have exactly one matching evidence point here.

Matching means:

- same surah
- same Hafs/Kufi ayah
- same kind (`end` or `internal`)
- same `word`

## Point fields

Each evidence point has:

- `word`
- `verification_status`
- `evidence`
- optional `reviewers`
- optional `note`

### Allowed `verification_status` values

- `uncited`
- `secondary_only`
- `primary_cited`
- `primary_cited_and_reviewed`
- `disputed`
- `unresolved`

## Evidence entries

Each entry in `evidence` has:

- `tier`
- `work`
- optional `edition`
- `locator`
- `supports`
- `strength`
- optional `note`

### `tier`

Allowed values:

- `primary`
- `commentary`
- `secondary`
- `modern-reference`
- `api-check`

### `supports`

`supports` must be a non-empty subset of the paired primitive point's `counted_by` list.

### `strength`

Allowed values:

- `direct`
- `derived`

## Reviewer entries

Each reviewer entry has:

- `name`
- optional `role`
- optional `date`
- optional `note`

## Validation rules

### `uncited`

- `evidence` must be empty
- `reviewers` must be absent or empty

### `secondary_only`

- at least one evidence entry is required
- no evidence entry may use tier `primary`
- the union of all `supports` entries must cover the full primitive `counted_by` list

### `primary_cited`

- at least one evidence entry is required
- at least one evidence entry must use tier `primary`
- the union of all `supports` entries must cover the full primitive `counted_by` list

### `primary_cited_and_reviewed`

- all `primary_cited` rules apply
- at least one reviewer entry is required

### `disputed` / `unresolved`

These may carry partial evidence while the point remains unsettled.
