"use client";
import * as React from "react";
import { MenuCheckboxItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuCheckboxItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type DropdownMenuCheckboxItemProps = MenuCheckboxItemWithNavProps;

function DropdownMenuCheckboxItem({
  ref,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return <MenuCheckboxItemWithNav ref={ref} {...props} />;
}

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export { DropdownMenuCheckboxItem };
