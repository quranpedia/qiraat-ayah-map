/**
 * Utilities for the scholar-facing, book-aligned boundary-primitive layer.
 *
 * The goal of this layer is not binary compression. The goal is to store the
 * disputed ayah heads in the same shape used by books of `add al-ay: a
 * boundary point anchored by a word, plus the counting systems that count it as
 * a ra's ayah.
 */

export const TRADITIONAL_SYSTEM_ORDER = [
  'madani-first',
  'madani-last',
  'makki',
  'basri',
  'dimashqi',
  'kufi'
];

export const BOOK_BOUNDARY_PRIMITIVES_DESCRIPTION = 'Canonical scholar-facing, book-aligned primitive boundary layer. Each listed point is a disputed ayah boundary anchored by the source word. counted_by names the counting systems that count that point as a ra\'s ayah. Ordinary undisputed kufi ends are implicit and omitted.';

export const DIFFERENCES_COMPATIBILITY_DESCRIPTION = 'Generated system-by-system word-level compatibility view expanded from the canonical book-aligned primitive layer.';

function stableUnique(values) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    if (seen.has(value)) {
      continue;
    }

    seen.add(value);
    result.push(value);
  }

  return result;
}

export function getTraditionalSystemOrder(systemIds) {
  const uniqueIds = stableUnique(systemIds);
  const ordered = TRADITIONAL_SYSTEM_ORDER.filter(id => uniqueIds.includes(id));
  const extras = uniqueIds.filter(id => !ordered.includes(id)).sort();
  return [...ordered, ...extras];
}

function buildAyahKey(surah, hafsAyah) {
  return `${surah}:${hafsAyah}`;
}

function compareNumbersAscending(left, right) {
  return left - right;
}

function sortNumericKeysAscending(record) {
  return Object.keys(record || {})
    .map(key => Number.parseInt(key, 10))
    .sort(compareNumbersAscending)
    .map(value => String(value));
}

function ensureAyahRecord(byAyah, surah, hafsAyah) {
  const key = buildAyahKey(surah, hafsAyah);

  if (!byAyah.has(key)) {
    byAyah.set(key, {
      surah,
      hafsAyah,
      end: null,
      internal: new Map()
    });
  }

  return byAyah.get(key);
}

function ensureSplitSequence(splitSequencesByAyah, surah, hafsAyah, systemId) {
  const ayahKey = buildAyahKey(surah, hafsAyah);

  if (!splitSequencesByAyah.has(ayahKey)) {
    splitSequencesByAyah.set(ayahKey, []);
  }

  const sequences = splitSequencesByAyah.get(ayahKey);

  let sequence = sequences.find(item => item.systemId === systemId);
  if (!sequence) {
    sequence = {
      systemId,
      words: []
    };
    sequences.push(sequence);
  }

  return sequence.words;
}

function sortWordRecords(wordRecords) {
  return wordRecords
    .slice()
    .sort((left, right) => left._first_seen - right._first_seen || left.word.localeCompare(right.word, 'ar'));
}

function topologicallyOrderInternalWords(wordRecords, sequences) {
  if (wordRecords.length <= 1) {
    return wordRecords;
  }

  const byWord = new Map(wordRecords.map(record => [record.word, record]));
  const adjacency = new Map();
  const indegree = new Map();

  for (const record of wordRecords) {
    adjacency.set(record.word, new Set());
    indegree.set(record.word, 0);
  }

  for (const sequence of sequences) {
    const words = stableUnique(sequence.words);
    for (let index = 0; index < words.length - 1; index += 1) {
      const current = words[index];
      const next = words[index + 1];

      if (current === next || !adjacency.has(current) || !adjacency.has(next)) {
        continue;
      }

      if (!adjacency.get(current).has(next)) {
        adjacency.get(current).add(next);
        indegree.set(next, indegree.get(next) + 1);
      }
    }
  }

  const queue = sortWordRecords(wordRecords.filter(record => indegree.get(record.word) === 0));
  const ordered = [];

  while (queue.length > 0) {
    const current = queue.shift();
    ordered.push(current);

    for (const nextWord of adjacency.get(current.word)) {
      indegree.set(nextWord, indegree.get(nextWord) - 1);
      if (indegree.get(nextWord) === 0) {
        queue.push(byWord.get(nextWord));
        queue.sort((left, right) => left._first_seen - right._first_seen || left.word.localeCompare(right.word, 'ar'));
      }
    }
  }

  if (ordered.length !== wordRecords.length) {
    return sortWordRecords(wordRecords);
  }

  return ordered;
}

function normalizeCountedBy(countedBy, orderedSystemIds, { allowKufi, location }) {
  if (!Array.isArray(countedBy) || countedBy.length === 0) {
    throw new Error(`${location}: counted_by must be a non-empty array`);
  }

  const knownSystemIds = new Set(orderedSystemIds);
  const uniqueIds = stableUnique(countedBy);

  for (const systemId of uniqueIds) {
    if (!knownSystemIds.has(systemId)) {
      throw new Error(`${location}: unknown counting system in counted_by: ${systemId}`);
    }
  }

  const hasKufi = uniqueIds.includes('kufi');
  if (allowKufi && !hasKufi) {
    throw new Error(`${location}: end.counted_by must include kufi`);
  }

  if (!allowKufi && hasKufi) {
    throw new Error(`${location}: internal.counted_by must not include kufi`);
  }

  const normalized = orderedSystemIds.filter(systemId => uniqueIds.includes(systemId));

  if (normalized.length === orderedSystemIds.length) {
    throw new Error(`${location}: counted_by must represent a disputed boundary, not all systems`);
  }

  return normalized;
}

function normalizeWord(value, location) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${location}: word must be a non-empty string`);
  }

  return value.trim();
}

export function normalizeBookBoundaryPrimitivesDocument(primitivesDocument, countingSystems, version = primitivesDocument?._version) {
  const orderedSystemIds = getTraditionalSystemOrder(Object.keys(countingSystems));

  if (primitivesDocument._reference_system && primitivesDocument._reference_system !== 'kufi') {
    throw new Error('book-boundary-primitives.json must use kufi as its reference system');
  }

  const normalized = {
    _version: version,
    _description: BOOK_BOUNDARY_PRIMITIVES_DESCRIPTION,
    _reference_system: 'kufi',
    _counting_system_order: orderedSystemIds,
    surahs: {}
  };

  for (const surahKey of sortNumericKeysAscending(primitivesDocument.surahs)) {
    const surahNumber = Number.parseInt(surahKey, 10);

    if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114) {
      throw new Error(`book-boundary-primitives.json: invalid surah key ${surahKey}`);
    }

    const sourceAyahs = primitivesDocument.surahs[surahKey];
    const normalizedAyahs = {};

    for (const ayahKey of sortNumericKeysAscending(sourceAyahs)) {
      const hafsAyah = Number.parseInt(ayahKey, 10);
      const location = `${surahKey}:${ayahKey}`;

      if (!Number.isInteger(hafsAyah) || hafsAyah < 1) {
        throw new Error(`book-boundary-primitives.json: invalid hafs ayah key ${location}`);
      }

      const primitive = sourceAyahs[ayahKey];
      const normalizedPrimitive = {};

      if (primitive.internal) {
        if (!Array.isArray(primitive.internal) || primitive.internal.length === 0) {
          throw new Error(`${location}: internal must be a non-empty array when present`);
        }

        const seenInternalWords = new Set();
        normalizedPrimitive.internal = primitive.internal.map((internalPoint, index) => {
          const pointLocation = `${location}:internal[${index}]`;
          const word = normalizeWord(internalPoint.word, pointLocation);

          if (seenInternalWords.has(word)) {
            throw new Error(`${location}: duplicate internal word ${word}`);
          }
          seenInternalWords.add(word);

          return {
            word,
            counted_by: normalizeCountedBy(internalPoint.counted_by, orderedSystemIds, {
              allowKufi: false,
              location: pointLocation
            })
          };
        });
      }

      if (primitive.end) {
        normalizedPrimitive.end = {
          word: normalizeWord(primitive.end.word, `${location}:end`),
          counted_by: normalizeCountedBy(primitive.end.counted_by, orderedSystemIds, {
            allowKufi: true,
            location: `${location}:end`
          })
        };
      }

      if (!normalizedPrimitive.end && !normalizedPrimitive.internal) {
        throw new Error(`${location}: expected end or internal data`);
      }

      normalizedAyahs[ayahKey] = normalizedPrimitive;
    }

    if (Object.keys(normalizedAyahs).length > 0) {
      normalized.surahs[surahKey] = normalizedAyahs;
    }
  }

  return normalized;
}

export function buildBookBoundaryPrimitives(differencesDocument, countingSystems) {
  const orderedSystemIds = getTraditionalSystemOrder(Object.keys(countingSystems));
  const knownSystemIds = new Set(orderedSystemIds);
  const byAyah = new Map();
  const splitSequencesByAyah = new Map();
  let firstSeenCounter = 0;

  for (const block of differencesDocument.differences) {
    if (!knownSystemIds.has(block.counting_system)) {
      throw new Error(`Unknown counting system in differences.json: ${block.counting_system}`);
    }

    for (const item of block.items) {
      const ayahRecord = ensureAyahRecord(byAyah, item.surah, item.hafs_ayah);

      if (item.type === 'merge') {
        if (!ayahRecord.end) {
          ayahRecord.end = {
            word: item.word,
            omitted_by: new Set()
          };
        }

        if (ayahRecord.end.word !== item.word) {
          throw new Error(
            `Conflicting end-boundary words for ${item.surah}:${item.hafs_ayah}: `
            + `${ayahRecord.end.word} vs ${item.word}`
          );
        }

        ayahRecord.end.omitted_by.add(block.counting_system);
        continue;
      }

      if (!ayahRecord.internal.has(item.word)) {
        ayahRecord.internal.set(item.word, {
          word: item.word,
          counted_by: new Set(),
          _first_seen: firstSeenCounter
        });
        firstSeenCounter += 1;
      }

      ayahRecord.internal.get(item.word).counted_by.add(block.counting_system);
      ensureSplitSequence(splitSequencesByAyah, item.surah, item.hafs_ayah, block.counting_system).push(item.word);
    }
  }

  const surahs = {};
  const orderedAyahs = Array.from(byAyah.values()).sort((left, right) => {
    return compareNumbersAscending(left.surah, right.surah)
      || compareNumbersAscending(left.hafsAyah, right.hafsAyah);
  });

  for (const ayahRecord of orderedAyahs) {
    const surahKey = String(ayahRecord.surah);
    const ayahKey = String(ayahRecord.hafsAyah);
    const output = {};

    if (ayahRecord.internal.size > 0) {
      const sequences = splitSequencesByAyah.get(buildAyahKey(ayahRecord.surah, ayahRecord.hafsAyah)) || [];
      const orderedInternal = topologicallyOrderInternalWords(
        Array.from(ayahRecord.internal.values()),
        sequences
      );

      output.internal = orderedInternal.map(record => {
        const countedBy = orderedSystemIds.filter(systemId => record.counted_by.has(systemId));

        if (countedBy.includes('kufi')) {
          throw new Error(`Internal boundary ${ayahRecord.surah}:${ayahRecord.hafsAyah}:${record.word} cannot be counted by kufi`);
        }

        return {
          word: record.word,
          counted_by: countedBy
        };
      });
    }

    if (ayahRecord.end) {
      const countedBy = orderedSystemIds.filter(systemId => {
        if (systemId === 'kufi') {
          return true;
        }

        return !ayahRecord.end.omitted_by.has(systemId);
      });

      if (!countedBy.includes('kufi')) {
        throw new Error(`End boundary ${ayahRecord.surah}:${ayahRecord.hafsAyah} must be counted by kufi`);
      }

      output.end = {
        word: ayahRecord.end.word,
        counted_by: countedBy
      };
    }

    if (Object.keys(output).length === 0) {
      continue;
    }

    if (!surahs[surahKey]) {
      surahs[surahKey] = {};
    }

    surahs[surahKey][ayahKey] = output;
  }

  return {
    _description: BOOK_BOUNDARY_PRIMITIVES_DESCRIPTION,
    _reference_system: 'kufi',
    _counting_system_order: orderedSystemIds,
    surahs
  };
}

export function expandBookBoundaryPrimitivesToDifferences(primitivesDocument, options = {}) {
  const orderedSystemIds = primitivesDocument._counting_system_order;
  const systemBlocks = new Map(
    orderedSystemIds
      .filter(systemId => systemId !== 'kufi')
      .map(systemId => [systemId, {
        counting_system: systemId,
        items: []
      }])
  );

  for (const surahKey of sortNumericKeysAscending(primitivesDocument.surahs)) {
    const surah = Number.parseInt(surahKey, 10);
    const ayahs = primitivesDocument.surahs[surahKey];

    for (const ayahKey of sortNumericKeysAscending(ayahs)) {
      const hafsAyah = Number.parseInt(ayahKey, 10);
      const primitive = ayahs[ayahKey];

      for (const internalPoint of primitive.internal || []) {
        const countedBy = new Set(internalPoint.counted_by);
        if (countedBy.has('kufi')) {
          throw new Error(`Internal boundary ${surah}:${hafsAyah}:${internalPoint.word} cannot include kufi in counted_by`);
        }

        for (const systemId of orderedSystemIds) {
          if (systemId === 'kufi' || !countedBy.has(systemId)) {
            continue;
          }

          systemBlocks.get(systemId).items.push({
            surah,
            hafs_ayah: hafsAyah,
            word: internalPoint.word,
            type: 'split'
          });
        }
      }

      if (primitive.end) {
        const countedBy = new Set(primitive.end.counted_by);
        if (!countedBy.has('kufi')) {
          throw new Error(`End boundary ${surah}:${hafsAyah} must include kufi in counted_by`);
        }

        for (const systemId of orderedSystemIds) {
          if (systemId === 'kufi' || countedBy.has(systemId)) {
            continue;
          }

          systemBlocks.get(systemId).items.push({
            surah,
            hafs_ayah: hafsAyah,
            word: primitive.end.word,
            type: 'merge'
          });
        }
      }
    }
  }

  return {
    _version: options.version ?? primitivesDocument._version,
    _description: DIFFERENCES_COMPATIBILITY_DESCRIPTION,
    _reference_system: 'kufi',
    _generated_from: 'book-boundary-primitives.json',
    differences: Array.from(systemBlocks.values())
  };
}
