"use client";

import type gsapType from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

let motionPromise:
  | Promise<{
      gsap: typeof gsapType;
      ScrollTrigger: typeof ScrollTriggerType;
    }>
  | undefined;

export function loadMotion() {
  motionPromise ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    }
  );

  return motionPromise;
}
