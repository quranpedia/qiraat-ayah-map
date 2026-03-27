/**
 * Regenerate rawi metadata files from qiraat.json.
 *
 * Usage: node scripts/sync-rawi-metadata.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');
const rawisDir = join(dataDir, 'rawis');

const knownMushafIds = {
  hafs: 1,
  warsh: 4,
  bazzi: 5,
  duri: 6,
  qalun: 7,
  qunbul: 8,
  shuba: 9,
  susi: 10
};

const qiraat = JSON.parse(readFileSync(join(dataDir, 'qiraat.json'), 'utf-8'));

mkdirSync(rawisDir, { recursive: true });

for (const [qiraaSlug, qiraa] of Object.entries(qiraat)) {
  for (const rawiSlug of Object.keys(qiraa.rawis).sort()) {
    const systemId = qiraa.counting_system;
    const metadata = {
      _rawi: rawiSlug,
      _qiraa: qiraaSlug,
      _counting_system: systemId,
      _mushaf_id: rawiSlug in knownMushafIds ? knownMushafIds[rawiSlug] : null,
      _mapping_file: systemId === 'kufi'
        ? null
        : `mappings/by-counting-system/kufi-to-${systemId}.json`
    };

    if (systemId === 'kufi') {
      metadata._note = `${rawiSlug} uses the Kufan counting system, so ayah numbers are identical to Hafs.`;
    }

    writeFileSync(join(rawisDir, `${rawiSlug}.json`), JSON.stringify(metadata, null, 2) + '\n');
    console.log(`  Synced: rawis/${rawiSlug}.json`);
  }
}
