"use strict";

const { describe, it } = require("node:test");
const { RuleTester } = require("eslint");
const tsParser = require("@typescript-eslint/parser");
const rule = require("./no-sub-touch-target-sizes");

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: { jsx: true },
    },
  },
});

const VARIANTS_FILE = "src/components/Foo/Foo.variants.ts";
const NON_VARIANTS_FILE = "src/components/Foo/Foo.tsx";

ruleTester.run("no-sub-touch-target-sizes", rule, {
  valid: [
    {
      name: "variant value at h-6 passes",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva([], {",
        "  variants: { size: { md: 'h-6 w-9' } }",
        "});",
      ].join("\n"),
    },
    {
      name: "variant value at min-h-6 passes",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva([], {",
        "  variants: { size: { md: 'min-h-6 min-w-6' } }",
        "});",
      ].join("\n"),
    },
    {
      name: "arbitrary value at h-[24px] passes",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva([], {",
        "  variants: { size: { md: 'h-[24px]' } }",
        "});",
      ].join("\n"),
    },
    {
      name: "arbitrary value at h-[1.5rem] passes",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva([], {",
        "  variants: { size: { md: 'h-[1.5rem]' } }",
        "});",
      ].join("\n"),
    },
    {
      name: "sub-24 class in base array is ignored",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva(['size-4'], {",
        "  variants: { size: { md: 'h-6' } }",
        "});",
      ].join("\n"),
    },
    {
      name: "rule does not apply to non-variants file",
      filename: NON_VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva([], {",
        "  variants: { size: { md: 'h-5' } }",
        "});",
      ].join("\n"),
    },
    {
      name: "checkbox-indicator case: disabled via inline comment",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva([], {",
        "  variants: {",
        "    size: {",
        "      // eslint-disable-next-line nuka/no-sub-touch-target-sizes",
        "      md: 'size-5'",
        "    }",
        "  }",
        "});",
      ].join("\n"),
    },
  ],
  invalid: [
    {
      name: "h-5 in variant value fails",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva([], {",
        "  variants: { size: { md: 'h-5 w-9' } }",
        "});",
      ].join("\n"),
      errors: [{ messageId: "subTouchTarget", data: { cls: "h-5" } }],
    },
    {
      name: "min-h-5 in variant value fails",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva([], {",
        "  variants: { size: { md: 'min-h-5' } }",
        "});",
      ].join("\n"),
      errors: [{ messageId: "subTouchTarget", data: { cls: "min-h-5" } }],
    },
    {
      name: "arbitrary h-[20px] in variant value fails",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva([], {",
        "  variants: { size: { md: 'h-[20px]' } }",
        "});",
      ].join("\n"),
      errors: [{ messageId: "subTouchTarget", data: { cls: "h-[20px]" } }],
    },
    {
      name: "size-5 in variant value fails",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "@nuka/utils/variants";',
        "export const v = cva([], {",
        "  variants: { size: { md: 'size-5' } }",
        "});",
      ].join("\n"),
      errors: [{ messageId: "subTouchTarget", data: { cls: "size-5" } }],
    },
  ],
});
