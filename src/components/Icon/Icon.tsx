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

  return (
    <span
      ref={ref}
      {...(isLabelled
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": "true" as const })}
      className={cn(
        "[&>svg]:w-full [&>svg]:h-full",
        iconVariants({ size }),
        iconColorVariants({ color }),
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

Icon.displayName = "Icon";

export { Icon, iconVariants, iconColorVariants };
