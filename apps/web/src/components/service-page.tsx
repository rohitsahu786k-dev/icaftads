import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ViewTracker } from "@/components/view-tracker";
import { getServiceLabel, type ServicePageData } from "@/lib/inner-pages";
import { JsonLd, serviceJsonLd } from "@/lib/seo";

export function ServicePage({ service }: { service: ServicePageData }) {
  return (
    <main id="main" className="inner-page">
      <JsonLd data={serviceJsonLd(service)} />
      <ViewTracker
        event="service_view"
        params={{ service: service.eyebrow, service_title: service.title }}
      />
      <Breadcrumbs
        items={[
          { href: "/services", label: "Services" },
          { href: service.href, label: service.eyebrow }
        ]}
      />

      <section className="inner-hero service-hero" aria-labelledby="service-title">
        <div>
          <p className="kicker">{service.eyebrow}</p>
          <h1 id="service-title">{service.title}</h1>
          <p className="hero-lead">{service.intro}</p>
          <div className="cta-row">
            <Link className="button-link" href="/contact" data-analytics-event="strategy_call_click">
              {service.cta}
            </Link>
            <Link className="button-link button-secondary" href="/work">
              View proof requirements
            </Link>
          </div>
        </div>
        <aside className="service-summary" aria-label="Service proof status">
          <h2>Proof required before claims</h2>
          <ul>
            {service.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="inner-section split-section" aria-labelledby="context-title">
        <div>
          <p className="kicker">Problem and context</p>
          <h2 id="context-title">Why this matters commercially</h2>
        </div>
        <div>
          <p>{service.context}</p>
          <ul className="check-list">
            {service.problems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="inner-section" aria-labelledby="deliverables-title">
        <div className="section-heading">
          <p className="kicker">Deliverables</p>
          <h2 id="deliverables-title">What the work can include</h2>
        </div>
        <div className="detail-grid">
          {service.deliverables.map((item) => (
            <article className="detail-card" key={item}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-section" aria-labelledby="method-title">
        <div className="section-heading">
          <p className="kicker">Method</p>
          <h2 id="method-title">A process built to reduce guesswork</h2>
        </div>
        <ol className="timeline-list">
          {service.method.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="inner-section split-section" aria-labelledby="case-title">
        <div>
          <p className="kicker">Relevant proof</p>
          <h2 id="case-title">{service.caseStudy.title}</h2>
        </div>
        <div className="proof-panel">
          <p>{service.caseStudy.copy}</p>
          <Link className="text-link" href="/work/pending-approved-case-study">
            Open case-study template
          </Link>
        </div>
      </section>

      <section className="inner-section" aria-labelledby="faqs-title">
        <div className="section-heading">
          <p className="kicker">FAQs</p>
          <h2 id="faqs-title">Questions buyers should ask</h2>
        </div>
        <div className="faq-list">
          {service.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="inner-section" aria-labelledby="related-title">
        <div className="section-heading">
          <p className="kicker">Internal links</p>
          <h2 id="related-title">Related services</h2>
        </div>
        <div className="related-grid">
          {service.related.map((href) => (
            <Link href={href} key={href}>
              {getServiceLabel(href)}
            </Link>
          ))}
        </div>
      </section>

      <section className="final-cta inner-final" aria-labelledby="service-cta-title">
        <p className="kicker">Next step</p>
        <h2 id="service-cta-title">Tell us what needs to improve.</h2>
        <p>
          Share your current situation, service need, budget range and timeline. We will help you
          identify the right next move without overclaiming what is not yet proven.
        </p>
        <Link className="button-link" href="/contact" data-analytics-event="strategy_call_click">
          {service.cta}
        </Link>
      </section>
    </main>
  );
}
