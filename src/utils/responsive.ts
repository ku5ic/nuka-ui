/**
 * Responsive prop utilities for layout primitives.
 *
 * `buildLookup` constructs breakpoint-prefixed classes at runtime. Tailwind
 * v4's scanner cannot see those runtime strings, so every possible output
 * literal is emitted into `src/utils/_tailwind-safelist.ts` by
 * `tools/generate-safelist.mjs`, which reads the base maps in
 * `@nuka/utils/responsive-maps`. See ADR-049.
 */

import {
  BREAKPOINT_PREFIXES,
  gapBaseMap,
  colGapBaseMap,
  rowGapBaseMap,
  directionBaseMap,
  alignBaseMap,
  justifyBaseMap,
  wrapBaseMap,
  colsBaseMap,
  textSizeBaseMap,
  headingSizeBaseMap,
  textAlignBaseMap,
  dividerOrientationBaseMaps,
  aspectRatioBaseMap,
} from "@nuka/utils/responsive-maps";

import type {
  Breakpoint,
  GapScale,
  Direction,
  Align,
  Justify,
  Wrap,
  ColCount,
  TextSize,
  HeadingSize,
  TextAlign,
  DividerOrientation,
  DividerSize,
  AspectRatioValue,
} from "@nuka/utils/responsive-maps";

export type {
  Breakpoint,
  GapScale,
  Direction,
  Align,
  Justify,
  Wrap,
  ColCount,
  TextSize,
  HeadingSize,
  TextAlign,
  DividerOrientation,
  DividerSize,
  AspectRatioValue,
} from "@nuka/utils/responsive-maps";

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

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

function buildLookup<T extends string | number>(
  baseMap: Record<T, string>,
): Record<Breakpoint, Record<T, string>> {
  const result = {} as Record<Breakpoint, Record<T, string>>;
  for (const bp of BREAKPOINTS) {
    const prefix = BREAKPOINT_PREFIXES[bp];
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

export const gapClasses = buildLookup<GapScale>(gapBaseMap);
export const colGapClasses = buildLookup<GapScale>(colGapBaseMap);
export const rowGapClasses = buildLookup<GapScale>(rowGapBaseMap);
export const directionClasses = buildLookup<Direction>(directionBaseMap);
export const alignClasses = buildLookup<Align>(alignBaseMap);
export const justifyClasses = buildLookup<Justify>(justifyBaseMap);
export const wrapClasses = buildLookup<Wrap>(wrapBaseMap);
export const colsClasses = buildLookup<ColCount>(colsBaseMap);
export const textSizeClasses = buildLookup<TextSize>(textSizeBaseMap);
export const headingSizeClasses = buildLookup<HeadingSize>(headingSizeBaseMap);
export const textAlignClasses = buildLookup<TextAlign>(textAlignBaseMap);

export const dividerOrientationClasses: Record<
  DividerSize,
  Record<Breakpoint, Record<DividerOrientation, string>>
> = {
  sm: buildLookup<DividerOrientation>(dividerOrientationBaseMaps.sm),
  md: buildLookup<DividerOrientation>(dividerOrientationBaseMaps.md),
  lg: buildLookup<DividerOrientation>(dividerOrientationBaseMaps.lg),
};

export const aspectRatioClasses =
  buildLookup<AspectRatioValue>(aspectRatioBaseMap);
