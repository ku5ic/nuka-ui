/**
 * Contract test for ADR-054 data-slot attribute.
 *
 * Every compound component in nuka-ui is enumerated explicitly below. Every
 * row of the naming table lives as one assertion in this file. When a new
 * compound component lands, it must register here. Missing registration is
 * detectable by a reviewer.
 *
 * Naming table source: docs/DECISIONS.md ADR-054.
 */
import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
} from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import type * as FloatingUI from "@floating-ui/react";

vi.mock("@floating-ui/react", async () => {
  const actual = await vi.importActual<typeof FloatingUI>("@floating-ui/react");
  return {
    ...actual,
    autoUpdate: vi.fn(() => () => undefined),
  };
});

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@nuka/components/Dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@nuka/components/Sheet";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@nuka/components/Tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nuka/components/Popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@nuka/components/DropdownMenu";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@nuka/components/ContextMenu";
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from "@nuka/components/Select";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxListbox,
  ComboboxOption,
  ComboboxGroup,
  ComboboxEmpty,
} from "@nuka/components/Combobox";
import {
  CommandMenu,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuItem,
  CommandMenuGroup,
  CommandMenuEmpty,
  CommandMenuShortcut,
} from "@nuka/components/CommandMenu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "@nuka/components/Card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@nuka/components/Accordion";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@nuka/components/Collapsible";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@nuka/components/Tabs";
import { Timeline, TimelineItem } from "@nuka/components/Timeline";
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperContent,
} from "@nuka/components/Stepper";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@nuka/components/Breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@nuka/components/Pagination";
import {
  Nav,
  NavList,
  NavItem,
  NavLink,
  NavTrigger,
  NavSubmenu,
} from "@nuka/components/Nav";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@nuka/components/NavigationMenu";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@nuka/components/Table";
import { RadioGroup, Radio } from "@nuka/components/RadioGroup";
import { Checkbox } from "@nuka/components/Checkbox";
import { Switch } from "@nuka/components/Switch";
import { Slider } from "@nuka/components/Slider";
import { FileInput } from "@nuka/components/FileInput";
import { NumberInput } from "@nuka/components/NumberInput";
import { FormField } from "@nuka/components/FormField";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@nuka/components/Sidebar";
import {
  AppShell,
  AppShellHeader,
  AppShellBody,
  AppShellMain,
} from "@nuka/components/AppShell";
import { ScrollArea } from "@nuka/components/ScrollArea";
import { EmptyState } from "@nuka/components/EmptyState";
import { Callout } from "@nuka/components/Callout";
import { SplitLayout } from "@nuka/components/SplitLayout";
import {
  DatePicker,
  DatePickerInput,
  DatePickerCalendar,
} from "@nuka/components/DatePicker";
import { toast, toastStore } from "@nuka/components/Toast/toastStore";
import { Toaster } from "@nuka/components/Toast/Toaster";

const scrollIntoViewMock = vi.fn();

beforeAll(() => {
  Element.prototype.scrollIntoView = scrollIntoViewMock;
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterAll(() => {
  delete (Element.prototype as unknown as Record<string, unknown>)
    .scrollIntoView;
});

beforeEach(() => {
  toastStore.__reset();
});

function assertSlot(root: ParentNode, slot: string) {
  const el = root.querySelector(`[data-slot="${slot}"]`);
  expect(el, `expected data-slot="${slot}"`).not.toBeNull();
}

function assertSlotCount(root: ParentNode, slot: string, min: number) {
  const n = root.querySelectorAll(`[data-slot="${slot}"]`).length;
  expect(
    n,
    `expected at least ${String(min)} × data-slot="${slot}"`,
  ).toBeGreaterThanOrEqual(min);
}

describe("data-slot contract (ADR-054)", () => {
  describe("Dialog", () => {
    it("emits trigger, overlay, content, title, description, close", async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Desc</DialogDescription>
            <DialogClose asChild>
              <button type="button">Cancel</button>
            </DialogClose>
          </DialogContent>
        </Dialog>,
      );

      assertSlot(document.body, "trigger");
      await user.click(screen.getByRole("button", { name: "Open" }));
      assertSlot(document.body, "overlay");
      assertSlot(document.body, "content");
      assertSlot(document.body, "title");
      assertSlot(document.body, "description");
      assertSlot(document.body, "close");
    });
  });

  describe("Sheet", () => {
    it("emits trigger, overlay, content, title, description, close", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Desc</SheetDescription>
            <SheetClose asChild>
              <button type="button">Cancel</button>
            </SheetClose>
          </SheetContent>
        </Sheet>,
      );

      assertSlot(document.body, "trigger");
      await user.click(screen.getByRole("button", { name: "Open" }));
      assertSlot(document.body, "overlay");
      assertSlot(document.body, "content");
      assertSlot(document.body, "title");
      assertSlot(document.body, "description");
      assertSlot(document.body, "close");
    });
  });

  describe("Tooltip", () => {
    it("emits trigger and content", async () => {
      const user = userEvent.setup();
      render(
        <Tooltip delay={0}>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>Text</TooltipContent>
        </Tooltip>,
      );

      assertSlot(document.body, "trigger");
      await user.hover(screen.getByRole("button", { name: "Hover" }));
      assertSlot(document.body, "content");
    });
  });

  describe("Popover", () => {
    it("emits trigger and content", async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent aria-label="Panel">Content</PopoverContent>
        </Popover>,
      );

      assertSlot(document.body, "trigger");
      await user.click(screen.getByRole("button", { name: "Open" }));
      assertSlot(document.body, "content");
    });
  });

  describe("DropdownMenu", () => {
    it("emits trigger, content, item, checkbox-item, radio-item, item-indicator, group, label, separator", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Section</DropdownMenuLabel>
            <DropdownMenuItem>Item</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Check</DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup value="a">
              <DropdownMenuRadioItem value="a">A</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      assertSlot(document.body, "trigger");
      await user.click(screen.getByRole("button", { name: "Open" }));
      assertSlot(document.body, "content");
      assertSlot(document.body, "item");
      assertSlot(document.body, "checkbox-item");
      assertSlot(document.body, "radio-item");
      assertSlotCount(document.body, "item-indicator", 2);
      assertSlot(document.body, "group");
      assertSlot(document.body, "label");
      assertSlot(document.body, "separator");
    });
  });

  describe("ContextMenu", () => {
    it("emits trigger, content, item, checkbox-item, radio-item, item-indicator, group, label, separator", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Section</ContextMenuLabel>
            <ContextMenuItem>Item</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked>Check</ContextMenuCheckboxItem>
            <ContextMenuRadioGroup value="a">
              <ContextMenuRadioItem value="a">A</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>,
      );

      assertSlot(document.body, "trigger");
      fireEvent.contextMenu(screen.getByText("Right-click"), {
        clientX: 10,
        clientY: 10,
      });
      assertSlot(document.body, "content");
      assertSlot(document.body, "item");
      assertSlot(document.body, "checkbox-item");
      assertSlot(document.body, "radio-item");
      assertSlotCount(document.body, "item-indicator", 2);
      assertSlot(document.body, "group");
      assertSlot(document.body, "label");
      assertSlot(document.body, "separator");
    });
  });

  describe("Menubar", () => {
    it("emits root, trigger, content, item, checkbox-item, radio-item, item-indicator, group, separator", async () => {
      const user = userEvent.setup();
      render(
        <Menubar>
          <MenubarMenu value="file">
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
              <MenubarSeparator />
              <MenubarCheckboxItem checked>Show</MenubarCheckboxItem>
              <MenubarRadioGroup value="a">
                <MenubarRadioItem value="a">A</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>,
      );

      assertSlot(document.body, "root");
      assertSlot(document.body, "trigger");
      await user.click(screen.getByRole("menuitem", { name: "File" }));
      assertSlot(document.body, "content");
      assertSlot(document.body, "item");
      assertSlot(document.body, "checkbox-item");
      assertSlot(document.body, "radio-item");
      assertSlotCount(document.body, "item-indicator", 2);
      assertSlot(document.body, "group");
      assertSlot(document.body, "separator");
    });
  });

  describe("Select", () => {
    it("emits root, trigger, content, item, separator", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Select>
          <SelectTrigger placeholder="Pick" />
          <SelectContent>
            <SelectItem value="a">A</SelectItem>
            <SelectSeparator />
            <SelectItem value="b">B</SelectItem>
          </SelectContent>
        </Select>,
      );

      assertSlot(container, "root");
      assertSlot(container, "trigger");
      await user.click(screen.getByRole("combobox"));
      assertSlot(container, "content");
      assertSlotCount(container, "item", 2);
      assertSlot(container, "separator");
    });
  });

  describe("Combobox", () => {
    it("emits trigger, input-wrapper, input, content, listbox, item, group, empty", async () => {
      const user = userEvent.setup();
      render(
        <Combobox>
          <ComboboxTrigger placeholder="Pick" />
          <ComboboxContent>
            <ComboboxInput />
            <ComboboxListbox>
              <ComboboxEmpty>None</ComboboxEmpty>
              <ComboboxGroup label="Group">
                <ComboboxOption value="a">A</ComboboxOption>
              </ComboboxGroup>
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>,
      );

      assertSlot(document.body, "trigger");
      await user.click(screen.getByRole("button"));
      assertSlot(document.body, "content");
      assertSlot(document.body, "input-wrapper");
      assertSlot(document.body, "input");
      assertSlot(document.body, "listbox");
      assertSlot(document.body, "item");
      assertSlot(document.body, "group");
    });

    it("emits empty when listbox has no matches", async () => {
      const user = userEvent.setup();
      render(
        <Combobox>
          <ComboboxTrigger placeholder="Pick" />
          <ComboboxContent>
            <ComboboxInput />
            <ComboboxListbox>
              <ComboboxEmpty>None</ComboboxEmpty>
              <ComboboxOption value="a">A</ComboboxOption>
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>,
      );

      await user.click(screen.getByRole("button"));
      await user.type(screen.getByRole("combobox"), "zzz");
      assertSlot(document.body, "empty");
    });
  });

  describe("CommandMenu", () => {
    it("emits overlay, dialog, input-wrapper, input, list, item, group, group-heading, shortcut", async () => {
      render(
        <CommandMenu open>
          <CommandMenuInput placeholder="Search" />
          <CommandMenuList>
            <CommandMenuEmpty>None</CommandMenuEmpty>
            <CommandMenuGroup heading="Actions">
              <CommandMenuItem value="a">
                Action
                <CommandMenuShortcut>Cmd+A</CommandMenuShortcut>
              </CommandMenuItem>
            </CommandMenuGroup>
          </CommandMenuList>
        </CommandMenu>,
      );

      await act(async () => {
        await new Promise((r) => {
          requestAnimationFrame(r);
        });
      });
      assertSlot(document.body, "overlay");
      assertSlot(document.body, "dialog");
      assertSlot(document.body, "input-wrapper");
      assertSlot(document.body, "input");
      assertSlot(document.body, "list");
      assertSlot(document.body, "item");
      assertSlot(document.body, "group");
      assertSlot(document.body, "group-heading");
      assertSlot(document.body, "shortcut");
    });

    it("emits empty when no items match", async () => {
      const user = userEvent.setup();
      render(
        <CommandMenu open>
          <CommandMenuInput />
          <CommandMenuList>
            <CommandMenuEmpty>None</CommandMenuEmpty>
            <CommandMenuItem value="a">Action</CommandMenuItem>
          </CommandMenuList>
        </CommandMenu>,
      );
      await act(async () => {
        await new Promise((r) => {
          requestAnimationFrame(r);
        });
      });
      await user.type(screen.getByRole("combobox"), "zzz");
      assertSlot(document.body, "empty");
    });
  });

  describe("Card", () => {
    it("emits root, header, title, description, body, footer", () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>T</CardTitle>
            <CardDescription>D</CardDescription>
          </CardHeader>
          <CardBody>B</CardBody>
          <CardFooter>
            <button type="button">Act</button>
          </CardFooter>
        </Card>,
      );

      assertSlot(container, "root");
      assertSlot(container, "header");
      assertSlot(container, "title");
      assertSlot(container, "description");
      assertSlot(container, "body");
      assertSlot(container, "footer");
    });
  });

  describe("Accordion", () => {
    it("emits root, item, trigger-heading, trigger, content, content-inner", () => {
      const { container } = render(
        <Accordion type="single" defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>Heading</AccordionTrigger>
            <AccordionContent>Body</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      assertSlot(container, "root");
      assertSlot(container, "item");
      assertSlot(container, "trigger-heading");
      assertSlot(container, "trigger");
      assertSlot(container, "content");
      assertSlot(container, "content-inner");
    });

    it("trigger coexists with data-accordion-trigger", () => {
      const { container } = render(
        <Accordion type="single" defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>Heading</AccordionTrigger>
            <AccordionContent>Body</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      const trigger = container.querySelector('[data-slot="trigger"]');
      expect(trigger?.hasAttribute("data-accordion-trigger")).toBe(true);
    });
  });

  describe("Collapsible", () => {
    it("emits root, trigger, content, content-inner", () => {
      const { container } = render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Body</CollapsibleContent>
        </Collapsible>,
      );

      assertSlot(container, "root");
      assertSlot(container, "trigger");
      assertSlot(container, "content");
      assertSlot(container, "content-inner");
    });
  });

  describe("Tabs", () => {
    it("emits root, list, trigger, content", () => {
      const { container } = render(
        <Tabs defaultValue="t1">
          <TabsList>
            <TabsTrigger value="t1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="t1">Panel</TabsContent>
        </Tabs>,
      );

      assertSlot(container, "root");
      assertSlot(container, "list");
      assertSlot(container, "trigger");
      assertSlot(container, "content");
    });
  });

  describe("Timeline", () => {
    it("emits root, item, item-marker-wrapper, item-marker, item-connector, item-content, item-timestamp, item-title, item-description", () => {
      const { container } = render(
        <Timeline aria-label="Events">
          <TimelineItem
            title="A"
            titleAs="h3"
            timestamp="2026-04-01"
            description="d"
          />
          <TimelineItem title="B" />
        </Timeline>,
      );

      assertSlot(container, "root");
      assertSlot(container, "item");
      assertSlot(container, "item-marker-wrapper");
      assertSlot(container, "item-marker");
      assertSlot(container, "item-connector");
      assertSlot(container, "item-content");
      assertSlot(container, "item-timestamp");
      assertSlot(container, "item-title");
      assertSlot(container, "item-description");
    });
  });

  describe("Stepper", () => {
    it("emits root, list, separator, item, indicator, title, description, content", () => {
      const { container } = render(
        <Stepper currentStep={1} orientation="horizontal">
          <StepperItem step={0}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>One</StepperTitle>
              <StepperDescription>d</StepperDescription>
            </StepperContent>
          </StepperItem>
          <StepperItem step={1}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Two</StepperTitle>
            </StepperContent>
          </StepperItem>
        </Stepper>,
      );

      assertSlot(container, "root");
      assertSlot(container, "list");
      assertSlot(container, "separator");
      assertSlot(container, "item");
      assertSlot(container, "indicator");
      assertSlot(container, "title");
      assertSlot(container, "description");
      assertSlot(container, "content");
    });
  });

  describe("Breadcrumb", () => {
    it("emits root, list, item, link, page, separator, ellipsis", () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      assertSlot(container, "root");
      assertSlot(container, "list");
      assertSlot(container, "item");
      assertSlot(container, "link");
      assertSlot(container, "page");
      assertSlot(container, "separator");
      assertSlot(container, "ellipsis");
    });
  });

  describe("Pagination", () => {
    it("emits root, list, item, link, previous, next, ellipsis", () => {
      const { container } = render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/1" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/1">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="/3" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );

      assertSlot(container, "root");
      assertSlot(container, "list");
      assertSlot(container, "item");
      assertSlot(container, "link");
      assertSlot(container, "previous");
      assertSlot(container, "next");
      assertSlot(container, "ellipsis");
    });
  });

  describe("Nav", () => {
    it("emits root, list, item, link, trigger, submenu", () => {
      const { container } = render(
        <Nav>
          <NavList>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem hasSubmenu>
              <NavTrigger>More</NavTrigger>
              <NavSubmenu>
                <NavItem>
                  <NavLink href="/x">X</NavLink>
                </NavItem>
              </NavSubmenu>
            </NavItem>
          </NavList>
        </Nav>,
      );

      assertSlot(container, "root");
      assertSlot(container, "list");
      assertSlot(container, "item");
      assertSlot(container, "link");
      assertSlot(container, "trigger");
      assertSlot(container, "submenu");
    });
  });

  describe("NavigationMenu", () => {
    it("emits root, list, item, trigger, content, link", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem value="a">
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/x">X</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>,
      );

      assertSlot(container, "root");
      assertSlot(container, "list");
      assertSlot(container, "item");
      assertSlot(container, "trigger");
      await user.click(screen.getByRole("button", { name: "Menu" }));
      assertSlot(container, "content");
      assertSlot(container, "link");
    });
  });

  describe("Table", () => {
    it("emits root, table, caption, header, head-cell, body, row, cell, footer", () => {
      const { container } = render(
        <Table caption="Test">
          <TableHeader>
            <TableRow>
              <TableHead>H</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>C</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>F</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      );

      assertSlot(container, "root");
      assertSlot(container, "table");
      assertSlot(container, "caption");
      assertSlot(container, "header");
      assertSlot(container, "head-cell");
      assertSlot(container, "body");
      assertSlot(container, "row");
      assertSlot(container, "cell");
      assertSlot(container, "footer");
    });
  });

  describe("RadioGroup and Radio", () => {
    it("RadioGroup emits root; Radio emits item, item-input, item-indicator, item-label", () => {
      const { container } = render(
        <RadioGroup name="color" onChange={() => undefined}>
          <Radio value="a">A</Radio>
        </RadioGroup>,
      );
      assertSlot(container, "root");
      assertSlot(container, "item");
      assertSlot(container, "item-input");
      assertSlot(container, "item-indicator");
      assertSlot(container, "item-label");
    });
  });

  describe("Checkbox", () => {
    it("emits root, input, indicator, label", () => {
      const { container } = render(<Checkbox>Accept</Checkbox>);
      assertSlot(container, "root");
      assertSlot(container, "input");
      assertSlot(container, "indicator");
      assertSlot(container, "label");
    });
  });

  describe("Switch", () => {
    it("emits root, thumb, label", () => {
      const { container } = render(<Switch>Toggle</Switch>);
      assertSlot(container, "root");
      assertSlot(container, "thumb");
      assertSlot(container, "label");
    });
  });

  describe("Slider", () => {
    it("emits root, input, track, fill, thumb, value", () => {
      const { container } = render(<Slider aria-label="v" showValue />);
      assertSlot(container, "root");
      assertSlot(container, "input");
      assertSlot(container, "track");
      assertSlot(container, "fill");
      assertSlot(container, "thumb");
      assertSlot(container, "value");
    });
  });

  describe("FileInput", () => {
    it("emits root, zone, input", () => {
      const { container } = render(<FileInput />);
      assertSlot(container, "root");
      assertSlot(container, "zone");
      assertSlot(container, "input");
    });

    it("emits file-list, file-item, file-name, file-size, file-remove-button after selection", () => {
      const { container } = render(<FileInput multiple />);
      const input =
        container.querySelector<HTMLInputElement>('input[type="file"]')!;
      const file = new File([new Uint8Array(16)], "x.txt", {
        type: "text/plain",
      });
      fireEvent.change(input, { target: { files: [file] } });
      assertSlot(container, "file-list");
      assertSlot(container, "file-item");
      assertSlot(container, "file-name");
      assertSlot(container, "file-size");
      assertSlot(container, "file-remove-button");
    });
  });

  describe("NumberInput", () => {
    it("emits root, input, decrement, increment", () => {
      const { container } = render(<NumberInput aria-label="Q" showControls />);
      assertSlot(container, "root");
      assertSlot(container, "input");
      assertSlot(container, "decrement");
      assertSlot(container, "increment");
    });
  });

  describe("FormField", () => {
    it("emits root, hint, error", () => {
      const { container } = render(
        <FormField hint="H" error="E">
          <input aria-label="x" />
        </FormField>,
      );
      assertSlot(container, "root");
      assertSlot(container, "hint");
      assertSlot(container, "error");
    });
  });

  describe("Sidebar", () => {
    it("emits provider, root, header, content, footer, group, group-label, inset, menu, menu-item, menu-button, trigger", () => {
      const { container } = render(
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>H</SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Label</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>B</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarTrigger />
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>Main</SidebarInset>
        </SidebarProvider>,
      );

      assertSlot(container, "provider");
      assertSlot(container, "root");
      assertSlot(container, "header");
      assertSlot(container, "content");
      assertSlot(container, "footer");
      assertSlot(container, "group");
      assertSlot(container, "group-label");
      assertSlot(container, "inset");
      assertSlot(container, "menu");
      assertSlot(container, "menu-item");
      assertSlot(container, "menu-button");
      assertSlot(container, "trigger");
    });
  });

  describe("AppShell", () => {
    it("emits root, header, body, main", () => {
      const { container } = render(
        <AppShell>
          <AppShellHeader>H</AppShellHeader>
          <AppShellBody>
            <AppShellMain>M</AppShellMain>
          </AppShellBody>
        </AppShell>,
      );
      assertSlot(container, "root");
      assertSlot(container, "header");
      assertSlot(container, "body");
      assertSlot(container, "main");
    });
  });

  describe("ScrollArea", () => {
    it("emits root (scrollbar/thumb are CSS-only per ADR-040)", () => {
      const { container } = render(<ScrollArea>Content</ScrollArea>);
      assertSlot(container, "root");
    });
  });

  describe("EmptyState", () => {
    it("emits root, visual, heading, description, action", () => {
      const { container } = render(
        <EmptyState
          illustration={<svg />}
          heading="H"
          description="D"
          action={<button type="button">A</button>}
        />,
      );
      assertSlot(container, "root");
      assertSlot(container, "visual");
      assertSlot(container, "heading");
      assertSlot(container, "description");
      assertSlot(container, "action");
    });
  });

  describe("Callout", () => {
    it("emits root and citation", () => {
      const { container } = render(<Callout citation="Source">Body</Callout>);
      assertSlot(container, "root");
      assertSlot(container, "citation");
    });
  });

  describe("SplitLayout", () => {
    it("emits root (main/side are consumer-supplied)", () => {
      const { container } = render(
        <SplitLayout>
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      assertSlot(container, "root");
    });
  });

  describe("DatePicker", () => {
    it("emits input-root, input, toggle, calendar, calendar-header, prev-button, month-year-label, next-button, grid, weekday-row, weekday, week-row, day-cell, day-button", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker defaultValue={new Date(2026, 3, 15)}>
          <DatePickerInput />
          <DatePickerCalendar />
        </DatePicker>,
      );

      assertSlot(container, "input-root");
      assertSlot(container, "input");
      assertSlot(container, "toggle");

      await user.click(screen.getByRole("button", { name: "Open calendar" }));
      assertSlot(document.body, "calendar");
      assertSlot(document.body, "calendar-header");
      assertSlot(document.body, "prev-button");
      assertSlot(document.body, "month-year-label");
      assertSlot(document.body, "next-button");
      assertSlot(document.body, "grid");
      assertSlot(document.body, "weekday-row");
      assertSlotCount(document.body, "weekday", 7);
      assertSlotCount(document.body, "week-row", 1);
      assertSlotCount(document.body, "day-cell", 1);
      assertSlotCount(document.body, "day-button", 1);
    });
  });

  describe("Toast and Toaster", () => {
    it("Toaster emits toaster; Toast emits toast, message, action, close", () => {
      toast("Saved", {
        action: { label: "Undo", onClick: () => undefined },
      });
      render(<Toaster />);
      const toaster = screen.getByLabelText("Notifications");
      expect(toaster.getAttribute("data-slot")).toBe("toaster");
      assertSlot(toaster, "toast");
      assertSlot(toaster, "message");
      assertSlot(toaster, "action");
      assertSlot(toaster, "close");
    });
  });
});
