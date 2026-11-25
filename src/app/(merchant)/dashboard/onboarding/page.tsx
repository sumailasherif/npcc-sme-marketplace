import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import { requireUser } from "@/lib/auth";
import { categoryName } from "@/lib/database.types";
import { getCategories, getMyShop, shopUrl } from "@/lib/shops";

import { ShopForm } from "./shop-form";

export default async function OnboardingPage() {
  const user = await requireUser("/dashboard/onboarding");
  if (await getMyShop(user.id)) redirect("/dashboard");

  const [t, locale, categories] = await Promise.all([
    getTranslations("Onboarding"),
    getLocale(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-h1">{t("title")}</h1>
        <p className="text-body-l text-ink-700">{t("subtitle")}</p>
      </div>
      <div className="rounded-card bg-surface p-4 shadow-e1">
        <ShopForm
          userId={user.id}
          shopBaseUrl={shopUrl("").replace(/\/$/, "")}
          categories={categories.map((c) => ({
            id: c.id,
            type: c.type,
            name: categoryName(c, locale as Locale),
          }))}
        />
      </div>
    </div>
  );
}
