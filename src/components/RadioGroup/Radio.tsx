import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { Text } from "@nuka/components/Text";
import { useRadioGroup } from "@nuka/components/RadioGroup/RadioGroup.context";
import {
  radioIndicatorVariants,
  type RadioVariantProps,
} from "@nuka/components/RadioGroup/Radio.variants";

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
          <span className="hidden size-1/2 rounded-full bg-current" />
        </span>
        {children && <Text as="span">{children}</Text>}
      </label>
    );
  },
);

Radio.displayName = "Radio";

export { Radio };
