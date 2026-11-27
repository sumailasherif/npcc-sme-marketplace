import { ShieldCheck } from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { deliveryPartners } from "@/lib/demo/delivery";
import { formatPrice } from "@/lib/format";

export default function DeliveryPartnersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Network"
        title="Delivery partners"
        description="Only verified companies can carry Bazar orders. Pending partners are visible but not bookable."
      />

      <ul className="mt-5 flex flex-col gap-3">
        {deliveryPartners.map((partner) => (
          <li
            key={partner.name}
            className={`rounded-card border p-4 ${
              partner.verified
                ? "border-[#cdeccd] bg-[#fbfff8]"
                : "border-ink-100 bg-surface opacity-70"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-full bg-ink-900 text-body font-bold text-white">
                  {partner.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="flex items-center gap-1 text-body font-semibold text-ink-900">
                    {partner.name}
                    {partner.verified ? (
                      <ShieldCheck
                        aria-label="Verified"
                        className="size-4 text-success-700"
                        weight="fill"
                      />
                    ) : null}
                  </p>
                  <p className="text-caption text-ink-500">
                    {partner.coverage}
                  </p>
                </div>
              </div>
              <Badge tone={partner.verified ? "green" : "ink"}>
                {partner.status}
              </Badge>
            </div>

            <p className="mt-3 text-body text-ink-700">{partner.note}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ink-100 px-2.5 py-1 text-caption text-ink-700">
                {partner.rating > 0 ? `${partner.rating} ★` : "New"}
              </span>
              <span className="rounded-full bg-ink-100 px-2.5 py-1 text-caption text-ink-700">
                {partner.jobs} jobs
              </span>
              <span className="rounded-full bg-ink-100 px-2.5 py-1 text-caption text-ink-700">
                {partner.price > 0
                  ? formatPrice(partner.price)
                  : "Not bookable"}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-card bg-lime-50 p-4 text-body text-lime-700">
        <p className="font-semibold text-ink-900">What verified means</p>
        <p className="mt-1 text-caption">
          Company registration, insurance, fleet size, driver IDs and licences,
          coverage and a passing API test. Re-checked every six months.
        </p>
      </div>
    </div>
  );
}
