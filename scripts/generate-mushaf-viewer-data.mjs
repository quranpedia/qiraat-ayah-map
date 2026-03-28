import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { repoDir } from './lib/repo-paths.mjs';

const siteDataPath = join(repoDir, 'site', 'src', 'lib', 'data', 'generated', 'site-data.json');
const plainPath = join(repoDir, 'sources', 'mushaf-text', 'quran-plain.txt');
const uthmaniPath = join(repoDir, 'sources', 'mushaf-text', 'quran-uthmani.txt');
const targetDir = join(repoDir, 'site', 'public', 'generated', 'mushaf');

const UTHMANI_BASMALA = 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ';

// Internal duplicates default to the first occurrence. End duplicates default to the last
// occurrence. Only points that need a non-default internal occurrence are overridden here.
const DUPLICATE_OCCURRENCE_OVERRIDES = {
  '7:38:internal:النار': 2
};

const ORTHOGRAPHY_TRANSLATION = new Map([
  ['ٱ', 'ا'],
  ['أ', 'ا'],
  ['إ', 'ا'],
  ['آ', 'ا'],
  ['ى', 'ي'],
  ['ی', 'ي'],
  ['ؤ', 'و'],
  ['ئ', 'ي'],
  ['ة', 'ه'],
  ['ک', 'ك'],
  ['ھ', 'ه'],
  ['ہ', 'ه'],
  ['ے', 'ي'],
  ['ۃ', 'ه'],
  ['ٓ', ''],
  ['ٔ', ''],
  ['ٕ', ''],
  ['ۤ', ''],
  ['ۣ', ''],
  ['ۢ', ''],
  ['ۥ', ''],
  ['ۦ', ''],
  ['ۧ', ''],
  ['ۨ', ''],
  ['ٰ', ''],
  ['ـ', ''],
  ['۞', '']
]);

const DROPPED_PUNCTUATION = new Set(['ۛ', 'ۚ', 'ۖ', 'ۗ', 'ۘ', 'ۙ', 'ۜ', '۝', '،', '؛', '؟', '.', ',', '!', ':', '"', '(', ')', '[', ']', '{', '}']);

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

function padSurahNumber(surah) {
  return String(surah).padStart(3, '0');
}

function tokenize(text) {
  return text.trim().split(/ +/).filter(Boolean);
}

function normalizeArabicForSearch(text) {
  const translatedText = Array.from(text, character => {
    return ORTHOGRAPHY_TRANSLATION.has(character)
      ? ORTHOGRAPHY_TRANSLATION.get(character)
      : character;
  }).join('');

  const normalizedCharacters = [];

  for (const character of translatedText) {
    if (DROPPED_PUNCTUATION.has(character)) {
      continue;
    }

    if (/\p{Mark}/u.test(character)) {
      continue;
    }

    if (/\p{Format}/u.test(character)) {
      continue;
    }

    if (/\p{Separator}/u.test(character) && character !== ' ') {
      continue;
    }

    normalizedCharacters.push(character);
  }

  return normalizedCharacters.join('').replace(/\s+/g, ' ').trim();
}

function levenshteinDistance(left, right) {
  if (left === right) {
    return 0;
  }

  if (left.length === 0) {
    return right.length;
  }

  if (right.length === 0) {
    return left.length;
  }

  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      current.push(
        Math.min(
          previous[rightIndex] + 1,
          current[rightIndex - 1] + 1,
          previous[rightIndex - 1] + substitutionCost
        )
      );
    }

    previous = current;
  }

  return previous[right.length];
}

function splitUthmaniPrefix(surah, ayah, text) {
  if (surah <= 1 || surah === 9 || ayah !== 1) {
    return {
      uthmani_prefix: null,
      uthmani_text: text
    };
  }

  const prefixWithSpace = `${UTHMANI_BASMALA} `;

  if (text.startsWith(prefixWithSpace)) {
    return {
      uthmani_prefix: UTHMANI_BASMALA,
      uthmani_text: text.slice(prefixWithSpace.length)
    };
  }

  return {
    uthmani_prefix: null,
    uthmani_text: text
  };
}

function getOccurrenceIndex(anchorKey, kind, candidateIndexes) {
  const explicitOverride = DUPLICATE_OCCURRENCE_OVERRIDES[anchorKey];
  if (explicitOverride) {
    return explicitOverride;
  }

  if (candidateIndexes.length <= 1) {
    return 1;
  }

  if (kind === 'end') {
    return candidateIndexes.length;
  }

  return 1;
}

function resolveTokenIndex(tokens, targetWord, desiredOccurrenceIndex, desiredTokenIndex) {
  const exactMatches = [];

  tokens.forEach((token, index) => {
    if (token.normalized === targetWord) {
      exactMatches.push(index + 1);
    }
  });

  if (exactMatches.length > 0) {
    return {
      after_token: exactMatches[Math.min(desiredOccurrenceIndex - 1, exactMatches.length - 1)],
      resolution: 'exact'
    };
  }

  const approximateCandidates = [];

  tokens.forEach((token, index) => {
    const distance = levenshteinDistance(token.normalized, targetWord);
    const maxLength = Math.max(token.normalized.length, targetWord.length);
    const isApproximateMatch =
      distance <= 2 ||
      (maxLength >= 6 && distance <= 3) ||
      token.normalized.includes(targetWord) ||
      targetWord.includes(token.normalized);

    if (isApproximateMatch) {
      approximateCandidates.push({
        distance,
        proximity: Math.abs(index + 1 - desiredTokenIndex),
        after_token: index + 1
      });
    }
  });

  approximateCandidates.sort((left, right) => {
    return left.distance - right.distance || left.proximity - right.proximity || left.after_token - right.after_token;
  });

  if (approximateCandidates.length > 0) {
    return {
      after_token: approximateCandidates[0].after_token,
      resolution: 'approximate'
    };
  }

  return null;
}

if (!existsSync(siteDataPath)) {
  throw new Error(`Missing generated site data at ${siteDataPath}. Run the main generate pipeline first.`);
}

if (!existsSync(plainPath) || !existsSync(uthmaniPath)) {
  throw new Error(`Missing mushaf source text under ${join(repoDir, 'sources', 'mushaf-text')}.`);
}

const siteData = readJson(siteDataPath);
const plainLines = readFileSync(plainPath, 'utf-8').trim().split(/\r?\n/);
const uthmaniLines = readFileSync(uthmaniPath, 'utf-8').trim().split(/\r?\n/);
const kufiCounts = siteData.surahs.map(surah => surah.counts.kufi);
const kufiTotal = kufiCounts.reduce((sum, value) => sum + value, 0);

if (plainLines.length !== kufiTotal || uthmaniLines.length !== kufiTotal) {
  throw new Error(`Attached mushaf line counts do not match the Kufi total (${kufiTotal}).`);
}

const kufiOffsetsBySurah = new Map();
let runningOffset = 0;
for (const surahData of siteData.surahs) {
  kufiOffsetsBySurah.set(surahData.surah, runningOffset);
  runningOffset += surahData.counts.kufi;
}

const rowsBySurah = new Map(siteData.surahs.map(surahData => [surahData.surah, []]));
for (const row of siteData.rows) {
  rowsBySurah.get(row.surah)?.push(row);
}

mkdirSync(targetDir, { recursive: true });

for (const surahData of siteData.surahs) {
  const surah = surahData.surah;
  const kufiAyahCount = surahData.counts.kufi;
  const startOffset = kufiOffsetsBySurah.get(surah) || 0;
  const ayahs = [];
  const ayahLookup = new Map();

  for (let ayah = 1; ayah <= kufiAyahCount; ayah += 1) {
    const lineIndex = startOffset + ayah - 1;
    const plainText = plainLines[lineIndex];
    const { uthmani_prefix, uthmani_text } = splitUthmaniPrefix(surah, ayah, uthmaniLines[lineIndex]);
    const plainTokens = tokenize(plainText);
    const uthmaniTokens = tokenize(uthmani_text);

    const record = {
      ayah,
      plain_text: plainText,
      plain_tokens: plainTokens,
      uthmani_text,
      uthmani_tokens: uthmaniTokens,
      uthmani_prefix
    };

    ayahs.push(record);
    ayahLookup.set(ayah, {
      plain_tokens: plainTokens.map(token => ({ raw: token, normalized: normalizeArabicForSearch(token) })),
      uthmani_tokens: uthmaniTokens.map(token => ({ raw: token, normalized: normalizeArabicForSearch(token) }))
    });
  }

  const boundary_positions = {};
  const surahRows = rowsBySurah.get(surah) || [];

  for (const row of surahRows) {
    const ayahTokens = ayahLookup.get(row.hafs_ayah);
    if (!ayahTokens) {
      throw new Error(`Missing ayah token data for ${row.anchor_key}.`);
    }

    const normalizedWord = normalizeArabicForSearch(row.word);
    const plainCandidateIndexes = [];
    ayahTokens.plain_tokens.forEach((token, index) => {
      if (token.normalized === normalizedWord) {
        plainCandidateIndexes.push(index + 1);
      }
    });

    if (plainCandidateIndexes.length === 0) {
      throw new Error(`Could not find ${row.word} inside the plain mushaf for ${row.anchor_key}.`);
    }

    const occurrence_index = getOccurrenceIndex(row.anchor_key, row.kind, plainCandidateIndexes);
    const plain_after_token = plainCandidateIndexes[Math.min(occurrence_index - 1, plainCandidateIndexes.length - 1)];
    const uthmaniResolution = resolveTokenIndex(ayahTokens.uthmani_tokens, normalizedWord, occurrence_index, plain_after_token);

    if (!uthmaniResolution) {
      throw new Error(`Could not place ${row.word} inside the Uthmani mushaf for ${row.anchor_key}.`);
    }

    boundary_positions[row.anchor_key] = {
      ayah: row.hafs_ayah,
      kind: row.kind,
      word: row.word,
      occurrence_index,
      plain_after_token,
      uthmani_after_token: uthmaniResolution.after_token,
      uthmani_resolution: uthmaniResolution.resolution
    };
  }

  writeJson(join(targetDir, `surah-${padSurahNumber(surah)}.json`), {
    _version: '0.1.0',
    surah,
    kufi_ayah_count: kufiAyahCount,
    ayahs,
    boundary_positions
  });
}

console.log(`  Generated: ${join('site', 'public', 'generated', 'mushaf', 'surah-###.json')}`);
