import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";

export interface BreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex items-center px-(--space-1) text-(--nuka-text-subtle",
      className,
    )}
    {...props}
  >
    {children ?? (
      <Text as="span" size="sm" color="subtle">
        /
      </Text>
    )}
  </li>
));

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export { BreadcrumbSeparator };
