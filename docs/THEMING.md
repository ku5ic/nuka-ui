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

| Token                 | Background                          | Ratio        | WCAG | Notes                                                                     |
| --------------------- | ----------------------------------- | ------------ | ---- | ------------------------------------------------------------------------- |
| `--nuka-accent-text`  | `--nuka-bg-base` (neutral-0)        | 7.74:1       | AAA  | accent-500 on white                                                       |
| `--nuka-accent-fg`    | `--nuka-accent-bg` (accent-500)     | 7.74:1       | AAA  | white on accent-500                                                       |
| `--nuka-success-fg`   | `--nuka-success-base` (success-300) | 5.51:1       | AA   | white on filled success surface                                           |
| `--nuka-warning-fg`   | `--nuka-warning-base` (warning-300) | 7.11:1       | AAA  | dark fg, amber cannot pass 4.5:1 with white                               |
| `--nuka-danger-fg`    | `--nuka-danger-base` (danger-300)   | 4.65:1       | AA   | white on filled danger surface                                            |
| `--nuka-text-base`    | `--nuka-bg-base`                    | not verified |      | neutral-900 on neutral-0                                                  |
| `--nuka-text-muted`   | `--nuka-bg-base`                    | not verified |      | neutral-600 on neutral-0                                                  |
| `--nuka-text-subtle`  | `--nuka-bg-base`                    | not verified |      | neutral-400 on neutral-0; intended for decorative/non-essential text only |
| `--nuka-success-text` | `--nuka-success-bg`                 | not verified |      | success-500 on success-100                                                |
| `--nuka-warning-text` | `--nuka-warning-bg`                 | not verified |      | warning-500 on warning-100                                                |
| `--nuka-danger-text`  | `--nuka-danger-bg`                  | not verified |      | danger-500 on danger-100                                                  |
| `--nuka-info-text`    | `--nuka-info-bg`                    | not verified |      | info-500 on info-100                                                      |

### Dark theme

| Token                 | Background                          | Ratio        | WCAG | Notes                                               |
| --------------------- | ----------------------------------- | ------------ | ---- | --------------------------------------------------- |
| `--nuka-accent-text`  | `--nuka-bg-muted` (38% L)           | 6.74:1       | AA   | accent-300; minimum across dark surfaces            |
| `--nuka-accent-fg`    | `--nuka-accent-bg` (accent-500)     | 7.74:1       | AAA  | same pairing as light                               |
| `--nuka-success-fg`   | `--nuka-success-base` (success-250) | 4.65:1       | AA   | dark fg on lighter surface                          |
| `--nuka-warning-fg`   | `--nuka-warning-base` (warning-300) | 7.30:1       | AAA  | dark fg; valid on warning-base only, not warning-bg |
| `--nuka-danger-fg`    | `--nuka-danger-base` (danger-250)   | 5.04:1       | AA   | dark fg on lighter surface                          |
| `--nuka-text-base`    | `--nuka-bg-base`                    | not verified |      | neutral-150 on dark-base (30% L)                    |
| `--nuka-text-muted`   | `--nuka-bg-base`                    | not verified |      | 68% L on dark-base (30% L)                          |
| `--nuka-text-subtle`  | `--nuka-bg-base`                    | not verified |      | 46% L on dark-base (30% L)                          |
| `--nuka-success-text` | `--nuka-success-bg`                 | not verified |      | success-200 on success-600                          |
| `--nuka-warning-text` | `--nuka-warning-bg`                 | not verified |      | warning-200 on warning-600                          |
| `--nuka-danger-text`  | `--nuka-danger-bg`                  | not verified |      | danger-200 on danger-600                            |
| `--nuka-info-text`    | `--nuka-info-bg`                    | not verified |      | info-200 on info-600                                |

### Primitive-level contrast notes

These ratios are documented on the primitives themselves in `tokens.css`:

| Primitive             | Pairing        | Ratio  | WCAG | Notes                            |
| --------------------- | -------------- | ------ | ---- | -------------------------------- |
| `--color-success-300` | neutral-950 on | 5.04:1 | AA   | dark-mode filled surface         |
| `--color-danger-300`  | neutral-950 on | 4.59:1 | AA   | dark-mode filled surface         |
| `--color-info-400`    | white on       | 4.69:1 | AA   | darkened from 55% L for contrast |

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
