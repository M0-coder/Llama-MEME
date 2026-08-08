# Technical debt ledger

## TD-001 — transitive dependency lock

**Status:** OPEN  
**Risk:** medium  
**Gate:** must close before any Mainnet release candidate.

Direct dependencies are pinned exactly, but a repository `package-lock.json` has not yet been committed. Therefore transitive dependency resolution is not fully byte-for-byte reproducible across time.

Required closure evidence:

- committed lockfile generated from a clean Node 22 environment;
- `npm ci` replacing `npm install` in CI;
- clean install + build + test evidence from that lockfile.

## TD-002 — mutation testing

**Status:** DEFERRED  
**Risk:** low in the current instruction-only surface  
**Gate:** required once mint/supply/authority transition logic is executable.

Current tests cover canonical arithmetic, network isolation, and SPL Token instruction construction. Mutation testing becomes meaningful when transaction-state transitions are implemented.

## TD-003 — live Devnet integration evidence

**Status:** OPEN  
**Risk:** expected at this phase  
**Gate:** required before advancing beyond pre-Devnet.

No transaction has been broadcast. The first Devnet write must be separately authorized and must record the mint address, transaction signature, cluster, exact code SHA, and post-transaction inspection results.
