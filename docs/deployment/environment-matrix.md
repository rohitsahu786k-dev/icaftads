# Environment Matrix

Production values must be configured in hosting provider secret stores only. Do not commit real
domains, passwords, API keys, analytics IDs, database URIs, SMTP credentials, or monitoring DSNs.

## Staging

| Area | Variable / Setting | Required Value |
| --- | --- | --- |
| Web hosting | Vercel project | Staging preview or staging project connected to protected branch. |
| Web URL | `NEXT_PUBLIC_SITE_URL` | Staging HTTPS URL. |
| API URL | `NEXT_PUBLIC_API_URL` | Staging API HTTPS URL. |
| API hosting | Node service | Staging service with build command `pnpm --filter @icraftads/api build`. |
| API runtime | `NODE_ENV` | `production` for production-like behavior. |
| API runtime | `API_PORT` | Provider-assigned port or `4000` when required by host. |
| API CORS | `CORS_ORIGINS` | Staging web URL only, plus approved preview URLs if needed. |
| Database | `MONGODB_URI` | Staging Atlas cluster or staging database. |
| Admin auth | `ADMIN_JWT_SECRET` | Unique 32+ character staging secret. |
| Admin cookie | `ADMIN_COOKIE_NAME` | Environment-specific cookie name, for example `icraft_admin_staging`. |
| Analytics | Public analytics env vars | Use test streams or blank values. |
| Consent | `NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED` | Match legal requirements for target market. |

## Production

| Area | Variable / Setting | Required Value |
| --- | --- | --- |
| Web hosting | Vercel project | Production project or production environment on approved branch/tag. |
| Web URL | `NEXT_PUBLIC_SITE_URL` | Final canonical HTTPS domain. |
| API URL | `NEXT_PUBLIC_API_URL` | Final API HTTPS domain. |
| API hosting | Managed Node hosting | Production service with automatic restarts and deploy rollback. |
| API runtime | `NODE_ENV` | `production`. |
| API CORS | `CORS_ORIGINS` | Final web origin only unless a staging/preview exception is explicitly approved. |
| Database | `MONGODB_URI` | Production Atlas cluster/database. |
| Database backups | Atlas backups | Enabled and tested before launch. |
| Admin auth | `ADMIN_JWT_SECRET` | Unique production secret; never reuse staging. |
| Media | Cloudinary or approved object storage/CDN | Production cloud/account, folder isolation, upload policy documented. |
| Email | Approved transactional provider | Production sender domain verified, SPF/DKIM/DMARC aligned. |
| Analytics | Public analytics env vars | Approved production IDs only after analytics QA passes. |
| Monitoring | Uptime and error monitoring | Production monitors enabled before DNS cutover. |

## Secret Rotation

Rotate immediately if a secret is exposed, copied into source control, shared in chat, or used in
the wrong environment. After rotation, redeploy the affected service and verify `/health`, `/ready`,
admin auth, and contact form submission.
