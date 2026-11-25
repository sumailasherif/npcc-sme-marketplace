import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Package } from "@phosphor-icons/react/ssr";

import { ShopHeader } from "@/components/shop-header";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/i18n/config";
import { categoryName } from "@/lib/database.types";
import { getShopBySlug, shopUrl } from "@/lib/shops";
import { whatsappLink } from "@/lib/validation/shop";

type Props = { params: Promise<{ slug: string }> };

/** Link preview when the shop link is shared on WhatsApp or Facebook. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shop = await getShopBySlug((await params).slug);
  if (!shop) return {};
  const t = await getTranslations("Shop");
  const description =
    shop.description || t("metaDescription", { name: shop.name });

  return {
    title: `${shop.name} · Bazar`,
    description,
    alternates: { canonical: shopUrl(shop.slug) },
    openGraph: {
      type: "website",
      siteName: "Bazar",
      title: shop.name,
      description,
      url: shopUrl(shop.slug),
      images: shop.logo_url
        ? [{ url: shop.logo_url, alt: shop.name }]
        : undefined,
    },
    twitter: { card: "summary" },
  };
}

export default async function ShopPage({ params }: Props) {
  const shop = await getShopBySlug((await params).slug);
  if (!shop) notFound();

  const [t, td, locale] = await Promise.all([
    getTranslations("Shop"),
    getTranslations("Districts"),
    getLocale(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-4 pt-2 pb-10 tablet:px-6">
        <ShopHeader
          name={shop.name}
          logoUrl={shop.logo_url}
          verified={shop.verification_status === "verified"}
          verifiedLabel={t("verified")}
          unverifiedLabel={t("unverified")}
          categoryLabel={
            shop.category ? categoryName(shop.category, locale as Locale) : null
          }
          districtLabel={td(shop.district)}
          description={shop.description}
          whatsappHref={whatsappLink(
            shop.whatsapp_phone,
            t("chatMessage", { name: shop.name }),
          )}
          chatLabel={t("chat")}
        />

        <section className="flex flex-col items-center gap-2 rounded-card border border-dashed bg-surface px-4 py-10 text-center">
          <Package aria-hidden="true" className="size-10 text-ink-500" />
          <h2 className="text-h3">{t("noProducts")}</h2>
          <p className="max-w-sm text-body text-ink-700">
            {t("noProductsBody")}
          </p>
        </section>
      </main>
    </div>
  );
}
