import { expect, test, type Page } from "@playwright/test";

/**
 * M1 acceptance test: a merchant signs up with an email code, creates a
 * shop, and the public link /s/{slug} shows it.
 *
 * Needs a LOCAL Supabase with its Mailpit test inbox (CI starts both).
 * Skipped otherwise, so it never sends real emails.
 */
const MAILPIT_URL = process.env.MAILPIT_URL;

test.skip(!MAILPIT_URL, "needs local Supabase + Mailpit (runs in CI)");

/** Waits for the newest Bazar email to `to` and returns the 6-digit code. */
async function readCode(to: string): Promise<string> {
  for (let attempt = 0; attempt < 30; attempt++) {
    const res = await fetch(
      `${MAILPIT_URL}/api/v1/search?query=${encodeURIComponent(`to:"${to}"`)}`,
    );
    if (res.ok) {
      const { messages = [] } = (await res.json()) as {
        messages?: { Subject: string }[];
      };
      const code = messages
        .map((m) => /(\d{6})/.exec(m.Subject)?.[1])
        .find(Boolean);
      if (code) return code;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`No code email arrived for ${to}`);
}

async function expectNoSidewaysScroll(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test("merchant signs up, creates a shop, and the shop link works", async ({
  page,
}) => {
  const email = `merchant-${Date.now()}@test.bazar.local`;
  const shopName = `Gato Test ${Date.now().toString().slice(-6)}`;

  // 1. Sign up with an email code
  await page.goto("/login");
  await page.getByLabel("Email address").fill(email);
  await page.getByRole("button", { name: "Send me a code" }).click();
  await expect(
    page.getByText(`We sent a 6-digit code to ${email}`),
  ).toBeVisible();

  const code = await readCode(email);
  await page.getByLabel("6-digit code").fill(code);
  await page.getByRole("button", { name: "Sign in" }).click();

  // 2. New merchants land on shop creation
  await expect(page).toHaveURL(/\/dashboard\/onboarding$/);
  await expectNoSidewaysScroll(page);

  await page.getByLabel("Shop name").fill(shopName);
  const slug = await page.getByLabel("Your shop link").inputValue();
  expect(slug).toMatch(/^gato-test-\d{6}$/);

  await page
    .getByLabel("What do you sell?")
    .selectOption({ label: "Cakes & snacks" });
  await page.getByLabel("District").selectOption({ label: "Plaines Wilhems" });
  await page.getByLabel("WhatsApp number").fill("5123 4567");
  await page.getByRole("button", { name: "Create my shop" }).click();

  // 3. Dashboard shows the shareable link and the unverified status
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Your shop is live!",
  );
  await expect(page.getByTestId("shop-link")).toContainText(`/s/${slug}`);
  await expect(page.getByText("Unverified", { exact: true })).toBeVisible();
  await expectNoSidewaysScroll(page);

  // 4. The public shop page works for anyone
  await page.getByRole("link", { name: "View my shop" }).click();
  await expect(page).toHaveURL(new RegExp(`/s/${slug}$`));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(shopName);
  await expect(page.getByText("Plaines Wilhems")).toBeVisible();
  const chat = page.getByRole("link", { name: "Chat on WhatsApp" });
  await expect(chat).toHaveAttribute(
    "href",
    /^https:\/\/wa\.me\/23051234567\?text=/,
  );
  await expectNoSidewaysScroll(page);

  // 5. Logged-out visitors see the same public page
  const visitor = await page.context().browser()!.newContext();
  const visitorPage = await visitor.newPage();
  await visitorPage.goto(page.url()); // new contexts have no baseURL
  await expect(visitorPage.getByRole("heading", { level: 1 })).toHaveText(
    shopName,
  );
  await visitor.close();
});
