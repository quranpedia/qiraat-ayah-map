# Book-aligned boundary primitives v1

This document defines the **scholar-facing primitive layer** for ayah-boundary differences.

The goal is not binary compression. The goal is to store the data in the same shape that books of **`add al-ayy** usually present it:

- a **boundary position**
- anchored by the **word** named in the source
- plus the **counting systems that count that position as a ra's ayah**

That makes the source layer easier to review against works such as *al-Bayan*, *Jamal al-Qurra'*, *Nafais al-Bayan*, and specialized books on the counting traditions.

The paired citation and review state for each primitive point lives in `data/book-boundary-evidence.json`.

## Modeling rule

Each primitive is a **disputed boundary point** (`موضع خلاف في عد الآي`).

The primitive does **not** say:

- “merge relative to Kufi”
- “split relative to Kufi”
- “forward target ayah = N”

Instead it says:

- **this word marks a possible ayah ending**
- **these counting systems count it**

Operational merge/split behavior is then derived from that more book-like statement.

## Reference frame

The repository still uses **Kufi/Hafs** as its runtime reference numbering.

That reference affects only the container shape:

- `surahs.{surah}.{hafs_ayah}.end` means the disputed boundary sits at the **end** of that Kufi/Hafs ayah
- `surahs.{surah}.{hafs_ayah}.internal[]` means the disputed boundary sits **inside** that Kufi/Hafs ayah, after the named word

This is a storage convenience, not the scholarly claim itself.

## File shape

`data/book-boundary-primitives.json`

```json
{
  "_version": "0.1.0",
  "_reference_system": "kufi",
  "_counting_system_order": [
    "madani-first",
    "madani-last",
    "makki",
    "basri",
    "dimashqi",
    "kufi"
  ],
  "surahs": {
    "2": {
      "1": {
        "end": {
          "word": "الم",
          "counted_by": ["kufi"]
        }
      },
      "219": {
        "internal": [
          {
            "word": "ينفقون",
            "counted_by": ["madani-first"]
          }
        ],
        "end": {
          "word": "تتفكرون",
          "counted_by": ["makki", "basri", "dimashqi", "kufi"]
        }
      }
    }
  }
}
```

## Semantics

### Omitted surahs and ayahs

Omitted surahs and ayahs have **no disputed boundary points**.

That means:

- all ordinary Kufi/Hafs ayah endings are counted by all systems
- there are no extra internal boundaries to review in those places

## `end`

`end` represents a **disputed end boundary** at the end of the specified Kufi/Hafs ayah.

Example:

```json
"1": {
  "end": {
    "word": "الم",
    "counted_by": ["kufi"]
  }
}
```

Meaning:

- the ayah ending after `الم` is a disputed head
- Kufi counts it
- the non-listed systems do not count it there

In classical prose, this is the kind of statement usually expressed as:

- “عدها الكوفي”
- or “لم يعدها فلان”

### Rules for `end`

- `counted_by` **must include** `kufi`
- `word` is the anchoring word for that end boundary
- only **disputed** end boundaries are listed
- undisputed ends are implicit and omitted

## `internal`

`internal` is an ordered list of **extra disputed boundary points inside** the specified Kufi/Hafs ayah.

Example:

```json
"40": {
  "internal": [
    { "word": "تحزن", "counted_by": ["dimashqi"] },
    { "word": "فتونا", "counted_by": ["basri", "dimashqi"] },
    { "word": "مدين", "counted_by": ["dimashqi"] }
  ]
}
```

Meaning:

- these words mark possible internal ayah endings inside the Kufi/Hafs ayah
- each point is counted only by the systems listed in `counted_by`

### Rules for `internal`

- `counted_by` **must not include** `kufi`
- entries are ordered in the textual order implied by the scholarly source lists
- multiple internal boundaries may occur in one ayah

## Derivation rules

This file is the canonical source layer for generated mappings.

### To reconstruct `differences.json`

For each `end` point:

- emit a `merge` item for every **non-Kufi** system that is **not** listed in `counted_by`

For each `internal` point:

- emit a `split` item for every system listed in `counted_by`

### To reconstruct forward mappings

For a target counting system:

- start from ordinary Kufi boundaries
- remove every disputed `end` boundary that the target system does **not** count
- add every disputed `internal` boundary that the target system **does** count
- sort all counted boundaries in reading order and renumber ayahs

## Why this is the right primitive layer

It is:

- **closer to the books** than merge/split deltas
- **symmetric** across counting systems
- **reviewable by scholars** without reading generated mapping artifacts
- still concise enough that large JSON expansions can become generated artifacts later

## Phase status

In the current phase this file is the **canonical authored scholarly source** for disputed boundaries.

`dist/differences.json` is generated from it as a legacy compatibility projection, and all non-Kufan mappings are generated from this primitive layer without changing public behavior.
