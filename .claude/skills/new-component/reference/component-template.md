# Component Template

## File structure

```
src/components/<Name>/
  <Name>.tsx
  <Name>.variants.ts
  <Name>.test.tsx
  <Name>.stories.tsx
  index.ts
```

## <Name>.variants.ts structure

```tsx
import { cva, type VariantProps } from '@nuka/utils/variants'

export const <name>Variants = cva(
  [
    // base classes: applied to every instance
  ],
  {
    variants: {
      variant: {
        // variant values are component-specific:
        //   Button uses: primary, secondary, outline, ghost, link
        //   Badge/Chip/Tag use: solid, subtle, outline
        // Choose the set that fits the component's role.
      },
      intent: {
        default: '',
        danger: '',
        success: '',
        warning: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      // one entry per variant x intent combination
      // group by variant
    ],
    defaultVariants: {
      variant: '<first-variant>',
      intent: 'default',
      size: 'md',
    },
  }
)

export type <Name>VariantProps = VariantProps<typeof <name>Variants>
```

## <Name>.tsx structure

```tsx
import * as React from 'react'
import { Slot } from '@nuka/utils/slot'
import { cn } from '@nuka/utils/cn'
import {
  <name>Variants,
  type <Name>VariantProps,
} from '@nuka/components/<Name>/<Name>.variants'

export interface <Name>Props
  extends React.HTMLAttributes<HTMLElement>,
    <Name>VariantProps {
  asChild?: boolean
}

const <Name> = React.forwardRef<<HTMLElement>, <Name>Props>(
  ({ className, variant, intent, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : '<element>'

    return (
      <Comp
        ref={ref}
        className={cn(<name>Variants({ variant, intent, size }), className)}
        {...props}
      />
    )
  }
)

<Name>.displayName = '<Name>'

export { <Name>, <name>Variants }
```

## index.ts structure

```ts
export { <Name>, <name>Variants } from './<Name>'
export type { <Name>Props } from './<Name>'
export { <name>Variants } from '@nuka/components/<Name>/<Name>.variants'
export type { <Name>VariantProps } from '@nuka/components/<Name>/<Name>.variants'
```

## Token usage

Always reference semantic tokens via CSS variable syntax:

- Background: `bg-(--nuka-accent-bg)`
- Text: `text-(--nuka-text-base)`
- Border: `border-(--nuka-border-base)`

Never use raw Tailwind color utilities like `bg-blue-500`.

## Intent compound variant pattern

```tsx
// primary x default
{
  variant: 'primary',
  intent: 'default',
  className: [
    'bg-(--nuka-accent-bg)',
    'text-(--nuka-text-inverse)',
    'hover:bg-(--nuka-accent-bg-hover)',
    'active:bg-(--nuka-accent-bg-active)',
  ],
},
// primary x danger
{
  variant: 'primary',
  intent: 'danger',
  className: [
    'bg-(--nuka-danger-base)',
    'text-(--nuka-text-inverse)',
    'hover:brightness-90',
    'active:brightness-80',
  ],
},
```

See `src/components/Button/Button.variants.ts` for all 20 compound variant combinations.
