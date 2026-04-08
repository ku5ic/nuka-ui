import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const iconVariants = cva(
  ["inline-flex", "items-center", "justify-center", "shrink-0"],
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const iconColorVariants = cva([], {
  variants: {
    color: {
      inherit: "",
      base: "text-(--nuka-text-base)",
      muted: "text-(--nuka-text-muted)",
      subtle: "text-(--nuka-text-subtle)",
      inverse: "text-(--nuka-text-inverse)",
      disabled: "text-(--nuka-text-disabled)",
    },
  },
  defaultVariants: { color: "inherit" },
});

export type IconVariantProps = VariantProps<typeof iconVariants> &
  VariantProps<typeof iconColorVariants>;

export interface IconProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    IconVariantProps {
  children: React.ReactElement;
  label?: string;
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, size, color, label, children, ...props }, ref) => {
    if (process.env.NODE_ENV !== "production") {
      if (!React.isValidElement(children)) {
        console.error(
          "[nuka-ui] Icon: children must be a single React element.",
        );
      }
    }

    const isLabelled = label !== undefined;

    const child = React.isValidElement(children)
      ? React.cloneElement(
          children as React.ReactElement<Record<string, unknown>>,
          {
            "aria-hidden": "true" as const,
            width: "100%",
            height: "100%",
          },
        )
      : children;

    return (
      <span
        ref={ref}
        {...(isLabelled
          ? { role: "img", "aria-label": label }
          : { "aria-hidden": "true" as const })}
        className={cn(
          iconVariants({ size }),
          iconColorVariants({ color }),
          className,
        )}
        {...props}
      >
        {child}
      </span>
    );
  },
);

Icon.displayName = "Icon";

export { Icon, iconVariants, iconColorVariants };
