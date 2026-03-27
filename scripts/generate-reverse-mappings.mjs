/**
 * Generate reverse counting-system mappings and rawi aliases from forward data.
 *
 * Usage: node scripts/generate-reverse-mappings.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { normalizeForwardMappingDocument } from './lib/mapping-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');
const mappingsDir = join(dataDir, 'mappings', 'by-counting-system');
const rawiMappingsDir = join(dataDir, 'mappings', 'by-rawi');
const rawiMetadataDir = join(dataDir, 'rawis');

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
const version = pkg.version;
const countingSystems = JSON.parse(readFileSync(join(dataDir, 'counting-systems.json'), 'utf-8'));

mkdirSync(mappingsDir, { recursive: true });
mkdirSync(rawiMappingsDir, { recursive: true });

function buildReverseSurah(surahData, surahNumber, systemId) {
  const targetToHafs = {};

  for (const [hafsAyahStr, entry] of Object.entries(surahData.ayahs)) {
    const hafsAyah = Number.parseInt(hafsAyahStr, 10);
    const targets = Array.isArray(entry.splits_into) ? entry.splits_into : [entry.target_ayah];

    for (const targetAyah of targets) {
      const key = String(targetAyah);
      if (!targetToHafs[key]) {
        targetToHafs[key] = [];
      }
      targetToHafs[key].push(hafsAyah);
    }
  }

  const ayahs = {};
  for (let targetAyah = 1; targetAyah <= surahData.target_ayah_count; targetAyah += 1) {
    const key = String(targetAyah);
    const hafsAyahs = [...new Set(targetToHafs[key] || [])].sort((a, b) => a - b);

    if (hafsAyahs.length === 0) {
      throw new Error(`Reverse gap in ${systemId} surah ${surahNumber} target ayah ${targetAyah}`);
    }

    if (hafsAyahs.length === 1) {
      ayahs[key] = {
        hafs_ayah: hafsAyahs[0],
        status: 'mapped'
      };
    } else {
      ayahs[key] = {
        hafs_ayah: hafsAyahs[0],
        hafs_ayahs: hafsAyahs,
        status: 'covers_multiple'
      };
    }
  }

  return {
    source_ayah_count: surahData.target_ayah_count,
    hafs_ayah_count: surahData.hafs_ayah_count,
    ayahs
  };
}

function buildReverseMapping(forwardMapping, systemId, system) {
  const reverse = {
    _version: version,
    _description: `Reverse ayah mapping: ${system.name_en} (${system.name_ar}) → Kufan (Hafs).`,
    _source: systemId,
    _target: 'kufi',
    surahs: {}
  };

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const key = String(surahNumber);
    reverse.surahs[key] = buildReverseSurah(forwardMapping.surahs[key], surahNumber, systemId);
  }

  return reverse;
}

for (const [systemId, system] of Object.entries(countingSystems)) {
  if (systemId === 'kufi') {
    continue;
  }

  const forwardPath = join(mappingsDir, `kufi-to-${systemId}.json`);
  let forward;
  try {
    forward = normalizeForwardMappingDocument(JSON.parse(readFileSync(forwardPath, 'utf-8')));
  } catch {
    continue;
  }

  const reverse = buildReverseMapping(forward, systemId, system);
  writeFileSync(join(mappingsDir, `kufi-to-${systemId}.json`), JSON.stringify(forward, null, 2) + '\n');
  writeFileSync(join(mappingsDir, `${systemId}-to-kufi.json`), JSON.stringify(reverse, null, 2) + '\n');
  console.log(`  Generated: mappings/by-counting-system/${systemId}-to-kufi.json`);
}

for (const filename of readdirSync(rawiMetadataDir).sort()) {
  if (!filename.endsWith('.json')) {
    continue;
  }

  const rawiMeta = JSON.parse(readFileSync(join(rawiMetadataDir, filename), 'utf-8'));
  const rawiSlug = rawiMeta._rawi;
  const systemId = rawiMeta._counting_system;

  if (systemId === 'kufi') {
    continue;
  }

  const forward = JSON.parse(readFileSync(join(mappingsDir, `kufi-to-${systemId}.json`), 'utf-8'));
  const reverse = JSON.parse(readFileSync(join(mappingsDir, `${systemId}-to-kufi.json`), 'utf-8'));

  const hafsToRawi = {
    _version: version,
    _description: `Ayah mapping: Hafs (kufi) → ${rawiSlug} (${systemId}).`,
    _rawi: rawiSlug,
    _qiraa: rawiMeta._qiraa,
    _source: 'kufi',
    _target: systemId,
    surahs: forward.surahs
  };

  const rawiToHafs = {
    _version: version,
    _description: `Ayah mapping: ${rawiSlug} (${systemId}) → Hafs (kufi).`,
    _rawi: rawiSlug,
    _qiraa: rawiMeta._qiraa,
    _source: systemId,
    _target: 'kufi',
    surahs: reverse.surahs
  };

  writeFileSync(join(rawiMappingsDir, `hafs-to-${rawiSlug}.json`), JSON.stringify(hafsToRawi, null, 2) + '\n');
  writeFileSync(join(rawiMappingsDir, `${rawiSlug}-to-hafs.json`), JSON.stringify(rawiToHafs, null, 2) + '\n');
  console.log(`  Generated: mappings/by-rawi/hafs-to-${rawiSlug}.json`);
  console.log(`  Generated: mappings/by-rawi/${rawiSlug}-to-hafs.json`);
}

console.log('\nReverse and rawi mappings generated.');
