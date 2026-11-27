import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Stat } from "@/components/ui/stat";
import { Table, Td } from "@/components/ui/table";
import { disputes } from "@/lib/demo/trust";
import { formatPrice } from "@/lib/format";

const tone = {
  Open: "coral",
  Replied: "yellow",
  Escalated: "teal",
  "Auto-refund": "green",
} as const;

export default function DisputesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="SafePay · Pre-loved only"
        title="Pre-loved disputes"
        description="Buyer evidence, seller response, release or refund. Shop orders are not escrowed."
        actions={<Badge tone="teal">Held in SafePay Rs 42,300</Badge>}
      />

      <div className="mt-5 grid gap-3 tablet:grid-cols-3">
        <Stat
          label="Held in escrow"
          value="Rs 42,300"
          note="across 38 orders"
        />
        <Stat
          label="Open disputes"
          value="4"
          note="2 need evidence"
          tone="warn"
        />
        <Stat label="Refunded this week" value="Rs 8,400" note="9 orders" />
      </div>

      <div className="mt-4 rounded-card border border-ink-100 bg-surface p-4">
        <Table
          headers={[
            "Order",
            "Buyer",
            "Seller",
            "Amount",
            "Reason",
            "Status",
            "",
          ]}
        >
          {disputes.map((item) => (
            <tr key={item.id}>
              <Td className="font-semibold text-ink-900">{item.id}</Td>
              <Td>{item.buyer}</Td>
              <Td>{item.seller}</Td>
              <Td className="tabular-price">{formatPrice(item.amount)}</Td>
              <Td>{item.reason}</Td>
              <Td>
                <Badge tone={tone[item.status as keyof typeof tone] ?? "ink"}>
                  {item.status}
                </Badge>
              </Td>
              <Td>
                <button className="min-h-9 rounded-button border border-ink-300 px-3 text-caption font-semibold text-ink-700">
                  Review
                </button>
              </Td>
            </tr>
          ))}
        </Table>
      </div>

      <div className="mt-4 rounded-card bg-lime-50 p-4 text-body text-lime-700">
        <p className="font-semibold text-ink-900">SafePay rules</p>
        <p className="mt-1 text-caption">
          Buyer confirms → release next payout. Refund request → seller has 48
          h. No response → auto-refund. No action → auto-release after 7 days.
        </p>
      </div>
    </div>
  );
}
