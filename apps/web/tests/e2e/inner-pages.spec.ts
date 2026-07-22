import { expect, test } from "@playwright/test";

test("service page has breadcrumbs, unique sections and proof-safe CTA", async ({ page }) => {
  await page.goto("/services/seo-dubai", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { name: /SEO agency in Dubai for search visibility/i })
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What the work can include" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Questions buyers should ask" })).toBeVisible();
  await expect(page.getByText("[OWNER MUST PROVIDE VERIFIED SEO RESULT]")).toBeVisible();
});

test("work and insight templates avoid fake results", async ({ page }) => {
  await page.goto("/work/pending-approved-case-study", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { name: /pending approved case study/i })).toBeVisible();
  await expect(page.getByText("[OWNER MUST PROVIDE VERIFIED RESULT]")).toBeVisible();

  await page.goto("/insights/seo-cost-dubai", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { name: /SEO cost in Dubai/i })).toBeVisible();
  await expect(
    page.getByText("No search volume, cost range or market statistic is invented.")
  ).toBeVisible();
});

test("contact form exposes required fields and attribution-safe copy", async ({ page }) => {
  await page.goto("/contact?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_content=ad-a", {
    waitUntil: "domcontentloaded"
  });

  await expect(
    page.getByRole("heading", { name: /Tell us what growth needs to mean next/i })
  ).toBeVisible();
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Work email")).toBeVisible();
  await expect(page.getByLabel("Phone with country code")).toBeVisible();
  await expect(page.getByLabel("Approximate budget")).toBeVisible();
  await expect(page.getByLabel("Timeline")).toBeVisible();
  await expect(page.getByRole("group", { name: "Required services" })).toBeVisible();
  await expect(page.getByText("landing page and referrer details")).toBeVisible();
});
