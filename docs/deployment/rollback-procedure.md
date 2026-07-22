# Rollback Procedure

## Rollback Triggers

Rollback or hold launch if any of these occur:

- Production form submissions fail.
- Analytics or consent implementation blocks critical page rendering.
- API returns sustained 5xx or `/ready` fails.
- DNS or HTTPS is misconfigured.
- High-value approved redirects fail.
- Unapproved placeholder content is visible.
- Admin route protection is broken.

## Frontend Rollback

1. Use Vercel deployment history to promote the last approved deployment.
2. Confirm `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_API_URL` still point to approved production values.
3. Verify homepage, contact page, sitemap, robots, canonical tags, and redirects.
4. Keep API and database unchanged unless the frontend release depends on incompatible API behavior.

## API Rollback

1. Use the managed Node host rollback or redeploy the last approved artifact/commit.
2. Do not rotate secrets during rollback unless compromise is suspected.
3. Verify `/health`, `/ready`, `/inquiries`, admin auth, and CORS from the production frontend.
4. Review logs for failed migrations or data writes before reopening forms.

## Database Rollback

Database restore is a last resort. Prefer code rollback first.

1. Stop writes if data corruption is suspected.
2. Snapshot current production before restoring.
3. Restore the latest known-good Atlas backup to a separate database when possible.
4. Validate restored data before switching `MONGODB_URI`.
5. Record data-loss window and affected content/leads.

## DNS Rollback

1. Repoint DNS to old production host if new infrastructure is unavailable.
2. Confirm old host still has valid HTTPS.
3. Keep redirect behavior documented because some users may have cached DNS.

## Rollback Report

After any rollback, record:

- Time detected.
- Trigger.
- Services affected.
- Deployment IDs before and after rollback.
- Data impact.
- Verification results.
- Follow-up fix owner.
