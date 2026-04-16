import * as React from "react";
import { cn } from "@nuka/utils/cn";

type VisuallyHiddenElement =
  | "span"
  | "p"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  as?: VisuallyHiddenElement;
}

function VisuallyHidden({
  ref,
  as: Comp = "span",
  className,
  ...props
}: VisuallyHiddenProps) {
  return (
    <Comp
      ref={ref as React.RefObject<never>}
      className={cn("sr-only", className)}
      {...props}
    />
  );
}

VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
