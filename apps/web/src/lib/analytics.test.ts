import { beforeEach, describe, expect, it } from "vitest";
import {
  configureAnalytics,
  resetAnalyticsForTests,
  trackEvent,
  trackEventOnce
} from "@/lib/analytics";

describe("analytics events", () => {
  beforeEach(() => {
    resetAnalyticsForTests();
    configureAnalytics({
      consentRequired: false,
      debug: false,
      enableClarity: false,
      enableMetaPixel: false
    });
  });

  it("pushes analytics events to the dataLayer", () => {
    trackEvent("strategy_call_click", { path: "/" });

    expect(window.dataLayer).toEqual([{ event: "strategy_call_click", path: "/" }]);
  });

  it("guards once-only events against duplicate route effects", () => {
    const first = trackEventOnce("service_view:/services/seo-dubai", "service_view", {
      path: "/services/seo-dubai"
    });
    const second = trackEventOnce("service_view:/services/seo-dubai", "service_view", {
      path: "/services/seo-dubai"
    });

    expect(first).toBe(true);
    expect(second).toBe(false);
    expect(window.dataLayer).toEqual([
      { event: "service_view", path: "/services/seo-dubai" }
    ]);
  });
});
