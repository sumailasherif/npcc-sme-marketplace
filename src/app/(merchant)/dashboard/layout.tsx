import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SignOut } from "@phosphor-icons/react/ssr";

import { Logo } from "@/components/brand/logo";
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
        {/* Bazar Business: lime logo + black "Business" chip */}
        <Link
          href="/dashboard"
          aria-label={tc("brand")}
          className="flex min-h-11 items-center gap-2"
        >
          <Logo />
          <span className="rounded-chip bg-ink-900 px-2 py-0.5 text-body font-bold tracking-normal text-white">
            Business
          </span>
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
              {
                href: "/dashboard/orders",
                label: t("navOrders"),
                icon: "orders",
              },
              {
                href: "/dashboard/products",
                label: t("navProducts"),
                icon: "products",
              },
              { href: "/dashboard/money", label: t("navMoney"), icon: "money" },
              {
                href: "/dashboard/customers",
                label: t("navCustomers"),
                icon: "customers",
              },
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
