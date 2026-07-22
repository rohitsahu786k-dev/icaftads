"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  configureAnalytics,
  getAnalyticsConsent,
  hasAnalyticsConsent,
  setAnalyticsConsent,
  trackEvent,
  trackEventOnce,
  type AnalyticsConfig,
  type AnalyticsEventName
} from "@/lib/analytics";

type AnalyticsProviderProps = {
  config: AnalyticsConfig;
};

const scrollThresholds = [25, 50, 75, 90] as const;

export function AnalyticsProvider({ config }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const [consent, setConsent] = useState("unknown");
  const normalizedConfig = useMemo(() => config, [config]);

  useEffect(() => {
    configureAnalytics(normalizedConfig);
    setConsent(getAnalyticsConsent());
  }, [normalizedConfig]);

  useEffect(() => {
    if (!hasAnalyticsConsent()) return;
    installVendorScripts(normalizedConfig);
  }, [consent, normalizedConfig]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const linkText = anchor.textContent?.trim().replace(/\s+/g, " ").slice(0, 120);
      const trackedEvent = anchor.dataset.analyticsEvent as AnalyticsEventName | undefined;

      if (trackedEvent) {
        trackEvent(trackedEvent, {
          link_text: linkText,
          link_url: anchor.href,
          path: pathname
        });
      }

      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_url: href, path: pathname });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_url: href, path: pathname });
      } else if (isWhatsappLink(href)) {
        trackEvent("whatsapp_click", { link_url: anchor.href, path: pathname });
      } else if (isOutboundLink(anchor)) {
        trackEvent("outbound_link", {
          link_text: linkText,
          link_url: anchor.href,
          path: pathname
        });
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const depth = Math.round(((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100);
      for (const threshold of scrollThresholds) {
        if (depth >= threshold) {
          trackEventOnce(`scroll_depth:${pathname}:${threshold}`, "scroll_depth", {
            path: pathname,
            percent: threshold
          });
        }
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!normalizedConfig.consentRequired || consent !== "unknown") return null;

  return (
    <div className="analytics-consent" role="region" aria-label="Analytics consent">
      <p>
        We use analytics to understand which services and contact paths are useful. Optional tags
        load only after consent.
      </p>
      <div className="analytics-consent-actions">
        <button
          type="button"
          onClick={() => {
            setAnalyticsConsent("denied");
            setConsent("denied");
          }}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => {
            setAnalyticsConsent("granted");
            setConsent("granted");
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

function installVendorScripts(config: AnalyticsConfig) {
  window.dataLayer = window.dataLayer ?? [];

  if (config.gtmId) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    injectScript("icraft-gtm", `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtmId)}`);
  }

  if (config.ga4MeasurementId || config.googleAdsId) {
    const gtagId = config.ga4MeasurementId ?? config.googleAdsId;
    if (gtagId) {
      window.gtag =
        window.gtag ??
        function gtagShim(...args: unknown[]) {
          window.dataLayer = window.dataLayer ?? [];
          window.dataLayer.push(args);
        };
      injectScript("icraft-gtag", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gtagId)}`);
      window.gtag("js", new Date());
      if (config.ga4MeasurementId) {
        window.gtag("config", config.ga4MeasurementId, { send_page_view: true });
      }
      if (config.googleAdsId) {
        window.gtag("config", config.googleAdsId);
      }
    }
  }

  if (config.enableClarity && config.clarityProjectId) {
    window.clarity =
      window.clarity ??
      function clarityShim(...args: unknown[]) {
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push({ event: "clarity_queued", args });
      };
    injectInlineScript(
      "icraft-clarity",
      `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${escapeInline(config.clarityProjectId)}");`
    );
  }

  if (config.enableMetaPixel && config.metaPixelId) {
    injectInlineScript(
      "icraft-meta-pixel",
      `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","${escapeInline(config.metaPixelId)}");fbq("track","PageView");`
    );
  }
}

function injectScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.async = true;
  script.id = id;
  script.src = src;
  document.head.appendChild(script);
}

function injectInlineScript(id: string, source: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.text = source;
  document.head.appendChild(script);
}

function isOutboundLink(anchor: HTMLAnchorElement) {
  if (!anchor.href.startsWith("http")) return false;
  return new URL(anchor.href).origin !== window.location.origin;
}

function isWhatsappLink(href: string) {
  return (
    href.startsWith("whatsapp:") ||
    href.includes("wa.me/") ||
    href.includes("api.whatsapp.com/") ||
    href.includes("web.whatsapp.com/")
  );
}

function escapeInline(value: string) {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("<", "\\u003c");
}
