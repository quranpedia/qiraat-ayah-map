/**
 * Normalize all shipped forward mappings so every target ayah is covered and
 * every split span is fully materialized in splits_into.
 *
 * Usage: node scripts/normalize-forward-mappings.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { normalizeForwardMappingDocument } from './lib/mapping-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');
const mappingsDir = join(dataDir, 'mappings', 'by-counting-system');

for (const filename of readdirSync(mappingsDir).sort()) {
  if (!filename.startsWith('kufi-to-') || !filename.endsWith('.json')) {
    continue;
  }

  const fullPath = join(mappingsDir, filename);
  const mapping = JSON.parse(readFileSync(fullPath, 'utf-8'));
  const normalized = normalizeForwardMappingDocument(mapping);
  writeFileSync(fullPath, JSON.stringify(normalized, null, 2) + '\n');
  console.log(`  Normalized: mappings/by-counting-system/${filename}`);
}
