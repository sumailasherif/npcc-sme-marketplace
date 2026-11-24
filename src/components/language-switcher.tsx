import { getLocale, getTranslations } from "next-intl/server";

import { setLocale } from "@/i18n/actions";
import { locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Three language buttons. Works without JavaScript: each button submits a
 * tiny form to a server action that saves the language cookie.
 */
export async function LanguageSwitcher() {
  const t = await getTranslations("LanguageSwitcher");
  const current = await getLocale();

  return (
    <nav aria-label={t("label")} className="flex gap-1">
      {locales.map((locale) => (
        <form key={locale} action={setLocale.bind(null, locale)}>
          <button
            type="submit"
            lang={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "min-h-11 min-w-11 rounded-button px-3 text-label",
              locale === current
                ? "bg-teal-50 text-teal-700"
                : "text-ink-700 hover:bg-ink-100",
            )}
          >
            {t(locale)}
          </button>
        </form>
      ))}
    </nav>
  );
}
