# UTM Conventions

Use lowercase values, hyphen-separated words, and stable names that can survive quarterly reporting.
Do not include personal data, phone numbers, email addresses, or client secrets in UTMs.

## Required Fields

| Parameter | Convention | Examples |
| --- | --- | --- |
| `utm_source` | Platform or publisher | `google`, `meta`, `linkedin`, `newsletter`, `partner-name` |
| `utm_medium` | Channel type | `cpc`, `paid-social`, `organic-social`, `email`, `referral` |
| `utm_campaign` | Business campaign name | `seo-audit-q1-2027`, `dubai-shopify-leads` |

## Optional Fields

| Parameter | Convention | Examples |
| --- | --- | --- |
| `utm_content` | Creative, placement, or variant | `hero-cta`, `case-study-link`, `video-a` |
| `utm_term` | Paid search keyword theme | `seo-agency-dubai`, `shopify-development` |

## Rules

1. Keep values lowercase ASCII with hyphens.
2. Reuse the same `utm_campaign` across channels only when the offer and reporting objective match.
3. Use `utm_content` to compare creative, CTA, audience, or placement variants.
4. Never put production analytics IDs, ad account IDs, emails, names, phone numbers, or raw search queries in UTMs.
5. Contact form submissions capture the landing page, referrer, and supported UTM fields for attribution.
