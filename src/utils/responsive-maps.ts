/**
 * Responsive base maps and type definitions.
 *
 * Single source of truth for every class string that the runtime lookups in
 * `@nuka/utils/responsive` can emit. Imported by both `responsive.ts` (to
 * build breakpoint-keyed lookups at runtime) and by `tools/generate-safelist.mjs`
 * (to emit `_tailwind-safelist.ts` so Tailwind v4's scanner sees every
 * prefixed variant as a literal string).
 *
 * When editing a base map: run `npm run build:safelist` and commit both this
 * file and the regenerated `_tailwind-safelist.ts`.
 */

export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export const BREAKPOINT_PREFIXES: Record<Breakpoint, string> = {
  base: "",
  sm: "sm:",
  md: "md:",
  lg: "lg:",
  xl: "xl:",
  "2xl": "2xl:",
};

export type GapScale = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export const gapBaseMap: Record<GapScale, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
};

export const colGapBaseMap: Record<GapScale, string> = {
  none: "gap-x-0",
  xs: "gap-x-1",
  sm: "gap-x-2",
  md: "gap-x-4",
  lg: "gap-x-6",
  xl: "gap-x-8",
  "2xl": "gap-x-12",
};

export const rowGapBaseMap: Record<GapScale, string> = {
  none: "gap-y-0",
  xs: "gap-y-1",
  sm: "gap-y-2",
  md: "gap-y-4",
  lg: "gap-y-6",
  xl: "gap-y-8",
  "2xl": "gap-y-12",
};

export type Direction = "row" | "column" | "row-reverse" | "column-reverse";

export const directionBaseMap: Record<Direction, string> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
};

export type Align = "start" | "center" | "end" | "stretch" | "baseline";

export const alignBaseMap: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

export type Justify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

export const justifyBaseMap: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export type Wrap = "wrap" | "nowrap" | "wrap-reverse";

export const wrapBaseMap: Record<Wrap, string> = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
};

export type ColCount = 1 | 2 | 3 | 4 | 6 | 12;

export const colsBaseMap: Record<ColCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

export const textSizeBaseMap: Record<TextSize, string> = {
  xs: "text-[length:var(--font-size-xs)] leading-(--line-height-normal)",
  sm: "text-[length:var(--font-size-sm)] leading-(--line-height-normal)",
  md: "text-[length:var(--font-size-md)] leading-(--line-height-normal)",
  lg: "text-[length:var(--font-size-lg)] leading-(--line-height-snug)",
  xl: "text-[length:var(--font-size-xl)] leading-(--line-height-snug)",
};

export type HeadingSize = "xl" | "2xl" | "3xl" | "4xl";

export const headingSizeBaseMap: Record<HeadingSize, string> = {
  xl: "text-[length:var(--font-size-xl)] leading-(--line-height-snug)",
  "2xl": "text-[length:var(--font-size-2xl)] leading-(--line-height-snug)",
  "3xl": "text-[length:var(--font-size-3xl)] leading-(--line-height-snug)",
  "4xl": "text-[length:var(--font-size-4xl)] leading-(--line-height-tight)",
};

export type TextAlign = "left" | "center" | "right";

export const textAlignBaseMap: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export type DividerOrientation = "horizontal" | "vertical";
export type DividerSize = "sm" | "md" | "lg";

export const dividerOrientationBaseMaps: Record<
  DividerSize,
  Record<DividerOrientation, string>
> = {
  sm: {
    horizontal: "w-full h-px",
    vertical: "self-stretch w-px",
  },
  md: {
    horizontal: "w-full h-px",
    vertical: "self-stretch w-px",
  },
  lg: {
    horizontal: "w-full h-0.5",
    vertical: "self-stretch w-0.5",
  },
};

export type AspectRatioValue = "1/1" | "16/9" | "4/3" | "3/2" | "2/1" | "9/16";

export const aspectRatioBaseMap: Record<AspectRatioValue, string> = {
  "1/1": "aspect-square",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "2/1": "aspect-[2/1]",
  "9/16": "aspect-[9/16]",
};

/**
 * Flat list of every base map that feeds `buildLookup` in `responsive.ts`.
 * The nested `dividerOrientationBaseMaps` is flattened into three entries so
 * the generator and verification test iterate a single shape with no recursion.
 * Order is stable and deterministic; do not rely on insertion order elsewhere.
 */
export const ALL_BASE_MAPS: readonly {
  readonly name: string;
  readonly map: Readonly<Record<string, string>>;
}[] = [
  { name: "gap", map: gapBaseMap },
  { name: "colGap", map: colGapBaseMap },
  { name: "rowGap", map: rowGapBaseMap },
  { name: "direction", map: directionBaseMap },
  { name: "align", map: alignBaseMap },
  { name: "justify", map: justifyBaseMap },
  { name: "wrap", map: wrapBaseMap },
  { name: "cols", map: colsBaseMap as Record<string, string> },
  { name: "textSize", map: textSizeBaseMap },
  { name: "headingSize", map: headingSizeBaseMap },
  { name: "textAlign", map: textAlignBaseMap },
  { name: "aspectRatio", map: aspectRatioBaseMap },
  { name: "divider.sm", map: dividerOrientationBaseMaps.sm },
  { name: "divider.md", map: dividerOrientationBaseMaps.md },
  { name: "divider.lg", map: dividerOrientationBaseMaps.lg },
];
