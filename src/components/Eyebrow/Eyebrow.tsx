import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  eyebrowVariants,
  type EyebrowVariantProps,
} from "@nuka/components/Eyebrow/Eyebrow.variants";

type EyebrowElement = "p" | "span";

export interface EyebrowProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    EyebrowVariantProps {
  ref?: React.Ref<HTMLElement> | undefined;
  as?: EyebrowElement;
}

function Eyebrow({
  ref,
  as: Comp = "p",
  className,
  color,
  ...props
}: EyebrowProps) {
  return (
    <Comp
      ref={ref as React.RefObject<never>}
      className={cn(eyebrowVariants({ color }), className)}
      {...props}
    />
  );
}

Eyebrow.displayName = "Eyebrow";

export { Eyebrow, eyebrowVariants };
