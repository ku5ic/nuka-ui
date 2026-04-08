import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import {
  menuItemVariants,
  menuCheckboxItemVariants,
  menuRadioItemVariants,
  menuSeparatorVariants,
  menuLabelVariants,
} from "@nuka/components/Menu/menuItemVariants";
import type { MenuItemVariantProps } from "@nuka/components/Menu/menuItemVariants";

export interface MenuItemBaseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    MenuItemVariantProps {
  disabled?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
}

const MenuItemBase = React.forwardRef<HTMLDivElement, MenuItemBaseProps>(
  ({ className, intent, disabled = false, onSelect, onClose, children, onClick, onKeyDown, ...props }, ref) => {
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

export interface MenuCheckboxItemBaseProps
  extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  onClose?: () => void;
}

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const DotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const MenuCheckboxItemBase = React.forwardRef<HTMLDivElement, MenuCheckboxItemBaseProps>(
  ({ className, checked, onCheckedChange, disabled = false, onClose, children, onClick, onKeyDown, ...props }, ref) => {
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

export interface MenuRadioGroupBaseProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange?: (value: string) => void;
}

const MenuRadioGroupContext = React.createContext<{
  value: string;
  onValueChange?: ((value: string) => void) | undefined;
} | undefined>(undefined);

function useMenuRadioGroup() {
  const ctx = React.useContext(MenuRadioGroupContext);
  if (ctx === undefined) {
    throw new Error("useMenuRadioGroup must be used within a MenuRadioGroup");
  }
  return ctx;
}

const MenuRadioGroupBase = React.forwardRef<HTMLDivElement, MenuRadioGroupBaseProps>(
  ({ value, onValueChange, children, ...props }, ref) => {
    const ctxValue = React.useMemo(
      () => ({ value, onValueChange }),
      [value, onValueChange],
    );

    return (
      <MenuRadioGroupContext value={ctxValue}>
        <div ref={ref} role="group" {...props}>
          {children}
        </div>
      </MenuRadioGroupContext>
    );
  },
);

MenuRadioGroupBase.displayName = "MenuRadioGroupBase";

export interface MenuRadioItemBaseProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  onClose?: () => void;
}

const MenuRadioItemBase = React.forwardRef<HTMLDivElement, MenuRadioItemBaseProps>(
  ({ className, value, disabled = false, onClose, children, onClick, onKeyDown, ...props }, ref) => {
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
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span className="inline-flex size-4 items-center justify-center shrink-0">
          {checked && (
            <Icon size="sm">
              <DotIcon />
            </Icon>
          )}
        </span>
        {children}
      </div>
    );
  },
);

MenuRadioItemBase.displayName = "MenuRadioItemBase";

const MenuSeparatorBase = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn(menuSeparatorVariants(), className)}
      {...props}
    />
  ),
);

MenuSeparatorBase.displayName = "MenuSeparatorBase";

const MenuLabelBase = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(menuLabelVariants(), className)}
      {...props}
    >
      {children}
    </div>
  ),
);

MenuLabelBase.displayName = "MenuLabelBase";

export {
  MenuItemBase,
  MenuCheckboxItemBase,
  MenuRadioGroupBase,
  MenuRadioItemBase,
  MenuSeparatorBase,
  MenuLabelBase,
  MenuRadioGroupContext,
  useMenuRadioGroup,
  CheckIcon,
  DotIcon,
};
