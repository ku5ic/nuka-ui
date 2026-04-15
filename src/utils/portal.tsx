"use client";
import * as ReactDOM from "react-dom";
import type { ReactNode } from "react";

interface PortalProps {
  children: ReactNode;
}

function Portal({ children }: PortalProps) {
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(children, document.body);
}

Portal.displayName = "Portal";

export { Portal };
export type { PortalProps };
