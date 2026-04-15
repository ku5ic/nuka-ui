"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { useSidebarContext } from "@nuka/components/Sidebar/Sidebar.context";

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path
      d="M18 6L6 18M6 6l12 12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path
      d="M4 6h16M4 12h16M4 18h16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CollapseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M11 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 12h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 12H4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

    const IconSvg = isMobile
      ? mobileOpen
        ? CloseIcon
        : MenuIcon
      : expanded
        ? CollapseIcon
        : ExpandIcon;

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
          <IconSvg />
        </Icon>
      </button>
    );
  },
);

SidebarTrigger.displayName = "SidebarTrigger";

export { SidebarTrigger };
