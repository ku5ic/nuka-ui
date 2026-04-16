"use client";
import * as React from "react";
import { MenuItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type MenubarItemProps = MenuItemWithNavProps;

function MenubarItem({ ref, ...props }: MenubarItemProps) {
  return <MenuItemWithNav ref={ref} {...props} />;
}

MenubarItem.displayName = "MenubarItem";

export { MenubarItem };
