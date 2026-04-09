/**
 * CVA conventions for nuka-ui components
 *
 * Structure every component's variants file as follows:
 *
 *   1. Import cva and VariantProps from 'class-variance-authority'
 *   2. Define the base classes (always applied)
 *   3. Define variants (mutually exclusive options per axis)
 *   4. Define compoundVariants (classes applied when multiple variants combine)
 *   5. Define defaultVariants
 *   6. Export the VariantProps type alongside the cva instance
 *
 * Naming:
 *   - cva instance: <componentName>Variants  (e.g. buttonVariants)
 *   - props type:   <ComponentName>VariantProps  (e.g. ButtonVariantProps)
 *
 * Token usage:
 *   - Always reference CSS custom properties, never raw Tailwind color utilities
 *   - Correct:   bg-(--nuka-accent-bg)
 *   - Incorrect: bg-blue-500
 *
 * Class ordering within a variant value:
 *   - Layout first, then visual, then interactive
 *   - e.g. 'px-4 py-2 rounded-md bg-(--nuka-accent-bg) hover:bg-(--nuka-accent-bg-hover)'
 */

export { cva, type VariantProps } from "class-variance-authority";

interface IntentCompoundVariant {
  variant: "primary" | "secondary" | "outline" | "ghost";
  intent: "default" | "danger" | "success" | "warning";
  className: string[];
}

/**
 * Returns the standard 16-cell compound variant matrix (4 variants x 4 intents).
 *
 * The secondary-default cell differs between components (e.g. Tag uses neutral
 * tokens, Alert uses accent tokens). Pass `secondaryDefault` to override that
 * single cell. When omitted, defaults to Tag's neutral treatment.
 */
function intentCompoundVariants(options?: {
  secondaryDefault?: string[];
}): IntentCompoundVariant[] {
  const secondaryDefault = options?.secondaryDefault ?? [
    "bg-(--nuka-bg-muted)",
    "text-(--nuka-text-base)",
    "border-(--nuka-border-base)",
  ];

  return [
    {
      variant: "primary",
      intent: "default",
      className: ["bg-(--nuka-accent-bg)", "text-(--nuka-accent-fg)"],
    },
    {
      variant: "primary",
      intent: "danger",
      className: ["bg-(--nuka-danger-base)", "text-(--nuka-danger-fg)"],
    },
    {
      variant: "primary",
      intent: "success",
      className: ["bg-(--nuka-success-base)", "text-(--nuka-success-fg)"],
    },
    {
      variant: "primary",
      intent: "warning",
      className: ["bg-(--nuka-warning-base)", "text-(--nuka-warning-fg)"],
    },

    {
      variant: "secondary",
      intent: "default",
      className: secondaryDefault,
    },
    {
      variant: "secondary",
      intent: "danger",
      className: [
        "bg-(--nuka-danger-bg)",
        "text-(--nuka-danger-text)",
        "border-(--nuka-danger-border)",
      ],
    },
    {
      variant: "secondary",
      intent: "success",
      className: [
        "bg-(--nuka-success-bg)",
        "text-(--nuka-success-text)",
        "border-(--nuka-success-border)",
      ],
    },
    {
      variant: "secondary",
      intent: "warning",
      className: [
        "bg-(--nuka-warning-bg)",
        "text-(--nuka-warning-text)",
        "border-(--nuka-warning-border)",
      ],
    },

    {
      variant: "outline",
      intent: "default",
      className: ["border-(--nuka-accent-border)", "text-(--nuka-accent-text)"],
    },
    {
      variant: "outline",
      intent: "danger",
      className: ["border-(--nuka-danger-border)", "text-(--nuka-danger-text)"],
    },
    {
      variant: "outline",
      intent: "success",
      className: [
        "border-(--nuka-success-border)",
        "text-(--nuka-success-text)",
      ],
    },
    {
      variant: "outline",
      intent: "warning",
      className: [
        "border-(--nuka-warning-border)",
        "text-(--nuka-warning-text)",
      ],
    },

    {
      variant: "ghost",
      intent: "default",
      className: ["text-(--nuka-text-base)"],
    },
    {
      variant: "ghost",
      intent: "danger",
      className: ["text-(--nuka-danger-text)"],
    },
    {
      variant: "ghost",
      intent: "success",
      className: ["text-(--nuka-success-text)"],
    },
    {
      variant: "ghost",
      intent: "warning",
      className: ["text-(--nuka-warning-text)"],
    },
  ];
}

const selectionIndicatorIntentVariants = [
  {
    intent: "default" as const,
    className: [
      "border-(--nuka-input-border)",
      "peer-checked:bg-(--nuka-accent-bg)",
      "peer-checked:border-transparent",
    ],
  },
  {
    intent: "danger" as const,
    className: [
      "border-(--nuka-danger-border)",
      "peer-checked:bg-(--nuka-danger-base)",
      "peer-checked:border-transparent",
    ],
  },
  {
    intent: "success" as const,
    className: [
      "border-(--nuka-success-border)",
      "peer-checked:bg-(--nuka-success-base)",
      "peer-checked:border-transparent",
    ],
  },
  {
    intent: "warning" as const,
    className: [
      "border-(--nuka-warning-border)",
      "peer-checked:bg-(--nuka-warning-base)",
      "peer-checked:border-transparent",
      "peer-checked:text-(--nuka-warning-fg)",
    ],
  },
];

export { intentCompoundVariants, selectionIndicatorIntentVariants };
export type { IntentCompoundVariant };
