type RovingOrientation = "vertical" | "horizontal" | "both";

function getRovingIndex(
  key: string,
  currentIndex: number,
  itemCount: number,
  orientation: RovingOrientation = "both",
): number | undefined {
  if (itemCount === 0) return undefined;

  const vert = orientation !== "horizontal";
  const horiz = orientation !== "vertical";

  const noSelection = currentIndex < 0;

  switch (key) {
    case "ArrowDown":
      if (vert) return noSelection ? 0 : (currentIndex + 1) % itemCount;
      return undefined;
    case "ArrowUp":
      if (vert)
        return noSelection
          ? itemCount - 1
          : (currentIndex - 1 + itemCount) % itemCount;
      return undefined;
    case "ArrowRight":
      if (horiz) return noSelection ? 0 : (currentIndex + 1) % itemCount;
      return undefined;
    case "ArrowLeft":
      if (horiz)
        return noSelection
          ? itemCount - 1
          : (currentIndex - 1 + itemCount) % itemCount;
      return undefined;
    case "Home":
      return 0;
    case "End":
      return itemCount - 1;
    default:
      return undefined;
  }
}

export { getRovingIndex };
export type { RovingOrientation };
