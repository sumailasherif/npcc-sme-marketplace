import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Table, Td } from "@/components/ui/table";
import { verificationCases } from "@/lib/demo/trust";

const kindTone = {
  Business: "teal",
  Individual: "coral",
  Delivery: "yellow",
} as const;

export default function VerificationsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Trust & safety"
        title="Verification queue"
        description="Three supply types, three proof bars, one audit trail."
      />

      <div className="mt-5 flex flex-wrap gap-2">
        {["All 5", "Business 2", "Individual 1", "Delivery 2"].map(
          (item, index) => (
            <span
              key={item}
              className={
                index === 0
                  ? "rounded-full bg-ink-900 px-3 py-1.5 text-caption font-semibold text-white"
                  : "rounded-full border border-ink-300 bg-surface px-3 py-1.5 text-caption text-ink-700"
              }
            >
              {item}
            </span>
          ),
        )}
      </div>

      <div className="mt-4 rounded-card border border-ink-100 bg-surface p-4">
        <Table
          headers={[
            "Applicant",
            "Type",
            "Proof",
            "Submitted",
            "Risk",
            "Status",
            "",
          ]}
        >
          {verificationCases.map((item) => (
            <tr key={item.id}>
              <Td>
                <Link
                  href={`/admin/verifications/${item.id}`}
                  className="font-semibold text-ink-900"
                >
                  {item.name}
                </Link>
                <span className="block text-caption text-ink-500">
                  {item.detail}
                </span>
              </Td>
              <Td>
                <Badge tone={kindTone[item.kind]}>{item.kind}</Badge>
              </Td>
              <Td className="text-caption">{item.proof}</Td>
              <Td className="text-caption">{item.submitted}</Td>
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
              <Td>
                <Link
                  href={`/admin/verifications/${item.id}`}
                  className="inline-flex min-h-9 items-center rounded-button border border-ink-300 px-3 text-caption font-semibold text-ink-700"
                >
                  Review
                </Link>
              </Td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
