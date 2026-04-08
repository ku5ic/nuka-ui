import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { useControllableState } from "@nuka/utils/use-controllable-state";
import { Icon } from "@nuka/components/Icon";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@nuka/components/Collapsible";
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from "./AccordionContext";
import type { HeadingLevel } from "./AccordionContext";

interface AccordionSingleProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  headingLevel?: HeadingLevel;
}

interface AccordionMultipleProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  collapsible?: never;
  headingLevel?: HeadingLevel;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const TRIGGER_SELECTOR = "button[data-accordion-trigger]";

function handleKeyboardNavigation(
  e: React.KeyboardEvent<HTMLDivElement>,
  rootRef: React.RefObject<HTMLDivElement | null>,
) {
  const triggers = rootRef.current?.querySelectorAll(TRIGGER_SELECTOR);
  if (!triggers || triggers.length === 0) return;

  const active = document.activeElement;
  const items = Array.from(triggers) as HTMLButtonElement[];
  const currentIndex = items.indexOf(active as HTMLButtonElement);
  if (currentIndex === -1) return;

  let nextIndex: number | undefined;

  switch (e.key) {
    case "ArrowDown":
      nextIndex = (currentIndex + 1) % items.length;
      break;
    case "ArrowUp":
      nextIndex = (currentIndex - 1 + items.length) % items.length;
      break;
    case "Home":
      nextIndex = 0;
      break;
    case "End":
      nextIndex = items.length - 1;
      break;
    default:
      return;
  }

  e.preventDefault();
  items[nextIndex]?.focus();
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const {
      type,
      headingLevel = "h3",
      className,
      children,
      onKeyDown,
      ...rest
    } = props;

    const rootRef = React.useRef<HTMLDivElement>(null);
    const composedRef = composeRefs(ref, rootRef);

    if (type === "single") {
      return (
        <AccordionSingle
          {...(rest as Omit<
            AccordionSingleProps,
            "type" | "headingLevel" | "className" | "children" | "onKeyDown"
          >)}
          headingLevel={headingLevel}
          className={className}
          rootRef={rootRef}
          composedRef={composedRef}
          onKeyDown={onKeyDown}
        >
          {children}
        </AccordionSingle>
      );
    }

    return (
      <AccordionMultiple
        {...(rest as Omit<
          AccordionMultipleProps,
          "type" | "headingLevel" | "className" | "children" | "onKeyDown"
        >)}
        headingLevel={headingLevel}
        className={className}
        rootRef={rootRef}
        composedRef={composedRef}
        onKeyDown={onKeyDown}
      >
        {children}
      </AccordionMultiple>
    );
  },
);

Accordion.displayName = "Accordion";

interface AccordionInternalProps {
  headingLevel: HeadingLevel;
  className: string | undefined;
  children: React.ReactNode | undefined;
  rootRef: React.RefObject<HTMLDivElement | null>;
  composedRef: (node: HTMLDivElement | null) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement> | undefined;
}

function AccordionSingle({
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible = false,
  headingLevel,
  className,
  children,
  rootRef,
  composedRef,
  onKeyDown,
  ...divProps
}: Omit<AccordionSingleProps, "type"> & AccordionInternalProps) {
  const [value, setValue] = useControllableState(
    controlledValue,
    defaultValue,
    onValueChange as ((value: string | undefined) => void) | undefined,
  );

  const contextValue = React.useMemo(
    () => ({
      type: "single" as const,
      collapsible,
      headingLevel,
      isItemOpen: (itemValue: string) => value === itemValue,
      toggleItem: (itemValue: string) => {
        if (value === itemValue) {
          if (collapsible) {
            setValue(undefined as unknown as string);
          }
        } else {
          setValue(itemValue);
        }
      },
    }),
    [value, setValue, collapsible, headingLevel],
  );

  return (
    <AccordionContext value={contextValue}>
      <div
        ref={composedRef}
        className={className}
        onKeyDown={(e) => {
          handleKeyboardNavigation(e, rootRef);
          onKeyDown?.(e);
        }}
        {...divProps}
      >
        {children}
      </div>
    </AccordionContext>
  );
}

function AccordionMultiple({
  value: controlledValue,
  defaultValue,
  onValueChange,
  headingLevel,
  className,
  children,
  rootRef,
  composedRef,
  onKeyDown,
  ...divProps
}: Omit<AccordionMultipleProps, "type" | "collapsible"> &
  AccordionInternalProps) {
  const [value, setValue] = useControllableState(
    controlledValue,
    defaultValue ?? [],
    onValueChange,
  );

  const contextValue = React.useMemo(
    () => ({
      type: "multiple" as const,
      collapsible: true,
      headingLevel,
      isItemOpen: (itemValue: string) => value.includes(itemValue),
      toggleItem: (itemValue: string) => {
        if (value.includes(itemValue)) {
          setValue(value.filter((v) => v !== itemValue));
        } else {
          setValue([...value, itemValue]);
        }
      },
    }),
    [value, setValue, headingLevel],
  );

  return (
    <AccordionContext value={contextValue}>
      <div
        ref={composedRef}
        className={className}
        onKeyDown={(e) => {
          handleKeyboardNavigation(e, rootRef);
          onKeyDown?.(e);
        }}
        {...divProps}
      >
        {children}
      </div>
    </AccordionContext>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const { isItemOpen, toggleItem } = useAccordionContext();
    const open = isItemOpen(value);

    const itemContextValue = React.useMemo(
      () => ({ value, disabled, open }),
      [value, disabled, open],
    );

    return (
      <AccordionItemContext value={itemContextValue}>
        <Collapsible
          ref={ref}
          open={open}
          onOpenChange={() => toggleItem(value)}
          disabled={disabled}
          className={cn("border-b border-(--nuka-border-base)", className)}
          {...props}
        >
          {children}
        </Collapsible>
      </AccordionItemContext>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const { headingLevel } = useAccordionContext();
  const { open } = useAccordionItemContext();
  const HeadingTag = headingLevel;

  return (
    <HeadingTag className="flex">
      <CollapsibleTrigger
        ref={ref}
        data-accordion-trigger=""
        className={cn(
          "flex flex-1 items-center justify-between",
          "py-(--space-4)",
          "text-[length:var(--font-size-sm)]",
          "font-[number:var(--font-weight-medium)]",
          "text-(--nuka-text-base)",
          "transition-colors duration-150",
          "hover:underline",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-(--nuka-border-focus)",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <Icon
          size="sm"
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Icon>
      </CollapsibleTrigger>
    </HeadingTag>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsibleContent ref={ref} className={className} {...props}>
      <div className="pb-(--space-4)">{children}</div>
    </CollapsibleContent>
  );
});

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
