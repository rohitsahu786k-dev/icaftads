"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEventOnce, type AnalyticsEventName, type AnalyticsParams } from "@/lib/analytics";

type ViewTrackerProps = {
  event: Extract<AnalyticsEventName, "case_study_view" | "service_view">;
  params?: AnalyticsParams;
};

export function ViewTracker({ event, params = {} }: ViewTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    trackEventOnce(`${event}:${pathname}`, event, {
      ...params,
      path: pathname
    });
  }, [event, params, pathname]);

  return null;
}
