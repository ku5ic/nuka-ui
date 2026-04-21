"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { CollapsibleTrigger } from "@nuka/components/Collapsible";
import {
  useAccordionContext,
  useAccordionItemContext,
} from "@nuka/components/Accordion/Accordion.context";

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement> | undefined;
}

function AccordionTrigger({
  ref,
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { headingLevel } = useAccordionContext();
  const { open } = useAccordionItemContext();
  const HeadingTag = headingLevel;

  return (
    <HeadingTag className="flex" data-slot="trigger-heading">
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
}

AccordionTrigger.displayName = "AccordionTrigger";

export { AccordionTrigger };
