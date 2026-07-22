# Phase 11 Broken-Link Report

Date: 2026-07-22

## Method

Internal links were validated with Playwright against rendered pages:

- `/`
- `/services`
- `/work`
- `/insights`
- `/contact`

The SEO validation test collects same-site links from these core pages and requests each URL.

## Result

No broken internal links were found in the validated launch navigation and core page links.

## Redirect Validation

The middleware implements selected legacy redirects with HTTP 301 status:

| Legacy URL                                     | Destination       |
| ---------------------------------------------- | ----------------- |
| `/aboutus-digital-marketing-agency-ahmedabad`  | `/about`          |
| `/services-digital-marketing-agency-ahmedabad` | `/services`       |
| `/contact-us`                                  | `/contact`        |
| `/blog-digital-marketing-insights`             | `/insights`       |
| `/client`                                      | `/work`           |
| `/portfolio`                                   | `/work`           |
| `/terms-condition`                             | `/terms`          |
| `/terms-and-condition`                         | `/terms`          |
| `/refund-policy`                               | `/privacy-policy` |
| `/sitemap`                                     | `/sitemap.xml`    |
| `/career`                                      | `/about`          |
| `/free-tools`                                  | `/insights`       |
| `/category/*`                                  | `/insights`       |
| `/tag/*`                                       | `/insights`       |
| `/author/*`                                    | `/about`          |

## Known Limitations

- The broad legacy `/services/*` redirect from the architecture document was not implemented because the new service routes also live under `/services/*`; a broad redirect would break current service pages.
- External social/profile links are not validated because real approved social URLs have not been supplied.
