import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const tagVariants = cva(
  [
    "inline-flex items-center",
    "font-medium leading-none whitespace-nowrap",
    "rounded-[var(--radius-md)]",
    "border",
  ],
  {
    variants: {
      variant: {
        primary: ["border-transparent"],
        secondary: [],
        outline: ["bg-transparent"],
        ghost: ["bg-transparent", "border-transparent"],
      },
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "gap-[var(--space-1)] px-[var(--space-2)] py-[var(--space-1)] text-xs",
        md: "gap-[var(--space-1)] px-[var(--space-3)] py-[var(--space-1)] text-xs",
        lg: "gap-[var(--space-2)] px-[var(--space-3)] py-[var(--space-2)] text-sm",
      },
    },

    compoundVariants: [
      // primary
      {
        variant: "primary",
        intent: "default",
        className: [
          "bg-[var(--nuka-accent-bg)]",
          "text-[var(--nuka-text-inverse)]",
        ],
      },
      {
        variant: "primary",
        intent: "danger",
        className: [
          "bg-[var(--nuka-danger-base)]",
          "text-[var(--nuka-text-inverse)]",
        ],
      },
      {
        variant: "primary",
        intent: "success",
        className: [
          "bg-[var(--nuka-success-base)]",
          "text-[var(--nuka-text-inverse)]",
        ],
      },
      {
        variant: "primary",
        intent: "warning",
        className: [
          "bg-[var(--nuka-warning-base)]",
          "text-[var(--nuka-text-inverse)]",
        ],
      },

      // secondary
      {
        variant: "secondary",
        intent: "default",
        className: [
          "bg-[var(--nuka-bg-muted)]",
          "text-[var(--nuka-text-base)]",
          "border-[var(--nuka-border-base)]",
        ],
      },
      {
        variant: "secondary",
        intent: "danger",
        className: [
          "bg-[var(--nuka-danger-bg)]",
          "text-[var(--nuka-danger-text)]",
          "border-[var(--nuka-danger-border)]",
        ],
      },
      {
        variant: "secondary",
        intent: "success",
        className: [
          "bg-[var(--nuka-success-bg)]",
          "text-[var(--nuka-success-text)]",
          "border-[var(--nuka-success-border)]",
        ],
      },
      {
        variant: "secondary",
        intent: "warning",
        className: [
          "bg-[var(--nuka-warning-bg)]",
          "text-[var(--nuka-warning-text)]",
          "border-[var(--nuka-warning-border)]",
        ],
      },

      // outline
      {
        variant: "outline",
        intent: "default",
        className: [
          "border-[var(--nuka-accent-border)]",
          "text-[var(--nuka-accent-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        className: [
          "border-[var(--nuka-danger-border)]",
          "text-[var(--nuka-danger-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        className: [
          "border-[var(--nuka-success-border)]",
          "text-[var(--nuka-success-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        className: [
          "border-[var(--nuka-warning-border)]",
          "text-[var(--nuka-warning-text)]",
        ],
      },

      // ghost
      {
        variant: "ghost",
        intent: "default",
        className: ["text-[var(--nuka-text-base)]"],
      },
      {
        variant: "ghost",
        intent: "danger",
        className: ["text-[var(--nuka-danger-text)]"],
      },
      {
        variant: "ghost",
        intent: "success",
        className: ["text-[var(--nuka-success-text)]"],
      },
      {
        variant: "ghost",
        intent: "warning",
        className: ["text-[var(--nuka-warning-text)]"],
      },
    ],

    defaultVariants: {
      variant: "secondary",
      intent: "default",
      size: "md",
    },
  },
);

export type TagVariantProps = VariantProps<typeof tagVariants>;

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    TagVariantProps {
  onDismiss?: () => void;
  dismissLabel?: string;
}

const dismissButtonClasses = [
  "inline-flex items-center justify-center",
  "rounded-[var(--radius-sm)]",
  "min-w-4 min-h-4",
  "p-1",
  "cursor-pointer",
  "opacity-70 hover:opacity-100",
  "focus-visible:outline-2 focus-visible:outline-offset-1",
  "focus-visible:outline-[var(--nuka-border-focus)]",
].join(" ");

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      intent,
      size,
      onDismiss,
      dismissLabel = "Remove",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, intent, size }), className)}
        {...props}
      >
        {children}
        {onDismiss !== undefined && (
          <button
            type="button"
            aria-label={dismissLabel}
            onClick={onDismiss}
            className={dismissButtonClasses}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              width="10"
              height="10"
              viewBox="0 0 10 10"
            >
              <path
                d="M1 1l8 8M9 1l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </span>
    );
  },
);

Tag.displayName = "Tag";

export { Tag, tagVariants };
