import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact I Craft Ads | Digital Marketing Inquiry",
  description:
    "Contact I Craft Ads about SEO, Google Ads, Shopify, social media, website development, lead generation or marketing automation.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main id="main" className="inner-page">
      <Breadcrumbs items={[{ href: "/contact", label: "Contact" }]} />
      <section className="inner-hero contact-hero" aria-labelledby="contact-title">
        <div>
          <p className="kicker">Contact</p>
          <h1 id="contact-title">Tell us what growth needs to mean next.</h1>
          <p className="hero-lead">
            Share what you are trying to improve. We will review the context and respond with the
            right next step across SEO, paid media, social media, Shopify, website development, lead
            generation or automation.
          </p>
        </div>
        <aside className="service-summary">
          <h2>Confirmed contact details needed</h2>
          <ul>
            <li>[OWNER MUST PROVIDE BUSINESS ADDRESS]</li>
            <li>[OWNER MUST PROVIDE UAE PHONE NUMBER]</li>
            <li>[OWNER MUST PROVIDE EMAIL]</li>
            <li>[OWNER MUST PROVIDE WHATSAPP NUMBER IF USED]</li>
          </ul>
        </aside>
      </section>

      <section className="inner-section contact-layout" aria-labelledby="form-title">
        <div>
          <p className="kicker">Inquiry form</p>
          <h2 id="form-title">Give us the context that helps us respond usefully.</h2>
          <p>
            The form captures source, campaign, landing page and referrer details for attribution.
            Private lead information is sent to the API and is not exposed publicly.
          </p>
          <Link className="text-link" href="/services">
            Compare services before sending
          </Link>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
