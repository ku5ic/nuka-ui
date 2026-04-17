"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  kbdVariants,
  type KbdVariantProps,
} from "@nuka/components/Kbd/Kbd.variants";

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>, KbdVariantProps {
  ref?: React.Ref<HTMLElement> | undefined;
}

function Kbd({ ref, className, family, size, ...props }: KbdProps) {
  return (
    <kbd
      ref={ref}
      className={cn(kbdVariants({ family, size }), className)}
      {...props}
    />
  );
}

Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };
