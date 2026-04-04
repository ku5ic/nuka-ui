import * as React from "react";
import { cva, type VariantProps } from "@vault/utils/variants";
import { cn } from "@vault/utils/cn";

const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "shrink-0 overflow-hidden",
    "border border-[var(--vault-border-base)]",
    "bg-[var(--vault-bg-muted)]",
    "text-[var(--vault-text-muted)]",
    "font-medium",
  ],
  {
    variants: {
      size: {
        xs: "size-6 text-[length:var(--font-size-xs)]",
        sm: "size-8 text-[length:var(--font-size-xs)]",
        md: "size-10 text-[length:var(--font-size-sm)]",
        lg: "size-12 text-[length:var(--font-size-md)]",
        xl: "size-16 text-[length:var(--font-size-lg)]",
      },
      shape: {
        circle: "rounded-[var(--radius-full)]",
        square: "rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
);

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
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
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "1em", height: "1em" }}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5.5 21.5c0-4.14 2.91-7.5 6.5-7.5s6.5 3.36 6.5 7.5" />
    </svg>
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
        {/* Fallback layer — always rendered */}
        {showInitials ? (
          <span aria-hidden="true">{initials}</span>
        ) : (
          <PersonIcon />
        )}

        {/* Image layer — on top, hidden until loaded */}
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
