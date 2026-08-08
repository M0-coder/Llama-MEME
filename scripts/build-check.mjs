import { access, readFile } from 'node:fs/promises';

const required = [
  'config/token.spec.json',
  'config/assets.manifest.json',
  'config/devnet.execution.json',
  'docs/ARCHITECTURE.md',
  'docs/TOKENOMICS.md',
  'docs/SECURITY.md',
  'docs/DEPLOYMENT.md',
  'docs/PHASE-03-DEVNET-EXECUTION.md',
  'tsconfig.json',
  'packages/solana/src/index.ts',
  'packages/solana/src/devnet.ts',
  'packages/solana/src/token-plan.ts'
];

for (const path of required) await access(new URL(`../${path}`, import.meta.url));
const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
if (pkg.private !== true) throw new Error('Root package must remain private');
if (pkg.version !== '0.2.0') throw new Error('Phase 02 package version must remain 0.2.0 until an implementation release changes it');
console.log('Solana Devnet execution-gate build contract: PASS');
