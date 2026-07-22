import Link from "next/link";
import type { Route } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

type PageShellProps = {
  kicker: string;
  title: string;
  description: string;
  cta?: {
    href: Route;
    label: string;
  };
  links?: ReadonlyArray<{
    href: Route;
    label: string;
  }>;
  breadcrumb?: {
    href: Route;
    label: string;
  };
};

export function PageShell({
  breadcrumb,
  cta,
  description,
  kicker,
  links = [],
  title
}: PageShellProps) {
  return (
    <main className="page-shell" id="main">
      {breadcrumb ? <Breadcrumbs items={[breadcrumb]} /> : null}
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      {cta ? (
        <Link
          className="button-link"
          href={cta.href}
          data-analytics-event={cta.href === "/contact" ? "strategy_call_click" : undefined}
        >
          {cta.label}
        </Link>
      ) : null}
      {links.length > 0 ? (
        <div className="route-list" aria-label="Related routes">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </main>
  );
}
