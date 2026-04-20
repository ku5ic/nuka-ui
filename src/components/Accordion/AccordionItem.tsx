"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Collapsible } from "@nuka/components/Collapsible";
import {
  AccordionItemContext,
  useAccordionContext,
} from "@nuka/components/Accordion/Accordion.context";

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  value: string;
  disabled?: boolean;
}

function AccordionItem({
  ref,
  value,
  disabled = false,
  className,
  children,
  ...props
}: AccordionItemProps) {
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
        data-slot="item"
        {...props}
      >
        {children}
      </Collapsible>
    </AccordionItemContext>
  );
}

AccordionItem.displayName = "AccordionItem";

export { AccordionItem };
