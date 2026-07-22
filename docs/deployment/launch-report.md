# Final Launch Report

Status: Not approved for production cutover.

## Infrastructure

| Gate | Status | Evidence / Owner |
| --- | --- | --- |
| Vercel frontend staging configured | Pending |  |
| Vercel frontend production configured | Pending |  |
| Managed Node API staging configured | Pending |  |
| Managed Node API production configured | Pending |  |
| MongoDB Atlas staging configured | Pending |  |
| MongoDB Atlas production configured | Pending |  |
| Cloudinary or approved media storage configured | Pending |  |
| Transactional email provider configured | Pending |  |
| DNS plan approved | Pending |  |
| HTTPS certificate verified | Pending |  |

## Safety Gates

| Gate | Status | Evidence / Owner |
| --- | --- | --- |
| Production database backup exists | Blocked | Required before overwriting current production. |
| Backup restore path verified | Pending |  |
| Redirect map approved | Blocked | Approve `docs/deployment/redirect-map.csv`. |
| Staging approved | Blocked | Requires stakeholder QA. |
| Forms verified in production-like environment | Blocked | Requires live API, DB, and email provider. |
| Analytics verified | Blocked | Requires approved production/test IDs. |
| Rollback documented | Complete | `docs/deployment/rollback-procedure.md`. |

## Technical Verification

| Check | Status | Evidence |
| --- | --- | --- |
| Lint | Pending | Run before final launch. |
| Typecheck | Pending | Run before final launch. |
| Unit tests | Pending | Run before final launch. |
| Production build | Pending | Run before final launch. |
| Playwright browser suite | Pending | Run before final launch. |
| Axe accessibility checks | Pending | Run before final launch. |
| Sitemap generated | Complete | `apps/web/src/app/sitemap.ts`. |
| Robots generated | Complete | `apps/web/src/app/robots.ts`. |
| Canonical URLs verified locally | Pending | Run Playwright with production `NEXT_PUBLIC_SITE_URL`. |
| Legacy redirects tested locally | Partial | Existing `/contact-us` test; full redirect map approval pending. |

## Launch Decision

Do not cut over DNS or overwrite the current production website yet.

Required next approvals:

1. Approve staging.
2. Approve redirect map.
3. Confirm production database backup.
4. Verify live forms and email delivery.
5. Verify analytics events and consent behavior.
6. Assign launch window and rollback owner.
