# Analytics QA Checklist

## Environment

- Confirm production IDs are set only in the deployment environment.
- Confirm `.env.example` contains placeholders or blanks, never real IDs.
- Confirm Microsoft Clarity is enabled only after approval.
- Confirm Meta Pixel is enabled only after approval.
- Confirm `NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED=true` in jurisdictions or campaigns that require prior consent.

## Browser QA

- Open DevTools and confirm no vendor script loads when its ID or enable flag is missing.
- With consent required, confirm no analytics events or vendor scripts load before accepting.
- Accept consent and confirm configured scripts load once.
- Click each strategy CTA and confirm one `strategy_call_click`.
- Focus the contact form and confirm one `contact_form_start`.
- Submit invalid form data and confirm one `form_error` with validation fields.
- Submit a valid form in a connected environment and confirm one `contact_form_submit`.
- Click phone, WhatsApp, email, and outbound links when available and confirm matching events.
- Visit service detail pages and confirm one `service_view` per route render.
- Visit case-study detail pages and confirm one `case_study_view` per route render.
- Scroll each major template and confirm `scroll_depth` at 25, 50, 75, and 90 percent only once per path.

## Next.js Navigation

- Navigate to `/services/seo-dubai`, then client-navigate away and back.
- Confirm the `service_view` event is not duplicated by hydration, React strict effects, or route transitions.
- Run the Playwright analytics test:

```bash
corepack pnpm --filter @icraftads/web e2e -- tests/e2e/analytics.spec.ts
```

## Release Checks

- Run lint, typecheck, unit tests, Playwright, and production build before release.
- Use Tag Assistant, GA4 DebugView, Clarity dashboard, Meta Pixel Helper, and Google Ads diagnostics only with approved IDs.
- Confirm CSP reports do not block approved analytics hosts.
- Confirm legal copy and privacy policy describe enabled analytics and consent behavior.
