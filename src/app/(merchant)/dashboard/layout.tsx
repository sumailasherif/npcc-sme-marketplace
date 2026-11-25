import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SignOut } from "@phosphor-icons/react/ssr";

import { LanguageSwitcher } from "@/components/language-switcher";
import { MerchantNav } from "@/components/merchant-nav";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { getMyShop } from "@/lib/shops";

import { signOut } from "./actions";

/** Every /dashboard page needs a logged-in user. */
export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser();
  const [shop, t, tc] = await Promise.all([
    getMyShop(user.id),
    getTranslations("Dashboard"),
    getTranslations("Common"),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between gap-2 border-b bg-surface px-4 py-2 tablet:px-6">
        <Link
          href="/dashboard"
          className="flex min-h-11 items-center font-heading text-h2 text-ink-900"
        >
          {tc("brand")}
        </Link>
        <div className="flex items-center gap-1">
          <LanguageSwitcher compact />
          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              aria-label={tc("signOut")}
            >
              <SignOut aria-hidden="true" />
            </Button>
          </form>
        </div>
      </header>

      <div className="flex flex-1 flex-col desktop:flex-row">
        {shop ? (
          <MerchantNav
            label={tc("brand")}
            items={[
              { href: "/dashboard", label: t("navHome"), icon: "home" },
              { href: `/s/${shop.slug}`, label: t("navShop"), icon: "shop" },
            ]}
          />
        ) : null}
        <main className="flex-1 px-4 pt-6 pb-24 tablet:px-6 desktop:px-8 desktop:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
