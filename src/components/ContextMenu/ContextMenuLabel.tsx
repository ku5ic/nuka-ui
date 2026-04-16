"use client";
import * as React from "react";
import { MenuLabelBase } from "@nuka/components/Menu/MenuLabelBase";

export interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function ContextMenuLabel({ ref, ...props }: ContextMenuLabelProps) {
  return <MenuLabelBase ref={ref} {...props} />;
}

ContextMenuLabel.displayName = "ContextMenuLabel";

export { ContextMenuLabel };
