# Security policy

## Prohibited secret handling

Never commit or transmit through repository tooling:

- wallet seed phrases or mnemonics;
- private keys;
- raw signing keypairs;
- production RPC credentials containing privileged secrets.

Signing must occur through an external wallet under the holder's control.

## Foundation invariants

- Mainnet deployment remains disabled.
- Team allocation remains zero.
- Private-sale allocation remains zero.
- Hidden administrative wallets are forbidden.
- Final mint and freeze authority targets are `revoked`.
- CI has read-only repository permissions.

## Dependency posture

Foundation v0.1 intentionally has zero runtime and development package dependencies. This reduces supply-chain exposure while the on-chain SDK decision is still pending.
