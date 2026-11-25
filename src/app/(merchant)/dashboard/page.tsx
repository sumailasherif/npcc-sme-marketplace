import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Package, WhatsappLogo } from "@phosphor-icons/react/ssr";

import { CopyButton } from "@/components/copy-button";
import { buttonVariants } from "@/components/ui/button";
import { VerificationPill } from "@/components/ui/status-pill";
import { requireUser } from "@/lib/auth";
import { getMyShop, shopUrl } from "@/lib/shops";

const statusKey = {
  pending: "statusPending",
  verified: "statusVerified",
  rejected: "statusRejected",
} as const;

export default async function DashboardHome() {
  const user = await requireUser();
  const shop = await getMyShop(user.id);
  if (!shop) redirect("/dashboard/onboarding");

  const t = await getTranslations("Dashboard");
  const url = shopUrl(shop.slug);
  const shareText = t("shareMessage", { url });

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-h1">{t("greeting")}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-h3">{shop.name}</span>
          <VerificationPill
            status={shop.verification_status}
            label={t(statusKey[shop.verification_status])}
          />
        </div>
        {shop.verification_status === "pending" ? (
          <p className="text-body text-ink-700">{t("pendingHelp")}</p>
        ) : null}
      </div>

      <section
        aria-labelledby="shop-link-title"
        className="flex flex-col gap-3 rounded-card bg-surface p-4 shadow-e1"
      >
        <h2 id="shop-link-title" className="text-h3">
          {t("shopLink")}
        </h2>
        <p
          className="rounded-button bg-teal-50 px-3 py-2 text-body-l break-all text-teal-700"
          data-testid="shop-link"
        >
          {url}
        </p>
        <div className="flex flex-col gap-2 tablet:flex-row">
          <CopyButton text={url} label={t("copy")} copiedLabel={t("copied")} />
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "primary" })}
          >
            <WhatsappLogo aria-hidden="true" />
            {t("share")}
          </a>
          <Link
            href={`/s/${shop.slug}`}
            className={buttonVariants({ variant: "ghost" })}
          >
            {t("viewShop")}
          </Link>
        </div>
      </section>

      <section className="flex gap-3 rounded-card bg-surface p-4 shadow-e1">
        <Package aria-hidden="true" className="size-6 shrink-0 text-teal-500" />
        <div>
          <h2 className="text-h3">{t("nextTitle")}</h2>
          <p className="text-body text-ink-700">{t("nextBody")}</p>
        </div>
      </section>
    </div>
  );
}
