import { expect, test } from "@playwright/test";

const siteUrl = "http://localhost:3000";
const routes = [
  "/",
  "/services",
  "/services/seo-dubai",
  "/services/ppc-google-ads-dubai",
  "/services/social-media-marketing-dubai",
  "/services/web-design-development-dubai",
  "/services/shopify-development-dubai",
  "/services/lead-generation-marketing-automation-dubai",
  "/work",
  "/about",
  "/insights",
  "/insights/how-to-choose-a-digital-marketing-agency-in-dubai",
  "/insights/seo-cost-dubai",
  "/insights/shopify-development-cost-dubai",
  "/contact",
  "/privacy-policy",
  "/terms"
] as const;
const legacyRedirects = [
  ["/aboutus-digital-marketing-agency-ahmedabad/", "/about"],
  ["/services-digital-marketing-agency-ahmedabad/", "/services"],
  ["/contact-us/", "/contact"],
  ["/blog-digital-marketing-insights/", "/insights"],
  ["/client/", "/work"],
  ["/portfolio/", "/work"],
  ["/terms-condition/", "/terms"],
  ["/terms-and-condition/", "/terms"],
  ["/refund-policy/", "/privacy-policy"],
  ["/sitemap/", "/sitemap.xml"],
  ["/career/", "/about"],
  ["/free-tools/", "/insights"]
] as const;

async function jsonLdTypes(page: import("@playwright/test").Page) {
  return page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((script) => {
      const data = JSON.parse(script.textContent ?? "{}") as { "@type"?: string };
      return data["@type"] ? [data["@type"]] : [];
    })
  );
}

test("indexable pages expose canonical metadata, Open Graph and one H1", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    expect(await page.title()).not.toBe("");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /opengraph-image/
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      route === "/" ? siteUrl : `${siteUrl}${route}`
    );
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("structured data matches page purpose without LocalBusiness", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect.poll(() => jsonLdTypes(page)).toContain("Organization");
  await expect.poll(() => jsonLdTypes(page)).toContain("WebSite");

  await page.goto("/services/seo-dubai", { waitUntil: "domcontentloaded" });
  await expect.poll(() => jsonLdTypes(page)).toContain("BreadcrumbList");
  await expect.poll(() => jsonLdTypes(page)).toContain("Service");

  await page.goto("/insights/seo-cost-dubai", { waitUntil: "domcontentloaded" });
  await expect(page.getByText(/By I Craft Ads Editorial Team/)).toBeVisible();
  await expect.poll(() => jsonLdTypes(page)).toContain("Article");

  const allTypes = await jsonLdTypes(page);
  expect(allTypes).not.toContain("LocalBusiness");
});

test("crawl infrastructure is reachable", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  await expect(sitemap).toBeOK();
  expect(await sitemap.text()).toContain(`${siteUrl}/services/seo-dubai`);

  const robots = await request.get("/robots.txt");
  await expect(robots).toBeOK();
  const robotsText = await robots.text();
  expect(robotsText).toContain("Disallow: /admin");
  expect(robotsText).toContain(`${siteUrl}/sitemap.xml`);

  const rss = await request.get("/insights/rss.xml");
  await expect(rss).toBeOK();
  expect(rss.headers()["content-type"]).toContain("application/rss+xml");
  expect(await rss.text()).toContain("SEO cost in Dubai");
});

test("legacy redirects and noindex rules are enforced", async ({ request }) => {
  for (const [from, to] of legacyRedirects) {
    const redirect = await request.get(from, { maxRedirects: 0 });
    expect(redirect.status(), `${from} should be a permanent redirect`).toBe(301);
    expect(redirect.headers().location, `${from} should redirect to ${to}`).toMatch(
      new RegExp(`${to.replaceAll("/", "\\/")}$`)
    );
  }

  const noindex = await request.get("/search?q=seo");
  expect(noindex.headers()["x-robots-tag"]).toBe("noindex, nofollow");

  const caseTemplate = await request.get("/work/pending-approved-case-study");
  await expect(caseTemplate).toBeOK();
  expect(await caseTemplate.text()).toContain("noindex");
});

test.describe("desktop link checks", () => {
  test.skip(({ isMobile }) => isMobile, "Link resolution is viewport-independent.");

  test("internal links on core pages resolve", async ({ page, request }) => {
    const checked = new Set<string>();

    for (const route of ["/", "/services", "/work", "/insights", "/contact"] as const) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const links = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
        anchors
          .map((anchor) => anchor.getAttribute("href"))
          .filter((href): href is string => Boolean(href))
          .map((href) => href.split("#")[0] ?? "/")
      );

      for (const href of links) {
        if (checked.has(href)) continue;
        checked.add(href);

        const response = await request.get(href, { maxRedirects: 1, timeout: 10000 });
        expect(response.status(), `${href} should resolve`).toBeLessThan(400);
      }
    }
  });
});
