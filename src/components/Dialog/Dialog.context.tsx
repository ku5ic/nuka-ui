"use client";
import { createContext, useContext } from "react";

export interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  hasDescription: boolean;
  setHasDescription: (value: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(): DialogContextValue {
  const context = useContext(DialogContext);
  if (context === null) {
    throw new Error("Dialog compound components must be used within <Dialog>");
  }
  return context;
}

export { DialogContext, useDialogContext };
