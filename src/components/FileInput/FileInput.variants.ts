import { cva, type VariantProps } from "@nuka/utils/variants";

export const fileInputZoneVariants = cva(
  [
    "relative flex flex-col items-center justify-center",
    "rounded-(--radius-lg) border-2 border-dashed",
    "p-(--space-8)",
    "cursor-pointer",
    "transition-colors duration-(--nuka-duration-base)",
    "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-(--nuka-border-focus)",
  ],
  {
    variants: {
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      isDragOver: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        intent: "default",
        isDragOver: false,
        className: [
          "border-(--nuka-border-base)",
          "bg-(--nuka-bg-subtle)",
          "text-(--nuka-text-muted)",
        ],
      },
      {
        intent: "default",
        isDragOver: true,
        className: [
          "border-(--nuka-accent-border)",
          "bg-(--nuka-accent-bg-subtle)",
          "text-(--nuka-accent-text)",
        ],
      },
      {
        intent: "danger",
        isDragOver: false,
        className: [
          "border-(--nuka-danger-border)",
          "bg-(--nuka-danger-bg)",
          "text-(--nuka-danger-text)",
        ],
      },
      {
        intent: "danger",
        isDragOver: true,
        className: [
          "border-(--nuka-danger-base)",
          "bg-(--nuka-danger-bg)",
          "text-(--nuka-danger-text)",
        ],
      },
      {
        intent: "success",
        isDragOver: false,
        className: [
          "border-(--nuka-success-border)",
          "bg-(--nuka-success-bg)",
          "text-(--nuka-success-text)",
        ],
      },
      {
        intent: "success",
        isDragOver: true,
        className: [
          "border-(--nuka-success-base)",
          "bg-(--nuka-success-bg)",
          "text-(--nuka-success-text)",
        ],
      },
      {
        intent: "warning",
        isDragOver: false,
        className: [
          "border-(--nuka-warning-border)",
          "bg-(--nuka-warning-bg)",
          "text-(--nuka-warning-text)",
        ],
      },
      {
        intent: "warning",
        isDragOver: true,
        className: [
          "border-(--nuka-warning-base)",
          "bg-(--nuka-warning-bg)",
          "text-(--nuka-warning-text)",
        ],
      },
    ],
    defaultVariants: {
      intent: "default",
      isDragOver: false,
    },
  },
);

export type FileInputVariantProps = VariantProps<typeof fileInputZoneVariants>;
