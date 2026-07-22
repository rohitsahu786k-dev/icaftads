import Link from "next/link";
import { HeroExperience } from "@/components/hero-experience";
import {
  caseStudyNeeds,
  insights,
  outcomeSignals,
  processSteps,
  proofRail,
  services,
  testimonialNeeds
} from "@/lib/homepage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "I Craft Ads | Digital Marketing Agency for Dubai Growth Brands",
  description:
    "I Craft Ads helps Dubai and UAE businesses connect SEO, PPC, social media, Shopify, websites and automation around clearer commercial growth.",
  path: "/"
});

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero-section" aria-labelledby="home-hero-title">
        <div className="hero-copy">
          <p className="kicker" data-hero-reveal>
            Digital marketing for Dubai and UAE growth teams
          </p>
          <h1 id="home-hero-title">
            <span data-hero-line>Marketing built </span>
            <span data-hero-line>around business </span>
            <span data-hero-line>outcomes, not </span>
            <span data-hero-line>activity.</span>
          </h1>
          <p className="hero-lead" data-hero-reveal>
            I Craft Ads helps brands plan, build and improve the digital systems that bring in
            enquiries, sales and trust. We connect SEO, paid media, social, Shopify, websites and
            automation around one commercial direction.
          </p>
          <p className="proof-note" data-hero-reveal>
            [OWNER MUST CONFIRM UAE OFFICE STATUS]
          </p>
          <div className="cta-row" aria-label="Homepage calls to action" data-hero-reveal>
            <Link className="button-link" href="/contact" data-analytics-event="strategy_call_click">
              Book a Strategy Call
            </Link>
            <Link className="button-link button-secondary" href="/work">
              View Our Work
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <HeroExperience />
          <div className="visual-topline">
            <span>Dubai growth system</span>
            <span>Proof-led</span>
          </div>
          <div className="signal-board">
            <div>
              <span>Market</span>
              <strong>Dubai and UAE</strong>
            </div>
            <div>
              <span>Channels</span>
              <strong>SEO / PPC / Social / Web</strong>
            </div>
            <div>
              <span>Conversion path</span>
              <strong>Landing page to lead flow</strong>
            </div>
            <div>
              <span>Evidence rule</span>
              <strong>Verified results only</strong>
            </div>
          </div>
        </div>
      </section>

      <section
        className="trust-rail section-band"
        aria-labelledby="trust-title"
        data-section-reveal
      >
        <div className="section-heading compact">
          <p className="kicker">Verified service base</p>
          <h2 id="trust-title">Credibility belongs in the details.</h2>
          <p>
            No fake logo carousel. Approved client logos, results and testimonials will be added
            only after owner confirmation and permission.
          </p>
        </div>
        <div className="rail-items" aria-label="Current service areas">
          {proofRail.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section-shell" aria-labelledby="outcomes-title" data-section-reveal>
        <div className="section-heading">
          <p className="kicker">Commercial signals</p>
          <h2 id="outcomes-title">The work has to connect to the way your business sells.</h2>
        </div>
        <div className="outcome-grid">
          {outcomeSignals.map((outcome) => (
            <article className="outcome-card" key={outcome.label}>
              <span>{outcome.label}</span>
              <h3>{outcome.title}</h3>
              <p>{outcome.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-shell services-section"
        aria-labelledby="services-title"
        data-section-reveal
      >
        <div className="section-heading">
          <p className="kicker">Services</p>
          <h2 id="services-title">Strategy, media, content and technology under one plan.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.href}>
              <div>
                <span>{service.tag}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
              <Link href={service.href}>Explore service</Link>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-shell work-section"
        aria-labelledby="work-title"
        data-section-reveal
      >
        <div className="section-heading">
          <p className="kicker">Selected work</p>
          <h2 id="work-title">Selected work should show what was solved.</h2>
          <p>
            This area is prepared for approved projects only. Each case study needs client context,
            the problem, work delivered and verified outcome before publication.
          </p>
        </div>
        <div className="case-grid" data-work-track>
          {caseStudyNeeds.map((need, index) => (
            <article
              className={index === 0 ? "case-card feature-card" : "case-card"}
              data-mask-reveal
              key={need}
            >
              <span>Proof required</span>
              <h3>{need}</h3>
              <p>[OWNER MUST PROVIDE CASE STUDY AND PERMISSION]</p>
            </article>
          ))}
        </div>
        <Link className="text-link" href="/work">
          View work
        </Link>
      </section>

      <section className="dubai-band" aria-labelledby="dubai-title" data-section-reveal>
        <div>
          <p className="kicker">Dubai market understanding</p>
          <h2 id="dubai-title">
            Dubai buyers compare fast. Your marketing needs to earn attention quickly.
          </h2>
        </div>
        <p>
          Dubai&apos;s market rewards clarity. Buyers compare vendors, reviews, websites, social
          presence and proof before they speak to a team. A strong digital system should explain the
          offer, make the business easy to trust and give serious prospects a clear next step.
        </p>
      </section>

      <section className="section-shell" aria-labelledby="process-title" data-section-reveal>
        <div className="section-heading">
          <p className="kicker">Process</p>
          <h2 id="process-title">A practical process for cleaner growth decisions.</h2>
        </div>
        <div className="process-grid">
          {processSteps.map((item) => (
            <article className="process-card" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-shell testimonials-section"
        aria-labelledby="testimonials-title"
        data-section-reveal
      >
        <div className="section-heading">
          <p className="kicker">Testimonials</p>
          <h2 id="testimonials-title">Client feedback, used only with permission.</h2>
          <p>
            Existing testimonials mention website development, Shopify support, social media work,
            communication and responsiveness. Quotes will appear only after attribution and
            permission are confirmed.
          </p>
        </div>
        <div className="testimonial-grid">
          {testimonialNeeds.map((need) => (
            <article className="testimonial-card" key={need}>
              <span>Permission pending</span>
              <p>{need}</p>
              <small>[OWNER MUST PROVIDE TESTIMONIAL PERMISSION]</small>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-shell insights-section"
        aria-labelledby="insights-title"
        data-section-reveal
      >
        <div className="section-heading">
          <p className="kicker">Insights</p>
          <h2 id="insights-title">Practical thinking for better digital decisions.</h2>
        </div>
        <div className="insight-grid">
          {insights.map((insight) => (
            <article className="insight-card" key={insight.title}>
              <span>{insight.meta}</span>
              <h3>{insight.title}</h3>
              <Link href={insight.href}>Read insight</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta" aria-labelledby="final-cta-title" data-section-reveal>
        <p className="kicker">Next move</p>
        <h2 id="final-cta-title">Ready to make your marketing easier to judge?</h2>
        <p>
          Tell us what you are trying to improve. We will help identify the right next move across
          search, paid media, social, Shopify, web development or automation.
        </p>
        <div className="cta-row">
          <Link className="button-link" href="/contact" data-analytics-event="strategy_call_click">
            Book a Strategy Call
          </Link>
          <Link className="button-link button-secondary" href="/services">
            Explore Services
          </Link>
        </div>
      </section>
    </main>
  );
}
