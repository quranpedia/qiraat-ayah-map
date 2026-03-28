# Developer usage

This is the simplest way to think about the dataset if you are building a Quran app, API, or interoperability layer.

## The one-sentence model

Keep one internal hub numbering, then map into and out of the other counting systems only when you need to.

In this repository, that hub is Kufi/Hafs.

## What this data is for

Use it when your app needs to:

- show ayah numbers in more than one counting system
- normalize a non-Hafs ayah reference back to Hafs
- support riwāyah-specific numbering labels
- validate the number of ayahs in a surah for a given counting system

## What this data is **not** for

This repository does not ship the Qurʾān text itself.

It tells you how numbering changes.
You should pair it with your own text layer, API, or mushaf dataset.

## Start with these files

### Forward map

Use:

- `dist/mappings/by-counting-system/kufi-to-{system}.json`

This is for the common case where your app already uses Hafs/Kufi references internally and needs to display another numbering system.

### Reverse map

Use:

- `dist/mappings/by-counting-system/{system}-to-kufi.json`

This is for the opposite case: user input or external data arrives in another numbering system and you want to normalize back to Hafs/Kufi.

### Rawi metadata

Use:

- `dist/rawis/{rawi}.json`

This tells you which counting system a rawi follows.

### Surah counts

Use:

- `dist/surah-counts/{system}.json`

This gives the ayah count of each surah in that counting system.

## Minimal examples

### 1. Hafs to another counting system

```js
const entry = mapping.surahs[String(surah)].ayahs[String(hafs_ayah)]
```

This returns an object such as:

```js
{ target_ayah: 1, status: 'merged', merges_with_next: true }
```

The number you usually display is `target_ayah`.
The status tells you whether that mapping is a normal one-to-one case, a merge, or a split.

### 2. Another counting system back to Hafs

```js
const entry = reverse_mapping.surahs[String(surah)].ayahs[String(target_ayah)]
```

This returns an object such as:

```js
{ hafs_ayah: 1, hafs_ayahs: [1, 2], status: 'covers_multiple' }
```

Use `hafs_ayah` as the normalized anchor.
If `hafs_ayahs` is present, the target ayah covers a span of multiple Hafs ayahs.

### 3. Resolve a rawi

```js
const rawi = rawi_metadata
rawi._counting_system
rawi._mapping_file
```

If the user chooses Warsh, Qālūn, or another rawi, the metadata tells you which counting-system map to use.

## How to read the statuses

### `mapped`

A normal one-to-one correspondence.

### `merged`

A Hafs ayah does not end as its own target ayah.
It continues into the next Hafs ayah’s target coverage.

### `split`

One Hafs ayah becomes multiple target ayahs.
Read the target span from `splits_into`.

### `covers_multiple`

In reverse maps, one target ayah covers multiple consecutive Hafs ayahs.

## Practical integration advice

- Keep surah numbers unchanged; only ayah boundaries move.
- Do not infer numbering from total ayah counts alone.
- If your app only supports one non-Hafs system, load only that system’s forward and reverse maps.
- If your UI is organized by riwāyah, use `dist/rawis/` first.
- Kufan rawis are identity-numbered with Hafs, so they do not need separate conversion logic.

## Suggested internal strategy

For most apps, this is enough:

1. store internal references in Kufi/Hafs
2. map outward for display
3. map inward for normalization
4. keep your text layer separate from the numbering layer

That gives you a simple and stable model while still supporting other counting systems cleanly.
