import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const dividerVariants = cva([], {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "self-stretch",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", size: "sm", className: "h-px" },
    { orientation: "horizontal", size: "md", className: "h-px" },
    { orientation: "horizontal", size: "lg", className: "h-0.5" },
    { orientation: "vertical", size: "sm", className: "w-px" },
    { orientation: "vertical", size: "md", className: "w-px" },
    { orientation: "vertical", size: "lg", className: "w-0.5" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export type DividerVariantProps = VariantProps<typeof dividerVariants>;

export interface DividerProps
  extends React.ComponentPropsWithoutRef<"div">,
    DividerVariantProps {
  label?: React.ReactNode;
}

/**
 * Ref type is HTMLElement because the root element varies between
 * HTMLHRElement (horizontal, no label) and HTMLDivElement (vertical or labeled).
 * HTMLElement is the correct common supertype.
 */
const Divider = React.forwardRef<HTMLElement, DividerProps>(
  ({ className, orientation = "horizontal", size = "md", label, ...props }, ref) => {
    const isVertical = orientation === "vertical";
    const hasLabel = label != null;

    // Vertical + label is explicitly unsupported
    if (isVertical && hasLabel) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Divider: `label` is not supported with `orientation=\"vertical\"`. The label will be ignored.",
        );
      }

      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            "bg-[var(--nuka-border-base)]",
            dividerVariants({ orientation: "vertical", size }),
            className,
          )}
          {...props}
        />
      );
    }

    // Horizontal with label: flex layout with two line segments
    if (hasLabel) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="horizontal"
          className={cn("flex items-center gap-[var(--space-3)]", className)}
          {...props}
        >
          <div
            className={cn(
              "flex-1 bg-[var(--nuka-border-base)]",
              dividerVariants({ orientation: "horizontal", size }),
            )}
            aria-hidden="true"
          />
          <span className="shrink-0 px-[var(--space-2)] text-xs text-[var(--nuka-text-muted)] whitespace-nowrap">
            {label}
          </span>
          <div
            className={cn(
              "flex-1 bg-[var(--nuka-border-base)]",
              dividerVariants({ orientation: "horizontal", size }),
            )}
            aria-hidden="true"
          />
        </div>
      );
    }

    // Vertical without label: div with role="separator"
    if (isVertical) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            "bg-[var(--nuka-border-base)]",
            dividerVariants({ orientation: "vertical", size }),
            className,
          )}
          {...props}
        />
      );
    }

    // Horizontal without label: semantic <hr>
    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        className={cn(
          "border-0 bg-[var(--nuka-border-base)]",
          dividerVariants({ orientation: "horizontal", size }),
          className,
        )}
        {...(props as React.ComponentPropsWithoutRef<"hr">)}
      />
    );
  },
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
