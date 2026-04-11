import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@nuka/components/Sidebar";

type ChangeListener = (e: MediaQueryListEvent) => void;

function mockMatchMedia(matches: boolean) {
  let listener: ChangeListener | null = null;
  const mql = {
    matches,
    media: "",
    onchange: null as ChangeListener | null,
    addEventListener: vi.fn((_event: string, cb: ChangeListener) => {
      listener = cb;
    }),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
  };

  window.matchMedia = vi.fn().mockReturnValue(mql);

  function setMatches(newMatches: boolean) {
    mql.matches = newMatches;
    if (listener) {
      listener({ matches: newMatches } as MediaQueryListEvent);
    }
  }

  return { mql, setMatches };
}

function renderSidebar({
  defaultExpanded = true,
  expanded,
  onExpandedChange,
}: {
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
} = {}) {
  const optionalProps: Record<string, unknown> = {};
  if (expanded !== undefined) optionalProps.expanded = expanded;
  if (onExpandedChange !== undefined)
    optionalProps.onExpandedChange = onExpandedChange;

  return render(
    <SidebarProvider defaultExpanded={defaultExpanded} {...optionalProps}>
      <Sidebar>
        <SidebarHeader>
          <span>Logo</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard">
                  <span>D</span>
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <span>S</span>
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <span>Footer</span>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <main>Main content</main>
      </SidebarInset>
    </SidebarProvider>,
  );
}

describe("SidebarProvider", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("sets displayName on all sub-components", () => {
    expect(SidebarProvider.displayName).toBe("SidebarProvider");
    expect(Sidebar.displayName).toBe("Sidebar");
    expect(SidebarHeader.displayName).toBe("SidebarHeader");
    expect(SidebarContent.displayName).toBe("SidebarContent");
    expect(SidebarFooter.displayName).toBe("SidebarFooter");
    expect(SidebarGroup.displayName).toBe("SidebarGroup");
    expect(SidebarGroupLabel.displayName).toBe("SidebarGroupLabel");
    expect(SidebarMenu.displayName).toBe("SidebarMenu");
    expect(SidebarMenuItem.displayName).toBe("SidebarMenuItem");
    expect(SidebarMenuButton.displayName).toBe("SidebarMenuButton");
    expect(SidebarTrigger.displayName).toBe("SidebarTrigger");
    expect(SidebarInset.displayName).toBe("SidebarInset");
  });
});

describe("Sidebar desktop expanded", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockMatchMedia(false);
  });

  it("renders as an aside element", () => {
    renderSidebar();
    // complementary landmark has no accessible name; only one in fixture
    expect(screen.getByRole("complementary")).toBeInstanceOf(HTMLElement);
  });

  it("shows label text in expanded mode", () => {
    renderSidebar();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("shows group label in expanded mode", () => {
    renderSidebar();
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("has data-expanded attribute when expanded", () => {
    renderSidebar();
    // complementary landmark has no accessible name; only one in fixture
    const aside = screen.getByRole("complementary");
    expect(aside).toHaveAttribute("data-expanded", "");
  });

  it("renders header content", () => {
    renderSidebar();
    expect(screen.getByText("Logo")).toBeInTheDocument();
  });

  it("renders footer content", () => {
    renderSidebar();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

describe("Sidebar desktop collapsed", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockMatchMedia(false);
  });

  it("has data-collapsed attribute when collapsed", () => {
    renderSidebar({ defaultExpanded: false });
    // complementary landmark has no accessible name; only one in fixture
    const aside = screen.getByRole("complementary");
    expect(aside).toHaveAttribute("data-collapsed", "");
  });

  it("hides group label when collapsed", () => {
    renderSidebar({ defaultExpanded: false });
    expect(screen.queryByText("Navigation")).not.toBeInTheDocument();
  });
});

describe("SidebarTrigger", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockMatchMedia(false);
  });

  it("toggles expanded state on click", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderSidebar({ onExpandedChange: handleChange });

    const trigger = screen.getByRole("button", { name: "Collapse sidebar" });
    await user.click(trigger);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("shows correct label when collapsed", () => {
    renderSidebar({ defaultExpanded: false });
    expect(
      screen.getByRole("button", { name: "Expand sidebar" }),
    ).toBeInTheDocument();
  });
});

describe("Sidebar mobile", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockMatchMedia(true);
  });

  it("does not render aside on mobile", () => {
    renderSidebar();
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("shows open navigation trigger on mobile", () => {
    renderSidebar();
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toBeInTheDocument();
  });

  it("opens sheet when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderSidebar();

    await user.click(screen.getByRole("button", { name: "Open navigation" }));

    // dialog has no accessible name in mobile sheet; only one in fixture
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("SidebarMenuButton", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockMatchMedia(false);
  });

  it("renders as button by default", () => {
    renderSidebar();
    const buttons = screen.getAllByRole("button", {
      name: /Dashboard|Settings/,
    });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders with asChild", () => {
    mockMatchMedia(false);
    render(
      <SidebarProvider defaultExpanded>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home">
                  <a href="/home">Home</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });
});

describe("SidebarInset", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockMatchMedia(false);
  });

  it("renders main content", () => {
    renderSidebar();
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });
});

describe("ref forwarding", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockMatchMedia(false);
  });

  it("forwards ref on SidebarProvider", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <SidebarProvider ref={ref}>
        <Sidebar>
          <SidebarContent />
        </Sidebar>
      </SidebarProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref on Sidebar", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <SidebarProvider>
        <Sidebar ref={ref}>
          <SidebarContent />
        </Sidebar>
      </SidebarProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
