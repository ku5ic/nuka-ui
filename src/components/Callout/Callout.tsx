"use client";

import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import {
  calloutVariants,
  type CalloutVariantProps,
} from "@nuka/components/Callout/Callout.variants";

export interface CalloutProps
  extends
    React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    CalloutVariantProps {
  ref?: React.Ref<HTMLQuoteElement> | undefined;
  asChild?: boolean;
  citation?: string;
}

function Callout({
  ref,
  className,
  variant,
  intent,
  size,
  asChild = false,
  citation,
  children,
  ...props
}: CalloutProps) {
  if (
    process.env.NODE_ENV !== "production" &&
    asChild &&
    citation !== undefined
  ) {
    console.warn(
      "Callout: `citation` is ignored when `asChild` is used. Render your own citation element inside the consumer tree.",
    );
  }

  const classes = cn(calloutVariants({ variant, intent, size }), className);

  if (asChild) {
    return (
      <Slot ref={ref} className={classes} data-slot="root" {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <blockquote ref={ref} className={classes} data-slot="root" {...props}>
      {children}
      {citation && (
        <cite className="text-sm" data-slot="citation">
          {citation}
        </cite>
      )}
    </blockquote>
  );
}

Callout.displayName = "Callout";

export { Callout, calloutVariants };
