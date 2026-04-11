import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { menuLabelVariants } from "@nuka/components/Menu/menuItemVariants";

const MenuLabelBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(menuLabelVariants(), className)} {...props}>
    {children}
  </div>
));

MenuLabelBase.displayName = "MenuLabelBase";

export { MenuLabelBase };
