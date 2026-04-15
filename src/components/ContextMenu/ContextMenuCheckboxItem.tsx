"use client";
import * as React from "react";
import { MenuCheckboxItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuCheckboxItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type ContextMenuCheckboxItemProps = MenuCheckboxItemWithNavProps;

const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuCheckboxItemProps
>((props, ref) => <MenuCheckboxItemWithNav ref={ref} {...props} />);

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

export { ContextMenuCheckboxItem };
