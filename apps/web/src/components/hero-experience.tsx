"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { HeroStaticArt } from "@/components/hero-static-art";

const HeroSignalScene = dynamic(
  () => import("@/components/hero-signal-scene").then((module) => module.HeroSignalScene),
  {
    loading: () => <HeroStaticArt />,
    ssr: false
  }
);

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [mobile, setMobile] = useState(true);
  const [webglReady, setWebglReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [allowWebgl, setAllowWebgl] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 760px)");

    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setMobile(mobileQuery.matches);
      setWebglReady(canUseWebGL() && !motionQuery.matches);
    };

    sync();
    motionQuery.addEventListener("change", sync);
    mobileQuery.addEventListener("change", sync);

    return () => {
      motionQuery.removeEventListener("change", sync);
      mobileQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let done = false;
    const markReady = () => {
      if (done) return;
      done = true;
      setAllowWebgl(true);
    };
    const events = ["pointerdown", "keydown", "scroll"] as const;

    events.forEach((event) =>
      window.addEventListener(event, markReady, { once: true, passive: true })
    );

    return () => {
      events.forEach((event) => window.removeEventListener(event, markReady));
    };
  }, [reducedMotion]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setActive(entry.isIntersecting);
      },
      { rootMargin: "180px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-label="Abstract visual showing fragmented marketing signals becoming an organised growth system."
      className="hero-webgl-shell"
      data-parallax
      ref={containerRef}
      role="img"
    >
      <p className="sr-only">
        Animated and static artwork represent campaign signals being organised into a clearer growth
        system. The visual is decorative support; the surrounding HTML contains the core content.
      </p>
      {allowWebgl && webglReady && !reducedMotion ? (
        <HeroSignalScene active={active} mobile={mobile} />
      ) : (
        <HeroStaticArt />
      )}
    </div>
  );
}
