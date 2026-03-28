# Soc Ops Workspace Instructions

This file defines always-on guidance for Copilot in this repository.

## Project Overview
- Stack: React 19 + TypeScript + Vite + Tailwind CSS v4.
- Purpose: social bingo web app for in-person events.
- Keep architecture split by responsibility:
  - UI components in `src/components/`
  - state orchestration in `src/hooks/`
  - pure game logic in `src/utils/`
  - static prompts/content in `src/data/`

## Implementation Guidelines
- Prefer small, focused React components and strongly typed props.
- Keep business logic out of JSX where possible; move reusable logic to `src/utils/`.
- Keep hook code (`src/hooks/`) responsible for state transitions and app flow.
- Preserve existing naming and folder patterns when adding files.
- Avoid broad refactors unless explicitly requested.

## Styling Guidelines
- Apply visual/theme redesign work in app UI files under `src/`.
- Do not satisfy UI/design requests by changing only docs styling in `docs/`.
- If using Tailwind, follow Tailwind v4 conventions already documented in `.github/instructions/tailwind-4.instructions.md`.

## Quality Gates
Before finishing code changes, run the relevant scripts:
- `npm run lint`
- `npm run test`
- `npm run build`

Fix issues introduced by the change before concluding.

## Testing Expectations
- Add or update Vitest tests when changing behavior in `src/utils/`.
- Prefer deterministic tests for bingo rules and board-state transformations.
- Keep tests focused on user-visible behavior and edge cases.

## Scope Safety
- Do not edit workshop content in `workshop/` unless asked.
- Do not edit CI/workflow files unless the request is about automation.
- Avoid touching generated build output in `dist/`.
