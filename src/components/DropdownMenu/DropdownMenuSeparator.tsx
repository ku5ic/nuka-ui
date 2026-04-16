"use client";
import * as React from "react";
import { MenuSeparatorBase } from "@nuka/components/Menu/MenuSeparatorBase";

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function DropdownMenuSeparator({ ref, ...props }: DropdownMenuSeparatorProps) {
  return <MenuSeparatorBase ref={ref} {...props} />;
}

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export { DropdownMenuSeparator };
