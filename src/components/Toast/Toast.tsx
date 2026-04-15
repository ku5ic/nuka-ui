"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { DismissButton } from "@nuka/utils/dismiss-button";
import { Button } from "@nuka/components/Button";
import { Text } from "@nuka/components/Text";
import type { ToastItem } from "@nuka/components/Toast/toastStore";
import { toastVariants } from "@nuka/components/Toast/Toast.variants";

export interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ toast: toastItem, onDismiss }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live={toastItem.intent === "danger" ? "assertive" : "polite"}
        aria-atomic="true"
        data-state={toastItem.dismissing ? "closed" : "open"}
        className={cn(toastVariants({ intent: toastItem.intent }))}
      >
        <Text as="div" size="sm" weight="medium" className="flex-1">
          {toastItem.message}
        </Text>
        {toastItem.action != null && (
          <Button
            variant="link"
            size="sm"
            className="shrink-0"
            onClick={() => {
              toastItem.action?.onClick();
              onDismiss(toastItem.id);
            }}
          >
            {toastItem.action.label}
          </Button>
        )}
        <DismissButton
          onClick={() => onDismiss(toastItem.id)}
          label="Dismiss notification"
          className="shrink-0"
        />
      </div>
    );
  },
);

Toast.displayName = "Toast";

export { Toast, toastVariants };
