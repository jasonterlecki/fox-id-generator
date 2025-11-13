# Repository Guidelines

## Project Structure & Module Organization
This repo is a Vite + React + TypeScript app. Core UI logic and helpers live in `src/`, with `main.tsx` bootstrapping the root and `App.tsx` housing the fox ID generator, icon registry, and export utilities. Global styles sit in `src/index.css`, while component-specific tweaks live in `App.css`; Tailwind utility classes stay inline in JSX. Place reusable media or JSON snippets under `src/assets/` so Vite treats them as modules. Use `public/` for passthrough static files (favicons, manifest). Tooling configs (`vite.config.ts`, `tsconfig*.json`, `tailwind.config.js`, `eslint.config.js`) at the repo root define builds—update them instead of duplicating settings inside components.

## Build, Test, and Development Commands
```bash
npm run dev       # Start the Vite dev server (see start.sh to expose via --host)
npm run build     # Type-check with tsc and emit the production bundle
npm run preview   # Serve the production build locally for smoke testing
npm run lint      # Run ESLint across src/ and config files
```
Keep `node` and `npm` versions aligned with the lockfile; use `npm install` for dependency changes so `package-lock.json` stays authoritative.

## Coding Style & Naming Conventions
Follow the existing 2-space indentation, semicolons, and double quotes enforced by ESLint. Components and hooks use PascalCase (`FoxCardPreview`), while helpers/constants are camelCase (`toast`, `ICON_LIBRARY`). Co-locate small utilities near their components unless shared broadly, in which case create a folder inside `src/lib/`. Tailwind class lists should group layout → color → effects for readability; prefer descriptive data keys (`theme`, `roles`) over positional arrays. Run `npm run lint` before committing to keep import order and React Hooks rules intact.

## Testing Guidelines
Automated tests are not yet configured; start by adding Vitest + React Testing Library and colocate specs beside components as `*.test.tsx`. Aim to cover critical flows: default form state, icon selection, PNG export triggers, and theme switching. Until a test runner ships, treat `npm run lint` and manual `npm run preview` checks as the minimum gate. When adding tests, ensure deterministic data (stub timers, DOM APIs) and document any required mocks inside the spec.

## Commit & Pull Request Guidelines
History currently uses short, capitalized subject lines (“Initial copy…”). Keep commits focused, limit subjects to 72 characters, and use the imperative mood (“Add fox theme preset”). For pull requests, include: purpose, screenshots or GIFs for UI shifts (front and back card), testing evidence (`npm run build`, new specs), and linked issues if applicable. Flag any config or dependency changes, and note follow-up work in the PR description so reviewers can triage backlog items quickly.

## Security & Configuration Tips
No secrets are stored here; keep API tokens out of the repo and inject them via Vite env files (`.env.local`, ignored by default). When demoing on a shared network, prefer `./start.sh` to launch `npm run dev -- --host` so collaborators can preview without extra flags, but stop the server when done because it binds to all interfaces.
