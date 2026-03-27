/**
 * Normalize and synchronize the canonical scholar-facing evidence sidecar so it
 * always stays aligned to book-boundary-primitives.json.
 *
 * Usage: node scripts/normalize-book-boundary-evidence.mjs
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { normalizeBookBoundaryPrimitivesDocument } from './lib/book-primitives-utils.mjs';
import { normalizeBookBoundaryEvidenceDocument } from './lib/book-evidence-utils.mjs';
import { repoDir, sourcePath } from './lib/repo-paths.mjs';

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const version = pkg.version;
const countingSystems = JSON.parse(readFileSync(sourcePath('counting-systems.json'), 'utf-8'));
const primitives = JSON.parse(readFileSync(sourcePath('book-boundary-primitives.json'), 'utf-8'));
const normalizedPrimitives = normalizeBookBoundaryPrimitivesDocument(primitives, countingSystems, version);
const evidencePath = sourcePath('book-boundary-evidence.json');
const evidence = existsSync(evidencePath)
  ? JSON.parse(readFileSync(evidencePath, 'utf-8'))
  : { surahs: {} };

const normalizedEvidence = normalizeBookBoundaryEvidenceDocument(
  evidence,
  normalizedPrimitives,
  countingSystems,
  version
);

writeFileSync(evidencePath, JSON.stringify(normalizedEvidence, null, 2) + '\n');
console.log('  Normalized: data/book-boundary-evidence.json');
