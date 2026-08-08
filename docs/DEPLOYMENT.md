# Deployment gates

No Mainnet deployment is authorized by this foundation PR.

## Required sequence

1. Foundation contract passes CI.
2. Solana implementation lands with pinned dependencies and TypeScript compilation.
3. Unit and integration tests pass.
4. Devnet mint is created and independently inspected.
5. Metadata and allocation addresses are verified.
6. Mint/freeze authority transition procedure is rehearsed on Devnet.
7. Reproducibility and security evidence are attached to the release candidate.
8. A separate explicit Mainnet authorization is required.

Any changed token identity, supply, decimals, distribution, or authority target invalidates prior deployment evidence.
