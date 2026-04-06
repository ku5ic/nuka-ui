# Component Documentation Template

## <ComponentName>

One sentence describing what this component is and when to use it.

## Usage

```tsx
import { ComponentName } from "nuka-ui";
import "nuka-ui/styles";

<ComponentName variant="primary" intent="default">
  Label
</ComponentName>;
```

## Props

| Prop        | Type                                                         | Default     | Description                               |
| ----------- | ------------------------------------------------------------ | ----------- | ----------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link'` | `'primary'` | Visual weight                             |
| `intent`    | `'default' \| 'danger' \| 'success' \| 'warning'`            | `'default'` | Semantic color                            |
| `size`      | `'sm' \| 'md' \| 'lg'`                                       | `'md'`      | Size scale                                |
| `asChild`   | `boolean`                                                    | `false`     | Render as child element via Radix Slot    |
| `disabled`  | `boolean`                                                    | `false`     | Disabled state                            |
| `className` | `string`                                                     | -           | Additional CSS classes, merged via `cn()` |
| `ref`       | `React.Ref<HTMLElement>`                                     | -           | Forwarded to the root element             |

Extends all native `<element>` HTML attributes.

## Variant x Intent matrix

|           | default                      | danger                       | success                       | warning                       |
| --------- | ---------------------------- | ---------------------------- | ----------------------------- | ----------------------------- |
| primary   | Filled accent                | Filled red                   | Filled green                  | Filled amber                  |
| secondary | Muted bg + border            | Danger bg + border           | Success bg + border           | Warning bg + border           |
| outline   | Transparent + accent border  | Transparent + danger border  | Transparent + success border  | Transparent + warning border  |
| ghost     | Transparent, hover muted     | Transparent, hover danger    | Transparent, hover success    | Transparent, hover warning    |
| link      | Accent text, hover underline | Danger text, hover underline | Success text, hover underline | Warning text, hover underline |

## Accessibility

- **Role:** `button` (or inherited from child when `asChild` is true)
- **Keyboard:** Tab to focus, Enter or Space to activate
- **Focus:** `focus-visible` outline using `--nuka-border-focus`
- **Disabled:** Native `disabled` attribute: removes from tab order, suppresses events

## Token customization

Override these semantic tokens to customize appearance:

```css
[data-theme="light"] {
  --nuka-accent-bg: /* your color */;
  --nuka-accent-bg-hover: /* your color */;
  --nuka-accent-bg-active: /* your color */;
  --nuka-accent-text: /* your color */;
}
```

All `--nuka-*` tokens are available for override. See `src/styles/tokens.css` for the full list.
