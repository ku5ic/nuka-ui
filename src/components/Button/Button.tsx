"use client";

import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import {
  buttonVariants,
  type ButtonVariantProps,
} from "@nuka/components/Button/Button.variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  asChild?: boolean;
}

function Button({
  ref,
  className,
  variant,
  intent,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, intent, size }), className)}
      {...props}
    />
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };
