import * as React from "react";
import { MenuRadioGroupBase } from "@nuka/components/Menu/MenuRadioGroupBase";
import type { MenuRadioGroupBaseProps } from "@nuka/components/Menu/MenuRadioGroupBase";

export interface ContextMenuRadioGroupProps extends MenuRadioGroupBaseProps {}

const ContextMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  ContextMenuRadioGroupProps
>((props, ref) => <MenuRadioGroupBase ref={ref} {...props} />);

ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

export { ContextMenuRadioGroup };
