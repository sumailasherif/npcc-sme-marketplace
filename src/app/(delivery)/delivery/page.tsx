import { Lightning, MapPin } from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Stat } from "@/components/ui/stat";
import { Table, Td } from "@/components/ui/table";
import { deliveryJobs, fleet } from "@/lib/demo/delivery";
import { formatPrice } from "@/lib/format";

const tone = {
  "Picked up": "yellow",
  Open: "coral",
  Assigned: "teal",
  Delivered: "green",
} as const;

export default function DeliveryConsolePage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        eyebrow="Bazar jobs · 26 Nov"
        title="Today's runs"
        description="100% electric fleet, synced with Kilo."
        actions={<Badge tone="green">Kilo connected</Badge>}
      />

      <div className="grid gap-3 tablet:grid-cols-2 desktop:grid-cols-4">
        <Stat
          label="Jobs today"
          value="18"
          note="+5 vs yesterday"
          tone="good"
        />
        <Stat
          label="On-time"
          value={`${fleet.onTime}%`}
          note="target 95%"
          tone="good"
        />
        <Stat
          label="COD to remit"
          value={formatPrice(fleet.codToRemit)}
          note="due 17:00"
          tone="warn"
        />
        <Stat
          label="Earnings"
          value={formatPrice(fleet.earnings)}
          note="after charging"
        />
      </div>

      <div className="grid gap-4 desktop:grid-cols-[1.6fr_1fr]">
        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Job queue</h2>
          <div className="mt-3">
            <Table headers={["Job", "Pickup", "Drop", "COD", "Status"]}>
              {deliveryJobs.map((job) => (
                <tr key={job.id}>
                  <Td className="font-semibold text-ink-900">{job.id}</Td>
                  <Td>
                    <span className="block">{job.pickup}</span>
                    <span className="block text-caption text-ink-500">
                      {job.pickupArea}
                    </span>
                  </Td>
                  <Td>
                    <span className="block">{job.drop}</span>
                    <span className="block text-caption text-ink-500">
                      {job.dropArea}
                    </span>
                  </Td>
                  <Td className="tabular-price">{formatPrice(job.cod)}</Td>
                  <Td>
                    <Badge
                      tone={tone[job.status as keyof typeof tone] ?? "ink"}
                    >
                      {job.status}
                    </Badge>
                  </Td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <aside className="rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-h3 text-ink-900">Coverage</h2>
            <Badge tone="teal">Island-wide</Badge>
          </div>
          <div className="relative mt-3 h-36 overflow-hidden rounded-button bg-lime-50">
            <div className="absolute left-[18%] top-[62%] h-0.5 w-[60%] -rotate-12 bg-lime-400" />
            <div className="absolute left-[58%] top-[38%] grid size-8 place-items-center rounded-full bg-ink-900 text-yellow-500">
              <Lightning aria-hidden="true" className="size-4" weight="fill" />
            </div>
            <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-ink-900">
              <MapPin aria-hidden="true" className="size-3" />
              Rose Hill
            </span>
          </div>
          <dl className="mt-3 flex flex-col gap-2 text-body">
            <div className="flex justify-between">
              <dt className="text-ink-500">Riders online</dt>
              <dd className="font-semibold text-ink-900">
                {fleet.ridersOnline} / {fleet.fleetSize}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">EV fleet</dt>
              <dd className="font-semibold text-ink-900">12 · 100% electric</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Battery avg</dt>
              <dd className="font-semibold text-ink-900">{fleet.battery}%</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Insurance</dt>
              <dd className="font-semibold text-ink-900">Rs 5,000 / parcel</dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="rounded-card border border-ink-100 bg-surface p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-h3 text-ink-900">COD reconciliation</h2>
          <Badge tone="yellow">Due 17:00</Badge>
        </div>
        <ul className="mt-3 flex flex-col">
          {[
            ["Gato Marie", "3 orders · collected in cash", 1590],
            ["Atelier Volan", "1 order · collected in cash", 850],
          ].map(([name, detail, amount]) => (
            <li
              key={String(name)}
              className="flex items-center justify-between gap-2 border-b border-ink-100 py-3 last:border-0"
            >
              <span>
                <span className="block text-body font-semibold text-ink-900">
                  {name}
                </span>
                <span className="text-caption text-ink-500">{detail}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-body font-bold tabular-price">
                  {formatPrice(Number(amount))}
                </span>
                <button className="min-h-9 rounded-button border border-ink-300 px-3 text-caption font-semibold text-ink-700">
                  Mark remitted
                </button>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
