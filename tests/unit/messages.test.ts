import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/config";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import mfe from "@/messages/mfe.json";

/** Lists every key path, e.g. "Home.tagline". */
function keyPaths(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === "object"
      ? keyPaths(value as Record<string, unknown>, path)
      : [path];
  });
}

const files: Record<string, Record<string, unknown>> = { en, fr, mfe };

describe("translation files", () => {
  const englishKeys = keyPaths(en).sort();

  it("has a message file for every supported language", () => {
    expect(Object.keys(files).sort()).toEqual([...locales].sort());
  });

  it.each(["fr", "mfe"])(
    "%s has exactly the same keys as English",
    (locale) => {
      expect(keyPaths(files[locale]).sort()).toEqual(englishKeys);
    },
  );

  it.each(Object.keys(files))("%s has no empty strings", (locale) => {
    const empty = keyPaths(files[locale]).filter((path) => {
      const value = path
        .split(".")
        .reduce<unknown>(
          (node, key) => (node as Record<string, unknown>)[key],
          files[locale],
        );
      return typeof value === "string" && value.trim() === "";
    });
    expect(empty).toEqual([]);
  });
});
