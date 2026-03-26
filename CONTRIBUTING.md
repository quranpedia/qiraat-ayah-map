# Contributing to Qiraat Ayah Map

Thank you for your interest in contributing to this project.

## How to Contribute

### Adding or Correcting Differences Data

The most valuable contribution is adding or verifying ayah numbering differences between counting systems.

1. **Edit** `data/differences.json` to add or correct entries
2. **Regenerate** the pre-computed mappings: `node scripts/generate-mappings.mjs`
3. **Run validation**: `node tests/validate.mjs`
4. **Submit** a pull request with:
   - The scholarly source for your change
   - Which counting system and surah(s) are affected

### Data Format for Differences

Each difference entry:

```json
{
  "surah": 2,
  "hafs_ayah": 1,
  "type": "merge",
  "description_ar": "(الم) لا تُعدّ آية مستقلة",
  "description_en": "Alif Lam Mim is not a separate ayah"
}
```

- `surah` — Surah number (1-114)
- `hafs_ayah` — The Hafs ayah number where the difference occurs
- `type` — `"merge"` (target combines this ayah with next) or `"split"` (target splits this Hafs ayah into two)
- `description_ar` — Arabic description
- `description_en` — English description

### Adding Validation Tests

Add assertions to `tests/validate.mjs` for any new scholarly facts. Always cite your source in comments.

### Requirements for Contributions

- All data must be sourced from **established Islamic scholarship**
- Provide references (book name, author, chapter/page if possible)
- Both Arabic and English descriptions are required
- All tests must pass after your changes

## Development Workflow

```bash
# Edit data/differences.json

# Regenerate all mapping files
node scripts/generate-mappings.mjs

# Validate everything
node tests/validate.mjs
```

## Code of Conduct

This is a scholarly project serving the Muslim community. Please maintain respectful, constructive communication in all interactions.
