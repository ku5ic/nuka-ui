/**
 * Element union for layout primitives that accept an `as` prop.
 *
 * Excludes interactive and form-control elements by design: a layout
 * primitive rendering as <button> would produce an invalid accessibility
 * tree. Consumers needing interactive containers should compose with the
 * appropriate component (Button, a native <a>, etc.) rather than change
 * the element of a layout primitive.
 */
export type LayoutElement =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "nav"
  | "main"
  | "header"
  | "footer"
  | "form"
  | "figure"
  | "ul"
  | "ol";
