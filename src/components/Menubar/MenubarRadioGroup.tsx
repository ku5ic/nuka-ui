"use client";
import * as React from "react";
import { MenuRadioGroupBase } from "@nuka/components/Menu/MenuRadioGroupBase";
import type { MenuRadioGroupBaseProps } from "@nuka/components/Menu/MenuRadioGroupBase";

export interface MenubarRadioGroupProps extends MenuRadioGroupBaseProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function MenubarRadioGroup({ ref, ...props }: MenubarRadioGroupProps) {
  return <MenuRadioGroupBase ref={ref} {...props} />;
}

MenubarRadioGroup.displayName = "MenubarRadioGroup";

export { MenubarRadioGroup };
