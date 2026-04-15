"use client";
import { createContext, useContext } from "react";

type HeadingLevel = "h2" | "h3" | "h4";

interface AccordionContextValue {
  type: "single" | "multiple";
  collapsible: boolean;
  headingLevel: HeadingLevel;
  isItemOpen: (value: string) => boolean;
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);
  if (context === null) {
    throw new Error(
      "Accordion compound components must be used within an <Accordion> parent.",
    );
  }
  return context;
}

interface AccordionItemContextValue {
  value: string;
  disabled: boolean;
  open: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

function useAccordionItemContext(): AccordionItemContextValue {
  const context = useContext(AccordionItemContext);
  if (context === null) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used within an <AccordionItem> parent.",
    );
  }
  return context;
}

export {
  AccordionContext,
  useAccordionContext,
  AccordionItemContext,
  useAccordionItemContext,
};
export type { AccordionContextValue, AccordionItemContextValue, HeadingLevel };
