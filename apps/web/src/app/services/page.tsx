import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { servicePages } from "@/lib/inner-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Digital Marketing Services Dubai | I Craft Ads",
  description:
    "Explore I Craft Ads services across SEO, Google Ads, PPC, social media, web development, Shopify, lead generation and automation.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <main id="main" className="inner-page">
      <Breadcrumbs items={[{ href: "/services", label: "Services" }]} />
      <section className="inner-hero" aria-labelledby="services-title">
        <div>
          <p className="kicker">Services</p>
          <h1 id="services-title">
            Digital marketing services built around strategy, media, content and technology.
          </h1>
          <p className="hero-lead">
            Marketing works better when the parts connect. I Craft Ads brings together search, paid
            media, social, websites, Shopify and automation so each channel supports the same
            commercial goal.
          </p>
          <div className="cta-row">
            <Link className="button-link" href="/contact" data-analytics-event="strategy_call_click">
              Find the right service
            </Link>
            <Link className="button-link button-secondary" href="/work">
              View proof policy
            </Link>
          </div>
        </div>
      </section>
      <section className="inner-section" aria-labelledby="service-list-title">
        <div className="section-heading">
          <p className="kicker">Service architecture</p>
          <h2 id="service-list-title">Choose the page closest to the business problem.</h2>
        </div>
        <div className="service-grid">
          {servicePages.map((service) => (
            <article className="service-card" key={service.href}>
              <div>
                <span>{service.eyebrow}</span>
                <h3>{service.title}</h3>
                <p>{service.intro}</p>
              </div>
              <Link href={service.href}>Explore service</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
