"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { menuSeparatorVariants } from "@nuka/components/Menu/menuItemVariants";

interface MenuSeparatorBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function MenuSeparatorBase({
  ref,
  className,
  ...props
}: MenuSeparatorBaseProps) {
  return (
    <div
      ref={ref}
      role="separator"
      className={cn(menuSeparatorVariants(), className)}
      {...props}
    />
  );
}

MenuSeparatorBase.displayName = "MenuSeparatorBase";

export { MenuSeparatorBase };
