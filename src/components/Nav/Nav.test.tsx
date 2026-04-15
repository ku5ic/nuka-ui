import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Nav,
  NavList,
  NavItem,
  NavLink,
  NavTrigger,
  NavSubmenu,
} from "@nuka/components/Nav";

function renderNav() {
  return render(
    <Nav>
      <NavList>
        <NavItem>
          <NavLink href="/home">Home</NavLink>
        </NavItem>
        <NavItem hasSubmenu>
          <NavTrigger>Products</NavTrigger>
          <NavSubmenu>
            <NavItem>
              <NavLink href="/product-a">Product A</NavLink>
            </NavItem>
          </NavSubmenu>
        </NavItem>
        <NavItem>
          <NavLink href="/about" active>
            About
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>,
  );
}

describe("Nav", () => {
  describe("rendering", () => {
    it("renders a nav element with default aria-label", () => {
      renderNav();
      expect(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).toBeInTheDocument();
    });

    it("accepts a custom aria-label", () => {
      render(
        <Nav aria-label="Site navigation">
          <NavList />
        </Nav>,
      );
      expect(
        screen.getByRole("navigation", { name: "Site navigation" }),
      ).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Nav ref={ref}>
          <NavList />
        </Nav>,
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("NAV");
    });
  });
});

describe("NavList", () => {
  it("renders a ul element", () => {
    renderNav();
    const lists = screen.getAllByRole("list");
    expect(lists.length).toBeGreaterThanOrEqual(1);
    expect(lists[0]!.tagName).toBe("UL");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLUListElement>();
    render(
      <Nav>
        <NavList ref={ref} />
      </Nav>,
    );
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });

  it("merges className", () => {
    render(
      <Nav>
        <NavList className="custom-list" data-testid="list" />
      </Nav>,
    );
    expect(screen.getByTestId("list")).toHaveClass("custom-list");
  });
});

describe("NavItem", () => {
  it("renders a li element", () => {
    render(
      <Nav>
        <NavList>
          <NavItem data-testid="item">Content</NavItem>
        </NavList>
      </Nav>,
    );
    expect(screen.getByTestId("item").tagName).toBe("LI");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <Nav>
        <NavList>
          <NavItem ref={ref}>Content</NavItem>
        </NavList>
      </Nav>,
    );
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });

  it("accepts hasSubmenu prop without changing output", () => {
    const { container } = render(
      <Nav>
        <NavList>
          <NavItem hasSubmenu data-testid="item">
            Content
          </NavItem>
        </NavList>
      </Nav>,
    );
    expect(screen.getByTestId("item").tagName).toBe("LI");
    expect(container.querySelector("[aria-haspopup]")).toBeNull();
  });
});

describe("NavLink", () => {
  it("renders an anchor element", () => {
    renderNav();
    const link = screen.getByRole("link", { name: "Home" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/home");
  });

  it("sets aria-current=page when active", () => {
    renderNav();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not set aria-current when not active", () => {
    renderNav();
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("supports asChild", () => {
    render(
      <Nav>
        <NavList>
          <NavItem>
            <NavLink asChild>
              <a href="/custom">Custom</a>
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>,
    );
    const link = screen.getByRole("link", { name: "Custom" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/custom");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Nav>
        <NavList>
          <NavItem>
            <NavLink ref={ref} href="/test">
              Link
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("merges className", () => {
    render(
      <Nav>
        <NavList>
          <NavItem>
            <NavLink href="/test" className="custom-link">
              Link
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>,
    );
    expect(screen.getByRole("link", { name: "Link" })).toHaveClass(
      "custom-link",
    );
  });
});

describe("NavTrigger", () => {
  it("renders a button with aria-haspopup", () => {
    renderNav();
    const trigger = screen.getByRole("button", { name: /Products/ });
    expect(trigger).toHaveAttribute("aria-haspopup", "true");
    expect(trigger).toHaveAttribute("type", "button");
  });

  it("does not have aria-expanded", () => {
    renderNav();
    const trigger = screen.getByRole("button", { name: /Products/ });
    expect(trigger).not.toHaveAttribute("aria-expanded");
  });

  it("supports asChild", () => {
    render(
      <Nav>
        <NavList>
          <NavItem>
            <NavTrigger asChild>
              <button type="button">Custom Trigger</button>
            </NavTrigger>
          </NavItem>
        </NavList>
      </Nav>,
    );
    const trigger = screen.getByRole("button", { name: /Custom Trigger/ });
    expect(trigger).toHaveAttribute("aria-haspopup", "true");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Nav>
        <NavList>
          <NavItem>
            <NavTrigger ref={ref}>Trigger</NavTrigger>
          </NavItem>
        </NavList>
      </Nav>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("merges className", () => {
    render(
      <Nav>
        <NavList>
          <NavItem>
            <NavTrigger className="custom-trigger">Trigger</NavTrigger>
          </NavItem>
        </NavList>
      </Nav>,
    );
    expect(screen.getByRole("button", { name: /Trigger/ })).toHaveClass(
      "custom-trigger",
    );
  });
});

describe("NavSubmenu", () => {
  it("renders a ul element", () => {
    render(
      <Nav>
        <NavList>
          <NavItem>
            <NavTrigger>Menu</NavTrigger>
            <NavSubmenu data-testid="submenu">
              <NavItem>
                <NavLink href="/sub">Sub</NavLink>
              </NavItem>
            </NavSubmenu>
          </NavItem>
        </NavList>
      </Nav>,
    );
    expect(screen.getByTestId("submenu").tagName).toBe("UL");
  });

  it("defaults to start alignment", () => {
    render(
      <Nav>
        <NavList>
          <NavItem>
            <NavSubmenu data-testid="submenu">
              <NavItem>
                <NavLink href="/a">A</NavLink>
              </NavItem>
            </NavSubmenu>
          </NavItem>
        </NavList>
      </Nav>,
    );
    expect(screen.getByTestId("submenu")).toHaveClass("left-0");
  });

  it("supports end alignment", () => {
    render(
      <Nav>
        <NavList>
          <NavItem>
            <NavSubmenu align="end" data-testid="submenu">
              <NavItem>
                <NavLink href="/a">A</NavLink>
              </NavItem>
            </NavSubmenu>
          </NavItem>
        </NavList>
      </Nav>,
    );
    expect(screen.getByTestId("submenu")).toHaveClass("right-0");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLUListElement>();
    render(
      <Nav>
        <NavList>
          <NavItem>
            <NavSubmenu ref={ref}>
              <NavItem>
                <NavLink href="/a">A</NavLink>
              </NavItem>
            </NavSubmenu>
          </NavItem>
        </NavList>
      </Nav>,
    );
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });
});

describe("displayName", () => {
  it("sets displayName on all sub-components", () => {
    expect(Nav.displayName).toBe("Nav");
    expect(NavList.displayName).toBe("NavList");
    expect(NavItem.displayName).toBe("NavItem");
    expect(NavLink.displayName).toBe("NavLink");
    expect(NavTrigger.displayName).toBe("NavTrigger");
    expect(NavSubmenu.displayName).toBe("NavSubmenu");
  });
});
