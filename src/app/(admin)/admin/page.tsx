import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Stat } from "@/components/ui/stat";
import { Table, Td } from "@/components/ui/table";
import { disputes, trustKpis, verificationCases } from "@/lib/demo/trust";
import { formatPrice } from "@/lib/format";

export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        eyebrow="Trust & safety"
        title="Platform overview"
        description="Verification, disputes and the health of both sides."
        actions={<Badge tone="green">All systems normal</Badge>}
      />

      <div className="grid gap-3 tablet:grid-cols-2 desktop:grid-cols-4">
        {trustKpis.map((kpi) => (
          <Stat
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            note={kpi.note}
          />
        ))}
      </div>

      <div className="grid gap-4 desktop:grid-cols-[1.5fr_1fr]">
        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-h3 text-ink-900">Verification queue</h2>
            <Link
              href="/admin/verifications"
              className="text-body font-semibold text-lime-700"
            >
              See all
            </Link>
          </div>
          <div className="mt-3">
            <Table headers={["Applicant", "Type", "Risk", "Status"]}>
              {verificationCases.slice(0, 3).map((item) => (
                <tr key={item.id}>
                  <Td>
                    <Link
                      href={`/admin/verifications/${item.id}`}
                      className="font-semibold text-ink-900"
                    >
                      {item.name}
                    </Link>
                  </Td>
                  <Td>{item.kind}</Td>
                  <Td>
                    <Badge
                      tone={
                        item.risk === "High"
                          ? "coral"
                          : item.risk === "Medium"
                            ? "yellow"
                            : "green"
                      }
                    >
                      {item.risk}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge tone={item.status === "Pending" ? "yellow" : "teal"}>
                      {item.status}
                    </Badge>
                  </Td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-h3 text-ink-900">Pre-loved disputes</h2>
            <Link
              href="/admin/disputes"
              className="text-body font-semibold text-lime-700"
            >
              See all
            </Link>
          </div>
          <ul className="mt-3 flex flex-col">
            {disputes.slice(0, 3).map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 border-b border-ink-100 py-2 last:border-0"
              >
                <span>
                  <span className="block text-body font-semibold text-ink-900">
                    {item.id}
                  </span>
                  <span className="text-caption text-ink-500">
                    {item.reason} · {formatPrice(item.amount)}
                  </span>
                </span>
                <Badge
                  tone={
                    item.status === "Open"
                      ? "coral"
                      : item.status === "Auto-refund"
                        ? "green"
                        : "yellow"
                  }
                >
                  {item.status}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
