import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Table, Td } from "@/components/ui/table";
import { orders } from "@/lib/demo/business";
import { formatPrice } from "@/lib/format";

const tone = {
  New: "coral",
  Preparing: "yellow",
  Ready: "teal",
  Delivered: "green",
} as const;

export default function OrdersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="Orders"
        description="Every order from every channel, in one queue."
        actions={
          <Link
            href="/dashboard/products"
            className="inline-flex min-h-11 items-center rounded-button border border-ink-300 bg-surface px-4 text-body font-semibold text-ink-700"
          >
            Products
          </Link>
        }
      />

      <div className="mt-5 rounded-card border border-ink-100 bg-surface p-4">
        <Table
          headers={["Order", "Customer", "Items", "Total", "Payment", "Status"]}
        >
          {orders.map((order) => (
            <tr key={order.id}>
              <Td>
                <Link
                  href={`/dashboard/orders/${order.id}`}
                  className="font-semibold text-ink-900"
                >
                  {order.id}
                </Link>
                <span className="block text-caption text-ink-500">
                  {order.placedAt}
                </span>
              </Td>
              <Td>
                <span className="block text-ink-900">{order.customer}</span>
                <span className="block text-caption text-ink-500">
                  {order.district}
                </span>
              </Td>
              <Td className="tabular-price">{order.items}</Td>
              <Td className="tabular-price">{formatPrice(order.total)}</Td>
              <Td>{order.payment}</Td>
              <Td>
                <Badge tone={tone[order.status]}>{order.status}</Badge>
              </Td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
