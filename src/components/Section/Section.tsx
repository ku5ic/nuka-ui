import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import {
  sectionVariants,
  type SectionVariantProps,
} from "@nuka/components/Section/Section.variants";

type SectionElement =
  | "section"
  | "div"
  | "article"
  | "aside"
  | "main"
  | "header"
  | "footer";

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, SectionVariantProps {
  as?: SectionElement;
  asChild?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Comp = "section",
      className,
      spacing,
      background,
      divider,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Tag = asChild ? Slot : Comp;

    return (
      <Tag
        ref={ref as React.RefObject<never>}
        className={cn(
          sectionVariants({ spacing, background, divider }),
          className,
        )}
        {...props}
      />
    );
  },
);

Section.displayName = "Section";

export { Section, sectionVariants };
