# What is next for the project

The project now has a strong canonical source layer, deterministic generators, review packets, and a public-facing SPA. The next phase is not more structural refactoring. The next phase is **scholarly completion**.

## Immediate priority order

### 1. Finish the first real evidence pass

This is the main blocker. The first primary citations have now landed for a small Madani-first slice, but the project still needs one complete system-level evidence pass.

The source layer now makes explicit claims in `data/book-boundary-primitives.json`, and the evidence sidecar exists in `data/book-boundary-evidence.json`. The next real work is to populate evidence records point by point.

Success condition:

- every disputed point has at least one evidence record
- source tier is explicit
- direct vs derived support is explicit
- locators are precise enough for another reviewer to re-open the source quickly

### 2. Run scholar packets system by system

Do not ask for global approval of the whole project first.

Instead, review in packets:

1. Madani First
2. Madani Last
3. Makki
4. Basri
5. Dimashqi
6. Kufi reference handling

Success condition:

- each system has a bounded review packet
- comments and corrections flow back into the evidence sidecar and primitives
- unresolved items are kept explicit

### 3. Add release gates tied to evidence quality

Technical validation is already strong. The next gate should be editorial.

Recommended release rule:

- no release marked “scholarly reviewed” unless every point is either cited, reviewed, disputed, or unresolved by explicit status

### 4. Keep pushing the site from atlas to working tool

The most useful comparison and review-planning views are now in place:

- system distance matrix
- verification coverage bars
- review-workload ranking
- cumulative surah delta timeline

The next tool to add is the ayah conversion stepper.

### 5. Publish a reviewer workflow

Make the contribution path obvious for scholars and research assistants.

Needed pieces:

- reviewer instructions in Arabic and English
- one example of a fully reviewed point
- one example of a disputed point
- exact rules for how to record direct vs derived support

### 6. Prepare a first scholarly outreach release

Once one system is well cited, cut a review release instead of waiting for the entire corpus to be perfect.

That release should include:

- the source files
- the generated review packets
- the site
- a short statement of what has and has not yet been verified

## What should not be next

### Do not spend the next phase on more compression work

The source layer is already concise and book-aligned enough.

### Do not spend the next phase on adding many more charts before evidence exists

Visual polish helps, but the hardest truth of the project still lives in the source citations.

### Do not treat public APIs as primary proof

They remain useful consistency checks, not the authority layer.

## Best next execution sequence

### Phase 12

- finish one system-level evidence pass end to end
- upgrade release gates around evidence completeness
- use the new comparison and workload views to choose outreach order

### Phase 13

- run scholar review for that system
- record reviewer outcomes in the evidence layer
- publish a review release and public demo

### Phase 14

- repeat system by system until the corpus is fully reviewed

That is the path from “well-structured dataset” to “scholarly trusted reference.”
