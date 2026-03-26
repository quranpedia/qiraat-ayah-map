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
├── counting-systems.json         # The 6 counting systems (keyed by ID)
├── qiraat.json                   # The 10 Qiraat + 20 Rawis (keyed by slug)
├── differences.json              # Raw differences from the Kufan (Hafs) baseline
├── mappings/                     # Pre-computed ayah-by-ayah mappings
│   ├── hafs-to-madani-last.json  #   Hafs → Nafi' (Warsh/Qalun)
│   ├── hafs-to-madani-first.json #   Hafs → Abu Ja'far
│   ├── hafs-to-makki.json        #   Hafs → Ibn Kathir
│   ├── hafs-to-basri.json        #   Hafs → Abu Amr / Ya'qub
│   └── hafs-to-dimashqi.json     #   Hafs → Ibn Amir
└── surah-counts/                 # Per-surah ayah counts for each system
    ├── kufi.json                 #   (also serves as Hafs reference counts)
    ├── madani-last.json
    ├── madani-first.json
    ├── makki.json
    ├── basri.json
    └── dimashqi.json
```

## Quick Start

### Look up a mapping

To find the equivalent of Hafs Surah 2, Ayah 5 in the Warsh (Madani Last) counting:

```python
import json

with open('data/mappings/hafs-to-madani-last.json') as f:
    mapping = json.load(f)

entry = mapping['surahs']['2']['ayahs']['5']
print(entry)
# {"target_ayah": 4, "status": "mapped"}
```

### Check if an ayah is merged

```python
entry = mapping['surahs']['2']['ayahs']['1']
print(entry)
# {"target_ayah": 1, "status": "merged"}
# الم is merged — target_ayah points to the combined ayah in the target system
```

### Check if an ayah is split

```python
entry = mapping['surahs']['1']['ayahs']['6']
print(entry)
# {"target_ayah": 5, "status": "split", "splits_into": [5, 6]}
# This Hafs ayah becomes TWO ayahs in the target system
```

### Get surah ayah count

```python
with open('data/surah-counts/madani-last.json') as f:
    counts = json.load(f)

print(counts['surahs']['2'])  # 285 (vs 286 in Hafs)
```

### Look up a Qiraa by slug

```python
with open('data/qiraat.json') as f:
    qiraat = json.load(f)

nafi = qiraat['nafi']
print(nafi['counting_system'])  # "madani-last"
print(nafi['rawis']['warsh'])   # {"name_ar": "ورش", "name_en": "Warsh"}
```

## Mapping File Format

Each `hafs-to-{system}.json` file contains:

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
        "1": { "target_ayah": 1, "status": "merged" },
        "2": { "target_ayah": 1, "status": "mapped" },
        "6": { "target_ayah": 5, "status": "split", "splits_into": [5, 6] },
        "7": { "target_ayah": 7, "status": "mapped" }
      }
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `target_ayah` | The equivalent ayah number in the target system. Always a number. |
| `status` | `"mapped"` = direct 1:1 mapping. `"merged"` = this ayah's content is absorbed into `target_ayah`. `"split"` = this ayah becomes multiple ayahs in the target system. |
| `splits_into` | (Only when split) Array of target ayah numbers this Hafs ayah becomes. |

## The Six Counting Systems

| System | Arabic | Total Ayahs | Used By |
|--------|--------|-------------|---------|
| **Kufan** | الكوفي | 6,236 | Asim (Hafs/Shu'ba), Hamza, Al-Kisai, Khalaf |
| **Last Madinan** | المدني الأخير | 6,214 | Nafi' (Warsh/Qalun) |
| **First Madinan** | المدني الأول | 6,214 | Abu Ja'far |
| **Makkan** | المكي | 6,230 | Ibn Kathir |
| **Basran** | البصري | 6,214 | Abu Amr, Ya'qub |
| **Damascene** | الدمشقي | 6,230 | Ibn Amir |

## ID Convention

All identifiers use **hyphens** consistently across data files and filenames:

- Counting system IDs: `kufi`, `madani-last`, `basri`, etc.
- Qiraa slugs: `nafi`, `ibn-kathir`, `abu-amr`, etc.
- Rawi slugs: `hafs`, `warsh`, `qalun`, etc.
- Filenames: `hafs-to-madani-last.json`

You can programmatically construct file paths from IDs without any transformation:
```python
system_id = mapping['_target']  # "madani-last"
counts_file = f"data/surah-counts/{system_id}.json"  # works directly
```

## Key Differences

The main differences between counting systems relate to:

1. **Basmalah** — The Kufan system counts "Bismillah" as Ayah 1 in Al-Fatiha. All other systems do not.

2. **Huruf Muqatta'at** (الحروف المقطعة) — The disconnected letters at the start of 29 surahs (الم, الر, حم, etc.). The Kufan system counts all of them as separate ayahs. Other systems merge some or all with the following ayah.

3. **Compensating splits** — When a system merges the Basmalah, it splits Hafs Ayah 6 in Al-Fatiha to maintain the universally-agreed count of 7 ayahs.

## Validation

Run the included validation script (requires Node.js):

```bash
node tests/validate.mjs
```

This runs **32,000+ assertions** covering structural integrity, cross-reference consistency, scholarly correctness, and bidirectional mapping verification.

## Contributing

We welcome contributions. See [CONTRIBUTING.md](CONTRIBUTING.md).

This dataset is a **community effort**. The current differences data covers the well-established huruf muqatta'at and Basmalah differences. Additional differences within surah bodies need scholarly verification and contribution.

## Sources

The data is derived from classical Islamic scholarship on **'ilm al-'add** (علم العدّ):

- *Al-Bayan fi 'Add Aay al-Quran* (البيان في عدّ آي القرآن) — Abu Amr al-Dani

## License

MIT License. See [LICENSE](LICENSE).
