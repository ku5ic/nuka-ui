import { Icon } from "@nuka/components/Icon";
import { cn } from "@nuka/utils/cn";

const TYPEAHEAD_TIMEOUT = 300;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <Icon
      size="sm"
      color="muted"
      className={cn("transition-transform duration-150", open && "rotate-180")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </Icon>
  );
}

export { TYPEAHEAD_TIMEOUT, ChevronIcon };
