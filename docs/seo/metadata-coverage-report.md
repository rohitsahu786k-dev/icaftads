# Phase 11 Metadata Coverage Report

Date: 2026-07-22

## Implementation Scope

All indexable launch pages now use canonical metadata through `createPageMetadata()` in `apps/web/src/lib/seo.tsx`.

| URL                                                           | Indexing | Canonical | Metadata status | Notes                                                                           |
| ------------------------------------------------------------- | -------- | --------- | --------------- | ------------------------------------------------------------------------------- |
| `/`                                                           | Index    | Self      | Complete        | Homepage target for Dubai digital marketing agency positioning.                 |
| `/services`                                                   | Index    | Self      | Complete        | Service hub.                                                                    |
| `/services/seo-dubai`                                         | Index    | Self      | Complete        | Service metadata from approved service copy.                                    |
| `/services/ppc-google-ads-dubai`                              | Index    | Self      | Complete        | Service metadata from approved service copy.                                    |
| `/services/social-media-marketing-dubai`                      | Index    | Self      | Complete        | Service metadata from approved service copy.                                    |
| `/services/web-design-development-dubai`                      | Index    | Self      | Complete        | Service metadata from approved service copy.                                    |
| `/services/shopify-development-dubai`                         | Index    | Self      | Complete        | Service metadata from approved service copy.                                    |
| `/services/lead-generation-marketing-automation-dubai`        | Index    | Self      | Complete        | Service metadata from approved service copy.                                    |
| `/work`                                                       | Index    | Self      | Complete        | Work hub only; proof placeholders are not framed as results.                    |
| `/work/[caseStudySlug]`                                       | Noindex  | Self      | Complete        | Template route is intentionally noindex until real approved case studies exist. |
| `/about`                                                      | Index    | Self      | Complete        | Owner-confirmation gaps remain visible in copy.                                 |
| `/insights`                                                   | Index    | Self      | Complete        | Insights hub.                                                                   |
| `/insights/how-to-choose-a-digital-marketing-agency-in-dubai` | Index    | Self      | Complete        | Article metadata and Article JSON-LD.                                           |
| `/insights/seo-cost-dubai`                                    | Index    | Self      | Complete        | Article metadata and Article JSON-LD.                                           |
| `/insights/shopify-development-cost-dubai`                    | Index    | Self      | Complete        | Article metadata and Article JSON-LD.                                           |
| `/contact`                                                    | Index    | Self      | Complete        | Contact page.                                                                   |
| `/privacy-policy`                                             | Index    | Self      | Complete        | Legal copy still requires owner/legal approval.                                 |
| `/terms`                                                      | Index    | Self      | Complete        | Legal copy still requires owner/legal approval.                                 |
| `not-found.tsx`                                               | Noindex  | `/404`    | Complete        | Custom 404 metadata.                                                            |

## Social Metadata

- Open Graph title, description, URL, site name, locale, type and preview image are generated for every page using the shared metadata factory.
- Twitter summary-large-image metadata is generated for every page using the same preview visual.
- Preview image routes:
  - `/opengraph-image`
  - `/twitter-image`

## Known Limitations

- No `LocalBusiness` metadata is implemented because no genuine UAE business address or verified office status has been supplied.
- No named `Person` author schema is implemented because no real author identities and publication permissions have been supplied.
- Legal pages remain indexable because they are required launch routes, but final legal copy must be supplied before production approval.
