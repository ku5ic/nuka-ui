import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  headingVariants,
  type HeadingVariantProps,
} from "@nuka/components/Heading/Heading.variants";

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
