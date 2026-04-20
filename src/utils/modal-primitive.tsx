"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Slot } from "@nuka/utils/slot";
import { DismissButton } from "@nuka/utils/dismiss-button";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { useEscapeKey } from "@nuka/hooks/use-escape-key";
import { Heading } from "@nuka/components/Heading";
import { Text } from "@nuka/components/Text";

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
  ref?: React.Ref<HTMLButtonElement> | undefined;
  asChild?: boolean;
}

export interface ModalTitleProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {
  ref?: React.Ref<HTMLElement> | undefined;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface ModalDescriptionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {
  ref?: React.Ref<HTMLElement> | undefined;
}

export interface ModalCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  asChild?: boolean;
}

interface ModalPrimitiveResult {
  Root: React.FC<ModalRootProps>;
  Trigger: React.FC<ModalTriggerProps>;
  Title: React.FC<ModalTitleProps>;
  Description: React.FC<ModalDescriptionProps>;
  Close: React.FC<ModalCloseProps>;
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

  function Trigger({
    ref,
    asChild = false,
    onClick,
    ...props
  }: ModalTriggerProps) {
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
        data-slot="trigger"
        onClick={handleClick}
        {...props}
      />
    );
  }

  Trigger.displayName = `${displayNamePrefix}Trigger`;

  function Title({ ref, as = "h2", className, ...props }: ModalTitleProps) {
    const ctx = useContext();

    return (
      <Heading
        ref={ref}
        as={as}
        size="xl"
        weight="semibold"
        id={ctx.titleId}
        className={className}
        data-slot="title"
        {...props}
      />
    );
  }

  Title.displayName = `${displayNamePrefix}Title`;

  function Description({ ref, className, ...props }: ModalDescriptionProps) {
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
        data-slot="description"
        {...props}
      />
    );
  }

  Description.displayName = `${displayNamePrefix}Description`;

  function Close({ ref, asChild = false, onClick, ...props }: ModalCloseProps) {
    const ctx = useContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.onOpenChange(false);
      onClick?.(e);
    };

    if (asChild) {
      return (
        <Slot ref={ref} data-slot="close" onClick={handleClick} {...props} />
      );
    }

    return (
      <DismissButton
        data-slot="close"
        {...props}
        ref={ref}
        onClick={() => ctx.onOpenChange(false)}
        label={closeLabel}
      />
    );
  }

  Close.displayName = `${displayNamePrefix}Close`;

  return { Root, Trigger, Title, Description, Close };
}

export { createModalPrimitive, useEscapeKey };
