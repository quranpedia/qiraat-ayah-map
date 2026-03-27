/**
 * Generate dist/differences.json as a compatibility view expanded from the
 * canonical book-aligned primitive source file.
 *
 * Usage: node scripts/generate-differences-from-book-boundary-primitives.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import {
  expandBookBoundaryPrimitivesToDifferences,
  normalizeBookBoundaryPrimitivesDocument
} from './lib/book-primitives-utils.mjs';
import { distDir, repoDir, sourcePath } from './lib/repo-paths.mjs';

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const countingSystems = JSON.parse(readFileSync(sourcePath('counting-systems.json'), 'utf-8'));
const primitives = JSON.parse(readFileSync(sourcePath('book-boundary-primitives.json'), 'utf-8'));
const normalizedPrimitives = normalizeBookBoundaryPrimitivesDocument(primitives, countingSystems, pkg.version);
const differences = expandBookBoundaryPrimitivesToDifferences(normalizedPrimitives, { version: pkg.version });

mkdirSync(distDir, { recursive: true });
writeFileSync(
  join(distDir, 'differences.json'),
  JSON.stringify(differences, null, 2) + '\n'
);

console.log('  Generated: dist/differences.json');
