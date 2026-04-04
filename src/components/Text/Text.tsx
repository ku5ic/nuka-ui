import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const textVariants = cva([], {
  variants: {
    size: {
      xs: "text-[length:var(--font-size-xs)] leading-[var(--line-height-normal)]",
      sm: "text-[length:var(--font-size-sm)] leading-[var(--line-height-normal)]",
      md: "text-[length:var(--font-size-md)] leading-[var(--line-height-normal)]",
      lg: "text-[length:var(--font-size-lg)] leading-[var(--line-height-snug)]",
      xl: "text-[length:var(--font-size-xl)] leading-[var(--line-height-snug)]",
    },
    weight: {
      regular: "font-[number:var(--font-weight-regular)]",
      medium: "font-[number:var(--font-weight-medium)]",
      semibold: "font-[number:var(--font-weight-semibold)]",
      bold: "font-[number:var(--font-weight-bold)]",
    },
    color: {
      base: "text-[var(--nuka-text-base)]",
      muted: "text-[var(--nuka-text-muted)]",
      subtle: "text-[var(--nuka-text-subtle)]",
      inverse: "text-[var(--nuka-text-inverse)]",
      disabled: "text-[var(--nuka-text-disabled)]",
      accent: "text-[var(--nuka-accent-text)]",
      danger: "text-[var(--nuka-danger-text)]",
      success: "text-[var(--nuka-success-text)]",
      warning: "text-[var(--nuka-warning-text)]",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
    color: "base",
    align: "left",
    truncate: false,
  },
});

export type TextVariantProps = VariantProps<typeof textVariants>;

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
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    TextVariantProps {
  as?: TextElement;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    { as: Comp = "p", className, size, weight, color, align, truncate, ...props },
    ref,
  ) => {
    return (
      <Comp
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
