import * as React from "react";
import {
  cva,
  intentCompoundVariants,
  type VariantProps,
} from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { DismissButton } from "@nuka/utils/dismiss-button";

const tagVariants = cva(
  [
    "inline-flex items-center",
    "font-medium leading-none whitespace-nowrap",
    "rounded-(--radius-md)",
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
        sm: "gap-(--space-1) px-(--space-2) py-(--space-1) text-xs",
        md: "gap-(--space-1) px-(--space-3) py-(--space-1) text-xs",
        lg: "gap-(--space-2) px-(--space-3) py-(--space-2) text-sm",
      },
    },

    compoundVariants: intentCompoundVariants(),

    defaultVariants: {
      variant: "secondary",
      intent: "default",
      size: "md",
    },
  },
);

export type TagVariantProps = VariantProps<typeof tagVariants>;

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>, TagVariantProps {
  onDismiss?: () => void;
  dismissLabel?: string;
}

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
          <DismissButton onClick={onDismiss} label={dismissLabel} />
        )}
      </span>
    );
  },
);

Tag.displayName = "Tag";

export { Tag, tagVariants };
