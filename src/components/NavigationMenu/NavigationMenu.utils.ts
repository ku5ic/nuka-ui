import type { useNavigationMenuContext } from "@nuka/components/NavigationMenu/NavigationMenu.context";

function navigateToAdjacentItem(
  rootCtx: ReturnType<typeof useNavigationMenuContext>,
  currentValue: string,
  direction: -1 | 1,
): HTMLElement | undefined {
  const values = rootCtx.itemValues.current;
  const currentIndex = values.indexOf(currentValue);
  if (currentIndex === -1) return undefined;
  const nextIndex = (currentIndex + direction + values.length) % values.length;
  const nextValue = values[nextIndex];
  if (nextValue === undefined) return undefined;
  const nextEl = rootCtx.itemRefs.current.get(nextValue);
  if (nextEl) {
    const currentEl = rootCtx.itemRefs.current.get(currentValue);
    if (currentEl) currentEl.tabIndex = -1;
    nextEl.tabIndex = 0;
    rootCtx.setRovingValue(nextValue);
    nextEl.focus();
  }
  return nextEl;
}

export { navigateToAdjacentItem };
