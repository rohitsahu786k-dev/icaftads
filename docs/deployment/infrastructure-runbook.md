# Production Infrastructure Runbook

## Recommended Topology

| Layer | Recommendation | Readiness Notes |
| --- | --- | --- |
| Next.js frontend | Vercel | Use production branch protection, HTTPS, redirects, headers, and environment variables. |
| Express API | Managed Node hosting | Must support Node, persistent environment variables, health checks, logs, and rollback. |
| Database | MongoDB Atlas | Use separate staging and production databases or clusters. |
| Media | Cloudinary or approved object storage/CDN | Do not enable unrestricted public uploads. |
| DNS | Existing domain provider | Lower TTL before cutover. Keep old host available during launch window. |
| Transactional email | Approved email provider | Verify sender domain and test live form delivery before cutover. |

## Deployment Order

1. Create staging web and API environments.
2. Configure staging secrets using `docs/deployment/environment-matrix.md`.
3. Create staging Atlas database and confirm indexes are built.
4. Import approved staging content only.
5. Run staging validation: build, Playwright, axe, forms, analytics debug, sitemap, robots, canonicals.
6. Freeze and approve `docs/deployment/redirect-map.csv`.
7. Create production web, API, database, media, email, and monitoring resources.
8. Enable database backups and perform a restore drill or snapshot verification.
9. Deploy production without DNS cutover and validate through provider preview/domain URL.
10. Do not overwrite the current production website until every launch gate in `launch-report.md` is checked.

## Vercel Frontend

- Build command: `corepack pnpm --filter @icraftads/web build`.
- Output: Next.js managed output.
- Required env: all `NEXT_PUBLIC_*` values from the environment matrix.
- Canonical domain must match `NEXT_PUBLIC_SITE_URL`.
- Ensure Vercel production domain redirects to the approved primary domain.
- Confirm `/sitemap.xml`, `/robots.txt`, Open Graph image, and Twitter image respond over HTTPS.

## Managed Node API

- Build command: `corepack pnpm --filter @icraftads/api build`.
- Start command: `corepack pnpm --filter @icraftads/api start` or provider equivalent.
- Health check: `/health`.
- Readiness check: `/ready`.
- Confirm `trust proxy` behavior on the provider before relying on rate-limit IP behavior.
- Configure log retention and crash restart policy.

## MongoDB Atlas

- Use least-privilege database user for the API.
- Restrict network access to the API host where the provider supports stable egress.
- Enable backups before content import.
- Confirm indexes exist after deploy by checking API startup logs or Atlas index view.
- Keep staging and production data separated.

## DNS and HTTPS

- Lower DNS TTL 24 hours before launch when possible.
- Verify HTTPS certificate issuance before routing traffic.
- Keep old hosting available until post-launch monitoring is stable.
- After cutover, verify root domain, `www`, sitemap, robots, and legacy redirects.

## API Proxy and CORS

- Frontend posts contact forms to `NEXT_PUBLIC_API_URL`.
- API must set `CORS_ORIGINS` to the exact staging or production web origins.
- Do not use wildcard CORS in production.
- Confirm OPTIONS/preflight and POST `/inquiries` from the deployed frontend.
