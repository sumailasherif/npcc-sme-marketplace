import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MagnifyingGlass } from "@phosphor-icons/react/ssr";

import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";

export default async function ShopNotFound() {
  const t = await getTranslations("Shop");
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-3 px-4 py-16 text-center">
        <MagnifyingGlass aria-hidden="true" className="size-12 text-ink-500" />
        <h1 className="text-h1">{t("notFoundTitle")}</h1>
        <p className="text-body-l text-ink-700">{t("notFoundBody")}</p>
        <Link href="/" className={buttonVariants({ variant: "primary" })}>
          {t("goHome")}
        </Link>
      </main>
    </div>
  );
}
