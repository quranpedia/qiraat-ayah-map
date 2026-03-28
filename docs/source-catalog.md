# Source catalog

This catalog names the source families the project expects to cite in `data/book-boundary-evidence.json`.

Use the exact edition, editor, and locator in the evidence file whenever possible.

## Primary count sources

### `البيان في عد آي القرآن`

Primary prose source for the canonical count traditions and many local boundary reports.

Suggested evidence tier:
- `primary`

### `ناظمة الزهر`

Primary poetic source widely used in the count tradition.

Suggested evidence tier:
- `primary`

## Commentary on primary sources

### Commentaries and explanatory works on `ناظمة الزهر`

Use when the primary poem needs decoding, symbol expansion, or local explanation.

Suggested evidence tier:
- `commentary`

## Secondary scholarly manuals

### `جمال القراء` / `أقوى العدد`

Later specialist count manual family useful for corroboration and comparison.

Suggested evidence tier:
- `secondary`

### Specialized count treatises by regional school

Examples include dedicated manuals for Basran, Makkan, or other counting traditions.

Suggested evidence tier:
- `secondary`

### `الفرائد الحسان في عد آي القرآن`

A later didactic count poem by `عبد الفتاح القاضي`. It is not a primary classical witness on the same footing as `البيان`, but it is a strong direct later manual and can be cited as a `secondary` witness where its local wording and school attributions are clear.

Suggested evidence tier:
- `secondary`

## Modern references

Use modern summaries, catalogs, project notes, and articles only as support or navigation aids.

Suggested evidence tier:
- `modern-reference`

## External consistency checks

Public APIs, website tables, and machine-readable sources may be recorded as cross-checks.

Suggested evidence tier:
- `api-check`

These are never sufficient on their own for a final scholarly claim.


## Working bundle witnesses

These are curator-facing structured witnesses checked into the repo under `sources/`. They do not replace the canonical authored claim layer in `data/`, but they now serve two concrete roles:

- accelerating evidence entry into `data/book-boundary-evidence.json`
- generating scholar-facing cross-reference reports under `dist/review/`

### Structured `البيان` witness under `sources/al_bayan`

Use as the primary-ingestion aid wherever the extracted surah entry preserves a direct disputed-boundary phrase and school attribution.

Current checked-in frontier:
- pilot for surah 1
- structured surah entries through surah 13

Generated project artifact:
- `dist/review/al-bayan-cross-reference.{json,md}`

### `الفرائد الحسان` / `نفائس البيان` witness under `sources/nafais`

This checked-in bundle carries two usable layers:
- poem (`kind: poem`) segments from `الفرائد الحسان`, which can be cited as direct `secondary` support
- commentary (`kind: commentary` / `technical_note`) segments from `نفائس البيان`, which can be cited as `commentary` support

Use it especially where the current `البيان` frontier is incomplete, compressed, or internally nuanced.
