# Personal Workspace — Documentation

## What is Personal Workspace?

Personal Workspace is the bilingual (English / Lithuanian) portfolio website for Simas Zurauskas, a senior full-stack developer. Built with Next.js 15 App Router and React 19, the site presents professional services, work history, and a contact form across five main sections — Hero, Services, Process, Work, and Contact. It also includes developer-only tooling such as a multi-variant CV page with PDF export and an OG Image Studio. The site is deployed on Vercel and uses Turbopack for both development and production builds.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15.5.9 | App Router framework, API routes, SSR/SSG |
| React | 19.1.0 | UI library |
| TypeScript | 5 | Type-safe development (strict mode) |
| styled-components | 6.1.19 | CSS-in-JS styling |
| Framer Motion | 12.23.26 | Animations and transitions |
| next-intl | 4.7.0 | Internationalization (EN/LT) |
| next-themes | 0.4.6 | Light/dark theme switching |
| node-mailjet | 6.0.11 | Transactional email via Mailjet API |
| react-google-recaptcha-v3 | 1.11.0 | Spam protection for contact form |
| react-to-print | 3.2.0 | PDF export for CV page |
| keen-slider | 6.8.6 | Touch-friendly carousel/slider |
| lucide-react | 0.562.0 | Icon library |
| html-to-image | 1.11.13 | DOM-to-image capture for OG tooling |
| Vercel | — | Hosting and deployment |
| Turbopack | — | Dev server and build bundler |

## Repository Layout

```
src/
├── app/            # Next.js App Router (routes, API, layouts, providers)
│   ├── [locale]/   # Locale-based dynamic routing (EN/LT)
│   ├── api/        # API routes (contact form, etc.)
│   ├── cv/         # Dev-only CV page
│   ├── og/         # OG Image Studio
│   └── layout.tsx  # Root layout
├── screens/        # Page-level screen components
│   └── HomeScreen/ # Main page with 5 sections
│       └── sections/
│           ├── Hero/
│           ├── ServicesSection/
│           ├── ProcessSection/
│           ├── WorkSection/
│           └── ContactSection/
├── components/     # Shared UI components
│   ├── Nav/        # Navigation bar
│   ├── Footer/     # Site footer
│   ├── SectionWrapper/ # Reusable section layout wrapper
│   ├── form/       # Form primitives (Button, etc.)
│   ├── FaviconPreview.tsx
│   └── OgImageStudio.tsx
├── theme/          # Design system
│   ├── theme.ts    # Color tokens, breakpoints, spacing
│   └── GlobalStyles.tsx # Global CSS reset and base styles
├── messages/       # i18n translation files
│   ├── en.json     # English translations
│   └── lt.json     # Lithuanian translations
├── hooks/          # Custom React hooks
│   └── useAppTheme.ts # Theme access hook
├── types/          # Shared TypeScript types
├── conf.ts         # App configuration
├── i18n.ts         # Internationalization setup
└── middleware.ts   # Next.js middleware (locale detection)
```

## Documentation

| Document | Description |
|---|---|
| [Developer Profile](profile.md) | Skills, experience, industry domains, and pitch assessment guide |
| [System Overview](architecture/system-overview.md) | App Router structure, routing, server/client boundaries |
| [Provider Hierarchy](architecture/provider-hierarchy.md) | 5-layer provider nesting, SSR/CSR behavior |
| [Design System](personal-workspace/design-system.md) | 3-layer color system, responsive grid, typography |
| [Internationalization](personal-workspace/internationalization.md) | Bilingual support with next-intl |
| [Animation System](personal-workspace/animations.md) | Framer Motion patterns and performance |
| [Sections & Components](personal-workspace/sections-and-components.md) | Page composition, SectionWrapper, Nav |
| [Contact Form](personal-workspace/contact-form.md) | reCAPTCHA + Mailjet email flow |
| [CV System](personal-workspace/cv-system.md) | Dev-only CV with 4 variants and PDF export |
| [Developer Tools](personal-workspace/developer-tools.md) | OG Image Studio, Favicon Preview |
| [Configuration](personal-workspace/configuration.md) | Build tooling, env vars, deployment |

## Quick Start

### Prerequisites

- Node.js 20+
- Yarn

### Setup

```bash
# Install dependencies
yarn install

# Create environment file
cp .env.example .env
```

Populate `.env` with the following required variables:

| Variable | Purpose |
|---|---|
| `MAILJET_API_KEY` | Mailjet API public key for sending emails |
| `MAILJET_SECRET_KEY` | Mailjet API secret key |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 site key (client-side) |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v3 secret key (server-side) |

### Development

```bash
# Start dev server with Turbopack
yarn dev
```

### Production

```bash
# Build for production
yarn build

# Start production server
yarn start
```

### Lint

```bash
yarn lint
```
