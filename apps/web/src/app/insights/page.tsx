import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { insightArticles } from "@/lib/inner-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Digital Marketing Insights Dubai | I Craft Ads",
  description:
    "Practical I Craft Ads guidance for Dubai and UAE businesses evaluating SEO, paid media, Shopify, web development and agency selection.",
  path: "/insights"
});

export default function InsightsPage() {
  return (
    <main id="main" className="inner-page">
      <Breadcrumbs items={[{ href: "/insights", label: "Insights" }]} />
      <section className="inner-hero" aria-labelledby="insights-title">
        <div>
          <p className="kicker">Insights</p>
          <h1 id="insights-title">Digital marketing insights for Dubai and UAE growth teams.</h1>
          <p className="hero-lead">
            Practical thinking for founders, SMEs, ecommerce teams and service businesses making
            decisions about agencies, SEO, paid media, Shopify, websites and automation.
          </p>
        </div>
      </section>

      <section className="inner-section" aria-labelledby="article-list-title">
        <div className="section-heading">
          <p className="kicker">Editorial plan</p>
          <h2 id="article-list-title">Useful articles, not keyword-stuffed pages.</h2>
        </div>
        <div className="insight-grid">
          {insightArticles.map((article) => (
            <article className="insight-card" key={article.slug}>
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <Link href={`/insights/${article.slug}`}>Read insight</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
