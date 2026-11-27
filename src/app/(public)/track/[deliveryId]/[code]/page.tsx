import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Lightning,
  Lock,
  MapPin,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";

import { tracking } from "@/lib/demo/delivery";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ deliveryId: string; code: string }>;
}) {
  const { deliveryId, code } = await params;
  if (deliveryId !== tracking.id || code !== tracking.code) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0f0a] text-[#eaf2e6]">
      <header className="flex items-center gap-2 border-b border-[#2a3328] bg-[#111711] px-4 py-2 text-caption text-[#b9c4b6]">
        <h1 className="sr-only">Track your delivery</h1>
        <Lock aria-hidden="true" className="size-3 text-[#4ade04]" />
        <span className="truncate font-mono">
          delivery.grabbit-express.com/track/{deliveryId}/{code}
        </span>
        <span className="ml-auto hidden text-[11px] text-[#7d8a79] tablet:block">
          Powered by Kilo
        </span>
      </header>

      <div className="relative flex-1 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(#1a2319 1px, transparent 1px), linear-gradient(90deg, #1a2319 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute left-[22%] top-[58%] h-1 w-[52%] -rotate-12 rounded-full bg-[#4ade04] opacity-70" />
        <div className="absolute left-[58%] top-[42%] grid size-9 place-items-center rounded-full bg-[#4ade04] text-[#0a0f0a] shadow-[0_0_0_8px_rgba(74,222,4,0.14)]">
          <Lightning aria-hidden="true" className="size-4" weight="fill" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1100px] gap-4 px-4 py-5 desktop:grid-cols-[380px_1fr]">
          <section className="rounded-card border border-[#2a3328] bg-[#101510]/95 p-4 shadow-2xl">
            <Image
              src="/grabbit-wordmark.png"
              alt="Grabbit Express"
              width={110}
              height={31}
              className="h-7 w-auto"
            />
            <p className="mt-1 flex items-center gap-1 text-caption text-[#7f8f7a]">
              <MapPin aria-hidden="true" className="size-3" />
              Track with Grabbit Express
            </p>

            <div className="mt-4">
              <p className="text-[11px] uppercase tracking-wider text-[#7f8f7a]">
                Errand
              </p>
              <p className="mt-1 text-body font-semibold text-white">
                {tracking.errand}
              </p>
            </div>

            <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#2c4a2a] bg-[#17251a] px-3 py-1.5 text-caption text-[#b6f58a]">
              <span className="size-2 rounded-full bg-[#4ade04]" />
              {tracking.status}
            </span>

            <div className="mt-3 flex items-start justify-between gap-2 rounded-button border border-[#2a3328] bg-[#0b120a] p-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#7f8f7a]">
                  Delivery fee
                </p>
                <p className="font-heading text-h2 text-white">
                  MUR {tracking.fee}
                </p>
                <p className="text-caption text-[#9fb09a]">Cash on delivery</p>
              </div>
              <span className="rounded-chip bg-[#3a2a06] px-2 py-1 text-[11px] font-bold text-[#ffcf5c]">
                Unpaid
              </span>
            </div>

            <p className="mt-2 text-caption leading-relaxed text-[#9fb09a]">
              Please pay this amount in cash to the rider when they complete the
              delivery.
            </p>

            <ol className="mt-3 flex flex-col">
              {[
                ["Order received", "09:41", true],
                ["Preparing your delivery", tracking.message, false],
                ["Picked up", "KFC Mahogany", false],
                ["Delivered", `Pay MUR ${tracking.fee} in cash`, false],
              ].map(([title, detail, done], index) => (
                <li key={String(title)} className="flex gap-3 py-2">
                  <span
                    className={`mt-1 size-3 shrink-0 rounded-full border-2 ${
                      done
                        ? "border-[#4ade04] bg-[#4ade04]"
                        : index === 1
                          ? "border-[#4ade04] bg-[#101510]"
                          : "border-[#3a4637]"
                    }`}
                  />
                  <span>
                    <span className="block text-body font-semibold text-[#dfe8da]">
                      {title}
                    </span>
                    <span className="text-caption text-[#7f8f7a]">
                      {detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-3 flex items-center justify-between border-t border-[#2a3328] pt-3">
              <Image
                src="/grabbit-wordmark.png"
                alt=""
                width={80}
                height={23}
                className="h-4 w-auto opacity-80"
              />
              <span className="text-[10px] text-[#7f8f7a]">
                Powered by Kilo
              </span>
            </div>
          </section>

          <div className="hidden items-end justify-end desktop:flex">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#2a3328] bg-[#111711] px-3 py-1.5 text-caption text-[#9fb09a]">
              <ShieldCheck
                aria-hidden="true"
                className="size-3 text-[#4ade04]"
              />
              Live map · Port Louis
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
