import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const gate = JSON.parse(
  await readFile(new URL('../config/devnet.execution.json', import.meta.url), 'utf8'),
);

test('PHASE-03 execution gate is Devnet-only and blocked by default', () => {
  assert.equal(gate.phase, 'PHASE-03');
  assert.equal(gate.cluster, 'devnet');
  assert.equal(gate.rpcUrl, 'https://api.devnet.solana.com');
  assert.equal(gate.liveWriteAllowed, false);
  assert.equal(gate.mainnetAllowed, false);
  assert.equal(gate.signerPolicy, 'external-wallet-only');
});

test('canonical LLAMA identity is unchanged in the execution gate', () => {
  assert.deepEqual(gate.canonicalToken, {
    name: 'Llama',
    symbol: 'LLAMA',
    totalSupplyTokens: '1000000000',
    decimals: 9,
  });
});

test('irreversible and market actions remain separately gated', () => {
  assert.equal(gate.executionSteps.createMintAccount, 'blocked-pending-explicit-authorization');
  assert.equal(gate.executionSteps.mintSupply, 'blocked-separate-gate');
  assert.equal(gate.executionSteps.revokeMintAuthority, 'blocked-separate-gate');
  assert.equal(gate.executionSteps.revokeFreezeAuthority, 'blocked-separate-gate');
  assert.equal(gate.executionSteps.createLiquidity, 'out-of-scope');
  assert.equal(gate.executionSteps.mainnetDeployment, 'forbidden');
});
