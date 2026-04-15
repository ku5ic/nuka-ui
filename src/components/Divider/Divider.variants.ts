import type {
  Responsive,
  DividerOrientation,
  DividerSize,
} from "@nuka/utils/responsive";

export interface DividerVariantProps {
  orientation?: Responsive<DividerOrientation>;
  size?: DividerSize;
}
