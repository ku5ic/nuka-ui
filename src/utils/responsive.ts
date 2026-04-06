/**
 * Responsive prop utilities for layout primitives.
 *
 * Uses static lookup tables so every emitted class is present
 * as a complete string in source. Required for Tailwind v4 scanning.
 */

export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

export type GapScale = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const BREAKPOINTS: Breakpoint[] = ["base", "sm", "md", "lg", "xl", "2xl"];

export function resolveResponsiveClasses<T extends string | number>(
  value: Responsive<T> | undefined,
  lookup: Record<Breakpoint, Record<T, string>>,
): string[] {
  if (value === undefined) return [];

  if (typeof value === "string" || typeof value === "number") {
    return [lookup.base[value]];
  }

  const result: string[] = [];
  for (const bp of BREAKPOINTS) {
    const v = value[bp];
    if (v !== undefined) {
      result.push(lookup[bp][v]);
    }
  }
  return result;
}

// Helper to build a breakpoint-keyed lookup from a base map
function buildLookup<T extends string | number>(
  baseMap: Record<T, string>,
): Record<Breakpoint, Record<T, string>> {
  const prefixes: Record<Breakpoint, string> = {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
    "2xl": "2xl:",
  };

  const result = {} as Record<Breakpoint, Record<T, string>>;
  for (const bp of BREAKPOINTS) {
    const map = {} as Record<T, string>;
    for (const key of Object.keys(baseMap) as T[]) {
      map[key] = `${prefixes[bp]}${baseMap[key]}`;
    }
    result[bp] = map;
  }
  return result;
}

// Gap: gap-0, gap-1, gap-2, gap-4, gap-6, gap-8, gap-12
export const gapClasses = buildLookup<GapScale>({
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
});

// Column gap
export const colGapClasses = buildLookup<GapScale>({
  none: "gap-x-0",
  xs: "gap-x-1",
  sm: "gap-x-2",
  md: "gap-x-4",
  lg: "gap-x-6",
  xl: "gap-x-8",
  "2xl": "gap-x-12",
});

// Row gap
export const rowGapClasses = buildLookup<GapScale>({
  none: "gap-y-0",
  xs: "gap-y-1",
  sm: "gap-y-2",
  md: "gap-y-4",
  lg: "gap-y-6",
  xl: "gap-y-8",
  "2xl": "gap-y-12",
});

// Direction
export type Direction = "row" | "column" | "row-reverse" | "column-reverse";

export const directionClasses = buildLookup<Direction>({
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
});

// Align
export type Align = "start" | "center" | "end" | "stretch" | "baseline";

export const alignClasses = buildLookup<Align>({
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
});

// Justify
export type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";

export const justifyClasses = buildLookup<Justify>({
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
});

// Wrap
export type Wrap = "wrap" | "nowrap" | "wrap-reverse";

export const wrapClasses = buildLookup<Wrap>({
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
});

// Grid columns
export type ColCount = 1 | 2 | 3 | 4 | 6 | 12;

export const colsClasses = buildLookup<ColCount>({
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
});
