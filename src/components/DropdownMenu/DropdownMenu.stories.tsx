import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nuka/components/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@nuka/components/DropdownMenu";

const meta: Meta = {
  title: "Navigation/DropdownMenu",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithLabels: Story = {
  name: "With Labels",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Edit</DropdownMenuLabel>
        <DropdownMenuItem>Cut</DropdownMenuItem>
        <DropdownMenuItem>Copy</DropdownMenuItem>
        <DropdownMenuItem>Paste</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
        <DropdownMenuItem intent="danger">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const IntentDanger: Story = {
  name: "Intent: Danger",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Manage</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem intent="danger">Delete permanently</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxItems: Story = {
  name: "With Checkbox Items",
  render: function Render() {
    const [showGrid, setShowGrid] = React.useState(true);
    const [showRulers, setShowRulers] = React.useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">View</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Display</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showGrid}
            onCheckedChange={setShowGrid}
          >
            Show grid
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showRulers}
            onCheckedChange={setShowRulers}
          >
            Show rulers
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithRadioItems: Story = {
  name: "With Radio Items",
  render: function Render() {
    const [sort, setSort] = React.useState("date");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Sort by</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={sort}
            onValueChange={setSort}
            aria-label="Sort order"
          >
            <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithDisabledItems: Story = {
  name: "With Disabled Items",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Undo</DropdownMenuItem>
        <DropdownMenuItem>Redo</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Cut</DropdownMenuItem>
        <DropdownMenuItem disabled>Copy</DropdownMenuItem>
        <DropdownMenuItem>Paste</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const FileMenu: Story = {
  name: "Pattern: File Menu",
  render: function Render() {
    const [autoSave, setAutoSave] = React.useState(true);
    const [format, setFormat] = React.useState("pdf");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">File</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>New</DropdownMenuItem>
          <DropdownMenuItem>Open</DropdownMenuItem>
          <DropdownMenuItem>Save</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={autoSave}
            onCheckedChange={setAutoSave}
          >
            Auto-save
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Export as</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={format}
            onValueChange={setFormat}
            aria-label="Export format"
          >
            <DropdownMenuRadioItem value="pdf">PDF</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="png">PNG</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="svg">SVG</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
