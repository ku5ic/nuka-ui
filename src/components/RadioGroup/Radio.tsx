import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { Text } from "@nuka/components/Text";
import { useRadioGroup } from "@nuka/components/RadioGroup/RadioGroupContext";

const radioIndicatorVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "rounded-full",
    "border",
    "transition-colors duration-150",
    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
    "peer-focus-visible:outline-(--nuka-border-focus)",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    "peer-checked:*:block",
  ],
  {
    variants: {
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    compoundVariants: [
      {
        intent: "default",
        className: [
          "border-(--nuka-input-border)",
          "peer-checked:bg-(--nuka-accent-bg)",
          "peer-checked:border-transparent",
        ],
      },
      {
        intent: "danger",
        className: [
          "border-(--nuka-danger-border)",
          "peer-checked:bg-(--nuka-danger-base)",
          "peer-checked:border-transparent",
        ],
      },
      {
        intent: "success",
        className: [
          "border-(--nuka-success-border)",
          "peer-checked:bg-(--nuka-success-base)",
          "peer-checked:border-transparent",
        ],
      },
      {
        intent: "warning",
        className: [
          "border-(--nuka-warning-border)",
          "peer-checked:bg-(--nuka-warning-base)",
          "peer-checked:border-transparent",
        ],
      },
    ],
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  },
);

export type RadioVariantProps = VariantProps<typeof radioIndicatorVariants>;

export interface RadioProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    RadioVariantProps {
  value: string;
  children?: React.ReactNode;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, intent, size, value, children, disabled, name, ...props },
    ref,
  ) => {
    const ctx = useRadioGroup();
    const internalRef = React.useRef<HTMLInputElement>(null);

    const resolvedName = ctx.name || name;
    const isChecked = ctx.value !== undefined ? ctx.value === value : undefined;
    const isDisabled = disabled ?? (ctx.disabled || undefined);
    const isFocusTarget = ctx.focusedValue === value;
    const tabIndex = ctx.name ? (isFocusTarget ? 0 : -1) : undefined;

    React.useEffect(() => {
      const node = internalRef.current;
      ctx.registerRef(value, node);
      return () => {
        ctx.registerRef(value, null);
      };
    }, [ctx, value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(e);
      ctx.onChange(value);
    };

    return (
      <label
        className={cn(
          "inline-flex items-center gap-(--space-2) cursor-pointer select-none min-h-6 min-w-6",
          isDisabled ? "cursor-not-allowed" : undefined,
          className,
        )}
      >
        <input
          ref={composeRefs(ref, internalRef)}
          type="radio"
          name={resolvedName}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          tabIndex={tabIndex}
          className="peer sr-only"
          {...props}
          onChange={handleChange}
        />
        <span
          aria-hidden="true"
          className={cn(radioIndicatorVariants({ intent, size }))}
        >
          <span className="hidden size-1/2 rounded-full bg-(--nuka-text-inverse)" />
        </span>
        {children && <Text as="span">{children}</Text>}
      </label>
    );
  },
);

Radio.displayName = "Radio";

export { Radio, radioIndicatorVariants as radioVariants };
