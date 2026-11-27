import Link from "next/link";
import { Camera, Check, ShieldCheck, User } from "@phosphor-icons/react/ssr";

import { PrelovedShell } from "@/components/preloved/preloved-shell";

const slots = [
  {
    label: "Phone number",
    detail: "+230 5•• ••42 confirmed",
    done: true,
    icon: Check,
  },
  {
    label: "National ID · front",
    detail: "Uploaded · checked",
    done: true,
    icon: User,
  },
  {
    label: "National ID · back",
    detail: "Clear photo, no glare",
    done: false,
    icon: Camera,
  },
  {
    label: "Selfie check",
    detail: "Match your ID photo",
    done: false,
    icon: Camera,
  },
];

export default function VerifyPage() {
  return (
    <PrelovedShell active="post" search={false}>
      <div className="mx-auto max-w-lg">
        <div className="h-1 rounded-full bg-ink-100">
          <div className="h-1 w-1/3 rounded-full bg-leaf-700" />
        </div>

        <h1 className="mt-4 text-h1 text-ink-900">Prove it&apos;s you.</h1>
        <p className="mt-1 text-body text-ink-700">
          One time only. Your ID is never shown to buyers.
        </p>

        <ul className="mt-5 flex flex-col gap-2">
          {slots.map(({ label, detail, done, icon: Icon }) => (
            <li
              key={label}
              className={`flex items-center gap-3 rounded-card border p-3 ${
                done
                  ? "border-[#cfe8db] bg-[#f6fbf8]"
                  : "border-ink-100 bg-surface"
              }`}
            >
              <span className="grid size-9 place-items-center rounded-full bg-white text-ink-700">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-body font-semibold text-ink-900">
                  {label}
                </span>
                <span className="text-caption text-ink-500">{detail}</span>
              </span>
              {done ? (
                <span className="rounded-full bg-success-500/15 px-2 py-1 text-caption font-semibold text-success-700">
                  Done
                </span>
              ) : (
                <button className="min-h-9 rounded-button border border-ink-300 bg-surface px-3 text-caption font-semibold text-ink-700">
                  Upload
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-start gap-2 rounded-card bg-leaf-50 p-3 text-body text-leaf-700">
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p>
            Documents live in a private bucket. Only the trust team can open
            them.
          </p>
        </div>

        <Link
          href="/sell/rules"
          className="mt-5 flex min-h-11 items-center justify-center rounded-button bg-leaf-700 px-4 text-body font-semibold text-white hover:bg-plum-700"
        >
          Continue to selling rules
        </Link>
        <p className="mt-2 text-caption text-ink-500">
          Verification usually takes under 10 minutes.
        </p>
      </div>
    </PrelovedShell>
  );
}
