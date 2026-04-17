"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import {
  textareaVariants,
  type TextareaVariantProps,
} from "@nuka/components/Textarea/Textarea.variants";

export interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaVariantProps {
  ref?: React.Ref<HTMLTextAreaElement> | undefined;
}

function Textarea({
  ref,
  className,
  intent,
  size,
  id,
  ...props
}: TextareaProps) {
  const field = useFormFieldProps({
    id,
    "aria-invalid": props["aria-invalid"],
    "aria-describedby": props["aria-describedby"],
    "aria-required": props["aria-required"],
  });

  const ariaInvalid =
    field.ariaInvalid ?? (intent === "danger" ? true : undefined);

  return (
    <textarea
      ref={ref}
      id={field.resolvedId}
      className={cn(textareaVariants({ intent, size }), className)}
      {...props}
      aria-invalid={ariaInvalid}
      aria-describedby={field.ariaDescribedBy}
      aria-required={field.ariaRequired}
    />
  );
}

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
