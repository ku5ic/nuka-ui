import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import {
  avatarVariants,
  type AvatarVariantProps,
} from "@nuka/components/Avatar/Avatar.variants";

export interface AvatarProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    AvatarVariantProps {
  src?: string;
  alt?: string;
  name?: string;
}

export function getInitials(name: string): string {
  const trimmed = name.trim();
  if (trimmed === "") return "";

  const words = trimmed.split(/\s+/).filter(Boolean);
  const first = words[0];
  const last = words[words.length - 1];

  if (!first) return "";

  if (words.length === 1) {
    return first.length === 1
      ? first.toUpperCase()
      : ((first[0] ?? "") + (first[1] ?? "")).toUpperCase();
  }

  return ((first[0] ?? "") + (last?.[0] ?? "")).toUpperCase();
}

function PersonIcon() {
  return (
    <Icon className="size-[1em]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M5.5 21.5c0-4.14 2.91-7.5 6.5-7.5s6.5 3.36 6.5 7.5" />
      </svg>
    </Icon>
  );
}

function resolveAriaLabel(
  src: string | undefined,
  alt: string | undefined,
  name: string | undefined,
  loaded: boolean,
  errored: boolean,
): string {
  const imageVisible = src !== undefined && loaded && !errored;

  if (imageVisible) {
    if (alt !== undefined && alt !== "") return alt;
    if (name !== undefined && name !== "") return name;
    return "Avatar";
  }

  const hasName = name !== undefined && name.trim() !== "";
  if (hasName) return name;

  return "User avatar";
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, shape, src, alt, name, ...props }, ref) => {
    const [loaded, setLoaded] = React.useState(false);
    const [errored, setErrored] = React.useState(false);
    const prevSrcRef = React.useRef(src);

    if (prevSrcRef.current !== src) {
      prevSrcRef.current = src;
      setLoaded(false);
      setErrored(false);
    }

    const initials = name !== undefined ? getInitials(name) : "";
    const showInitials = initials !== "";
    const ariaLabel = resolveAriaLabel(src, alt, name, loaded, errored);

    return (
      <span
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        className={cn(avatarVariants({ size, shape }), className)}
        {...props}
      >
        {/* Fallback layer: always rendered */}
        {showInitials ? (
          <span aria-hidden="true">{initials}</span>
        ) : (
          <PersonIcon />
        )}

        {/* Image layer: on top, hidden until loaded */}
        {src !== undefined && !errored && (
          <img
            key={src}
            src={src}
            alt=""
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
        )}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
