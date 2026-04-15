"use client";
import * as React from "react";
import { MenuSeparatorBase } from "@nuka/components/Menu/MenuSeparatorBase";

export interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  ContextMenuSeparatorProps
>((props, ref) => <MenuSeparatorBase ref={ref} {...props} />);

ContextMenuSeparator.displayName = "ContextMenuSeparator";

export { ContextMenuSeparator };
