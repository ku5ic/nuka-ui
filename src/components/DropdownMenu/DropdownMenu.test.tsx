import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
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

vi.mock("@floating-ui/react", async () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const actual =
    await vi.importActual<typeof import("@floating-ui/react")>(
      "@floating-ui/react",
    );
  return {
    ...actual,
    autoUpdate: vi.fn(() => () => undefined),
  };
});

describe("DropdownMenu", () => {
  describe("rendering", () => {
    it("does not render content on initial render", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("opens content on click", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(
        screen.getByRole("menuitem", { name: "Edit" }),
      ).toBeInTheDocument();
    });

    it("closes on second click", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);
      expect(screen.getByRole("menu")).toBeInTheDocument();

      await user.click(trigger);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("ARIA attributes", () => {
    it("sets aria-haspopup=menu on trigger", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );
      expect(screen.getByRole("button", { name: "Actions" })).toHaveAttribute(
        "aria-haspopup",
        "menu",
      );
    });

    it("sets aria-expanded correctly", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("renders content with role=menu", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("renders items with role=menuitem", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    });

    it("renders separator with role=separator", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    it("renders label text", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Section</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getByText("Section")).toBeInTheDocument();
    });
  });

  describe("keyboard navigation", () => {
    it("focuses first item on open", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
      });
    });

    it("navigates with ArrowDown and ArrowUp", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
      });

      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();

      await user.keyboard("{ArrowUp}");
      expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    });

    it("closes on Escape", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getByRole("menu")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("calls onOpenChange(false) on Tab", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <DropdownMenu defaultOpen onOpenChange={onOpenChange}>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
      });

      await user.keyboard("{Tab}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("selects item on Enter", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
      });

      await user.keyboard("{Enter}");
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("selects item on Space", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
      });

      await user.keyboard(" ");
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("selects item on click", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      await user.click(screen.getByRole("menuitem", { name: "Edit" }));
      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe("disabled items", () => {
    it("renders aria-disabled on disabled items", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("does not call onSelect for disabled items", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onSelect} disabled>
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
      });

      await user.keyboard("{Enter}");
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe("intent", () => {
    it("applies danger intent classes", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem intent="danger">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(
        screen.getByRole("menuitem", { name: "Delete" }).className,
      ).toContain("text-(--nuka-danger-text)");
    });
  });

  describe("checkbox items", () => {
    it("renders menuitemcheckbox with aria-checked", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={true} onCheckedChange={vi.fn()}>
              Show preview
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      const checkbox = screen.getByRole("menuitemcheckbox", {
        name: "Show preview",
      });
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("calls onCheckedChange on click", async () => {
      const onCheckedChange = vi.fn();
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={false}
              onCheckedChange={onCheckedChange}
            >
              Show preview
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      await user.click(
        screen.getByRole("menuitemcheckbox", { name: "Show preview" }),
      );
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
  });

  describe("radio items", () => {
    it("renders menuitemradio with aria-checked", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="asc" onValueChange={vi.fn()}>
              <DropdownMenuRadioItem value="asc">
                Ascending
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc">
                Descending
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(
        screen.getByRole("menuitemradio", { name: "Ascending" }),
      ).toHaveAttribute("aria-checked", "true");
      expect(
        screen.getByRole("menuitemradio", { name: "Descending" }),
      ).toHaveAttribute("aria-checked", "false");
    });

    it("calls onValueChange on radio item click", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="asc" onValueChange={onValueChange}>
              <DropdownMenuRadioItem value="asc">
                Ascending
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc">
                Descending
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      await user.click(
        screen.getByRole("menuitemradio", { name: "Descending" }),
      );
      expect(onValueChange).toHaveBeenCalledWith("desc");
    });

    it("renders radio group with role=group", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value="asc"
              onValueChange={vi.fn()}
              aria-label="Sort order"
            >
              <DropdownMenuRadioItem value="asc">
                Ascending
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(
        screen.getByRole("group", { name: "Sort order" }),
      ).toBeInTheDocument();
    });
  });

  describe("controlled state", () => {
    it("respects controlled open prop", () => {
      render(
        <DropdownMenu open={true}>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("calls onOpenChange", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <DropdownMenu onOpenChange={onOpenChange}>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe("data-state", () => {
    it("sets data-state=open on content when open", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getByRole("menu")).toHaveAttribute("data-state", "open");
    });
  });

  describe("asChild", () => {
    it("supports asChild on trigger", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button">Custom trigger</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      const trigger = screen.getByRole("button", { name: "Custom trigger" });
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");

      await user.click(trigger);
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on trigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger ref={ref}>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
