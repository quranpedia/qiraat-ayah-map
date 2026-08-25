/**
 * Normalize the canonical book-aligned primitive source file.
 *
 * Usage: node scripts/normalize-book-boundary-primitives.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DEFAULT_DISPUTE_SCOPE, normalizeBookBoundaryPrimitivesDocument } from './lib/book-primitives-utils.mjs';
import { repoDir, sourcePath } from './lib/repo-paths.mjs';

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const countingSystems = JSON.parse(readFileSync(sourcePath('counting-systems.json'), 'utf-8'));
const primitives = JSON.parse(readFileSync(sourcePath('book-boundary-primitives.json'), 'utf-8'));

const normalized = normalizeBookBoundaryPrimitivesDocument(primitives, countingSystems, pkg.version);

// dispute_scope is explicit everywhere downstream, but this is a hand-authored
// file: writing the default onto all 243 ordinary points would be 243 lines of
// noise in every future diff. Omit it here; the normalizer restores it on read.
for (const ayahs of Object.values(normalized.surahs)) {
  for (const primitive of Object.values(ayahs)) {
    for (const point of [primitive.end, ...(primitive.internal || [])]) {
      if (point && point.dispute_scope === DEFAULT_DISPUTE_SCOPE) {
        delete point.dispute_scope;
      }
    }
  }
}

writeFileSync(
  sourcePath('book-boundary-primitives.json'),
  JSON.stringify(normalized, null, 2) + '\n'
);

console.log('  Normalized: data/book-boundary-primitives.json');
