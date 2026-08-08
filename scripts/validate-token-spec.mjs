import { readFile } from 'node:fs/promises';

const spec = JSON.parse(await readFile(new URL('../config/token.spec.json', import.meta.url), 'utf8'));
const fail = (message) => { throw new Error(message); };
const asBigInt = (value, field) => {
  if (!/^\d+$/.test(value)) fail(`${field} must be an unsigned integer string`);
  return BigInt(value);
};

const supply = asBigInt(spec.token.totalSupplyTokens, 'token.totalSupplyTokens');
const baseUnits = asBigInt(spec.token.totalSupplyBaseUnits, 'token.totalSupplyBaseUnits');
const decimals = spec.token.decimals;

if (spec.token.name !== 'Llama') fail('Canonical token name must be Llama');
if (spec.token.symbol !== 'LLAMA') fail('Canonical symbol must be LLAMA');
if (!Number.isInteger(decimals) || decimals !== 9) fail('Decimals must be exactly 9');
if (supply !== 1_000_000_000n) fail('Supply must be exactly 1,000,000,000 LLAMA');
if (baseUnits !== supply * (10n ** BigInt(decimals))) fail('Base-unit supply mismatch');

const allocations = Object.values(spec.allocation);
const allocatedTokens = allocations.reduce((sum, item) => sum + asBigInt(item.tokens, 'allocation.tokens'), 0n);
const allocatedBps = allocations.reduce((sum, item) => sum + item.basisPoints, 0);

if (allocatedTokens !== supply) fail('Allocations must equal total supply');
if (allocatedBps !== 10_000) fail('Allocation basis points must total 10,000');
if (spec.allocation.team.tokens !== '0') fail('Team allocation must remain zero');
if (spec.allocation.privateSale.tokens !== '0') fail('Private sale allocation must remain zero');
if (spec.authorities.mint.finalState !== 'revoked') fail('Mint authority final state must be revoked');
if (spec.authorities.freeze.finalState !== 'revoked') fail('Freeze authority final state must be revoked');
if (spec.controls.mainnetDeploymentAllowed !== false) fail('Mainnet must remain disabled in foundation spec');
if (spec.controls.privateKeyHandling !== 'external-wallet-only') fail('Private keys must remain external to the repository');
if (spec.controls.hiddenAdministrativeWalletsAllowed !== false) fail('Hidden administrative wallets are forbidden');

console.log('token.spec.json: PASS');
