import * as React from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import {
  useMenubarContext,
  MenubarMenuContext,
} from "@nuka/components/Menubar/Menubar.context";
import type { MenubarMenuContextValue } from "@nuka/components/Menubar/Menubar.context";

export interface MenubarMenuProps {
  value: string;
  children: React.ReactNode;
}

function MenubarMenu({ value, children }: MenubarMenuProps) {
  const bar = useMenubarContext();

  React.useEffect(() => {
    bar.registerMenu(value);
  }, [bar, value]);

  const open = bar.openValue === value;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        bar.openMenu(value);
      } else {
        bar.closeMenu();
      }
    },
    [bar, value],
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const menuContextValue: MenubarMenuContextValue = React.useMemo(
    () => ({
      value,
      open,
      onOpenChange: handleOpenChange,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      value,
      open,
      handleOpenChange,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    ],
  );

  return (
    <MenubarMenuContext value={menuContextValue}>{children}</MenubarMenuContext>
  );
}

MenubarMenu.displayName = "MenubarMenu";

export { MenubarMenu };
