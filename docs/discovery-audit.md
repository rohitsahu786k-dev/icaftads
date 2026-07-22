# Discovery Audit

## Scope

This document audits the current `D:\icraft` repository, the live `https://icraftads.com/` website, the visible content/assets, and the four visual reference sites for Phase 1 discovery only.

Revalidated on July 22, 2026 after a fresh live check of the homepage, About, Services, Contact, Client, Blog and Portfolio pages.

No website implementation should continue until the owner answers the priority questions and supplies the missing assets listed in the related audit documents.

## Repository Audit

### Current State

- The workspace is a newly scaffolded Next.js App Router project, not an imported legacy repository.
- There is no `.git` repository in `D:\icraft`, so no commit history or existing tracked changes were available for comparison.
- Current technology present in `package.json`:
  - Next.js, React, TypeScript.
  - Express, Mongoose, Helmet, CORS and Dotenv.
  - Tailwind CSS via `@tailwindcss/postcss`.
  - GSAP, `@gsap/react`, Three.js, `@react-three/fiber`, `@react-three/drei`.
  - Zod, React Hook Form.
  - Vitest, Playwright, ESLint and Prettier.
- No `public` directory exists, so no local logo, image, video or font files are currently available in the repository.
- `docs/progress.md` exists from earlier scaffold work and should be superseded by this discovery set for Phase 1 governance.

### Current Local Implementation Risk

The current repository already contains a homepage scaffold and contact form. Because the user explicitly clarified that Phase 1 is discovery only, that implementation should be treated as provisional and not as approved website work.

Recommended action before Phase 2:

- Decide whether to keep, revert or archive the existing scaffold.
- Initialize Git before further work.
- Add a clear phase gate in `docs/progress.md` or a new project plan to prevent implementation before owner confirmation.

## Live Website Audit

### Platform and Apparent Structure

The live site appears to be a WordPress-style marketing site with pages for Home, About, Services, Contact, Blog, Client, Portfolio and legal/policy links.

Discovered URLs:

- `/`
- `/aboutus-digital-marketing-agency-ahmedabad/`
- `/services-digital-marketing-agency-ahmedabad/`
- `/contact-us/`
- `/blog-digital-marketing-insights/`
- `/client/`
- `/portfolio/`
- Footer/legal or utility links discovered:
  - Privacy Policy
  - Refund Policy
  - Terms & Condition
  - Sitemap
  - Free Tools
  - Career
  - Billing, present on some pages

The portfolio page is password-protected and cannot be audited for case studies without owner access.

### Existing Positioning

The live home page presents I Craft Ads as a digital marketing and web design agency in Ahmedabad, India, with claimed presence in the UAE, Europe, Australia and the USA. It states services around SEO, branding, web development, ecommerce, Shopify/D2C, automation and marketing.

For the new Dubai/UAE-focused website, the Ahmedabad base can be retained only if strategically useful. The UAE presence requires owner confirmation before being represented as an office, local entity or local team.

### Existing Services

Services discovered on the home and services pages:

- Shopify.
- Digital marketing.
- Social media management.
- Search engine optimization.
- Marketing automation.
- Email marketing.
- PPC.
- Website development.
- Lead generation campaign.
- Branding.
- Company profile designing.
- Digital visiting card.
- Brand identity.
- Sales landing page.
- WordPress website.
- WooCommerce.
- Shopify development.
- Brand positioning for social media.
- WhatsApp marketing automation.
- Email marketing automation.
- Performance marketing.
- Google Ads.
- SEO.

Recommended service architecture for future phases:

- Merge overlapping labels into clearer service groups.
- Preserve Shopify/D2C, SEO, paid media, website development, social media and automation as core offers.
- Confirm whether branding, company profile design, visiting card and WooCommerce are still active services before including them.

### Contact and Office Information

The contact page claims offices in Ahmedabad and London, and its visible location section lists Ahmedabad Head Office, Indore Branch Office and Chandigarh Branch Office. No actual address, phone number or UAE contact information was visible in the audited text.

Do not publish a Dubai office, UAE phone number or UAE address until the owner confirms it.

### Existing Claims Audit

| Claim                                                                                                                | Source Location     | Classification                          | Notes                                                                            |
| -------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------- | -------------------------------------------------------------------------------- |
| I Craft Ads is a digital marketing and web design agency in Ahmedabad, India.                                        | Home/About          | Verified and reusable                   | Reusable if owner confirms current company positioning still includes Ahmedabad. |
| The company has presence in the UAE, Europe, Australia and USA.                                                      | Home/About          | Requires owner confirmation             | Presence type is unclear: clients, staff, entity, market served or office.       |
| Services include SEO, branding, web development and ecommerce solutions.                                             | Home/About/Services | Verified and reusable                   | Service existence is visible on site. Still confirm current priorities.          |
| Team includes seasoned professionals from global IT companies.                                                       | Home                | Requires owner confirmation             | No names, employment history or proof supplied.                                  |
| Delivers measurable results.                                                                                         | Home                | Requires owner confirmation             | No metrics/case evidence visible.                                                |
| Customer-first approach.                                                                                             | Home                | Verified and reusable as value language | This is positioning language, not a hard factual claim. Rewrite more precisely.  |
| Shopify and D2C ecommerce setup, upsells/cross-sells, apps and automation.                                           | Home                | Verified and reusable                   | Offered on site; confirm current scope and examples.                             |
| Agency helps brands scale faster.                                                                                    | Home                | Requires owner confirmation             | Outcome claim needs evidence or softer wording.                                  |
| SEO services drive qualified traffic and reduce CAC long term.                                                       | Home                | Requires owner confirmation             | Performance claim needs data or should be rewritten as intent/process.           |
| Uses creative design, sophisticated AI tools and top-tier platforms for social identity.                             | Home/Services       | Requires owner confirmation             | AI/platform/tooling claims should be confirmed.                                  |
| Systems and processes are battle-tested.                                                                             | Home/Services       | Requires owner confirmation             | Vague credibility claim; avoid unless supported.                                 |
| Full-service agency focused on strategy, media, design, content and technology.                                      | Home                | Verified and reusable as positioning    | The service mix supports this broad positioning.                                 |
| Campaign Cost, Projects, Client Served, Experience, Countries counters.                                              | Home/About          | Should not be reused                    | Counter labels are visible but numeric values are absent in audited text.        |
| Client testimonials from named customers/businesses.                                                                 | Home                | Requires owner confirmation             | Visible, but permission, freshness and exact attribution must be confirmed.      |
| Offices are located in Ahmedabad and London.                                                                         | Contact             | Requires owner confirmation             | Conflicts with visible branch list and target Dubai positioning.                 |
| Ahmedabad Head Office, Indore Branch Office, Chandigarh Branch Office.                                               | Contact             | Requires owner confirmation             | No addresses visible; confirm current operating locations.                       |
| Portfolio exists.                                                                                                    | Portfolio           | Verified and reusable                   | Page exists but is password-protected. Content unavailable.                      |
| Blog posts include Shopify/WooCommerce, performance marketing, Shopify UX, 2024 trends, AI marketing and SEO topics. | Blog                | Verified and reusable                   | Existing blog structure can inform redirects or content migration.               |
| "2023" and "2024" blog trend references.                                                                             | Blog/Home           | Outdated                                | Must refresh or archive for a 2026 site.                                         |
| Footer copyright shows 2024 on some pages and 2025 on others.                                                        | Footer              | Outdated                                | Replace with current year after legal review.                                    |
| Copyright and legal policy pages exist.                                                                              | Footer              | Verified and reusable as URL existence  | Policy content still needs legal review before migration.                        |

## Visual and Brand Asset Audit

### Logo

- The live site exposes logo images with alt text similar to `70x27-01`.
- No logo files exist locally.
- Existing logo colors could not be reliably extracted from the text audit alone.

Owner must supply:

- Original logo files in SVG/PNG.
- Brand color values if defined.
- Usage rules or brand guideline files, if any.

### Images and Videos

Live site image labels indicate:

- Logo assets.
- About-page illustrative/person assets.
- Client logo image grid.
- Portfolio content behind password protection.

No videos were found in the text audit. No image or video files exist locally.

### Fonts

- No licensed SuisseIntl or SuisseIntlCond WOFF2 files are present locally.
- No font files were found in the repository.
- The new project must not download fonts from unofficial sources.

## SEO and Redirect Audit

### Existing URL Structure That May Require Redirects

If the new site uses clean Dubai-focused paths, preserve SEO equity with redirects from:

- `/aboutus-digital-marketing-agency-ahmedabad/` to the new About page.
- `/services-digital-marketing-agency-ahmedabad/` to the new Services index.
- `/blog-digital-marketing-insights/` to the new Blog index if blog is retained.
- `/client/` to Clients/Proof or a case-study page if client permissions are confirmed.
- `/portfolio/` to Work/Case Studies if owner unlocks and approves content.
- Individual service pages linked from the services page, including Company Profile Designing, Visiting Card, Brand Identity, Sales Landing Page, WordPress Website, WooCommerce, Shopify Development, Brand Positioning, WhatsApp Automation, Email Marketing Automation, Performance Marketing, Google Ads and SEO.
- Legal pages: Privacy Policy, Refund Policy, Terms & Condition.
- Utility pages: Free Tools, Career, Billing.

### SEO Issues Found

- Ahmedabad-heavy URLs conflict with the desired Dubai/UAE focus.
- Some visible copy contains grammar and spelling issues, including "Client Serverd" and "Performance Markeitng".
- Blog references to 2023 and 2024 are dated for a 2026 project.
- Portfolio proof is inaccessible.
- Client logos and testimonials need permission and freshness confirmation.
- Sitemap could not be fully audited from the browser tool and needs a crawl/export from the owner or CMS.

## Sources

- `https://icraftads.com/`
- `https://icraftads.com/aboutus-digital-marketing-agency-ahmedabad/`
- `https://icraftads.com/services-digital-marketing-agency-ahmedabad/`
- `https://icraftads.com/contact-us/`
- `https://icraftads.com/blog-digital-marketing-insights/`
- `https://icraftads.com/client/`
- `https://icraftads.com/portfolio/`
