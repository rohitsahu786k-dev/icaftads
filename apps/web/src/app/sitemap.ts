import type { MetadataRoute } from "next";
import { insightArticles, servicePages } from "@/lib/inner-pages";
import { site, absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/services",
  "/work",
  "/about",
  "/insights",
  "/contact",
  "/privacy-policy",
  "/terms"
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(site.updatedDate);

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "/" ? 1 : 0.7
    })),
    ...servicePages.map((service) => ({
      url: absoluteUrl(service.href),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85
    })),
    ...insightArticles.map((article) => ({
      url: absoluteUrl(`/insights/${article.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
