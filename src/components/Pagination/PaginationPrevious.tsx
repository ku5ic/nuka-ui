import * as React from "react";
import { composeRefs } from "@nuka/utils/slot";
import { Button } from "@nuka/components/Button";
import { Icon } from "@nuka/components/Icon";

export interface PaginationPreviousProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement> | undefined;
  disabled?: boolean;
  asChild?: boolean;
}

const PreviousIcon = () => (
  <Icon size="sm">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  </Icon>
);

function PaginationPrevious({
  ref,
  disabled = false,
  asChild = false,
  className,
  children,
  onClick,
  ...props
}: PaginationPreviousProps) {
  const handleClick = disabled
    ? (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
      }
    : onClick;

  // When asChild, the consumer provides a single child element (e.g. <button>).
  // We inject the icon + label as that element's children via cloneElement,
  // avoiding the Slot multiple-children error.
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<
      Record<string, unknown> & { ref?: React.Ref<HTMLElement> }
    >;
    const label = (child.props.children as React.ReactNode) ?? "Previous";

    return (
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={className}
        disabled={disabled}
      >
        {React.cloneElement(
          child,
          {
            ref: composeRefs(
              ref as React.Ref<HTMLElement>,
              child.props.ref,
            ) as React.Ref<never>,
            "aria-label": "Go to previous page",
            ...props,
          } as Partial<Record<string, unknown>> & React.Attributes,
          <PreviousIcon />,
          label,
        )}
      </Button>
    );
  }

  const Comp = disabled ? "span" : "a";

  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={className}
      disabled={disabled}
    >
      <Comp
        ref={ref as React.Ref<never>}
        aria-label="Go to previous page"
        onClick={handleClick}
        {...props}
        {...(disabled ? { role: "link" as const, "aria-disabled": true } : {})}
      >
        <PreviousIcon />
        {children ?? "Previous"}
      </Comp>
    </Button>
  );
}

PaginationPrevious.displayName = "PaginationPrevious";

export { PaginationPrevious };
