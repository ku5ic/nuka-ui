import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Tooltip } from "@nuka/components/Tooltip/Tooltip";
import { TooltipTrigger } from "@nuka/components/Tooltip/TooltipTrigger";
import { TooltipContent } from "@nuka/components/Tooltip/TooltipContent";
import { Button } from "@nuka/components/Button";

const meta: Meta = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    delay: { control: "number" },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Save</Button>
  </TooltipTrigger>
  <TooltipContent>Save changes</TooltipContent>
</Tooltip>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Save</Button>
      </TooltipTrigger>
      <TooltipContent>Save changes</TooltipContent>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip delay={1000}>
  <TooltipTrigger asChild>
    <Button variant="secondary">Hover me (1s delay)</Button>
  </TooltipTrigger>
  <TooltipContent>This tooltip has a 1 second delay</TooltipContent>
</Tooltip>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tooltip delay={1000}>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover me (1s delay)</Button>
      </TooltipTrigger>
      <TooltipContent>This tooltip has a 1 second delay</TooltipContent>
    </Tooltip>
  ),
};

export const Sides: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div className="flex items-center gap-16 p-16">
  <Tooltip side="top" delay={0}>
    <TooltipTrigger asChild>
      <Button variant="outline">Top</Button>
    </TooltipTrigger>
    <TooltipContent>Top tooltip</TooltipContent>
  </Tooltip>

  <Tooltip side="right" delay={0}>
    <TooltipTrigger asChild>
      <Button variant="outline">Right</Button>
    </TooltipTrigger>
    <TooltipContent>Right tooltip</TooltipContent>
  </Tooltip>

  <Tooltip side="bottom" delay={0}>
    <TooltipTrigger asChild>
      <Button variant="outline">Bottom</Button>
    </TooltipTrigger>
    <TooltipContent>Bottom tooltip</TooltipContent>
  </Tooltip>

  <Tooltip side="left" delay={0}>
    <TooltipTrigger asChild>
      <Button variant="outline">Left</Button>
    </TooltipTrigger>
    <TooltipContent>Left tooltip</TooltipContent>
  </Tooltip>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-16 p-16">
      <Tooltip side="top" delay={0}>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent>Top tooltip</TooltipContent>
      </Tooltip>

      <Tooltip side="right" delay={0}>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent>Right tooltip</TooltipContent>
      </Tooltip>

      <Tooltip side="bottom" delay={0}>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent>Bottom tooltip</TooltipContent>
      </Tooltip>

      <Tooltip side="left" delay={0}>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent>Left tooltip</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const OnIconButton: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip delay={0}>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="sm" aria-label="Delete item">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    </Button>
  </TooltipTrigger>
  <TooltipContent>Delete item</TooltipContent>
</Tooltip>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tooltip delay={0}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="Delete item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Delete item</TooltipContent>
    </Tooltip>
  ),
};

export const ControlledOpen: Story = {
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <label className="flex items-center gap-2 text-sm text-(--nuka-text-base)">
        <input
          type="checkbox"
          checked={open}
          onChange={(e) => setOpen(e.target.checked)}
        />
        Tooltip open
      </label>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button variant="outline">Controlled</Button>
        </TooltipTrigger>
        <TooltipContent>Controlled tooltip</TooltipContent>
      </Tooltip>
    </div>
  );
}
        `.trim(),
      },
    },
  },
  render: function ControlledOpenStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-(--nuka-text-base)">
          <input
            type="checkbox"
            checked={open}
            onChange={(e) => setOpen(e.target.checked)}
          />
          Tooltip open
        </label>
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Button variant="outline">Controlled</Button>
          </TooltipTrigger>
          <TooltipContent>Controlled tooltip</TooltipContent>
        </Tooltip>
      </div>
    );
  },
};

export const TableRowActions: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div className="flex items-center gap-1">
  <Tooltip delay={300}>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="sm" aria-label="Edit">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
      </Button>
    </TooltipTrigger>
    <TooltipContent>Edit</TooltipContent>
  </Tooltip>

  <Tooltip delay={300}>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="sm" aria-label="Copy">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M16 4h2a2 2 0 0 1 2 2v4" />
        </svg>
      </Button>
    </TooltipTrigger>
    <TooltipContent>Copy</TooltipContent>
  </Tooltip>

  <Tooltip delay={300}>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="sm" aria-label="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </Button>
    </TooltipTrigger>
    <TooltipContent>Delete</TooltipContent>
  </Tooltip>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-1">
      {(
        [
          {
            label: "Edit",
            icon: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
          },
          {
            label: "Copy",
            icon: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M16 4h2a2 2 0 0 1 2 2v4",
          },
          {
            label: "Delete",
            icon: "M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
          },
        ] as const
      ).map((action) => (
        <Tooltip key={action.label} delay={300}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" aria-label={action.label}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={action.icon} />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{action.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const FormFieldHelper: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div className="flex items-center gap-2">
  <span className="text-sm font-medium text-(--nuka-text-base)">
    Email address
  </span>
  <Tooltip delay={0}>
    <TooltipTrigger asChild>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full text-(--nuka-text-muted) hover:text-(--nuka-text-base)"
        aria-label="More info"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>
    </TooltipTrigger>
    <TooltipContent>
      We'll never share your email with anyone else.
    </TooltipContent>
  </Tooltip>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-(--nuka-text-base)">
        Email address
      </span>
      <Tooltip delay={0}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full text-(--nuka-text-muted) hover:text-(--nuka-text-base)"
            aria-label="More info"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          We&apos;ll never share your email with anyone else.
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};
