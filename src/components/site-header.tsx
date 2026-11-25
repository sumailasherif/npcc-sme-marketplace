import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "@/components/language-switcher";

/** Top bar for public pages: brand on the left, language switcher on the right. */
export async function SiteHeader({ children }: { children?: React.ReactNode }) {
  const t = await getTranslations("Common");
  return (
    <header className="flex items-center justify-between gap-2 px-4 py-2 tablet:px-6">
      <Link
        href="/"
        className="flex min-h-11 items-center font-heading text-h2 text-ink-900"
      >
        {t("brand")}
      </Link>
      <div className="flex items-center gap-1">
        {children}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
