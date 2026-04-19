# Accessibility

nuka-ui commits to WCAG 2.2 Level AA conformance as a baseline. This doc records the component-level invariants the library enforces automatically through CSS, regression tests, and lint rules. Consumers who override styles are responsible for maintaining these invariants in their customizations.

## Touch target size (WCAG 2.5.8 AA)

Every interactive primitive must present a pointer target of at least 24×24 CSS pixels at every size variant. Wrapper elements (labels wrapping selection indicators, overlay inputs covering a wider container) may satisfy this requirement on behalf of visually-smaller indicators.

### Enforcement

1. **CSS**: each interactive component's size variants declare classes that produce ≥24 px on the interactive element.
   - `Checkbox` and `Radio`: wrapping `<label>` uses `min-h-6 min-w-6`.
   - `Switch`: track uses `h-6` (sm), `h-7` (md), `h-8` (lg).
   - `Slider`: wrapper uses `min-h-[24px]`; the native `<input type="range">` overlays the wrapper with `absolute inset-0 w-full h-full`.
   - `Button`, `Input`, `SelectTrigger`, `Textarea`: padding + line-height produce ≥32 px at every size.
2. **Regression test**: [`tests/a11y/touch-targets.test.tsx`](../tests/a11y/touch-targets.test.tsx) renders every interactive primitive at every size variant and asserts the computed effective height via a className→pixel map. jsdom does not compute CSS layout; className inspection substitutes for real measurement.
3. **Lint rule**: `nuka/no-sub-touch-target-sizes` flags Tailwind classes that would produce <24 px when applied as a `<Component>.variants.ts` variant value. Scope is narrow by design: it does not inspect base class arrays (sub-element dimensions live there legitimately) or compound variants.

### WCAG 2.5.5 AAA (44×44)

Not enforced. Adopting it is a separate release decision with larger components and broader layout implications.

### Exemptions

Cosmetic sub-elements inside a wrapper that already satisfies 24×24 (e.g. the Checkbox indicator at `size-4` inside a `min-h-6 min-w-6` label) are legitimate sub-24 uses. Today they live in a component's base class array or directly inside the component render, so the lint rule does not see them. If a future refactor moves such a class into a variant value, use the standard `// eslint-disable-next-line nuka/no-sub-touch-target-sizes` mechanism on that line. Do not add such disables on interactive primitives themselves.

## Further reading

- [WCAG 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [ADR-051](./DECISIONS.md) — the defense-in-depth enforcement of this invariant
