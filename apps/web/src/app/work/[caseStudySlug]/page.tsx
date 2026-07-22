import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ViewTracker } from "@/components/view-tracker";
import { createPageMetadata } from "@/lib/seo";

type CaseStudyPageProps = {
  params: Promise<{
    caseStudySlug: string;
  }>;
};

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { caseStudySlug } = await params;
  const title = caseStudySlug.replaceAll("-", " ");

  return createPageMetadata({
    title: `${title} | Case Study Template | I Craft Ads`,
    description:
      "Proof-safe I Craft Ads case-study template covering client context, challenge, strategy, execution, creative/media, verified outcomes and CTA.",
    path: `/work/${caseStudySlug}`,
    noindex: true
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { caseStudySlug } = await params;
  const title = caseStudySlug.replaceAll("-", " ");

  return (
    <main id="main" className="inner-page">
      <ViewTracker
        event="case_study_view"
        params={{ case_study: caseStudySlug, case_study_title: title }}
      />
      <Breadcrumbs
        items={[
          { href: "/work", label: "Work" },
          { href: `/work/${caseStudySlug}` as Route, label: "Case-study template" }
        ]}
      />
      <section className="inner-hero" aria-labelledby="case-study-title">
        <div>
          <p className="kicker">Case study template</p>
          <h1 id="case-study-title">{title}.</h1>
          <p className="hero-lead">
            This page shows the approved case-study structure. It must not be treated as a live
            client result until the owner supplies permission, verified facts, media and legal
            clearance where needed.
          </p>
        </div>
        <aside className="service-summary">
          <h2>Publication status</h2>
          <ul>
            <li>[OWNER MUST PROVIDE CLIENT NAME OR APPROVED ANONYMISATION]</li>
            <li>[OWNER MUST PROVIDE VERIFIED RESULT]</li>
            <li>[OWNER MUST PROVIDE TESTIMONIAL PERMISSION]</li>
          </ul>
        </aside>
      </section>

      {[
        [
          "Client context",
          "Industry, market, audience, service scope, timeline and approved client status."
        ],
        ["Challenge", "The business problem and why it mattered commercially."],
        ["Strategy", "Audience, offer, channel mix, conversion path and measurement approach."],
        [
          "Execution",
          "Campaigns, pages, content, store changes, tracking, workflows or creative delivered."
        ],
        [
          "Creative and media",
          "Approved screenshots, campaign assets, store views or sensitive-data-safe reporting examples."
        ],
        [
          "Verified outcomes",
          "Metrics only after baseline, timeframe, method and client permission are confirmed."
        ],
        [
          "Testimonial",
          "Client quote only after explicit permission and attribution are confirmed."
        ]
      ].map(([heading, copy]) => (
        <section
          className="inner-section split-section"
          aria-labelledby={`${heading}-title`}
          key={heading}
        >
          <div>
            <p className="kicker">Case-study section</p>
            <h2 id={`${heading}-title`}>{heading}</h2>
          </div>
          <div className="proof-panel">
            <p>{copy}</p>
            <p className="proof-note">[OWNER MUST PROVIDE]</p>
          </div>
        </section>
      ))}

      <section className="final-cta inner-final" aria-labelledby="case-cta-title">
        <p className="kicker">Related service</p>
        <h2 id="case-cta-title">Need a similar growth system?</h2>
        <p>
          Share the business context and we will help identify the right service path without
          publishing unsupported claims.
        </p>
        <Link className="button-link" href="/contact" data-analytics-event="strategy_call_click">
          Build a similar plan
        </Link>
      </section>
    </main>
  );
}
