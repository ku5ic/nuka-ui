/**
 * CVA conventions for nuka-ui components
 *
 * Structure every component's variants file as follows:
 *
 *   1. Import cva and VariantProps from 'class-variance-authority'
 *   2. Define the base classes (always applied)
 *   3. Define variants (mutually exclusive options per axis)
 *   4. Define compoundVariants (classes applied when multiple variants combine)
 *   5. Define defaultVariants
 *   6. Export the VariantProps type alongside the cva instance
 *
 * Naming:
 *   - cva instance: <componentName>Variants  (e.g. buttonVariants)
 *   - props type:   <ComponentName>VariantProps  (e.g. ButtonVariantProps)
 *
 * Token usage:
 *   - Always reference CSS custom properties, never raw Tailwind color utilities
 *   - Correct:   bg-(--nuka-accent-bg)
 *   - Incorrect: bg-blue-500
 *
 * Class ordering within a variant value:
 *   - Layout first, then visual, then interactive
 *   - e.g. 'px-4 py-2 rounded-md bg-(--nuka-accent-bg) hover:bg-(--nuka-accent-bg-hover)'
 */

export { cva, type VariantProps } from "class-variance-authority";
