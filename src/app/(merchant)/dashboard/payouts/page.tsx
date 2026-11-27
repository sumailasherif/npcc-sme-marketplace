import { PageHeader } from "@/components/ui/page-header";
import { payouts } from "@/lib/demo/business";
import { formatPrice } from "@/lib/format";

export default function PayoutsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        eyebrow="Money"
        title="Payouts"
        description="Available balance, fees and statements."
      />

      <div className="mt-4 rounded-card bg-gradient-to-br from-teal-700 to-ink-900 p-5 text-white">
        <p className="text-caption text-white/60">Available to withdraw</p>
        <p className="mt-1 font-heading text-[32px] font-bold tabular-price">
          {formatPrice(payouts.available)}
        </p>
        <p className="text-caption text-white/60">Next payout Friday</p>
        <button className="mt-3 min-h-11 rounded-button bg-white px-4 text-body font-semibold text-ink-900">
          Withdraw
        </button>
      </div>

      <dl className="mt-4 flex flex-col gap-2 rounded-card border border-ink-100 bg-surface p-4 text-body">
        <div className="flex justify-between text-ink-700">
          <dt>Gross sales</dt>
          <dd className="tabular-price">{formatPrice(payouts.gross)}</dd>
        </div>
        <div className="flex justify-between text-ink-700">
          <dt>Platform fee (5%)</dt>
          <dd className="tabular-price">− {formatPrice(payouts.fee)}</dd>
        </div>
        <div className="flex justify-between text-ink-700">
          <dt>Delivery collected</dt>
          <dd className="tabular-price">{formatPrice(payouts.delivery)}</dd>
        </div>
        <div className="flex justify-between border-t border-ink-100 pt-2 text-h3 text-ink-900">
          <dt>Net to you</dt>
          <dd className="tabular-price">{formatPrice(payouts.net)}</dd>
        </div>
      </dl>

      <h2 className="mt-4 text-h3 text-ink-900">Recent</h2>
      <ul className="mt-2 flex flex-col">
        {payouts.recent.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-2 border-b border-ink-100 py-3 last:border-0"
          >
            <span>
              <span className="block text-body font-semibold text-ink-900">
                {row.label}
              </span>
              <span className="text-caption text-ink-500">{row.detail}</span>
            </span>
            <span className="text-body font-bold tabular-price text-ink-900">
              {formatPrice(row.amount)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-card bg-teal-50 p-4 text-body text-teal-700">
        <p className="font-semibold text-ink-900">Statement ready</p>
        <p className="mt-1 text-caption">
          Download a PDF with every order, fee and payout.
        </p>
      </div>
    </div>
  );
}
