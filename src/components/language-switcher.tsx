import { getLocale, getTranslations } from "next-intl/server";

import { setLocale } from "@/i18n/actions";
import { locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

const shortCode = { en: "EN", fr: "FR", mfe: "KR" } as const;

/**
 * Three language buttons. Works without JavaScript: each button submits a
 * tiny form to a server action that saves the language cookie.
 * `compact` shows EN / FR / KR on phones (for crowded top bars) and the
 * full names from tablet width up.
 */
export async function LanguageSwitcher({
  compact = false,
  tone = "light",
}: {
  compact?: boolean;
  /** "dark" for black bars: cream text, lime for the current language. */
  tone?: "light" | "dark";
}) {
  const t = await getTranslations("LanguageSwitcher");
  const current = await getLocale();

  return (
    <nav aria-label={t("label")} className="flex gap-1">
      {locales.map((locale) => (
        <form key={locale} action={setLocale.bind(null, locale)}>
          <button
            type="submit"
            lang={locale}
            title={t(locale)}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "min-h-11 min-w-11 rounded-button text-label",
              compact ? "px-2 tablet:px-3" : "px-3",
              locale === current
                ? "bg-lime-400 font-semibold text-ink-900"
                : tone === "dark"
                  ? "text-white/80 hover:bg-white/10"
                  : "text-ink-700 hover:bg-ink-100",
            )}
          >
            {compact ? (
              <>
                <span className="tablet:hidden">{shortCode[locale]}</span>
                <span className="hidden tablet:inline">{t(locale)}</span>
              </>
            ) : (
              t(locale)
            )}
          </button>
        </form>
      ))}
    </nav>
  );
}
