export type AspectRatioValue =
  | "1/1"
  | "16/9"
  | "9/16"
  | "4/3"
  | "3/4"
  | "21/9"
  | number;

const RATIO_MAP: Record<string, number> = {
  "1/1": 1,
  "16/9": 16 / 9,
  "9/16": 9 / 16,
  "4/3": 4 / 3,
  "3/4": 3 / 4,
  "21/9": 21 / 9,
};

export function resolveRatio(ratio: AspectRatioValue): number {
  if (typeof ratio === "number") return ratio;
  return RATIO_MAP[ratio] ?? 1;
}
