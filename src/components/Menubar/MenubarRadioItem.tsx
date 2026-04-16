"use client";
import * as React from "react";
import { MenuRadioItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuRadioItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type MenubarRadioItemProps = MenuRadioItemWithNavProps;

function MenubarRadioItem({ ref, ...props }: MenubarRadioItemProps) {
  return <MenuRadioItemWithNav ref={ref} {...props} />;
}

MenubarRadioItem.displayName = "MenubarRadioItem";

export { MenubarRadioItem };
