# I Craft Ads Website Progress

## Phase 1 - Foundation and Homepage Shell

Status: Complete

### Scope

- Scaffold a Next.js App Router project with TypeScript.
- Add Tailwind CSS with modular custom CSS.
- Add GSAP, reduced-motion handling and a dynamic WebGL hero component.
- Add Express, Mongoose, Zod and contact inquiry validation scaffolding.
- Rewrite factual I Craft Ads content for a Dubai/UAE positioning without invented claims.
- Add baseline unit and end-to-end test coverage.

### Source Notes

- Existing site identifies I Craft Ads as a digital marketing and web design agency in Ahmedabad with a presence in the UAE, Europe, Australia and the USA.
- Existing services include Shopify, digital marketing, social media management, SEO, marketing automation, email marketing, PPC, website development and lead generation.
- Testimonials are present from Veena Muddap, Jabuca Dakor, PJ and other ecommerce/business owners. Phase 1 uses a small rewritten subset and avoids adding metrics or claims.
- Visual reference takeaways: strong editorial rhythm, case-led structure, bold condensed type, motion used as polish, clear service navigation and confident calls to action.

### Decision Log

- Use `#d6a34a` as the initial brand accent because it harmonizes with the warm gold tone visible in the current brand direction and works against black.
- Preserve `@font-face` structure for Suisse font files, but rely on system fallbacks until licensed WOFF2 assets are supplied.
- Keep animations progressive-enhancement only. Core HTML content is visible and meaningful without JavaScript.
- Use a local Next API route for the first contact form path and keep a separate Express/Mongoose API scaffold ready for MERN expansion.
- Do not publish fake case-study metrics, Dubai addresses, awards, clients or performance outcomes.

### Known Phase 1 Limits

- Licensed Suisse font files are not present yet.
- MongoDB persistence is scaffolded for the Express API, but no production `MONGODB_URI` is configured.
- Case studies, service detail pages, blog templates, sitemap generation, schema markup expansion and final animation polish remain future phases.
- On Windows, `npm run e2e` reached both configured Playwright projects but hung during final cleanup. Targeted Chromium and mobile Playwright runs passed against a manually started dev server.

## Phase 7 - Express API, Database and Admin CMS

Status: Complete

### Scope

- Added Mongoose-backed CMS models for services, case studies, blog articles, testimonials, team members, site settings, SEO metadata and redirects.
- Added admin authentication with bcrypt password hashing and signed HTTP-only cookies.
- Added role-aware admin middleware, protected CMS routes and private lead routes.
- Added Zod validation, slug uniqueness checks, draft/published/scheduled content filtering, HTML sanitisation, pagination and filtering.
- Extended leads with UTM attribution and spam-check metadata while keeping lead content out of public routes.
- Added verified-content-only seed data with incomplete testimonial proof clearly labelled.
- Added API integration tests for admin protection, slug conflict handling, sanitisation, public draft hiding, public publication and private lead access.

### Known Phase 7 Limits

- Spam protection is wired as a hook with an unchecked verdict; a real provider token verification still needs owner/provider configuration.
- Admin user management beyond first-owner bootstrap is not exposed yet.
- Media upload/storage is not implemented; schemas are ready for verified image metadata and alt text.
- Production deployment still needs real secrets, MongoDB URI, CORS origins and form/notification destination.

## Phase 8 - Global UI and Homepage

Status: Complete

### Scope

- Replaced the temporary homepage shell with a responsive, semantic homepage.
- Added accessible global header, desktop services mega menu, no-JS mobile navigation, location strip and footer.
- Built homepage sections for hero, trust rail, outcome signals, service grid, selected work proof slots, Dubai market context, process, testimonials, insights and final CTA.
- Avoided fake logo carousels, fake counters, fabricated case studies, fake reviews, unsupported WhatsApp links and invented contact details.
- Preserved local Suisse font loading with fallback fonts until licensed WOFF2 files are supplied.
- Added production-safe browser checks through `playwright.local.config.ts` for manually started dev/production servers.

### Known Phase 8 Limits

- Licensed Suisse font files are still missing, so local checks use fallback fonts and report expected font 404s in dev.
- Case-study cards, testimonial cards, client logos, metrics and contact details remain proof-labelled until owner approval.
- Homepage animation has not been implemented yet; Phase 8 prioritises visual hierarchy, semantic HTML and responsive interface.

## Phase 9 - Services, Work, Insights and Contact

Status: Complete

### Scope

- Built the services hub and all approved service pages with unique H1s, introductions, commercial context, deliverables, method, proof requirements, case-study slots, FAQs, related services, CTAs, breadcrumbs and metadata.
- Built proof-safe work hub and case-study template routes without fabricated clients, metrics, screenshots or testimonials.
- Built insights hub and article template pages for approved priority topics without invented search volume, cost ranges or market statistics.
- Built the contact page and React Hook Form inquiry form with fields for name, work email, phone with country code, company, website, required services, approximate budget, timeline, message and consent.
- Extended lead validation and API storage to capture required services, budget, timeline, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, landing page and referrer.
- Added browser coverage for service pages, proof-safe templates and contact fields.

### Known Phase 9 Limits

- Service proof sections still require owner-supplied case studies, verified results, approved media and testimonial permissions.
- The contact form posts to `NEXT_PUBLIC_API_URL`; production still needs the real API deployment, database, notification path and legal-reviewed consent copy.
- Branding remains available as a contact-form service interest only; no public branding service page was built because the service status and proof are still conditional.

## Phase 10 - Motion and Three.js Experience

Status: Complete

### Scope

- Added progressive GSAP motion for navigation entrance, hero headline line reveal, section reveals, desktop pinned services narrative, case-study card masking, large-screen horizontal work movement, limited parallax, magnetic desktop CTA buttons, footer reveal and route transitions.
- Added a dynamically imported Three.js hero visual representing scattered marketing signals organising into a business-growth system.
- Preserved indexable HTML copy outside the canvas and kept the existing static proof panel visible.
- Added WebGL failure detection, reduced-motion fallback, static fallback artwork, intersection-based render pausing, capped DPR and reduced mobile particle count.
- No metric count-up was implemented because no verified metrics exist yet.

### Performance Budgets

- Motion budget: no scroll hijacking, no more than one pinned desktop narrative active in a viewport, and no scrubbed animation on reduced-motion devices.
- Frame-rate target: maintain roughly 55-60 FPS on desktop and 45+ FPS on mobile during the hero animation.
- WebGL budget: cap device pixel ratio at 1.5, use 144 particles on desktop and 68 on mobile, avoid textures, and dispose custom geometries on unmount.
- Bundle budget: keep the initial homepage route near the existing baseline by dynamically importing the WebGL scene; Three.js/R3F should stay out of the first server-rendered HTML path.

### Known Phase 10 Limits

- Mobile performance was profiled through Playwright/browser timing and canvas checks, not through a physical low-end Android device.
- The hero visual uses generated geometry and static CSS fallback only; final brand-approved media assets are still unavailable.
- Advanced page transitions remain subtle to avoid blocking navigation or hiding content.

## Phase 11 - Technical and On-Page SEO

Status: Complete

### Scope

- Added shared metadata, canonical, Open Graph, Twitter and robots helpers for all launch pages.
- Added global `Organization` and `WebSite` JSON-LD, visible breadcrumb-linked `BreadcrumbList` JSON-LD, `Service` JSON-LD for service pages and `Article` JSON-LD for insights.
- Added dynamic `sitemap.xml`, `robots.txt`, RSS feed for insights and generated social preview image routes.
- Added middleware for true HTTP 301 legacy redirects and `X-Robots-Tag` noindex headers on admin, preview, search and filter-style URLs.
- Kept placeholder case-study detail pages noindexed until approved client proof exists.
- Added Playwright SEO validation for metadata coverage, structured data, crawl infrastructure, redirects, noindex rules and internal link resolution.
- Added Phase 11 SEO reports for metadata coverage, broken links, orphan pages, structured data and final keyword-to-URL mapping.

### Known Phase 11 Limits

- `LocalBusiness` schema is not implemented because the owner has not supplied a genuine UAE office status, business address or UAE phone number.
- `Person` schema is not implemented because no real named authors, bios or permissions have been supplied.
- Review/rating schema is not implemented because testimonial permission and source details are still pending.
- Legal pages still require final owner/legal-approved privacy, retention, analytics and terms copy.
- The old broad `/services/*` redirect was not implemented because it would collide with the new approved `/services/...` URL structure.
