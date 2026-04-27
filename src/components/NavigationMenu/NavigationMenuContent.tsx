"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { Portal } from "@nuka/utils/portal";
import { useFocusFirstInteractive } from "@nuka/hooks/use-focus-first-interactive";
import {
  NavigationMenuContentContext,
  useNavigationMenuContext,
  useNavigationMenuItemContext,
} from "@nuka/components/NavigationMenu/NavigationMenu.context";

export interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  portal?: boolean;
}

function NavigationMenuContent({
  ref,
  portal = false,
  className,
  children,
  ...props
}: NavigationMenuContentProps) {
  const rootCtx = useNavigationMenuContext();
  const itemCtx = useNavigationMenuItemContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const composedRef = composeRefs(ref, contentRef, itemCtx.refs.setFloating);

  useFocusFirstInteractive(contentRef, itemCtx.open);

  const floatingProps = itemCtx.getFloatingProps(props);

  const content = (
    <NavigationMenuContentContext value={true}>
      <div
        ref={composedRef}
        id={itemCtx.contentId}
        role="dialog"
        aria-label={
          rootCtx.itemLabels.current.get(itemCtx.value) ?? itemCtx.value
        }
        aria-hidden={!itemCtx.open}
        tabIndex={-1}
        style={itemCtx.floatingStyles}
        data-slot="content"
        // Safe: Floating UI getFloatingProps() returns Record<string, unknown>;
        // values are standard DOM attributes and event handlers.
        {...floatingProps}
        className={cn(
          "z-(--nuka-z-dropdown) min-w-48",
          "rounded-(--radius-md) border border-(--nuka-border-base)",
          "bg-(--nuka-bg-base) shadow-md",
          "p-(--space-4)",
          "focus-visible:outline-none",
          itemCtx.open
            ? "visible pointer-events-auto"
            : "invisible pointer-events-none",
          className,
        )}
      >
        {children}
      </div>
    </NavigationMenuContentContext>
  );

  return portal ? <Portal>{content}</Portal> : content;
}

NavigationMenuContent.displayName = "NavigationMenuContent";

export { NavigationMenuContent };
