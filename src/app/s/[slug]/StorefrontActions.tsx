"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface StorefrontActionsProps {
  shopName: string;
  shopSlug: string;
  shopImg: string;
  whatsappPhone?: string | null;
  bookable?: boolean;
  hasMapPin?: boolean;
  items: [string, number][];
}

interface CartItem {
  title: string;
  price: number;
  qty: number;
  img: string;
}

export function StorefrontActions({
  shopName,
  shopSlug,
  shopImg,
  whatsappPhone,
  bookable,
  hasMapPin,
  items,
}: StorefrontActionsProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  function addItemToCart(title: string, price: number) {
    try {
      const raw = localStorage.getItem("bazar-cart");
      const current: CartItem[] = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(current) ? current : [];
      const found = list.find((x) => x.title === title);
      if (found) found.qty += 1;
      else list.push({ title, price, qty: 1, img: shopImg });
      localStorage.setItem("bazar-cart", JSON.stringify(list));
      window.dispatchEvent(new StorageEvent("storage", { key: "bazar-cart" }));
      const badge = document.getElementById("sharedCartBadge");
      if (badge) {
        const count = list.reduce((s, x) => s + (Number(x.qty) || 1), 0);
        badge.textContent = String(count);
        badge.style.display = "grid";
      }
      setJustAdded(title);
      setTimeout(() => setJustAdded((prev) => (prev === title ? null : prev)), 1300);
    } catch {
      router.push("/?drawer=orders");
    }
  }

  function shareShopLink() {
    const url = `${window.location.origin}/s/${shopSlug}`;
    if (navigator.share) {
      navigator.share({ title: `${shopName} on Bazar`, url }).catch(() => {});
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      });
    }
  }

  const cleanDigits = whatsappPhone ? whatsappPhone.replace(/\D/g, "") : "";
  const waHref = cleanDigits
    ? `https://wa.me/${cleanDigits.startsWith("230") ? cleanDigits : `230${cleanDigits}`}?text=${encodeURIComponent(
        `Bonzour ${shopName}! I found your shop on Bazar (/s/${shopSlug}) and would like to place an order.`
      )}`
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Action Bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <a
          href={`/?drawer=messages&shop=${encodeURIComponent(shopName)}`}
          className="btn btn-lime"
          style={{ flex: "1 1 180px", minBlockSize: 44 }}
        >
          Message on Bazar
        </a>
        {waHref ? (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-black"
            style={{ flex: "1 1 180px", minBlockSize: 44 }}
          >
            WhatsApp Shop ↗
          </a>
        ) : null}
        {hasMapPin ? (
          <a
            href={`/map?shop=${encodeURIComponent(shopSlug)}`}
            className="btn btn-black"
            style={{ flex: "0 1 auto", minBlockSize: 44, padding: "0 18px" }}
          >
            View on Map ↗
          </a>
        ) : null}
        <button
          type="button"
          onClick={shareShopLink}
          className="btn"
          style={{
            flex: "0 1 auto",
            minBlockSize: 44,
            padding: "0 18px",
            background: "var(--card)",
            border: "1px solid var(--line)",
          }}
        >
          {copied ? "Link Copied ✓" : "Share Link"}
        </button>
      </div>

      {/* Catalogue Section */}
      <section aria-label="Shop catalogue">
        <div className="row-head">
          <h2 className="t-h2">
            {bookable ? "Services & Appointment Slots" : "Shop Catalogue"}
          </h2>
          <a href="/?drawer=orders" className="more">
            Open Cart &amp; Delivery ↗
          </a>
        </div>

        {items.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 17rem), 1fr))",
              gap: 14,
            }}
          >
            {items.map(([title, price]) => {
              const added = justAdded === title;
              return (
                <article
                  key={title}
                  className="card"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: 18,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <h3 className="t-h3" style={{ fontSize: "0.95rem" }}>
                      {title}
                    </h3>
                    <p
                      style={{
                        color: "var(--muted)",
                        fontSize: "0.78rem",
                        marginTop: 4,
                      }}
                    >
                      {bookable
                        ? "Instant slot confirmation"
                        : "Cash on delivery or pickup"}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      paddingTop: 10,
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    <b style={{ fontSize: "1rem", fontWeight: 800 }}>
                      Rs {price.toLocaleString()}
                    </b>
                    <button
                      type="button"
                      onClick={() => addItemToCart(title, price)}
                      className="add-deliv-btn"
                      style={{
                        padding: "7px 14px",
                        borderRadius: 999,
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        background: added ? "var(--lime)" : "var(--black)",
                        color: added ? "#0e0e0c" : "var(--lime)",
                      }}
                    >
                      {added ? "✓ Added" : bookable ? "+ Reserve" : "+ Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: 18,
              padding: 24,
              textAlign: "center",
            }}
          >
            <b className="t-h3" style={{ display: "block" }}>
              First catalogue items coming soon
            </b>
            <p style={{ color: "var(--muted)", marginTop: 6 }}>
              Message {shopName} directly above to ask about today&apos;s stock,
              custom orders, or cash-on-delivery across Mauritius.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
