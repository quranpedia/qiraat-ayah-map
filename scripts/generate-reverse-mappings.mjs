/**
 * Generate reverse mapping files (target system → Kufan/Hafs) and rawi-level files.
 *
 * Reads the existing forward mappings (hafs-to-{system}.json) and produces:
 *   1. data/mappings/by-counting-system/{system}-to-kufi.json
 *      — for each target system ayah, which Hafs ayah(s) it corresponds to
 *   2. data/mappings/by-rawi/{rawi}-to-hafs.json
 *      — same data but keyed by rawi name for direct rawi-level lookup
 *
 * Handles one-to-many cases:
 *   - "mapped": 1 target ayah → 1 Hafs ayah (simple)
 *   - "covers_multiple": 1 target ayah → 2+ Hafs ayahs (target absorbed merged Hafs ayahs)
 *   - "partial": target ayah is one of multiple created from a single Hafs ayah (split case)
 *
 * Usage: node scripts/generate-reverse-mappings.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
const VERSION = pkg.version;

const countingSystems = JSON.parse(readFileSync(join(dataDir, 'counting-systems.json'), 'utf-8'));
const qiraat = JSON.parse(readFileSync(join(dataDir, 'qiraat.json'), 'utf-8'));

const sysDir = join(dataDir, 'mappings', 'by-counting-system');
const rawiDir = join(dataDir, 'mappings', 'by-rawi');
mkdirSync(sysDir, { recursive: true });
mkdirSync(rawiDir, { recursive: true });

// Also copy forward mappings into by-counting-system
const fwdDir = join(dataDir, 'mappings', 'by-counting-system');

for (const [systemId, system] of Object.entries(countingSystems)) {
  if (systemId === 'kufi') continue;

  const fwdPath = join(dataDir, 'mappings', 'by-counting-system', `kufi-to-${systemId}.json`);
  let forward;
  try { forward = JSON.parse(readFileSync(fwdPath, 'utf-8')); } catch { continue; }

  // --- Build reverse mapping ---
  const reverse = {
    _version: VERSION,
    _description: `Reverse ayah mapping: ${system.name_en} (${system.name_ar}) → Kufan (Hafs).`,
    _source: systemId,
    _target: 'kufi',
    surahs: {}
  };

  for (const [surahStr, surahData] of Object.entries(forward.surahs)) {
    const hafsCount = surahData.hafs_ayah_count;
    const targetCount = surahData.target_ayah_count;

    // Build: target_ayah_number → [hafs_ayah_numbers]
    const targetToHafs = {};

    for (const [hafsStr, entry] of Object.entries(surahData.ayahs)) {
      const hafsNum = parseInt(hafsStr);

      if (entry.status === 'merged') {
        // This hafs ayah is merged — its target_ayah (if not null) absorbs it
        if (entry.target_ayah !== null) {
          const t = String(entry.target_ayah);
          if (!targetToHafs[t]) targetToHafs[t] = [];
          targetToHafs[t].push(hafsNum);
        }
        // If null, this hafs ayah is absorbed into an adjacent target
        // We need to find which target ayah contains it
        // Look at the previous or next hafs ayah's target
        else {
          // Find the nearest non-null target_ayah
          for (let probe = hafsNum - 1; probe >= 1; probe--) {
            const prev = surahData.ayahs[String(probe)];
            if (prev && prev.target_ayah !== null) {
              const t = String(prev.target_ayah);
              if (!targetToHafs[t]) targetToHafs[t] = [];
              targetToHafs[t].push(hafsNum);
              break;
            }
          }
          // If nothing before, try after
          if (!Object.values(targetToHafs).flat().includes(hafsNum)) {
            for (let probe = hafsNum + 1; probe <= hafsCount; probe++) {
              const next = surahData.ayahs[String(probe)];
              if (next && next.target_ayah !== null) {
                const t = String(next.target_ayah);
                if (!targetToHafs[t]) targetToHafs[t] = [];
                targetToHafs[t].push(hafsNum);
                break;
              }
            }
          }
        }
      } else if (entry.status === 'split') {
        // This hafs ayah maps to multiple target ayahs
        const targets = entry.splits_into || [entry.target_ayah];
        for (const t of targets) {
          const ts = String(t);
          if (!targetToHafs[ts]) targetToHafs[ts] = [];
          targetToHafs[ts].push(hafsNum);
        }
      } else {
        // mapped: simple 1:1
        const t = String(entry.target_ayah);
        if (!targetToHafs[t]) targetToHafs[t] = [];
        targetToHafs[t].push(hafsNum);
      }
    }

    // Build reverse ayahs object
    const reverseAyahs = {};
    for (let t = 1; t <= targetCount; t++) {
      const ts = String(t);
      const hafsNums = (targetToHafs[ts] || []).sort((a, b) => a - b);

      if (hafsNums.length === 0) {
        // This target ayah was created by a split — find the source hafs
        reverseAyahs[ts] = { hafs_ayah: null, status: 'split_product' };
      } else if (hafsNums.length === 1) {
        reverseAyahs[ts] = { hafs_ayah: hafsNums[0], status: 'mapped' };
      } else {
        reverseAyahs[ts] = {
          hafs_ayah: hafsNums[0],
          hafs_ayahs: hafsNums,
          status: 'covers_multiple'
        };
      }
    }

    reverse.surahs[surahStr] = {
      source_ayah_count: targetCount,
      hafs_ayah_count: hafsCount,
      ayahs: reverseAyahs
    };
  }

  // Write counting-system reverse file
  const revPath = join(sysDir, `${systemId}-to-kufi.json`);
  writeFileSync(revPath, JSON.stringify(reverse, null, 2) + '\n');
  console.log(`  Generated: by-counting-system/${systemId}-to-kufi.json`);

  // Copy forward mapping too
  const fwdCopyPath = join(sysDir, `kufi-to-${systemId}.json`);
  const fwdCopy = { ...forward, _description: `Ayah mapping: Kufan (Hafs) → ${system.name_en} (${system.name_ar}).` };
  writeFileSync(fwdCopyPath, JSON.stringify(fwdCopy, null, 2) + '\n');
  console.log(`  Generated: by-counting-system/kufi-to-${systemId}.json`);
}

// --- Generate rawi-level files ---
// Read rawi metadata files
const rawiFiles = readdirSync(join(dataDir, 'rawis')).filter(f => f.endsWith('.json'));

for (const rawiFile of rawiFiles) {
  const rawiMeta = JSON.parse(readFileSync(join(dataDir, 'rawis', rawiFile), 'utf-8'));
  const rawiSlug = rawiMeta._rawi;
  const systemId = rawiMeta._counting_system;

  if (systemId === 'kufi') {
    // Hafs/Shu'ba → identity mapping, no file needed
    continue;
  }

  // Forward: rawi-to-hafs (reverse direction, rawi's system → kufi)
  const sysRevPath = join(sysDir, `${systemId}-to-kufi.json`);
  let sysReverse;
  try { sysReverse = JSON.parse(readFileSync(sysRevPath, 'utf-8')); } catch { continue; }

  const rawiToHafs = {
    _version: VERSION,
    _description: `Ayah mapping: ${rawiMeta._rawi} (${systemId}) → Hafs (kufi). Use this to find the Hafs equivalent for any ${rawiMeta._rawi} ayah.`,
    _rawi: rawiSlug,
    _qiraa: rawiMeta._qiraa,
    _source: systemId,
    _target: 'kufi',
    surahs: sysReverse.surahs
  };

  const rawiRevPath = join(rawiDir, `${rawiSlug}-to-hafs.json`);
  writeFileSync(rawiRevPath, JSON.stringify(rawiToHafs, null, 2) + '\n');
  console.log(`  Generated: by-rawi/${rawiSlug}-to-hafs.json`);

  // Also hafs-to-rawi (forward direction)
  const sysFwdPath = join(dataDir, 'mappings', 'by-counting-system', `kufi-to-${systemId}.json`);
  let sysFwd;
  try { sysFwd = JSON.parse(readFileSync(sysFwdPath, 'utf-8')); } catch { continue; }

  const hafsToRawi = {
    _version: VERSION,
    _description: `Ayah mapping: Hafs (kufi) → ${rawiMeta._rawi} (${systemId}). Use this to find the ${rawiMeta._rawi} equivalent for any Hafs ayah.`,
    _rawi: rawiSlug,
    _qiraa: rawiMeta._qiraa,
    _source: 'kufi',
    _target: systemId,
    surahs: sysFwd.surahs
  };

  const hafsFwdPath = join(rawiDir, `hafs-to-${rawiSlug}.json`);
  writeFileSync(hafsFwdPath, JSON.stringify(hafsToRawi, null, 2) + '\n');
  console.log(`  Generated: by-rawi/hafs-to-${rawiSlug}.json`);
}

console.log('\nAll reverse and rawi mappings generated.');
