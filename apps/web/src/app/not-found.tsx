import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Page Not Found | I Craft Ads",
  description: "The requested I Craft Ads page could not be found.",
  path: "/404",
  noindex: true
});

export default function NotFound() {
  return (
    <main className="page-shell" id="main">
      <p className="kicker">404</p>
      <h1>Page not found.</h1>
      <p>The page may have moved as part of the new architecture.</p>
      <Link className="button-link" href="/">
        Return home
      </Link>
    </main>
  );
}
