import { createSolanaRpc, devnet } from '@solana/kit';

export const OFFICIAL_SOLANA_DEVNET_RPC = 'https://api.devnet.solana.com' as const;
export const LOCAL_VALIDATOR_RPC = 'http://127.0.0.1:8899' as const;

export type AllowedDevnetRpcUrl =
  | typeof OFFICIAL_SOLANA_DEVNET_RPC
  | typeof LOCAL_VALIDATOR_RPC;

export function assertAllowedDevnetRpcUrl(rpcUrl: string): AllowedDevnetRpcUrl {
  if (rpcUrl === OFFICIAL_SOLANA_DEVNET_RPC || rpcUrl === LOCAL_VALIDATOR_RPC) {
    return rpcUrl;
  }

  throw new Error(
    `RPC endpoint is not approved for this phase: ${rpcUrl}. Only Solana Devnet or the local validator is allowed.`,
  );
}

export function createReadOnlyDevnetRpc(
  rpcUrl: string = OFFICIAL_SOLANA_DEVNET_RPC,
) {
  const approvedUrl = assertAllowedDevnetRpcUrl(rpcUrl);
  return createSolanaRpc(devnet(approvedUrl));
}
