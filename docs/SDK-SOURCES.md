# SDK source decisions

Phase 02 uses the current official Solana TypeScript stack selected for this implementation:

- `@solana/kit` `7.0.0` — core JavaScript/TypeScript SDK.
- `@solana-program/token` `0.15.0` — generated client for the original SPL Token Program.
- `typescript` `7.0.2` — compiler gate.

The implementation uses the original SPL Token Program rather than Token-2022 because the canonical LLAMA specification currently requires only a basic fungible mint with fixed terminal supply and no extension-specific behavior.

Dependency versions are exact at the direct-dependency level. Transitive locking remains tracked in `docs/TECHNICAL_DEBT.md`.
