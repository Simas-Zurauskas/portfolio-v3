# System Overview

## High-Level Architecture

```
RootLayout (server)                    [src/app/layout.tsx]
  html + body + Google Analytics
  fonts: Geist Sans, Geist Mono
  │
  └─ Registry (client boundary)        [src/app/_registry/Registry.tsx]
       NextThemeProvider
       GoogleReCaptchaProvider
       StyledRegistry
       │
       └─ LocaleLayout (server)        [src/app/[locale]/layout.tsx]
            NextIntlClientProvider
            │
            └─ Page                     [src/app/[locale]/page.tsx]
                 │
                 └─ HomeScreen          [src/screens/HomeScreen/HomeScreen.tsx]
                      Nav
                      Hero
                      ServicesSection
                      ProcessSection
                      WorkSection
                      ContactSection
                      Footer
```

The `RootLayout` is a **server component** that renders the `<html>` and `<body>` elements. It delegates all client-side concerns (theming, reCAPTCHA, styled-components) to `Registry`, which is the single `'use client'` boundary in the layout tree. See [Provider Hierarchy](provider-hierarchy.md) for details.

---

## Route Architecture

| Route | File | Type | Description |
|---|---|---|---|
| `/` | `src/app/[locale]/page.tsx` | Page (SSG) | Home page, English (default locale) |
| `/lt` | `src/app/[locale]/page.tsx` | Page (SSG) | Home page, Lithuanian |
| `/cv` | `src/app/cv/page.tsx` | Page (dev-only) | CV preview for PDF export |
| `/og` | `src/app/og/page.tsx` | Page (dev-only) | OG image design studio |
| `/api/contact` | `src/app/api/contact/route.ts` | API Route (POST) | Contact form submission via Mailjet |

### Contact API (`/api/contact`)

Accepts POST with JSON body: `{ name, email, message, recaptchaToken }`.

Pipeline:
1. Verify reCAPTCHA v3 token against Google's API (score threshold: 0.5)
2. Validate required fields and email format
3. Send HTML + plaintext email via Mailjet
4. Return `{ success: true }` or error with appropriate status code

---

## Server vs Client Components

The `'use client'` boundary is drawn at exactly one point in the layout tree: `Registry.tsx`.

| Component | Rendering | Why |
|---|---|---|
| `RootLayout` | Server | Static HTML shell, metadata, font loading |
| `Registry` | **Client** (`'use client'`) | Wraps next-themes, reCAPTCHA, styled-components -- all require browser APIs or React context |
| `LocaleLayout` | Server | Async function that loads JSON message files via dynamic `import()` |
| `HomeScreen` + all sections | Client | Marked `'use client'` -- use styled-components, `useTranslations`, `useGoogleReCaptcha` |

`LocaleLayout` is an **async** server component that sits _inside_ the client boundary. This works because it is passed as `children` (a serialized React tree), not imported directly by `Registry`.

---

## Middleware

The project uses `next-intl/middleware` for locale routing.

```ts
// src/middleware.ts
export default createMiddleware({
  locales: ['en', 'lt'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',   // /en is hidden, /lt is shown
  localeDetection: false,       // no auto-detect from Accept-Language
});
```

**`localePrefix: 'as-needed'`** means the default locale (`en`) has no URL prefix -- users see `/` instead of `/en`. The non-default locale (`lt`) is prefixed as `/lt`.

**`localeDetection: false`** disables automatic redirection based on the browser's `Accept-Language` header. Users explicitly choose their locale.

### Matcher

```ts
matcher: ['/((?!api|_next|_vercel|cv|og|.*\\..*).*)']
```

This regex **excludes** from locale processing:
- `/api/*` -- API routes
- `/_next/*` -- Next.js internals
- `/_vercel/*` -- Vercel platform routes
- `/cv` and `/og` -- dev-only pages (not locale-aware)
- Any path containing a dot (static files like `/og.png`, `/favicon.ico`)

See [Internationalization](../personal-workspace/internationalization.md) for the full i18n setup.

---

## Dev-Only Page Pattern

Both `/cv` and `/og` use an identical guard pattern:

```ts
// src/app/cv/page.tsx
const isDev = process.env.NODE_ENV === 'development';

export default function CVPage() {
  if (!isDev) notFound();
  return <CVPageClient />;
}
```

`process.env.NODE_ENV` is inlined at build time by Next.js. In production builds, `isDev` is `false` and the page immediately returns a 404 via `notFound()`. This makes the routes effectively non-existent in production without removing them from the codebase.

These pages are excluded from the middleware matcher so they bypass locale routing entirely.

---

## Static Generation

`LocaleLayout` exports `generateStaticParams` to pre-render both locale variants at build time:

```ts
// src/app/[locale]/layout.tsx
export const generateStaticParams = () => {
  return LOCALES.map((locale) => ({ locale }));
  // Returns: [{ locale: 'en' }, { locale: 'lt' }]
};
```

This produces two statically generated pages: `/` (English) and `/lt` (Lithuanian). The message JSON files are loaded at build time via dynamic `import()` in `getMessages()`, with a fallback to English if loading fails.

---

## Related Documentation

- [Provider Hierarchy](provider-hierarchy.md) -- the 5-layer provider stack inside `Registry`
- [Internationalization](../personal-workspace/internationalization.md) -- message files, `useTranslations`, locale switching
- [Configuration](../personal-workspace/configuration.md) -- environment variables, build settings
