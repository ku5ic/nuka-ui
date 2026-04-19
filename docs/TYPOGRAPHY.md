# Typography Contract

This document is the sanctioned specification for typographic props across every nuka-ui component that renders text. It defines the canonical scale per axis, which components expose which axes, and the invariants that new components must satisfy.

The scale definitions here are authoritative. If a component's implementation diverges from what is documented below, fix the implementation. If the scale itself needs to change, write an ADR and update this document in the same commit.

## Why this document exists

Before this contract, typography props drifted in three directions:

1. **`as` unions differed across components.** Text accepted 8 elements; Heading accepted 6 heading levels; Eyebrow accepted 2. There was no single reference listing which elements belong where.
2. **Weight scales were partial and inconsistent.** Text and Heading exposed 4 weight values (regular/medium/semibold/bold). Eyebrow, Label, CardTitle, CardDescription, and EmptyState exposed nothing and hardcoded their own defaults. Button, Badge, Tag, Chip, Avatar, and several navigation components hardcoded `font-medium` as a Tailwind literal, bypassing the token system.
3. **Color vocabularies differed across components.** Text accepted 9 color values. Eyebrow accepted 3. Same semantic axis, different reachable set.

Individually these are three paper cuts. Together they signal an absent contract. This document removes the ambiguity.

## Canonical scale per axis

Every axis listed here has a sanctioned set of values. Components may choose not to expose an axis (hardcoded default), but when they expose it they must accept the full canonical set. Subsets are not permitted.

### Family

Four values. Consumer-facing typography (Text, Heading, Eyebrow) exposes this axis. Chrome components (Button, Badge, etc.) do not.

| Value | Token |
|-|-|
| `heading` | `var(--nuka-font-heading)` |
| `body` | `var(--nuka-font-body)` |
| `ui` | `var(--nuka-font-ui)` |
| `code` | `var(--nuka-font-code)` |

### Weight

Nine values. Matches the MDN / OpenType weight scale (CSS `font-weight: 100..900` in steps of 100). Weight 950 is intentionally excluded: per MDN it is not in the CSS specification, only Google Fonts.

| Value | Token | CSS `font-weight` |
|-|-|-|
| `thin` | `var(--font-weight-thin)` | 100 |
| `extralight` | `var(--font-weight-extralight)` | 200 |
| `light` | `var(--font-weight-light)` | 300 |
| `regular` | `var(--font-weight-regular)` | 400 |
| `medium` | `var(--font-weight-medium)` | 500 |
| `semibold` | `var(--font-weight-semibold)` | 600 |
| `bold` | `var(--font-weight-bold)` | 700 |
| `extrabold` | `var(--font-weight-extrabold)` | 800 |
| `black` | `var(--font-weight-black)` | 900 |

Every component that exposes a `weight` prop must accept all 9 values. See the exposure matrix below.

### Size

Text exposes 5 values (`xs`, `sm`, `md`, `lg`, `xl`). Heading exposes 5 values (`xl`, `2xl`, `3xl`, `4xl`, plus pairing rules with line height). Size is out of scope for this document's current revision; see component files for the authoritative scale. A future ADR will consolidate the size scale.

### Color

Nine values. Any typography component that exposes `color` must accept the full set.

| Value | Token |
|-|-|
| `base` | `var(--nuka-text-base)` |
| `muted` | `var(--nuka-text-muted)` |
| `subtle` | `var(--nuka-text-subtle)` |
| `inverse` | `var(--nuka-text-inverse)` |
| `disabled` | `var(--nuka-text-disabled)` |
| `accent` | `var(--nuka-accent-text)` |
| `danger` | `var(--nuka-danger-text)` |
| `success` | `var(--nuka-success-text)` |
| `warning` | `var(--nuka-warning-text)` |

### Align

Three values: `left`, `center`, `right`. Text exposes this. Heading does not.

### Truncate

Boolean. Text and Heading expose this. Eyebrow and Label do not.

## Text `as` element set

Text accepts the semantic phrasing and flow elements that legitimately want typographic control. 31 values in total.

### Included (31)

Block-level text: `p`, `div`, `blockquote`, `pre`, `address`
List items: `li`, `dt`, `dd`
Descriptions / captions: `figcaption`, `caption`
Inline / phrasing: `span`, `strong`, `em`, `b`, `i`, `u`, `s`, `small`, `mark`, `cite`, `q`, `abbr`, `dfn`, `samp`, `var`, `sub`, `sup`, `time`, `data`
Form-adjacent text: `label`, `legend`, `output`

### Excluded

- `summary` - interactive inside `<details>`; exposing it through Text would mask disclosure-widget semantics.
- `a` - needs a dedicated Link primitive with `href` and focus semantics. Not a Text concern.
- `button` - use `Button`.
- `code` - dedicated `Code` component exists. Routing `<code>` through Text contradicts that contract.
- `kbd` - dedicated `Kbd` component exists. Same contract-overlap reasoning as `code`. `Kbd` owns the inline-keystroke semantics with its own monospace typography and pill styling. If a consumer wants an unstyled `<kbd>` they should reach for `Kbd` without the pill variant, not Text.
- `h1` through `h6` - use `Heading`. The split is semantic (heading vs body), not stylistic.

### Context-sensitive elements in the included set

Some elements require a specific parent: `<caption>` inside `<table>`, `<legend>` inside `<fieldset>`, `<dt>` and `<dd>` inside `<dl>`, `<figcaption>` inside `<figure>`, `<li>` inside `<ol>` or `<ul>`. Browsers handle incorrect nesting by stripping the element or rendering it as inline. Correct nesting is the consumer's responsibility. Text does not validate parent context.

## Per-component exposure matrix

One row per component that renders user-visible typographic content.

| Component | family | weight | size | color | align | truncate |
|-|-|-|-|-|-|-|
| `Text` | full | full | full | full | full | yes |
| `Heading` | full | full | full | full | - | yes |
| `Eyebrow` | hardcoded `ui` | full | hardcoded `xs` | full | - | - |
| `Label` | hardcoded `body` | full | hardcoded `sm` | hardcoded `base` | - | - |
| `CardTitle` | via `Heading` | pass-through | hardcoded `xl` | via `Heading` | - | via `Heading` |
| `CardDescription` | via `Text` | pass-through | hardcoded `sm` | hardcoded `muted` | - | via `Text` |
| `EmptyState` (heading slot) | via `Text` | pass-through via `headingWeight`, default `semibold` | hardcoded `md` | hardcoded `base` | - | - |
| `EmptyState` (description slot) | via `Text` | pass-through via `descriptionWeight`, default `regular` | hardcoded `sm` | hardcoded `muted` | - | - |
| `TimelineItem` (title slot) | via `Text` | hardcoded `medium` | hardcoded `sm` | hardcoded `base` | - | - |

Legend:

- **full** - accepts the full canonical scale for the axis
- **hardcoded `X`** - always renders as `X`, no prop exposed
- **pass-through** - forwards an optional prop to an internal typography component; omission leaves the internal default in place
- **via `Component`** - the axis is inherited from an internal component instance with no override; customization requires wrapping
- **-** - axis does not apply to this component

### Chrome components do not expose typographic props

Button, Badge, Tag, Chip, Avatar, Nav / NavLink / NavTrigger, NavigationMenuLink / NavigationMenuTrigger, MenubarTrigger, SkipLink, Stepper indicators, Table headers / footers, Breadcrumb page marker, CommandMenuGroup labels, and menu labels (via `menuLabelVariants`) all hardcode their font-weight. Variation within a button group or badge row would look like a bug; the components own that decision.

Their base classes reference tokens via the arbitrary-value syntax `font-[number:var(--font-weight-<name>)]`. They do not use Tailwind font-weight utility literals (`font-medium`, `font-semibold`, etc.), which bypass the token contract.

## Invariants

New components that render text must satisfy every invariant below. Existing components that violate an invariant are bugs to be fixed, not precedents to be preserved.

### 1. Exposed props accept the full canonical scale for their axis

A `weight` prop must accept all 9 values. A `color` prop must accept all 9 values. No subsetting. Subsets encode a judgment (usually "we didn't think this was useful") that nobody remembers six months later. If a component should not expose a particular weight or color, it should not expose the prop at all.

### 2. Every weight reference uses the tokenized form

Authored class strings must use `font-[number:var(--font-weight-<name>)]`. They must not use the Tailwind utility literals:

- `font-thin`, `font-extralight`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, `font-black`

These utilities produce the correct CSS at compile time but do not track the `--font-weight-*` tokens. Consumers who retune a token value see tokenized references update; utility references do not. Mixing the two forms silently makes the tokens less meaningful.

### 3. Hardcoded typographic choices are documented here, not just in code

A component that hardcodes size, weight, color, family, align, or truncate must appear in the exposure matrix above with the hardcoded value listed. The reason the axis is not consumer-overridable lives either in this document or in the component's ADR.

### 4. Compound components reuse Text or Heading for user-visible text

Per CLAUDE.md's "Text rendered by compound component internals must use Text or Heading" rule: any text that is structural chrome of a component (titles, descriptions, slot labels) must render through Text or Heading, not through a bare `<p>` or `<span>` with inline classes. This keeps token updates propagating through the component tree.

### 5. Divergences require an ADR

If a component legitimately needs a different weight scale, different color vocabulary, or a different `as` set than this document specifies, write an ADR explaining why. Do not silently diverge.

## Rendering caveat

Exposing all 9 weight values does not guarantee visual differentiation. A weight value requires a font file that supports that weight to render as a distinct glyph set. When the loaded font lacks a requested weight:

- The browser synthesizes the glyph by interpolating or thickening a nearby weight. Synthesized glyphs are lower quality than hinted faces. They can appear blurry or ill-balanced.
- On the light end (100, 200), synthesized faces plus low-contrast text are legibility hazards. MDN explicitly notes that weights 100 and 200 may be unreadable for some users at low contrast, even on supported fonts, and recommends avoiding both unless the font is designed for them.

### Concrete example with nuka-ui's default font stack

This matters for `Heading` in particular, because its default `family` is `heading` which resolves to the system serif stack:

```
--nuka-font-heading -> var(--font-family-serif) -> ui-serif, Georgia, Cambria, serif
```

On macOS, `ui-serif` resolves to **New York** (5 hinted weights: 400, 500, 600, 700, 900). On Windows / Linux, `ui-serif` typically falls back to **Georgia** or **Cambria**, which ship with only 400 and 700. That means a default Heading with `weight="thin"`, `weight="extralight"`, or `weight="light"` often renders identical to `weight="regular"`, and `weight="extrabold"` often renders identical to `weight="bold"`.

The emitted CSS is correct in every case. Each Heading outputs a distinct `font-[number:var(--font-weight-<name>)]` class that resolves to the corresponding `--font-weight-*` token. The browser honors that `font-weight` value; the font file simply has no hinted face to render it with, so the browser synthesizes or picks the nearest available weight.

`Text` defaults to `family="body"` which resolves to `ui-sans-serif` (SF Pro on macOS, Segoe UI on Windows, etc.) and typically ships with all 9 weights, so Text renders all 9 weights visibly on the same OS where Heading cannot.

### What to do about it

- **For the library's Storybook demo:** the `Heading.AllWeights` story sets `family="body"` explicitly so all 9 weights render distinctly. A companion `AllWeightsDefaultFamily` story keeps the default serif family so the difference is visible in the docs.
- **For consumer applications:** load a webfont with full weight support and remap `--nuka-font-heading` to it, or accept that the default serif family will collapse several weights on most systems.

**The library exposes every CSS-spec weight and the tokens to reference them. Font loading is a consumer concern.** Consumers are responsible for:

- Loading font files that support the weights they use
- Auditing contrast for their chosen weight / color combinations (WCAG 2.2 AA: 4.5:1 normal, 3:1 large / UI)
- Preferring tokens (`--font-weight-*`) over component prop overrides when the intent is site-wide

## Rationale

**Why nine weights.** The CSS Fonts Module Level 4 defines `font-weight` with integer values from 1 to 1000; in practice the common named scale is the nine MDN-documented values (100..900 in steps of 100). The four-value subset (400-700) covered what Text and Heading exposed before this cluster but omitted the display-light end (100-300) and the display-heavy end (800-900). Port feedback cited 48-72px italic display numbers and 128px hero treatments that require 800 or 900. Exposing the full scale costs nothing at the token level; the alternative ("we'll add more weights when someone needs them") drifts right back to the partial-scale problem this document exists to prevent.

**Why nine colors on every typography component.** Same principle. Eyebrow accepted 3 colors before this cluster; that was a judgment call ("eyebrows usually want muted") that did not age well. Exposing all 9 matches Text and costs the library nothing. Consumers who only ever use `muted` in practice are unaffected.

**Why a written contract.** Before this cluster, the rule "new typography components should match existing ones" was implicit. It relied on developer memory and review. When components drifted (as Eyebrow did on color), nobody flagged the drift because there was no document to point at. The contract is the review target. Every future typography change cites this document or writes an ADR that amends it.

**Why chrome components hardcode weight.** A button that sometimes ships at `medium` and sometimes at `semibold` is a bug surface, not a feature. The consumer API intentionally constrains chrome to match itself. If a consumer needs a display-light button label, they are almost certainly asking for Text-as-button, not a Button prop.

## References

- [MDN font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) - canonical scale and synthesis warnings
- ADR-007 (Text polymorphism) - original `as` prop design
- ADR-036 (Eyebrow) - original component ADR, pre-contract
- ADR-046 (Semantic font family tokens) - family axis decisions
- ADR-052 (Typography contract and nine-value weight scale) - this contract's initial adoption
- [CLAUDE.md](../CLAUDE.md) - repository conventions that this contract extends
