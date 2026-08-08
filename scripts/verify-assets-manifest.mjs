import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile(new URL('../config/assets.manifest.json', import.meta.url), 'utf8'));
const requiredRoles = new Set(['token-icon', 'full-character']);

if (!Array.isArray(manifest.assets) || manifest.assets.length !== 2) {
  throw new Error('Exactly two canonical artwork entries are required');
}

for (const asset of manifest.assets) {
  if (!requiredRoles.delete(asset.role)) throw new Error(`Unexpected or duplicate asset role: ${asset.role}`);
  if (!/^assets\/[a-z0-9-]+\.png$/.test(asset.path)) throw new Error(`Invalid asset path: ${asset.path}`);
  if (!/^[a-f0-9]{64}$/.test(asset.sha256)) throw new Error(`Invalid SHA-256: ${asset.path}`);
  if (asset.width !== 1024 || asset.height !== 1024) throw new Error(`Unexpected dimensions: ${asset.path}`);
  if (asset.status !== 'pending-binary-ingest' && asset.status !== 'verified') throw new Error(`Invalid status: ${asset.path}`);
}

if (requiredRoles.size !== 0) throw new Error('Missing required artwork roles');
console.log('assets.manifest.json: PASS');
