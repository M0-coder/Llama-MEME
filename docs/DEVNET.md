# Devnet execution gate

Phase 02 is an implementation-preparation phase. It compiles against the current pinned Solana SDK and constructs the LLAMA mint initialization instruction, but it does not send a transaction.

## Allowed network targets

- Solana Devnet: `https://api.devnet.solana.com`
- local validator: `http://127.0.0.1:8899`

Any other RPC URL is rejected by the current code path. Mainnet is not an allowed target.

## Preconditions before the first Devnet write

1. CI passes on the exact branch HEAD.
2. Canonical token specification remains unchanged: Llama / LLAMA / 1,000,000,000 / 9 decimals.
3. The mint account size and base-unit supply are validated by the compiled integration.
4. A signer is supplied externally; no seed phrase or raw private key enters the repository, CI, Vercel, or chat.
5. The transaction is limited to Devnet.
6. The resulting mint address and transaction signature are recorded as execution evidence.
7. Supply minting and authority revocation are separate reviewed steps; neither is implicit in mint creation.

## Explicit exclusions

This phase contains no liquidity creation, DEX integration, trading automation, Mainnet transaction sender, or automatic authority revocation.
