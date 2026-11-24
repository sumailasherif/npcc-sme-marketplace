import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import tokens from "../../design/tokens.json";

/**
 * design/tokens.json (for Figma) and globals.css (for code) must agree.
 * If this fails, someone changed a colour in one place but not the other.
 */
const css = readFileSync(join(__dirname, "../../src/app/globals.css"), "utf8");

describe("design tokens", () => {
  it.each(Object.entries(tokens.color))(
    "colour %s matches between tokens.json and globals.css",
    (name, hex) => {
      const match = css.match(
        new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`),
      );
      expect(match, `--color-${name} missing from globals.css`).not.toBeNull();
      expect(match![1].toLowerCase()).toBe(hex.toLowerCase());
    },
  );

  it.each(Object.entries(tokens.radius))("radius %s matches", (name, px) => {
    expect(css).toContain(`--radius-${name}: ${px}px;`);
  });

  it.each(Object.entries(tokens.text))(
    "type style %s matches size and line height",
    (name, style) => {
      expect(css).toContain(`--text-${name}: ${style.size / 16}rem;`);
      expect(css).toContain(
        `--text-${name}--line-height: ${style.lineHeight / 16}rem;`,
      );
      expect(css).toContain(`--text-${name}--font-weight: ${style.weight};`);
    },
  );
});
