import {
  GenderFemale,
  HandHeart,
  HouseLine,
  Leaf,
  MapPin,
  Rocket,
  UsersThree,
} from "@phosphor-icons/react/ssr";

import type { Value } from "@/lib/catalog/types";
import { getValue } from "@/lib/catalog/values";
import { cn } from "@/lib/utils";

export const valueIcons: Record<Value, React.ElementType> = {
  "made-in-mauritius": MapPin,
  "woman-led": GenderFemale,
  handmade: HandHeart,
  "home-based": HouseLine,
  family: UsersThree,
  young: Rocket,
  "less-plastic": Leaf,
};

/** A small, quiet chip for one value. Not a link, so it can sit inside cards. */
export function ValueBadge({
  value,
  className,
  tone = "light",
}: {
  value: Value;
  className?: string;
  /** "dark" on black cards: solid lime. "light" on cream: pale lime. */
  tone?: "light" | "dark";
}) {
  const info = getValue(value);
  if (!info) return null;
  const Icon = valueIcons[value];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-caption font-semibold text-ink-900",
        tone === "dark" ? "bg-lime-400" : "bg-lime-100",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-3.5 text-ink-900" />
      {info.label}
    </span>
  );
}
