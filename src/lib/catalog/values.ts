import type { Value } from "@/lib/catalog/types";

export type ValueInfo = {
  slug: Value;
  label: string;
  /** Short line for cards and filter pages. */
  blurb: string;
  /** What a business must show during verification to keep the badge. */
  check: string;
};

/** "Shop by what matters": the reasons to buy from a Mauritian business. */
export const values: ValueInfo[] = [
  {
    slug: "made-in-mauritius",
    label: "Made in Mauritius",
    blurb: "Made, grown or cooked here, not imported and resold.",
    check: "Where it is made, with photos of the workshop or kitchen.",
  },
  {
    slug: "woman-led",
    label: "Woman-led",
    blurb: "Owned and run by women.",
    check: "Owner on the business registration (BRN).",
  },
  {
    slug: "handmade",
    label: "Handmade",
    blurb: "Made by hand, in small numbers.",
    check: "Photos or a short video of the making.",
  },
  {
    slug: "home-based",
    label: "Home business",
    blurb: "Run from a home kitchen or studio.",
    check: "Business address and, for food, hygiene registration.",
  },
  {
    slug: "family",
    label: "Family business",
    blurb: "Passed down or run together as a family.",
    check: "Declared by the owner.",
  },
  {
    slug: "young",
    label: "Young entrepreneur",
    blurb: "Started by someone under 35.",
    check: "Owner's date of birth on the ID check.",
  },
  {
    slug: "less-plastic",
    label: "Less plastic",
    blurb: "Natural materials and plastic-free packaging.",
    check: "Photos of the packaging.",
  },
];

const valueMap = new Map(values.map((v) => [v.slug, v]));

export function getValue(slug: string): ValueInfo | undefined {
  return valueMap.get(slug as Value);
}
