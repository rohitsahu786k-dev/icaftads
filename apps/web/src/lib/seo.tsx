import type { Metadata } from "next";
import type { Route } from "next";
import { parseWebEnv } from "@icraftads/config";
import type { ServicePageData } from "@/lib/inner-pages";

const env = parseWebEnv(process.env);

export const site = {
  name: "I Craft Ads",
  url: env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""),
  locale: "en_AE",
  defaultTitle: "I Craft Ads | Digital Marketing Agency for Dubai Growth Brands",
  defaultDescription:
    "I Craft Ads helps businesses plan and run SEO, PPC, social media, Shopify, web development and automation with a clear focus on growth and lead quality.",
  author: "I Craft Ads Editorial Team",
  publishedDate: "2026-07-22",
  updatedDate: "2026-07-22"
} as const;

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  description,
  noindex = false,
  path,
  title,
  type = "website"
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${site.name} digital marketing agency preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/twitter-image")]
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false
          }
        }
      : {
          index: true,
          follow: true
        }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    areaServed: ["Dubai", "United Arab Emirates"],
    description: site.defaultDescription,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "AE",
      availableLanguage: ["English"]
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    inLanguage: "en-AE"
  };
}

export function breadcrumbJsonLd(items: ReadonlyArray<{ href: Route | "/"; label: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href)
    }))
  };
}

export function serviceJsonLd(service: ServicePageData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.eyebrow,
    serviceType: service.eyebrow,
    description: service.intro,
    url: absoluteUrl(service.href),
    areaServed: [
      {
        "@type": "Place",
        name: "Dubai"
      },
      {
        "@type": "Country",
        name: "United Arab Emirates"
      }
    ],
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    }
  };
}

export function articleJsonLd(article: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}) {
  const url = absoluteUrl(`/insights/${article.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    articleSection: article.category,
    url,
    mainEntityOfPage: url,
    datePublished: site.publishedDate,
    dateModified: site.updatedDate,
    author: {
      "@type": "Organization",
      name: site.author,
      url: site.url
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    inLanguage: "en-AE"
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll("<", "\\u003c")
      }}
    />
  );
}
