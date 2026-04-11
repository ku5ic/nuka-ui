import * as React from "react";
import { MenuItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type DropdownMenuItemProps = MenuItemWithNavProps;

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>((props, ref) => <MenuItemWithNav ref={ref} {...props} />);

DropdownMenuItem.displayName = "DropdownMenuItem";

export { DropdownMenuItem };
