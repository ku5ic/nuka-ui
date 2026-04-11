import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { menuCheckboxItemVariants } from "@nuka/components/Menu/menuItemVariants";

export interface MenuCheckboxItemBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  onClose?: () => void;
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const MenuCheckboxItemBase = React.forwardRef<
  HTMLDivElement,
  MenuCheckboxItemBaseProps
>(
  (
    {
      className,
      checked,
      onCheckedChange,
      disabled = false,
      onClose,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const handleActivate = () => {
      if (disabled) return;
      onCheckedChange?.(!checked);
      onClose?.();
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      handleActivate();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleActivate();
      }
    };

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        aria-disabled={disabled || undefined}
        className={cn(
          menuCheckboxItemVariants(),
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span className="inline-flex size-4 items-center justify-center shrink-0">
          {checked && (
            <Icon size="sm">
              <CheckIcon />
            </Icon>
          )}
        </span>
        {children}
      </div>
    );
  },
);

MenuCheckboxItemBase.displayName = "MenuCheckboxItemBase";

export { MenuCheckboxItemBase };
