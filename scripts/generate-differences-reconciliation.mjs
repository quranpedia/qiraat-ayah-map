/**
 * Compare the generated compatibility word-level differences file with the
 * authoritative mapping-derived boundary events.
 *
 * Usage: node scripts/generate-differences-reconciliation.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { distPath, repoDir, sourcePath } from './lib/repo-paths.mjs';

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const version = pkg.version;
const wordLevel = JSON.parse(readFileSync(distPath('differences.json'), 'utf-8'));
const boundaryEvents = JSON.parse(readFileSync(distPath('boundary-events.json'), 'utf-8'));
const kufiCounts = JSON.parse(readFileSync(distPath('surah-counts', 'kufi.json'), 'utf-8'));
const countingSystems = JSON.parse(readFileSync(sourcePath('counting-systems.json'), 'utf-8'));

function buildSystemAggregate(items) {
  const bySurah = {};
  let mergeCount = 0;
  let splitCount = 0;

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    bySurah[String(surahNumber)] = {};
  }

  for (const item of items) {
    const surahKey = String(item.surah);
    const ayahKey = String(item.hafs_ayah);
    const count = Number.isInteger(item.count) ? item.count : 1;

    if (!bySurah[surahKey][ayahKey]) {
      bySurah[surahKey][ayahKey] = {
        merge: 0,
        split: 0
      };
    }

    bySurah[surahKey][ayahKey][item.type] += count;

    if (item.type === 'merge') {
      mergeCount += count;
    } else {
      splitCount += count;
    }
  }

  return {
    bySurah,
    mergeCount,
    splitCount
  };
}

function getTargetCount(hafsAyahCount, counts) {
  return hafsAyahCount - counts.merge + counts.split;
}

const wordLevelBySystem = Object.fromEntries(
  wordLevel.differences.map(block => [block.counting_system, buildSystemAggregate(block.items)])
);
const mappingBySystem = Object.fromEntries(
  boundaryEvents.differences.map(block => [block.counting_system, buildSystemAggregate(block.items)])
);

const report = {
  _version: version,
  _description: 'Reconciliation report between the generated compatibility word-level differences file and the authoritative mapping-derived boundary-events file.',
  _reference_system: 'kufi',
  systems: {}
};

for (const systemId of Object.keys(countingSystems).sort()) {
  if (systemId === 'kufi') {
    continue;
  }

  const scholarly = wordLevelBySystem[systemId] || buildSystemAggregate([]);
  const authoritative = mappingBySystem[systemId] || buildSystemAggregate([]);
  const mismatchedSurahs = [];

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const surahKey = String(surahNumber);
    const hafsAyahCount = kufiCounts.surahs[surahKey];

    const scholarlySurah = scholarly.bySurah[surahKey];
    const authoritativeSurah = authoritative.bySurah[surahKey];

    let scholarlyMerge = 0;
    let scholarlySplit = 0;
    let authoritativeMerge = 0;
    let authoritativeSplit = 0;
    const mismatchedHafsAyahs = [];

    for (let hafsAyah = 1; hafsAyah <= hafsAyahCount; hafsAyah += 1) {
      const ayahKey = String(hafsAyah);
      const scholarlyCounts = scholarlySurah[ayahKey] || { merge: 0, split: 0 };
      const authoritativeCounts = authoritativeSurah[ayahKey] || { merge: 0, split: 0 };

      scholarlyMerge += scholarlyCounts.merge;
      scholarlySplit += scholarlyCounts.split;
      authoritativeMerge += authoritativeCounts.merge;
      authoritativeSplit += authoritativeCounts.split;

      if (
        scholarlyCounts.merge !== authoritativeCounts.merge
        || scholarlyCounts.split !== authoritativeCounts.split
      ) {
        mismatchedHafsAyahs.push({
          hafs_ayah: hafsAyah,
          word_level: {
            merge_count: scholarlyCounts.merge,
            split_count: scholarlyCounts.split
          },
          mapping: {
            merge_count: authoritativeCounts.merge,
            split_count: authoritativeCounts.split
          }
        });
      }
    }

    if (mismatchedHafsAyahs.length > 0) {
      mismatchedSurahs.push({
        surah: surahNumber,
        word_level: {
          merge_count: scholarlyMerge,
          split_count: scholarlySplit,
          target_ayah_count: getTargetCount(hafsAyahCount, { merge: scholarlyMerge, split: scholarlySplit })
        },
        mapping: {
          merge_count: authoritativeMerge,
          split_count: authoritativeSplit,
          target_ayah_count: getTargetCount(hafsAyahCount, { merge: authoritativeMerge, split: authoritativeSplit })
        },
        mismatched_hafs_ayahs: mismatchedHafsAyahs
      });
    }
  }

  report.systems[systemId] = {
    is_exact_match: mismatchedSurahs.length === 0,
    word_level_merge_count: scholarly.mergeCount,
    word_level_split_count: scholarly.splitCount,
    word_level_total_ayahs: kufiCounts._total_ayahs - scholarly.mergeCount + scholarly.splitCount,
    mapping_merge_count: authoritative.mergeCount,
    mapping_split_count: authoritative.splitCount,
    mapping_total_ayahs: countingSystems[systemId].total_ayahs,
    mismatched_surahs: mismatchedSurahs
  };
}

writeFileSync(distPath('differences-reconciliation.json'), JSON.stringify(report, null, 2) + '\n');
console.log('  Generated: dist/differences-reconciliation.json');
