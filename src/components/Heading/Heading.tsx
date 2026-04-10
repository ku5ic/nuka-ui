import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const headingVariants = cva(
  ["font-[number:var(--font-weight-bold)]", "text-(--nuka-text-base)"],
  {
    variants: {
      size: {
        xl: "text-[length:var(--font-size-xl)] leading-(--line-height-snug)",
        "2xl":
          "text-[length:var(--font-size-2xl)] leading-(--line-height-snug)",
        "3xl":
          "text-[length:var(--font-size-3xl)] leading-(--line-height-snug)",
        "4xl":
          "text-[length:var(--font-size-4xl)] leading-(--line-height-tight)",
      },
      weight: {
        regular: "font-[number:var(--font-weight-regular)]",
        medium: "font-[number:var(--font-weight-medium)]",
        semibold: "font-[number:var(--font-weight-semibold)]",
        bold: "font-[number:var(--font-weight-bold)]",
      },
      color: {
        base: "text-(--nuka-text-base)",
        muted: "text-(--nuka-text-muted)",
        subtle: "text-(--nuka-text-subtle)",
        inverse: "text-(--nuka-text-inverse)",
        disabled: "text-(--nuka-text-disabled)",
        accent: "text-(--nuka-accent-text)",
        danger: "text-(--nuka-danger-text)",
        success: "text-(--nuka-success-text)",
        warning: "text-(--nuka-warning-text)",
      },
      truncate: {
        true: "truncate",
        false: "",
      },
    },
    defaultVariants: {
      // Default size is 3xl: matches the default element (h2) typographic convention.
      // The two are intentionally decoupled: size controls visuals, as controls semantics.
      size: "3xl",
      weight: "bold",
      color: "base",
      truncate: false,
    },
  },
);

export type HeadingVariantProps = VariantProps<typeof headingVariants>;

// Constrained to h1-h6 only. Headings are semantically defined by HTML as these
// six levels. For other block elements, use Text with as="div" instead.
export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    HeadingVariantProps {
  as?: HeadingElement;
}

const Heading = React.forwardRef<HTMLElement, HeadingProps>(
  (
    {
      // Default element is h2: the most common non-landmark heading level.
      // h1 is reserved for the page title (typically one per page).
      as: Comp = "h2",
      className,
      size,
      weight,
      color,
      truncate,
      ...props
    },
    ref,
  ) => {
    return (
      <Comp
        // Safe: the `as` prop selects h1-h6, making the ref type a union.
        // Same polymorphic element pattern as Text.tsx.
        ref={ref as React.RefObject<never>}
        className={cn(
          headingVariants({ size, weight, color, truncate }),
          className,
        )}
        {...props}
      />
    );
  },
);

Heading.displayName = "Heading";

export { Heading, headingVariants };
