import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
} from "@nuka/components/Menubar";

const meta: Meta = {
  title: "Navigation/Menubar",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Open</MenubarItem>
          <MenubarItem>Save</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Exit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="edit">
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="view">
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom in</MenubarItem>
          <MenubarItem>Zoom out</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Reset zoom</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithCheckboxItems: Story = {
  name: "With Checkbox Items",
  render: function Render() {
    const [showToolbar, setShowToolbar] = React.useState(true);
    const [showStatusBar, setShowStatusBar] = React.useState(true);
    const [showMinimap, setShowMinimap] = React.useState(false);

    return (
      <Menubar>
        <MenubarMenu value="view">
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
              Toolbar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
              Status bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
              Minimap
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const WithRadioItems: Story = {
  name: "With Radio Items",
  render: function Render() {
    const [zoom, setZoom] = React.useState("100");

    return (
      <Menubar>
        <MenubarMenu value="view">
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={zoom} onValueChange={setZoom} aria-label="Zoom level">
              <MenubarRadioItem value="75">75%</MenubarRadioItem>
              <MenubarRadioItem value="100">100%</MenubarRadioItem>
              <MenubarRadioItem value="125">125%</MenubarRadioItem>
              <MenubarRadioItem value="150">150%</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const ApplicationMenubar: Story = {
  name: "Pattern: Application Menubar",
  render: function Render() {
    const [wordWrap, setWordWrap] = React.useState(true);
    const [theme, setTheme] = React.useState("dark");

    return (
      <Menubar>
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New file</MenubarItem>
            <MenubarItem>New window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Open file</MenubarItem>
            <MenubarItem>Open folder</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Save</MenubarItem>
            <MenubarItem>Save as</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu value="edit">
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Find</MenubarItem>
            <MenubarItem>Replace</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu value="view">
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={wordWrap} onCheckedChange={setWordWrap}>
              Word wrap
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value={theme} onValueChange={setTheme} aria-label="Theme">
              <MenubarRadioItem value="light">Light</MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
              <MenubarRadioItem value="system">System</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};
