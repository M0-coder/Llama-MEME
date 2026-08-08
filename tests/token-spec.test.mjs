import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const spec = JSON.parse(await readFile(new URL('../config/token.spec.json', import.meta.url), 'utf8'));

test('canonical identity is stable', () => {
  assert.equal(spec.token.name, 'Llama');
  assert.equal(spec.token.symbol, 'LLAMA');
  assert.equal(spec.token.totalSupplyTokens, '1000000000');
  assert.equal(spec.token.decimals, 9);
});

test('allocation is exactly 85/10/5 with no insider allocation', () => {
  assert.equal(spec.allocation.publicLaunch.basisPoints, 8500);
  assert.equal(spec.allocation.community.basisPoints, 1000);
  assert.equal(spec.allocation.treasury.basisPoints, 500);
  assert.equal(spec.allocation.team.basisPoints, 0);
  assert.equal(spec.allocation.privateSale.basisPoints, 0);
  assert.equal(Object.values(spec.allocation).reduce((n, x) => n + x.basisPoints, 0), 10000);
});

test('irreversible authority target is explicit while mainnet remains disabled', () => {
  assert.equal(spec.authorities.mint.finalState, 'revoked');
  assert.equal(spec.authorities.freeze.finalState, 'revoked');
  assert.equal(spec.controls.mainnetDeploymentAllowed, false);
  assert.equal(spec.controls.privateKeyHandling, 'external-wallet-only');
});
