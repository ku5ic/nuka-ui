"use client";
import * as React from "react";
import { MenuCheckboxItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuCheckboxItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type DropdownMenuCheckboxItemProps = MenuCheckboxItemWithNavProps;

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>((props, ref) => <MenuCheckboxItemWithNav ref={ref} {...props} />);

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export { DropdownMenuCheckboxItem };
