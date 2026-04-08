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
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 300,
      height: 200,
      border: "2px dashed var(--nuka-border-base)",
      borderRadius: "var(--radius-md)",
      userSelect: "none",
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
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
