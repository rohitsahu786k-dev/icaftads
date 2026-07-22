import { insightArticles } from "@/lib/inner-pages";
import { absoluteUrl, site } from "@/lib/seo";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = insightArticles
    .map((article) => {
      const url = absoluteUrl(`/insights/${article.slug}`);

      return `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description>${escapeXml(article.excerpt)}</description>
          <category>${escapeXml(article.category)}</category>
          <author>${escapeXml(site.author)}</author>
          <pubDate>${new Date(site.publishedDate).toUTCString()}</pubDate>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(site.name)} Insights</title>
        <link>${absoluteUrl("/insights")}</link>
        <description>${escapeXml("Digital marketing insights for Dubai and UAE growth teams.")}</description>
        <language>en-AE</language>
        <lastBuildDate>${new Date(site.updatedDate).toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8"
    }
  });
}
