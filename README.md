
# OverseeNOI — Bolt Starter Drop

This zip contains all Claude-provided files placed into a **monorepo scaffold** so Bolt can ingest and wire everything end‑to‑end.

## What’s inside
- `apps/frontend/oversee_noi_frontend.tsx`
- `apps/backend/oversee_noi_backend.ts`
- `apps/extension/oversee_noi_extension.ts`
- `packages/shared/*` (analytics, competitor AI, mobile realtime, vendor AP, security/deployment, complete)
- `infra/terraform/oversee_noi_infrastructure.txt`
- `docs/OverseeNOI Technical Specification.pdf`

> Bolt will: create full Next.js/NestJS apps, wire GraphQL/REST, Prisma, CI/CD, Terraform, testing, and integrate the extension — using these files as the **source of truth**.

## How to use with Bolt
1. **Upload this repo** (or push to GitHub and let Bolt pull it).
2. Open Bolt and paste the **Bolt Companion Prompt** below.
3. Let Bolt run. It will standardize tooling, generate missing scaffolding, and ensure everything builds, tests, and deploys.

---

# BOLT COMPANION PROMPT — OVERSEENOI WORLD-CLASS RELEASE
(Use this in Bolt. It tells Bolt how to wire this repo, set up CI/CD, and deploy.)
[Paste the full prompt you received from me in chat here if needed.]


---

## Notes
- These files are left as‑is; Bolt will refactor and implement the full project structure, configs, tests, and pipelines around them.
- If Bolt asks for clarifications, refer it back to the Technical Specification PDF and these source files as canonical.
