import { cva } from "@nuka/utils/variants";

export const toastVariants = cva(
  [
    "relative flex items-start gap-(--space-3)",
    "w-80 rounded-(--radius-md) border p-(--space-4)",
    "shadow-lg",
    "transition-all duration-300",
    "data-[state=open]:animate-[nuka-toast-enter_200ms_ease-out]",
    "data-[state=closed]:animate-[nuka-toast-exit_300ms_ease-in_forwards]",
  ],
  {
    variants: {
      intent: {
        default: [
          "bg-(--nuka-bg-base)",
          "border-(--nuka-border-base)",
          "text-(--nuka-text-base)",
        ],
        success: [
          "bg-(--nuka-success-bg)",
          "border-(--nuka-success-border)",
          "text-(--nuka-success-text)",
        ],
        danger: [
          "bg-(--nuka-danger-bg)",
          "border-(--nuka-danger-border)",
          "text-(--nuka-danger-text)",
        ],
        warning: [
          "bg-(--nuka-warning-bg)",
          "border-(--nuka-warning-border)",
          "text-(--nuka-warning-text)",
        ],
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);
