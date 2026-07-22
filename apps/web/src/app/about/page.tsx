import { PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About I Craft Ads | Digital Marketing Team",
  description:
    "Learn about I Craft Ads, the digital marketing services offered and the company details that still require owner confirmation before launch.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <PageShell
      kicker="About"
      title="The team behind I Craft Ads."
      description="Company story, team bios, certifications and operating locations require owner confirmation before final publishing."
      breadcrumb={{ href: "/about", label: "About" }}
      cta={{ href: "/contact", label: "Talk to the team" }}
    />
  );
}
