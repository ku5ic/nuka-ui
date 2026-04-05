import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Popover } from "@nuka/components/Popover/Popover";
import { PopoverTrigger } from "@nuka/components/Popover/PopoverTrigger";
import { PopoverContent } from "@nuka/components/Popover/PopoverContent";
import { Button } from "@nuka/components/Button";

const meta: Meta = {
  title: "Feedback/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Options</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm text-[var(--nuka-text-base)]">
          This is a basic popover with some content inside.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Edit name</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-[var(--nuka-text-base)]">
            Display name
            <input
              type="text"
              className="mt-1 block w-full rounded-[var(--radius-md)] border border-[var(--nuka-input-border)] bg-[var(--nuka-input-bg)] px-[var(--space-3)] py-[var(--space-2)] text-sm text-[var(--nuka-text-base)] focus:border-[var(--nuka-border-focus)] focus:outline-none"
              defaultValue="Jane Doe"
            />
          </label>
          <Button size="sm">Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const ControlledOpen: Story = {
  render: function ControlledOpenStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-[var(--nuka-text-base)]">
          <input
            type="checkbox"
            checked={open}
            onChange={(e) => setOpen(e.target.checked)}
          />
          Popover open
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Controlled</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm text-[var(--nuka-text-base)]">
              Controlled popover content
            </p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

export const Placement: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-16">
      <Popover placement="bottom-start">
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom Start</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm text-[var(--nuka-text-base)]">
            Placed at bottom-start
          </p>
        </PopoverContent>
      </Popover>

      <Popover placement="top-start">
        <PopoverTrigger asChild>
          <Button variant="outline">Top Start</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm text-[var(--nuka-text-base)]">
            Placed at top-start
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const FilterPanel: Story = {
  render: function FilterPanelStory() {
    const [filters, setFilters] = React.useState({
      active: true,
      completed: false,
      archived: false,
    });

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
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
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent aria-labelledby="filter-heading">
          <div className="flex flex-col gap-3">
            <h3
              id="filter-heading"
              className="text-sm font-semibold text-[var(--nuka-text-base)]"
            >
              Filter by status
            </h3>
            {(["active", "completed", "archived"] as const).map((key) => (
              <label
                key={key}
                className="flex items-center gap-2 text-sm text-[var(--nuka-text-base)]"
              >
                <input
                  type="checkbox"
                  checked={filters[key]}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, [key]: e.target.checked }))
                  }
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const UserMenu: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--nuka-accent-bg)] text-xs font-medium text-[var(--nuka-text-inverse)]"
          aria-label="User menu"
        >
          JD
        </button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby="user-menu-heading">
        <div className="flex flex-col gap-2">
          <h3
            id="user-menu-heading"
            className="text-sm font-semibold text-[var(--nuka-text-base)]"
          >
            Jane Doe
          </h3>
          <p className="text-xs text-[var(--nuka-text-muted)]">
            jane@example.com
          </p>
          <hr className="border-[var(--nuka-border-base)]" />
          <a
            href="#profile"
            className="block rounded-[var(--radius-sm)] px-[var(--space-2)] py-[var(--space-1)] text-sm text-[var(--nuka-text-base)] hover:bg-[var(--nuka-bg-muted)]"
          >
            Profile
          </a>
          <a
            href="#settings"
            className="block rounded-[var(--radius-sm)] px-[var(--space-2)] py-[var(--space-1)] text-sm text-[var(--nuka-text-base)] hover:bg-[var(--nuka-bg-muted)]"
          >
            Settings
          </a>
          <a
            href="#signout"
            className="block rounded-[var(--radius-sm)] px-[var(--space-2)] py-[var(--space-1)] text-sm text-[var(--nuka-danger-text)] hover:bg-[var(--nuka-danger-bg)]"
          >
            Sign out
          </a>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
