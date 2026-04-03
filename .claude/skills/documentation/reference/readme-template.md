# README Template

# vault-ui

A React component library built on Tailwind v4. Clean, composable components customizable via CSS variables and props.

## Installation

```bash
npm install vault-ui
```

## Setup

Import the styles once at your app entry point:

```tsx
import "vault-ui/styles";
```

## Usage

```tsx
import { Button } from 'vault-ui'

<Button variant="primary" intent="default">
  Save changes
</Button>

<Button variant="ghost" intent="danger">
  Delete
</Button>
```

## Theming

vault-ui uses CSS custom properties for theming. Add `data-theme="light"` or `data-theme="dark"` to your root element:

```html
<html data-theme="light"></html>
```

Override semantic tokens to customize the design system:

```css
[data-theme="light"] {
  --vault-accent-bg: oklch(44% 0.043 257);
  --vault-accent-bg-hover: oklch(37.2% 0.044 257);
}
```

See the full token reference at `src/styles/tokens.css`.

## Components

- `Button` — Actions and form submissions

## Contributing

See `docs/DECISIONS.md` for architecture decisions and `CLAUDE.md` for development conventions.

## License

MIT
