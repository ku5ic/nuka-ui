# Theming

nuka-ui uses a two-layer CSS custom property architecture. Primitive tokens define the raw
scale (colors, spacing, radius). Semantic tokens carry the `--nuka-` prefix and reference
primitives to express purpose: "accent background", "danger text", "input border".

Components reference only semantic tokens. When you retheme the library, you override
semantic tokens. Primitives stay untouched unless you are building an entirely new color scale.

## Token-to-background contrast pairs

Every token that carries a contrast obligation is listed below. Ratios come from inline
comments in `src/styles/tokens.css`. Tokens without a documented ratio are marked
"not verified".

### Light theme

| Token                 | Background                                                        | Ratio        | WCAG | Notes                                                                                          |
| --------------------- | ----------------------------------------------------------------- | ------------ | ---- | ---------------------------------------------------------------------------------------------- |
| `--nuka-accent-text`  | `--nuka-bg-base` (neutral-0)                                      | 7.74:1       | AAA  | accent-500 on white                                                                            |
| `--nuka-accent-fg`    | `--nuka-accent-bg` (accent-500)                                   | 7.74:1       | AAA  | white on accent-500                                                                            |
| `--nuka-success-fg`   | `--nuka-success-base` (success-300)                               | 5.51:1       | AA   | white on filled success surface                                                                |
| `--nuka-warning-fg`   | `--nuka-warning-base` (warning-300)                               | 7.11:1       | AAA  | dark fg, amber cannot pass 4.5:1 with white                                                    |
| `--nuka-danger-fg`    | `--nuka-danger-base` (danger-300)                                 | 4.65:1       | AA   | white on filled danger surface                                                                 |
| `--nuka-info-fg`      | `--nuka-info-base` (info-300)                                     | 4.69:1       | AA   | white on filled info surface                                                                   |
| `--nuka-text-base`    | `--nuka-bg-base`                                                  | not verified |      | neutral-900 on neutral-0                                                                       |
| `--nuka-text-muted`   | `--nuka-bg-base`                                                  | not verified |      | neutral-600 on neutral-0                                                                       |
| `--nuka-text-subtle`  | `--nuka-bg-base`                                                  | not verified |      | neutral-400 on neutral-0; intended for decorative/non-essential text only                      |
| `--nuka-success-text` | `--nuka-success-bg`                                               | not verified |      | success-500 on success-100                                                                     |
| `--nuka-warning-text` | `--nuka-warning-bg`                                               | not verified |      | warning-500 on warning-100                                                                     |
| `--nuka-danger-text`  | `--nuka-danger-bg`                                                | not verified |      | danger-500 on danger-100                                                                       |
| `--nuka-info-text`    | `--nuka-info-bg`                                                  | not verified |      | info-500 on info-100                                                                           |
| `--nuka-border-focus` | `--nuka-bg-emphasis` (neutral-900) under `data-surface="inverse"` | ~6.9:1       | AA   | accent-400 on neutral-900; see [Surface-level token overrides](#surface-level-token-overrides) |

### Dark theme

| Token                 | Background                                                      | Ratio        | WCAG | Notes                                                                                    |
| --------------------- | --------------------------------------------------------------- | ------------ | ---- | ---------------------------------------------------------------------------------------- |
| `--nuka-accent-text`  | `--nuka-bg-muted` (38% L)                                       | 6.74:1       | AA   | accent-300; minimum across dark surfaces                                                 |
| `--nuka-accent-fg`    | `--nuka-accent-bg` (accent-500)                                 | 7.74:1       | AAA  | same pairing as light                                                                    |
| `--nuka-success-fg`   | `--nuka-success-base` (success-250)                             | 4.65:1       | AA   | dark fg on lighter surface                                                               |
| `--nuka-warning-fg`   | `--nuka-warning-base` (warning-300)                             | 7.30:1       | AAA  | dark fg; valid on warning-base only, not warning-bg                                      |
| `--nuka-danger-fg`    | `--nuka-danger-base` (danger-250)                               | 5.04:1       | AA   | dark fg on lighter surface                                                               |
| `--nuka-info-fg`      | `--nuka-info-base` (info-300)                                   | not verified |      | dark fg on dark-mode info surface                                                        |
| `--nuka-text-base`    | `--nuka-bg-base`                                                | not verified |      | neutral-150 on dark-base (30% L)                                                         |
| `--nuka-text-muted`   | `--nuka-bg-base`                                                | not verified |      | 68% L on dark-base (30% L)                                                               |
| `--nuka-text-subtle`  | `--nuka-bg-base`                                                | not verified |      | 46% L on dark-base (30% L)                                                               |
| `--nuka-success-text` | `--nuka-success-bg`                                             | not verified |      | success-200 on success-600                                                               |
| `--nuka-warning-text` | `--nuka-warning-bg`                                             | not verified |      | warning-200 on warning-600                                                               |
| `--nuka-danger-text`  | `--nuka-danger-bg`                                              | not verified |      | danger-200 on danger-600                                                                 |
| `--nuka-info-text`    | `--nuka-info-bg`                                                | not verified |      | info-200 on info-600                                                                     |
| `--nuka-border-focus` | `--nuka-bg-emphasis` (neutral-0) under `data-surface="inverse"` | ~7.8:1       | AA   | accent-500 on white; see [Surface-level token overrides](#surface-level-token-overrides) |

### Primitive-level contrast notes

These ratios are documented on the primitives themselves in `tokens.css`:

| Primitive             | Pairing        | Ratio  | WCAG | Notes                            |
| --------------------- | -------------- | ------ | ---- | -------------------------------- |
| `--color-success-300` | neutral-950 on | 5.04:1 | AA   | dark-mode filled surface         |
| `--color-danger-300`  | neutral-950 on | 4.59:1 | AA   | dark-mode filled surface         |
| `--color-info-400`    | white on       | 4.69:1 | AA   | darkened from 55% L for contrast |

## Surface-level token overrides

Some semantic tokens need different values on dark surfaces inside a light theme (or
light surfaces inside a dark theme). The focus ring is the first case:
`--nuka-border-focus` resolves to the theme default on normal surfaces, and to an
inverted value inside any subtree marked with `data-surface="inverse"`.

### Accepted values

| Value       | Meaning                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `"inverse"` | surface contrasts with the ambient theme (dark block in a light theme, or light block in dark) |

Additional values may be added in future minor releases. Consumers should treat
`data-surface` as a closed set and only pass values listed here.

### Automatic wiring

`<Section background="emphasis">` emits `data-surface="inverse"` automatically. This
covers the common case of a dark-emphasis section inside a light page. No consumer
action required.

### Manual usage

To mark any other container:

    <div data-surface="inverse" className="bg-(--nuka-bg-emphasis)">
      <Button>Focusable</Button>
    </div>

### Interaction with data-theme

`data-surface` and `data-theme` are independent and compose via the CSS cascade.
The attributes must be on different elements in the tree: the surface override
selector is `[data-theme="..."] [data-surface="inverse"]`, which requires
`data-surface` on a descendant, not on the same element. Consumers who need
inverse-on-root should nest:

    <html data-theme="dark">
      <div data-surface="inverse">...</div>
    </html>

See [ADR-050](./DECISIONS.md) for the specificity reasoning and the alternatives
that were considered.

### Tokens affected

Only `--nuka-border-focus` is redefined by `data-surface="inverse"` in this release.
Additional tokens may follow if concrete cases emerge.

## Non-color semantic tokens

These semantic tokens have no contrast obligation but are part of the themeable surface.

### Font family

| Token                 | Default                    | Purpose                      |
| --------------------- | -------------------------- | ---------------------------- |
| `--nuka-font-heading` | `var(--font-family-serif)` | Heading component            |
| `--nuka-font-body`    | `var(--font-family-sans)`  | Text, Eyebrow                |
| `--nuka-font-ui`      | `var(--font-family-sans)`  | Button, Label, form controls |
| `--nuka-font-code`    | `var(--font-family-mono)`  | Code, Kbd                    |

### Duration

| Token                        | Default                      | Purpose               |
| ---------------------------- | ---------------------------- | --------------------- |
| `--nuka-duration-fast`       | `var(--duration-fast)`       | Micro-interactions    |
| `--nuka-duration-base`       | `var(--duration-base)`       | Standard transitions  |
| `--nuka-duration-slow`       | `var(--duration-slow)`       | Panel animations      |
| `--nuka-duration-deliberate` | `var(--duration-deliberate)` | Full-page transitions |

### Z-index

| Token               | Default             | Purpose             |
| ------------------- | ------------------- | ------------------- |
| `--nuka-z-header`   | `var(--z-header)`   | Sticky headers      |
| `--nuka-z-dropdown` | `var(--z-dropdown)` | Menus, popovers     |
| `--nuka-z-modal`    | `var(--z-modal)`    | Dialogs, sheets     |
| `--nuka-z-toast`    | `var(--z-toast)`    | Toast notifications |

### Input surfaces and borders

| Token                       | Light default              | Dark default                               |
| --------------------------- | -------------------------- | ------------------------------------------ |
| `--nuka-input-bg`           | `var(--color-neutral-0)`   | `var(--color-neutral-dark-input)`          |
| `--nuka-input-bg-disabled`  | `var(--color-neutral-100)` | `var(--color-neutral-800)`                 |
| `--nuka-input-bg-readonly`  | `var(--color-neutral-50)`  | `var(--color-neutral-dark-input-readonly)` |
| `--nuka-input-border`       | `var(--color-neutral-300)` | `var(--color-neutral-700)`                 |
| `--nuka-input-border-hover` | `var(--color-neutral-400)` | `var(--color-neutral-500)`                 |

### Scrollbar

| Token                 | Light default              | Dark default                       |
| --------------------- | -------------------------- | ---------------------------------- |
| `--nuka-scroll-thumb` | `var(--color-neutral-400)` | `var(--color-neutral-dark-border)` |
| `--nuka-scroll-track` | `var(--color-neutral-100)` | `var(--color-neutral-dark-subtle)` |

Font family, duration, and z-index tokens are defined once on `:root` / `[data-theme="light"]` and
are not redefined in dark mode because their values are theme-independent.

## Safe override checklist

When overriding semantic tokens, some groups require contrast re-verification and some do not.

**Requires re-verification:**

- Accent tokens (`--nuka-accent-*`). The accent color appears as both background and text.
  Any change to hue, lightness, or chroma can break fg-on-bg contrast. Verify:
  - `--nuka-accent-fg` on `--nuka-accent-bg` (minimum 4.5:1)
  - `--nuka-accent-text` on `--nuka-bg-base` (minimum 4.5:1)
  - `--nuka-accent-text` on `--nuka-bg-muted` in dark mode

- Feedback base tokens (`--nuka-success-base`, `--nuka-warning-base`, `--nuka-danger-base`,
  `--nuka-info-base`). These serve as filled surface backgrounds for their corresponding
  `-fg` foreground tokens. Changing the base without adjusting the foreground will break
  contrast on buttons and filled badges.

- Feedback text tokens (`--nuka-success-text`, `--nuka-warning-text`, `--nuka-danger-text`,
  `--nuka-info-text`). These must contrast against their `-bg` token at 4.5:1 minimum.

**Does not require re-verification:**

- Surface tokens (`--nuka-bg-base`, `--nuka-bg-subtle`, `--nuka-bg-muted`). These affect
  background color but do not carry a direct contrast obligation. However, if you darken
  a surface significantly, verify that text tokens still contrast against it.

- Border tokens (`--nuka-border-base`, `--nuka-border-strong`). WCAG 2.2 requires 3:1 for
  UI component boundaries. The default tokens exceed this, but border overrides only
  need re-checking if the new color is very close to the background.

- Shadow tokens. No contrast obligation.

- Spacing, z-index, and overlay tokens. No contrast obligation.

## References

- Full token listing: [`src/styles/tokens.css`](../src/styles/tokens.css)
- Override patterns and component customization: [`docs/CUSTOMIZATION.md`](./CUSTOMIZATION.md)
