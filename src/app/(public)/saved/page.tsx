import { Heart } from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";
import { ProductCard } from "@/components/market/product-card";
import { ShopCard } from "@/components/market/shop-card";
import { getPartner, products } from "@/lib/catalog/queries";

const savedShops = ["gato-marie", "atelier-volan", "ti-achard"];
const savedProducts = [
  "raffia-market-bag-atelier-volan",
  "gato-coco-gato-marie",
];

export default function SavedPage() {
  const shops = savedShops.flatMap((slug) => {
    const partner = getPartner(slug);
    return partner ? [partner] : [];
  });
  const items = products.filter((product) =>
    savedProducts.includes(product.slug),
  );

  return (
    <MarketShell>
      <h1 className="text-h1 text-ink-900">Saved</h1>
      <p className="mt-1 text-body text-ink-700">
        Shops and products you want to come back to.
      </p>

      <section className="mt-6">
        <h2 className="text-h3 text-ink-900">Shops</h2>
        <div className="mt-3 flex flex-col gap-2">
          {shops.map((partner) => (
            <ShopCard key={partner.slug} partner={partner} />
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-h3 text-ink-900">Products</h2>
        {items.length > 0 ? (
          <div className="mt-3 grid grid-cols-2 gap-2 tablet:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-3 flex items-center gap-2 rounded-card border border-dashed border-ink-300 bg-surface p-6 text-body text-ink-700">
            <Heart aria-hidden="true" className="size-5" />
            Nothing saved yet.
          </p>
        )}
      </section>
    </MarketShell>
  );
}
