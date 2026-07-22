# Project Risks

Revalidated on July 22, 2026 after reviewing the current repository state and live I Craft Ads pages.

## Highest Priority Risks

| Risk                                                                     | Severity | Why It Matters                                                                                                     | Mitigation                                                                                          |
| ------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Dubai/UAE office status is unconfirmed.                                  | High     | Publishing a local address, office or UAE entity claim without proof can damage trust and create legal/SEO issues. | Owner must confirm the exact UAE operating status before copy, schema or footer content is written. |
| Testimonials and client logos may lack permission.                       | High     | Unauthorized proof can create reputational or legal risk.                                                          | Collect written approval for every testimonial/logo/case study.                                     |
| Case-study results are missing.                                          | High     | A high-conversion agency site needs proof, but fake metrics are prohibited.                                        | Use process and service clarity until real results are supplied.                                    |
| Existing scaffold was created before the clarified discovery-only phase. | High     | Implementation may bias audit decisions or introduce unapproved content.                                           | Treat current code as provisional; do not continue implementation until Phase 2 approval.           |
| Existing Ahmedabad URLs conflict with Dubai positioning.                 | High     | New IA can lose existing SEO equity without redirects.                                                             | Create a redirect map from all current indexed URLs before launch.                                  |

## Content and Brand Risks

| Risk                                            | Severity | Why It Matters                                    | Mitigation                                                   |
| ----------------------------------------------- | -------- | ------------------------------------------------- | ------------------------------------------------------------ |
| Live copy has informal tone and grammar issues. | Medium   | Conflicts with premium Dubai positioning.         | Rewrite all copy from facts, not wording.                    |
| Some blog content is dated to 2023/2024.        | Medium   | Creates freshness and credibility issues in 2026. | Refresh, consolidate or archive outdated posts.              |
| Service list is fragmented and overlapping.     | Medium   | Makes buying journey unclear.                     | Consolidate into core service pillars.                       |
| No licensed Suisse fonts are present.           | Medium   | Typography requirement cannot be fulfilled yet.   | Use fallbacks until owner supplies WOFF2 files and licenses. |
| Existing logo/color files are missing locally.  | Medium   | Accent and visual identity cannot be confirmed.   | Owner supplies logo and brand files before UI design phase.  |

## Technical Risks

| Risk                                                       | Severity | Why It Matters                                          | Mitigation                                                                                      |
| ---------------------------------------------------------- | -------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| No Git repository in workspace.                            | High     | Hard to preserve unrelated changes or review history.   | Initialize Git or connect actual repository before further work.                                |
| No production form destination.                            | High     | Contact leads may be lost if launched prematurely.      | Confirm CRM/email/webhook/database path and test it.                                            |
| MongoDB/API environment variables missing.                 | Medium   | MERN backend cannot persist data without configuration. | Define env contract in a future phase.                                                          |
| Playwright full e2e script hung during cleanup on Windows. | Medium   | CI/local QA reliability may suffer.                     | Revisit Playwright config once implementation phase resumes.                                    |
| NPM audit reports upstream dependency advisories.          | Medium   | Security posture needs monitoring.                      | Re-run audit before deployment and update dependencies when non-breaking patches are available. |

## SEO Risks

| Risk                                    | Severity | Why It Matters                                                              | Mitigation                                                                           |
| --------------------------------------- | -------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Old URL structure uses Ahmedabad terms. | High     | Dubai-focused rewrite may create relevance mismatch and ranking volatility. | Redirect old URLs and write UAE pages naturally, without keyword stuffing.           |
| Full sitemap not audited.               | Medium   | Hidden URLs could be missed during migration.                               | Get CMS sitemap/export or run a complete crawler.                                    |
| Legal pages need review.                | High     | Privacy/cookie/contact forms require accurate legal basis.                  | Owner/legal counsel must provide approved privacy, terms, refund and cookie content. |
| Local SEO claims are unverified.        | High     | Google Business/Profile and LocalBusiness schema must reflect reality.      | Use Organization schema until actual UAE local business facts are verified.          |

## Prioritized Owner Question List

1. What is I Craft Ads' real Dubai/UAE operating status: registered UAE entity, physical office, partner office, remote service area or no local office?
2. What exact business address, if any, can be published for UAE/Dubai?
3. What official UAE phone/WhatsApp number should be used, and who receives inquiries?
4. Which services are currently active and strategically important for Dubai/UAE buyers?
5. Which existing client logos may be used publicly, and do you have written permission?
6. Which testimonials are approved for reuse, and may we edit them for clarity while preserving meaning?
7. Can you provide real case-study details: client, problem, scope, timeframe, outcome, metrics and approval?
8. Can you provide the original logo files and brand guidelines?
9. Can you provide licensed SuisseIntl and SuisseIntlCond WOFF2 files?
10. What analytics and ad tracking IDs should be installed?
11. Where should contact form submissions go: email, CRM, WhatsApp, database or webhook?
12. What are the official social profile URLs?
13. Should the blog be retained, refreshed, consolidated or removed?
14. Can you provide access to the password-protected portfolio page or approved portfolio exports?
15. Who will approve privacy policy, terms, refund policy, cookie notice and form consent language?

## Phase Gate

Do not begin Phase 2 implementation until the owner answers questions 1-7 and supplies or explicitly defers the missing brand/legal/analytics assets.
