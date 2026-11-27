import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "@phosphor-icons/react/ssr";

import { wallet } from "@/lib/demo/preloved";
import { formatPrice } from "@/lib/format";

export default function WalletPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111113] text-[#f4f4f5]">
      <header className="flex items-center gap-3 border-b border-[#2c2c31] px-4 py-2">
        <Link
          href="/preloved"
          aria-label="Back to Pre-loved"
          className="grid size-11 place-items-center rounded-full border border-[#2c2c31] bg-[#1b1b1f]"
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </Link>
        <h1 className="text-h3">SafePay</h1>
        <span className="ml-auto rounded-full bg-[#143322] px-3 py-1 text-caption font-semibold text-[#7ee2a8]">
          Verified
        </span>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-4">
        <div className="rounded-card border border-[#4a2616] bg-gradient-to-br from-[#2a1408] to-[#1b1b1f] p-4">
          <span className="rounded-full bg-[#ff6b2c]/20 px-2 py-1 text-caption font-semibold text-[#ffb08a]">
            SafePay
          </span>
          <p className="mt-2 text-caption text-[#d6c2b7]">
            Available to withdraw
          </p>
          <p className="font-heading text-[32px] font-bold text-[#ff6b2c]">
            {formatPrice(wallet.available)}
          </p>
          <p className="text-caption text-[#d6c2b7]">
            Next payout Friday · to Juice or bank
          </p>
          <button className="mt-3 min-h-11 rounded-button bg-[#ff6b2c] px-4 text-body font-semibold text-[#111]">
            Withdraw to Juice
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-card border border-[#2c2c31] bg-[#1b1b1f] p-3">
            <p className="text-caption text-[#a1a1aa]">In escrow</p>
            <p className="font-heading text-h3">{formatPrice(wallet.held)}</p>
          </div>
          <div className="rounded-card border border-[#2c2c31] bg-[#1b1b1f] p-3">
            <p className="text-caption text-[#a1a1aa]">Released</p>
            <p className="font-heading text-h3">
              {formatPrice(wallet.released)}
            </p>
          </div>
        </div>

        <h2 className="mt-4 text-caption font-semibold uppercase tracking-wider text-[#a1a1aa]">
          Recent
        </h2>
        <ul className="mt-2 flex flex-col">
          {wallet.rows.map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between gap-3 border-b border-[#2c2c31] py-3"
            >
              <span>
                <span className="block text-body font-semibold">
                  {row.label}
                </span>
                <span className="text-caption text-[#a1a1aa]">
                  {row.detail}
                </span>
              </span>
              <span className="text-body font-bold tabular-price">
                {formatPrice(row.amount)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-start gap-2 rounded-card border border-[#2c2c31] bg-[#1b1b1f] p-3 text-caption text-[#a1a1aa]">
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          Refunds return to Juice in 1–3 working days.
        </div>
      </main>
    </div>
  );
}
