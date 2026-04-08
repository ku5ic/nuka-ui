import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";

interface DismissButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  onClick: () => void;
  label?: string;
}

const DismissButton = React.forwardRef<HTMLButtonElement, DismissButtonProps>(
  ({ onClick, label = "Dismiss", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        onClick={onClick}
        className={cn(
          "inline-flex items-center justify-center",
          "rounded-(--radius-sm) p-(--space-1)",
          "min-w-6 min-h-6",
          "opacity-70 hover:opacity-100 transition-opacity cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--nuka-border-focus)",
          className,
        )}
        {...props}
      >
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Icon>
      </button>
    );
  },
);

DismissButton.displayName = "DismissButton";

export { DismissButton };
export type { DismissButtonProps };
