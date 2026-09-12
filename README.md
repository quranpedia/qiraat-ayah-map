# Qiraat Ayah Map

**The same verse carries different numbers in different printed Qurʾāns. This dataset tells you which.**

بيانات مفتوحة لربط ترقيم آيات القرآن بين مذاهب العدّ الستة المعتمدة في القراءات العشر.

The verse numbered 7:206 in the muṣḥaf most of the world prints is numbered 7:205 in a Baṣran-counted one. That is not an error: six traditional schools of *ayah-counting* divide the identical text at different points, and the ten canonical readings of the Qurʾān follow them. If your app supports more than one reading, or joins two datasets that count differently, you need a translation table. This is that table, plus the evidence behind it.

| Package | Version | Counting systems | Disputed boundaries |
|---|---|---|---|
| not published yet — clone the repo | `0.1.0` | 6 | 246, across 75 surahs |

<sub>Terms: a **muṣḥaf** is a physical copy of the Qurʾān, a **qirāʾah** a canonical reading of it, a **riwayah** one transmitter's version of a reading. Glossary: <https://quran.ws/docs/concepts/glossary/#ayah-counting></sub>

## What it provides

**The six counting systems, with their totals and who follows them.** `data/counting-systems.json`.

**Every disputed boundary in the Qurʾān, anchored by the word it turns on** — 246 points across 75 surahs, in `data/book-boundary-primitives.json`. The other 39 surahs are counted identically by all six systems. Each point records the Arabic word and which systems end a verse there, so a claim can be checked against a printed muṣḥaf rather than taken on trust:

```json
{ "word": "عليهم", "counted_by": ["madani-first", "madani-last", "basri", "dimashqi"] }
```

That is surah 1, verse 7 — four systems end a verse inside what the Ḥafṣ muṣḥaf prints as one. Al-Fātiḥah is seven verses in every reading, but not the *same* seven.

**The evidence sidecar.** `data/book-boundary-evidence.json` carries the citation and review state of each of the 246 claims, work by work, with page locators.

**Generated mapping tables**, produced by `npm run generate` into `dist/`: ten counting-system mapping files, twenty-four convenience files keyed by transmitter, per-surah counts for each system, and one metadata file per transmitter saying which system they use.

Alongside them, `dist/site-data.json` carries every disputed head of ayah with its evidence, and `dist/mushaf/surah-NNN.json` the muṣḥaf tokens with the token offset of every disputed boundary in both orthographies — what the reference site reads.

Kufan is the hub. Every mapping goes to or from it, so there are ten mapping files instead of thirty and you only ever reason about one reference numbering.

## Use it when you need

- Your app lets a user pick a reading, and a stored reference has to follow.
- You are joining Qurʾān data from two sources and the verse numbers do not line up.
- You need to show a user *why* two muṣḥafs disagree about a number.
- You need per-surah verse counts that are correct for something other than Ḥafṣ.

## Not for

| You want | Use |
|---|---|
| The Arabic text of a verse — this repository contains no Qurʾānic text beyond the anchor words | [Quran Text](https://quran.ws/blocks/quran-text/) |
| A page number, or where a verse sits on a printed page | [Quran SVG](https://quran.ws/blocks/quran-svg/) |
| Word-level addressing inside a page | [Quran SVG Elements](https://quran.ws/blocks/quran-svg-elements/) |
| The readings themselves — their rules, their chains, their pronunciation | Nothing here. This is verse *numbering* only. |

## See it work

- **[quran.ws/blocks/qiraat-ayah-map/](https://quran.ws/blocks/qiraat-ayah-map/)** — the reader-facing reference, running on this repository's own data: a [muṣḥaf](https://quran.ws/blocks/qiraat-ayah-map/mushaf/) with every disputed head of ayah marked in place, the [ayah-count tables](https://quran.ws/blocks/qiraat-ayah-map/counts/), a [search](https://quran.ws/blocks/qiraat-ayah-map/explorer/) across all 246 boundaries, and a [converter](https://quran.ws/blocks/qiraat-ayah-map/developer/) that takes a Kufan reference and shows what the other five call it. In Arabic and English.
- **[quran.ws/demo/](https://quran.ws/demo/)** — the same data layered with the other blocks: switch riwayah and watch al-Fātiḥah regroup.

This repository used to carry its own Svelte site under `site/`, published to
GitHub Pages. It has been rewritten in full at the address above and removed
here, so there is one reference rather than two that drift apart.

## Supported systems and readings

All ten canonical readings and their twenty transmitters are covered, mapped onto six counting systems.

| Counting system | Total verses | Readings that follow it |
|---|---:|---|
| Kūfī (reference) | 6,236 | ʿĀṣim, Ḥamzah, al-Kisāʾī, Khalaf |
| Dimashqī | 6,226 | Ibn ʿĀmir |
| Makkī | 6,219 | Ibn Kathīr |
| Madanī, first | 6,214 | Abū Jaʿfar |
| Madanī, last | 6,214 | Nāfiʿ |
| Baṣrī | 6,204 | Abū ʿAmr, Yaʿqūb |

The totals differ by up to 32 verses across the whole muṣḥaf — which is why an application that supports more than one reading must never hard-code a count.

Two systems sharing a total are not the same system: first and last Madanī both reach 6,214 by placing boundaries in different places, and the differences cancel in the sum. Compare boundaries, never totals.

> **Open question, unresolved.** This repository assigns the reading of Abū ʿAmr — transmitters al-Dūrī and al-Sūsī — to the Baṣrī count of 6,204. The `quran-text` block measures the printed KFGQPC al-Sūsī muṣḥaf at 6,218 verses, which is not Baṣrī. The two are answering different questions: which count is classically attributed to the *reader*, versus which numbering this *printed edition* actually uses. Both are defensible, and this project has not ruled on which one `_counting_system` asserts. If you are joining these datasets, be aware the join is contested here.

## Provenance

- **Sources.** Compiled from named reference works, principally *al-Bayān fī ʿadd āy al-Qurʾān*, with *al-Farāʾid al-Ḥisān fī ʿadd āy al-Qurʾān* and its commentary *Nafāʾis al-Bayān*. Each citation in `book-boundary-evidence.json` carries the work, the edition and a page locator.
- **Evidence state, read from the data.** Of the 246 boundary claims: 57 `primary_cited`, 56 `secondary_only`, 2 `disputed`, and 131 `uncited`. The dataset is usable and its totals reconcile; the citation work is not finished, and the file says so per record rather than in aggregate.
- **The totals are derived, not asserted.** Rebuilding the mappings from the boundary data prints exactly the six published totals — 6,236 · 6,226 · 6,219 · 6,214 · 6,214 · 6,204.
- **The validation suite is not a smoke test.** `npm test` checks forward against reverse mappings and both against the surah counts, verse by verse: `PASSED: 506102 / FAILED: 0` at the commit this README was written against (`0762552`).
- **Licence.** MIT. `data/` and `dist/` are the dataset; the scholarly works cited are the property of their editors and publishers.

## Quick start

**There is no install line, and that is not an oversight.** There is no npm package, no release and no tag, and the deployed site does not serve `dist/`. The mapping files exist only after you build them. This is being fixed; until it is, the honest instruction is to clone.

```sh
git clone https://github.com/quran-ws/qiraat-ayah-map.git
cd qiraat-ayah-map
npm run generate   # writes dist/ — plain Node 20, no dependencies, no network
npm test           # PASSED: 506102 / FAILED: 0
```

```js
const map = require("./dist/mappings/by-counting-system/kufi-to-basri.json");

map.surahs["7"].ayahs["206"];        // → { target_ayah: 205, status: "mapped" }

const susi = require("./dist/rawis/susi.json");
susi._counting_system;                // → "basri"
susi._mapping_file;                   // → the file to load for that transmitter
```

If you only need the scholar-facing source layer, the four `data/*.json` files are committed and can be fetched raw from GitHub without cloning. The `dist/` paths cannot — anything that tells you to `fetch('dist/…')` from the deployed site is wrong, and will 404.

### Three things to know before you write code against it

| | |
|---|---|
| `merges_with_next` is independent of `status` | An entry can be `"status": "split"` *and* carry `merges_with_next: true` — Kufan 11:82 is both. Code asking "does this verse merge?" must test the field, never `status === "merged"`. |
| Reverse mappings are many-to-one | Kufan 1:7 splits into two verses in the last Madanī count, and both map back to Kufan 7 with `status: "mapped"`. A round trip is not the identity. Do not use the reverse direction to normalise a stored reference. |
| No schema, no types yet | Every file mixes `_`-prefixed metadata with data at the top level, and the status union (`mapped` \| `merged` \| `split`) is documented in prose only. Hand-write your types from the reference page below. |

## Works with

| Block | Why |
|---|---|
| [Quran Text](https://quran.ws/blocks/quran-text/) | Translate a reference, then load the verse it names. |
| [Quran SVG](https://quran.ws/blocks/quran-svg/) | Find the printed page a verse sits on, per riwayah. |

## Documentation

- **[Reference: Qiraat Ayah Map](https://quran.ws/docs/reference/qiraat-ayah-map/)** — every file, every field, and working conversion code in both directions.
- **[Concept: ayah-counting systems](https://quran.ws/docs/concepts/ayah-counting/)** — why the counts differ at all, for readers with no background.
- **[Glossary](https://quran.ws/docs/concepts/glossary/)** — muṣḥaf, qirāʾah, riwayah, rāwī, defined in plain English.
- `CONTRIBUTING.md` in this repository documents the boundary-primitive format for anyone editing the dataset.

## Licence

MIT. See [`LICENSE`](LICENSE).
