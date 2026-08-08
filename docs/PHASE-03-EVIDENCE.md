# PHASE 03 — Evidence contract

Branch: `build/devnet-execution-gate-v1`

Base before PHASE-03 preparation: `c22e4f379ffc8823bca31812f54277b15c3b3041`.

## Preparation evidence required

The preparation gate is PASS only when GitHub Actions verifies the exact PR HEAD with:

- Node 24 runtime;
- TypeScript compilation;
- canonical token specification validation;
- Solana dependency-pin validation;
- PHASE-03 execution-gate validation;
- unit and integration tests;
- coverage execution;
- secret-pattern scanning;
- dependency-tree resolution.

## Live-write evidence contract

No live-write evidence exists yet. If a later explicit authorization permits the first Devnet mint-account creation, the resulting record must contain:

- exact code SHA;
- cluster (`devnet`);
- RPC endpoint used;
- mint address;
- transaction signature;
- transaction status;
- SPL Token program owner;
- decimals;
- supply immediately after creation;
- mint authority;
- freeze authority;
- timestamp of inspection.

No field may be inferred or filled from an intended value when on-chain inspection can provide the observed value.
