import * as React from "react";
import { MenuRadioGroupBase } from "@nuka/components/Menu/MenuRadioGroupBase";
import type { MenuRadioGroupBaseProps } from "@nuka/components/Menu/MenuRadioGroupBase";

export interface MenubarRadioGroupProps extends MenuRadioGroupBaseProps {}

const MenubarRadioGroup = React.forwardRef<
  HTMLDivElement,
  MenubarRadioGroupProps
>((props, ref) => <MenuRadioGroupBase ref={ref} {...props} />);

MenubarRadioGroup.displayName = "MenubarRadioGroup";

export { MenubarRadioGroup };
