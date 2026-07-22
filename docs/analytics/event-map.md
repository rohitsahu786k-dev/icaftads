# Analytics Event Map

All analytics IDs are controlled by public environment variables. Keep production IDs out of source
control and set them only in the deployment platform.

## Environment Variables

| Variable | Purpose | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container | Optional. Example format: `GTM-XXXXXXX`. |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | GA4 web stream | Optional. Example format: `G-XXXXXXXXXX`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console verification meta tag | Optional. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag ID | Optional. Example format: `AW-XXXXXXXXXX`. |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Contact conversion label | Optional. Used on `contact_form_submit`. |
| `NEXT_PUBLIC_ENABLE_CLARITY` | Enables Microsoft Clarity | Must be `true` and have a project ID. Requires approval. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity project ID | Optional. Do not commit production value. |
| `NEXT_PUBLIC_ENABLE_META_PIXEL` | Enables Meta Pixel | Must be `true` and have a pixel ID. Requires approval. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID | Optional. Do not commit production value. |
| `NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED` | Shows consent banner and blocks analytics until accepted | Set per legal/privacy requirements. |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | Logs events in the browser console | Use only for QA. |

## Events

| Event | Trigger | Key Params | Duplicate Rule |
| --- | --- | --- | --- |
| `strategy_call_click` | Marked strategy/contact CTA link click | `path`, `link_text`, `link_url` | Fires once per click. |
| `contact_form_start` | First focus inside the contact form | `form_id` | Fires once per form session. |
| `contact_form_submit` | Successful inquiry API response | `form_id`, `service_interest` | Fires after success only. Also sends Google Ads conversion when configured. |
| `phone_click` | Any `tel:` link click | `path`, `link_url` | Fires once per click. |
| `whatsapp_click` | WhatsApp URL click | `path`, `link_url` | Fires once per click. |
| `email_click` | Any `mailto:` link click | `path`, `link_url` | Fires once per click. |
| `case_study_view` | Case-study detail route render | `path`, `case_study`, `case_study_title` | One-time key: event plus pathname. |
| `service_view` | Service detail route render | `path`, `service`, `service_title` | One-time key: event plus pathname. |
| `scroll_depth` | Page scroll reaches 25, 50, 75, or 90 percent | `path`, `percent` | One-time key: pathname plus threshold. |
| `outbound_link` | External HTTP(S) link click | `path`, `link_text`, `link_url` | Fires once per click. |
| `form_error` | Validation or API submission error | `form_id`, `error_type`, `error_fields` | Fires each error occurrence. |

## Destinations

The runtime always uses `dataLayer` as the common event bus when consent allows analytics. If GA4,
GTM, Meta Pixel, Clarity, or Google Ads IDs are configured, the same event is forwarded to the
corresponding vendor API. Optional third-party tags are not loaded unless their enable flag and ID
are present.
