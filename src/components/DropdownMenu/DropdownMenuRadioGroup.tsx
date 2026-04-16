"use client";
import * as React from "react";
import { MenuRadioGroupBase } from "@nuka/components/Menu/MenuRadioGroupBase";
import type { MenuRadioGroupBaseProps } from "@nuka/components/Menu/MenuRadioGroupBase";

export interface DropdownMenuRadioGroupProps extends MenuRadioGroupBaseProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function DropdownMenuRadioGroup({
  ref,
  ...props
}: DropdownMenuRadioGroupProps) {
  return <MenuRadioGroupBase ref={ref} {...props} />;
}

DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

export { DropdownMenuRadioGroup };
