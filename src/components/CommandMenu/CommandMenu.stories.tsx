import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nuka/components/Button";
import { Icon } from "@nuka/components/Icon";
import {
  CommandMenu,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuItem,
  CommandMenuShortcut,
} from "@nuka/components/CommandMenu";

const meta: Meta = {
  title: "Composites/CommandMenu",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

const FileIcon = () => (
  <Icon size="sm" color="muted">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  </Icon>
);

const SettingsIcon = () => (
  <Icon size="sm" color="muted">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  </Icon>
);

function BasicDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
      <CommandMenu open={open} onOpenChange={setOpen}>
        <CommandMenuInput placeholder="Type a command..." />
        <CommandMenuList>
          <CommandMenuEmpty>No results found.</CommandMenuEmpty>
          <CommandMenuItem value="new-file">New file</CommandMenuItem>
          <CommandMenuItem value="open-file">Open file</CommandMenuItem>
          <CommandMenuItem value="save-file">Save file</CommandMenuItem>
        </CommandMenuList>
      </CommandMenu>
    </>
  );
}

export const BasicCommandMenu: Story = {
  name: "Basic",
  parameters: {
    docs: {
      source: {
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Command Menu</Button>
<CommandMenu open={open} onOpenChange={setOpen}>
  <CommandMenuInput placeholder="Type a command..." />
  <CommandMenuList>
    <CommandMenuEmpty>No results found.</CommandMenuEmpty>
    <CommandMenuItem value="new-file">New file</CommandMenuItem>
    <CommandMenuItem value="open-file">Open file</CommandMenuItem>
  </CommandMenuList>
</CommandMenu>`,
      },
    },
  },
  render: () => <BasicDemo />,
};

function GroupsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
      <CommandMenu open={open} onOpenChange={setOpen}>
        <CommandMenuInput placeholder="Search actions..." />
        <CommandMenuList>
          <CommandMenuEmpty>No results found.</CommandMenuEmpty>
          <CommandMenuGroup heading="File">
            <CommandMenuItem value="new-file">
              <FileIcon />
              New file
            </CommandMenuItem>
            <CommandMenuItem value="open-file">
              <FileIcon />
              Open file
            </CommandMenuItem>
          </CommandMenuGroup>
          <CommandMenuGroup heading="Settings">
            <CommandMenuItem value="preferences">
              <SettingsIcon />
              Preferences
            </CommandMenuItem>
            <CommandMenuItem value="theme">
              <SettingsIcon />
              Change theme
            </CommandMenuItem>
          </CommandMenuGroup>
        </CommandMenuList>
      </CommandMenu>
    </>
  );
}

export const WithGroups: Story = {
  name: "With Groups",
  parameters: {
    docs: {
      source: {
        code: `<CommandMenu open={open} onOpenChange={setOpen}>
  <CommandMenuInput placeholder="Search actions..." />
  <CommandMenuList>
    <CommandMenuEmpty>No results found.</CommandMenuEmpty>
    <CommandMenuGroup heading="File">
      <CommandMenuItem value="new-file"><FileIcon /> New file</CommandMenuItem>
      <CommandMenuItem value="open-file"><FileIcon /> Open file</CommandMenuItem>
    </CommandMenuGroup>
    <CommandMenuGroup heading="Settings">
      <CommandMenuItem value="preferences"><SettingsIcon /> Preferences</CommandMenuItem>
    </CommandMenuGroup>
  </CommandMenuList>
</CommandMenu>`,
      },
    },
  },
  render: () => <GroupsDemo />,
};

function ShortcutsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
      <CommandMenu open={open} onOpenChange={setOpen}>
        <CommandMenuInput placeholder="Search..." />
        <CommandMenuList>
          <CommandMenuEmpty>No results found.</CommandMenuEmpty>
          <CommandMenuGroup heading="Actions">
            <CommandMenuItem value="new-file">
              New file
              <CommandMenuShortcut>Cmd+N</CommandMenuShortcut>
            </CommandMenuItem>
            <CommandMenuItem value="open-file">
              Open file
              <CommandMenuShortcut>Cmd+O</CommandMenuShortcut>
            </CommandMenuItem>
            <CommandMenuItem value="save">
              Save
              <CommandMenuShortcut>Cmd+S</CommandMenuShortcut>
            </CommandMenuItem>
            <CommandMenuItem value="settings">
              Settings
              <CommandMenuShortcut>Cmd+,</CommandMenuShortcut>
            </CommandMenuItem>
          </CommandMenuGroup>
        </CommandMenuList>
      </CommandMenu>
    </>
  );
}

export const WithShortcuts: Story = {
  name: "With Shortcuts",
  parameters: {
    docs: {
      source: {
        code: `<CommandMenuItem value="new-file">
  New file
  <CommandMenuShortcut>Cmd+N</CommandMenuShortcut>
</CommandMenuItem>`,
      },
    },
  },
  render: () => <ShortcutsDemo />,
};

function DisabledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
      <CommandMenu open={open} onOpenChange={setOpen}>
        <CommandMenuInput placeholder="Search..." />
        <CommandMenuList>
          <CommandMenuEmpty>No results found.</CommandMenuEmpty>
          <CommandMenuGroup heading="Actions">
            <CommandMenuItem value="new-file">New file</CommandMenuItem>
            <CommandMenuItem value="save" disabled>
              Save (disabled)
            </CommandMenuItem>
            <CommandMenuItem value="delete" disabled>
              Delete (disabled)
            </CommandMenuItem>
            <CommandMenuItem value="open-file">Open file</CommandMenuItem>
          </CommandMenuGroup>
        </CommandMenuList>
      </CommandMenu>
    </>
  );
}

export const WithDisabledItems: Story = {
  name: "With Disabled Items",
  parameters: {
    docs: {
      source: {
        code: `<CommandMenuItem value="save" disabled>
  Save (disabled)
</CommandMenuItem>`,
      },
    },
  },
  render: () => <DisabledDemo />,
};

function FilterDemo() {
  const [open, setOpen] = useState(false);

  const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
      <CommandMenu open={open} onOpenChange={setOpen}>
        <CommandMenuInput placeholder="Search fruits..." />
        <CommandMenuList>
          <CommandMenuEmpty>No fruits match your search.</CommandMenuEmpty>
          <CommandMenuGroup heading="Fruits">
            {items.map((item) => (
              <CommandMenuItem key={item} value={item.toLowerCase()}>
                {item}
              </CommandMenuItem>
            ))}
          </CommandMenuGroup>
        </CommandMenuList>
      </CommandMenu>
    </>
  );
}

export const FilterDemoStory: Story = {
  name: "Filter Demo",
  parameters: {
    docs: {
      source: {
        code: `<CommandMenu open={open} onOpenChange={setOpen}>
  <CommandMenuInput placeholder="Search fruits..." />
  <CommandMenuList>
    <CommandMenuEmpty>No fruits match your search.</CommandMenuEmpty>
    <CommandMenuGroup heading="Fruits">
      {fruits.map((fruit) => (
        <CommandMenuItem key={fruit} value={fruit.toLowerCase()}>
          {fruit}
        </CommandMenuItem>
      ))}
    </CommandMenuGroup>
  </CommandMenuList>
</CommandMenu>`,
      },
    },
  },
  render: () => <FilterDemo />,
};
