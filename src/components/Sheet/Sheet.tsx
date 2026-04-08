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
import { SheetContext, useSheetContext } from "./SheetContext";

export type SheetSide = "top" | "right" | "bottom" | "left";

export interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Sheet({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: SheetProps) {
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

  return <SheetContext value={contextValue}>{children}</SheetContext>;
}

Sheet.displayName = "Sheet";

export interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ asChild = false, onClick, ...props }, ref) => {
    const ctx = useSheetContext();
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

SheetTrigger.displayName = "SheetTrigger";

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
              "Sheet: a <SheetTitle> is required for accessible labeling. " +
                "Add a <SheetTitle> inside <SheetContent>.",
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
            "bg-(--nuka-bg-base) border-(--nuka-border-base) shadow-md",
            "p-(--space-6)",
            "transition-transform duration-300 ease-in-out",
            "motion-reduce:transition-none",
            "focus:outline-none",
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

export interface SheetTitleProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const SheetTitle = React.forwardRef<HTMLElement, SheetTitleProps>(
  ({ as = "h2", className, ...props }, ref) => {
    const ctx = useSheetContext();

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

SheetTitle.displayName = "SheetTitle";

export interface SheetDescriptionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {}

const SheetDescription = React.forwardRef<HTMLElement, SheetDescriptionProps>(
  ({ className, ...props }, ref) => {
    const ctx = useSheetContext();

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

SheetDescription.displayName = "SheetDescription";

export interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ asChild = false, onClick, ...props }, ref) => {
    const ctx = useSheetContext();

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
        label="Close sheet"
      />
    );
  },
);

SheetClose.displayName = "SheetClose";

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
};
