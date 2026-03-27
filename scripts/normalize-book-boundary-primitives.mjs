/**
 * Normalize the canonical book-aligned primitive source file.
 *
 * Usage: node scripts/normalize-book-boundary-primitives.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { normalizeBookBoundaryPrimitivesDocument } from './lib/book-primitives-utils.mjs';
import { repoDir, sourcePath } from './lib/repo-paths.mjs';

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const countingSystems = JSON.parse(readFileSync(sourcePath('counting-systems.json'), 'utf-8'));
const primitives = JSON.parse(readFileSync(sourcePath('book-boundary-primitives.json'), 'utf-8'));

const normalized = normalizeBookBoundaryPrimitivesDocument(primitives, countingSystems, pkg.version);

writeFileSync(
  sourcePath('book-boundary-primitives.json'),
  JSON.stringify(normalized, null, 2) + '\n'
);

console.log('  Normalized: data/book-boundary-primitives.json');
