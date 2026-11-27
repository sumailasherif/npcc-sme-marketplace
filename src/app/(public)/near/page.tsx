import type { Metadata } from "next";
import { connection } from "next/server";

import { MarketShell } from "@/components/market/market-shell";
import { NearbyExplorer } from "@/components/near/nearby-explorer";
import { categories, partners } from "@/lib/catalog/queries";

export const metadata: Metadata = {
  title: "Businesses near you · Bazar",
  description: "Find verified Mauritian businesses near you, on a map.",
};

export default async function NearPage() {
  // Open or closed depends on the time, so render on each request.
  await connection();

  return (
    <MarketShell>
      <NearbyExplorer
        partners={partners}
        categories={categories.map(({ slug, name }) => ({ slug, name }))}
        nowIso={new Date().toISOString()}
      />
    </MarketShell>
  );
}
