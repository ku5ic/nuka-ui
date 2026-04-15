"use client";
import * as React from "react";
import { MenuRadioItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuRadioItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type DropdownMenuRadioItemProps = MenuRadioItemWithNavProps;

const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuRadioItemProps
>((props, ref) => <MenuRadioItemWithNav ref={ref} {...props} />);

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export { DropdownMenuRadioItem };
