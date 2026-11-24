import { describe, expect, it } from "vitest";

import { formatDate, formatPrice } from "@/lib/format";

describe("formatPrice", () => {
  it("formats whole rupees with a thousands comma", () => {
    expect(formatPrice(1250)).toBe("Rs 1,250");
    expect(formatPrice(1250000)).toBe("Rs 1,250,000");
  });

  it("shows two decimals only when there are cents", () => {
    expect(formatPrice(99.5)).toBe("Rs 99.50");
    expect(formatPrice(45)).toBe("Rs 45");
  });

  it("handles zero and negatives (refunds)", () => {
    expect(formatPrice(0)).toBe("Rs 0");
    expect(formatPrice(-200)).toBe("-Rs 200");
  });

  it("rejects values that are not numbers", () => {
    expect(() => formatPrice(Number.NaN)).toThrow();
  });
});

describe("formatDate", () => {
  it("formats as '25 Nov 2026' in Mauritius time", () => {
    // 21:30 UTC on 24 Nov is already 01:30 on 25 Nov in Mauritius (UTC+4).
    expect(formatDate("2026-11-24T21:30:00Z")).toBe("25 Nov 2026");
  });
});
