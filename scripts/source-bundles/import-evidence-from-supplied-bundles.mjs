/**
 * Optional curator utility for importing evidence from external structured book
 * bundles or the checked-in source witnesses under sources/.
 *
 * Supported inputs:
 * - sources/al_bayan (default) or an al-Bayan zip/extracted directory
 * - sources/nafais (default) or a القاضي zip/extracted directory
 *
 * Default mode is dry-run. Pass --apply to rewrite data/book-boundary-evidence.json.
 *
 * Usage examples:
 *   node scripts/source-bundles/import-evidence-from-supplied-bundles.mjs
 *
 *   node scripts/source-bundles/import-evidence-from-supplied-bundles.mjs \
 *     --apply \
 *     --report /tmp/source-bundle-report.json
 */

import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'fs';
import { execFileSync } from 'child_process';
import { join } from 'path';
import { tmpdir } from 'os';
import { normalizeBookBoundaryEvidenceDocument } from '../lib/book-evidence-utils.mjs';
import { normalizeBookBoundaryPrimitivesDocument } from '../lib/book-primitives-utils.mjs';
import { repoDir, sourcePath } from '../lib/repo-paths.mjs';
import {
  AL_BAYAN_EDITION,
  AL_BAYAN_WORK,
  anchorKey,
  buildAlBayanLocator,
  buildAlBayanPrimaryNote,
  buildDefaultCheckedInAlBayanDir,
  buildPhraseVariantSet,
  buildTokenVariants,
  findPrimitivePointEntries,
  findSingleContentDir,
  loadAlBayanBundle,
  normalizeArabicToken,
  resolveAlBayanMatch,
  shellQuote,
  sortSystems
} from '../lib/al-bayan-source-utils.mjs';

const FARAID_WORK = 'الفرائد الحسان في عدّ آي القرآن';
const NAFAIS_WORK = 'نفائس البيان — شرح الفرائد الحسان';

const OPENING_POEM_SEGMENT_ID = 'nfb.baqarah.poem.openings';
const OPENING_COMMENTARY_SEGMENT_ID = 'nfb.baqarah.commentary.openings';
const MANUAL_NAFAIS_SEGMENT_OVERRIDES = {
  '1:1:end:الرحيم': 'nfb.fatiha.commentary',
  '3:1:end:الم': OPENING_COMMENTARY_SEGMENT_ID,
  '7:1:end:المص': OPENING_COMMENTARY_SEGMENT_ID,
  '19:1:end:كهيعص': OPENING_COMMENTARY_SEGMENT_ID,
  '20:1:end:طه': OPENING_COMMENTARY_SEGMENT_ID,
  '22:78:internal:المسلمين': 'nfb.hajj.technical_note.muslimin_makki_dispute',
  '26:1:end:طسم': OPENING_COMMENTARY_SEGMENT_ID,
  '6:73:internal:فيكون': 'nfb.anam.commentary.biwakil_mustaqim_fayakun',
  '20:39:internal:مني': 'nfb.taha.commentary.kathiran_minni',
  '20:77:internal:موسى': 'nfb.taha.commentary.fi_al_yam_tahzan_israil_madyan_musa',
  '20:88:internal:موسى': 'nfb.taha.commentary.ilahu_musa_fanasiya'
};
const MANUAL_FARAID_SEGMENT_OVERRIDES = {
  '1:1:end:الرحيم': 'nfb.fatiha.poem',
  '1:7:internal:عليهم': 'nfb.fatiha.poem',
  '3:1:end:الم': OPENING_POEM_SEGMENT_ID,
  '7:1:end:المص': OPENING_POEM_SEGMENT_ID,
  '7:29:end:تعودون': 'nfb.anam_araf.poem.fayakun_din_taudun',
  '7:29:internal:الدين': 'nfb.anam_araf.poem.fayakun_din_taudun',
  '8:62:end:وبالمؤمنين': 'nfb.anfal_tawbah.poem.bilmuminin_mushrikin_thani',
  '9:3:internal:المشركين': 'nfb.anfal_tawbah.poem.bilmuminin_mushrikin_thani',
  '19:1:end:كهيعص': OPENING_POEM_SEGMENT_ID,
  '20:1:end:طه': OPENING_POEM_SEGMENT_ID,
  '20:39:internal:مني': 'nfb.taha.poem.kathiran_minni',
  '20:77:internal:موسى': 'nfb.taha.poem.fi_al_yam_tahzan_israil_madyan_musa',
  '20:88:internal:موسى': 'nfb.taha.poem.ilahu_musa_fanasiya',
  '21:66:end:يضركم': 'nfb.anbiya_hajj.poem.yadurrukum_hamim_thamud_lut_muslimin',
  '22:19:end:الحميم': 'nfb.anbiya_hajj.poem.yadurrukum_hamim_thamud_lut_muslimin',
  '22:20:end:والجلود': 'nfb.anbiya_hajj.poem.yadurrukum_hamim_thamud_lut_muslimin',
  '22:42:end:وثمود': 'nfb.anbiya_hajj.poem.yadurrukum_hamim_thamud_lut_muslimin',
  '22:43:end:لوط': 'nfb.anbiya_hajj.poem.yadurrukum_hamim_thamud_lut_muslimin',
  '22:78:internal:المسلمين': 'nfb.anbiya_hajj.poem.yadurrukum_hamim_thamud_lut_muslimin',
  '23:45:internal:هارون': 'nfb.muminun_nur.poem.harun_asal_absar',
  '24:36:end:والآصال': 'nfb.muminun_nur.poem.harun_asal_absar',
  '24:43:end:بالأبصار': 'nfb.muminun_nur.poem.harun_asal_absar',
  '26:1:end:طسم': OPENING_POEM_SEGMENT_ID
};

const STATUS_AND_NOTE_OVERRIDES = {
  '3:92:internal:تحبون': {
    verification_status: 'disputed',
    note: 'شرح نفائس البيان يثبت هذا الموضع للمكي والدمشقي وشيبة، وهو ما يوافق طبقة المدني الأخير في المشروع، بينما ملف البيان المورّد يشفّر هذا الموضع مع ملاحظة انقسام داخلي في النقل المدني هنا. يحتاج تحويل هذا النقل إلى إحدى طبقتي المدني في المشروع إلى مراجعة أولية أدق.'
  },
  '3:97:internal:إبراهيم': {
    verification_status: 'secondary_only',
    note: 'شرح نفائس البيان يثبت مقام إبراهيم للشامي وأبي جعفر، وهو ما يوافق دعوى المشروع. لم يقدّم ملف البيان المورّد في هذه الدفعة مدخلا أوليا مطابقا لهذا الموضع بعد.'
  },
  '6:73:internal:فيكون': {
    verification_status: 'disputed',
    note: 'شرح نفائس البيان يثبت {فيكون} لغير الكوفي، بينما نص البيان المورّد في هذه الدفعة يذكر بعد {كن فيكون} الموضع الثاني من {إلى صراط مستقيم} مع {دينا قيما}. هذا التعارض ما يزال مفتوحا ويحتاج مراجعة مباشرة على الشاهد الأولي.'
  },
  '22:78:internal:المسلمين': {
    verification_status: 'secondary_only',
    note: 'الشرح يذكر خلافا منقولا عن المكي في {المسلمين} ثم يرجح العد، معللا بأن الداني جزم به في البيان. ما زال الموضع بحاجة إلى إدخال شاهد أولي مباشر عند توفره.'
  }
};
const NAFAIS_SURAH_SLUG_MAP = {
  fatiha: 1,
  hamd: 1,
  baqarah: 2,
  al_imran: 3,
  nisa: 4,
  maidah: 5,
  anam: 6,
  araf: 7,
  anfal: 8,
  tawbah: 9,
  yunus: 10,
  hud: 11,
  rad: 13,
  ibrahim: 14,
  isra: 17,
  kahf: 18,
  maryam: 19,
  taha: 20,
  anbiya: 21,
  hajj: 22,
  muminun: 23,
  nur: 24,
  shuara: 26
};

function parseArgs(argv) {
  const result = {
    alBayanPath: existsSync(buildDefaultCheckedInAlBayanDir(repoDir)) ? buildDefaultCheckedInAlBayanDir(repoDir) : null,
    nafaisPath: existsSync(join(repoDir, 'sources', 'nafais')) ? join(repoDir, 'sources', 'nafais') : null,
    apply: false,
    reportPath: null
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (value === '--al-bayan') {
      result.alBayanPath = argv[index + 1] || null;
      index += 1;
      continue;
    }

    if (value === '--nafais') {
      result.nafaisPath = argv[index + 1] || null;
      index += 1;
      continue;
    }

    if (value === '--report') {
      result.reportPath = argv[index + 1] || null;
      index += 1;
      continue;
    }

    if (value === '--apply') {
      result.apply = true;
      continue;
    }

    if (value === '--help' || value === '-h') {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${value}`);
  }

  return result;
}

function printHelp() {
  console.log(`\nUsage:\n  node scripts/source-bundles/import-evidence-from-supplied-bundles.mjs \\
    --al-bayan <zip-or-dir> \\
    --nafais <zip-or-dir> [--apply] [--report <json-path>]\n`);
}

function withPreparedInput(inputPath, label, callback) {
  if (!inputPath) {
    return callback(null);
  }

  if (!existsSync(inputPath)) {
    throw new Error(`${label}: path does not exist: ${inputPath}`);
  }

  if (!inputPath.endsWith('.zip')) {
    return callback(inputPath);
  }

  const temporaryRoot = mkdtempSync(join(tmpdir(), `${label}-`));

  try {
    execFileSync('unzip', ['-q', inputPath, '-d', temporaryRoot], { stdio: 'inherit' });
    const resolvedDir = findSingleContentDir(temporaryRoot) || temporaryRoot;
    return callback(resolvedDir);
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
}







function ensurePoint(record, kind, word) {
  if (kind === 'end') {
    if (!record.end || record.end.word !== word) {
      throw new Error(`Could not resolve end evidence point for word ${word}`);
    }

    return record.end;
  }

  const point = (record.internal || []).find(item => item.word === word);
  if (!point) {
    throw new Error(`Could not resolve internal evidence point for word ${word}`);
  }

  return point;
}

function addEvidenceItem(point, item) {
  const alreadyPresent = (point.evidence || []).some(existing => {
    return existing.tier === item.tier
      && existing.work === item.work
      && (existing.edition || null) === (item.edition || null)
      && existing.locator === item.locator
      && existing.strength === item.strength
      && JSON.stringify(existing.supports) === JSON.stringify(item.supports)
      && (existing.note || null) === (item.note || null);
  });

  if (alreadyPresent) {
    return false;
  }

  point.evidence.push(item);
  return true;
}

function extractEvidenceSegmentIds(point) {
  return (point.evidence || [])
    .map(item => {
      const match = /^مقطع\s+([^\s]+)$/.exec(item.note || '');
      return match ? match[1] : null;
    })
    .filter(Boolean);
}

function deriveCompanionPoemSegmentId(segmentId, nafaisById) {
  const candidate = segmentId.replace('.commentary.', '.poem.');

  if (candidate !== segmentId && nafaisById.has(candidate)) {
    return candidate;
  }

  return null;
}

function buildPageLocator(segment) {
  return segment.book_pages.length === 1
    ? `ص ${segment.book_pages[0]}`
    : `ص ${segment.book_pages[0]}-${segment.book_pages[segment.book_pages.length - 1]}`;
}


function setMinimumVerificationStatus(point, nextStatus) {
  if (point.verification_status === 'uncited') {
    point.verification_status = nextStatus;
    return;
  }

  if (point.verification_status === 'secondary_only' && nextStatus === 'primary_cited') {
    point.verification_status = nextStatus;
  }
}

function loadCanonicalDocuments() {
  const packageJson = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
  const countingSystems = JSON.parse(readFileSync(sourcePath('counting-systems.json'), 'utf-8'));
  const primitives = JSON.parse(readFileSync(sourcePath('book-boundary-primitives.json'), 'utf-8'));
  const evidence = JSON.parse(readFileSync(sourcePath('book-boundary-evidence.json'), 'utf-8'));

  const normalizedPrimitives = normalizeBookBoundaryPrimitivesDocument(primitives, countingSystems, packageJson.version);
  const normalizedEvidence = normalizeBookBoundaryEvidenceDocument(evidence, normalizedPrimitives, countingSystems, packageJson.version);

  return {
    version: packageJson.version,
    countingSystems,
    primitives: normalizedPrimitives,
    evidence: normalizedEvidence
  };
}


function loadNafaisSegments(bundleDir) {
  if (!bundleDir) {
    return [];
  }

  const filePath = execFileSync('bash', ['-lc', `find ${shellQuote(bundleDir)} -type f -name 'phase1_translation_cumulative_01_17.json' | head -n 1`], {
    encoding: 'utf-8'
  }).trim();

  if (!filePath) {
    throw new Error('Could not locate phase1_translation_cumulative_01_17.json in the supplied Nafa\'is bundle');
  }

  return JSON.parse(readFileSync(filePath, 'utf-8')).segments;
}

function buildNafaisSegmentsBySurah(segments) {
  const bySurah = new Map();
  const byId = new Map();

  for (const segment of segments) {
    byId.set(segment.id, segment);

    const surahNumbers = new Set();

    for (const [slug, surahNumber] of Object.entries(NAFAIS_SURAH_SLUG_MAP)) {
      if (segment.id.includes(slug)) {
        surahNumbers.add(surahNumber);
      }
    }

    for (const surahNumber of surahNumbers) {
      if (!bySurah.has(surahNumber)) {
        bySurah.set(surahNumber, []);
      }

      bySurah.get(surahNumber).push(segment);
    }
  }

  return { bySurah, byId };
}


function importAlBayanPrimaryEvidence({ primitives, evidence, alBayanBySurah }) {
  const exactMatches = [];
  const conflicts = [];
  const missing = [];
  const coveredSurahs = Array.from(alBayanBySurah.keys()).map(Number).sort((left, right) => left - right);

  for (const point of findPrimitivePointEntries(primitives, coveredSurahs)) {
    const surahKey = String(point.surah);
    const sourceBundleRecord = alBayanBySurah.get(point.surah);
    const evidencePoint = ensurePoint(evidence.surahs[surahKey][String(point.hafsAyah)], point.kind, point.word);
    const match = resolveAlBayanMatch(point, sourceBundleRecord);

    if (match.status === 'exact_primary_match') {
      const { item } = match.exactItems[0];
      addEvidenceItem(evidencePoint, {
        tier: 'primary',
        work: AL_BAYAN_WORK,
        edition: AL_BAYAN_EDITION,
        locator: buildAlBayanLocator(sourceBundleRecord.document.structured_data),
        supports: point.countedBy,
        strength: 'direct',
        note: buildAlBayanPrimaryNote(item, sourceBundleRecord.fileName)
      });
      setMinimumVerificationStatus(evidencePoint, 'primary_cited');

      exactMatches.push({
        anchorKey: anchorKey(point),
        phrase_ar: item.phrase_ar,
        file: sourceBundleRecord.fileName
      });
      continue;
    }

    if (match.status === 'counted_by_mismatch') {
      conflicts.push({
        anchorKey: anchorKey(point),
        candidates: match.overlappingItems.map(({ item, sourceCountedBy }) => ({
          phrase_ar: item.phrase_ar,
          source_counted_by: sourceCountedBy,
          occurrence_qualifier_en: item.occurrence_qualifier_en || null,
          school_level_note_en: item.school_level_note_en || null,
          cross_surah_note_en: item.cross_surah_note_en || null,
          file: sourceBundleRecord.fileName
        }))
      });
      continue;
    }

    missing.push({
      anchorKey: anchorKey(point),
      file: sourceBundleRecord?.fileName || null,
      reason: match.status
    });
  }

  return {
    coveredSurahs,
    exactMatches,
    conflicts,
    missing
  };
}

function importNafaisCommentaryEvidence({ primitives, evidence, nafaisBySurah, nafaisById }) {
  const applied = [];
  const ambiguous = [];
  const missing = [];

  for (const point of findPrimitivePointEntries(primitives)) {
    const anchor = anchorKey(point);
    const manualSegmentId = MANUAL_NAFAIS_SEGMENT_OVERRIDES[anchor] || null;
    let chosenSegment = manualSegmentId ? nafaisById.get(manualSegmentId) || null : null;

    if (!chosenSegment) {
      const candidateSegments = (nafaisBySurah.get(point.surah) || []).filter(segment => {
        if (!['commentary', 'technical_note'].includes(segment.kind)) {
          return false;
        }

        const tokens = normalizeArabicToken(`${segment.source_ar} ${segment.translation_en}`).split(' ');
        return Array.from(buildTokenVariants(point.word)).some(variant => tokens.includes(variant));
      });

      const commentaryCandidates = candidateSegments.filter(segment => segment.kind === 'commentary');

      if (commentaryCandidates.length === 1) {
        chosenSegment = commentaryCandidates[0];
      } else if (commentaryCandidates.length > 1) {
        ambiguous.push({
          anchorKey: anchor,
          candidate_segment_ids: commentaryCandidates.map(segment => segment.id)
        });
        continue;
      } else if (candidateSegments.length === 1) {
        chosenSegment = candidateSegments[0];
      } else if (candidateSegments.length > 1) {
        ambiguous.push({
          anchorKey: anchor,
          candidate_segment_ids: candidateSegments.map(segment => segment.id)
        });
        continue;
      }
    }

    if (!chosenSegment) {
      missing.push({
        anchorKey: anchor,
        reason: 'no_commentary_match'
      });
      continue;
    }

    const evidencePoint = ensurePoint(
      evidence.surahs[String(point.surah)][String(point.hafsAyah)],
      point.kind,
      point.word
    );
    const locator = buildPageLocator(chosenSegment);

    addEvidenceItem(evidencePoint, {
      tier: 'commentary',
      work: NAFAIS_WORK,
      locator,
      supports: point.countedBy,
      strength: 'direct',
      note: `مقطع ${chosenSegment.id}`
    });

    if (evidencePoint.verification_status === 'uncited') {
      evidencePoint.verification_status = 'secondary_only';
    }

    applied.push({
      anchorKey: anchor,
      segment_id: chosenSegment.id,
      kind: chosenSegment.kind
    });
  }

  for (const [anchor, override] of Object.entries(STATUS_AND_NOTE_OVERRIDES)) {
    const [surah, ayah, kind, word] = anchor.split(':');
    const point = ensurePoint(evidence.surahs[surah][ayah], kind, word);
    point.verification_status = override.verification_status;
    point.note = override.note;
  }

  return {
    applied,
    ambiguous,
    missing
  };
}

function importFaraidPoemEvidence({ primitives, evidence, nafaisBySurah, nafaisById }) {
  const applied = [];
  const ambiguous = [];
  const missing = [];

  for (const point of findPrimitivePointEntries(primitives, Array.from({ length: 26 }, (_, index) => index + 1))) {
    const anchor = anchorKey(point);
    const evidencePoint = ensurePoint(
      evidence.surahs[String(point.surah)][String(point.hafsAyah)],
      point.kind,
      point.word
    );

    const manualSegmentId = MANUAL_FARAID_SEGMENT_OVERRIDES[anchor] || null;
    let chosenSegment = manualSegmentId ? nafaisById.get(manualSegmentId) || null : null;
    let selectionStrategy = manualSegmentId ? 'manual_override' : null;

    if (!chosenSegment) {
      for (const segmentId of extractEvidenceSegmentIds(evidencePoint)) {
        const companionPoemId = deriveCompanionPoemSegmentId(segmentId, nafaisById);

        if (!companionPoemId) {
          continue;
        }

        chosenSegment = nafaisById.get(companionPoemId) || null;
        selectionStrategy = chosenSegment ? `paired_with:${segmentId}` : null;

        if (chosenSegment) {
          break;
        }
      }
    }

    if (!chosenSegment) {
      const candidateSegments = (nafaisBySurah.get(point.surah) || []).filter(segment => {
        if (segment.kind !== 'poem') {
          return false;
        }

        const tokens = normalizeArabicToken(`${segment.source_ar} ${segment.translation_en}`).split(' ');
        return Array.from(buildTokenVariants(point.word)).some(variant => tokens.includes(variant));
      });

      if (candidateSegments.length === 1) {
        chosenSegment = candidateSegments[0];
        selectionStrategy = 'token_match';
      } else if (candidateSegments.length > 1) {
        ambiguous.push({
          anchorKey: anchor,
          candidate_segment_ids: candidateSegments.map(segment => segment.id)
        });
        continue;
      }
    }

    if (!chosenSegment) {
      missing.push({
        anchorKey: anchor,
        reason: 'no_poem_match'
      });
      continue;
    }

    addEvidenceItem(evidencePoint, {
      tier: 'secondary',
      work: FARAID_WORK,
      locator: buildPageLocator(chosenSegment),
      supports: point.countedBy,
      strength: 'direct',
      note: `مقطع ${chosenSegment.id}`
    });

    if (evidencePoint.verification_status === 'uncited') {
      evidencePoint.verification_status = 'secondary_only';
    }

    applied.push({
      anchorKey: anchor,
      segment_id: chosenSegment.id,
      selection_strategy: selectionStrategy || 'unknown'
    });
  }

  return {
    applied,
    ambiguous,
    missing
  };
}



function collectVerificationSummary(evidence) {
  const counts = new Map();

  for (const ayahs of Object.values(evidence.surahs)) {
    for (const record of Object.values(ayahs)) {
      if (record.end) {
        counts.set(record.end.verification_status, (counts.get(record.end.verification_status) || 0) + 1);
      }

      for (const point of record.internal || []) {
        counts.set(point.verification_status, (counts.get(point.verification_status) || 0) + 1);
      }
    }
  }

  return Object.fromEntries(Array.from(counts.entries()).sort((left, right) => left[0].localeCompare(right[0])));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { primitives, evidence, countingSystems, version } = loadCanonicalDocuments();
  const report = {
    imported_at: new Date().toISOString(),
    dry_run: !args.apply,
    sources: {},
    primary_import: null,
    commentary_import: null,
    faraid_poem_import: null,
    verification_summary_before: collectVerificationSummary(evidence),
    verification_summary_after: null
  };

  withPreparedInput(args.alBayanPath, 'al-bayan', alBayanDir => {
    withPreparedInput(args.nafaisPath, 'nafais', nafaisDir => {
      const alBayanBySurah = loadAlBayanBundle(alBayanDir);
      const nafaisSegments = loadNafaisSegments(nafaisDir);
      const { bySurah: nafaisBySurah, byId: nafaisById } = buildNafaisSegmentsBySurah(nafaisSegments);

      report.sources = {
        al_bayan: alBayanDir ? { input: args.alBayanPath, resolved: alBayanDir, covered_surahs: Array.from(alBayanBySurah.keys()).map(Number).sort((left, right) => left - right) } : null,
        nafais: nafaisDir ? { input: args.nafaisPath, resolved: nafaisDir, segment_count: nafaisSegments.length } : null
      };

      if (alBayanDir) {
        report.primary_import = importAlBayanPrimaryEvidence({
          primitives,
          evidence,
          alBayanBySurah
        });
      }

      if (nafaisDir) {
        report.commentary_import = importNafaisCommentaryEvidence({
          primitives,
          evidence,
          nafaisBySurah,
          nafaisById
        });
        report.faraid_poem_import = importFaraidPoemEvidence({
          primitives,
          evidence,
          nafaisBySurah,
          nafaisById
        });
      }

      const normalizedEvidence = normalizeBookBoundaryEvidenceDocument(evidence, primitives, countingSystems, version);
      report.verification_summary_after = collectVerificationSummary(normalizedEvidence);

      if (args.apply) {
        writeFileSync(sourcePath('book-boundary-evidence.json'), JSON.stringify(normalizedEvidence, null, 2) + '\n');
        console.log('Applied updates to data/book-boundary-evidence.json');
      } else {
        console.log('Dry run only. Pass --apply to rewrite data/book-boundary-evidence.json');
      }

      if (args.reportPath) {
        writeFileSync(args.reportPath, JSON.stringify(report, null, 2) + '\n');
        console.log(`Wrote report: ${args.reportPath}`);
      }

      console.log(JSON.stringify({
        primary_exact_matches: report.primary_import?.exactMatches.length || 0,
        primary_conflicts: report.primary_import?.conflicts.length || 0,
        primary_missing: report.primary_import?.missing.length || 0,
        commentary_applied: report.commentary_import?.applied.length || 0,
        commentary_ambiguous: report.commentary_import?.ambiguous.length || 0,
        commentary_missing: report.commentary_import?.missing.length || 0,
        faraid_poem_applied: report.faraid_poem_import?.applied.length || 0,
        faraid_poem_ambiguous: report.faraid_poem_import?.ambiguous.length || 0,
        faraid_poem_missing: report.faraid_poem_import?.missing.length || 0,
        verification_summary_after: report.verification_summary_after
      }, null, 2));
    });
  });
}

main();
