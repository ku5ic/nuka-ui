"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { DismissButton } from "@nuka/utils/dismiss-button";
import { Button } from "@nuka/components/Button";
import { Text } from "@nuka/components/Text";
import type { ToastItem } from "@nuka/components/Toast/toastStore";
import { toastVariants } from "@nuka/components/Toast/Toast.variants";

export interface ToastProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

function Toast({ ref, toast: toastItem, onDismiss }: ToastProps) {
  return (
    <div
      ref={ref}
      role="status"
      aria-live={toastItem.intent === "danger" ? "assertive" : "polite"}
      aria-atomic="true"
      data-slot="toast"
      data-state={toastItem.dismissing ? "closed" : "open"}
      className={cn(toastVariants({ intent: toastItem.intent }))}
    >
      <Text
        as="div"
        size="sm"
        weight="medium"
        className="flex-1"
        data-slot="message"
      >
        {toastItem.message}
      </Text>
      {toastItem.action != null && (
        <Button
          variant="link"
          size="sm"
          className="shrink-0"
          data-slot="action"
          onClick={() => {
            toastItem.action?.onClick();
            onDismiss(toastItem.id);
          }}
        >
          {toastItem.action.label}
        </Button>
      )}
      <DismissButton
        data-slot="close"
        onClick={() => onDismiss(toastItem.id)}
        label="Dismiss notification"
        className="shrink-0"
      />
    </div>
  );
}

Toast.displayName = "Toast";

export { Toast, toastVariants };
