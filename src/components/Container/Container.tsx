import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  size?: ContainerSize;
  padded?: boolean;
  centered?: boolean;
  asChild?: boolean;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

function Container({
  ref,
  className,
  size = "xl",
  padded = true,
  centered = true,
  asChild = false,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      className={cn(
        "w-full",
        sizeClasses[size],
        centered && "mx-auto",
        padded && "px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}

Container.displayName = "Container";

export { Container };
