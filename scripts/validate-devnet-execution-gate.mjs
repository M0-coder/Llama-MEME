import { readFile } from 'node:fs/promises';

const gate = JSON.parse(
  await readFile(new URL('../config/devnet.execution.json', import.meta.url), 'utf8'),
);

const fail = (message) => {
  throw new Error(message);
};

if (gate.phase !== 'PHASE-03') fail('Devnet gate phase must be PHASE-03');
if (gate.cluster !== 'devnet') fail('Execution cluster must remain devnet');
if (gate.rpcUrl !== 'https://api.devnet.solana.com') {
  fail('Execution RPC must remain the official Solana Devnet endpoint');
}
if (gate.liveWriteAllowed !== false) fail('Live Devnet write must remain blocked until explicit authorization');
if (gate.mainnetAllowed !== false) fail('Mainnet must remain forbidden');
if (gate.signerPolicy !== 'external-wallet-only') fail('Signer policy must remain external-wallet-only');

const token = gate.canonicalToken;
if (token.name !== 'Llama') fail('Canonical name mismatch');
if (token.symbol !== 'LLAMA') fail('Canonical symbol mismatch');
if (token.totalSupplyTokens !== '1000000000') fail('Canonical supply mismatch');
if (token.decimals !== 9) fail('Canonical decimals mismatch');

const requiredEvidence = new Set(gate.requiredEvidence);
for (const item of [
  'exactCodeSha',
  'cluster',
  'mintAddress',
  'transactionSignature',
  'postTransactionInspection',
]) {
  if (!requiredEvidence.has(item)) fail(`Missing required execution evidence: ${item}`);
}

if (gate.executionSteps.createMintAccount !== 'blocked-pending-explicit-authorization') {
  fail('Mint account creation must remain blocked');
}
if (gate.executionSteps.mainnetDeployment !== 'forbidden') fail('Mainnet deployment must remain forbidden');

console.log('devnet.execution.json: BLOCKED-SAFE');
