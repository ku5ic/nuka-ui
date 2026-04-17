"use strict";

const { describe, it } = require("node:test");
const { RuleTester } = require("eslint");
const tsParser = require("@typescript-eslint/parser");
const rule = require("./require-use-client");

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

const COMPONENT_FILE = "src/components/Foo/Foo.tsx";
const UTILS_FILE = "src/utils/foo.tsx";
const VARIANTS_FILE = "src/components/Foo/Foo.variants.ts";
const CONTEXT_FILE = "src/components/Foo/Foo.context.tsx";

ruleTester.run("require-use-client", rule, {
  valid: [
    {
      name: "directive present, hook used (React.useState)",
      filename: COMPONENT_FILE,
      code: [
        '"use client";',
        "",
        'import * as React from "react";',
        "export function Foo() {",
        "  const [s] = React.useState(0);",
        "  return <div>{s}</div>;",
        "}",
      ].join("\n"),
    },
    {
      name: "directive present, ref prop on Props interface",
      filename: COMPONENT_FILE,
      code: [
        '"use client";',
        "",
        'import * as React from "react";',
        "export interface FooProps {",
        "  ref?: React.Ref<HTMLDivElement>;",
        "}",
        "export function Foo(props: FooProps) {",
        "  return <div ref={props.ref} />;",
        "}",
      ].join("\n"),
    },
    {
      name: "directive present, asChild prop on Props interface",
      filename: COMPONENT_FILE,
      code: [
        '"use client";',
        "",
        'import * as React from "react";',
        "export interface FooProps {",
        "  asChild?: boolean;",
        "}",
        "export function Foo(props: FooProps) {",
        "  return <div data-aschild={props.asChild ? 1 : 0} />;",
        "}",
      ].join("\n"),
    },
    {
      name: "directive present, Slot import from @nuka/utils/slot",
      filename: COMPONENT_FILE,
      code: [
        '"use client";',
        "",
        'import * as React from "react";',
        'import { Slot } from "@nuka/utils/slot";',
        "export function Foo() {",
        "  return <Slot><div /></Slot>;",
        "}",
      ].join("\n"),
    },
    {
      name: "no directive, no client-requiring indicators (pure JSX)",
      filename: COMPONENT_FILE,
      code: [
        'import * as React from "react";',
        "export function Foo() {",
        "  return <div>Hello</div>;",
        "}",
      ].join("\n"),
    },
    {
      name: "directive present, ref destructured from imported Props type",
      filename: COMPONENT_FILE,
      code: [
        '"use client";',
        "",
        'import * as React from "react";',
        'import type { FooProps } from "@nuka/components/Foo/Foo.types";',
        "function Foo({ ref, className }: FooProps) {",
        "  return <div ref={ref} className={className} />;",
        "}",
        "export { Foo };",
      ].join("\n"),
    },
    {
      name: "directive present, custom useXxx hook call",
      filename: COMPONENT_FILE,
      code: [
        '"use client";',
        "",
        'import * as React from "react";',
        'import { useFooContext } from "@nuka/components/Foo/Foo.context";',
        "export function Foo() {",
        "  const ctx = useFooContext();",
        "  return <div>{ctx.value}</div>;",
        "}",
      ].join("\n"),
    },
    {
      name: "variants file is exempt",
      filename: VARIANTS_FILE,
      code: [
        'import { cva } from "class-variance-authority";',
        'export const fooVariants = cva("base", {',
        "  variants: { size: { sm: \"text-sm\" } },",
        "});",
      ].join("\n"),
    },
    {
      name: "context file is exempt",
      filename: CONTEXT_FILE,
      code: [
        'import * as React from "react";',
        "export const FooContext = React.createContext<null>(null);",
        "export function useFooContext() {",
        "  return React.useContext(FooContext);",
        "}",
      ].join("\n"),
    },
  ],
  invalid: [
    {
      name: "missing-use-client: hook usage without directive",
      filename: COMPONENT_FILE,
      code: [
        'import * as React from "react";',
        "export function Foo() {",
        "  const [s] = React.useState(0);",
        "  return <div>{s}</div>;",
        "}",
      ].join("\n"),
      errors: [{ messageId: "missingUseClient" }],
      output: [
        '"use client";',
        "",
        'import * as React from "react";',
        "export function Foo() {",
        "  const [s] = React.useState(0);",
        "  return <div>{s}</div>;",
        "}",
      ].join("\n"),
    },
    {
      name: "missing-use-client: ref prop without directive",
      filename: COMPONENT_FILE,
      code: [
        'import * as React from "react";',
        "export interface FooProps {",
        "  ref?: React.Ref<HTMLDivElement>;",
        "}",
        "export function Foo(props: FooProps) {",
        "  return <div ref={props.ref} />;",
        "}",
      ].join("\n"),
      errors: [{ messageId: "missingUseClient" }],
      output: [
        '"use client";',
        "",
        'import * as React from "react";',
        "export interface FooProps {",
        "  ref?: React.Ref<HTMLDivElement>;",
        "}",
        "export function Foo(props: FooProps) {",
        "  return <div ref={props.ref} />;",
        "}",
      ].join("\n"),
    },
    {
      name: "missing-use-client: asChild prop without directive",
      filename: COMPONENT_FILE,
      code: [
        'import * as React from "react";',
        "export interface FooProps {",
        "  asChild?: boolean;",
        "}",
        "export function Foo(props: FooProps) {",
        "  return <div data-aschild={props.asChild ? 1 : 0} />;",
        "}",
      ].join("\n"),
      errors: [{ messageId: "missingUseClient" }],
      output: [
        '"use client";',
        "",
        'import * as React from "react";',
        "export interface FooProps {",
        "  asChild?: boolean;",
        "}",
        "export function Foo(props: FooProps) {",
        "  return <div data-aschild={props.asChild ? 1 : 0} />;",
        "}",
      ].join("\n"),
    },
    {
      name: "missing-use-client: Slot import without directive",
      filename: COMPONENT_FILE,
      code: [
        'import * as React from "react";',
        'import { Slot } from "@nuka/utils/slot";',
        "export function Foo() {",
        "  return <Slot><div /></Slot>;",
        "}",
      ].join("\n"),
      errors: [{ messageId: "missingUseClient" }],
      output: [
        '"use client";',
        "",
        'import * as React from "react";',
        'import { Slot } from "@nuka/utils/slot";',
        "export function Foo() {",
        "  return <Slot><div /></Slot>;",
        "}",
      ].join("\n"),
    },
    {
      name: "missing-use-client: @nuka/hooks import without directive",
      filename: UTILS_FILE,
      code: [
        'import { useFoo } from "@nuka/hooks/use-foo";',
        "export function bar() {",
        "  return useFoo();",
        "}",
      ].join("\n"),
      errors: [{ messageId: "missingUseClient" }],
      output: [
        '"use client";',
        "",
        'import { useFoo } from "@nuka/hooks/use-foo";',
        "export function bar() {",
        "  return useFoo();",
        "}",
      ].join("\n"),
    },
    {
      name: "missing-use-client: ref destructured from imported Props type",
      filename: COMPONENT_FILE,
      code: [
        'import * as React from "react";',
        'import type { FooProps } from "@nuka/components/Foo/Foo.types";',
        "function Foo({ ref, className }: FooProps) {",
        "  return <div ref={ref} className={className} />;",
        "}",
        "export { Foo };",
      ].join("\n"),
      errors: [{ messageId: "missingUseClient" }],
      output: [
        '"use client";',
        "",
        'import * as React from "react";',
        'import type { FooProps } from "@nuka/components/Foo/Foo.types";',
        "function Foo({ ref, className }: FooProps) {",
        "  return <div ref={ref} className={className} />;",
        "}",
        "export { Foo };",
      ].join("\n"),
    },
    {
      name: "missing-use-client: custom useXxx hook call without directive",
      filename: COMPONENT_FILE,
      code: [
        'import * as React from "react";',
        'import { useFooContext } from "@nuka/components/Foo/Foo.context";',
        "export function Foo() {",
        "  const ctx = useFooContext();",
        "  return <div>{ctx.value}</div>;",
        "}",
      ].join("\n"),
      errors: [{ messageId: "missingUseClient" }],
      output: [
        '"use client";',
        "",
        'import * as React from "react";',
        'import { useFooContext } from "@nuka/components/Foo/Foo.context";',
        "export function Foo() {",
        "  const ctx = useFooContext();",
        "  return <div>{ctx.value}</div>;",
        "}",
      ].join("\n"),
    },
    {
      name: "unexpected-use-client: directive without any client-requiring indicator",
      filename: COMPONENT_FILE,
      code: [
        '"use client";',
        "",
        'import * as React from "react";',
        "export function Foo() {",
        "  return <div>Hello</div>;",
        "}",
      ].join("\n"),
      errors: [{ messageId: "unexpectedUseClient" }],
    },
  ],
});
