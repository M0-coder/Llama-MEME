# Solana integration boundary

Phase 02 introduces the first compiled TypeScript integration against Solana Kit.

## Current capabilities

- canonical LLAMA supply arithmetic and SPL Token `u64` range validation;
- SPL Token mint account sizing;
- construction of the canonical mint-initialization instruction;
- a hard RPC allowlist limited to Solana Devnet and the local validator;
- no transaction sender, wallet loader, seed phrase handling, liquidity logic, or Mainnet endpoint.

## Dependency contract

- `@solana/kit` `7.0.0`
- `@solana-program/token` `0.15.0`
- `typescript` `7.0.2`

Versions are exact and validated by CI.

This phase prepares and tests the instruction layer only. Creating a Devnet mint remains a separate execution gate because it requires a signer and an explicit on-chain write.
