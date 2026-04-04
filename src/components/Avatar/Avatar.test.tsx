import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar, getInitials } from "./Avatar";

describe("getInitials", () => {
  it("two words → first letters uppercased", () => {
    expect(getInitials("Jane Smith")).toBe("JS");
  });

  it("three words → first and last letters", () => {
    expect(getInitials("Jane A Smith")).toBe("JS");
  });

  it("single word → first two chars uppercased", () => {
    expect(getInitials("Jane")).toBe("JA");
  });

  it("single char → returns that char uppercased", () => {
    expect(getInitials("j")).toBe("J");
  });

  it("empty string → returns empty string", () => {
    expect(getInitials("")).toBe("");
  });

  it("leading/trailing whitespace → handled cleanly", () => {
    expect(getInitials("  Jane Smith  ")).toBe("JS");
  });

  it("multiple internal spaces → handled cleanly", () => {
    expect(getInitials("Jane    Smith")).toBe("JS");
  });
});

describe("Avatar", () => {
  describe("rendering", () => {
    it("renders root <span> with role='img'", () => {
      render(<Avatar data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      expect(el.tagName).toBe("SPAN");
      expect(el).toHaveAttribute("role", "img");
    });

    it("renders <img> when src is provided", () => {
      render(<Avatar src="https://example.com/photo.jpg" alt="User" data-testid="avatar" />);
      const img = screen.getByTestId("avatar").querySelector("img");
      expect(img).not.toBeNull();
    });

    it("<img> has alt=''", () => {
      render(<Avatar src="https://example.com/photo.jpg" alt="User" data-testid="avatar" />);
      const img = screen.getByTestId("avatar").querySelector("img");
      expect(img).toHaveAttribute("alt", "");
    });

    it("fallback is present in DOM when src is provided", () => {
      render(<Avatar src="https://example.com/photo.jpg" alt="User" name="Jane Smith" data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      expect(el.textContent).toContain("JS");
    });

    it("sets displayName correctly", () => {
      expect(Avatar.displayName).toBe("Avatar");
    });
  });

  describe("image loading", () => {
    it("on onLoad: image becomes visible", () => {
      render(<Avatar src="https://example.com/photo.jpg" alt="User" data-testid="avatar" />);
      const img = screen.getByTestId("avatar").querySelector("img")!;
      expect(img.className).toContain("opacity-0");

      fireEvent.load(img);
      expect(img.className).toContain("opacity-100");
    });

    it("on onError: image is hidden, fallback remains visible", () => {
      render(<Avatar src="https://example.com/bad.jpg" alt="User" name="Jane Smith" data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      const img = el.querySelector("img")!;

      fireEvent.error(img);

      // img should be removed from DOM (errored state)
      expect(el.querySelector("img")).toBeNull();
      // fallback initials still visible
      expect(el.textContent).toContain("JS");
    });
  });

  describe("fallback tiers", () => {
    it("renders initials when src is omitted and name is provided", () => {
      render(<Avatar name="Jane Smith" data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      expect(el.textContent).toContain("JS");
    });

    it("initials span has aria-hidden='true'", () => {
      render(<Avatar name="Jane Smith" data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      const initialsSpan = el.querySelector("span[aria-hidden='true']");
      expect(initialsSpan).not.toBeNull();
      expect(initialsSpan!.textContent).toBe("JS");
    });

    it("renders icon when neither src nor name is provided", () => {
      render(<Avatar data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      expect(el.querySelector("svg")).not.toBeNull();
    });

    it("icon SVG has aria-hidden='true'", () => {
      render(<Avatar data-testid="avatar" />);
      const svg = screen.getByTestId("avatar").querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("aria-label", () => {
    it("image with alt: uses alt", () => {
      render(<Avatar src="https://example.com/photo.jpg" alt="Jane's photo" data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      const img = el.querySelector("img")!;
      fireEvent.load(img);
      expect(el).toHaveAttribute("aria-label", "Jane's photo");
    });

    it("image with name fallback (no alt): uses name", () => {
      render(<Avatar src="https://example.com/photo.jpg" name="Jane Smith" data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      const img = el.querySelector("img")!;
      fireEvent.load(img);
      expect(el).toHaveAttribute("aria-label", "Jane Smith");
    });

    it("image without alt or name: uses 'Avatar'", () => {
      render(<Avatar src="https://example.com/photo.jpg" data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      const img = el.querySelector("img")!;
      fireEvent.load(img);
      expect(el).toHaveAttribute("aria-label", "Avatar");
    });

    it("initials: uses name", () => {
      render(<Avatar name="Jane Smith" data-testid="avatar" />);
      expect(screen.getByTestId("avatar")).toHaveAttribute("aria-label", "Jane Smith");
    });

    it("icon with name: uses name", () => {
      render(<Avatar name="Jane Smith" src="https://example.com/bad.jpg" data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      // name yields empty initials? No — "Jane Smith" yields "JS", so this is initials tier
      // Test icon with name explicitly: name that yields empty initials won't happen with a real name
      // Instead test: src errors out, name present
      const img = el.querySelector("img")!;
      fireEvent.error(img);
      expect(el).toHaveAttribute("aria-label", "Jane Smith");
    });

    it("icon without name: uses 'User avatar'", () => {
      render(<Avatar data-testid="avatar" />);
      expect(screen.getByTestId("avatar")).toHaveAttribute("aria-label", "User avatar");
    });
  });

  describe("variants", () => {
    it("size prop applies correct classes", () => {
      const { rerender } = render(<Avatar size="xs" data-testid="avatar" />);
      expect(screen.getByTestId("avatar").className).toContain("size-6");

      rerender(<Avatar size="sm" data-testid="avatar" />);
      expect(screen.getByTestId("avatar").className).toContain("size-8");

      rerender(<Avatar size="md" data-testid="avatar" />);
      expect(screen.getByTestId("avatar").className).toContain("size-10");

      rerender(<Avatar size="lg" data-testid="avatar" />);
      expect(screen.getByTestId("avatar").className).toContain("size-12");

      rerender(<Avatar size="xl" data-testid="avatar" />);
      expect(screen.getByTestId("avatar").className).toContain("size-16");
    });

    it("shape prop applies correct classes", () => {
      const { rerender } = render(<Avatar shape="circle" data-testid="avatar" />);
      expect(screen.getByTestId("avatar").className).toContain("rounded-[var(--radius-full)]");

      rerender(<Avatar shape="square" data-testid="avatar" />);
      expect(screen.getByTestId("avatar").className).toContain("rounded-[var(--radius-md)]");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Avatar className="ml-2" data-testid="avatar" />);
      const el = screen.getByTestId("avatar");
      expect(el.className).toContain("ml-2");
      expect(el.className).toContain("inline-flex");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to root <span>", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Avatar ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe("native attribute forwarding", () => {
    it("forwards data-testid", () => {
      render(<Avatar data-testid="my-avatar" />);
      expect(screen.getByTestId("my-avatar")).toBeInTheDocument();
    });

    it("forwards id", () => {
      render(<Avatar id="user-avatar" data-testid="avatar" />);
      expect(screen.getByTestId("avatar")).toHaveAttribute("id", "user-avatar");
    });
  });

  describe("src change resets state", () => {
    it("when src prop changes, image load state resets", () => {
      const { rerender } = render(
        <Avatar src="https://example.com/a.jpg" alt="User" data-testid="avatar" />,
      );
      const img1 = screen.getByTestId("avatar").querySelector("img")!;
      fireEvent.load(img1);
      expect(img1.className).toContain("opacity-100");

      // Change src
      rerender(
        <Avatar src="https://example.com/b.jpg" alt="User" data-testid="avatar" />,
      );
      const img2 = screen.getByTestId("avatar").querySelector("img")!;
      // New img should be opacity-0 (not yet loaded)
      expect(img2.className).toContain("opacity-0");
    });
  });
});
