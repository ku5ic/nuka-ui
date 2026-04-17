"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  iconVariants,
  iconColorVariants,
  type IconVariantProps,
} from "@nuka/components/Icon/Icon.variants";

export interface IconProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    IconVariantProps {
  ref?: React.Ref<HTMLSpanElement> | undefined;
  children: React.ReactElement;
  label?: string;
}

function Icon({
  ref,
  className,
  size,
  color,
  label,
  children,
  ...props
}: IconProps) {
  if (process.env.NODE_ENV !== "production") {
    if (!React.isValidElement(children)) {
      console.error("[nuka-ui] Icon: children must be a single React element.");
    }
  }

  const isLabelled = label !== undefined;

  const child = React.isValidElement(children)
    ? React.cloneElement(
        // Safe: children prop is typed as React.ReactElement in the interface,
        // so the generic parameter narrowing for cloneElement is safe (ADR-011).
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
}

Icon.displayName = "Icon";

export { Icon, iconVariants, iconColorVariants };
