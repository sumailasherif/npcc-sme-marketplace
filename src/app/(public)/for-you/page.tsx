import { Sparkle } from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";
import { ProductCard } from "@/components/market/product-card";
import { ShopCard } from "@/components/market/shop-card";
import { featuredProducts, nearbyPartners } from "@/lib/catalog/queries";

export default function ForYouPage() {
  return (
    <MarketShell>
      <h1 className="text-h1 text-ink-900">For you</h1>
      <p className="mt-1 max-w-xl text-body-l text-ink-700">
        Suggestions with a reason. You can change or clear these preferences at
        any time.
      </p>

      <section className="mt-5 rounded-card bg-ink-900 p-4 text-white">
        <p className="flex items-center gap-2 text-body font-semibold">
          <Sparkle
            aria-hidden="true"
            className="size-5 text-yellow-500"
            weight="fill"
          />
          Because you bought gato patate twice
        </p>
        <p className="mt-1 text-body text-white/70">
          Similar cakes and snacks from shops within 5 km.
        </p>
      </section>

      <section className="mt-5">
        <h2 className="text-h3 text-ink-900">Your preferences</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Sweet", "Local makers", "Under Rs 250", "Vegetarian"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full bg-teal-50 px-3 py-1.5 text-body font-semibold text-teal-700"
              >
                {item}
              </span>
            ),
          )}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-h3 text-ink-900">Near you, open now</h2>
        <div className="mt-3 flex flex-col gap-2">
          {nearbyPartners(3).map((partner) => (
            <ShopCard key={partner.slug} partner={partner} />
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-h3 text-ink-900">Picked for you</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 tablet:grid-cols-4">
          {featuredProducts(4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </MarketShell>
  );
}
