# Qiraat Ayah Map

**Open dataset mapping Quran ayah numbers between the six canonical counting systems used by the ten Qiraat.**

[اقرأ هذا المستند بالعربية](docs/README.ar.md)

---

## Background

The Quran has been transmitted through **10 canonical Qiraat** (recitation traditions). Each Qiraa was transmitted by **2 Rawis** (narrators) — giving 20 Riwayat in total. For example, the Qiraa of Asim was transmitted by Hafs and Shu'ba.

Each Qiraa follows one of **6 counting systems** ('Adad) that determine where ayah boundaries fall. Multiple Qiraat can share the same counting system:

- **Kufan** — used by Asim (Hafs, Shu'ba), Hamza, Al-Kisai, and Khalaf
- **Last Madinan** — used by Nafi' (Warsh, Qalun)
- **Basran** — used by Abu Amr and Ya'qub
- **Makkan** — used by Ibn Kathir
- **Damascene** — used by Ibn Amir
- **First Madinan** — used by Abu Ja'far

This means: **all Rawis of the same Qiraa share the same ayah numbering**, and Qiraat that use the same counting system also share the same numbering.

## The Problem

Because counting systems differ, ayah numbers do not match across Qiraat. For example, Hafs (Kufan) counts "Alif Lam Mim" (الم) as a separate ayah in Surah Al-Baqarah, while Warsh (Last Madinan) merges it with the following ayah. This means **ayah 5 in Hafs is ayah 4 in Warsh** for the same surah.

Matching ayahs by `surah + number` across Qiraat will return the **wrong ayah** in many cases.

## The Solution

This repository provides **ready-to-use JSON data files** that map ayah numbers between counting systems. No code required — just load the JSON in any programming language.

## Data Files

```
data/
├── counting-systems.json              # The 6 counting systems (keyed by ID)
├── qiraat.json                        # The 10 Qiraat + 20 Rawis (keyed by slug)
├── differences.json                   # Raw word-level differences from Kufan baseline
├── rawis/                             # Per-rawi metadata
│   ├── hafs.json, warsh.json, ...     #   8 rawi files with counting system reference
│
├── mappings/by-counting-system/       # Both directions, keyed by counting system
│   ├── kufi-to-madani-last.json       #   Kufan → target (forward)
│   ├── madani-last-to-kufi.json       #   Target → Kufan (reverse)
│   ├── kufi-to-makki.json
│   ├── makki-to-kufi.json
│   └── ...                            #   10 files total (5 systems × 2 directions)
│
├── mappings/by-rawi/                  # Both directions, keyed by rawi name
│   ├── hafs-to-warsh.json             #   Hafs → Warsh
│   ├── warsh-to-hafs.json             #   Warsh → Hafs
│   ├── hafs-to-qalun.json
│   ├── qalun-to-hafs.json
│   └── ...                            #   12 files (6 non-Kufi rawis × 2 directions)
│
└── surah-counts/                      # Per-surah ayah counts
    ├── kufi.json, madani-last.json, ...
```

## Data Structure

### Mapping Files (`data/mappings/by-counting-system/kufi-to-{system}.json`)

Each mapping file provides a complete ayah-by-ayah lookup from Hafs to a target counting system. The file is organized by surah, then by Hafs ayah number:

```json
{
  "_version": "0.1.0",
  "_source": "kufi",
  "_target": "madani-last",
  "surahs": {
    "1": {
      "hafs_ayah_count": 7,
      "target_ayah_count": 7,
      "ayahs": { ... }
    },
    "2": { ... },
    ...
    "114": { ... }
  }
}
```

Each surah contains `hafs_ayah_count` (how many ayahs Hafs has), `target_ayah_count` (how many the target system has), and an `ayahs` object keyed by Hafs ayah number.

### Ayah Entry Types

Every Hafs ayah maps to the target system in one of three ways:

**1. Mapped** — Direct 1:1 correspondence. Most ayahs are this type.

```json
{ "target_ayah": 4, "status": "mapped" }
```

The Hafs ayah corresponds directly to target ayah 4.

**2. Merged** — This Hafs ayah has no standalone equivalent in the target system. Its content is absorbed into an adjacent target ayah.

```json
{ "target_ayah": null, "status": "merged" }
```

Example: Hafs counts ﴿الم﴾ as ayah 1 in Al-Baqarah. In the Last Madinan system, ﴿الم﴾ is merged with the next ayah — so Hafs ayah 1 has no independent target number.

**3. Split** — This single Hafs ayah becomes two (or more) ayahs in the target system.

```json
{ "target_ayah": 5, "status": "split", "splits_into": [5, 6] }
```

`target_ayah` is the first of the resulting ayahs. `splits_into` lists all target ayah numbers this Hafs ayah maps to.

### Reverse Mappings (`data/mappings/by-counting-system/{system}-to-kufi.json`)

Reverse mappings go from the target system back to Kufan (Hafs). Each entry is keyed by the **target system's ayah number** and tells you which Hafs ayah(s) it corresponds to:

**1. Mapped** — 1:1, this target ayah corresponds to exactly one Hafs ayah.

```json
{ "hafs_ayah": 4, "status": "mapped" }
```

**2. Covers Multiple** — This single target ayah covers content from two or more consecutive Hafs ayahs (the reverse of a merge).

```json
{ "hafs_ayah": 1, "hafs_ayahs": [1, 2], "status": "covers_multiple" }
```

Example: In the Last Madinan system, ayah 1 of Al-Fatiha contains both the Basmalah (Hafs ayah 1) and "الحمد لله رب العالمين" (Hafs ayah 2).

**3. Split product** — This target ayah is one of multiple ayahs created from a single Hafs ayah. Multiple target ayahs will point to the same `hafs_ayah`.

```json
// Target ayah 6 and 7 both come from Hafs ayah 7 (a split)
{ "hafs_ayah": 7, "status": "mapped" }  // target 6
{ "hafs_ayah": 7, "status": "mapped" }  // target 7
```

### Rawi Mappings (`data/mappings/by-rawi/`)

The same mapping data, but addressed by rawi name instead of counting system. Every rawi has two files:

- `warsh-to-hafs.json` — find the Hafs equivalent for any Warsh ayah
- `hafs-to-warsh.json` — find the Warsh equivalent for any Hafs ayah

These are convenient aliases — Warsh and Qalun both point to the same underlying madani-last data, Bazzi and Qunbul to makki, etc.

### Rawi Metadata (`data/rawis/{rawi}.json`)

Each rawi file is a lightweight pointer to the correct mapping:

```json
{
  "_rawi": "warsh",
  "_qiraa": "nafi",
  "_counting_system": "madani-last",
  "_mushaf_id": 4,
  "_mapping_file": "mappings/hafs-to-madani-last.json"
}
```

To find the mapping for any rawi: load its rawi file, read `_mapping_file`, and load that mapping.

### Surah Counts (`data/surah-counts/{system}.json`)

Per-surah ayah counts for each counting system:

```json
{
  "_counting_system": "madani-last",
  "_total_ayahs": 6213,
  "surahs": {
    "1": 7,
    "2": 285,
    ...
    "114": 6
  }
}
```

### Differences (`data/differences.json`)

The raw scholarly data: word-level differences between each counting system and the Kufan reference. Each entry identifies a specific word where an ayah boundary differs:

```json
{
  "surah": 2,
  "hafs_ayah": 1,
  "word": "الم",
  "type": "merge"
}
```

- `type: "merge"` — Kufan counts an ayah boundary at this word, the target system does not.
- `type: "split"` — The target system counts an ayah boundary here, Kufan does not.

### Counting Systems (`data/counting-systems.json`)

Keyed by system ID. Each entry contains Arabic/English names, total ayah count, and which Qiraat use it.

### Qiraat (`data/qiraat.json`)

Keyed by Qiraa slug. Each entry contains the counting system reference and nested rawis (also keyed by slug).

## The Six Counting Systems

| System | Arabic | Total Ayahs | Used By |
|--------|--------|-------------|---------|
| **Kufan** | الكوفي | 6,236 | Asim (Hafs/Shu'ba), Hamza, Al-Kisai, Khalaf |
| **Last Madinan** | المدني الأخير | 6,213 | Nafi' (Warsh/Qalun) |
| **Makkan** | المكي | 6,221 | Ibn Kathir (Bazzi/Qunbul) |
| **Basran** | البصري | 6,217 | Abu Amr (Duri/Susi), Ya'qub |
| **First Madinan** | المدني الأول | 6,214 | Abu Ja'far |
| **Damascene** | الدمشقي | 6,226 | Ibn Amir (Hisham/Ibn Dhakwan) |

## ID Convention

All identifiers use **hyphens** consistently across data files and filenames:

- Counting system IDs: `kufi`, `madani-last`, `basri`, etc.
- Qiraa slugs: `nafi`, `ibn-kathir`, `abu-amr`, etc.
- Rawi slugs: `hafs`, `warsh`, `qalun`, etc.
- Filenames: `hafs-to-madani-last.json`

You can programmatically construct file paths from IDs:
```python
system_id = mapping['_target']  # "madani-last"
counts_file = f"data/surah-counts/{system_id}.json"  # works directly
```

## Key Differences

The main differences between counting systems relate to:

1. **Basmalah** — The Kufan and Makkan systems count "Bismillah" as Ayah 1 in Al-Fatiha. Other systems do not.

2. **Huruf Muqatta'at** (الحروف المقطعة) — The disconnected letters at the start of 29 surahs (الم, الر, حم, etc.). The Kufan system counts all of them as separate ayahs. Other systems merge some or all with the following ayah.

3. **Compensating splits** — When a system merges the Basmalah, it splits another ayah in Al-Fatiha to maintain the universally-agreed count of 7 ayahs.

## Validation

```bash
node tests/validate.mjs           # 67,000+ structural/scholarly assertions
node tests/validate-against-api.mjs  # 350 checks against quranpedia.net live API
```

## Contributing

We welcome contributions. See [CONTRIBUTING.md](CONTRIBUTING.md).

This dataset is a **community effort**. The current data covers counting differences sourced from the quranpedia.net database. Additional scholarly verification and contributions are welcome.

## Source

The primary scholarly reference for this data is **"البيان في عدّ آي القرآن"** by Abu Amr al-Dani.

## License

MIT License. See [LICENSE](LICENSE).

---

Built with ❤️ for the Muslim Ummah by [Quranpedia.net](https://quranpedia.net) and [Nuqayah](https://nuqayah.com)
