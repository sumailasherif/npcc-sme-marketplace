import Link from "next/link";

import { WeekBars } from "@/components/business/week-bars";
import { PageHeader } from "@/components/ui/page-header";
import { Stat } from "@/components/ui/stat";
import { Table, Td } from "@/components/ui/table";
import { customers, topProducts, weekRevenue } from "@/lib/demo/business";
import { formatPrice } from "@/lib/format";

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Analytics / 30 days"
        title="What actually sells"
        description="Orders, basket size and the products that carry the month."
      />

      <div className="mt-5 grid gap-3 tablet:grid-cols-2 desktop:grid-cols-4">
        <Stat label="Orders" value="184" note="+14%" tone="good" />
        <Stat
          label="Average basket"
          value={formatPrice(523)}
          note="+Rs 38"
          tone="good"
        />
        <Stat label="Repeat buyers" value="38%" note="+6 pts" tone="good" />
        <Stat label="Response score" value="96%" note="target 95%" />
      </div>

      <div className="mt-5 grid gap-4 desktop:grid-cols-[1.5fr_1fr]">
        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Revenue by day</h2>
          <WeekBars data={weekRevenue} className="mt-3" />
          <p className="mt-3 rounded-button bg-yellow-100 p-3 text-body text-ink-900">
            <strong className="font-semibold">
              Friday is 31% of weekly revenue.
            </strong>{" "}
            Samosa and gato coco drive it. Bake 40% more on Fridays.
          </p>
        </section>

        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Top products</h2>
          <Table headers={["Product", "Sold", "Revenue", "Share"]}>
            {topProducts.map((product) => (
              <tr key={product.name}>
                <Td>{product.name}</Td>
                <Td className="tabular-price">{product.sold}</Td>
                <Td className="tabular-price">
                  {formatPrice(product.revenue)}
                </Td>
                <Td className="tabular-price">{product.share}%</Td>
              </tr>
            ))}
          </Table>
        </section>
      </div>

      <section className="mt-4 rounded-card border border-ink-100 bg-surface p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-h3 text-ink-900">Customers worth keeping</h2>
          <Link
            href="/dashboard/customers"
            className="text-body font-semibold text-lime-700"
          >
            All customers
          </Link>
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {customers.slice(0, 2).map((customer) => (
            <li
              key={customer.name}
              className="flex items-center justify-between gap-2 border-b border-ink-100 pb-2 last:border-0"
            >
              <span>
                <span className="block text-body font-semibold text-ink-900">
                  {customer.name}
                </span>
                <span className="text-caption text-ink-500">
                  {customer.orders} orders · {formatPrice(customer.spend)} ·{" "}
                  {customer.last}
                </span>
              </span>
              <button className="min-h-9 rounded-button border border-ink-300 bg-surface px-3 text-caption font-semibold text-ink-700">
                Send a thank-you
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
