import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { menuSeparatorVariants } from "@nuka/components/Menu/menuItemVariants";

const MenuSeparatorBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn(menuSeparatorVariants(), className)}
    {...props}
  />
));

MenuSeparatorBase.displayName = "MenuSeparatorBase";

export { MenuSeparatorBase };
