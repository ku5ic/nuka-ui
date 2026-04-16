"use client";
import * as React from "react";
import { MenuItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type DropdownMenuItemProps = MenuItemWithNavProps;

function DropdownMenuItem({ ref, ...props }: DropdownMenuItemProps) {
  return <MenuItemWithNav ref={ref} {...props} />;
}

DropdownMenuItem.displayName = "DropdownMenuItem";

export { DropdownMenuItem };
