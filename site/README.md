# Qiraat Ayah Atlas SPA

This folder contains the demo site for the dataset.

## Stack

- Svelte 5
- Vite
- Navgo
- Observable Plot
- LayerChart

## Data contract

The app reads generated JSON from:

- `src/lib/data/generated/site-data.json`

That file is written by the repository root's `npm run generate` pipeline.

The site payload intentionally carries a few UI-facing derivatives so the SPA does not have to rebuild review logic in the browser:

- global summary counts
- evidence and attestation summaries
- system summaries
- per-surah summaries
- per-system surah fingerprints
- the full disputed-point row set
- per-row slot labels for duplicated points inside the same Hafs ayah
- pairwise system-distance cells
- per-system verification profiles
- review-workload ranking
- per-system surah-drift series

## Routes

- `/` overview and system entry points
- `/compare` comparison and review-planning view
- `/explorer` filterable disputed-point explorer
- `/systems/:system` system profile and ranked fingerprint
- `/surahs/:surah` surah matrix, table, and detail drill-down

## Chart split

### Observable Plot

Used for views that behave like compact analytical references:

- total ayah count by system
- disputed-point heatmap by surah
- system distance matrix
- verification coverage bars
- surah boundary matrix
- surah drift timeline

### LayerChart

Used for the more interactive ranked profile view:

- top surahs by counted disputed heads for a selected system
- review-workload ranking by uncited counted points

## Run locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```


## GitHub Pages

A minimal Pages workflow lives at `../.github/workflows/deploy-site.yml`.

The site is built for Pages with three extra rules:

- the workflow runs the root `npm run generate` pipeline first
- Vite reads `BASE_PATH` so assets and routes work under `/<repo>/`
- the build writes `dist/404.html` and `dist/.nojekyll` so the SPA survives deep links on GitHub Pages
