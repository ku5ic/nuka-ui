import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  AppShell,
  AppShellHeader,
  AppShellBody,
  AppShellMain,
} from "@nuka/components/AppShell";

describe("displayName", () => {
  it("sets displayName on all parts", () => {
    expect(AppShell.displayName).toBe("AppShell");
    expect(AppShellHeader.displayName).toBe("AppShellHeader");
    expect(AppShellBody.displayName).toBe("AppShellBody");
    expect(AppShellMain.displayName).toBe("AppShellMain");
  });
});

describe("AppShell", () => {
  it("renders children", () => {
    render(<AppShell>content</AppShell>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <AppShell data-testid="shell" className="custom">
        content
      </AppShell>,
    );
    expect(screen.getByTestId("shell").className).toContain("custom");
  });

  it("forwards native attributes", () => {
    render(
      <AppShell data-testid="shell" data-section="root">
        content
      </AppShell>,
    );
    expect(screen.getByTestId("shell")).toHaveAttribute("data-section", "root");
  });
});

describe("AppShellHeader", () => {
  it("renders a header element", () => {
    render(<AppShellHeader>header</AppShellHeader>);
    expect(screen.getByRole("banner")).toBeInstanceOf(HTMLElement);
  });

  it("has border classes by default", () => {
    render(<AppShellHeader data-testid="header">header</AppShellHeader>);
    const el = screen.getByTestId("header");
    expect(el.className).toContain("border-b");
  });

  it("omits border classes when border is false", () => {
    render(
      <AppShellHeader data-testid="header" border={false}>
        header
      </AppShellHeader>,
    );
    const el = screen.getByTestId("header");
    expect(el.className).not.toContain("border-b");
  });

  it("applies custom className", () => {
    render(
      <AppShellHeader data-testid="header" className="custom">
        header
      </AppShellHeader>,
    );
    expect(screen.getByTestId("header").className).toContain("custom");
  });

  it("forwards native attributes", () => {
    render(
      <AppShellHeader data-testid="header" data-section="top">
        header
      </AppShellHeader>,
    );
    expect(screen.getByTestId("header")).toHaveAttribute("data-section", "top");
  });
});

describe("AppShellBody", () => {
  it("renders children", () => {
    render(<AppShellBody>body content</AppShellBody>);
    expect(screen.getByText("body content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <AppShellBody data-testid="body" className="custom">
        body
      </AppShellBody>,
    );
    expect(screen.getByTestId("body").className).toContain("custom");
  });

  it("forwards native attributes", () => {
    render(
      <AppShellBody data-testid="body" data-section="mid">
        body
      </AppShellBody>,
    );
    expect(screen.getByTestId("body")).toHaveAttribute("data-section", "mid");
  });
});

describe("AppShellMain", () => {
  it("renders a main element", () => {
    render(<AppShellMain>main content</AppShellMain>);
    expect(screen.getByRole("main")).toBeInstanceOf(HTMLElement);
  });

  it("has padding classes by default", () => {
    render(<AppShellMain data-testid="main">main</AppShellMain>);
    const el = screen.getByTestId("main");
    expect(el.className).toContain("p-(--space-6)");
  });

  it("omits padding classes when padded is false", () => {
    render(
      <AppShellMain data-testid="main" padded={false}>
        main
      </AppShellMain>,
    );
    const el = screen.getByTestId("main");
    expect(el.className).not.toContain("p-(--space-6)");
  });

  it("applies custom className", () => {
    render(
      <AppShellMain data-testid="main" className="custom">
        main
      </AppShellMain>,
    );
    expect(screen.getByTestId("main").className).toContain("custom");
  });

  it("forwards native attributes", () => {
    render(
      <AppShellMain data-testid="main" data-section="content">
        main
      </AppShellMain>,
    );
    expect(screen.getByTestId("main")).toHaveAttribute(
      "data-section",
      "content",
    );
  });
});

describe("ref forwarding", () => {
  it("forwards ref on AppShell", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AppShell ref={ref}>content</AppShell>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref on AppShellHeader", () => {
    const ref = React.createRef<HTMLElement>();
    render(<AppShellHeader ref={ref}>header</AppShellHeader>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("forwards ref on AppShellBody", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AppShellBody ref={ref}>body</AppShellBody>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref on AppShellMain", () => {
    const ref = React.createRef<HTMLElement>();
    render(<AppShellMain ref={ref}>main</AppShellMain>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});

describe("full composition", () => {
  it("renders all landmarks in the expected structure", () => {
    render(
      <AppShell>
        <AppShellHeader>App Header</AppShellHeader>
        <AppShellBody>
          <AppShellMain>Main content</AppShellMain>
        </AppShellBody>
      </AppShell>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText("App Header")).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  describe("data-slot attributes (ADR-054)", () => {
    it("emits data-slot on root, header, body, and main", () => {
      const { container } = render(
        <AppShell>
          <AppShellHeader>Header</AppShellHeader>
          <AppShellBody>
            <AppShellMain>Main</AppShellMain>
          </AppShellBody>
        </AppShell>,
      );
      expect(container.querySelector('[data-slot="root"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="header"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="body"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="main"]')).not.toBeNull();
    });
  });
});
