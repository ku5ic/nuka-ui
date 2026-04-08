import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Slot } from "@nuka/utils/slot";
import { useControllableState } from "@nuka/utils/use-controllable-state";
import { useMediaQuery } from "@nuka/utils/use-media-query";
import { Icon } from "@nuka/components/Icon";
import { Text } from "@nuka/components/Text";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@nuka/components/Tooltip";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@nuka/components/Sheet";
import {
  SidebarContext,
  useSidebarContext,
} from "@nuka/components/Sidebar/SidebarContext";
import type { SidebarContextValue } from "@nuka/components/Sidebar/SidebarContext";

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  mobileBreakpoint?: string;
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      expanded: controlledExpanded,
      defaultExpanded = true,
      onExpandedChange,
      mobileBreakpoint = "(max-width: 768px)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [currentExpanded, setExpanded] = useControllableState(
      controlledExpanded,
      defaultExpanded,
      onExpandedChange,
    );

    const isMobile = useMediaQuery(mobileBreakpoint);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const contextValue: SidebarContextValue = React.useMemo(
      () => ({
        expanded: currentExpanded,
        setExpanded,
        isMobile,
        mobileOpen,
        setMobileOpen,
      }),
      [currentExpanded, setExpanded, isMobile, mobileOpen],
    );

    return (
      <SidebarContext value={contextValue}>
        <div
          ref={ref}
          className={cn("flex min-h-svh w-full", className)}
          {...props}
        >
          {children}
        </div>
      </SidebarContext>
    );
  },
);

SidebarProvider.displayName = "SidebarProvider";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    const { expanded, isMobile, mobileOpen, setMobileOpen } =
      useSidebarContext();

    if (isMobile) {
      return (
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Main navigation menu
            </SheetDescription>
            <div className="flex h-full flex-col" {...props}>
              {children}
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <aside
        ref={ref}
        data-expanded={expanded ? "" : undefined}
        data-collapsed={!expanded ? "" : undefined}
        className={cn(
          "flex h-svh flex-col",
          "border-r border-(--nuka-border-base)",
          "bg-(--nuka-bg-base)",
          "transition-[width] duration-200 ease-in-out",
          "motion-reduce:transition-none",
          "overflow-hidden shrink-0",
          expanded ? "w-64" : "w-14",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-(--space-2) px-(--space-3) py-(--space-4)",
        "border-b border-(--nuka-border-base)",
        className,
      )}
      {...props}
    />
  ),
);

SidebarHeader.displayName = "SidebarHeader";

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto px-(--space-2) py-(--space-2)",
        className,
      )}
      {...props}
    />
  ),
);

SidebarContent.displayName = "SidebarContent";

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-(--space-2) px-(--space-3) py-(--space-3)",
        "border-t border-(--nuka-border-base)",
        className,
      )}
      {...props}
    />
  ),
);

SidebarFooter.displayName = "SidebarFooter";

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("py-(--space-2)", className)} {...props} />
  ),
);

SidebarGroup.displayName = "SidebarGroup";

export interface SidebarGroupLabelProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {}

const SidebarGroupLabel = React.forwardRef<HTMLElement, SidebarGroupLabelProps>(
  ({ className, ...props }, ref) => {
    const { expanded, isMobile } = useSidebarContext();
    const isVisible = expanded || isMobile;

    if (!isVisible) return null;

    return (
      <Text
        ref={ref}
        as="span"
        size="xs"
        weight="semibold"
        color="muted"
        className={cn("block px-(--space-3) py-(--space-1)", className)}
        {...props}
      />
    );
  },
);

SidebarGroupLabel.displayName = "SidebarGroupLabel";

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-col gap-(--space-0.5) list-none", className)}
      {...props}
    />
  ),
);

SidebarMenu.displayName = "SidebarMenu";

export interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn(className)} {...props} />
  ),
);

SidebarMenuItem.displayName = "SidebarMenuItem";

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  tooltip: string;
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ asChild = false, tooltip, className, children, ...props }, ref) => {
  const { expanded, isMobile } = useSidebarContext();
  const showTooltip = !expanded && !isMobile;

  const Comp = asChild ? Slot : "button";

  const button = (
    <Comp
      ref={ref}
      className={cn(
        "flex w-full items-center gap-(--space-3)",
        "rounded-(--radius-md) px-(--space-3) py-(--space-2)",
        "text-sm text-(--nuka-text-base)",
        "hover:bg-(--nuka-bg-muted)",
        "transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        !expanded && !isMobile && "justify-center px-(--space-2)",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );

  if (showTooltip) {
    return (
      <Tooltip side="right" delay={200}>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return button;
});

SidebarMenuButton.displayName = "SidebarMenuButton";

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, ...props }, ref) => {
    const { expanded, setExpanded, isMobile, setMobileOpen, mobileOpen } =
      useSidebarContext();

    function handleClick() {
      if (isMobile) {
        setMobileOpen(!mobileOpen);
      } else {
        setExpanded(!expanded);
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-label={
          isMobile
            ? mobileOpen
              ? "Close navigation"
              : "Open navigation"
            : expanded
              ? "Collapse sidebar"
              : "Expand sidebar"
        }
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center",
          "w-8 h-8 rounded-(--radius-md)",
          "text-(--nuka-text-muted)",
          "hover:bg-(--nuka-bg-muted) hover:text-(--nuka-text-base)",
          "transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-(--nuka-border-focus)",
          className,
        )}
        {...props}
      >
        <Icon size="sm">
          {isMobile ? (
            mobileOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )
          ) : expanded ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M11 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M4 12h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M13 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M20 12H4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </Icon>
      </button>
    );
  },
);

SidebarTrigger.displayName = "SidebarTrigger";

export interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, ...props }, ref) => {
    const { expanded, isMobile } = useSidebarContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 overflow-auto",
          !isMobile && "transition-[margin-left] duration-200 ease-in-out",
          !isMobile && "motion-reduce:transition-none",
          className,
        )}
        style={isMobile ? undefined : { marginLeft: expanded ? "0" : "0" }}
        {...props}
      />
    );
  },
);

SidebarInset.displayName = "SidebarInset";

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
};
