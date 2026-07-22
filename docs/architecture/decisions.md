# Architecture Decisions

## Phase 6

### pnpm Monorepo

The project is structured as a pnpm workspace with separate frontend, API and shared packages. This keeps the MERN architecture explicit while allowing the Next.js frontend to remain SEO-friendly.

### Apps

- `apps/web` contains the Next.js App Router application.
- `apps/api` contains the Express API with MongoDB/Mongoose readiness.

### Packages

- `packages/ui` provides shared UI primitives.
- `packages/types` provides shared API and domain types.
- `packages/config` validates environment variables.
- `packages/validation` provides shared Zod schemas.

### API Foundation

The API includes:

- `/health` endpoint.
- Helmet security headers.
- CORS allow-list from environment variables.
- JSON request limits.
- Rate-limit middleware foundation.
- Central error response format.
- Mongoose connection helper.

### Web Foundation

The web app includes:

- Next.js App Router.
- Error, loading and not-found routes.
- Tailwind CSS.
- Local WOFF2 font-loading configuration for Suisse files.
- Route scaffolds for the approved architecture.
- Shared validation and UI package usage.

### Proof-Safe Content

Pages remain structural and avoid publishing fabricated business details. Owner-supplied proof is still required for UAE office status, case studies, testimonials, client logos, analytics IDs and legal copy.

## Phase 7

### CMS Boundary

The Express API now separates public content routes from authenticated admin routes. Leads are only exposed through admin routes, and public CMS routes only return content in a publishable state.

### Admin Authentication

Admin sessions use signed JWTs stored in HTTP-only cookies. Passwords are hashed with bcrypt, and the first owner account is created through a one-time bootstrap endpoint.

### Content Safety

Rich HTML fields are sanitised at write time. Mongoose schemas retain image metadata and alt text fields so media can be published accessibly once verified assets are supplied.

### Evidence-Safe Seeds

Seed data is limited to verified service categories and draft testimonials that require owner permission before publication. No fabricated case-study results, client logos, UAE address or phone number are seeded.

# Phase 11 SEO Decisions

Date: 2026-07-22

- Use a shared metadata factory in `apps/web/src/lib/seo.tsx` so canonicals, Open Graph, Twitter cards and robots rules stay consistent across pages.
- Use `Organization`, `WebSite`, `BreadcrumbList`, `Service` and `Article` JSON-LD only where the visible page content supports the schema.
- Exclude `LocalBusiness` until the owner supplies a genuine UAE business location, address, phone number and office status.
- Exclude named `Person` author schema until real author names, bios and permissions are supplied.
- Keep `/work/[caseStudySlug]` noindexed because it is currently a proof-safe case-study template, not approved client work.
- Implement legacy redirects in middleware with status `301`; avoid a broad `/services/*` redirect because it would break the new service URLs.
- Disallow and noindex admin, preview, search and filter-style URLs to avoid indexing private or low-value URL variants.
