import * as React from "react";
import { cn } from "@nuka/utils/cn";
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
  as?: TextElement;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Comp = "p",
      className,
      size,
      weight,
      color,
      align,
      truncate,
      ...props
    },
    ref,
  ) => {
    return (
      <Comp
        // Safe: the `as` prop makes the element type dynamic (p | span | label | ...),
        // so ref cannot satisfy any single element ref type. Each render produces one
        // concrete element, so the ref assignment is correct at runtime.
        ref={ref as React.RefObject<never>}
        className={cn(
          textVariants({ size, weight, color, align, truncate }),
          className,
        )}
        {...props}
      />
    );
  },
);

Text.displayName = "Text";

export { Text, textVariants };
