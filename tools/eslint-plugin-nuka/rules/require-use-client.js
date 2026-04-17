"use strict";

const HOOK_NAMES = new Set([
  "useState",
  "useEffect",
  "useRef",
  "useId",
  "useMemo",
  "useCallback",
  "useReducer",
  "useLayoutEffect",
  "useContext",
]);

const EXEMPT_SUFFIXES = [
  ".context.tsx",
  ".variants.ts",
  ".types.ts",
  ".utils.ts",
  ".utils.tsx",
  ".test.ts",
  ".test.tsx",
  ".stories.tsx",
];

function isExemptFilename(filename) {
  for (const suffix of EXEMPT_SUFFIXES) {
    if (filename.endsWith(suffix)) return true;
  }
  if (filename.includes("/src/hooks/") || filename.includes("\\src\\hooks\\")) {
    return true;
  }
  return false;
}

function isUseClientDirective(node) {
  return (
    node &&
    node.type === "ExpressionStatement" &&
    node.expression &&
    node.expression.type === "Literal" &&
    node.expression.value === "use client"
  );
}

const CUSTOM_HOOK_RE = /^use[A-Z]/;

function checkParamPattern(param, setReason) {
  if (!param || param.type !== "ObjectPattern") return;
  for (const prop of param.properties) {
    if (
      prop.type === "Property" &&
      prop.key &&
      prop.key.type === "Identifier"
    ) {
      const name = prop.key.name;
      if (name === "ref") setReason("accepts a `ref` prop");
      else if (name === "asChild") setReason("accepts an `asChild` prop");
    }
  }
}

module.exports = {
  meta: {
    type: "problem",
    fixable: "code",
    schema: [],
    messages: {
      missingUseClient:
        'This file must have `"use client";` as its first statement because it {{reason}}.',
      unexpectedUseClient:
        'This file has `"use client";` but does not appear to require it. Remove the directive or explain with a comment why it is needed.',
    },
  },
  create(context) {
    const filename =
      typeof context.filename === "string"
        ? context.filename
        : typeof context.getFilename === "function"
          ? context.getFilename()
          : "";

    if (isExemptFilename(filename)) return {};

    let hasUseClient = false;
    let directiveNode = null;
    let clientReason = null;
    let seenJSX = false;
    let hasRuntimeExport = false;
    const destructuredReactHooks = new Set();

    function setReason(reason) {
      if (clientReason === null) clientReason = reason;
    }

    function checkPropsMembers(name, members) {
      if (!name.endsWith("Props")) return;
      for (const member of members) {
        if (
          (member.type === "TSPropertySignature" ||
            member.type === "TSMethodSignature") &&
          member.key &&
          member.key.type === "Identifier"
        ) {
          const memberName = member.key.name;
          if (memberName === "ref") setReason("accepts a `ref` prop");
          else if (memberName === "asChild")
            setReason("accepts an `asChild` prop");
        }
      }
    }

    function walkPropsType(name, typeNode) {
      if (!typeNode) return;
      if (typeNode.type === "TSTypeLiteral") {
        checkPropsMembers(name, typeNode.members);
      } else if (
        typeNode.type === "TSIntersectionType" ||
        typeNode.type === "TSUnionType"
      ) {
        for (const sub of typeNode.types) walkPropsType(name, sub);
      }
    }

    return {
      Program(node) {
        const first = node.body[0];
        if (isUseClientDirective(first)) {
          hasUseClient = true;
          directiveNode = first;
        }
      },
      ImportDeclaration(node) {
        const src = node.source && node.source.value;
        if (typeof src !== "string") return;
        if (src.startsWith("@nuka/hooks/")) {
          setReason("imports from `@nuka/hooks`");
        } else if (src === "@floating-ui/react") {
          setReason("imports from `@floating-ui/react`");
        } else if (src === "@nuka/utils/slot") {
          for (const spec of node.specifiers) {
            if (
              spec.type === "ImportSpecifier" &&
              spec.imported &&
              (spec.imported.name === "Slot" ||
                spec.imported.name === "composeRefs")
            ) {
              setReason("uses `Slot` or `composeRefs`");
              break;
            }
          }
        } else if (src === "react") {
          for (const spec of node.specifiers) {
            if (
              spec.type === "ImportSpecifier" &&
              spec.imported &&
              HOOK_NAMES.has(spec.imported.name)
            ) {
              destructuredReactHooks.add(spec.local.name);
            }
          }
        }
      },
      CallExpression(node) {
        const callee = node.callee;
        if (
          callee &&
          callee.type === "MemberExpression" &&
          callee.object &&
          callee.object.type === "Identifier" &&
          callee.object.name === "React" &&
          callee.property &&
          callee.property.type === "Identifier" &&
          HOOK_NAMES.has(callee.property.name)
        ) {
          setReason("calls React hooks");
          return;
        }
        if (callee && callee.type === "Identifier") {
          if (
            destructuredReactHooks.has(callee.name) ||
            CUSTOM_HOOK_RE.test(callee.name)
          ) {
            setReason("calls React hooks");
          }
        }
      },
      FunctionDeclaration(node) {
        checkParamPattern(node.params[0], setReason);
      },
      FunctionExpression(node) {
        checkParamPattern(node.params[0], setReason);
      },
      ArrowFunctionExpression(node) {
        checkParamPattern(node.params[0], setReason);
      },
      TSInterfaceDeclaration(node) {
        if (!node.id || !node.id.name) return;
        if (!node.id.name.endsWith("Props")) return;
        checkPropsMembers(node.id.name, node.body.body);
      },
      TSTypeAliasDeclaration(node) {
        if (!node.id || !node.id.name) return;
        walkPropsType(node.id.name, node.typeAnnotation);
      },
      JSXElement() {
        seenJSX = true;
      },
      JSXFragment() {
        seenJSX = true;
      },
      ExportDefaultDeclaration(node) {
        const decl = node.declaration;
        if (!decl) return;
        if (
          decl.type === "FunctionDeclaration" ||
          decl.type === "ArrowFunctionExpression" ||
          decl.type === "FunctionExpression" ||
          decl.type === "Identifier" ||
          decl.type === "CallExpression"
        ) {
          hasRuntimeExport = true;
        }
      },
      ExportNamedDeclaration(node) {
        const decl = node.declaration;
        if (!decl) return;
        if (
          decl.type === "FunctionDeclaration" ||
          decl.type === "VariableDeclaration" ||
          decl.type === "ClassDeclaration"
        ) {
          hasRuntimeExport = true;
        }
      },
      "Program:exit"(node) {
        if (!seenJSX && !hasRuntimeExport && !clientReason) return;

        if (clientReason && !hasUseClient) {
          context.report({
            node,
            loc: { line: 1, column: 0 },
            messageId: "missingUseClient",
            data: { reason: clientReason },
            fix(fixer) {
              return fixer.insertTextBefore(node, '"use client";\n\n');
            },
          });
        } else if (hasUseClient && !clientReason) {
          context.report({
            node: directiveNode,
            messageId: "unexpectedUseClient",
          });
        }
      },
    };
  },
};
