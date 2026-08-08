# Architecture v0.1

## Scope

This repository is a monorepo. The foundation phase establishes the canonical token contract, engineering controls, web boundary, Solana boundary, and CI before any on-chain mutation.

```text
Llama-MEME/
├── apps/web/             # public web application boundary
├── packages/solana/      # Solana integration boundary
├── config/               # canonical machine-readable specifications
├── scripts/              # deterministic validation and security checks
├── tests/                # repository contract tests
├── assets/               # approved brand assets
├── docs/                 # architecture/security/tokenomics/deployment policy
└── .github/workflows/    # CI evidence
```

## Engineering doctrine

The gate order is: architecture, build/compilation contract, unit and integration testing, coverage, static analysis, CI quality, security, reproducibility, mutation testing where meaningful, technical-debt accounting, and execution evidence.

At v0.1 there is no application compiler because no TypeScript/Solana implementation has landed. `npm run build` therefore enforces the foundation build contract. A real TypeScript compilation gate becomes mandatory in the first Solana implementation PR; it may not be silently omitted.

## Trust boundaries

- Private keys and seed phrases never enter the repository, CI, Vercel, or chat.
- Wallet signing remains external and user-controlled.
- Mainnet deployment is explicitly disabled in the canonical specification.
- Treasury, community, and launch allocations require distinct public addresses before distribution.
