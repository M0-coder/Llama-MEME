import { address } from '@solana/kit';
import {
  getInitializeMintInstruction,
  getMintSize,
  TOKEN_PROGRAM_ADDRESS,
} from '@solana-program/token';

export const LLAMA_DECIMALS = 9;
export const LLAMA_TOTAL_SUPPLY_TOKENS = 1_000_000_000n;
export const LLAMA_TOTAL_SUPPLY_BASE_UNITS =
  LLAMA_TOTAL_SUPPLY_TOKENS * 10n ** BigInt(LLAMA_DECIMALS);
export const U64_MAX = (1n << 64n) - 1n;
export const LLAMA_TOKEN_PROGRAM_ADDRESS = TOKEN_PROGRAM_ADDRESS;

export function assertCanonicalSupplyFitsU64(): bigint {
  if (LLAMA_TOTAL_SUPPLY_BASE_UNITS > U64_MAX) {
    throw new Error('Canonical LLAMA supply exceeds the SPL Token u64 amount range.');
  }
  return LLAMA_TOTAL_SUPPLY_BASE_UNITS;
}

export function getLlamaMintAccountSize(): number {
  return getMintSize();
}

export function buildInitializeLlamaMintInstruction(input: {
  mintAddress: string;
  authorityAddress: string;
}) {
  const mint = address(input.mintAddress);
  const authority = address(input.authorityAddress);

  return getInitializeMintInstruction({
    mint,
    decimals: LLAMA_DECIMALS,
    mintAuthority: authority,
    freezeAuthority: authority,
  });
}

export function getCanonicalTokenPlan() {
  return Object.freeze({
    name: 'Llama',
    symbol: 'LLAMA',
    decimals: LLAMA_DECIMALS,
    totalSupplyTokens: LLAMA_TOTAL_SUPPLY_TOKENS,
    totalSupplyBaseUnits: assertCanonicalSupplyFitsU64(),
    tokenProgramAddress: LLAMA_TOKEN_PROGRAM_ADDRESS,
    terminalMintAuthority: 'revoked' as const,
    terminalFreezeAuthority: 'revoked' as const,
    mainnetDeploymentAllowed: false as const,
  });
}
