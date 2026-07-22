"use client";

import { useEffect, useRef, useState } from "react";
import { loadMotion } from "@/lib/motion";

const DESKTOP_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export function MotionLayer() {
  const scope = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let done = false;
    const markReady = () => {
      if (done) return;
      done = true;
      setReady(true);
    };
    const events = ["pointerdown", "keydown", "scroll"] as const;

    events.forEach((event) =>
      window.addEventListener(event, markReady, { once: true, passive: true })
    );

    return () => {
      events.forEach((event) => window.removeEventListener(event, markReady));
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let context: { revert: () => void } | undefined;

    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    void loadMotion().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      context = gsap.context(() => {
        const navItems = gsap.utils.toArray<HTMLElement>("[data-nav-item]");
        if (navItems.length) {
          gsap.from(navItems, {
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.055,
            y: -12
          });
        }

        const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        if (heroLines.length) {
          gsap.from(heroLines, {
            autoAlpha: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.08,
            yPercent: 105
          });
        }

        const heroReveals = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");
        if (heroReveals.length) {
          gsap.from(heroReveals, {
            autoAlpha: 0,
            delay: 0.25,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            y: 18
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-section-reveal]").forEach((section) => {
          gsap.from(section.children, {
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              once: true,
              start: "top 82%",
              trigger: section
            },
            stagger: 0.06,
            y: 28
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-mask-reveal]").forEach((item) => {
          gsap.fromTo(
            item,
            { clipPath: "inset(18% 0 18% 0)", y: 28 },
            {
              clipPath: "inset(0% 0 0% 0)",
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                once: true,
                start: "top 78%",
                trigger: item
              },
              y: 0
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((item) => {
          gsap.to(item, {
            ease: "none",
            scrollTrigger: {
              scrub: 0.45,
              start: "top bottom",
              end: "bottom top",
              trigger: item
            },
            yPercent: -8
          });
        });

        const footer = document.querySelector(".site-footer");
        if (footer) {
          gsap.from(footer, {
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              once: true,
              start: "top 86%",
              trigger: footer
            },
            y: 28
          });
        }

        ScrollTrigger.matchMedia({
          [DESKTOP_QUERY]: () => {
            const services = document.querySelector(".services-section");
            const serviceCards = gsap.utils.toArray<HTMLElement>(".services-section .service-card");

            if (services && serviceCards.length) {
              gsap.to(serviceCards, {
                ease: "none",
                scrollTrigger: {
                  end: "+=520",
                  pin: true,
                  scrub: 0.6,
                  start: "top 12%",
                  trigger: services
                },
                y: (index) => index * -18
              });
            }

            const workSection = document.querySelector<HTMLElement>(".work-section");
            const workTrack = document.querySelector<HTMLElement>("[data-work-track]");
            if (workSection && workTrack) {
              gsap.to(workTrack, {
                ease: "none",
                scrollTrigger: {
                  end: "+=420",
                  pin: workSection,
                  scrub: 0.6,
                  start: "top 12%",
                  trigger: workSection
                },
                xPercent: -12
              });
            }

            const magneticItems = gsap.utils.toArray<HTMLElement>(".button-link");
            const cleanups = magneticItems.map((item) => {
              const onMove = (event: PointerEvent) => {
                if (event.pointerType !== "mouse") return;
                const rect = item.getBoundingClientRect();
                const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
                const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
                gsap.to(item, { duration: 0.28, ease: "power3.out", x, y });
              };
              const onLeave = () => {
                gsap.to(item, { duration: 0.35, ease: "elastic.out(1, 0.45)", x: 0, y: 0 });
              };

              item.addEventListener("pointermove", onMove);
              item.addEventListener("pointerleave", onLeave);

              return () => {
                item.removeEventListener("pointermove", onMove);
                item.removeEventListener("pointerleave", onLeave);
              };
            });

            return () => {
              cleanups.forEach((cleanup) => cleanup());
            };
          }
        });
      }, scope);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [ready]);

  return <div ref={scope} className="motion-scope" aria-hidden="true" />;
}
