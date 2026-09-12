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

function isCountedAsSplit(entry) {
  return Array.isArray(entry?.splits_into) && entry.splits_into.length > 1;
}

function resolveStatus(mappingTotal, primaryTotal, attestedTotals) {
  if (mappingTotal === primaryTotal) {
    return 'resolved_to_primary_riwaya';
  }

  const matchesAttestedVariant = attestedTotals.some(
    item => item.role !== 'primary' && item.total_ayahs === mappingTotal
  );

  return matchesAttestedVariant
    ? 'follows_alternative_attested_riwaya'
    : 'drift_from_primary_riwaya';
}

const source = loadSource('classical-count-attestations.json');
const countingSystems = loadSource('counting-systems.json');
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

  const disputedBoundaries = (authored.disputed_boundaries ?? []).map(item => {
    const entry = mapping?.surahs?.[String(item.surah)]?.ayahs?.[String(item.hafs_ayah)];
    return {
      ...item,
      current_mapping_decision: isCountedAsSplit(entry) ? 'counted' : 'excluded'
    };
  });

  systems[systemId] = {
    status: resolveStatus(mappingTotal, primaryTotal, attestedTotals),
    verification_status: authored.verification_status,
    mapping_total_ayahs: mappingTotal,
    registry_total_ayahs: countingSystems[systemId].total_ayahs,
    primary_classical_total_ayahs: primaryTotal,
    delta_from_primary: mappingTotal - primaryTotal,
    policy_en: authored.policy_en,
    policy_ar: authored.policy_ar,
    attested_totals: attestedTotals,
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
  _scope_note_en: source._scope_note_en,
  _scope_note_ar: source._scope_note_ar,
  systems
};

writeFileSync(
  distPath('classical-count-attestations.json'),
  JSON.stringify(document, null, 2) + '\n'
);

console.log('  Generated: dist/classical-count-attestations.json');
