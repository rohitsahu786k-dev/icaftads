# Monitoring Plan

## Uptime Monitoring

Configure monitors before DNS cutover.

| Target | Expected Result | Alert Priority |
| --- | --- | --- |
| `https://<production-domain>/` | 200 within provider threshold | Critical |
| `https://<production-domain>/contact` | 200 | High |
| `https://<api-domain>/health` | 200 with `ok: true` | Critical |
| `https://<api-domain>/ready` | 200 with database `connected` | Critical |
| `https://<production-domain>/sitemap.xml` | 200 XML | Medium |
| `https://<production-domain>/robots.txt` | 200 text | Medium |

Recommended alert channels: email plus an operational chat channel. Escalate critical alerts if not
acknowledged within 10 minutes during launch.

## Error Monitoring

Use an approved provider such as Sentry, Rollbar, Bugsnag, or the hosting provider's native error
monitoring. Configure separate staging and production projects.

Minimum tags:

- service: `web` or `api`
- environment: `staging` or `production`
- release: git commit SHA or deployment ID
- route or endpoint when available

## Logs

- API logs must include process start, database connection failure, unhandled errors, and rate-limit events.
- Do not log secrets, cookies, authorization headers, full form messages, or raw personal data.
- Keep production logs retained long enough for launch investigation and legal requirements.

## Launch Watch

Monitor for:

- 5xx responses on web or API.
- `/ready` failures.
- Contact form 422/429/503 spikes.
- CSP violations after analytics IDs are enabled.
- Unexpected noindex headers.
- Redirect loops or high 404 volume.
