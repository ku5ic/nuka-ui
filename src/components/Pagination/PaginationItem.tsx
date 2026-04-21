"use client";

import * as React from "react";

export interface PaginationItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: React.Ref<HTMLLIElement> | undefined;
}

function PaginationItem({ ref, ...props }: PaginationItemProps) {
  return <li ref={ref} data-slot="item" {...props} />;
}

PaginationItem.displayName = "PaginationItem";

export { PaginationItem };
