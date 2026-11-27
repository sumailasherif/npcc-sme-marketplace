import { FileText } from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Table, Td } from "@/components/ui/table";
import { invoices } from "@/lib/demo/business";
import { formatPrice } from "@/lib/format";

export default function InvoicesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Money"
        title="Invoices"
        description="Numbered per shop. Immutable once issued."
        actions={
          <button className="inline-flex min-h-11 items-center gap-1 rounded-button bg-ink-900 px-4 text-body font-semibold text-white">
            <FileText aria-hidden="true" className="size-4" />
            New invoice
          </button>
        }
      />

      <div className="mt-5 rounded-card border border-ink-100 bg-surface p-4">
        <Table headers={["Invoice", "Customer", "Date", "Total", "Status"]}>
          {invoices.map((invoice) => (
            <tr key={invoice.no}>
              <Td className="font-semibold text-ink-900">{invoice.no}</Td>
              <Td>{invoice.customer}</Td>
              <Td>{invoice.date}</Td>
              <Td className="tabular-price">{formatPrice(invoice.total)}</Td>
              <Td>
                <Badge tone={invoice.status === "Draft" ? "yellow" : "green"}>
                  {invoice.status}
                </Badge>
              </Td>
            </tr>
          ))}
        </Table>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-card bg-teal-50 p-4 text-body text-teal-700">
        <FileText aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        <p>
          Every delivered order can become a draft invoice. The shop approves
          before it is sent, and the PDF is stored in Supabase Storage.
        </p>
      </div>
    </div>
  );
}
