/**
 * Utilities for normalizing and validating forward mapping files.
 */

export function getSortedNumericKeys(record) {
  return Object.keys(record)
    .map(value => Number.parseInt(value, 10))
    .sort((a, b) => a - b);
}

export function buildRange(start, end) {
  if (!Number.isInteger(start) || !Number.isInteger(end) || end < start) {
    throw new Error(`Invalid range: ${start}..${end}`);
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getExistingSplitEnd(entry) {
  if (!Array.isArray(entry.splits_into) || entry.splits_into.length === 0) {
    return null;
  }

  return Math.max(...entry.splits_into);
}

export function normalizeForwardSurah(surahData, surahNumber = null) {
  const hafsAyahCount = surahData.hafs_ayah_count;
  const targetAyahCount = surahData.target_ayah_count;
  const normalizedAyahs = {};

  if (!Number.isInteger(hafsAyahCount) || hafsAyahCount < 1) {
    throw new Error(`Invalid hafs_ayah_count for surah ${surahNumber ?? '?'}`);
  }
  if (!Number.isInteger(targetAyahCount) || targetAyahCount < 1) {
    throw new Error(`Invalid target_ayah_count for surah ${surahNumber ?? '?'}`);
  }

  for (let hafsAyah = 1; hafsAyah <= hafsAyahCount; hafsAyah += 1) {
    const key = String(hafsAyah);
    if (!surahData.ayahs[key]) {
      throw new Error(`Missing forward entry for surah ${surahNumber ?? '?'} ayah ${hafsAyah}`);
    }
  }

  const starts = Array.from({ length: hafsAyahCount + 1 }, () => null);
  for (let hafsAyah = 1; hafsAyah <= hafsAyahCount; hafsAyah += 1) {
    const key = String(hafsAyah);
    const entry = surahData.ayahs[key];
    const start = entry.target_ayah;

    if (!Number.isInteger(start) || start < 1 || start > targetAyahCount) {
      throw new Error(
        `Invalid target_ayah for surah ${surahNumber ?? '?'} ayah ${hafsAyah}: ${start}`
      );
    }

    starts[hafsAyah] = start;
  }

  for (let hafsAyah = 1; hafsAyah <= hafsAyahCount; hafsAyah += 1) {
    const key = String(hafsAyah);
    const current = surahData.ayahs[key];
    const start = starts[hafsAyah];

    let mergedAfter = false;
    let end = targetAyahCount;

    if (hafsAyah < hafsAyahCount) {
      const nextStart = starts[hafsAyah + 1];
      const delta = nextStart - start;

      if (delta < 0) {
        throw new Error(
          `Non-monotonic targets in surah ${surahNumber ?? '?'} between ayahs ${hafsAyah} and ${hafsAyah + 1}`
        );
      }

      if (delta === 0) {
        mergedAfter = true;
      } else {
        const existingSplitEnd = getExistingSplitEnd(current);
        mergedAfter = current.status === 'merged'
          || (current.status === 'split' && existingSplitEnd === nextStart);
      }

      end = nextStart - (mergedAfter ? 0 : 1);
    }

    if (end < start) {
      throw new Error(
        `Invalid target span in surah ${surahNumber ?? '?'} ayah ${hafsAyah}: ${start}..${end}`
      );
    }

    const targets = buildRange(start, end);

    if (targets.length === 1) {
      normalizedAyahs[key] = {
        target_ayah: start,
        status: mergedAfter ? 'merged' : 'mapped'
      };
    } else {
      normalizedAyahs[key] = {
        target_ayah: start,
        status: 'split',
        splits_into: targets
      };
    }
  }

  return {
    ...surahData,
    ayahs: normalizedAyahs
  };
}

export function normalizeForwardMappingDocument(mapping) {
  const surahs = {};

  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    const key = String(surahNumber);
    const surahData = mapping.surahs[key];

    if (!surahData) {
      throw new Error(`Missing surah ${surahNumber}`);
    }

    surahs[key] = normalizeForwardSurah(surahData, surahNumber);
  }

  return {
    ...mapping,
    surahs
  };
}

export function collectForwardTargetCoverage(surahData) {
  const covered = new Set();

  for (const entry of Object.values(surahData.ayahs)) {
    covered.add(entry.target_ayah);
    if (Array.isArray(entry.splits_into)) {
      for (const target of entry.splits_into) {
        covered.add(target);
      }
    }
  }

  return covered;
}
