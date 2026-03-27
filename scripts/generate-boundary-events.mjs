/**
 * Generate authoritative boundary-event counts from the normalized forward
 * mapping files.
 *
 * Usage: node scripts/generate-boundary-events.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  collectBoundaryEventsFromForwardSurah,
  normalizeForwardMappingDocument
} from './lib/mapping-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');
const mappingsDir = join(dataDir, 'mappings', 'by-counting-system');

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
const version = pkg.version;
const countingSystems = JSON.parse(readFileSync(join(dataDir, 'counting-systems.json'), 'utf-8'));

const document = {
  _version: version,
  _description: 'Authoritative ayah-boundary event counts derived from the normalized forward mapping files. Use this file when you need boundary deltas that are guaranteed to match the shipped mappings exactly.',
  _reference_system: 'kufi',
  differences: []
};

for (const systemId of Object.keys(countingSystems).sort()) {
  if (systemId === 'kufi') {
    continue;
  }

  const mappingPath = join(mappingsDir, `kufi-to-${systemId}.json`);
  const mapping = normalizeForwardMappingDocument(JSON.parse(readFileSync(mappingPath, 'utf-8')));

  const block = {
    counting_system: systemId,
    _source_mapping_file: `mappings/by-counting-system/kufi-to-${systemId}.json`,
    items: []
  };

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const surahEvents = collectBoundaryEventsFromForwardSurah(mapping.surahs[String(surahNumber)]);
    for (const event of surahEvents) {
      block.items.push({
        surah: surahNumber,
        hafs_ayah: event.hafs_ayah,
        type: event.type,
        count: event.count
      });
    }
  }

  document.differences.push(block);
}

writeFileSync(join(dataDir, 'boundary-events.json'), JSON.stringify(document, null, 2) + '\n');
console.log('  Generated: data/boundary-events.json');
