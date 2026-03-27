/**
 * Legacy migration helper: rebuild the canonical book-aligned primitive source
 * file from the generated differences.json compatibility view.
 *
 * This script is intentionally not part of npm run generate. It exists for
 * one-off migrations from older revisions where differences.json was the only
 * editable scholarly layer.
 *
 * Usage: node scripts/generate-book-boundary-primitives.mjs
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import {
  buildBookBoundaryPrimitives,
  normalizeBookBoundaryPrimitivesDocument
} from './lib/book-primitives-utils.mjs';
import { distPath, repoDir, sourcePath } from './lib/repo-paths.mjs';

function loadCompatibilityDifferences() {
  const distFile = distPath('differences.json');
  if (existsSync(distFile)) {
    return JSON.parse(readFileSync(distFile, 'utf-8'));
  }

  return JSON.parse(readFileSync(sourcePath('differences.json'), 'utf-8'));
}

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const differences = loadCompatibilityDifferences();
const countingSystems = JSON.parse(readFileSync(sourcePath('counting-systems.json'), 'utf-8'));

const projected = buildBookBoundaryPrimitives(differences, countingSystems);
const document = normalizeBookBoundaryPrimitivesDocument(projected, countingSystems, pkg.version);

writeFileSync(
  sourcePath('book-boundary-primitives.json'),
  JSON.stringify(document, null, 2) + '\n'
);

console.log('  Generated: data/book-boundary-primitives.json');
