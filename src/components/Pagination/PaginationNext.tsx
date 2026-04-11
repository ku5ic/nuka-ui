import * as React from "react";
import { composeRefs } from "@nuka/utils/slot";
import { Button } from "@nuka/components/Button";
import { Icon } from "@nuka/components/Icon";

export interface PaginationNextProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  asChild?: boolean;
}

const NextIcon = () => (
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  </Icon>
);

const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationNextProps>(
  (
    {
      disabled = false,
      asChild = false,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleClick = disabled
      ? (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
        }
      : onClick;

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<
        Record<string, unknown> & { ref?: React.Ref<HTMLElement> }
      >;
      const label = (child.props.children as React.ReactNode) ?? "Next";

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
              "aria-label": "Go to next page",
              ...props,
            } as Partial<Record<string, unknown>> & React.Attributes,
            label,
            <NextIcon />,
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
          aria-label="Go to next page"
          onClick={handleClick}
          {...props}
          {...(disabled
            ? { role: "link" as const, "aria-disabled": true }
            : {})}
        >
          {children ?? "Next"}
          <NextIcon />
        </Comp>
      </Button>
    );
  },
);

PaginationNext.displayName = "PaginationNext";

export { PaginationNext };
