import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { menuLabelVariants } from "@nuka/components/Menu/menuItemVariants";

interface MenuLabelBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function MenuLabelBase({
  ref,
  className,
  children,
  ...props
}: MenuLabelBaseProps) {
  return (
    <div ref={ref} className={cn(menuLabelVariants(), className)} {...props}>
      {children}
    </div>
  );
}

MenuLabelBase.displayName = "MenuLabelBase";

export { MenuLabelBase };
