"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { menuRadioItemVariants } from "@nuka/components/Menu/menuItemVariants";
import { useMenuRadioGroup } from "@nuka/components/Menu/MenuRadioGroupBase";

export interface MenuRadioItemBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  value: string;
  disabled?: boolean;
  onClose?: () => void;
}

const DotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <circle cx="12" cy="12" r="4" />
  </svg>
);

function MenuRadioItemBase({
  ref,
  className,
  value,
  disabled = false,
  onClose,
  children,
  onClick,
  onKeyDown,
  ...props
}: MenuRadioItemBaseProps) {
  const radioGroup = useMenuRadioGroup();
  const checked = radioGroup.value === value;

  const handleActivate = () => {
    if (disabled) return;
    radioGroup.onValueChange?.(value);
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
      role="menuitemradio"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      className={cn(
        menuRadioItemVariants(),
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
      data-slot="radio-item"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span
        className="inline-flex size-4 items-center justify-center shrink-0"
        data-slot="item-indicator"
      >
        {checked && (
          <Icon size="sm">
            <DotIcon />
          </Icon>
        )}
      </span>
      {children}
    </div>
  );
}

MenuRadioItemBase.displayName = "MenuRadioItemBase";

export { MenuRadioItemBase };
