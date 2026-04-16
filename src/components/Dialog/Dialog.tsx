"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { Portal } from "@nuka/utils/portal";
import { DismissButton } from "@nuka/utils/dismiss-button";
import { useFocusTrap } from "@nuka/hooks/use-focus-trap";
import { useScrollLock } from "@nuka/hooks/use-scroll-lock";
import {
  createModalPrimitive,
  useEscapeKey,
} from "@nuka/utils/modal-primitive";
import { useModalTitleWarning } from "@nuka/hooks/use-modal-title-warning";
import type {
  ModalRootProps,
  ModalTriggerProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalCloseProps,
} from "@nuka/utils/modal-primitive";
import {
  DialogContext,
  useDialogContext,
} from "@nuka/components/Dialog/Dialog.context";

const {
  Root: Dialog,
  Trigger: DialogTrigger,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
} = createModalPrimitive({
  displayNamePrefix: "Dialog",
  closeLabel: "Close dialog",
  Context: DialogContext,
  useContext: useDialogContext,
});

export type DialogProps = ModalRootProps;
export type DialogTriggerProps = ModalTriggerProps;
export type DialogTitleProps = ModalTitleProps;
export type DialogDescriptionProps = ModalDescriptionProps;
export type DialogCloseProps = ModalCloseProps;

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function DialogContent({
  ref,
  className,
  children,
  ...props
}: DialogContentProps) {
  const ctx = useDialogContext();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const composedRef = composeRefs(ref, panelRef);

  useFocusTrap(panelRef, ctx.open);
  useScrollLock(ctx.open);
  useModalTitleWarning("Dialog", ctx.titleId, ctx.open);
  useEscapeKey(() => ctx.onOpenChange(false), ctx.open);

  if (!ctx.open) return null;

  return (
    <Portal>
      <div
        className={cn(
          "fixed inset-0 z-(--nuka-z-modal)",
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
        className={cn(
          "fixed z-(--nuka-z-modal)",
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg",
          "rounded-(--radius-xl) border border-(--nuka-border-base)",
          "bg-(--nuka-bg-base) shadow-md",
          "p-(--space-6)",
          "data-[state=open]:animate-[nuka-dialog-enter_150ms_ease-out]",
          // Programmatic focus via useFocusTrap; :focus-visible does not activate, so this is inert
          "focus-visible:outline-none",
          className,
        )}
        {...props}
      >
        <DismissButton
          onClick={() => ctx.onOpenChange(false)}
          label="Close dialog"
          className="absolute top-(--space-4) right-(--space-4) text-(--nuka-text-muted)"
        />
        {children}
      </div>
    </Portal>
  );
}

DialogContent.displayName = "DialogContent";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
