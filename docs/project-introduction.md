# What this project does

This document is the plain-language entry point for the repository.

It is written for readers who already know the Qurʾānic sciences, especially `ʿadad al-āy`, but who do not want to start by reading generator scripts or JSON schemas.

## The problem

In the Qurʾānic counting traditions, the same surah can carry different ayah numbers depending on where a counting system places the boundaries of the ayahs.

So `surah + ayah` is not always a stable reference across the ten Qiraat and their rawis.

That matters in practice:

- a note written in one riwāyah may point to a different ayah number in another
- Quran apps often assume one universal numbering scheme
- APIs and datasets can disagree without being textually inconsistent
- scholars and editors need a way to review disputed heads without wading through large generated tables

The project exists to bridge that gap.

## Our motivation

We want two things at once:

1. a dataset that app developers can actually use
2. a source layer that scholars can actually review

Those two needs are not identical.

Developers need fast forward and reverse maps.
Scholars need a small, inspectable statement of the actual disputed heads and the evidence for them.

The repository is structured so that the scholarly layer stays small and reviewable, while the larger mapping files are generated from it.

## What the project publishes

The repository publishes three main layers.

### 1. A concise scholarly claim layer

Under `data/` the project keeps two canonical files:

- `book-boundary-primitives.json`
- `book-boundary-evidence.json`

The first says **what** disputed boundary is being claimed.
The second says **why** the project currently believes that claim, what sources support it, and whether the point is cited, disputed, unresolved, or still uncited.

### 2. Generated developer-facing outputs

Under `dist/` the project regenerates:

- forward maps from Kufi/Hafs to the other counting systems
- reverse maps back to Kufi/Hafs
- rawi aliases
- per-surah ayah counts
- review packets
- summary and reconciliation artifacts

These are important outputs, but they are not the primary scholarly source.

### 3. A review and demo layer

The site and the review packets exist to make the source layer easier to inspect.

The explorer, comparison views, and review tables are meant to help a scholar or editor ask a focused question:

> Is this point counted here as a raʾs ayah or not?

That is a better review question than asking someone to audit large expanded mapping arrays.

## What problem this project is trying to solve exactly

The project is **not** trying to decide which counting system is the “real” one.

It is trying to make the canonical counting systems interoperable and reviewable.

In plain terms:

- when one system counts a boundary and another omits it, the numbers drift
- apps need a reliable way to move between those numbers
- scholars need a way to check the boundary claim against the books
- both need unresolved points to remain visible rather than being silently smoothed over

## The basic approach

The project follows a simple rule:

**record the disputed heads directly, then generate everything else from them**

That means:

1. choose one operational hub numbering
2. record only the disputed boundaries relative to that hub
3. attach evidence to each disputed point
4. generate the larger mapping files from that smaller reviewed layer

The operational hub is Kufi/Hafs.
That choice is practical, not theological: downstream software needs one stable coordinate system.

## Why Kufi/Hafs is used as the hub

The repository uses Kufi/Hafs as the reference numbering for generation.

This does **not** mean that the other systems are treated as less authoritative.
It means the project needs one stable numbering system so that every other system can be mapped to and from the same point of reference.

Without a hub, every pairwise conversion would need its own hand-maintained layer.

## How the source layer matches the books

The source layer is shaped to match how the `ʿadad al-āy` books speak.

Instead of storing huge mapping arrays as the canonical truth, the project stores disputed ayah heads in a more book-like way:

- a disputed end of a Hafs ayah
- a disputed internal break inside a Hafs ayah
- which counting systems count that point as a head

That keeps the main scholarly question small and natural.

## How we tie the data to ground truth

The project does not want the generated outputs to look more certain than the evidence justifies.

So the repository now separates:

- the claim layer
- the evidence layer
- the generated mapping layer

Ground truth is pursued in this order:

1. primary classical witnesses first
2. later specialist manuals and commentaries as supporting witnesses
3. explicit review status per point
4. open exceptions kept visible when sources do not collapse neatly

The repository also checks in structured source frontiers under `sources/` so the current evidence frontier is inspectable and reproducible.

At the moment this includes structured work from:

- `البيان في عد آي القرآن`
- `الفرائد الحسان`
- `نفائس البيان`

Those witnesses do not silently rewrite the claim layer on their own. They support, qualify, or challenge the current primitives point by point.

## What the project does **not** do

To keep the claims honest, the project does not do several things.

It does **not**:

- replace the classical books
- infer new disputed boundaries from total counts alone
- treat API behavior as if it were primary evidence
- collapse conflicts silently just to make the dataset look clean
- try to model the entire textual variation of the Qiraat

Its scope is narrower:

**ayah boundaries and numbering interoperability**

## How the work has proceeded so far

Broadly, the repository has moved through these stages:

1. audit the old generated mapping layer
2. repair inconsistencies in the generated outputs
3. reduce the operational source of truth to concise disputed-boundary primitives
4. add an evidence sidecar for each primitive
5. add generated review packets and a demo site
6. begin a source-witness pass against classical and later structured materials
7. keep frontier exceptions explicit instead of hiding them

So the project has gradually moved from “large mapping dump” toward “small scholarly source layer plus reproducible outputs.”

## How a scholar should read the project

A scholar should not start from `dist/mappings/...`.

A better order is:

1. read `data/book-boundary-primitives.json`
2. read `data/book-boundary-evidence.json`
3. use `dist/review/` and the site explorer to inspect the points in a more readable form
4. consult the structured witness frontier under `sources/` when needed

In other words, the project wants the review process to stay close to the books and the disputed heads, not to the generated arrays.

## What remains open

Not every point is fully settled yet.

Some points already have primary support.
Some still sit on later witnesses.
Some remain disputed or uncited.

That is not a bug in the model.
It is part of the model's honesty.

The goal is not to pretend the whole field has been mechanically settled.
The goal is to make the current state legible, reviewable, and improvable.

## How this helps scholars and developers at the same time

For scholars, the project offers:

- a smaller review target
- explicit evidence status
- visible unresolved questions
- review packets and cross-reference reports

For developers, the project offers:

- ready-to-use forward maps
- reverse normalization back to Hafs/Kufi
- rawi metadata and aliases
- per-surah counts
- a stable numbering bridge for Quran apps and APIs

## Where to start next

If you want the non-technical overview, start with this document and then the site’s **Project** page.

If you want the practical integration side, read `docs/developer-usage.md` or the site’s **Developer usage** page.

If you want to review the current source frontier, start with:

- `data/book-boundary-primitives.json`
- `data/book-boundary-evidence.json`
- `dist/review/`
- `sources/al_bayan`
- `sources/nafais`
