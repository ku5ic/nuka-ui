"use client";
import * as React from "react";
import { composeRefs } from "@nuka/utils/slot";
import { getActiveElement } from "@nuka/utils/get-active-element";
import { getRovingIndex } from "@nuka/utils/roving-index";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { AccordionContext } from "@nuka/components/Accordion/Accordion.context";
import type { HeadingLevel } from "@nuka/components/Accordion/Accordion.context";

interface AccordionSingleProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  headingLevel?: HeadingLevel;
}

interface AccordionMultipleProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
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

  const active = getActiveElement();
  const items = Array.from(triggers) as HTMLButtonElement[];
  const currentIndex = items.indexOf(active as HTMLButtonElement);
  if (currentIndex === -1) return;

  const nextIndex = getRovingIndex(
    e.key,
    currentIndex,
    items.length,
    "vertical",
  );
  if (nextIndex === undefined) return;

  e.preventDefault();
  items[nextIndex]?.focus();
}

function Accordion(props: AccordionProps) {
  const {
    ref,
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
}

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
  const [value, setValue] = useControllableState<string | undefined>(
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
            setValue(undefined);
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

export { Accordion };
