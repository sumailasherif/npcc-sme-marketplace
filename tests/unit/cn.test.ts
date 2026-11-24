import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("keeps the later of two conflicting classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("treats text-h1 as a size and text-white as a colour (keeps both)", () => {
    expect(cn("text-h1 text-white")).toBe("text-h1 text-white");
  });

  it("lets a later size token replace an earlier one", () => {
    expect(cn("text-body", "text-h1")).toBe("text-h1");
  });

  it("merges our custom radius and shadow tokens", () => {
    expect(cn("rounded-button", "rounded-card")).toBe("rounded-card");
    expect(cn("shadow-e1", "shadow-e3")).toBe("shadow-e3");
  });
});
