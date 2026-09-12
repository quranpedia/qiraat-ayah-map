/**
 * Regenerate rawi metadata files from qiraat.json and printed-editions.json
 * into the generated artifact tree.
 *
 * Two counting fields, never one. `_counting_system_associated_with_qari` is
 * the counting madhhab attributed to the qāriʾ, carried unchanged from
 * `data/qiraat.json`. `_counting_system_printed` is the numbering the muṣḥaf we
 * have actually measured for this rāwī prints, from `data/printed-editions.json`,
 * and is null where no printing has been measured. For Abū ʿAmr's two rāwīs they
 * differ, which is why one field could never carry both.
 *
 * Usage: node scripts/sync-rawi-metadata.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { distRawisDir, sourcePath } from './lib/repo-paths.mjs';

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

const DEPRECATED = {
  _counting_system:
    'Renamed to _counting_system_associated_with_qari. The value and its meaning are unchanged: it is the count attributed to the qāriʾ, never the count a printing carries. Read _counting_system_printed for that.',
  _mapping_file:
    'Renamed to _mapping_file_associated_with_qari. To renumber against the muṣḥaf actually printed for this rāwī, use _mapping_file_printed.'
};

function mappingFile(systemId) {
  if (systemId === null) {
    return null;
  }
  return systemId === 'kufi' ? null : `mappings/by-counting-system/kufi-to-${systemId}.json`;
}

const qiraat = JSON.parse(readFileSync(sourcePath('qiraat.json'), 'utf-8'));
const printedEditions = JSON.parse(readFileSync(sourcePath('printed-editions.json'), 'utf-8'));

const printedByRawi = new Map();
for (const edition of printedEditions.editions) {
  if (printedByRawi.has(edition.rawi)) {
    throw new Error(`printed-editions.json has more than one measured edition for rawi "${edition.rawi}"; the rawi artifact can only carry one`);
  }
  printedByRawi.set(edition.rawi, edition);
}

mkdirSync(distRawisDir, { recursive: true });

for (const [qiraaSlug, qiraa] of Object.entries(qiraat)) {
  for (const rawiSlug of Object.keys(qiraa.rawis).sort()) {
    const associated = qiraa.counting_system_associated_with_qari;
    const printed = printedByRawi.get(rawiSlug) ?? null;
    const printedSystem = printed ? printed.counting_system_printed : null;

    const metadata = {
      _rawi: rawiSlug,
      _qiraa: qiraaSlug,
      _counting_system_associated_with_qari: associated,
      _counting_system_printed: printedSystem,
      _printed_edition: printed ? printed.id : null,
      _differs_from_association: printed ? printed.differs_from_association : null,
      _counting_system: associated,
      _mushaf_id: rawiSlug in knownMushafIds ? knownMushafIds[rawiSlug] : null,
      _mapping_file_associated_with_qari: mappingFile(associated),
      _mapping_file_printed: mappingFile(printedSystem),
      _mapping_file: mappingFile(associated),
      _deprecated: DEPRECATED
    };

    if (associated === 'kufi') {
      metadata._note = `${rawiSlug} uses the Kufan counting system, so ayah numbers are identical to Hafs.`;
    }

    if (printed === null) {
      metadata._printed_note = `No printing of ${rawiSlug} has been measured, so _counting_system_printed is null. Absence means unmeasured, not that the printing follows the attributed count.`;
    }

    writeFileSync(join(distRawisDir, `${rawiSlug}.json`), JSON.stringify(metadata, null, 2) + '\n');
    console.log(`  Synced: dist/rawis/${rawiSlug}.json`);
  }
}
