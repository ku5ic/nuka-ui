"use client";

import * as React from "react";

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  "aria-label"?: string;
}

function Nav({
  ref,
  "aria-label": ariaLabel = "Main navigation",
  ...props
}: NavProps) {
  return <nav ref={ref} aria-label={ariaLabel} data-slot="root" {...props} />;
}

Nav.displayName = "Nav";

export { Nav };
