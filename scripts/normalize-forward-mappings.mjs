/**
 * Normalize all generated forward mappings so every target ayah is covered and
 * every split span is fully materialized in splits_into.
 *
 * Usage: node scripts/normalize-forward-mappings.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { normalizeForwardMappingDocument } from './lib/mapping-utils.mjs';
import { distMappingsByCountingSystemDir } from './lib/repo-paths.mjs';

for (const filename of readdirSync(distMappingsByCountingSystemDir).sort()) {
  if (!filename.startsWith('kufi-to-') || !filename.endsWith('.json')) {
    continue;
  }

  const fullPath = join(distMappingsByCountingSystemDir, filename);
  const mapping = JSON.parse(readFileSync(fullPath, 'utf-8'));
  const normalized = normalizeForwardMappingDocument(mapping);
  writeFileSync(fullPath, JSON.stringify(normalized, null, 2) + '\n');
  console.log(`  Normalized: dist/mappings/by-counting-system/${filename}`);
}
