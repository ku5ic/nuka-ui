import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { Heading } from "@nuka/components/Heading";
import type { HeadingElement } from "@nuka/components/Heading";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";

const cardVariants = cva(
  [
    "rounded-(--radius-lg)",
    "text-(--nuka-text-base)",
  ],
  {
    variants: {
      variant: {
        outlined: [
          "bg-(--nuka-bg-base)",
          "border",
          "border-(--nuka-border-base)",
        ],
        elevated: [
          "bg-(--nuka-bg-base)",
          "shadow-(--nuka-shadow-card)",
        ],
        filled: [
          "bg-(--nuka-bg-muted)",
        ],
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  },
);

export type CardVariantProps = VariantProps<typeof cardVariants>;

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariantProps {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn("p-(--space-6) pb-0", className)}
          {...props}
        />
      );
    }

    return (
      <Stack
        ref={ref}
        className={cn("p-(--space-6) pb-0", className)}
        direction="column"
        gap="xs"
        {...props}
      />
    );
  },
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  as?: HeadingElement;
}

const CardTitle = React.forwardRef<HTMLElement, CardTitleProps>(
  ({ as = "h3", className, ...props }, ref) => {
    return (
      <Heading
        ref={ref}
        as={as}
        size="xl"
        className={className}
        {...props}
      />
    );
  },
);

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {}

const CardDescription = React.forwardRef<HTMLElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        as="p"
        color="muted"
        size="sm"
        className={className}
        {...props}
      />
    );
  },
);

CardDescription.displayName = "CardDescription";

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn("p-(--space-6)", className)}
        {...props}
      />
    );
  },
);

CardBody.displayName = "CardBody";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn("p-(--space-6) pt-0", className)}
          {...props}
        />
      );
    }

    return (
      <Stack
        ref={ref}
        className={cn("p-(--space-6) pt-0", className)}
        direction="row"
        gap="sm"
        justify="end"
        {...props}
      />
    );
  },
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  cardVariants,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
};
