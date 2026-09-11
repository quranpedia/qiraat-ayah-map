/**
 * Generate the classical-count attestation artifact.
 *
 * The scholarly content — which totals are attested for each counting system,
 * on whose authority, and which total the repository adopts — lives in the
 * authored source layer at data/classical-count-attestations.json. This script
 * only computes what can be derived: the total the generated mapping actually
 * produces, the total the registry declares, the delta against the adopted
 * primary figure, the resulting status, and whether each disputed boundary is
 * currently counted.
 *
 * Usage: node scripts/generate-classical-count-attestations.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { distPath, repoDir, sourcePath } from './lib/repo-paths.mjs';

const pkg = JSON.parse(readFileSync(join(repoDir, 'package.json'), 'utf-8'));
const version = pkg.version;

function loadDist(file) {
  return JSON.parse(readFileSync(distPath(file), 'utf-8'));
}

function loadSource(file) {
  return JSON.parse(readFileSync(sourcePath(file), 'utf-8'));
}

// Strictly arithmetic. A matching total says nothing about which boundaries a
// mapping counts -- two maps can agree on the sum and disagree everywhere else --
// so these names claim only what the comparison actually establishes. Whether the
// point-by-point reconstruction is settled is authored separately, in
// boundary_reconstruction.
function resolveTotalStatus(mappingTotal, primaryTotal, attestedTotals) {
  if (mappingTotal === primaryTotal) {
    return 'mapping_total_matches_primary';
  }

  // Only a genuine same-madhhab alternative counts. `conflicting` is defined as
  // unreconciled, so matching it is not evidence of following anything.
  const matchesAlternative = attestedTotals.some(
    item => item.role === 'alternative' && item.total_ayahs === mappingTotal
  );

  return matchesAlternative
    ? 'mapping_total_matches_other_attestation'
    : 'mapping_total_unattested';
}

// Resolve an authored boundary against the canonical primitives by its exact
// identity. An ayah may hold both an internal and an end boundary -- 2:219 has
// ﴿ينفقون﴾ internal and ﴿تتفكرون﴾ end -- so an ayah-level "does this split?" check
// cannot tell which one is being asked about, and a missing lookup must not be
// silently reported as "excluded".
function resolveBoundaryDecision(primitives, systemId, item, systemLabel) {
  const where = `${systemLabel}: disputed boundary ${item.surah}:${item.hafs_ayah}`;

  for (const field of ['surah', 'hafs_ayah', 'kind', 'word']) {
    if (item[field] === undefined || item[field] === null) {
      throw new Error(`${where}: missing required field "${field}"`);
    }
  }

  if (!['internal', 'end'].includes(item.kind)) {
    throw new Error(`${where}: kind must be "internal" or "end", got "${item.kind}"`);
  }

  const record = primitives.surahs?.[String(item.surah)]?.[String(item.hafs_ayah)];

  if (!record) {
    throw new Error(`${where}: no primitive recorded at that ayah`);
  }

  const candidates = item.kind === 'end'
    ? (record.end && record.end.word === item.word ? [record.end] : [])
    : (record.internal || []).filter(point => point.word === item.word);

  if (candidates.length === 0) {
    throw new Error(`${where}: no ${item.kind} boundary on ﴿${item.word}﴾`);
  }

  if (candidates.length > 1) {
    throw new Error(`${where}: ﴿${item.word}﴾ is ambiguous -- ${candidates.length} ${item.kind} boundaries share it`);
  }

  return candidates[0].counted_by.includes(systemId) ? 'counted' : 'excluded';
}

const source = loadSource('classical-count-attestations.json');
const countingSystems = loadSource('counting-systems.json');
const primitives = loadSource('book-boundary-primitives.json');
const systemOrder = source._counting_system_order;

const systems = {};

for (const systemId of systemOrder) {
  const authored = source.systems[systemId];

  if (!authored) {
    throw new Error(`No authored attestation record for counting system "${systemId}"`);
  }

  const counts = loadDist(`surah-counts/${systemId}.json`);
  const mapping = systemId === 'kufi'
    ? null
    : loadDist(`mappings/by-counting-system/kufi-to-${systemId}.json`);

  const mappingTotal = counts._total_ayahs;
  const primaryTotal = authored.primary_classical_total_ayahs;
  const attestedTotals = authored.attested_totals ?? [];

  const disputedBoundaries = (authored.disputed_boundaries ?? []).map(item => ({
    ...item,
    current_mapping_decision: resolveBoundaryDecision(primitives, systemId, item, systemId)
  }));

  systems[systemId] = {
    mapping_total_status: resolveTotalStatus(mappingTotal, primaryTotal, attestedTotals),
    boundary_reconstruction: authored.boundary_reconstruction ?? 'unresolved',
    verification_status: authored.verification_status,
    mapping_total_ayahs: mappingTotal,
    registry_total_ayahs: countingSystems[systemId].total_ayahs,
    primary_classical_total_ayahs: primaryTotal,
    delta_from_primary: mappingTotal - primaryTotal,
    policy_en: authored.policy_en,
    policy_ar: authored.policy_ar,
    attested_totals: attestedTotals,
    related_authority_totals: authored.related_authority_totals ?? [],
    ...(authored.open_question_en ? { open_question_en: authored.open_question_en } : {}),
    ...(authored.open_question_ar ? { open_question_ar: authored.open_question_ar } : {}),
    disputed_boundaries: disputedBoundaries
  };
}

const document = {
  _version: version,
  _description: 'Curated classical total-count attestations and explicit repository decisions for disputed counting-system totals.',
  _source_file: 'data/classical-count-attestations.json',
  _role_descriptions: source._role_descriptions,
  _status_descriptions: source._status_descriptions,
  _boundary_reconstruction_descriptions: source._boundary_reconstruction_descriptions,
  _related_authority_totals_note_en: source._related_authority_totals_note_en,
  _related_authority_totals_note_ar: source._related_authority_totals_note_ar,
  _scope_note_en: source._scope_note_en,
  _scope_note_ar: source._scope_note_ar,
  systems
};

writeFileSync(
  distPath('classical-count-attestations.json'),
  JSON.stringify(document, null, 2) + '\n'
);

console.log('  Generated: dist/classical-count-attestations.json');
