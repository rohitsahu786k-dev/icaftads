import { expect, test } from "@playwright/test";

test("homepage exposes navigation, proof-safe content and focus", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { name: /marketing built around business outcomes/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Book a Strategy Call" }).first()).toBeVisible();
  await expect(page.getByText("No fake logo carousel.")).toBeVisible();

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});

test("mobile navigation is reachable without custom JavaScript", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const menu = page.locator(".mobile-toggle");
  await expect(menu).toBeVisible();
  await menu.focus();
  await page.keyboard.press("Space");

  const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });

  await expect(mobileNavigation).toBeVisible();
  await expect(
    page.locator(".mobile-panel").getByRole("link", { name: "SEO Dubai" })
  ).toBeVisible();
});
