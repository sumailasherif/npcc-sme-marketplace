import { Sparkle } from "@phosphor-icons/react/ssr";

import { PageHeader } from "@/components/ui/page-header";
import { Stat } from "@/components/ui/stat";
import { Table, Td } from "@/components/ui/table";
import { finance } from "@/lib/demo/business";
import { formatPrice } from "@/lib/format";

export default function MoneyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Money / November"
        title="Revenue, profit & balance sheet"
        description="Computed from orders, purchases and expenses. AI writes the sentence, not the number."
        actions={
          <div className="flex gap-2">
            <button className="min-h-11 rounded-button border border-ink-300 bg-surface px-4 text-body font-semibold text-ink-700">
              Export PDF
            </button>
            <button className="min-h-11 rounded-button bg-teal-500 px-4 text-body font-semibold text-white">
              Send to accountant
            </button>
          </div>
        }
      />

      <div className="mt-5 grid gap-3 tablet:grid-cols-2 desktop:grid-cols-4">
        <Stat
          label="Revenue"
          value={formatPrice(finance.revenue)}
          note="+22% vs Oct"
          tone="good"
        />
        <Stat
          label="Cost of goods"
          value={formatPrice(finance.cogs)}
          note="61% of revenue"
        />
        <Stat
          label="Net profit"
          value={formatPrice(finance.profit)}
          note="32.6% margin"
          tone="good"
        />
        <Stat
          label="Cash on hand"
          value={formatPrice(finance.cash)}
          note="+Rs 9,200"
          tone="good"
        />
      </div>

      <div className="mt-5 grid gap-4 desktop:grid-cols-[1.4fr_1fr]">
        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Balance sheet · 26 Nov</h2>
          <div className="mt-3">
            <Table headers={["Line", "Amount"]}>
              {[
                ["Cash & mobile money", finance.cash],
                ["Stock on hand", finance.stock],
                ["Money owed by customers", finance.receivables],
              ].map(([label, amount]) => (
                <tr key={String(label)}>
                  <Td>{label}</Td>
                  <Td className="text-right tabular-price">
                    {formatPrice(Number(amount))}
                  </Td>
                </tr>
              ))}
              <tr>
                <Td className="font-semibold text-ink-900">Total assets</Td>
                <Td className="text-right font-semibold tabular-price">
                  {formatPrice(finance.assets)}
                </Td>
              </tr>
              <tr>
                <Td>Supplier bills</Td>
                <Td className="text-right tabular-price">
                  {formatPrice(finance.liabilities)}
                </Td>
              </tr>
              <tr>
                <Td className="font-semibold text-ink-900">Net worth</Td>
                <Td className="text-right font-semibold tabular-price">
                  {formatPrice(finance.netWorth)}
                </Td>
              </tr>
            </Table>
          </div>
        </section>

        <aside className="rounded-card border border-teal-100 bg-[#f7fcfc] p-4">
          <h2 className="flex items-center gap-2 text-h3 text-ink-900">
            <Sparkle
              aria-hidden="true"
              className="size-5 text-teal-700"
              weight="fill"
            />
            AI narrative
          </h2>
          <p className="mt-3 text-body-l text-ink-700">
            Revenue grew 22% this month, driven by Friday samosa orders. Profit
            margin is healthy at 32.6%, but stock value is low — reorder before
            Friday or you may miss about Rs 4,800 in sales.
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-body">
            <li className="flex justify-between gap-2">
              <span className="text-ink-500">Best margin</span>
              <span className="font-semibold text-ink-900">
                Gato coco · 41%
              </span>
            </li>
            <li className="flex justify-between gap-2">
              <span className="text-ink-500">Worst margin</span>
              <span className="font-semibold text-ink-900">Samosa · 18%</span>
            </li>
            <li className="flex justify-between gap-2">
              <span className="text-ink-500">Biggest risk</span>
              <span className="font-semibold text-ink-900">
                Friday stock-out
              </span>
            </li>
          </ul>
          <button className="mt-4 min-h-11 rounded-button bg-ink-900 px-4 text-body font-semibold text-white">
            Draft the reorder list
          </button>
        </aside>
      </div>
    </div>
  );
}
