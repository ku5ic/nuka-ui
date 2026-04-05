import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@nuka/components/EmptyState";
import { Button } from "@nuka/components/Button";

const meta = {
  title: "Display/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story-only placeholder — inline SVG illustrations for demonstration, not nuka-ui components
const PlaceholderIllustration = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="10" y="30" width="100" height="70" rx="8" stroke="currentColor" strokeWidth="2" />
    <circle cx="60" cy="20" r="12" stroke="currentColor" strokeWidth="2" />
    <line x1="40" y1="55" x2="80" y2="55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="45" y1="70" x2="75" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="85" x2="70" y2="85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const InboxIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

export const WithIllustration: Story = {
  name: "With Illustration",
  args: {
    heading: "No projects yet",
    description: "Create your first project to get started.",
    illustration: <PlaceholderIllustration />,
  },
};

export const WithIcon: Story = {
  name: "With Icon",
  args: {
    heading: "No results",
    description: "Try a different search term.",
    icon: <SearchIcon />,
  },
};

export const HeadingOnly: Story = {
  name: "Heading Only",
  args: {
    heading: "Nothing here",
  },
};

export const WithDescription: Story = {
  name: "With Description",
  args: {
    heading: "No notifications",
    description: "You're all caught up! Check back later for new updates.",
  },
};

export const WithAction: Story = {
  name: "With Action",
  args: {
    heading: "No items found",
    description: "Start by adding your first item.",
    action: <Button variant="primary" size="sm">Add item</Button>,
  },
};

export const Full: Story = {
  name: "Full (All Slots)",
  args: {
    heading: "No projects yet",
    description: "Projects help you organize your work. Create one to get started.",
    illustration: <PlaceholderIllustration />,
    icon: <SearchIcon />,
    action: <Button variant="primary" size="sm">Create project</Button>,
  },
};

export const NoSearchResults: Story = {
  name: "Pattern: No Search Results",
  args: { heading: "No results found" },
  render: () => (
    <EmptyState
      heading="No results found"
      description='We couldn&apos;t find anything matching your search. Try adjusting your filters.'
      icon={<SearchIcon />}
      action={<Button variant="outline" size="sm">Clear filters</Button>}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `
<EmptyState
  heading="No results found"
  description="We couldn't find anything matching your search."
  icon={<SearchIcon />}
  action={<Button variant="outline" size="sm">Clear filters</Button>}
/>
        `.trim(),
      },
    },
  },
};

export const EmptyInbox: Story = {
  name: "Pattern: Empty Inbox",
  args: { heading: "Inbox zero!" },
  render: () => (
    <EmptyState
      heading="Inbox zero!"
      description="You've read all your messages. Enjoy the peace and quiet."
      illustration={<InboxIcon />}
    />
  ),
};

export const EmptyTable: Story = {
  name: "Pattern: Empty Table",
  args: { heading: "No records" },
  render: () => (
    /* TODO: replace table wrapper with <Table> once implemented */
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "0.75rem 1rem",
          borderBottom: "1px solid #e5e7eb",
          fontSize: 13,
          fontWeight: 600,
          color: "#6b7280",
        }}
      >
        <span>Name</span>
        <span>Status</span>
        <span>Created</span>
      </div>
      <EmptyState
        heading="No records"
        description="Add a record to see it here."
        action={<Button variant="primary" size="sm">Add record</Button>}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Table>
  <TableHeader>...</TableHeader>
  <EmptyState
    heading="No records"
    description="Add a record to see it here."
    action={<Button variant="primary" size="sm">Add record</Button>}
  />
</Table>
        `.trim(),
      },
    },
  },
};
