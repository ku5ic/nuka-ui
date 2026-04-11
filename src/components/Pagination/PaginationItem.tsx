import * as React from "react";

export interface PaginationItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  (props, ref) => <li ref={ref} {...props} />,
);

PaginationItem.displayName = "PaginationItem";

export { PaginationItem };
