import { PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms and Conditions | I Craft Ads",
  description:
    "Terms and conditions for I Craft Ads. Legal-approved terms are required before launch.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <PageShell
      kicker="Legal"
      title="Terms and Conditions."
      description="Legal-approved terms are required before launch."
      breadcrumb={{ href: "/terms", label: "Terms" }}
    />
  );
}
