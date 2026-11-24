/**
 * Formats a Mauritian rupee amount the same way in every language,
 * as the spec asks: 1250 -> "Rs 1,250", 99.5 -> "Rs 99.50".
 */
export function formatPrice(amountMur: number): string {
  if (!Number.isFinite(amountMur)) {
    throw new Error(`formatPrice: expected a finite number, got ${amountMur}`);
  }
  const isWhole = Number.isInteger(amountMur);
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amountMur));
  return `${amountMur < 0 ? "-" : ""}Rs ${formatted}`;
}

/** Formats a date as "25 Nov 2026" (spec: Localisation), in Mauritius time. */
export function formatDate(date: Date | string): string {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Indian/Mauritius",
  }).format(value);
}
