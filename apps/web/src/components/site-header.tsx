import Link from "next/link";
import { primaryLinks, services } from "@/lib/homepage";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="location-strip" aria-label="Market focus" data-nav-item>
        <span>Dubai and UAE growth marketing</span>
        <span>Proof-led strategy, media, web and automation</span>
      </div>
      <div className="header-bar">
        <Link className="brand-mark" href="/" aria-label="I Craft Ads home" data-nav-item>
          <span>I Craft</span>
          <span>Ads</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <details className="mega-menu" data-nav-item>
            <summary>Services</summary>
            <div className="mega-panel">
              <div>
                <p className="mega-kicker">Service architecture</p>
                <p className="mega-title">Search, media, content and technology under one plan.</p>
              </div>
              <div className="mega-links">
                {services.map((service) => (
                  <Link href={service.href} key={service.href}>
                    <span>{service.title}</span>
                    <small>{service.tag}</small>
                  </Link>
                ))}
              </div>
            </div>
          </details>
          {primaryLinks
            .filter((link) => link.href !== "/services")
            .map((link) => (
              <Link href={link.href} key={link.href} data-nav-item>
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="header-actions">
          <Link
            className="nav-cta"
            href="/contact"
            data-analytics-event="strategy_call_click"
            data-nav-item
          >
            Book a Strategy Call
          </Link>
          <nav aria-label="Mobile navigation" className="mobile-nav" data-nav-item>
            <div className="mobile-menu">
              <input
                aria-label="Open navigation"
                className="mobile-toggle"
                id="mobile-menu-toggle"
                type="checkbox"
              />
              <label
                aria-label="Open navigation"
                className="mobile-summary"
                htmlFor="mobile-menu-toggle"
              >
                Menu
              </label>
              <div className="mobile-panel">
                {primaryLinks.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
                {services.map((service) => (
                  <Link href={service.href} key={service.href}>
                    {service.title}
                  </Link>
                ))}
                <Link
                  className="mobile-cta"
                  href="/contact"
                  data-analytics-event="strategy_call_click"
                >
                  Book a Strategy Call
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
