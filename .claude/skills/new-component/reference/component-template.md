# Component Template

## File structure

```
src/components/<Name>/
  <Name>.tsx
  <Name>.test.tsx
  <Name>.stories.tsx
  index.ts
```

## <Name>.tsx structure

```tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from '@vault/utils/variants'
import { cn } from '@vault/utils/cn'

const <name>Variants = cva(
  [
    // base classes — applied to every instance
  ],
  {
    variants: {
      variant: {
        primary: [],
        secondary: [],
        outline: [],
        ghost: [],
        link: [],
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
      // one entry per variant × intent combination
      // group by variant: primary, secondary, outline, ghost, link
    ],
    defaultVariants: {
      variant: 'primary',
      intent: 'default',
      size: 'md',
    },
  }
)

export type <Name>VariantProps = VariantProps<typeof <name>Variants>

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
export type { <Name>Props, <Name>VariantProps } from './<Name>'
```

## Token usage

Always reference semantic tokens via CSS variable syntax:

- Background: `bg-[var(--vault-accent-bg)]`
- Text: `text-[var(--vault-text-base)]`
- Border: `border-[var(--vault-border-base)]`

Never use raw Tailwind color utilities like `bg-blue-500`.

## Intent compound variant pattern

```tsx
// primary × default
{
  variant: 'primary',
  intent: 'default',
  className: [
    'bg-[var(--vault-accent-bg)]',
    'text-[var(--vault-text-inverse)]',
    'hover:bg-[var(--vault-accent-bg-hover)]',
    'active:bg-[var(--vault-accent-bg-active)]',
  ],
},
// primary × danger
{
  variant: 'primary',
  intent: 'danger',
  className: [
    'bg-[var(--vault-danger-base)]',
    'text-[var(--vault-text-inverse)]',
    'hover:brightness-90',
    'active:brightness-80',
  ],
},
```

See `src/components/Button/Button.tsx` for all 20 compound variant combinations.
