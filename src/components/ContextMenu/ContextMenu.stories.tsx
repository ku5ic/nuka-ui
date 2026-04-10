import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from "@nuka/components/ContextMenu";

const meta: Meta = {
  title: "Navigation/ContextMenu",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

const TriggerArea = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center w-[300px] h-[200px] border-2 border-dashed border-(--nuka-border-base) rounded-(--radius-md) select-none">
    {children}
  </div>
);

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<ContextMenu>
  <ContextMenuTrigger>
    <div className="flex items-center justify-center w-[300px] h-[200px] border-2 border-dashed border-(--nuka-border-base) rounded-(--radius-md) select-none">
      Right-click here
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Select all</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
        `.trim(),
      },
    },
  },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerArea>Right-click here</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Select all</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithLabels: Story = {
  name: "With Labels",
  parameters: {
    docs: {
      source: {
        code: `
<ContextMenu>
  <ContextMenuTrigger>
    <div className="flex items-center justify-center w-[300px] h-[200px] border-2 border-dashed border-(--nuka-border-base) rounded-(--radius-md) select-none">
      Right-click here
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Edit</ContextMenuLabel>
    <ContextMenuItem>Cut</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuLabel>Danger zone</ContextMenuLabel>
    <ContextMenuItem intent="danger">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
        `.trim(),
      },
    },
  },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerArea>Right-click here</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Edit</ContextMenuLabel>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Danger zone</ContextMenuLabel>
        <ContextMenuItem intent="danger">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxItems: Story = {
  name: "With Checkbox Items",
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [wordWrap, setWordWrap] = React.useState(true);
  const [minimap, setMinimap] = React.useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center justify-center w-[300px] h-[200px] border-2 border-dashed border-(--nuka-border-base) rounded-(--radius-md) select-none">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuCheckboxItem
          checked={wordWrap}
          onCheckedChange={setWordWrap}
        >
          Word wrap
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={minimap}
          onCheckedChange={setMinimap}
        >
          Minimap
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
        `.trim(),
      },
    },
  },
  render: function Render() {
    const [wordWrap, setWordWrap] = React.useState(true);
    const [minimap, setMinimap] = React.useState(false);

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <TriggerArea>Right-click here</TriggerArea>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuCheckboxItem
            checked={wordWrap}
            onCheckedChange={setWordWrap}
          >
            Word wrap
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={minimap}
            onCheckedChange={setMinimap}
          >
            Minimap
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const WithRadioItems: Story = {
  name: "With Radio Items",
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [theme, setTheme] = React.useState("system");

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center justify-center w-[300px] h-[200px] border-2 border-dashed border-(--nuka-border-base) rounded-(--radius-md) select-none">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Theme</ContextMenuLabel>
        <ContextMenuRadioGroup
          value={theme}
          onValueChange={setTheme}
          aria-label="Theme"
        >
          <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
          <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
          <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
        `.trim(),
      },
    },
  },
  render: function Render() {
    const [theme, setTheme] = React.useState("system");

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <TriggerArea>Right-click here</TriggerArea>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuRadioGroup
            value={theme}
            onValueChange={setTheme}
            aria-label="Theme"
          >
            <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
            <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
            <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const EditorContextMenu: Story = {
  name: "Pattern: Code Editor",
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [wordWrap, setWordWrap] = React.useState(true);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center justify-center w-[300px] h-[200px] border-2 border-dashed border-(--nuka-border-base) rounded-(--radius-md) select-none">
          Code editor area
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Go to definition</ContextMenuItem>
        <ContextMenuItem>Find references</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={wordWrap}
          onCheckedChange={setWordWrap}
        >
          Word wrap
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem intent="danger">Delete line</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
        `.trim(),
      },
    },
  },
  render: function Render() {
    const [wordWrap, setWordWrap] = React.useState(true);

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <TriggerArea>Code editor area</TriggerArea>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Go to definition</ContextMenuItem>
          <ContextMenuItem>Find references</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={wordWrap}
            onCheckedChange={setWordWrap}
          >
            Word wrap
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem intent="danger">Delete line</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};
