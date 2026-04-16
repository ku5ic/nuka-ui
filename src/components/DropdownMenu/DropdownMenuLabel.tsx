"use client";
import * as React from "react";
import { MenuLabelBase } from "@nuka/components/Menu/MenuLabelBase";

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function DropdownMenuLabel({ ref, ...props }: DropdownMenuLabelProps) {
  return <MenuLabelBase ref={ref} {...props} />;
}

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export { DropdownMenuLabel };
