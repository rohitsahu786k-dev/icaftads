# I Craft Ads

Premium Dubai-focused digital marketing agency website and API scaffold.

## Workspace

This project uses a pnpm monorepo:

- `apps/web`: Next.js App Router frontend.
- `apps/api`: Express API.
- `packages/ui`: Shared React UI primitives.
- `packages/types`: Shared TypeScript types.
- `packages/config`: Environment validation.
- `packages/validation`: Shared Zod schemas.

## Setup

1. Enable pnpm through Corepack:

   ```bash
   corepack enable
   corepack prepare pnpm@10.19.0 --activate
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

4. Run development servers:

   ```bash
   pnpm dev
   ```

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e
```

## Phase 6 Scope

This phase implements architecture only. It intentionally does not build the complete visual website, advanced animations, case-study content or production integrations.
