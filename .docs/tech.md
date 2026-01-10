# Portfolio V3 - Technical Specification

## Tech Stack

| Category        | Technology                | Version   |
| --------------- | ------------------------- | --------- |
| Framework       | Next.js (App Router)      | 15.5.3    |
| UI Library      | React                     | 19.1.0    |
| Language        | TypeScript                | ^5        |
| Styling         | styled-components         | ^6.1.19   |
| Theme Manager   | next-themes               | ^0.4.6    |
| Animation       | framer-motion             | ^12.23.26 |
| Slider          | keen-slider               | ^6.8.6    |
| Icons           | lucide-react              | ^0.562.0  |
| i18n            | next-intl                 | ^4.7.0    |
| Email           | node-mailjet              | ^6.0.11   |
| Spam Protection | react-google-recaptcha-v3 | ^1.11.0   |
| Bundler         | Turbopack                 | built-in  |
| Package Manager | yarn                      | -         |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── _registry/                # Providers & SSR setup
│   │   ├── Registry.tsx          # Top-level client provider (themes, reCAPTCHA)
│   │   └── comps/
│   │       └── StyledRegistry.tsx # styled-components SSR + ThemeProvider
│   ├── [locale]/                 # i18n dynamic route
│   │   ├── layout.tsx            # Locale provider (next-intl)
│   │   └── page.tsx              # Routes → HomeScreen
│   ├── api/
│   │   └── contact/route.ts      # Contact form API (Mailjet + reCAPTCHA)
│   ├── layout.tsx                # Root layout (fonts, GA, meta)
│   ├── favicon.ico, icons...     # App icons
│   └── manifest.json             # PWA manifest
├── components/                   # Shared/reusable components
│   ├── Nav/                      # Navigation with mobile menu
│   │   ├── Nav.tsx
│   │   └── comps/
│   │       └── LanguageSwitch.tsx
│   ├── Footer/                   # Site footer
│   ├── SectionWrapper/           # Reusable section layout with sidebars
│   └── form/
│       └── Button.tsx            # Button component (variants, sizes, loading)
├── screens/                      # Page-level components
│   └── HomeScreen/
│       ├── HomeScreen.tsx
│       └── sections/
│           ├── Hero/             # Hero with metrics, floating shapes
│           ├── ServicesSection/  # Services list with parallax
│           │   └── comps/
│           │       └── ServiceItemWithParallax.tsx
│           ├── WorkSection/      # Projects bento grid
│           │   ├── types.ts      # Project type definitions
│           │   └── comps/
│           │       ├── ProjectCard.tsx
│           │       └── ImageSlider.tsx
│           └── ContactSection/   # Contact form
├── hooks/
│   └── useAppTheme.ts            # Theme hook with computed CSS colors
├── theme/
│   ├── theme.ts                  # Color definitions & theme config
│   ├── GlobalStyles.tsx          # CSS variables & global reset
│   └── index.ts
├── messages/                     # i18n translations
│   ├── en.json
│   └── lt.json
├── conf.ts                       # App constants (email, stats)
├── types.ts                      # Locale types
├── i18n.ts                       # next-intl config
├── middleware.ts                 # i18n middleware
└── types/
    └── styled-components.d.ts    # Theme type augmentation
```

---

## Environment Variables

```bash
# Required for contact form
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key

# Required for reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

---

## Key Features

### 1. Internationalization (i18n)

- **Locales:** `en` (default), `lt` (Lithuanian)
- **Library:** next-intl
- **URL Strategy:** `localePrefix: 'as-needed'` (no `/en` prefix for default)
- **Detection:** Manual only (no browser auto-detect)

```tsx
// Usage in components
import { useTranslations } from 'next-intl';
const t = useTranslations('Nav');
t('SERVICES'); // "Services"
```

### 2. Contact Form

- **Email Provider:** Mailjet
- **Spam Protection:** Google reCAPTCHA v3 (invisible, score-based)
- **Score Threshold:** 0.5 (configurable in `route.ts`)
- **Features:** HTML email templates, reply-to sender

### 3. Analytics

- **Provider:** Google Analytics 4
- **Tracking ID:** `G-1SENQVYX6C`
- **Loading Strategy:** `afterInteractive`

### 4. Responsive Breakpoints

| Breakpoint | Width      | Sidebar    |
| ---------- | ---------- | ---------- |
| Desktop    | > 1024px   | 80px       |
| Tablet     | 768-1024px | 60px       |
| Mobile+    | 480-768px  | 40px       |
| Mobile     | < 480px    | 0 (hidden) |

---

## Theming System

### Color Schemes

`light` | `dark` | `system`

### Theme Object Shape

```ts
interface DefaultTheme {
  colors: ColorsSet; // CSS variables: var(--X)
  hex: ColorsSet; // Hex values for current theme (supports alpha)
  colorsLib: typeof colorsLib; // Static hex values
  scheme: ColorScheme;
}
```

### Color Tokens

| Token       | Light   | Dark    | CSS Variable          |
| ----------- | ------- | ------- | --------------------- |
| background  | #f8fafc | #030712 | `var(--background)`   |
| foreground  | #0f172a | #f1f5f9 | `var(--foreground)`   |
| muted       | #64748b | #94a3b8 | `var(--muted)`        |
| border      | #e2e8f0 | #1e293b | `var(--border)`       |
| surface     | #ffffff | #0f172a | `var(--surface)`      |
| surfaceAlt  | #f1f5f9 | #1e293b | `var(--surface-alt)`  |
| accent      | #ff6b35 | #ff8a5c | `var(--accent)`       |
| accentHover | #ff5722 | #ff6b35 | `var(--accent-hover)` |
| secondary   | #0ea5e9 | #38bdf8 | `var(--secondary)`    |
| success     | #22c55e | #4ade80 | `var(--success)`      |
| error       | #ef4444 | #f87171 | `var(--error)`        |

### Using Colors in Styled-Components

```tsx
// CSS variables (no flash, instant)
background: ${({ theme }) => theme.colors.background};
color: ${({ theme }) => theme.colors.accent};

// Hex values with alpha (theme-reactive)
border: 1px solid ${({ theme }) => theme.hex.accent}50;
box-shadow: 0 0 10px ${({ theme }) => theme.hex.accent}25;

// Static colors (not theme-reactive)
border: 1px solid ${({ theme }) => theme.colorsLib.blue}40;
```

**When to use which:**

- `theme.colors.*` → CSS variables, no flash, solid colors
- `theme.hex.*` → When you need alpha transparency (e.g., `}50`)
- `theme.colorsLib.*` → Static colors that don't change with theme

---

## Provider Hierarchy

```
RootLayout
└── Registry (client)
    └── NextThemeProvider (next-themes)
        └── GoogleReCaptchaProvider
            └── StyledRegistry
                └── ThemeProvider (styled-components)
                    └── GlobalStyles
                        └── [locale]/layout
                            └── NextIntlClientProvider
                                └── {children}
```

---

## Component Patterns

### Recursive Folder Structure

```
ComponentName/
├── ComponentName.tsx   # Main component
├── index.ts            # Barrel export
├── types.ts            # Optional: component-specific types
└── comps/              # Optional: child components
    └── ChildComponent/
        ├── ChildComponent.tsx
        └── index.ts
```

### Styled-Components Naming

```tsx
// No conflict → use element name
const Section = styled.section`...`;
const Card = styled.article`...`;

// Conflict with component name → prefix with Styled
const StyledNav = styled.nav`...`; // Component is Nav
```

### BEM Class Naming

```tsx
const Section = styled.section`
  .hero {
    &__content { ... }
    &__title {
      &--accent { color: ${({ theme }) => theme.colors.accent}; }
    }
  }
`;
```

### Barrel Exports

```ts
// ComponentName/index.ts
export * from './ComponentName';

// Usage
import { ComponentName } from './ComponentName';
```

---

## Data Types

### Project (WorkSection)

```ts
type Project = {
  id: string;
  title: string;
  description: string;
  industry: string;
  tech: string[];
  highlights: string[];
  images?: string[]; // Image URLs for slider
  size?: 'regular' | 'wide' | 'tall' | 'large'; // Bento grid size
  link?: string; // External link
  linkLabel?: string; // Custom link label
};
```

### Service (ServicesSection)

```ts
type Service = {
  index: string; // "01", "02", etc.
  title: string;
  description: string;
  tech: string[];
  projectCount: number;
  credential?: {
    title: string;
    issuer: string;
    year?: string;
  };
};
```

---

## Animation Guidelines

### Framer Motion Variants

```tsx
// Smooth ease for all animations
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Reveal animation
const revealUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

// Staggered children
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
```

### Usage

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-50px' }}
  variants={revealUpVariants}
>
```

---

## Button Component

### Variants

| Variant   | Description                           |
| --------- | ------------------------------------- |
| `primary` | Solid foreground, accent on hover     |
| `ghost`   | Transparent, border, surface on hover |

### Sizes

| Size | Padding   | Font Size | Min Height |
| ---- | --------- | --------- | ---------- |
| `sm` | 10px 20px | 0.65rem   | 40px       |
| `md` | 14px 28px | 0.7rem    | 48px       |
| `lg` | 18px 36px | 0.75rem   | 56px       |

### Props

```tsx
interface ButtonProps {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}
```

---

## App Configuration

```ts
// src/conf.ts
export const EMAIL = 'hello@simaszurauskas.com';
export const COUNT_YEARS = 5;
export const COUNT_PROJECTS = 40;
export const COUNT_CLIENTS = 15;
export const COUNT_DOMAINS = 10;
```

---

## Conventions

1. **Screens** compose the page from sections
2. **Recursive pattern**: Sections and components follow `ComponentName.tsx` + `index.ts` + optional `types.ts` + optional `comps/`
3. **`comps/`** holds child components; each can nest further
4. **`types.ts`** holds component-specific TypeScript types
5. **Components** (`src/components/`) are shared/reusable across screens
6. **BEM** for all styled-component class names
7. **`'use client'`** directive on interactive components
8. **Barrel exports** via `index.ts` in every folder
9. **Colors**: Use `theme.colors.*` for CSS vars, `theme.hex.*` for alpha support
10. **z-index**: Always pair with `position: relative` or `position: absolute`
11. **Touch targets**: Minimum 44px on mobile for interactive elements
12. **Fonts**: Geist Sans (body), Geist Mono (code) via `next/font`

---

## Scripts

```bash
yarn dev      # Start dev server with Turbopack
yarn build    # Production build with Turbopack
yarn start    # Start production server
yarn lint     # Run ESLint
```
