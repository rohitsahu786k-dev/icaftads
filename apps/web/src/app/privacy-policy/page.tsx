import { PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy | I Craft Ads",
  description:
    "Privacy information for I Craft Ads. Legal-approved privacy copy, analytics details, form destination and data retention policy are required before launch.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      kicker="Legal"
      title="Privacy Policy."
      description="Legal-approved privacy copy, analytics details, form destination and data retention policy are required before launch."
      breadcrumb={{ href: "/privacy-policy", label: "Privacy Policy" }}
    />
  );
}
