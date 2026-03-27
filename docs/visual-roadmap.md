# Site visual audit and roadmap

This document evaluates the current SPA from the point of view of three jobs:

1. orientation — help a first-time visitor understand what the corpus is
2. comparison — help a reviewer compare counting systems and surahs quickly
3. verification — help a scholar inspect one disputed head and judge whether the claim is well sourced

## What is already working

### 1. The site has a clear visual grammar

The current split is sound:

- **Observable Plot** handles reference-like views well
- **LayerChart** handles ranked profile browsing well
- the warm editorial styling fits the subject matter better than a generic dashboard aesthetic

That is the right foundation and should stay.

### 2. The surah matrix is the strongest current chart

The surah page is the most useful analytical view in the app because it answers a real review question:

- where is the disputed point?
- which systems count it?
- does that produce a split, merge, or no numbering change against Kufi?

The slot-label fix (`40a`, `40b`, `40c`) was necessary and correct.

### 3. The explorer/detail pairing works for focused review

The table plus right-hand detail panel is the right interaction model for a scholar-review workflow:

- skim rows on the left
- read a fully grounded point on the right
- keep system consequences and evidence state together

## Where the current visuals are still weak

### 1. The homepage is informative but not decision-oriented

The current overview answers “what exists?” better than “what matters most?”

The totals chart is clean, but those six totals are not the most interesting question once the user knows the systems exist. The more important overview questions are:

- which systems are most similar?
- which surahs drive the differences?
- where is the evidence still missing?
- which unresolved issues block scholarly sign-off?

### 2. The heatmap shows density, not importance

The current heatmap counts disputed points by surah and kind. That is useful, but it can be misread.

A surah with many disputed points is not automatically a surah with the largest numbering consequence or the most urgent review need. Right now the chart cannot distinguish between:

- many low-consequence points
- a smaller number of high-divergence points
- well-cited vs uncited points

### 3. The system fingerprint is one-dimensional

The current LayerChart fingerprint ranks surahs by **counted disputed heads**. That is readable, but it only shows one axis.

For serious comparison, reviewers also need to see:

- net delta from Kufi in that surah
- split count vs merge count
- whether the surah is evidence-complete or evidence-empty

### 4. There is no direct system-to-system comparison view

At the moment the site compares each system against Kufi point-by-point, which is necessary, but not sufficient.

A reviewer also needs to answer:

- how close are Makki and Madani Last overall?
- which surahs separate Basri from Dimashqi the most?
- where do two systems differ even when both depart from Kufi?

That view does not exist yet.

### 5. Review progress is mostly invisible

The current UI does show evidence counts in the detail panel, but there is no strong visual layer for project status.

The project now needs charts that make these states impossible to miss:

- uncited
- cited from primary source
- reviewed
- disputed
- unresolved

### 6. The site does not yet expose the conversion story

The core promise of the dataset is not just “these heads are disputed.” It is also:

- how numbering changes downstream
- how one system maps to another
- where a split or merge begins and ends

That narrative is still mostly hidden inside the generated mappings.

## Improvements to the existing visuals

### Totals chart

Keep it, but demote it. It works as a compact orientation graphic, not as the lead analytical chart.

Better follow-up:

- add a small note that total ayah count alone is only the final aggregate of many local boundary decisions
- place it below a more consequential comparison chart

### Surah heatmap

Keep it, but rename it more precisely and add adjacent alternatives.

Recommended additions:

- toggle between `point count`, `net delta range`, and `citation completeness`
- keep the current chart as the `source density` mode

### System fingerprint

Keep the ranked list, but allow the metric to switch.

Useful ranking modes:

- counted disputed heads
- net delta from Kufi
- split effects
- merge effects
- uncited points remaining

This is a good place for **LayerChart** because the chart is exploratory and the ranking switch changes the feel of the whole object.

### Explorer table

The current simplification was correct. The next upgrade should not add more badges back.

Instead add:

- sort by `counted_by_count`
- sort by `verification_status`
- sort by `surah`
- optional “show only unresolved / uncited / high-disagreement points” presets

### Boundary detail panel

This is already directionally right. The next gains are about evidence quality.

Add room for:

- exact source locator prominence
- source tier grouping
- “direct wording vs inferred support” distinction
- reviewer verdict summary

## New visuals that would be genuinely useful

These are ordered by value, not novelty.

## Priority A — scholar-review visuals

### 1. Verification coverage bars

**Question answered:** how close is each system to being review-ready?

Chart:

- stacked horizontal bars by system
- segments: uncited, secondary-only, primary-cited, reviewed, disputed, unresolved

Library:

- **Observable Plot**

Why it matters:

- this becomes the project health graphic
- it immediately tells scholars where help is needed

### 2. Evidence completeness by surah

**Question answered:** which surahs are ready for review and which are still evidence-empty?

Chart:

- surah heatmap or matrix
- color by percent of points in that surah that have primary evidence

Library:

- **Observable Plot**

### 3. Open-questions board

**Question answered:** what exactly still blocks sign-off?

View:

- grouped cards or compact table
- group by system, then surah
- show only `disputed` and `unresolved`

This is more useful than a generic dashboard chart because it is directly actionable.

## Priority B — comparison visuals

### 4. System distance matrix

**Question answered:** which counting systems are closest to each other?

Chart:

- 6×6 symmetric heatmap
- color encodes number of disputed points where two systems differ
- tooltip shows same-count / different-count totals

Library:

- **Observable Plot**

This should probably become the lead overview chart on the homepage.

### 5. Surah divergence matrix

**Question answered:** in which surahs do two systems separate most strongly?

Chart:

- system pair selector
- ranked bar chart of surahs by pairwise disagreement count

Library:

- **LayerChart** for the ranked interactive view

### 6. Similarity clusters

**Question answered:** what families of behavior appear in the counting systems?

Chart:

- dendrogram or clustered matrix derived from pairwise disagreement counts

Library:

- **Observable Plot** or a custom SVG/D3 view if needed

This is secondary to the pairwise matrix, but it is a strong explanatory graphic once the basics are in place.

## Priority C — numbering and mapping visuals

### 7. Mushaf consequence ribbon

**Question answered:** where across the whole mushaf does one selected system diverge from Kufi?

Chart:

- a long ribbon of disputed points in reading order
- color: split / merge / no-effect
- optional brush into a surah or range

Library:

- **Observable Plot** for the static version
- **LayerChart** only if you add brushing/panning and richer interaction

### 8. Ayah conversion stepper

**Question answered:** how does a specific Hafs ayah map into another system?

View:

- input: `surah`, `ayah`, `from`, `to`
- output: target ayah/ayahs and the local reason why
- show the nearest disputed heads before and after

This is one of the most important missing product features.

### 9. Split/merge consequence timeline

**Question answered:** what does a local boundary decision do downstream inside the surah?

Chart:

- for one surah and one system, show cumulative delta against Kufi across the surah

Library:

- **Observable Plot**

This is a high-value explanatory chart because it turns abstract splits and merges into visible numbering drift.

## Priority D — editorial/source visuals

### 10. Source coverage matrix

**Question answered:** which classical works support which points?

Chart:

- points on one axis, source works on the other
- marks for direct / indirect / absent support

This becomes powerful once the evidence sidecar is populated.

### 11. Reviewer agreement chart

**Question answered:** where do reviewers agree, disagree, or leave comments?

Chart:

- by system or surah
- counts of accepted, contested, unresolved points

This should only appear after reviewer data becomes real.

## Best next visual package

If the goal is to make the site much more useful with one coherent pass, build these four next:

1. **system distance matrix**
2. **verification coverage bars**
3. **ayah conversion stepper**
4. **cumulative surah delta timeline**

That combination would make the site better at:

- overview
- comparison
- verification
- practical use

all at once.

## Chart-library guidance

Use **Observable Plot** when the visual is:

- matrix-like
- aggregate
- reference-oriented
- small-multiple friendly
- better read than manipulated

Use **LayerChart** when the visual is:

- rank-based
- highly interactive
- filter-driven
- brushable or comparative in a way that benefits from a more app-like feel

Do not add D3 just because a chart sounds sophisticated. The current stack is already enough for most of the roadmap.
