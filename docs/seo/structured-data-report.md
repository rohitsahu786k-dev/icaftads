# Phase 11 Structured-Data Report

Date: 2026-07-22

## Implemented JSON-LD

| Type             | Pages                          | Validation principle                                                                                                   |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `Organization`   | Global layout                  | Uses only brand name, URL, UAE/Dubai service area and contact type. No address or fake phone is included.              |
| `WebSite`        | Global layout                  | Identifies the site and publisher. No SearchAction is included because there is no approved search page.               |
| `BreadcrumbList` | Pages with visible breadcrumbs | Generated from the same breadcrumb data shown to users.                                                                |
| `Service`        | Service detail pages           | Uses service name, description, URL, provider and area served. No prices, ratings or unsupported results are included. |
| `Article`        | Insight detail pages           | Uses headline, description, section, URL, dates and organization author/publisher.                                     |

## Deliberately Excluded

| Type                         | Reason                                                                                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `LocalBusiness`              | Owner has not supplied a genuine UAE business location, business address, UAE phone number or office status.                                 |
| `Person`                     | No real named authors, bios or permission have been supplied. Articles currently use `I Craft Ads Editorial Team` as an organization author. |
| `Review` / `AggregateRating` | Testimonial permissions and review source details have not been confirmed.                                                                   |
| `Product` / offer schema     | Services do not have verified prices, offers or terms suitable for offer markup.                                                             |

## Rich Results Test Principles Applied

- Markup describes visible, indexable page content.
- No schema claims facts that are missing from owner-supplied evidence.
- Breadcrumb structured data matches visible breadcrumbs.
- Article dates and author information are visible on article pages.
- Placeholder case-study templates are noindexed and not included in the sitemap.

## Known Limitations

Structured data should be revisited after the owner supplies:

- Confirmed UAE office status and address.
- UAE phone number.
- Real author names and bios, if article `Person` schema is desired.
- Approved client testimonials and permission.
- Approved case studies with verified outcomes.
