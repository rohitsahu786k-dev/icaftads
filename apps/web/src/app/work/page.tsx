import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Work and Case Studies | I Craft Ads",
  description:
    "I Craft Ads case-study structure for approved client work, verified outcomes, testimonials and related services.",
  path: "/work"
});

const proofSlots = [
  {
    title: "SEO case study",
    service: "SEO Dubai",
    need: "Client context, search baseline, scope, timeframe, verified visibility or lead outcome."
  },
  {
    title: "PPC or Google Ads case study",
    service: "PPC and Google Ads Dubai",
    need: "Campaign context, conversion setup, spend context, lead quality evidence and client permission."
  },
  {
    title: "Shopify or web development case study",
    service: "Shopify / Web",
    need: "Approved screenshots, build scope, UX changes, launch context and verified performance detail."
  }
];

export default function WorkPage() {
  return (
    <main id="main" className="inner-page">
      <Breadcrumbs items={[{ href: "/work", label: "Work" }]} />
      <section className="inner-hero" aria-labelledby="work-title">
        <div>
          <p className="kicker">Work</p>
          <h1 id="work-title">Selected work and proof, published only when verified.</h1>
          <p className="hero-lead">
            Case studies should help a buyer understand the context, challenge, strategy, execution
            and outcome. I Craft Ads will publish client work only after permission and factual
            verification.
          </p>
          <div className="cta-row">
            <Link className="button-link" href="/contact" data-analytics-event="strategy_call_click">
              Discuss a similar challenge
            </Link>
            <Link className="button-link button-secondary" href="/services">
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <section className="inner-section" aria-labelledby="proof-slots-title">
        <div className="section-heading">
          <p className="kicker">Approved proof required</p>
          <h2 id="proof-slots-title">Case-study slots ready for real evidence.</h2>
        </div>
        <div className="case-grid">
          {proofSlots.map((slot, index) => (
            <article
              className={index === 0 ? "case-card feature-card" : "case-card"}
              key={slot.title}
            >
              <span>{slot.service}</span>
              <h3>{slot.title}</h3>
              <p>{slot.need}</p>
              <p className="proof-note">[OWNER MUST PROVIDE CLIENT PERMISSION]</p>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-section split-section" aria-labelledby="template-title">
        <div>
          <p className="kicker">Template</p>
          <h2 id="template-title">Every case study must answer the commercial questions.</h2>
        </div>
        <div className="proof-panel">
          <ul className="check-list">
            <li>Client context and approved naming or anonymisation.</li>
            <li>Challenge and business reason for the work.</li>
            <li>Strategy, execution, creative/media and tracking detail.</li>
            <li>Verified outcomes with timeframe and permission.</li>
            <li>Related service and a clear next-step CTA.</li>
          </ul>
          <Link className="text-link" href="/work/pending-approved-case-study">
            Open case-study template
          </Link>
        </div>
      </section>
    </main>
  );
}
