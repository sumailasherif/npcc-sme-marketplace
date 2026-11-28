import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StorefrontActions } from "./StorefrontActions";
import { DISTRICT_LABELS } from "@/lib/districts";
import { hasSupabaseEnv } from "@/lib/env";
import { SHOWCASE_SHOPS } from "@/lib/showcase-shops";
import { getShopBySlug } from "@/lib/shops";

interface ResolvedShopView {
  slug: string;
  name: string;
  categoryLabel: string;
  placeLabel: string;
  description: string;
  badge: string;
  verified: boolean;
  rating: string;
  revs: number;
  logoUrl: string | null;
  coverUrl: string;
  whatsappPhone: string | null;
  bookable: boolean;
  hasMapPin: boolean;
  items: [string, number][];
}

async function resolveStorefront(slug: string): Promise<ResolvedShopView | null> {
  const key = slug.toLowerCase();

  if (hasSupabaseEnv()) {
    try {
      const dbShop = await getShopBySlug(key);
      if (dbShop) {
        const district = DISTRICT_LABELS[dbShop.district] ?? "Mauritius";
        const catName = dbShop.category?.name_en ?? "Local Business";
        return {
          slug: dbShop.slug,
          name: dbShop.name,
          categoryLabel: catName,
          placeLabel: `${catName} · ${district}`,
          description:
            dbShop.description ||
            `Welcome to ${dbShop.name} in ${district}, Mauritius. Order directly or send us an enquiry on Bazar.`,
          badge:
            dbShop.verification_status === "verified"
              ? "Verified Shop"
              : "New on Bazar",
          verified: dbShop.verification_status === "verified",
          rating: dbShop.rating_count > 0 ? Number(dbShop.rating_avg).toFixed(1) : "New",
          revs: dbShop.rating_count,
          logoUrl: dbShop.logo_url,
          coverUrl: dbShop.cover_url || "/photos/mu-caudan-harbour.jpg",
          whatsappPhone: dbShop.whatsapp_phone,
          bookable: dbShop.category?.type === "service",
          hasMapPin: key in SHOWCASE_SHOPS,
          items: SHOWCASE_SHOPS[key]?.items ?? [],
        };
      }
    } catch {
      // Fall back cleanly to showcase directory if DB is unreachable
    }
  }

  const demo = SHOWCASE_SHOPS[key];
  if (!demo) return null;

  return {
    slug: demo.id,
    name: demo.name,
    categoryLabel: demo.cat,
    placeLabel: demo.meta,
    description: `${demo.name} (${demo.meta}) — explore featured items, check availability, and order with island-wide delivery or store pickup on Bazar Mauritius.`,
    badge: demo.badge,
    verified: true,
    rating: demo.rating,
    revs: demo.revs,
    logoUrl: null,
    coverUrl: demo.img,
    whatsappPhone: null,
    bookable: Boolean(demo.bookable),
    hasMapPin: true,
    items: demo.items,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const shop = await resolveStorefront(slug);
  if (!shop) {
    return { title: "Shop not found" };
  }
  return {
    title: shop.name,
    description: shop.description,
    openGraph: {
      title: `${shop.name} — Bazar Mauritius`,
      description: shop.description,
      images: shop.coverUrl ? [{ url: shop.coverUrl }] : undefined,
    },
  };
}

export default async function PublicShopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const shop = await resolveStorefront(slug);
  if (!shop) notFound();

  const initials = shop.name
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Shared App Bar */}
      <header className="app-bar">
        <div className="wrap">
          <a href="/" className="logo">
            bazar
          </a>
          <nav className="top-nav" aria-label="Primary">
            <a href="/">Home</a>
            <a href="/map">Map</a>
            <a href="/resell">Resell</a>
            <a href="/?drawer=orders">Orders</a>
          </nav>
          <div className="right">
            <a className="icon-btn" href="/?drawer=messages" aria-label="Messages">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
              </svg>
            </a>
            <a className="icon-btn" href="/?drawer=orders" aria-label="Cart">
              <span className="cnt-badge" id="sharedCartBadge">
                2
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: 18 }}>
        {/* Back Breadcrumb */}
        <div style={{ marginBottom: 12 }}>
          <a
            href="/"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--muted)",
            }}
          >
            ← Back to Bazar Marketplace
          </a>
        </div>

        {/* Storefront Hero Card */}
        <section
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: 24,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              position: "relative",
              height: "clamp(180px, 28vw, 260px)",
              background: "#151812",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shop.coverUrl}
              alt={shop.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <span
              className="badge"
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                background: "var(--lime)",
                color: "#0e0e0c",
                padding: "5px 12px",
                borderRadius: 999,
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              {shop.badge}
            </span>
          </div>

          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <div
                className="mono"
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  background: "var(--black)",
                  color: "var(--lime)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  overflow: "hidden",
                  flex: "none",
                }}
              >
                {shop.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={shop.logoUrl}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  initials
                )}
              </div>

              <div style={{ flex: 1, minWidth: 200 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <h1 className="t-h1" style={{ fontSize: "1.5rem" }}>
                    {shop.name}
                  </h1>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--lime-ink)",
                    }}
                  >
                    {shop.verified ? "✓ Verified Business" : "• Pending review"}
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.85rem",
                    marginTop: 2,
                  }}
                >
                  {shop.placeLabel}
                </p>
              </div>

              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: "rgba(245, 158, 11, 0.16)",
                  border: "1px solid rgba(245, 158, 11, 0.38)",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                }}
              >
                ★ {shop.rating}
                {shop.revs > 0 ? ` (${shop.revs})` : ""}
              </div>
            </div>

            <p className="t-body" style={{ color: "var(--black-2)", maxWidth: "68ch" }}>
              {shop.description}
            </p>

            <StorefrontActions
              shopName={shop.name}
              shopSlug={shop.slug}
              shopImg={shop.coverUrl}
              whatsappPhone={shop.whatsappPhone}
              bookable={shop.bookable}
              hasMapPin={shop.hasMapPin}
              items={shop.items}
            />
          </div>
        </section>
      </main>

      {/* Mobile / Tablet Bottom Tab Bar */}
      <nav className="tab-bar t-caption" aria-label="Bottom">
        <a href="/">
          <span className="pill">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z" />
            </svg>
          </span>
          <span>Home</span>
        </a>
        <a href="/map">
          <span className="pill">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20Z" />
              <path d="M9 4v13.5M15 6.5V20" />
            </svg>
          </span>
          <span>Map</span>
        </a>
        <a href="/resell">
          <span className="pill">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </span>
          <span>Resell</span>
        </a>
        <a href="/?drawer=orders">
          <span className="pill">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 8 12 3 3 8v8l9 5 9-5Z" />
              <path d="m3 8 9 5 9-5M12 13v8" />
            </svg>
          </span>
          <span>Orders</span>
        </a>
      </nav>
    </>
  );
}
