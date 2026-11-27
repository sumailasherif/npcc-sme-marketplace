import { Sparkle } from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { customers } from "@/lib/demo/business";
import { formatPrice } from "@/lib/format";

const tone = { VIP: "teal", "Win back": "yellow", Regular: "ink" } as const;
const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function CustomersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Relationships"
        title="Customers"
        description="Repeat buyers, spend and who to bring back."
      />

      <div className="mt-5 grid gap-3 tablet:grid-cols-3">
        <div className="rounded-card border border-ink-100 bg-surface p-4">
          <p className="text-caption text-ink-500">Orders</p>
          <p className="text-h2 tabular-price text-ink-900">184</p>
        </div>
        <div className="rounded-card border border-ink-100 bg-surface p-4">
          <p className="text-caption text-ink-500">Repeat buyers</p>
          <p className="text-h2 tabular-price text-ink-900">38%</p>
        </div>
        <div className="rounded-card border border-ink-100 bg-surface p-4">
          <p className="text-caption text-ink-500">Average basket</p>
          <p className="text-h2 tabular-price text-ink-900">
            {formatPrice(523)}
          </p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {customers.map((customer) => (
          <li
            key={customer.name}
            className="flex items-center gap-3 rounded-card border border-ink-100 bg-surface p-3"
          >
            <span className="grid size-10 place-items-center rounded-full bg-teal-50 text-body font-bold text-teal-700">
              {initials(customer.name)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body font-semibold text-ink-900">
                {customer.name}
              </span>
              <span className="block text-caption text-ink-500">
                {customer.orders} orders · {formatPrice(customer.spend)}
              </span>
              <span className="text-caption text-ink-500">
                Last: {customer.last}
              </span>
            </span>
            <Badge tone={tone[customer.tag]}>{customer.tag}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-start gap-2 rounded-card bg-teal-50 p-4 text-body text-teal-700">
        <Sparkle
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0"
          weight="fill"
        />
        <p>
          Nadia orders every Friday around 09:00. A small reminder on Thursday
          could lift repeat orders.
        </p>
      </div>
    </div>
  );
}
