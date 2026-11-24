import { getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

/** Placeholder landing page for M0. Proves tokens, fonts and translations work. */
export default async function Home() {
  const t = await getTranslations("Home");

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between gap-2 px-4 py-2 tablet:px-6">
        <span className="font-heading text-h2 text-ink-900">Bazar</span>
        <LanguageSwitcher />
      </header>

      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-6 px-4 py-10 tablet:px-6 desktop:px-8">
        <h1 className="text-display text-ink-900">{t("tagline")}</h1>
        <p className="text-body-l text-ink-700">{t("intro")}</p>

        <div className="flex flex-col gap-3 tablet:flex-row">
          <Button variant="cta" size="lg" disabled>
            {t("startSelling")}
          </Button>
          <Button variant="secondary" size="lg" disabled>
            {t("learnMore")}
          </Button>
        </div>

        <div className="rounded-card bg-surface p-4 shadow-e1">
          <p
            className="tabular-price text-price text-ink-900"
            data-testid="example-price"
          >
            {t("examplePrice", { price: formatPrice(1250) })}
          </p>
          <p className="text-caption text-ink-500">{t("comingSoon")}</p>
        </div>
      </main>
    </div>
  );
}
