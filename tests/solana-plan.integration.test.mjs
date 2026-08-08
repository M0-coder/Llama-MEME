import assert from 'node:assert/strict';
import test from 'node:test';

import {
  LLAMA_DECIMALS,
  LLAMA_TOKEN_PROGRAM_ADDRESS,
  LLAMA_TOTAL_SUPPLY_BASE_UNITS,
  LLAMA_TOTAL_SUPPLY_TOKENS,
  OFFICIAL_SOLANA_DEVNET_RPC,
  assertAllowedDevnetRpcUrl,
  assertCanonicalSupplyFitsU64,
  buildInitializeLlamaMintInstruction,
  getCanonicalTokenPlan,
  getLlamaMintAccountSize,
} from '../dist/packages/solana/src/index.js';

test('canonical LLAMA supply is representable by SPL Token amounts', () => {
  assert.equal(LLAMA_DECIMALS, 9);
  assert.equal(LLAMA_TOTAL_SUPPLY_TOKENS, 1_000_000_000n);
  assert.equal(LLAMA_TOTAL_SUPPLY_BASE_UNITS, 1_000_000_000_000_000_000n);
  assert.equal(assertCanonicalSupplyFitsU64(), LLAMA_TOTAL_SUPPLY_BASE_UNITS);
});

test('network guard only permits Devnet and local validator', () => {
  assert.equal(assertAllowedDevnetRpcUrl(OFFICIAL_SOLANA_DEVNET_RPC), OFFICIAL_SOLANA_DEVNET_RPC);
  assert.throws(() => assertAllowedDevnetRpcUrl('https://api.mainnet-beta.solana.com'));
  assert.throws(() => assertAllowedDevnetRpcUrl('https://example.com'));
});

test('mint initialization is built against the canonical SPL Token program', () => {
  const placeholderAddress = '11111111111111111111111111111111';
  const instruction = buildInitializeLlamaMintInstruction({
    mintAddress: placeholderAddress,
    authorityAddress: placeholderAddress,
  });

  assert.equal(instruction.programAddress, LLAMA_TOKEN_PROGRAM_ADDRESS);
  assert.ok(instruction.data.length > 0);
  assert.ok(getLlamaMintAccountSize() > 0);

  const plan = getCanonicalTokenPlan();
  assert.equal(plan.mainnetDeploymentAllowed, false);
  assert.equal(plan.terminalMintAuthority, 'revoked');
  assert.equal(plan.terminalFreezeAuthority, 'revoked');
});
