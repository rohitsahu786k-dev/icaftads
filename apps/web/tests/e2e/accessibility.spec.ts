import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/services/seo-dubai", "/insights/seo-cost-dubai", "/contact"] as const;

for (const route of routes) {
  test(`axe has no critical WCAG violations on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const seriousViolations = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? "")
    );

    expect(seriousViolations).toEqual([]);
  });
}

test("reduced motion keeps the hero readable with static fallback", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /marketing built around business outcomes/i })
  ).toBeVisible();
  await expect(page.getByRole("img", { name: /fragmented marketing signals/i })).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});
