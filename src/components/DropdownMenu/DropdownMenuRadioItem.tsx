"use client";
import * as React from "react";
import { MenuRadioItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuRadioItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type DropdownMenuRadioItemProps = MenuRadioItemWithNavProps;

function DropdownMenuRadioItem({ ref, ...props }: DropdownMenuRadioItemProps) {
  return <MenuRadioItemWithNav ref={ref} {...props} />;
}

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export { DropdownMenuRadioItem };
