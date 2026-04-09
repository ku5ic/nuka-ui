import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { Portal } from "@nuka/utils/portal";
import { DismissButton } from "@nuka/utils/dismiss-button";
import { useFocusTrap } from "@nuka/utils/use-focus-trap";
import { useScrollLock } from "@nuka/utils/use-scroll-lock";
import {
  createModalPrimitive,
  useEscapeKey,
  useModalTitleWarning,
} from "@nuka/utils/modal-primitive";
import type {
  ModalRootProps,
  ModalTriggerProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalCloseProps,
} from "@nuka/utils/modal-primitive";
import {
  SheetContext,
  useSheetContext,
} from "@nuka/components/Sheet/SheetContext";

export type SheetSide = "top" | "right" | "bottom" | "left";

const {
  Root: Sheet,
  Trigger: SheetTrigger,
  Title: SheetTitle,
  Description: SheetDescription,
  Close: SheetClose,
} = createModalPrimitive({
  displayNamePrefix: "Sheet",
  closeLabel: "Close sheet",
  Context: SheetContext,
  useContext: useSheetContext,
});

export type SheetProps = ModalRootProps;
export type SheetTriggerProps = ModalTriggerProps;
export type SheetTitleProps = ModalTitleProps;
export type SheetDescriptionProps = ModalDescriptionProps;
export type SheetCloseProps = ModalCloseProps;

const sideClasses: Record<SheetSide, string> = {
  right:
    "inset-y-0 right-0 h-full w-3/4 max-w-sm translate-x-full data-[state=open]:translate-x-0 border-l",
  left: "inset-y-0 left-0 h-full w-3/4 max-w-sm -translate-x-full data-[state=open]:translate-x-0 border-r",
  top: "inset-x-0 top-0 w-full -translate-y-full data-[state=open]:translate-y-0 border-b",
  bottom:
    "inset-x-0 bottom-0 w-full translate-y-full data-[state=open]:translate-y-0 border-t",
};

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: SheetSide;
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => {
    const ctx = useSheetContext();
    const panelRef = React.useRef<HTMLDivElement>(null);
    const composedRef = composeRefs(ref, panelRef);

    useFocusTrap(panelRef, ctx.open);
    useScrollLock(ctx.open);
    useModalTitleWarning("Sheet", ctx.titleId, ctx.open);
    useEscapeKey(() => ctx.onOpenChange(false), ctx.open);

    if (!ctx.open) return null;

    return (
      <Portal>
        <div
          className={cn(
            "fixed inset-0 z-50",
            "bg-(--nuka-bg-overlay)",
            "data-[state=open]:animate-[nuka-dialog-overlay-enter_150ms_ease-out]",
          )}
          data-state="open"
          onClick={() => ctx.onOpenChange(false)}
          aria-hidden="true"
        />
        <div
          ref={composedRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ctx.titleId}
          aria-describedby={ctx.hasDescription ? ctx.descriptionId : undefined}
          tabIndex={-1}
          data-state="open"
          data-side={side}
          className={cn(
            "fixed z-50",
            "bg-(--nuka-bg-base) border-(--nuka-border-base) shadow-md",
            "p-(--space-6)",
            "transition-transform duration-300 ease-in-out",
            "motion-reduce:transition-none",
            "focus-visible:outline-none",
            sideClasses[side],
            className,
          )}
          {...props}
        >
          <DismissButton
            onClick={() => ctx.onOpenChange(false)}
            label="Close sheet"
            className="absolute top-(--space-4) right-(--space-4) text-(--nuka-text-muted)"
          />
          {children}
        </div>
      </Portal>
    );
  },
);

SheetContent.displayName = "SheetContent";

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
};
