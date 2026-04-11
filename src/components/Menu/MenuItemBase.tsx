import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { menuItemVariants } from "@nuka/components/Menu/menuItemVariants";
import type { MenuItemVariantProps } from "@nuka/components/Menu/menuItemVariants";

export interface MenuItemBaseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    MenuItemVariantProps {
  disabled?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
}

const MenuItemBase = React.forwardRef<HTMLDivElement, MenuItemBaseProps>(
  (
    {
      className,
      intent,
      disabled = false,
      onSelect,
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
      onSelect?.();
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
        role="menuitem"
        aria-disabled={disabled || undefined}
        className={cn(
          menuItemVariants({ intent }),
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);

MenuItemBase.displayName = "MenuItemBase";

export { MenuItemBase };
