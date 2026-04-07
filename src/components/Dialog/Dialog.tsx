import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Slot } from "@nuka/utils/slot";
import { Portal } from "@nuka/utils/portal";
import { DismissButton } from "@nuka/utils/dismiss-button";
import { useControllableState } from "@nuka/utils/use-controllable-state";
import { useFocusTrap } from "@nuka/utils/use-focus-trap";
import { useScrollLock } from "@nuka/utils/use-scroll-lock";
import { Heading } from "@nuka/components/Heading";
import { Text } from "@nuka/components/Text";
import { DialogContext, useDialogContext } from "./DialogContext";

export interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Dialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: DialogProps) {
  const [open, setOpen] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );

  const baseId = React.useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const [hasDescription, setHasDescription] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({
      open,
      onOpenChange: setOpen,
      titleId,
      descriptionId,
      hasDescription,
      setHasDescription,
    }),
    [open, setOpen, titleId, descriptionId, hasDescription],
  );

  return <DialogContext value={contextValue}>{children}</DialogContext>;
}

Dialog.displayName = "Dialog";

export interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild = false, onClick, ...props }, ref) => {
    const ctx = useDialogContext();
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.onOpenChange(true);
      onClick?.(e);
    };

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        aria-haspopup="dialog"
        aria-expanded={ctx.open}
        onClick={handleClick}
        {...props}
      />
    );
  },
);

DialogTrigger.displayName = "DialogTrigger";

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useDialogContext();
    const panelRef = React.useRef<HTMLDivElement>(null);

    const composedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        panelRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    useFocusTrap(panelRef, ctx.open);
    useScrollLock(ctx.open);

    React.useEffect(() => {
      if (ctx.open && process.env.NODE_ENV !== "production") {
        const frame = requestAnimationFrame(() => {
          if (!document.getElementById(ctx.titleId)) {
            console.error(
              "Dialog: a <DialogTitle> is required for accessible labeling. " +
                "Add a <DialogTitle> inside <DialogContent>.",
            );
          }
        });
        return () => cancelAnimationFrame(frame);
      }
      return undefined;
    }, [ctx.open, ctx.titleId]);

    const { open, onOpenChange } = ctx;
    React.useEffect(() => {
      if (!open) return undefined;

      function handleEscape(e: KeyboardEvent) {
        if (e.key === "Escape") {
          e.stopPropagation();
          onOpenChange(false);
        }
      }

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onOpenChange]);

    if (!ctx.open) return null;

    return (
      <Portal>
        <div
          className={cn(
            "fixed inset-0 z-50",
            "bg-[oklch(0%_0_0_/_0.5)]",
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
            "fixed z-50",
            "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-full max-w-lg",
            "rounded-(--radius-xl) border border-(--nuka-border-base)",
            "bg-(--nuka-bg-base) shadow-md",
            "p-(--space-6)",
            "data-[state=open]:animate-[nuka-dialog-enter_150ms_ease-out]",
            "focus:outline-none",
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
  },
);

DialogContent.displayName = "DialogContent";

export interface DialogTitleProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const DialogTitle = React.forwardRef<HTMLElement, DialogTitleProps>(
  ({ as = "h2", className, ...props }, ref) => {
    const ctx = useDialogContext();

    return (
      <Heading
        ref={ref}
        as={as}
        size="xl"
        weight="semibold"
        id={ctx.titleId}
        className={className}
        {...props}
      />
    );
  },
);

DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {}

const DialogDescription = React.forwardRef<HTMLElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    const ctx = useDialogContext();

    const { setHasDescription } = ctx;
    React.useEffect(() => {
      setHasDescription(true);
      return () => setHasDescription(false);
    }, [setHasDescription]);

    return (
      <Text
        ref={ref}
        color="muted"
        size="sm"
        id={ctx.descriptionId}
        className={cn("mt-(--space-2)", className)}
        {...props}
      />
    );
  },
);

DialogDescription.displayName = "DialogDescription";

export interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild = false, onClick, ...props }, ref) => {
    const ctx = useDialogContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.onOpenChange(false);
      onClick?.(e);
    };

    if (asChild) {
      return <Slot ref={ref} onClick={handleClick} {...props} />;
    }

    return (
      <DismissButton
        onClick={() => ctx.onOpenChange(false)}
        label="Close dialog"
      />
    );
  },
);

DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
