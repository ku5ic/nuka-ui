import * as React from "react";

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  "aria-label"?: string;
}

const Nav = React.forwardRef<HTMLElement, NavProps>(
  ({ "aria-label": ariaLabel = "Main navigation", ...props }, ref) => (
    <nav ref={ref} aria-label={ariaLabel} {...props} />
  ),
);

Nav.displayName = "Nav";

export { Nav };
