import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@nuka/components/NavigationMenu";

vi.mock("@floating-ui/react", async () => {
  const actual = await vi.importActual("@floating-ui/react");
  return {
    ...actual,
    autoUpdate: vi.fn(() => () => undefined),
  };
});

function renderNav() {
  return render(
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/product-a">Product A</NavigationMenuLink>
            <NavigationMenuLink href="/product-b">Product B</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="about">
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>,
  );
}

describe("NavigationMenu", () => {
  describe("rendering", () => {
    it("renders a nav element with default aria-label", () => {
      renderNav();
      expect(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).toBeInTheDocument();
    });

    it("accepts a custom aria-label", () => {
      render(
        <NavigationMenu aria-label="Site navigation">
          <NavigationMenuList />
        </NavigationMenu>,
      );
      expect(
        screen.getByRole("navigation", { name: "Site navigation" }),
      ).toBeInTheDocument();
    });

    it("renders list with role=menubar", () => {
      renderNav();
      expect(screen.getByRole("menubar")).toBeInTheDocument();
    });
  });

  describe("trigger", () => {
    it("has aria-haspopup=dialog", () => {
      renderNav();
      expect(
        screen.getByRole("menuitem", { name: /Products/ }),
      ).toHaveAttribute("aria-haspopup", "dialog");
    });

    it("has aria-expanded=false when closed", () => {
      renderNav();
      expect(
        screen.getByRole("menuitem", { name: /Products/ }),
      ).toHaveAttribute("aria-expanded", "false");
    });

    it("opens content on click and sets aria-expanded=true", async () => {
      const user = userEvent.setup();
      renderNav();
      await user.click(screen.getByRole("menuitem", { name: /Products/ }));
      expect(
        screen.getByRole("menuitem", { name: /Products/ }),
      ).toHaveAttribute("aria-expanded", "true");
    });

    it("closes content on second click", async () => {
      const user = userEvent.setup();
      renderNav();
      const trigger = screen.getByRole("menuitem", { name: /Products/ });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("content", () => {
    it("is not rendered when closed", () => {
      renderNav();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders with role=dialog when open", async () => {
      const user = userEvent.setup();
      renderNav();
      await user.click(screen.getByRole("menuitem", { name: /Products/ }));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("has tabIndex=-1 for focus management", async () => {
      const user = userEvent.setup();
      renderNav();
      await user.click(screen.getByRole("menuitem", { name: /Products/ }));
      expect(screen.getByRole("dialog")).toHaveAttribute("tabindex", "-1");
    });

    it("renders children inside the panel when open", async () => {
      const user = userEvent.setup();
      renderNav();
      await user.click(screen.getByRole("menuitem", { name: /Products/ }));
      expect(
        screen.getByRole("menuitem", { name: "Product A" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("menuitem", { name: "Product B" }),
      ).toBeInTheDocument();
    });
  });

  describe("keyboard navigation", () => {
    it("ArrowRight moves focus to next trigger", async () => {
      const user = userEvent.setup();
      renderNav();
      const productsTrigger = screen.getByRole("menuitem", {
        name: /Products/,
      });
      const resourcesTrigger = screen.getByRole("menuitem", {
        name: /Resources/,
      });

      productsTrigger.focus();
      await user.keyboard("{ArrowRight}");
      expect(resourcesTrigger).toHaveFocus();
    });

    it("ArrowLeft moves focus to previous trigger", async () => {
      const user = userEvent.setup();
      renderNav();
      const productsTrigger = screen.getByRole("menuitem", {
        name: /Products/,
      });
      const resourcesTrigger = screen.getByRole("menuitem", {
        name: /Resources/,
      });

      resourcesTrigger.focus();
      await user.keyboard("{ArrowLeft}");
      expect(productsTrigger).toHaveFocus();
    });

    it("ArrowRight wraps from last to first trigger", async () => {
      const user = userEvent.setup();
      renderNav();
      const productsTrigger = screen.getByRole("menuitem", {
        name: /Products/,
      });
      const resourcesTrigger = screen.getByRole("menuitem", {
        name: /Resources/,
      });

      resourcesTrigger.focus();
      await user.keyboard("{ArrowRight}");
      expect(productsTrigger).toHaveFocus();
    });

    it("ArrowDown opens the sub-panel", async () => {
      const user = userEvent.setup();
      renderNav();
      const trigger = screen.getByRole("menuitem", { name: /Products/ });

      trigger.focus();
      await user.keyboard("{ArrowDown}");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("Escape closes open panel and returns focus to trigger", async () => {
      const user = userEvent.setup();
      renderNav();
      const trigger = screen.getByRole("menuitem", { name: /Products/ });

      await user.click(trigger);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });

    it("Enter opens the sub-panel", async () => {
      const user = userEvent.setup();
      renderNav();
      const trigger = screen.getByRole("menuitem", { name: /Products/ });

      trigger.focus();
      await user.keyboard("{Enter}");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("Space opens the sub-panel", async () => {
      const user = userEvent.setup();
      renderNav();
      const trigger = screen.getByRole("menuitem", { name: /Products/ });

      trigger.focus();
      await user.keyboard(" ");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("link", () => {
    it("renders an anchor with href", () => {
      renderNav();
      expect(screen.getByRole("menuitem", { name: "About" })).toHaveAttribute(
        "href",
        "/about",
      );
    });

    it("applies aria-current=page when active", () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem value="about">
              <NavigationMenuLink href="/about" active>
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>,
      );
      expect(screen.getByRole("menuitem", { name: "About" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("does not set aria-current when not active", () => {
      renderNav();
      expect(
        screen.getByRole("menuitem", { name: "About" }),
      ).not.toHaveAttribute("aria-current");
    });

    it("supports asChild", () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem value="home">
              <NavigationMenuLink asChild>
                <a href="/home">Home</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>,
      );
      const link = screen.getByRole("menuitem", { name: "Home" });
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/home");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on NavigationMenu", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <NavigationMenu ref={ref}>
          <NavigationMenuList />
        </NavigationMenu>,
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("forwards ref on NavigationMenuTrigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem value="test">
              <NavigationMenuTrigger ref={ref}>Test</NavigationMenuTrigger>
              <NavigationMenuContent>Content</NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards ref on NavigationMenuLink", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem value="link">
              <NavigationMenuLink ref={ref} href="/test">
                Link
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>,
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe("displayName", () => {
    it("sets displayName on all sub-components", () => {
      expect(NavigationMenu.displayName).toBe("NavigationMenu");
      expect(NavigationMenuList.displayName).toBe("NavigationMenuList");
      expect(NavigationMenuItem.displayName).toBe("NavigationMenuItem");
      expect(NavigationMenuTrigger.displayName).toBe("NavigationMenuTrigger");
      expect(NavigationMenuContent.displayName).toBe("NavigationMenuContent");
      expect(NavigationMenuLink.displayName).toBe("NavigationMenuLink");
    });
  });

  describe("className override", () => {
    it("merges className on NavigationMenu", () => {
      render(
        <NavigationMenu className="custom-nav">
          <NavigationMenuList />
        </NavigationMenu>,
      );
      expect(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).toHaveClass("custom-nav");
    });
  });
});
