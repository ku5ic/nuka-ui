function scrollIntoViewSafe(el: Element | null | undefined): void {
  if (el != null && typeof el.scrollIntoView === "function") {
    el.scrollIntoView({ block: "nearest" });
  }
}

export { scrollIntoViewSafe };
