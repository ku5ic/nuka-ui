function getActiveElement(): Element | null {
  if (typeof document === "undefined") return null;
  return document.activeElement;
}

export { getActiveElement };
