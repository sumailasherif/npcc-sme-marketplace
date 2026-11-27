import Link from "next/link";
import { Check, Sparkle, X } from "@phosphor-icons/react/ssr";

import { PrelovedShell } from "@/components/preloved/preloved-shell";

const allowed = ["Phones", "Furniture", "Clothes", "Tools", "Books", "Kids"];
const blocked = [
  "Food, medicine or alcohol",
  "Counterfeit brands",
  "Stolen or borrowed items",
  "Weapons or hazardous goods",
];
const tips = [
  "Natural light, plain background",
  "4 angles + any scratch or flaw",
  "Show the model number or receipt",
];

export default function RulesPage() {
  return (
    <PrelovedShell active="post" search={false}>
      <div className="mx-auto max-w-lg">
        <p className="text-caption font-semibold text-leaf-700">2 / 3</p>
        <h1 className="mt-1 text-h1 text-ink-900">Read this once.</h1>
        <p className="mt-1 text-body text-ink-700">
          Clear rules keep the marketplace safe for everyone.
        </p>

        <h2 className="mt-5 text-h3 text-ink-900">You can sell</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {allowed.map((item) => (
            <span
              key={item}
              className="rounded-full bg-leaf-50 px-3 py-1.5 text-body font-semibold text-leaf-700"
            >
              {item}
            </span>
          ))}
        </div>

        <h2 className="mt-5 text-h3 text-ink-900">Not allowed</h2>
        <ul className="mt-2 flex flex-col gap-1">
          {blocked.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-body text-ink-700"
            >
              <X
                aria-hidden="true"
                className="size-4 text-error-600"
                weight="bold"
              />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-5 text-h3 text-ink-900">Photo tips</h2>
        <ul className="mt-2 flex flex-col gap-1">
          {tips.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-body text-ink-700"
            >
              <Check
                aria-hidden="true"
                className="size-4 text-success-700"
                weight="bold"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-start gap-2 rounded-card bg-yellow-100 p-3 text-body text-ink-900">
          <Sparkle
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-yellow-500"
            weight="fill"
          />
          <p>
            <strong className="font-semibold">Pricing help.</strong> We compare
            similar sold items. You always set the final price.
          </p>
        </div>

        <Link
          href="/sell/new"
          className="mt-5 flex min-h-11 items-center justify-center rounded-button bg-leaf-700 px-4 text-body font-semibold text-white hover:bg-plum-700"
        >
          Create a listing
        </Link>
      </div>
    </PrelovedShell>
  );
}
