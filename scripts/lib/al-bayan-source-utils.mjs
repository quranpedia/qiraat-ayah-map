import { basename, join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { execFileSync } from 'child_process';

export const AL_BAYAN_WORK = 'البيان في عدّ آي القرآن';
export const AL_BAYAN_EDITION = 'تحقيق غانم قدوري الحمد، مركز المخطوطات والتراث، الكويت، الطبعة الأولى، 1414هـ/1994م';

export const AL_BAYAN_SYSTEM_ID_MAP = {
  madani_1: 'madani-first',
  madani_2: 'madani-last',
  makki: 'makki',
  kufi: 'kufi',
  basri: 'basri',
  shami: 'dimashqi'
};

export function shellQuote(value) {
  return `'${String(value).replace(/'/g, `"'"'`)}'`;
}

export function stripArabicDiacritics(value) {
  return String(value || '').replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '');
}

export function normalizeArabicToken(value) {
  return stripArabicDiacritics(value)
    .replaceAll('أ', 'ا')
    .replaceAll('إ', 'ا')
    .replaceAll('آ', 'ا')
    .replaceAll('ى', 'ي')
    .replaceAll('ؤ', 'و')
    .replaceAll('ئ', 'ي')
    .replaceAll('ـ', '')
    .replace(/[﴿﴾{}()\[\]«»"'\u200f\u200e،,:;؛.!?ـ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function buildTokenVariants(value) {
  const base = normalizeArabicToken(value);
  const variants = new Set([base]);
  let changed = true;

  while (changed) {
    changed = false;

    for (const token of Array.from(variants)) {
      for (const prefix of ['و', 'ف', 'ب', 'ك', 'ل']) {
        if (token.length > 1 && token.startsWith(prefix)) {
          const trimmed = token.slice(1);
          if (!variants.has(trimmed)) {
            variants.add(trimmed);
            changed = true;
          }
        }
      }

      if (token.length > 1 && token.endsWith('ا')) {
        const trimmed = token.slice(0, -1);
        if (!variants.has(trimmed)) {
          variants.add(trimmed);
          changed = true;
        }
      }
    }
  }

  return variants;
}

export function buildPhraseVariantSet(value) {
  const tokens = normalizeArabicToken(value).split(' ').filter(Boolean);
  const variants = new Set();

  for (const token of tokens) {
    for (const variant of buildTokenVariants(token)) {
      variants.add(variant);
    }
  }

  return variants;
}

export function sortSystems(values) {
  return values.slice().sort();
}

export function anchorKey(point) {
  return `${point.surah}:${point.hafsAyah}:${point.kind}:${point.word}`;
}

export function buildAlBayanLocator(structured) {
  const entryStart = structured.source_pages.entry_printed_page_start;
  const entryEnd = structured.source_pages.entry_printed_page_end;
  return entryStart === entryEnd ? `ص ${entryStart}` : `ص ${entryStart}-${entryEnd}`;
}

export function buildAlBayanPrimaryNote(item, fileName) {
  const noteParts = [`مدخل السورة في الملف ${fileName}: (${item.phrase_ar})`];

  if (item.occurrence_qualifier_en) {
    noteParts.push(item.occurrence_qualifier_en);
  }

  if (item.cross_surah_note_en) {
    noteParts.push(item.cross_surah_note_en);
  }

  return noteParts.join(' — ');
}

export function findPrimitivePointEntries(primitives, coveredSurahs = null) {
  const entries = [];
  const coveredSet = coveredSurahs ? new Set(coveredSurahs.map(Number)) : null;

  for (const [surahKey, ayahs] of Object.entries(primitives.surahs || {})) {
    const surahNumber = Number.parseInt(surahKey, 10);

    if (coveredSet && !coveredSet.has(surahNumber)) {
      continue;
    }

    for (const ayahKey of Object.keys(ayahs).sort((left, right) => Number(left) - Number(right))) {
      const record = ayahs[ayahKey];

      if (record.end) {
        entries.push({
          surah: surahNumber,
          hafsAyah: Number(ayahKey),
          kind: 'end',
          word: record.end.word,
          countedBy: record.end.counted_by
        });
      }

      for (const point of record.internal || []) {
        entries.push({
          surah: surahNumber,
          hafsAyah: Number(ayahKey),
          kind: 'internal',
          word: point.word,
          countedBy: point.counted_by
        });
      }
    }
  }

  return entries;
}

export function loadAlBayanBundle(bundleDir) {
  if (!bundleDir || !existsSync(bundleDir)) {
    return new Map();
  }

  const filePaths = execFileSync('bash', ['-lc', `find ${shellQuote(bundleDir)} -type f -name 'al_bayan_*surah_*.json' | sort`], {
    encoding: 'utf-8'
  })
    .trim()
    .split('\n')
    .map(value => value.trim())
    .filter(Boolean);

  const bySurah = new Map();

  for (const filePath of filePaths) {
    const document = JSON.parse(readFileSync(filePath, 'utf-8'));
    const surahNumber = Number(document.structured_data.surah_number);
    bySurah.set(surahNumber, {
      filePath,
      fileName: basename(filePath),
      document
    });
  }

  return bySurah;
}

export function findSingleContentDir(rootDir) {
  const candidates = execFileSync('bash', ['-lc', `find ${shellQuote(rootDir)} -mindepth 1 -maxdepth 1 -type d`], {
    encoding: 'utf-8'
  })
    .trim()
    .split('\n')
    .map(value => value.trim())
    .filter(Boolean);

  return candidates.length === 1 ? candidates[0] : null;
}

export function buildDefaultCheckedInAlBayanDir(repoDir) {
  return join(repoDir, 'sources', 'al_bayan');
}

export function resolveAlBayanMatch(point, sourceBundleRecord) {
  if (!sourceBundleRecord) {
    return {
      status: 'missing_source_surah',
      overlappingItems: [],
      exactItems: []
    };
  }

  const disagreements = sourceBundleRecord.document.structured_data.disputed_verse_endings || [];
  const pointWordVariants = buildTokenVariants(point.word);
  const overlappingItems = [];
  const exactItems = [];

  for (const item of disagreements) {
    const sourceCountedBy = (item.counted_by || []).map(systemId => AL_BAYAN_SYSTEM_ID_MAP[systemId]);
    const phraseVariants = buildPhraseVariantSet(item.phrase_ar || '');
    const overlaps = Array.from(pointWordVariants).some(variant => phraseVariants.has(variant));

    if (!overlaps) {
      continue;
    }

    const comparison = {
      item,
      sourceCountedBy
    };
    overlappingItems.push(comparison);

    if (JSON.stringify(sortSystems(sourceCountedBy)) === JSON.stringify(sortSystems(point.countedBy))) {
      exactItems.push(comparison);
    }
  }

  if (exactItems.length === 1) {
    return {
      status: 'exact_primary_match',
      exactItems,
      overlappingItems
    };
  }

  if (overlappingItems.length > 0) {
    return {
      status: 'counted_by_mismatch',
      exactItems,
      overlappingItems
    };
  }

  return {
    status: 'no_exact_primary_match',
    exactItems,
    overlappingItems
  };
}
