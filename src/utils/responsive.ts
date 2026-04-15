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
    const prefix = prefixes[bp];
    const map = {} as Record<T, string>;
    for (const key of Object.keys(baseMap) as T[]) {
      map[key] = prefix
        ? baseMap[key]
            .split(" ")
            .map((cls) => `${prefix}${cls}`)
            .join(" ")
        : baseMap[key];
    }
    result[bp] = map;
  }
  return result;
}

export const gapClasses = buildLookup<GapScale>({
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
});

export const colGapClasses = buildLookup<GapScale>({
  none: "gap-x-0",
  xs: "gap-x-1",
  sm: "gap-x-2",
  md: "gap-x-4",
  lg: "gap-x-6",
  xl: "gap-x-8",
  "2xl": "gap-x-12",
});

export const rowGapClasses = buildLookup<GapScale>({
  none: "gap-y-0",
  xs: "gap-y-1",
  sm: "gap-y-2",
  md: "gap-y-4",
  lg: "gap-y-6",
  xl: "gap-y-8",
  "2xl": "gap-y-12",
});

export type Direction = "row" | "column" | "row-reverse" | "column-reverse";

export const directionClasses = buildLookup<Direction>({
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
});

export type Align = "start" | "center" | "end" | "stretch" | "baseline";

export const alignClasses = buildLookup<Align>({
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
});

export type Justify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

export const justifyClasses = buildLookup<Justify>({
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
});

export type Wrap = "wrap" | "nowrap" | "wrap-reverse";

export const wrapClasses = buildLookup<Wrap>({
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
});

export type ColCount = 1 | 2 | 3 | 4 | 6 | 12;

export const colsClasses = buildLookup<ColCount>({
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
});

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

export const textSizeClasses = buildLookup<TextSize>({
  xs: "text-[length:var(--font-size-xs)] leading-(--line-height-normal)",
  sm: "text-[length:var(--font-size-sm)] leading-(--line-height-normal)",
  md: "text-[length:var(--font-size-md)] leading-(--line-height-normal)",
  lg: "text-[length:var(--font-size-lg)] leading-(--line-height-snug)",
  xl: "text-[length:var(--font-size-xl)] leading-(--line-height-snug)",
});

export type HeadingSize = "xl" | "2xl" | "3xl" | "4xl";

export const headingSizeClasses = buildLookup<HeadingSize>({
  xl: "text-[length:var(--font-size-xl)] leading-(--line-height-snug)",
  "2xl": "text-[length:var(--font-size-2xl)] leading-(--line-height-snug)",
  "3xl": "text-[length:var(--font-size-3xl)] leading-(--line-height-snug)",
  "4xl": "text-[length:var(--font-size-4xl)] leading-(--line-height-tight)",
});

export type TextAlign = "left" | "center" | "right";

export const textAlignClasses = buildLookup<TextAlign>({
  left: "text-left",
  center: "text-center",
  right: "text-right",
});

export type DividerOrientation = "horizontal" | "vertical";
export type DividerSize = "sm" | "md" | "lg";

export const dividerOrientationClasses: Record<
  DividerSize,
  Record<Breakpoint, Record<DividerOrientation, string>>
> = {
  sm: buildLookup<DividerOrientation>({
    horizontal: "w-full h-px",
    vertical: "self-stretch w-px",
  }),
  md: buildLookup<DividerOrientation>({
    horizontal: "w-full h-px",
    vertical: "self-stretch w-px",
  }),
  lg: buildLookup<DividerOrientation>({
    horizontal: "w-full h-0.5",
    vertical: "self-stretch w-0.5",
  }),
};

export type AspectRatioValue = "1/1" | "16/9" | "4/3" | "3/2" | "2/1" | "9/16";

// Tailwind v4 safelist: every prefixed class must appear as a literal string
// for the scanner to include it in the CSS bundle. buildLookup constructs
// these at runtime, so they are listed here for detection.
// prettier-ignore
const _aspectRatioSafelist = [
  "aspect-square",        "sm:aspect-square",        "md:aspect-square",        "lg:aspect-square",        "xl:aspect-square",        "2xl:aspect-square",
  "aspect-video",         "sm:aspect-video",         "md:aspect-video",         "lg:aspect-video",         "xl:aspect-video",         "2xl:aspect-video",
  "aspect-[4/3]",         "sm:aspect-[4/3]",         "md:aspect-[4/3]",         "lg:aspect-[4/3]",         "xl:aspect-[4/3]",         "2xl:aspect-[4/3]",
  "aspect-[3/2]",         "sm:aspect-[3/2]",         "md:aspect-[3/2]",         "lg:aspect-[3/2]",         "xl:aspect-[3/2]",         "2xl:aspect-[3/2]",
  "aspect-[2/1]",         "sm:aspect-[2/1]",         "md:aspect-[2/1]",         "lg:aspect-[2/1]",         "xl:aspect-[2/1]",         "2xl:aspect-[2/1]",
  "aspect-[9/16]",        "sm:aspect-[9/16]",        "md:aspect-[9/16]",        "lg:aspect-[9/16]",        "xl:aspect-[9/16]",        "2xl:aspect-[9/16]",
];

export const aspectRatioClasses = buildLookup<AspectRatioValue>({
  "1/1": "aspect-square",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "2/1": "aspect-[2/1]",
  "9/16": "aspect-[9/16]",
});
