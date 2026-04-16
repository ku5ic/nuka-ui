import * as React from "react";
import { clsx } from "clsx";

/**
 * Composes multiple refs into a single ref callback.
 * Handles function refs, ref objects, null, and undefined.
 */
function composeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node: T | null) => {
    for (const ref of refs) {
      if (ref == null) continue;
      if (typeof ref === "function") {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };
}

function isEventHandlerProp(key: string): boolean {
  return (
    key.length > 2 && key.startsWith("on") && key[2] === key[2]?.toUpperCase()
  );
}

function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...slotProps };

  for (const key of Object.keys(childProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];

    if (key === "className") {
      merged[key] = clsx(slotValue as string, childValue as string);
    } else if (key === "style") {
      merged[key] = {
        ...(slotValue as React.CSSProperties | undefined),
        ...(childValue as React.CSSProperties | undefined),
      };
    } else if (isEventHandlerProp(key)) {
      if (slotValue != null && childValue != null) {
        const slotHandler = slotValue as (...args: unknown[]) => void;
        const childHandler = childValue as (...args: unknown[]) => void;
        const composed = (...args: unknown[]) => {
          slotHandler(...args);
          childHandler(...args);
        };
        merged[key] = composed;
      } else {
        merged[key] = childValue ?? slotValue;
      }
    } else {
      merged[key] = childValue;
    }
  }

  return merged;
}

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
}

function Slot({ ref: forwardedRef, children, ...slotProps }: SlotProps) {
  if (!React.isValidElement(children)) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "Slot requires a single valid React element as its child. " +
          `Received: ${children === null ? "null" : typeof children}`,
      );
    }
    return null;
  }

  const childElement = children as React.ReactElement<
    Record<string, unknown> & { ref?: React.Ref<HTMLElement> }
  >;

  const childRef = childElement.props.ref;
  const composedRef = composeRefs(forwardedRef, childRef);

  const mergedProps = mergeProps(
    slotProps as Record<string, unknown>,
    childElement.props as Record<string, unknown>,
  );

  const cloneProps: Record<string, unknown> & React.Attributes = {
    ...mergedProps,
    ref: composedRef,
    ...(childElement.key != null ? { key: childElement.key } : {}),
  };

  return React.createElement(
    childElement.type as React.ElementType,
    cloneProps,
  );
}

Slot.displayName = "Slot";

export { Slot, composeRefs };
