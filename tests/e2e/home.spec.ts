import { expect, test } from "@playwright/test";

test.describe("home page (360px phone)", () => {
  test("shows the English page with a formatted price", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Your shop, online, from your phone.",
    );
    await expect(page.getByTestId("example-price")).toContainText("Rs 1,250");
  });

  test("switches language to French and Kreol", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Français" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Votre boutique en ligne, depuis votre téléphone.",
    );

    await page.getByRole("button", { name: "Kreol" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "mfe");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Ou laboutik lor internet, depi ou portab.",
    );
  });

  test("has no sideways scroll and 44px touch targets", async ({ page }) => {
    await page.goto("/");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);

    const buttons = page.getByRole("button");
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const box = await buttons.nth(i).boundingBox();
      expect(box, `button ${i} should be visible`).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.width).toBeGreaterThanOrEqual(44);
    }
  });
});
