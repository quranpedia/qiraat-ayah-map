import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const libDir = dirname(fileURLToPath(import.meta.url));

export const repoDir = join(libDir, '..', '..');
export const sourceDataDir = join(repoDir, 'data');
export const distDir = join(repoDir, 'dist');
export const distMappingsByCountingSystemDir = join(distDir, 'mappings', 'by-counting-system');
export const distMappingsByRawiDir = join(distDir, 'mappings', 'by-rawi');
export const distRawisDir = join(distDir, 'rawis');
export const distSurahCountsDir = join(distDir, 'surah-counts');
export const distReviewDir = join(distDir, 'review');
export const distReviewSystemsDir = join(distReviewDir, 'systems');

export function sourcePath(...parts) {
  return join(sourceDataDir, ...parts);
}

export function distPath(...parts) {
  return join(distDir, ...parts);
}
