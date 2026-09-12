# Reading the generated mappings

Four things about `dist/mappings/**` that code gets wrong, with the entries that
prove each one. Every number and every JSON object below was read out of a fresh
`npm run generate` and can be reproduced with the command beside it.

The reference for every file and field is on the site —
[quran.ws/docs/reference/qiraat-ayah-map](https://quran.ws/docs/reference/qiraat-ayah-map).
This page is only the traps, and it lives here because a consumer who clones the
repository to build `dist/` should not have to be online to find them.

## 1. `merges_with_next` is independent of `status`

An entry can be `"status": "split"` **and** carry `merges_with_next: true`. Kufan
11:82 is both — it splits into two ayahs of the last Madanī count, and the second
of those runs on into the ayah after it.

```sh
node -e 'console.log(JSON.stringify(require("./dist/mappings/by-counting-system/kufi-to-madani-last.json").surahs["11"].ayahs["82"]))'
```

```json
{ "target_ayah": 81, "status": "split", "splits_into": [81, 82], "merges_with_next": true }
```

Code asking *"does this ayah merge?"* must test the field, never
`status === "merged"`. Across the five forward files there are **398** entries
carrying `merges_with_next`, and **16** of them have `status: "split"` — nine
distinct Kufan references, each in the files where it applies: `2:219`, `7:29`,
`10:22`, `11:82`, `20:88`, `53:29`, `65:2`, `71:23` and `72:22`. A reader of
`status` alone misses every one.

This is deliberate: `normalizeForwardSurah` in `scripts/lib/mapping-utils.mjs`
spreads `...(mergedAfter ? { merges_with_next: true } : {})` into both the
single-target branch and the split branch.

## 2. The reverse direction is lossy at splits, and says so only for merges

Reverse files flag one of the two lossy cases and not the other.

**Merges are flagged.** Where one ayah of a target count covers several Kufan
ayahs, the entry says so and lists them:

```json
{ "hafs_ayah": 1, "hafs_ayahs": [1, 2], "status": "covers_multiple" }
```

**Splits are not.** Kufan 1:7 splits into last-Madanī 1:6 and 1:7. Both map back
to Kufan 7, and both are plain `mapped`:

```sh
node -e 'const r=require("./dist/mappings/by-counting-system/madani-last-to-kufi.json").surahs["1"].ayahs; console.log(JSON.stringify(r["6"]), JSON.stringify(r["7"]))'
```

```json
{ "hafs_ayah": 7, "status": "mapped" }   { "hafs_ayah": 7, "status": "mapped" }
```

So a round trip is not the identity, and nothing in the data distinguishes the
first half of a split from the second. **Do not use the reverse direction to
normalise a stored reference** — it will silently collapse two ayahs into one.
This is a correct answer to the question the file asks, not a data defect; it is
only a trap because it is invisible.

## 3. The two directions do not share a status union, or a field name

They are different shapes, and typing one from the other fails at runtime.

| | forward (`kufi-to-*`) | reverse (`*-to-kufi`) |
|---|---|---|
| status values | `mapped`, `merged`, `split` | `mapped`, `covers_multiple` |
| target field | `target_ayah` | `hafs_ayah` |
| extra fields | `splits_into`, `merges_with_next` | `hafs_ayahs` |

```sh
# the unions above, derived rather than asserted
node -e 'const fs=require("fs"),p="dist/mappings/by-counting-system";const u=g=>{const s=new Set();for(const f of fs.readdirSync(p).filter(g))for(const x of Object.values(JSON.parse(fs.readFileSync(p+"/"+f)).surahs))for(const e of Object.values(x.ayahs))s.add(e.status);return [...s]};console.log("forward",u(f=>f.startsWith("kufi-to-")),"reverse",u(f=>f.endsWith("-to-kufi.json")))'
```

## 4. There is no schema and no types

There is no JSON Schema and no `.d.ts`. Every file also mixes `_`-prefixed
metadata with data at the same level, so a `for (const key in file)` loop walks
both:

```sh
node -e 'console.log(JSON.stringify(Object.keys(require("./dist/mappings/by-counting-system/kufi-to-madani-last.json"))))'
```

```json
["_version", "_description", "_source", "_target", "surahs"]
```

Hand-write your types from the table in §3 until a schema ships
([#13](https://github.com/quran-ws/qiraat-ayah-map/issues/13) tracks publishing
the generated files, which is where a schema would go with them).

---

*These four were in the README until it was slimmed to a card, and existed
nowhere else for a while. They are here now because this is where detail about
the generated files belongs — the card links to it rather than carrying it.*
