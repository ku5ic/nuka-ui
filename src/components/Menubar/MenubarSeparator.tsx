"use client";
import * as React from "react";
import { MenuSeparatorBase } from "@nuka/components/Menu/MenuSeparatorBase";

export interface MenubarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function MenubarSeparator({ ref, ...props }: MenubarSeparatorProps) {
  return <MenuSeparatorBase ref={ref} {...props} />;
}

MenubarSeparator.displayName = "MenubarSeparator";

export { MenubarSeparator };
