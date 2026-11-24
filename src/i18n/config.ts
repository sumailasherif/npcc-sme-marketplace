/** Supported UI languages: English, French, Mauritian Kreol (Morisien, ISO 639-3 "mfe"). */
export const locales = ["en", "fr", "mfe"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie that remembers the visitor's language choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
