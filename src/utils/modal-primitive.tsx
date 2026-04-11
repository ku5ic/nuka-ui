import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Slot } from "@nuka/utils/slot";
import { DismissButton } from "@nuka/utils/dismiss-button";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { useEscapeKey } from "@nuka/hooks/use-escape-key";
import { Heading } from "@nuka/components/Heading";
import { Text } from "@nuka/components/Text";

function useModalTitleWarning(
  displayName: string,
  titleId: string,
  open: boolean,
): void {
  React.useEffect(() => {
    if (open && process.env.NODE_ENV !== "production") {
      const frame = requestAnimationFrame(() => {
        if (!document.getElementById(titleId)) {
          console.error(
            `${displayName}: a <${displayName}Title> is required for accessible labeling. ` +
              `Add a <${displayName}Title> inside <${displayName}Content>.`,
          );
        }
      });
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [open, displayName, titleId]);
}

export interface ModalContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  hasDescription: boolean;
  setHasDescription: (value: boolean) => void;
}

interface ModalPrimitiveOptions {
  displayNamePrefix: string;
  closeLabel: string;
  Context: React.Context<ModalContextValue | null>;
  useContext: () => ModalContextValue;
}

export interface ModalRootProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ModalTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface ModalTitleProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface ModalDescriptionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {}

export interface ModalCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

interface ModalPrimitiveResult {
  Root: React.FC<ModalRootProps>;
  Trigger: React.ForwardRefExoticComponent<
    ModalTriggerProps & React.RefAttributes<HTMLButtonElement>
  >;
  Title: React.ForwardRefExoticComponent<
    ModalTitleProps & React.RefAttributes<HTMLElement>
  >;
  Description: React.ForwardRefExoticComponent<
    ModalDescriptionProps & React.RefAttributes<HTMLElement>
  >;
  Close: React.ForwardRefExoticComponent<
    ModalCloseProps & React.RefAttributes<HTMLButtonElement>
  >;
}

function createModalPrimitive(
  options: ModalPrimitiveOptions,
): ModalPrimitiveResult {
  const { displayNamePrefix, closeLabel, Context, useContext } = options;

  function Root({
    children,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
  }: ModalRootProps) {
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

    return <Context value={contextValue}>{children}</Context>;
  }

  Root.displayName = displayNamePrefix;

  const Trigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
    ({ asChild = false, onClick, ...props }, ref) => {
      const ctx = useContext();
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

  Trigger.displayName = `${displayNamePrefix}Trigger`;

  const Title = React.forwardRef<HTMLElement, ModalTitleProps>(
    ({ as = "h2", className, ...props }, ref) => {
      const ctx = useContext();

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

  Title.displayName = `${displayNamePrefix}Title`;

  const Description = React.forwardRef<HTMLElement, ModalDescriptionProps>(
    ({ className, ...props }, ref) => {
      const ctx = useContext();

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

  Description.displayName = `${displayNamePrefix}Description`;

  const Close = React.forwardRef<HTMLButtonElement, ModalCloseProps>(
    ({ asChild = false, onClick, ...props }, ref) => {
      const ctx = useContext();

      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        ctx.onOpenChange(false);
        onClick?.(e);
      };

      if (asChild) {
        return <Slot ref={ref} onClick={handleClick} {...props} />;
      }

      return (
        <DismissButton
          {...props}
          ref={ref}
          onClick={() => ctx.onOpenChange(false)}
          label={closeLabel}
        />
      );
    },
  );

  Close.displayName = `${displayNamePrefix}Close`;

  return { Root, Trigger, Title, Description, Close };
}

export { createModalPrimitive, useEscapeKey, useModalTitleWarning };
