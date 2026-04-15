"use client";
import * as React from "react";
import { MenuLabelBase } from "@nuka/components/Menu/MenuLabelBase";

export interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuLabel = React.forwardRef<
  HTMLDivElement,
  ContextMenuLabelProps
>((props, ref) => <MenuLabelBase ref={ref} {...props} />);

ContextMenuLabel.displayName = "ContextMenuLabel";

export { ContextMenuLabel };
