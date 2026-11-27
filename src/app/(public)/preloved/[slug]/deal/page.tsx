import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Microphone,
  PaperPlaneRight,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";

import { Photo } from "@/components/ui/photo";
import { dealMessages, getListing } from "@/lib/demo/preloved";
import { formatPrice } from "@/lib/format";

const wave = [5, 9, 14, 7, 12, 6, 10, 4];

export default async function DealRoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const listing = getListing((await params).slug);
  if (!listing) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-[#111113] text-[#f4f4f5]">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-[#2c2c31] bg-[#111113]/95 px-4 py-2 backdrop-blur">
        <Link
          href={`/preloved/${listing.slug}`}
          aria-label="Back to listing"
          className="grid size-11 place-items-center rounded-full border border-[#2c2c31] bg-[#1b1b1f] transition-colors hover:border-[#ff6b2c]"
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </Link>
        <h1 className="font-heading text-[1.35rem] font-medium tracking-[-0.03em]">
          Deal room
        </h1>
        <span className="ml-auto rounded-full bg-[#3a2115] px-3 py-1 text-caption font-semibold text-[#ffb08a]">
          Offer
        </span>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-4">
        <div className="flex items-center gap-3 rounded-[12px] border border-[#2c2c31] bg-[#1b1b1f] p-2">
          <span className="relative size-12 shrink-0 overflow-hidden rounded-[8px] bg-[#2c2c31]">
            <Photo name={listing.photo} alt="" sizes="48px" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-body font-semibold">{listing.title}</p>
            <p className="text-caption text-[#a1a1aa]">
              {formatPrice(listing.price)} · {listing.condition}
            </p>
          </div>
          <span className="rounded-full bg-[#ff6b2c] px-2 py-1 text-[11px] font-bold text-[#111]">
            Offer
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {dealMessages.map((message, index) => {
            if (message.from === "voice") {
              return (
                <div
                  key={`${message.from}-${index}`}
                  className="animate-rise flex max-w-[82%] items-center gap-2 self-start rounded-2xl rounded-bl-sm bg-[#1f1f24] px-3 py-2 text-body"
                  style={{ animationDelay: `${120 + index * 70}ms` }}
                >
                  <Microphone aria-hidden="true" className="size-4" />
                  <span className="flex h-5 items-center gap-0.5">
                    {wave.map((height, bar) => (
                      <span
                        key={bar}
                        className="wave-bar w-0.5 rounded-full bg-[#ff9b6a]"
                        style={{
                          height,
                          animationDelay: `${bar * 90}ms`,
                        }}
                      />
                    ))}
                  </span>
                  <span className="text-caption">{message.text}</span>
                </div>
              );
            }
            const mine = message.from === "me";
            return (
              <div
                key={`${message.from}-${index}`}
                className={
                  mine
                    ? "animate-rise max-w-[82%] self-end rounded-2xl rounded-br-sm bg-[#ff6b2c] px-3 py-2 text-body text-[#111]"
                    : "animate-rise max-w-[82%] self-start rounded-2xl rounded-bl-sm bg-[#1f1f24] px-3 py-2 text-body text-[#e4e4e7]"
                }
                style={{ animationDelay: `${120 + index * 70}ms` }}
              >
                <p>{message.text}</p>
                <span className="mt-1 block text-[10px] opacity-60">
                  {message.time}
                </span>
              </div>
            );
          })}
          <p
            className="flex items-center gap-1.5 self-start px-2 py-1 text-[11px] text-[#71717a]"
            aria-live="polite"
          >
            <span className="flex gap-0.5">
              <span className="size-1 animate-pulse rounded-full bg-[#ff6b2c]" />
              <span
                className="size-1 animate-pulse rounded-full bg-[#ff6b2c]"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="size-1 animate-pulse rounded-full bg-[#ff6b2c]"
                style={{ animationDelay: "300ms" }}
              />
            </span>
            {listing.seller.split(" ")[0]} is typing
          </p>
        </div>

        <div className="mt-4 rounded-[12px] border border-[#3a2a20] bg-[#1b1512] p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-caption text-[#a1a1aa]">Your offer</p>
            <span className="rounded-full bg-[#ff6b2c] px-2 py-1 text-[11px] font-bold text-[#111]">
              Pending
            </span>
          </div>
          <p className="mt-1 font-heading text-[2rem] font-medium tracking-[-0.04em] text-[#ff6b2c]">
            {formatPrice(8500)}
          </p>
          <p className="mt-1 text-caption text-[#a1a1aa]">
            {listing.seller} has 24 h to accept. SafePay holds your money until
            you confirm the item.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="min-h-11 rounded-full bg-[#ff6b2c] px-3 text-body font-semibold text-[#111] transition-colors hover:bg-[#ff8a57]">
              Cancel offer
            </button>
            <button className="min-h-11 rounded-full border border-[#2c2c31] bg-[#1b1b1f] px-3 text-body font-semibold transition-colors hover:border-[#ff6b2c]/50">
              Edit
            </button>
          </div>
        </div>

        <div className="sticky bottom-3 mt-3 flex items-center gap-2 rounded-full border border-[#2c2c31] bg-[#1b1b1f]/95 px-4 py-2 backdrop-blur">
          <input
            aria-label="Message seller"
            placeholder={`Message ${listing.seller}…`}
            className="min-h-9 flex-1 bg-transparent text-body text-[#f4f4f5] outline-none placeholder:text-[#71717a]"
          />
          <Microphone aria-hidden="true" className="size-4 text-[#a1a1aa]" />
          <button
            aria-label="Send"
            className="grid size-9 place-items-center rounded-full bg-[#ff6b2c] text-[#111] transition-transform hover:scale-105"
          >
            <PaperPlaneRight
              aria-hidden="true"
              className="size-4"
              weight="fill"
            />
          </button>
        </div>

        <p className="mt-3 flex items-center gap-1 text-caption text-[#a1a1aa]">
          <ShieldCheck aria-hidden="true" className="size-3" />
          Meet in public · inspect before paying
        </p>

        <Link
          href={`/preloved/${listing.slug}/offer`}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#2c2c31] px-4 text-body font-semibold text-[#f4f4f5] transition-colors hover:border-[#ff6b2c]/60"
        >
          <Check aria-hidden="true" className="size-4 text-[#ff6b2c]" />
          Seller accepted? Continue to SafePay
        </Link>
      </main>
    </div>
  );
}
