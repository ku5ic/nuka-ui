"use client";
import * as React from "react";
import { MenuSeparatorBase } from "@nuka/components/Menu/MenuSeparatorBase";

export interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function ContextMenuSeparator({ ref, ...props }: ContextMenuSeparatorProps) {
  return <MenuSeparatorBase ref={ref} {...props} />;
}

ContextMenuSeparator.displayName = "ContextMenuSeparator";

export { ContextMenuSeparator };
