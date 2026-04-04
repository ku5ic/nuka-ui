import * as React from "react";
import { cn } from "@vault/utils/cn";
import { useFormField } from "@vault/components/FormField/FormFieldContext";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, id, htmlFor, ...props }, ref) => {
    const ctx = useFormField();

    const resolvedId = id ?? (ctx.labelId || undefined);
    const resolvedHtmlFor = htmlFor ?? (ctx.fieldId || undefined);
    const resolvedRequired = required ?? ctx.required;

    return (
      <label
        ref={ref}
        id={resolvedId}
        htmlFor={resolvedHtmlFor}
        className={cn(
          "text-sm font-medium leading-none text-[var(--vault-text-base)]",
          className,
        )}
        {...props}
      >
        {children}
        {resolvedRequired && (
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
