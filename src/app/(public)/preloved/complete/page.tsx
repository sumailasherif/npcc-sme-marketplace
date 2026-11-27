import Link from "next/link";
import { Check, Star } from "@phosphor-icons/react/ssr";

export default function CompletePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111113] text-[#f4f4f5]">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-4 py-10 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-[#ff6b2c] text-[#111]">
          <Check aria-hidden="true" className="size-8" weight="bold" />
        </span>
        <h1 className="mt-4 font-heading text-h1">Transaction completed</h1>
        <p className="mt-1 text-body text-[#a1a1aa]">
          Rs 8,500 released to Ravi S.
        </p>

        <div className="mt-6 w-full rounded-card border border-[#2c2c31] bg-[#1b1b1f] p-4 text-left">
          <p className="text-body font-semibold">How was Ravi?</p>
          <div className="mt-2 flex gap-1 text-[#ff6b2c]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                className="size-5"
                weight="fill"
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["As described", "On time", "Friendly"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#3a2115] px-3 py-1.5 text-caption font-semibold text-[#ffb08a]"
              >
                {tag}
              </span>
            ))}
          </div>
          <label
            htmlFor="review"
            className="mt-3 block text-caption text-[#a1a1aa]"
          >
            Your review
          </label>
          <textarea
            id="review"
            rows={3}
            defaultValue="Phone was exactly as shown. Easy meetup."
            className="mt-1 w-full rounded-button border border-[#2c2c31] bg-[#111113] p-3 text-body text-[#f4f4f5]"
          />
          <button className="mt-3 min-h-11 rounded-button bg-[#ff6b2c] px-4 text-body font-semibold text-[#111]">
            Submit review
          </button>
        </div>

        <div className="mt-4 flex w-full flex-col gap-2 tablet:flex-row">
          <Link
            href="/preloved/wallet"
            className="flex min-h-11 flex-1 items-center justify-center rounded-button border border-[#2c2c31] bg-[#1b1b1f] px-4 text-body font-semibold"
          >
            View SafePay wallet
          </Link>
          <Link
            href="/preloved"
            className="flex min-h-11 flex-1 items-center justify-center rounded-button border border-[#2c2c31] bg-[#1b1b1f] px-4 text-body font-semibold"
          >
            Back to listings
          </Link>
        </div>
      </main>
    </div>
  );
}
