import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = new URL('..', import.meta.url);
const allowedExtensions = new Set(['.md', '.json', '.mjs', '.ts', '.yml', '.yaml', '.txt', '']);
const suspicious = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\b(?:seed phrase|mnemonic)\s*[:=]\s*["'][^"']+/i,
  /\bprivate[_-]?key\s*[:=]\s*["'][^"']+/i
];

async function walk(url, relative = '') {
  for (const entry of await readdir(url, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'dist', 'coverage'].includes(entry.name)) continue;
    const rel = join(relative, entry.name);
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, url);
    if (entry.isDirectory()) {
      await walk(child, rel);
      continue;
    }
    if (!allowedExtensions.has(extname(entry.name))) continue;
    const text = await readFile(child, 'utf8');
    for (const pattern of suspicious) {
      if (pattern.test(text)) throw new Error(`Potential secret material detected in ${rel}`);
    }
  }
}

await walk(root);
console.log('repository secret-pattern check: PASS');
