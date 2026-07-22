import type { Metadata } from "next";
import type { Route } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getArticleBySlug, getServiceLabel } from "@/lib/inner-pages";
import { articleJsonLd, createPageMetadata, JsonLd, site } from "@/lib/seo";

type ArticlePageProps = {
  params: Promise<{
    articleSlug: string;
  }>;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { articleSlug } = await params;
  const article = getArticleBySlug(articleSlug);

  if (!article) {
    return createPageMetadata({
      title: "Insight | I Craft Ads",
      description: "I Craft Ads digital marketing insight.",
      path: `/insights/${articleSlug}`,
      noindex: true
    });
  }

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    type: "article"
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articleSlug } = await params;
  const article = getArticleBySlug(articleSlug);

  if (!article) notFound();

  return (
    <main id="main" className="inner-page article-page">
      <JsonLd data={articleJsonLd(article)} />
      <Breadcrumbs
        items={[
          { href: "/insights", label: "Insights" },
          { href: `/insights/${article.slug}` as Route, label: article.title }
        ]}
      />
      <article>
        <header className="inner-hero" aria-labelledby="article-title">
          <div>
            <p className="kicker">{article.category}</p>
            <h1 id="article-title">{article.title}</h1>
            <p className="hero-lead">{article.excerpt}</p>
            <p className="article-meta">
              By {site.author} · Published {site.publishedDate} · Updated {site.updatedDate}
            </p>
            <p className="proof-note">
              No search volume, cost range or market statistic is invented.
            </p>
          </div>
        </header>

        <div className="article-shell">
          <aside className="article-toc" aria-label="Article table of contents">
            <h2>On this page</h2>
            <a href="#quick-answer">Quick answer</a>
            <a href="#dubai-context">Dubai context</a>
            <a href="#scope">What changes scope</a>
            <a href="#agency-checks">Agency checks</a>
            <a href="#next-step">Next step</a>
          </aside>
          <div className="article-body">
            <section id="quick-answer">
              <h2>Quick answer</h2>
              <p>
                The right decision depends on the business model, offer, current website, proof
                assets, budget discipline and how leads or sales are handled after the first click.
                A good plan should make those trade-offs visible before work begins.
              </p>
            </section>
            <section id="dubai-context">
              <h2>Why it matters in Dubai and the UAE</h2>
              <p>
                Dubai buyers compare fast. They check websites, reviews, social presence, clarity of
                offer and proof before starting a serious conversation. Marketing needs to help them
                understand fit quickly.
              </p>
            </section>
            <section id="scope">
              <h2>What changes the scope</h2>
              <ul className="check-list">
                <li>How clear the offer and audience already are.</li>
                <li>Whether tracking, analytics and lead handling are usable.</li>
                <li>The number of services, products, markets or languages involved.</li>
                <li>The proof assets available: case studies, reviews, screenshots and results.</li>
                <li>The speed at which the team can review, approve and improve work.</li>
              </ul>
            </section>
            <section id="agency-checks">
              <h2>What to check before hiring</h2>
              <p>
                Ask how the agency diagnoses problems, what proof they need, how they report, what
                they will not claim without evidence and how work connects to enquiries, sales or
                trust.
              </p>
            </section>
            <section id="next-step">
              <h2>What I Craft Ads can help with</h2>
              <p>
                This topic connects most closely with{" "}
                <Link href={article.relatedService}>{getServiceLabel(article.relatedService)}</Link>
                . Share your context and the team can help identify a practical next move.
              </p>
              <Link className="button-link" href="/contact" data-analytics-event="strategy_call_click">
                Book a Strategy Call
              </Link>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
