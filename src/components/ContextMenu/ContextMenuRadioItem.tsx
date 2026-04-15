"use client";
import * as React from "react";
import { MenuRadioItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuRadioItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type ContextMenuRadioItemProps = MenuRadioItemWithNavProps;

const ContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuRadioItemProps
>((props, ref) => <MenuRadioItemWithNav ref={ref} {...props} />);

ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

export { ContextMenuRadioItem };
