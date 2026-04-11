import * as React from "react";
import { MenuCheckboxItemWithNav } from "@nuka/components/Menu/MenuContentBase";
import type { MenuCheckboxItemWithNavProps } from "@nuka/components/Menu/MenuContentBase";

export type MenubarCheckboxItemProps = MenuCheckboxItemWithNavProps;

const MenubarCheckboxItem = React.forwardRef<
  HTMLDivElement,
  MenubarCheckboxItemProps
>((props, ref) => <MenuCheckboxItemWithNav ref={ref} {...props} />);

MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

export { MenubarCheckboxItem };
