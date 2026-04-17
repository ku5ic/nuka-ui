"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  chipVariants,
  type ChipVariantProps,
} from "@nuka/components/Chip/Chip.variants";

export interface ChipProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    Omit<ChipVariantProps, "selected"> {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  selected?: boolean;
}

function Chip({
  ref,
  className,
  variant,
  intent,
  size,
  selected = false,
  type = "button",
  ...props
}: ChipProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={cn(
        chipVariants({ variant, intent, size, selected }),
        className,
      )}
      {...props}
    />
  );
}

Chip.displayName = "Chip";

export { Chip, chipVariants };
