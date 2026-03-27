# Qiraat Ayah Map

**Open dataset mapping Quran ayah numbers between the six canonical counting systems used by the ten Qiraat.**

[اقرأ هذا المستند بالعربية](docs/README.ar.md)

---

## Background

The Quran has been transmitted through **10 canonical Qiraat** (recitation traditions). Each Qiraa has **2 Rawis** (narrators), giving **20 Riwayat** in total. For example, the Qiraa of Asim was transmitted by Hafs and Shu'ba.

Each Qiraa follows one of **6 counting systems** (`'adad`) that determine where ayah boundaries fall. Multiple Qiraat can share the same counting system:

- **Kufan** — used by Asim, Hamza, Al-Kisai, and Khalaf
- **Last Madinan** — used by Nafi'
- **Makkan** — used by Ibn Kathir
- **Basran** — used by Abu Amr and Ya'qub
- **First Madinan** — used by Abu Ja'far
- **Damascene** — used by Ibn Amir

So all rawis of the same Qiraa share the same ayah numbering, and Qiraat that use the same counting system also share the same numbering.

## The problem

Because counting systems differ, `surah + ayah` is **not stable across Qiraat**. A word group that is one ayah in Hafs can be merged into a neighboring ayah in another counting system, or a single Hafs ayah can split into multiple target ayahs.

Example: in Surah Al-Baqarah, Hafs counts **﴿الم﴾** as a standalone ayah, while Warsh merges it with the following ayah. So Hafs ayah 5 corresponds to Warsh ayah 4, not 5.

## What this repository provides

This repository ships **precomputed JSON files** for:

- forward mappings: **Hafs (Kufan) → target counting system**
- reverse mappings: **target counting system → Hafs (Kufan)**
- rawi aliases for all **12 non-Kufan rawis**
- per-surah ayah counts for all 6 counting systems
- a mapping-aligned boundary-event file, a reconciliation report against the scholarly word-level source data, and a curated classical-count attestation note for disputed totals

## Data files

```text
data/
├── counting-systems.json              # 6 counting systems (keyed by system ID)
├── qiraat.json                        # 10 Qiraat + 20 rawis (keyed by qiraa slug)
├── differences.json                   # Word-level scholarly differences vs. Kufan
├── boundary-events.json               # Authoritative boundary deltas aligned to shipped mappings
├── differences-reconciliation.json    # Audit of differences.json vs. boundary-events.json
├── classical-count-attestations.json  # Primary-riwaya total decisions for disputed systems
├── rawis/                             # 20 per-rawi metadata files
│   ├── hafs.json
│   ├── warsh.json
│   └── ...
├── mappings/by-counting-system/       # 10 files (5 non-Kufi systems × 2 directions)
│   ├── kufi-to-madani-last.json
│   ├── madani-last-to-kufi.json
│   └── ...
├── mappings/by-rawi/                  # 24 files (12 non-Kufi rawis × 2 directions)
│   ├── hafs-to-warsh.json
│   ├── warsh-to-hafs.json
│   └── ...
└── surah-counts/                      # 6 per-system surah-count files
    ├── kufi.json
    ├── madani-last.json
    └── ...
```

## Forward mapping structure

Forward files live at `data/mappings/by-counting-system/kufi-to-{system}.json`.

```json
{
  "_version": "0.1.0",
  "_source": "kufi",
  "_target": "madani-last",
  "surahs": {
    "1": {
      "hafs_ayah_count": 7,
      "target_ayah_count": 7,
      "ayahs": {
        "1": { "target_ayah": 1, "status": "merged", "merges_with_next": true },
        "2": { "target_ayah": 1, "status": "mapped" }
      }
    }
  }
}
```

Each surah contains:

- `hafs_ayah_count` — ayah count in Kufan/Hafs
- `target_ayah_count` — ayah count in the target system
- `ayahs` — one entry for every Hafs ayah in that surah

### Forward entry types

**Mapped** — normal 1:1 correspondence.

```json
{ "target_ayah": 4, "status": "mapped" }
```

**Merged** — this Hafs ayah does not end as an independent target ayah; it continues into the following Hafs ayah's target coverage.

```json
{ "target_ayah": 1, "status": "merged", "merges_with_next": true }
```

`target_ayah` is still the covering target ayah number. It is **not null**.

**Split** — one Hafs ayah becomes multiple target ayahs.

```json
{ "target_ayah": 5, "status": "split", "splits_into": [5, 6] }
```

### Split + merge on the same Hafs ayah

A small number of places do both. In that case the entry stays `status: "split"`, but also carries `"merges_with_next": true`.

```json
{ "target_ayah": 217, "status": "split", "splits_into": [217, 218], "merges_with_next": true }
```

That means the Hafs ayah first splits, and its **last** target ayah is also shared with the next Hafs ayah.

## Reverse mapping structure

Reverse files live at `data/mappings/by-counting-system/{system}-to-kufi.json`.

```json
{
  "hafs_ayah": 1,
  "hafs_ayahs": [1, 2],
  "status": "covers_multiple"
}
```

Reverse entry types:

- `mapped` — one target ayah corresponds to one Hafs ayah
- `covers_multiple` — one target ayah covers multiple consecutive Hafs ayahs

When a target ayah is one product of a split, it still appears as a normal `mapped` entry back to the same `hafs_ayah`.

## Rawi aliases

Rawi alias files live at `data/mappings/by-rawi/`.

Examples:

- `hafs-to-warsh.json`
- `warsh-to-hafs.json`
- `hafs-to-ruways.json`
- `ruways-to-hafs.json`

Only **non-Kufan rawis** need alias files here. Kufan rawis are identity-numbered with Hafs.

## Rawi metadata

Rawi metadata files live at `data/rawis/{rawi}.json`.

```json
{
  "_rawi": "warsh",
  "_qiraa": "nafi",
  "_counting_system": "madani-last",
  "_mushaf_id": 4,
  "_mapping_file": "mappings/by-counting-system/kufi-to-madani-last.json"
}
```

Notes:

- `_mushaf_id` is nullable; not every rawi currently has a public Quranpedia mushaf ID in the dataset.
- Kufan rawis use `"_mapping_file": null` because their numbering is identical to Hafs.

## Surah counts

Per-system surah counts live at `data/surah-counts/{system}.json`.

```json
{
  "_counting_system": "madani-last",
  "_total_ayahs": 6214,
  "surahs": {
    "1": 7,
    "2": 285,
    "3": 200
  }
}
```

## The two differences layers

### `data/differences.json`

This is the **word-level scholarly source layer**. Its items look like this:

```json
{ "surah": 2, "hafs_ayah": 1, "word": "الم", "type": "merge" }
```

Use it when you need the original scholarly boundary notes with words attached.

### `data/boundary-events.json`

This is the **authoritative mapping-aligned layer**. Its items look like this:

```json
{ "surah": 2, "hafs_ayah": 1, "type": "merge", "count": 1 }
```

Use it when you need data that is guaranteed to reproduce the shipped mappings, reverse mappings, and surah totals.

### `data/differences-reconciliation.json`

This file compares the two layers system-by-system and surah-by-surah. It is especially useful when the word-level source data and the shipped mappings are not yet fully reconciled.

### `data/classical-count-attestations.json`

This file records explicit primary-riwaya total decisions when a counting system has disputed boundaries that can produce more than one published aggregate. The current curated entry is for the Makkan count.

## Provenance and source of truth

Current pipeline:

- all **non-Kufan** forward mappings are generated from `differences.json`
- normalization makes merge-overlap semantics explicit in the generated forward mappings
- all reverse mappings, rawi aliases, surah counts, `boundary-events.json`, and `differences-reconciliation.json` are generated from the normalized forward mappings
- `classical-count-attestations.json` records any explicit primary-riwaya total decision that must remain visible even after the operational mappings are generated

So `data/differences.json` is the editorial scholarly source of truth, while the **normalized forward mapping files** are the generated operational source of truth for the shipped dataset.

## The six counting systems

| System | Arabic | Total Ayahs | Used by |
|---|---|---:|---|
| Kufan | الكوفي | 6,236 | Asim, Hamza, Al-Kisai, Khalaf |
| Last Madinan | المدني الأخير | 6,214 | Nafi' |
| Makkan | المكي | 6,219 | Ibn Kathir |
| Basran | البصري | 6,204 | Abu Amr, Ya'qub |
| First Madinan | المدني الأول | 6,214 | Abu Ja'far |
| Damascene | الدمشقي | 6,226 | Ibn Amir |

## Validation

```bash
npm run generate
npm test
npm run test:api
```

- `npm run generate` refreshes rawi metadata, mappings, reverse mappings, boundary events, reconciliation, classical-count attestations, and surah counts
- `npm test` runs the local structural and consistency suite
- `npm run test:api` checks known public mushaf IDs against the Quranpedia API

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

If you are doing scholarly correction work, distinguish between:

- **word-level source corrections** in `data/differences.json`
- **generator / normalization corrections** in the scripts that produce the forward mappings

Then run `npm run generate` and `npm test`.

## Source

Primary scholarly reference: **البيان في عدّ آي القرآن** by Abu Amr al-Dani.

The current dataset also tracks practical mapping compatibility with Quranpedia's public mushafs.
