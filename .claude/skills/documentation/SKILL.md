# Skill: Documentation

Writes or updates documentation for nuka-ui components, tokens, and architecture decisions.

Use this skill when adding docs for a new component, updating existing docs, or recording an architecture decision.

## Inputs Required

- `doc_type`: `component` | `token` | `decision` | `readme`
- `target`: component name, token name, decision title, or 'root'

## Process

### For component documentation

1. Read `reference/component-doc-template.md`.

2. Read the target component file in full.

3. Read the component's stories file for usage examples.

4. Create or update `src/components/<Name>/README.md`:
   - Purpose — what this component is for
   - Usage — minimal working example
   - Props table — all props with types, defaults, descriptions
   - Variant × intent matrix — what each combination looks like
   - Accessibility notes — role, keyboard behavior, ARIA attributes
   - Token customization — which `--nuka-*` tokens affect this component

5. Verify all code examples are correct by cross-referencing the component source.

### For token documentation

1. Read `reference/token-doc-template.md`.

2. Read `src/styles/tokens.css`.

3. Update `docs/tokens.md` (create if it doesn't exist):
   - List all primitive tokens by category
   - List all semantic tokens with their purpose and primitive reference
   - Note any constraints or known issues

### For architecture decisions

1. Read `docs/DECISIONS.md`.

2. Add a new ADR entry following the existing format:
   - Sequential number: `ADR-00N`
   - Date, status
   - Context — why the decision was needed
   - Decision — what was decided
   - Consequences — what changes as a result
   - Alternatives considered — what else was evaluated

3. Keep entries factual and concise. Capture the reasoning that would be lost if not written down.

### For README updates

1. Read `reference/readme-template.md`.

2. Read current `README.md` if it exists.

3. Update or create `README.md` at repo root:
   - What nuka-ui is
   - Installation
   - Usage — import CSS, import component, basic example
   - Token customization
   - Contributing
   - License

4. All code examples must be copy-paste runnable.

## Output

Documentation that is accurate, concise, and useful to a developer encountering nuka-ui for the first time. No aspirational content — only document what exists and works.
