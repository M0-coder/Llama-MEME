# PHASE 03 — Devnet execution gate

PHASE-03 prepares the first real on-chain Devnet write, but this branch does **not** authorize or broadcast one.

## Current state

- Base: `c22e4f379ffc8823bca31812f54277b15c3b3041` (PHASE-02 merged to `main`).
- Network: Solana Devnet only.
- Mainnet: forbidden.
- Signer custody: external wallet only.
- `liveWriteAllowed`: `false`.

The machine-readable gate is `config/devnet.execution.json`. CI must reject any change that enables a live write or changes the cluster before a separate explicit authorization.

## Gate A — preparation

Required before asking for a live Devnet execution authorization:

1. exact branch HEAD is known;
2. CI is green on that exact HEAD;
3. canonical LLAMA identity remains `Llama / LLAMA / 1,000,000,000 / 9`;
4. official Devnet RPC is the only remote execution target;
5. no seed phrase, raw private key, or keypair file enters repository, CI, Vercel, or chat;
6. mint creation, supply minting, authority revocation, and liquidity remain separate operations;
7. execution evidence schema is fixed before the transaction.

## Gate B — first Devnet write

A later explicit authorization may permit **only mint-account creation and initialization on Devnet**. That authorization does not automatically permit supply minting, authority revocation, liquidity creation, or Mainnet.

Required evidence after a permitted write:

- exact code SHA;
- cluster = `devnet`;
- mint address;
- transaction signature;
- post-transaction inspection showing program owner, decimals, mint authority, freeze authority, and supply state.

If observed state differs from the canonical plan, execution stops. No downstream mutation should proceed from inconsistent evidence.

## Gate C — later operations

Supply minting and authority revocation require separate reviewed gates because they materially change token state. Liquidity and any market-launch operation are outside PHASE-03.
