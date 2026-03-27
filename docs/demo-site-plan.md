# Demo site plan

The demo site is a **plain Svelte 5 SPA** under `site/`, built from the uploaded template and cut down to the smallest useful shell.

## Current stack

- `site/` is a Vite + Svelte 5 app
- routing is handled by **Navgo**
- reference-style analytical charts use **Observable Plot**
- ranked interactive system profiles use **LayerChart**
- the app consumes a generated UI contract at `site/src/lib/data/generated/site-data.json`

No Python backend, API proxy, or server framework is part of the site.

## Why the site data contract exists

The SPA should not have to reconstruct review joins in the browser. Instead, `npm run generate` builds:

- `dist/review/*` for scholar packets
- `site/src/lib/data/generated/site-data.json` for the interactive UI

That generated site payload contains:

- global summary counts
- evidence and attestation summaries
- system registry summaries
- per-surah summaries
- per-system per-surah profiles
- the full disputed-point row set
- slot labels for duplicated disputed points inside one Hafs ayah
- total-count attestation notes
- pairwise system-distance cells
- per-system verification profiles
- review-workload ranking
- per-system per-surah drift curves

## Current routes

### `/`

Overview page with:

- hero and framing copy
- summary metric cards
- a short reading primer for `end`, `internal`, and `+, −, =`
- total ayah count chart by system
- surah heatmap of disputed-point density
- ranked interactive system fingerprint preview
- quick links into each counting system

### `/compare`

A comparison and review-planning route with:

- pairwise system-distance matrix
- verification coverage bars restricted to counted disputed heads
- review-workload ranking by uncited counted points
- nearest / farthest neighbor table

### `/explorer`

A filterable disputed-point explorer with:

- text search
- system filter
- kind filter
- verification filter
- filtered summary chips
- a simplified table that foregrounds consensus instead of six tiny system badges
- detail panel for the active point

### `/systems/:system`

A system profile page with:

- total ayah count
- delta from Kufi
- counted disputed heads
- cited counted heads
- merge totals
- total-count policy note when present
- nearest / farthest system comparison
- cumulative drift preview inside a chosen surah
- LayerChart-ranked surah fingerprint
- hotspot surahs

### `/surahs/:surah`

A surah drill-down with:

- per-system ayah counts for that surah
- an Observable Plot boundary matrix
- explicit handling for duplicated disputed points within a single Hafs ayah through slot labels like `40a`, `40b`, `40c`
- disputed-point table
- point detail panel
- a clean empty state for surahs with no disputed points

## Visual division of labor

### Observable Plot

Use it for views that are fundamentally analytical and matrix-like:

- total ayahs by system
- heatmaps
- surah boundary matrices
- verification coverage charts
- system distance matrices
- surah drift timelines

### LayerChart

Use it where the chart itself should feel like the interactive object:

- ranked system fingerprints
- future comparative surah profiles
- future rawi/system consequence explorers

## Design direction

The visual language is intentionally **editorial and manuscript-like**, not “AI dashboard” styled:

- warm paper background
- tinted neutrals instead of grayscale
- serif display typography for framing
- dedicated Arabic typography for scholar-facing labels
- light-first presentation
- restrained accent color for the active scholarly signal

## Next site phases

1. add shareable URLs for individual disputed points
2. add mapping conversion tools based on generated mapping files
3. add Arabic label mode and bilingual UI toggles
4. add scholar review views keyed to reviewer status and citation coverage
5. expand the evidence-backed corpus until comparison charts are no longer dominated by uncited work


## GitHub Pages deployment

The repo now includes a minimal workflow at `.github/workflows/deploy-site.yml`.

Deployment rules:

- the workflow regenerates the site data before the frontend build
- `actions/configure-pages` supplies the Pages base path to the Vite build
- the site build writes both `404.html` and `.nojekyll` so client-side routes like `/surahs/2` survive direct loads on GitHub Pages

## Further reading

- `docs/visual-roadmap.md` audits the current visuals and proposes the next useful charts
- `docs/project-next-steps.md` lays out the project-wide priorities after the current structural refactor
