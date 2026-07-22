import type { Metadata } from "next";
import { parseWebEnv } from "@icraftads/config";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { MotionLayer } from "@/components/motion-layer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd, organizationJsonLd, site, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const env = parseWebEnv(process.env);

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: site.defaultTitle,
    template: "%s | I Craft Ads"
  },
  description: site.defaultDescription,
  alternates: {
    canonical: env.NEXT_PUBLIC_SITE_URL
  },
  openGraph: {
    title: site.defaultTitle,
    description: site.defaultDescription,
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "I Craft Ads digital marketing agency preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitle,
    description: site.defaultDescription,
    images: ["/twitter-image"]
  },
  verification: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined
};

const analyticsConfig = {
  clarityProjectId: env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  consentRequired: env.NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED,
  debug: env.NEXT_PUBLIC_ANALYTICS_DEBUG,
  enableClarity: env.NEXT_PUBLIC_ENABLE_CLARITY,
  enableMetaPixel: env.NEXT_PUBLIC_ENABLE_META_PIXEL,
  ga4MeasurementId: env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  googleAdsConversionLabel: env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL,
  googleAdsId: env.NEXT_PUBLIC_GOOGLE_ADS_ID,
  gtmId: env.NEXT_PUBLIC_GTM_ID,
  metaPixelId: env.NEXT_PUBLIC_META_PIXEL_ID
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AE">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <MotionLayer />
        <AnalyticsProvider config={analyticsConfig} />
      </body>
    </html>
  );
}
