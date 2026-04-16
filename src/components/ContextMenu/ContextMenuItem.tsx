"use client";
import * as React from "react";
import { MenuItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type ContextMenuItemProps = MenuItemWithNavProps;

function ContextMenuItem({ ref, ...props }: ContextMenuItemProps) {
  return <MenuItemWithNav ref={ref} {...props} />;
}

ContextMenuItem.displayName = "ContextMenuItem";

export { ContextMenuItem };
