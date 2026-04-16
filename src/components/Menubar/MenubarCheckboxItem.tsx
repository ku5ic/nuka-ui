"use client";
import * as React from "react";
import { MenuCheckboxItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuCheckboxItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type MenubarCheckboxItemProps = MenuCheckboxItemWithNavProps;

function MenubarCheckboxItem({ ref, ...props }: MenubarCheckboxItemProps) {
  return <MenuCheckboxItemWithNav ref={ref} {...props} />;
}

MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

export { MenubarCheckboxItem };
