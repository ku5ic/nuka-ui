"use strict";

// Flags Tailwind sizing classes known to produce <24 CSS px when placed
// inside a CVA `variants.<key>.<value>` string literal in a *.variants.ts
// file. Scope is narrow: the rule is a heuristic early-warning filter for
// the ground-truth regression test in tests/a11y/touch-targets.test.tsx.
// See ADR-051 and docs/ACCESSIBILITY.md.
//
// Flagged patterns on a variant size value:
//   h-1 ... h-5, h-1.5, h-2.5, h-3.5          (20 px or less)
//   min-h-1 ... min-h-5, and half steps        (same)
//   size-1 ... size-5, and half steps          (same)
//   h-[NNpx] / min-h-[...] / size-[...] where NN < 24
//   h-[Nrem] where N*16 < 24 (i.e. < 1.5rem)
//
// Ignored:
//   base (first-argument) class arrays: sub-element dimensions may live here.
//   compoundVariants entries: usually colour/state, not sizing.
//   Any line preceded by `// eslint-disable-next-line nuka/no-sub-touch-target-sizes`.

const SUB_24_SCALE = new Set([
  "0",
  "0.5",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "5",
]);

const BASIC_RE = /^(h|min-h|size)-([0-9.]+)$/;
const ARBITRARY_RE = /^(h|min-h|size)-\[(\d+(?:\.\d+)?)(px|rem)?\]$/;

function classesInString(raw) {
  return raw.split(/\s+/).filter(Boolean);
}

function isSubTouchTarget(cls) {
  const basic = BASIC_RE.exec(cls);
  if (basic) {
    return SUB_24_SCALE.has(basic[2]);
  }
  const arb = ARBITRARY_RE.exec(cls);
  if (arb) {
    const n = parseFloat(arb[2]);
    if (arb[3] === "rem") return n * 16 < 24;
    return n < 24;
  }
  return false;
}

function isVariantsProperty(property) {
  if (!property || property.type !== "Property") return false;
  if (!property.key) return false;
  if (property.key.type === "Identifier" && property.key.name === "variants") {
    return true;
  }
  if (property.key.type === "Literal" && property.key.value === "variants") {
    return true;
  }
  return false;
}

function findVariantsObject(optionsArg) {
  if (!optionsArg || optionsArg.type !== "ObjectExpression") return null;
  for (const prop of optionsArg.properties) {
    if (isVariantsProperty(prop)) {
      return prop.value && prop.value.type === "ObjectExpression"
        ? prop.value
        : null;
    }
  }
  return null;
}

// Walk variants.<key>.<value> and yield string-literal values with their AST nodes.
function* iterateVariantValues(variantsNode) {
  for (const keyProp of variantsNode.properties) {
    if (keyProp.type !== "Property") continue;
    const valueObj = keyProp.value;
    if (!valueObj || valueObj.type !== "ObjectExpression") continue;
    for (const inner of valueObj.properties) {
      if (inner.type !== "Property") continue;
      const v = inner.value;
      if (!v) continue;
      if (v.type === "Literal" && typeof v.value === "string") {
        yield { node: v, raw: v.value };
      } else if (v.type === "TemplateLiteral" && v.expressions.length === 0) {
        yield { node: v, raw: v.quasis.map((q) => q.value.cooked).join("") };
      } else if (v.type === "ArrayExpression") {
        for (const el of v.elements) {
          if (!el) continue;
          if (el.type === "Literal" && typeof el.value === "string") {
            yield { node: el, raw: el.value };
          } else if (
            el.type === "TemplateLiteral" &&
            el.expressions.length === 0
          ) {
            yield {
              node: el,
              raw: el.quasis.map((q) => q.value.cooked).join(""),
            };
          }
        }
      }
    }
  }
}

module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      subTouchTarget:
        "Class '{{cls}}' produces a target below 24 CSS px. WCAG 2.5.8 AA requires interactive primitives to present >=24x24 touch targets. See docs/ACCESSIBILITY.md.",
    },
  },
  create(context) {
    const filename =
      typeof context.filename === "string"
        ? context.filename
        : typeof context.getFilename === "function"
          ? context.getFilename()
          : "";

    if (!filename.endsWith(".variants.ts")) return {};

    return {
      CallExpression(node) {
        if (!node.callee || node.callee.type !== "Identifier") return;
        if (node.callee.name !== "cva") return;
        const variantsNode = findVariantsObject(node.arguments[1]);
        if (!variantsNode) return;

        for (const { node: strNode, raw } of iterateVariantValues(
          variantsNode,
        )) {
          for (const cls of classesInString(raw)) {
            if (isSubTouchTarget(cls)) {
              context.report({
                node: strNode,
                messageId: "subTouchTarget",
                data: { cls },
              });
            }
          }
        }
      },
    };
  },
};
