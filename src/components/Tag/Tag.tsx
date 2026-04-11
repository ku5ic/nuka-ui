import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { DismissButton } from "@nuka/utils/dismiss-button";
import {
  tagVariants,
  type TagVariantProps,
} from "@nuka/components/Tag/Tag.variants";

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
