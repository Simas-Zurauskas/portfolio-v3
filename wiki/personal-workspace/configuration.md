# Configuration

This document covers all build tooling, compiler settings, code-style rules, environment variables, and deployment details for the portfolio-v3 project.

See also: [System Overview](../architecture/system-overview.md) | [Contact Form](contact-form.md)

---

## Next.js Configuration

**File:** `next.config.ts`

The configuration is wrapped by `createNextIntlPlugin('./src/i18n.ts')` to enable internationalization routing and message loading before the rest of the Next.js pipeline runs.

| Option | Value | Purpose |
|---|---|---|
| `compiler.styledComponents` | `true` | Enables the SWC styled-components transform so class names are deterministic and styles are correctly extracted during SSR. |
| `images.remotePatterns` | `https://media.istockphoto.com` | Allows `next/image` to optimise and serve images from the iStockPhoto CDN. |

The final config object is exported through `withNextIntl(nextConfig)`, which injects the i18n middleware and message resolution layer.

---

## TypeScript

**File:** `tsconfig.json`

| Option | Value | Notes |
|---|---|---|
| `target` | `ES2017` | Matches modern browser baselines while keeping `async`/`await` native. |
| `module` | `esnext` | Emits ESM; bundler handles the rest. |
| `moduleResolution` | `bundler` | Uses the bundler-native resolution algorithm (Node 16+ / bundler style). |
| `strict` | `true` | Enables all strict type-checking flags. |
| `jsx` | `preserve` | Leaves JSX untouched for Next.js / SWC to transform. |
| `incremental` | `true` | Speeds up subsequent type checks with `.tsbuildinfo` caching. |
| `noEmit` | `true` | TypeScript is used for type checking only; Next.js handles compilation. |

**Path alias:** `@/*` maps to `./src/*`, so imports look like `import Foo from '@/components/Foo'`.

**Next.js plugin:** The `"next"` compiler plugin is registered under `compilerOptions.plugins` to provide route-level type checking and enhanced IDE support.

---

## Package Scripts

**File:** `package.json`

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev --turbopack` | Starts the development server with Turbopack for fast incremental compilation. |
| `build` | `next build --turbopack` | Creates an optimised production build using Turbopack. |
| `start` | `next start` | Serves the production build on the default port (3000). |
| `lint` | `eslint` | Runs ESLint across the project using the flat config. |

---

## ESLint

**File:** `eslint.config.mjs`

The project uses the **flat config format** (ESLint 9+). Legacy shareable configs are bridged through `@eslint/eslintrc`'s `FlatCompat` helper.

**Extends:**

- `next/core-web-vitals` -- enforces Core Web Vitals best practices (accessibility, performance, SEO rules).
- `next/typescript` -- adds TypeScript-aware linting rules from `eslint-config-next`.

**Ignored paths:**

- `node_modules/**`
- `.next/**`
- `out/**`
- `build/**`
- `next-env.d.ts`

---

## Prettier

**File:** `.prettierrc`

| Option | Value |
|---|---|
| `printWidth` | `120` |
| `singleQuote` | `true` |
| `jsxSingleQuote` | `false` |
| `trailingComma` | `all` |
| `semi` | `true` |
| `tabWidth` | `2` |
| `useTabs` | `false` |
| `endOfLine` | `lf` |
| `bracketSpacing` | `true` |
| `bracketSameLine` | `false` |
| `proseWrap` | `preserve` |

---

## Environment Variables

All environment variables must be set in `.env.local` (or through the Vercel dashboard for deployed environments). None of these are committed to source control.

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Client | reCAPTCHA v3 site key embedded in the browser bundle. |
| `RECAPTCHA_SECRET_KEY` | Server | reCAPTCHA v3 secret used to verify tokens server-side. |
| `MAILJET_API_KEY` | Server | Mailjet API public key for sending transactional email. |
| `MAILJET_SECRET_KEY` | Server | Mailjet API secret key paired with the public key above. |

> Variables prefixed with `NEXT_PUBLIC_` are inlined into the client bundle at build time. All others are available only in server-side code (API routes, server components, server actions).

For details on how these variables are consumed, see [Contact Form](contact-form.md).

---

## Google Analytics

**File:** `src/app/layout.tsx`

Google Analytics 4 is loaded in the root layout with tracking ID **`G-1SENQVYX6C`**.

Two `<Script>` tags from `next/script` are used, both with the `afterInteractive` strategy so they do not block the initial page render:

1. The gtag.js library loader (`https://www.googletagmanager.com/gtag/js?id=G-1SENQVYX6C`).
2. An inline script that initialises the data layer and calls `gtag('config', ...)`.

---

## PWA Manifest

**File:** `src/app/manifest.json`

| Property | Value |
|---|---|
| `name` | `MyWebSite` |
| `short_name` | `MySite` |
| `display` | `standalone` |
| `theme_color` | `#ffffff` |
| `background_color` | `#ffffff` |

**Icons:**

| Size | File | Purpose |
|---|---|---|
| 192x192 | `/web-app-manifest-192x192.png` | `maskable` |
| 512x512 | `/web-app-manifest-512x512.png` | `maskable` |

---

## Deployment

The project is deployed on **Vercel**.

- A `.vercel/` directory exists in the repo root (auto-generated by the Vercel CLI); no custom `vercel.json` is present.
- Vercel auto-detects the Next.js framework and applies its default build and routing pipeline.
- **Package manager:** Yarn (`yarn.lock` is committed). Vercel will detect and use Yarn automatically.

---

## Key Dependencies

### Runtime

| Package | Version | Purpose |
|---|---|---|
| `next` | 15.5.9 | React meta-framework (App Router, SSR, API routes, image optimisation). |
| `react` / `react-dom` | 19.1.0 | UI library (React 19 with concurrent features). |
| `styled-components` | ^6.1.19 | CSS-in-JS styling with SSR support via SWC plugin. |
| `framer-motion` | ^12.23.26 | Declarative animations and layout transitions. |
| `next-intl` | ^4.7.0 | Internationalisation (i18n) -- routing, message loading, formatting. |
| `next-themes` | ^0.4.6 | Light/dark theme switching with SSR-safe hydration. |
| `node-mailjet` | ^6.0.11 | Server-side Mailjet SDK for sending transactional emails. |
| `react-google-recaptcha-v3` | ^1.11.0 | Client-side reCAPTCHA v3 integration (invisible challenge). |
| `react-to-print` | ^3.2.0 | Trigger browser print dialogs for specific components (CV export). |
| `keen-slider` | ^6.8.6 | Lightweight, touch-friendly slider/carousel. |
| `lucide-react` | ^0.562.0 | Icon library (tree-shakeable SVG icons). |
| `html-to-image` | ^1.11.13 | Converts DOM nodes to PNG/JPEG/SVG for image export. |
| `@fontsource/crimson-text` | ^5.2.7 | Self-hosted Crimson Text serif font. |
| `@fontsource/inter` | ^5.2.8 | Self-hosted Inter sans-serif font. |

### Development

| Package | Version | Purpose |
|---|---|---|
| `typescript` | ^5 | TypeScript compiler (type checking only; SWC compiles). |
| `eslint` | ^9 | Linter (flat config format). |
| `eslint-config-next` | 15.5.9 | Next.js ESLint preset (core-web-vitals + TypeScript rules). |
| `@eslint/eslintrc` | ^3 | Compatibility layer for legacy ESLint configs in flat config. |
| `@types/node` | ^20 | Node.js type definitions. |
| `@types/react` / `@types/react-dom` | ^19 | React 19 type definitions. |
