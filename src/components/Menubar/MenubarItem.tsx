"use client";
import * as React from "react";
import { MenuItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type MenubarItemProps = MenuItemWithNavProps;

const MenubarItem = React.forwardRef<HTMLDivElement, MenubarItemProps>(
  (props, ref) => <MenuItemWithNav ref={ref} {...props} />,
);

MenubarItem.displayName = "MenubarItem";

export { MenubarItem };
