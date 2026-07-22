# Migration Runbook

## Hard Stop Gates

Do not overwrite the current production website until all of these are complete:

- Database backup exists and restore path is understood.
- Redirect map is approved.
- Staging is approved.
- Forms are verified end to end.
- Analytics is verified.
- Rollback is documented.

## Content Import

1. Import only owner-approved pages, case studies, testimonials, team entries, media, and legal copy.
2. Do not import placeholder proof, fake client logos, unverified results, or unattributed testimonials.
3. Validate every imported slug against the sitemap and redirect map.
4. Confirm media alt text, image ownership, and client permissions.
5. Confirm draft content remains unpublished in production.

## Old URL Preservation

1. Export old production URLs from the current CMS, server logs, Search Console, and sitemap.
2. Compare export with `docs/deployment/redirect-map.csv`.
3. Add any missing high-value URLs before staging approval.
4. Approve each redirect as `approved` in the map.
5. Test every approved redirect returns a single 301 to a live destination.

## Pre-Cutover Validation

- `/sitemap.xml` returns 200 and includes canonical live URLs.
- `/robots.txt` returns 200 and points to the live sitemap.
- Canonical tags use the final production domain.
- Important legacy URLs return 301.
- Contact form creates an inquiry and triggers the approved notification path.
- Analytics events appear once in GA4/GTM debug views.
- Uptime monitors are active for web, `/health`, and `/ready`.
- Error monitoring is receiving release/environment data.

## Launch Window

1. Announce content freeze.
2. Take final production database backup.
3. Deploy API.
4. Deploy frontend.
5. Validate production URLs through provider domain.
6. Switch DNS only after validation passes.
7. Verify HTTPS, redirects, forms, analytics, sitemap, robots, and admin access.
8. Keep old production host available until monitoring is stable.

## Post-Launch

- Submit sitemap in Search Console.
- Watch uptime and error monitoring for at least 60 minutes.
- Check form submissions and email delivery.
- Check crawl errors and redirect misses daily for the first week.
- Add redirect-map updates for any old URLs discovered after launch.
