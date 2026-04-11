import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMediaQuery } from "@nuka/hooks/use-media-query";

type ChangeListener = (e: MediaQueryListEvent) => void;

let currentListener: ChangeListener | null = null;

function createMockMql(initialMatches: boolean) {
  const mql = {
    matches: initialMatches,
    media: "",
    onchange: null as ChangeListener | null,
    addEventListener: vi.fn((_event: string, cb: ChangeListener) => {
      currentListener = cb;
    }),
    removeEventListener: vi.fn((_event: string, _cb: ChangeListener) => {
      currentListener = null;
    }),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
  };
  return mql;
}

function setupMatchMedia(initialMatches: boolean) {
  const mql = createMockMql(initialMatches);
  window.matchMedia = vi.fn().mockReturnValue(mql);

  function fireChange(matches: boolean) {
    mql.matches = matches;
    if (currentListener) {
      currentListener({ matches } as MediaQueryListEvent);
    }
  }

  return { mql, fireChange };
}

describe("useMediaQuery", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    currentListener = null;
  });

  it("returns true when query matches", () => {
    setupMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("returns false when query does not match", () => {
    setupMatchMedia(false);

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);
  });

  it("updates when media query changes", () => {
    const { fireChange } = setupMatchMedia(false);

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);

    act(() => {
      fireChange(true);
    });
    expect(result.current).toBe(true);
  });

  it("cleans up listener on unmount", () => {
    const { mql } = setupMatchMedia(false);

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });
});
