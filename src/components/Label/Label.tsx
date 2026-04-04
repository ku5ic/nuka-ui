import * as React from "react";
import { cn } from "@vault/utils/cn";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none text-[var(--vault-text-base)]",
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[var(--vault-danger-text)]">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = "Label";

export { Label };
