"use client";
import * as React from "react";
import { MenuRadioGroupBase } from "@nuka/components/Menu/MenuRadioGroupBase";
import type { MenuRadioGroupBaseProps } from "@nuka/components/Menu/MenuRadioGroupBase";

export interface ContextMenuRadioGroupProps extends MenuRadioGroupBaseProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function ContextMenuRadioGroup({ ref, ...props }: ContextMenuRadioGroupProps) {
  return <MenuRadioGroupBase ref={ref} {...props} />;
}

ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

export { ContextMenuRadioGroup };
