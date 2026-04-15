"use client";
import * as React from "react";
import { MenuLabelBase } from "@nuka/components/Menu/MenuLabelBase";

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps
>((props, ref) => <MenuLabelBase ref={ref} {...props} />);

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export { DropdownMenuLabel };
