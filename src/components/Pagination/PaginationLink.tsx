import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { Button } from "@nuka/components/Button";

export interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  asChild?: boolean;
}

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ isActive = false, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Button
        asChild
        variant={isActive ? "outline" : "ghost"}
        size="sm"
        className={className}
      >
        <Comp
          ref={ref}
          aria-current={isActive ? "page" : undefined}
          {...props}
        />
      </Button>
    );
  },
);

PaginationLink.displayName = "PaginationLink";

export { PaginationLink };
