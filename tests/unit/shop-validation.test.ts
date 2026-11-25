import { describe, expect, it } from "vitest";

import {
  createShopSchema,
  formatMuMobile,
  normalizeMuMobile,
  shopSlugSchema,
  slugify,
  whatsappLink,
} from "@/lib/validation/shop";

describe("slugify", () => {
  it("makes a link-friendly name", () => {
    expect(slugify("Gâteaux Chez Marie!")).toBe("gateaux-chez-marie");
    expect(slugify("  Achards & Piments  ")).toBe("achards-and-piments");
    expect(slugify("Ti Lakaz Kreol 2026")).toBe("ti-lakaz-kreol-2026");
  });

  it("is at most 40 characters and never ends with a dash", () => {
    const slug = slugify("a".repeat(30) + " " + "b".repeat(30));
    expect(slug.length).toBeLessThanOrEqual(40);
    expect(slug.endsWith("-")).toBe(false);
  });
});

describe("shop link (slug) rules", () => {
  it.each(["gato-marie", "abc", "shop-2026"])("accepts %s", (slug) => {
    expect(shopSlugSchema.safeParse(slug).success).toBe(true);
  });

  it.each(["ab", "-abc", "abc-", "Bad Slug", "dashboard", "admin"])(
    "rejects %s",
    (slug) => {
      expect(shopSlugSchema.safeParse(slug).success).toBe(false);
    },
  );
});

describe("Mauritius mobile numbers", () => {
  it.each([
    ["5123 4567", "+23051234567"],
    ["+230 5123 4567", "+23051234567"],
    ["230-5123-4567", "+23051234567"],
    ["0023051234567", "+23051234567"],
  ])("normalises %s", (input, expected) => {
    expect(normalizeMuMobile(input)).toBe(expected);
  });

  it.each([
    "212 3456",
    "+230 212 3456",
    "5123 456",
    "hello",
    "+44 7700 900123",
  ])("rejects %s", (input) => {
    expect(normalizeMuMobile(input)).toBeNull();
  });

  it("formats for display", () => {
    expect(formatMuMobile("+23051234567")).toBe("+230 5123 4567");
  });

  it("builds a WhatsApp link with a message", () => {
    expect(whatsappLink("+23051234567", "Bonzour!")).toBe(
      "https://wa.me/23051234567?text=Bonzour!",
    );
  });
});

describe("createShopSchema", () => {
  const valid = {
    name: "Gato Marie",
    slug: "gato-marie",
    categoryId: "6f1f2b3c-1d2e-4f5a-8b9c-0d1e2f3a4b5c",
    district: "plaines_wilhems",
    whatsappPhone: "5123 4567",
    description: "",
    logoUrl: "",
  };

  it("accepts a valid shop and cleans the values", () => {
    const result = createShopSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data).toMatchObject({
      whatsappPhone: "+23051234567",
      description: undefined,
      logoUrl: undefined,
    });
  });

  it("returns translation keys as error messages", () => {
    const result = createShopSchema.safeParse({
      ...valid,
      name: "A",
      whatsappPhone: "123",
      district: "atlantis",
    });
    expect(result.success).toBe(false);
    const messages = result.error!.issues.map((i) => i.message).sort();
    expect(messages).toEqual(["nameTooShort", "phoneFormat", "required"]);
  });
});
