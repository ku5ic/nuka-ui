import { describe, it, expect } from "vitest";
import {
  resolveResponsiveClasses,
  gapClasses,
  directionClasses,
} from "./responsive";
import type { GapScale, Direction } from "./responsive";

describe("resolveResponsiveClasses", () => {
  it("returns empty array for undefined input", () => {
    expect(resolveResponsiveClasses<GapScale>(undefined, gapClasses)).toEqual(
      [],
    );
  });

  it("resolves scalar input to single base class", () => {
    expect(resolveResponsiveClasses<GapScale>("md", gapClasses)).toEqual([
      "gap-4",
    ]);
  });

  it("resolves { base: value } identically to scalar", () => {
    expect(
      resolveResponsiveClasses<GapScale>({ base: "md" }, gapClasses),
    ).toEqual(["gap-4"]);
  });

  it("resolves partial breakpoint object for specified breakpoints only", () => {
    expect(
      resolveResponsiveClasses<Direction>({ md: "row" }, directionClasses),
    ).toEqual(["md:flex-row"]);
  });

  it("resolves full breakpoint object with all breakpoints", () => {
    const result = resolveResponsiveClasses<GapScale>(
      { base: "none", sm: "xs", md: "sm", lg: "md", xl: "lg", "2xl": "xl" },
      gapClasses,
    );
    expect(result).toEqual([
      "gap-0",
      "sm:gap-1",
      "md:gap-2",
      "lg:gap-4",
      "xl:gap-6",
      "2xl:gap-8",
    ]);
  });

  it("resolves sm breakpoint correctly", () => {
    expect(
      resolveResponsiveClasses<Direction>({ sm: "column" }, directionClasses),
    ).toEqual(["sm:flex-col"]);
  });

  it("resolves lg breakpoint correctly", () => {
    expect(
      resolveResponsiveClasses<GapScale>({ lg: "xl" }, gapClasses),
    ).toEqual(["lg:gap-8"]);
  });

  it("resolves multiple non-contiguous breakpoints", () => {
    const result = resolveResponsiveClasses<Direction>(
      { base: "column", md: "row", xl: "row-reverse" },
      directionClasses,
    );
    expect(result).toEqual(["flex-col", "md:flex-row", "xl:flex-row-reverse"]);
  });
});
