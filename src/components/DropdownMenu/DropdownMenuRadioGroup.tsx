"use client";
import * as React from "react";
import { MenuRadioGroupBase } from "@nuka/components/Menu/MenuRadioGroupBase";
import type { MenuRadioGroupBaseProps } from "@nuka/components/Menu/MenuRadioGroupBase";

export interface DropdownMenuRadioGroupProps extends MenuRadioGroupBaseProps {}

const DropdownMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  DropdownMenuRadioGroupProps
>((props, ref) => <MenuRadioGroupBase ref={ref} {...props} />);

DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

export { DropdownMenuRadioGroup };
