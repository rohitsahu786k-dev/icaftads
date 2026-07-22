"use client";

export type AnalyticsEventName =
  | "strategy_call_click"
  | "contact_form_start"
  | "contact_form_submit"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "case_study_view"
  | "service_view"
  | "scroll_depth"
  | "outbound_link"
  | "form_error";

export type AnalyticsParams = Record<string, boolean | number | string | undefined>;

export type AnalyticsConfig = {
  clarityProjectId?: string | undefined;
  consentRequired: boolean;
  debug: boolean;
  enableClarity: boolean;
  enableMetaPixel: boolean;
  ga4MeasurementId?: string | undefined;
  googleAdsConversionLabel?: string | undefined;
  googleAdsId?: string | undefined;
  gtmId?: string | undefined;
  metaPixelId?: string | undefined;
};

const consentStorageKey = "icraft_analytics_consent";
const firedOnceKeys = new Set<string>();
let analyticsConfig: AnalyticsConfig = {
  consentRequired: false,
  debug: false,
  enableClarity: false,
  enableMetaPixel: false
};

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function configureAnalytics(config: AnalyticsConfig) {
  analyticsConfig = config;
}

export function getAnalyticsConsent() {
  if (typeof window === "undefined") return "unknown";
  return window.localStorage.getItem(consentStorageKey) ?? "unknown";
}

export function hasAnalyticsConsent() {
  return !analyticsConfig.consentRequired || getAnalyticsConsent() === "granted";
}

export function setAnalyticsConsent(value: "denied" | "granted") {
  window.localStorage.setItem(consentStorageKey, value);
}

export function trackEvent(event: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  if (analyticsConfig.consentRequired && getAnalyticsConsent() !== "granted") return;

  window.dataLayer = window.dataLayer ?? [];
  const payload = stripUndefined({ event, ...params });
  window.dataLayer.push(payload);

  window.gtag?.("event", event, stripUndefined(params));
  window.fbq?.("trackCustom", event, stripUndefined(params));
  window.clarity?.("event", event);

  if (
    event === "contact_form_submit" &&
    analyticsConfig.googleAdsId &&
    analyticsConfig.googleAdsConversionLabel
  ) {
    window.gtag?.("event", "conversion", {
      send_to: `${analyticsConfig.googleAdsId}/${analyticsConfig.googleAdsConversionLabel}`
    });
  }

  if (analyticsConfig.debug) {
    console.info("[analytics]", event, stripUndefined(params));
  }
}

export function trackEventOnce(
  key: string,
  event: AnalyticsEventName,
  params: AnalyticsParams = {}
) {
  if (firedOnceKeys.has(key)) return false;
  firedOnceKeys.add(key);
  trackEvent(event, params);
  return true;
}

export function resetAnalyticsForTests() {
  firedOnceKeys.clear();
  analyticsConfig = {
    consentRequired: false,
    debug: false,
    enableClarity: false,
    enableMetaPixel: false
  };
  if (typeof window !== "undefined") {
    window.dataLayer = [];
    delete window.gtag;
    delete window.fbq;
    delete window.clarity;
    window.localStorage.removeItem(consentStorageKey);
  }
}

function stripUndefined(params: AnalyticsParams & { event?: string }) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
}
