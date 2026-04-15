"use client";
import * as React from "react";
import { MenuSeparatorBase } from "@nuka/components/Menu/MenuSeparatorBase";

export interface MenubarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  MenubarSeparatorProps
>((props, ref) => <MenuSeparatorBase ref={ref} {...props} />);

MenubarSeparator.displayName = "MenubarSeparator";

export { MenubarSeparator };
