"use client";

import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import { Heading } from "@nuka/components/Heading";
import type { HeadingElement } from "@nuka/components/Heading";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";
import {
  cardVariants,
  type CardVariantProps,
} from "@nuka/components/Card/Card.variants";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, CardVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  asChild?: boolean;
}

function Card({
  ref,
  className,
  variant,
  asChild = false,
  ...props
}: CardProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  asChild?: boolean;
}

function CardHeader({
  ref,
  className,
  asChild = false,
  ...props
}: CardHeaderProps) {
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
}

CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {
  ref?: React.Ref<HTMLElement> | undefined;
  as?: HeadingElement;
}

function CardTitle({ ref, as = "h3", className, ...props }: CardTitleProps) {
  return (
    <Heading ref={ref} as={as} size="xl" className={className} {...props} />
  );
}

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {
  ref?: React.Ref<HTMLElement> | undefined;
}

function CardDescription({ ref, className, ...props }: CardDescriptionProps) {
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
}

CardDescription.displayName = "CardDescription";

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  asChild?: boolean;
}

function CardBody({
  ref,
  className,
  asChild = false,
  ...props
}: CardBodyProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp ref={ref} className={cn("p-(--space-6)", className)} {...props} />
  );
}

CardBody.displayName = "CardBody";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  asChild?: boolean;
}

function CardFooter({
  ref,
  className,
  asChild = false,
  ...props
}: CardFooterProps) {
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
}

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
