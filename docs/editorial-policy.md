# Editorial policy

This project separates three questions that should not be conflated:

1. **What does the project claim?**
   - `data/book-boundary-primitives.json`
2. **Why does the project claim it?**
   - `data/book-boundary-evidence.json`
3. **What is generated from that claim?**
   - everything under `dist/`

The generated mappings are never the scholarly proof. They are the reproducible consequence of the scholarly source layer.

## Canonical source files

The canonical human-maintained source layer is:

- `data/counting-systems.json`
- `data/qiraat.json`
- `data/book-boundary-primitives.json`
- `data/book-boundary-evidence.json`

Do not edit generated files under `dist/` by hand.

## Source hierarchy

When recording evidence, use the strongest available source and label it with the appropriate tier.

### Tier order

1. `primary`
   - direct statement in a classical `ʿadad al-āy` source
2. `commentary`
   - authoritative explanation tied closely to a primary count text
3. `secondary`
   - later specialist count manuals or scholarly studies
4. `modern-reference`
   - modern summaries, catalogs, articles, or project notes
5. `api-check`
   - external consistency checks only; never sufficient on their own

## What belongs in the primitive file

`data/book-boundary-primitives.json` stores only the scholarly claim:

- the disputed location
- the anchor word
- whether the point is `end` or `internal`
- which counting systems count that point as a ra's ayah

Do not store quotations, bibliography, or review notes there.

## What belongs in the evidence file

`data/book-boundary-evidence.json` stores the support for the claim:

- verification status
- evidence entries
- reviewer sign-off, if any
- short local notes

Each evidence entry should record:

- `tier`
- `work`
- `edition` if relevant
- `locator`
- `supports`
- `strength`
- optional `note`

`supports` names the counting systems from the paired primitive that this citation explicitly supports.

## Verification statuses

The allowed statuses are:

- `uncited`
- `secondary_only`
- `primary_cited`
- `primary_cited_and_reviewed`
- `disputed`
- `unresolved`

Use them as follows.

### `uncited`

Use when the primitive exists but no evidence has been entered yet.

### `secondary_only`

Use when the claim is currently supported only by commentary, later manuals, or modern references.

### `primary_cited`

Use when at least one primary citation has been entered and the evidence coverage supports the full `counted_by` claim.

### `primary_cited_and_reviewed`

Use only when:

- at least one primary citation has been entered
- the evidence covers the full `counted_by` claim
- at least one reviewer has been recorded for that point

### `disputed`

Use when the sources or reviewers materially disagree.

### `unresolved`

Use when the point is known to need more work and should not yet be presented as settled.

## Word-anchor normalization rules

- Preserve the word form actually used as the local boundary anchor in the project
- Keep spacing normalized
- Do not add punctuation or verse numbers into the `word` field
- Keep the primitive and evidence `word` fields identical
- When a source is phrased differently from the project anchor, explain that in `note`

## Conflict handling

When sources disagree:

1. keep the primitive stable unless the better evidence clearly requires a change
2. record both sides in the evidence file when appropriate
3. mark the point `disputed` or `unresolved`
4. never hide disagreement by silently changing the generated mappings without updating source data

## Totals vs. localizable boundaries

A total ayah count can show that a system-level claim is wrong or incomplete, but it does not by itself localize the missing boundary.

Do not add or remove a primitive boundary based only on a total.

System-level total discussions belong in generated attestation files and review notes until the exact boundary is sourced.

## Review policy

A reviewer record should include, at minimum:

- reviewer name
- reviewer role or description when appropriate
- optional date
- optional note

Project labels should follow this rule:

- **structurally valid**: local validation passes
- **reproducible**: `npm run generate` followed by `npm test` passes cleanly
- **scholarly reviewed**: every primitive is at least `primary_cited_and_reviewed`, or explicitly marked `disputed` / `unresolved`

## Release gate

A release can be called **scholarly verified** only when:

- the source layer validates
- the generated layer round-trips cleanly
- every primitive has evidence status tracked
- every non-settled point is openly marked
- reviewer packets under `dist/review/` are up to date


## External curator bundles

Optional structured source bundles may be used to accelerate evidence entry, but they must never become hidden build dependencies.

- use them to propose or apply updates to `data/book-boundary-evidence.json`
- when a single supplied bundle contains both a matn and its sharḥ, record them as separate evidence items rather than collapsing them into one witness
- keep the final scholarly judgment in the checked-in evidence file, not in an external temporary report
- when a bundle conflicts with the current primitive, prefer an explicit `disputed` / `unresolved` note over silent harmonization
