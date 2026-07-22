import Link from "next/link";
import { primaryLinks, services } from "@/lib/homepage";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="footer-brand" href="/">
            I Craft Ads
          </Link>
          <p>
            Digital marketing, Shopify, SEO, paid media, social and web development for brands that
            want marketing tied to real business goals.
          </p>
          <p className="footer-proof">[OWNER MUST PROVIDE BUSINESS ADDRESS AND UAE PHONE NUMBER]</p>
        </div>
        <nav aria-label="Footer primary links">
          <h2>Company</h2>
          {primaryLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact">Contact</Link>
        </nav>
        <nav aria-label="Footer service links">
          <h2>Services</h2>
          {services.slice(0, 6).map((service) => (
            <Link href={service.href} key={service.href}>
              {service.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Footer legal links">
          <h2>Legal</h2>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <span>[OWNER MUST PROVIDE SOCIAL LINKS]</span>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} I Craft Ads.</span>
        <span>No unsupported awards, client logos or performance claims are published.</span>
      </div>
    </footer>
  );
}
