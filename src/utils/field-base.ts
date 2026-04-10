// Shared base classes for field-type form controls (Input, Textarea).
// Each consumer spreads this into its own cva() base array and appends
// component-specific classes (e.g. read-only styles, resize behavior).
const fieldBaseClasses = [
  "w-full",
  "rounded-(--radius-md)",
  "border",
  "bg-(--nuka-input-bg)",
  "text-(--nuka-text-base)",
  "placeholder:text-(--nuka-text-muted)",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--nuka-border-focus)",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "transition-colors duration-150",
];

export { fieldBaseClasses };
