import { describe, expect, it } from "vitest";

import {
  distanceKm,
  districtCentres,
  formatDistance,
  isOpen,
  scatter,
} from "@/lib/geo";

describe("geo", () => {
  it("measures Port Louis to Rose Hill as about 9 km", () => {
    const km = distanceKm(
      districtCentres["Port Louis"],
      districtCentres["Rose Hill"],
    );
    expect(km).toBeGreaterThan(8);
    expect(km).toBeLessThan(10);
  });

  it("formats metres under 1 km and kilometres above", () => {
    expect(formatDistance(0.43)).toBe("450 m");
    expect(formatDistance(0.01)).toBe("50 m");
    expect(formatDistance(2.345)).toBe("2.3 km");
    expect(formatDistance(23.6)).toBe("24 km");
  });

  it("uses Mauritius time for opening hours", () => {
    const hours = { open: "08:00", close: "18:00" };
    // 05:00 UTC is 09:00 in Mauritius.
    expect(isOpen(hours, new Date("2026-11-27T05:00:00Z"))).toBe(true);
    // 14:30 UTC is 18:30 in Mauritius.
    expect(isOpen(hours, new Date("2026-11-27T14:30:00Z"))).toBe(false);
  });

  it("scatters a shop near its district, the same way every time", () => {
    const centre = districtCentres["Curepipe"];
    const a = scatter(centre, "atelier-volan");
    expect(scatter(centre, "atelier-volan")).toEqual(a);
    expect(distanceKm(centre, a)).toBeLessThan(1.3);
  });
});
