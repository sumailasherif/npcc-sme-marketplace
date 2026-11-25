import { expect, test } from "@playwright/test";

test.describe("public pages without an account (360px phone)", () => {
  test("an unknown shop link shows a friendly 'not found' page", async ({
    page,
  }) => {
    const response = await page.goto("/s/no-such-shop-xyz");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Shop not found",
    );
    await expect(page.getByRole("link", { name: "Go to Bazar" })).toBeVisible();
  });

  test("the dashboard sends logged-out visitors to sign in", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login\?next=%2Fdashboard$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Sign in to Bazar",
    );
  });

  test("the sign-in page checks the email before sending", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email address").fill("not-an-email");
    await page.getByRole("button", { name: "Send me a code" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "valid email" }),
    ).toHaveText(/Enter a valid email address/);
    // The field is marked invalid for screen readers too.
    await expect(page.getByLabel("Email address")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
