import * as React from "react";

export interface MenuRadioGroupBaseProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange?: (value: string) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

const MenuRadioGroupContext = React.createContext<
  | {
      value: string;
      onValueChange?: ((value: string) => void) | undefined;
    }
  | undefined
>(undefined);

function useMenuRadioGroup() {
  const ctx = React.useContext(MenuRadioGroupContext);
  if (ctx === undefined) {
    throw new Error("useMenuRadioGroup must be used within a MenuRadioGroup");
  }
  return ctx;
}

const MenuRadioGroupBase = React.forwardRef<
  HTMLDivElement,
  MenuRadioGroupBaseProps
>(({ value, onValueChange, children, ...props }, ref) => {
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
});

MenuRadioGroupBase.displayName = "MenuRadioGroupBase";

export { MenuRadioGroupBase, MenuRadioGroupContext, useMenuRadioGroup };
