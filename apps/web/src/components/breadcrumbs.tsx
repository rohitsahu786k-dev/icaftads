import Link from "next/link";
import type { Route } from "next";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

type Breadcrumb = {
  href: Route;
  label: string;
};

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  const jsonLdItems = [{ href: "/" as const, label: "Home" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(jsonLdItems)} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
