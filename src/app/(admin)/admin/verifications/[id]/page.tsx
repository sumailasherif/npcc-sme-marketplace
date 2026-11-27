import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Camera,
  Check,
  FileText,
  ShieldCheck,
  User,
  Warning,
} from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Photo } from "@/components/ui/photo";
import { verificationCases } from "@/lib/demo/trust";

const checks = [
  "Name matches ID and phone",
  "Selfie matches ID photo",
  "No duplicate account or phone",
  "First listing needs photo review",
];

export default async function VerificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = verificationCases.find((entry) => entry.id === id);
  if (!item) notFound();

  return (
    <div>
      <Link href="/admin/verifications" className="text-caption text-ink-500">
        ← Verification queue
      </Link>
      <PageHeader
        title={item.name}
        description={`${item.detail} · submitted ${item.submitted}`}
        actions={
          <div className="flex gap-2">
            <button className="min-h-11 rounded-button border border-ink-300 bg-surface px-4 text-body font-semibold text-ink-700">
              Ask for info
            </button>
            <button className="min-h-11 rounded-button bg-lime-400 px-4 text-body font-semibold text-ink-900">
              Approve
            </button>
          </div>
        }
      />

      <div className="mt-5 grid gap-4 desktop:grid-cols-2">
        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-h3 text-ink-900">Applicant</h2>
            <Badge
              tone={
                item.kind === "Individual"
                  ? "coral"
                  : item.kind === "Delivery"
                    ? "yellow"
                    : "teal"
              }
            >
              {item.kind}
            </Badge>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="grid size-14 place-items-center rounded-full bg-lime-50 text-body font-bold text-lime-700">
              {item.name.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <p className="text-body font-semibold text-ink-900">
                {item.name}
              </p>
              <p className="text-caption text-ink-500">
                Rose Hill · +230 5•• ••42
              </p>
              <div className="mt-1 flex gap-1">
                <Badge tone="green">Phone confirmed</Badge>
                <Badge tone="ink">Member 2024</Badge>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "ID front", icon: User },
              { label: "ID back", icon: User },
              { label: "Selfie", icon: Camera },
            ].map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-1 rounded-button border border-dashed border-ink-300 bg-ink-50"
              >
                <Icon aria-hidden="true" className="size-5 text-ink-500" />
                <span className="text-[11px] text-ink-500">{label}</span>
              </div>
            ))}
          </div>

          <ul className="mt-4 flex flex-col gap-2 text-body text-ink-700">
            {checks.map((check, index) => (
              <li key={check} className="flex items-center gap-2">
                {index === checks.length - 1 ? (
                  <Warning
                    aria-hidden="true"
                    className="size-4 text-lime-700"
                  />
                ) : (
                  <Check
                    aria-hidden="true"
                    className="size-4 text-success-700"
                  />
                )}
                {check}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-h3 text-ink-900">
              {item.kind === "Individual" ? "First listing" : "Documents"}
            </h2>
            <Badge
              tone={
                item.risk === "High"
                  ? "coral"
                  : item.risk === "Medium"
                    ? "yellow"
                    : "green"
              }
            >
              {item.risk} risk
            </Badge>
          </div>

          {item.kind === "Individual" ? (
            <div className="mt-3 rounded-button border border-ink-100 p-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-button bg-ink-100">
                <Photo name="iphone-11" alt="iPhone 11" sizes="50vw" />
              </div>
              <p className="mt-2 text-body font-semibold text-ink-900">
                iPhone 11 64GB
              </p>
              <p className="text-caption text-ink-500">
                Good · Rose Hill · Rs 9,500
              </p>
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                "Registration",
                "Insurance",
                "Fleet list",
                "Driver IDs",
                "COD addendum",
              ].map((doc) => (
                <div
                  key={doc}
                  className="flex aspect-[4/3] flex-col items-center justify-center gap-1 rounded-button border border-dashed border-ink-300 bg-ink-50"
                >
                  <FileText
                    aria-hidden="true"
                    className="size-5 text-ink-500"
                  />
                  <span className="text-[11px] text-ink-500">{doc}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 rounded-button bg-ink-50 p-3 text-body text-ink-700">
            <p className="font-semibold text-ink-900">Risk checks</p>
            <p className="mt-1 text-caption">
              No prior rejection. No stolen-device match. Account age 1 year.
              Address in Rose Hill.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="min-h-11 flex-1 rounded-button bg-lime-400 px-4 text-body font-semibold text-ink-900">
              Approve
            </button>
            <button className="min-h-11 rounded-button border border-ink-300 bg-surface px-4 text-body font-semibold text-ink-700">
              Reject
            </button>
          </div>
          <p className="mt-2 flex items-center gap-1 text-caption text-ink-500">
            <ShieldCheck aria-hidden="true" className="size-3" />
            Every decision writes actor, reason and timestamp to audit_log.
          </p>
        </section>
      </div>
    </div>
  );
}
