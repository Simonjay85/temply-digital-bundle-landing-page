# DaisyLexi live baseline

`live-baseline/` is the protected canonical deployment snapshot of the DaisyLexi site that was live on 2026-08-31.

Why it exists:

- The current public DaisyLexi design was present in the deployed static bundle, but its original editable React source was not found in the local Git repository or in `/opt/daisyflow/src` on the VPS.
- The older local authoring source still renders the Temply Studio / Study Success Bundle site and must not be used for production DaisyLexi deploys.
- Keeping the exact live static bundle in Git gives the project a recoverable, deterministic production baseline while the editable DaisyLexi source is reconstructed separately.

Safety rules:

1. `npm run build` builds only from `live-baseline/` and refuses a baseline with the legacy Temply title.
2. `npm run dev` serves the DaisyLexi baseline.
3. The previous Vite/React Temply source is retained for history only and is available through `npm run dev:legacy-temply` / `npm run build:legacy-temply`.
4. Do not deploy the legacy build to `daisylexi.com`.
5. Before replacing `live-baseline/`, compare file hashes and browser QA against the live site and keep a recoverable server backup.

Server backup made before this baseline was captured:

`/home/ubuntu/daisylexi-canonical-backup-20260831-1454/client`

The baseline contains compiled production assets. It is a deployment source of truth, not a claim that the missing original component-level source has been recovered.
