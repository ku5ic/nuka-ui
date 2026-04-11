import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  codeVariants,
  type CodeVariantProps,
} from "@nuka/components/Code/Code.variants";

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>, CodeVariantProps {}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant, intent, size, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(codeVariants({ variant, intent, size }), className)}
        {...props}
      />
    );
  },
);

Code.displayName = "Code";

export { Code, codeVariants };
