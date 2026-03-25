# CLAUDE.md — Personal Workspace

Personal Workspace is the bilingual (EN/LT) portfolio website for Simas Zurauskas, built with Next.js 15 App Router, React 19, TypeScript, styled-components, and Framer Motion. Deployed on Vercel.

## Documentation

| Resource | Description |
|---|---|
| [wiki/README.md](wiki/README.md) | Product overview, tech stack, repository layout, and documentation index |
| [wiki/architecture/](wiki/architecture/) | System architecture — App Router structure, provider hierarchy, server/client boundaries |
| [wiki/profile.md](wiki/profile.md) | Developer profile — skills, experience, industry domains, pitch assessment guide |

> This is living documentation. It must be updated whenever significant changes are made to the codebase, APIs, integration contracts, or architecture.

## Quick Start

```bash
yarn install        # Install dependencies
yarn dev            # Start dev server (Turbopack)
yarn build          # Production build (Turbopack)
yarn lint           # Run ESLint
```

## Key Conventions

- **TypeScript strict mode** — `"strict": true` in `tsconfig.json`; all code must be fully typed.
- **styled-components** — All styling uses CSS-in-JS via styled-components. No CSS modules or Tailwind.
- **Path alias** — `@/*` maps to `src/*` (e.g., `import { theme } from "@/theme"`).
- **Turbopack** — Used for both `dev` and `build` commands (`next dev --turbopack`, `next build --turbopack`).
- **App Router** — All routing uses the Next.js 15 App Router with locale-based dynamic segments (`[locale]`).
- **Internationalization** — Bilingual EN/LT via `next-intl`; translation files live in `src/messages/`.
- **Server/client split** — Default to Server Components; use `"use client"` only when interactivity or browser APIs are required.
