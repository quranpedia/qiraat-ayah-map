export const BOOK_BOUNDARY_EVIDENCE_DESCRIPTION = 'Canonical scholar-facing evidence sidecar for book-boundary-primitives.json. Each record tracks the citation and review state of one disputed ayah-boundary claim.';

export const VERIFICATION_STATUS_ORDER = [
  'uncited',
  'secondary_only',
  'primary_cited',
  'primary_cited_and_reviewed',
  'disputed',
  'unresolved'
];

export const VERIFICATION_STATUS_DESCRIPTIONS = {
  uncited: 'No supporting citation has been entered yet.',
  secondary_only: 'Covered only by commentary, later manuals, or modern references; no primary citation entered yet.',
  primary_cited: 'At least one primary citation has been entered, but no completed scholarly review is recorded yet.',
  primary_cited_and_reviewed: 'At least one primary citation has been entered and a scholarly review has been recorded.',
  disputed: 'Sources or reviewers disagree and the point remains actively disputed.',
  unresolved: 'The point is known to need more work and should not be treated as fully settled.'
};

export const EVIDENCE_TIER_ORDER = [
  'primary',
  'commentary',
  'secondary',
  'modern-reference',
  'api-check'
];

export const EVIDENCE_TIER_DESCRIPTIONS = {
  primary: 'A direct primary statement in a classical counting source.',
  commentary: 'A commentary or explanatory work tied closely to a primary counting text.',
  secondary: 'A later specialist manual or scholarly secondary treatment.',
  'modern-reference': 'A modern reference, catalog, article, or summary used as supporting context.',
  'api-check': 'A machine-readable external consistency check such as a public API. Never sufficient on its own.'
};

export const EVIDENCE_STRENGTH_ORDER = ['direct', 'derived'];

function stableUnique(values) {
  const seen = new Set();
  const result = [];

  for (const value of values || []) {
    if (seen.has(value)) {
      continue;
    }

    seen.add(value);
    result.push(value);
  }

  return result;
}

function sortNumericKeysAscending(record) {
  return Object.keys(record || {})
    .map(key => Number.parseInt(key, 10))
    .sort((left, right) => left - right)
    .map(value => String(value));
}

function normalizeOptionalText(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeRequiredText(value, location, fieldName) {
  const normalized = normalizeOptionalText(value);
  if (!normalized) {
    throw new Error(`${location}: ${fieldName} must be a non-empty string`);
  }

  return normalized;
}

function normalizeSystemsSubset(values, countedBy, orderedSystemIds, location) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error(`${location}: supports must be a non-empty array`);
  }

  const uniqueValues = stableUnique(values);
  const countedBySet = new Set(countedBy);

  for (const systemId of uniqueValues) {
    if (!orderedSystemIds.includes(systemId)) {
      throw new Error(`${location}: unknown counting system ${systemId}`);
    }

    if (!countedBySet.has(systemId)) {
      throw new Error(`${location}: supports contains ${systemId}, which is not in the primitive counted_by list`);
    }
  }

  return orderedSystemIds.filter(systemId => uniqueValues.includes(systemId));
}

function normalizeEvidenceItem(item, countedBy, orderedSystemIds, location) {
  const tier = normalizeRequiredText(item?.tier, location, 'tier');
  if (!EVIDENCE_TIER_ORDER.includes(tier)) {
    throw new Error(`${location}: unknown evidence tier ${tier}`);
  }

  const strength = normalizeOptionalText(item?.strength) || 'direct';
  if (!EVIDENCE_STRENGTH_ORDER.includes(strength)) {
    throw new Error(`${location}: unknown evidence strength ${strength}`);
  }

  const normalized = {
    tier,
    work: normalizeRequiredText(item?.work, location, 'work'),
    locator: normalizeRequiredText(item?.locator, location, 'locator'),
    supports: normalizeSystemsSubset(item?.supports, countedBy, orderedSystemIds, location),
    strength
  };

  const edition = normalizeOptionalText(item?.edition);
  if (edition) {
    normalized.edition = edition;
  }

  const note = normalizeOptionalText(item?.note);
  if (note) {
    normalized.note = note;
  }

  return normalized;
}

function normalizeReviewer(reviewer, location) {
  const normalized = {
    name: normalizeRequiredText(reviewer?.name, location, 'reviewer.name')
  };

  const role = normalizeOptionalText(reviewer?.role);
  if (role) {
    normalized.role = role;
  }

  const date = normalizeOptionalText(reviewer?.date);
  if (date) {
    normalized.date = date;
  }

  const note = normalizeOptionalText(reviewer?.note);
  if (note) {
    normalized.note = note;
  }

  return normalized;
}

function buildDefaultEvidencePoint(word) {
  return {
    word,
    verification_status: 'uncited',
    evidence: []
  };
}

function normalizePointEvidence(sourcePoint, primitivePoint, orderedSystemIds, location) {
  const countedBy = primitivePoint.counted_by;
  const expectedWord = primitivePoint.word;
  const existing = sourcePoint || buildDefaultEvidencePoint(expectedWord);

  if (existing.word && normalizeRequiredText(existing.word, location, 'word') !== expectedWord) {
    throw new Error(`${location}: evidence word does not match primitive word`);
  }

  const verificationStatus = normalizeOptionalText(existing.verification_status) || 'uncited';
  if (!VERIFICATION_STATUS_ORDER.includes(verificationStatus)) {
    throw new Error(`${location}: unknown verification_status ${verificationStatus}`);
  }

  const normalizedEvidence = (existing.evidence || []).map((item, index) => {
    return normalizeEvidenceItem(item, countedBy, orderedSystemIds, `${location}:evidence[${index}]`);
  });

  const normalizedReviewers = (existing.reviewers || []).map((reviewer, index) => {
    return normalizeReviewer(reviewer, `${location}:reviewers[${index}]`);
  });

  const note = normalizeOptionalText(existing.note);
  const point = {
    word: expectedWord,
    verification_status: verificationStatus,
    evidence: normalizedEvidence
  };

  if (normalizedReviewers.length > 0) {
    point.reviewers = normalizedReviewers;
  }

  if (note) {
    point.note = note;
  }

  validatePointEvidence(point, primitivePoint, location);
  return point;
}

function validatePointEvidence(point, primitivePoint, location) {
  const countedBy = primitivePoint.counted_by;
  const supportsUnion = stableUnique(point.evidence.flatMap(item => item.supports));
  const hasPrimaryEvidence = point.evidence.some(item => item.tier === 'primary');
  const reviewers = point.reviewers || [];

  if (point.verification_status === 'uncited') {
    if (point.evidence.length > 0) {
      throw new Error(`${location}: uncited points must not carry evidence entries`);
    }

    if (reviewers.length > 0) {
      throw new Error(`${location}: uncited points must not carry reviewers`);
    }

    return;
  }

  if (point.verification_status === 'secondary_only') {
    if (point.evidence.length === 0) {
      throw new Error(`${location}: secondary_only points must carry evidence entries`);
    }

    if (hasPrimaryEvidence) {
      throw new Error(`${location}: secondary_only points must not contain primary-tier evidence`);
    }
  }

  if (point.verification_status === 'primary_cited' || point.verification_status === 'primary_cited_and_reviewed') {
    if (point.evidence.length === 0) {
      throw new Error(`${location}: ${point.verification_status} points must carry evidence entries`);
    }

    if (!hasPrimaryEvidence) {
      throw new Error(`${location}: ${point.verification_status} points must include at least one primary-tier evidence entry`);
    }
  }

  const requiresFullSupportCoverage = [
    'secondary_only',
    'primary_cited',
    'primary_cited_and_reviewed'
  ].includes(point.verification_status);

  if (requiresFullSupportCoverage) {
    const expectedSupports = JSON.stringify(countedBy);
    const actualSupports = JSON.stringify(orderedIntersection(countedBy, supportsUnion));

    if (expectedSupports !== actualSupports) {
      throw new Error(`${location}: ${point.verification_status} points must cover the full counted_by set through evidence.supports`);
    }
  }

  if (point.verification_status === 'primary_cited_and_reviewed' && reviewers.length === 0) {
    throw new Error(`${location}: primary_cited_and_reviewed points must include at least one reviewer`);
  }
}

function orderedIntersection(referenceOrder, values) {
  const valueSet = new Set(values);
  return referenceOrder.filter(value => valueSet.has(value));
}

function normalizeInternalEvidenceArray(sourceArray, primitiveArray, orderedSystemIds, location) {
  const byWord = new Map();

  for (const point of sourceArray || []) {
    const word = normalizeRequiredText(point?.word, location, 'internal.word');
    if (byWord.has(word)) {
      throw new Error(`${location}: duplicate evidence entry for internal word ${word}`);
    }
    byWord.set(word, point);
  }

  return primitiveArray.map((primitivePoint, index) => {
    const sourcePoint = byWord.get(primitivePoint.word);
    return normalizePointEvidence(sourcePoint, primitivePoint, orderedSystemIds, `${location}[${index}]`);
  });
}

export function normalizeBookBoundaryEvidenceDocument(evidenceDocument, primitivesDocument, countingSystems, version = evidenceDocument?._version ?? primitivesDocument?._version) {
  const orderedSystemIds = primitivesDocument._counting_system_order || Object.keys(countingSystems);

  const normalized = {
    _version: version,
    _description: BOOK_BOUNDARY_EVIDENCE_DESCRIPTION,
    _paired_primitive_file: 'book-boundary-primitives.json',
    _counting_system_order: orderedSystemIds,
    _verification_status_descriptions: VERIFICATION_STATUS_DESCRIPTIONS,
    _evidence_tier_descriptions: EVIDENCE_TIER_DESCRIPTIONS,
    surahs: {}
  };

  for (const surahKey of sortNumericKeysAscending(primitivesDocument.surahs)) {
    const primitiveAyahs = primitivesDocument.surahs[surahKey];
    const sourceAyahs = evidenceDocument?.surahs?.[surahKey] || {};
    const normalizedAyahs = {};

    for (const ayahKey of sortNumericKeysAscending(primitiveAyahs)) {
      const primitiveRecord = primitiveAyahs[ayahKey];
      const sourceRecord = sourceAyahs[ayahKey] || {};
      const normalizedRecord = {};
      const location = `${surahKey}:${ayahKey}`;

      if (primitiveRecord.internal) {
        normalizedRecord.internal = normalizeInternalEvidenceArray(
          sourceRecord.internal,
          primitiveRecord.internal,
          orderedSystemIds,
          `${location}:internal`
        );
      }

      if (primitiveRecord.end) {
        normalizedRecord.end = normalizePointEvidence(
          sourceRecord.end,
          primitiveRecord.end,
          orderedSystemIds,
          `${location}:end`
        );
      }

      normalizedAyahs[ayahKey] = normalizedRecord;
    }

    normalized.surahs[surahKey] = normalizedAyahs;
  }

  return normalized;
}

function buildSystemView(kind, systemId, countedBy) {
  const countsBoundary = countedBy.includes(systemId);
  let numberingEffect = 'none';

  if (kind === 'internal' && countsBoundary) {
    numberingEffect = 'split';
  }

  if (kind === 'end' && !countsBoundary) {
    numberingEffect = 'merge';
  }

  return {
    counts_boundary: countsBoundary,
    numbering_effect: numberingEffect
  };
}

function flattenEvidenceSupportSystems(evidence, countedBy) {
  const supports = stableUnique(evidence.flatMap(item => item.supports));
  return orderedIntersection(countedBy, supports);
}

export function flattenBookBoundaryReviewRows(primitivesDocument, evidenceDocument) {
  const orderedSystemIds = primitivesDocument._counting_system_order;
  const rows = [];

  for (const surahKey of sortNumericKeysAscending(primitivesDocument.surahs)) {
    const primitiveAyahs = primitivesDocument.surahs[surahKey];
    const evidenceAyahs = evidenceDocument.surahs[surahKey] || {};
    const surah = Number.parseInt(surahKey, 10);

    for (const ayahKey of sortNumericKeysAscending(primitiveAyahs)) {
      const primitiveRecord = primitiveAyahs[ayahKey];
      const evidenceRecord = evidenceAyahs[ayahKey] || {};
      const hafsAyah = Number.parseInt(ayahKey, 10);

      for (const primitivePoint of primitiveRecord.internal || []) {
        const evidencePoint = (evidenceRecord.internal || []).find(point => point.word === primitivePoint.word) || buildDefaultEvidencePoint(primitivePoint.word);
        rows.push(buildReviewRow({
          surah,
          hafsAyah,
          kind: 'internal',
          primitivePoint,
          evidencePoint,
          orderedSystemIds
        }));
      }

      if (primitiveRecord.end) {
        const evidencePoint = evidenceRecord.end || buildDefaultEvidencePoint(primitiveRecord.end.word);
        rows.push(buildReviewRow({
          surah,
          hafsAyah,
          kind: 'end',
          primitivePoint: primitiveRecord.end,
          evidencePoint,
          orderedSystemIds
        }));
      }
    }
  }

  return rows;
}

function buildReviewRow({ surah, hafsAyah, kind, primitivePoint, evidencePoint, orderedSystemIds }) {
  const countedBy = primitivePoint.counted_by;
  const systems = Object.fromEntries(
    orderedSystemIds.map(systemId => [systemId, buildSystemView(kind, systemId, countedBy)])
  );
  const evidence = evidencePoint.evidence || [];
  const reviewers = evidencePoint.reviewers || [];
  const supportedSystems = flattenEvidenceSupportSystems(evidence, countedBy);

  return {
    anchor_key: `${surah}:${hafsAyah}:${kind}:${primitivePoint.word}`,
    surah,
    hafs_ayah: hafsAyah,
    kind,
    word: primitivePoint.word,
    counted_by: countedBy,
    omitted_by: orderedSystemIds.filter(systemId => !countedBy.includes(systemId)),
    verification_status: evidencePoint.verification_status || 'uncited',
    evidence_count: evidence.length,
    primary_evidence_count: evidence.filter(item => item.tier === 'primary').length,
    reviewer_count: reviewers.length,
    supported_systems: supportedSystems,
    systems,
    note: evidencePoint.note || null,
    evidence,
    reviewers
  };
}
