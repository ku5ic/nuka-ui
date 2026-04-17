"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  resolveResponsiveClasses,
  textSizeClasses,
  textAlignClasses,
} from "@nuka/utils/responsive";
import type { Responsive, TextSize, TextAlign } from "@nuka/utils/responsive";
import {
  textVariants,
  type TextVariantProps,
} from "@nuka/components/Text/Text.variants";

type TextElement =
  | "p"
  | "span"
  | "label"
  | "li"
  | "time"
  | "abbr"
  | "figcaption"
  | "div";

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">, TextVariantProps {
  ref?: React.Ref<HTMLElement> | undefined;
  as?: TextElement;
  size?: Responsive<TextSize>;
  align?: Responsive<TextAlign>;
}

function Text({
  ref,
  as: Comp = "p",
  className,
  size = "md",
  family,
  weight,
  color,
  align = "left",
  truncate,
  ...props
}: TextProps) {
  return (
    <Comp
      // Safe: the `as` prop makes the element type dynamic (p | span | label | ...),
      // so ref cannot satisfy any single element ref type. Each render produces one
      // concrete element, so the ref assignment is correct at runtime.
      ref={ref as React.RefObject<never>}
      className={cn(
        textVariants({ family, weight, color, truncate }),
        ...resolveResponsiveClasses(size, textSizeClasses),
        ...resolveResponsiveClasses(align, textAlignClasses),
        className,
      )}
      {...props}
    />
  );
}

Text.displayName = "Text";

export { Text, textVariants };
