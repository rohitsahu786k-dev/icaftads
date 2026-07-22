import { expect, test } from "@playwright/test";

test("service view event does not fire twice during client navigation", async ({ page }) => {
  await page.goto("/services/seo-dubai", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    const dataLayer = (window as unknown as { dataLayer?: Array<{ event?: unknown }> }).dataLayer;
    return dataLayer?.some((entry) => entry.event === "service_view");
  });

  await page.getByRole("link", { name: "Services" }).first().click();
  await expect(page).toHaveURL(/\/services$/);
  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/services\/seo-dubai$/);

  const serviceViews = await page.evaluate(
    () => {
      const dataLayer = (window as unknown as { dataLayer?: Array<{ event?: unknown }> }).dataLayer;
      return (
        dataLayer?.filter((entry) => entry.event === "service_view").length ?? 0
      );
    }
  );

  expect(serviceViews).toBe(1);
});
