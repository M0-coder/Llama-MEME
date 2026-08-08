import { access, readFile } from 'node:fs/promises';

const required = [
  'config/token.spec.json',
  'config/assets.manifest.json',
  'docs/ARCHITECTURE.md',
  'docs/TOKENOMICS.md',
  'docs/SECURITY.md',
  'docs/DEPLOYMENT.md'
];

for (const path of required) await access(new URL(`../${path}`, import.meta.url));
const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
if (pkg.private !== true) throw new Error('Root package must remain private');
console.log('foundation build contract: PASS');
