# Internationalization (i18n)

> How the portfolio supports English and Lithuanian using next-intl.

**Related docs:** [System Overview](../architecture/system-overview.md) | [Sections & Components](sections-and-components.md)

---

## Stack

- **next-intl v4.7.0** with `createNextIntlPlugin` wired in `next.config.ts`
- Plugin points to `./src/i18n.ts` for request-level config

```ts
// next.config.ts
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
export default withNextIntl(nextConfig);
```

---

## Locales

Two locales defined in `src/types.ts`:

```ts
export type Locale = 'en' | 'lt';
export const LOCALES: Locale[] = ['en', 'lt'];
export const DEFAULT_LOCALE: Locale = 'en';
```

| Locale | Role | URL pattern |
|--------|------|-------------|
| `en` | Default | `/` (no prefix) |
| `lt` | Lithuanian | `/lt`, `/lt/...` |

Every module that needs locale info imports `Locale`, `LOCALES`, and `DEFAULT_LOCALE` from `@/types` -- there is no second source of truth.

---

## Routing Strategy

Configured in `src/middleware.ts`:

```ts
export default createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
  localeDetection: false,
});
```

- **`localePrefix: 'as-needed'`** -- English lives at the root (`/`), Lithuanian gets the `/lt` prefix. No `/en` paths exist.
- **`localeDetection: false`** -- The browser's `Accept-Language` header is ignored. The user must switch languages manually via the LanguageSwitch component. This prevents unexpected redirects for Lithuanian-speaking browsers.

---

## Middleware

**File:** `src/middleware.ts`

The matcher regex excludes several route families:

```ts
export const config = {
  matcher: ['/((?!api|_next|_vercel|cv|og|.*\\..*).*)'],
};
```

| Excluded path | Reason |
|---------------|--------|
| `/api` | API routes -- no locale needed |
| `/_next` | Next.js internals |
| `/_vercel` | Vercel internals |
| `/cv` | CV page -- hardcoded English (dev tool) |
| `/og` | OG image dev page -- hardcoded English |
| `.*\\..*` | Static files (images, fonts, etc.) |

The CV and OG pages are intentionally outside the i18n system. See [Excluded Routes](#excluded-routes).

---

## Message Loading

Messages are loaded in two places:

### 1. Server-side: `src/i18n.ts` (request config)

```ts
export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale as Locale)) {
    locale = defaultLocale; // fallback to English
  }
  const messages = (await import(`./messages/${locale}.json`)).default;
  return { messages, locale: locale as Locale };
});
```

### 2. Layout-level: `src/app/[locale]/layout.tsx`

```ts
const getMessages = async (locale: string) => {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    return (await import(`../../messages/en.json`)).default; // English fallback
  }
};
```

The layout validates the locale against `LOCALES`, returns `notFound()` for invalid values, then wraps children in `NextIntlClientProvider`:

```tsx
<NextIntlClientProvider locale={locale} messages={messages}>
  {children}
</NextIntlClientProvider>
```

Both layers use dynamic `import()` to load only the requested locale's JSON. English is always the fallback if a locale file fails to load.

---

## Type Safety

**File:** `src/global.d.ts`

```ts
import en from './messages/en.json';

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

This augments next-intl's `IntlMessages` interface with the exact shape of `en.json`. As a result:

- `useTranslations('Nav')` knows that valid keys are `SERVICES`, `PROCESS`, `WORK`, `CONTACT`, `AVAILABLE`, `EMAIL_ME`
- Accessing `t('NONEXISTENT')` produces a TypeScript error
- Nested paths like `t('FORM.NAME_LABEL')` are type-checked

The Lithuanian file (`lt.json`) must maintain the same structure -- any missing keys will fall through to English at runtime but won't be caught at compile time.

---

## Message File Structure

**Files:** `src/messages/en.json`, `src/messages/lt.json`

### Top-level keys

| Key | Section |
|-----|---------|
| `Nav` | Navigation labels |
| `Common` | Shared UI strings (copy, theme labels) |
| `Hero` | Hero section content + marquee items + metrics |
| `Services` | Service titles, descriptions, title segments |
| `Process` | Phase titles/descriptions/durations, commitment cards |
| `Work` | Project descriptions, highlights, industry chips |
| `Contact` | Form labels/placeholders, reCAPTCHA notice |
| `Footer` | Footer text, credential info, link groups |
| `ImageSlider` | Slider UI strings |

### TitleLine pattern

Section titles use a structured array format to support multi-style rendering:

```json
"TITLE": [
  [{ "text": "How I Can" }],
  [
    { "text": "Help", "type": "accent" },
    { "text": " you ship", "type": "muted" }
  ]
]
```

Each title is an array of **lines**, where each line is an array of **segments**:

| `type` | Rendering | Purpose |
|--------|-----------|---------|
| `"normal"` (or omitted) | Default foreground color | Primary text |
| `"accent"` | Theme accent color with underline highlight | Emphasis word |
| `"muted"` | Lighter weight, muted color | Supporting text |

This pattern is consumed by `SectionWrapper` via `t.raw('TITLE')`, which returns the raw JSON array without string interpolation.

---

## LanguageSwitch Component

**File:** `src/components/Nav/comps/LanguageSwitch.tsx`

A client component that renders `EN` / `LT` toggle buttons. Switching logic:

1. Get the current `pathname` from Next.js router
2. Strip any existing locale prefix (`/lt`, `/lt/...`) from the path
3. Construct the new path:
   - Switching to `en` (default): use the bare path (no prefix)
   - Switching to `lt`: prepend `/lt` to the path
4. Call `router.push(newPath)`

```ts
// Simplified logic
let pathWithoutLocale = pathname;
for (const loc of LOCALES) {
  if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
    pathWithoutLocale = pathname.slice(`/${loc}`.length) || '/';
    break;
  }
}

const newPath = newLocale === DEFAULT_LOCALE
  ? pathWithoutLocale
  : `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
```

The active locale button gets a filled foreground/background treatment; inactive buttons are muted text.

---

## Excluded Routes

The `/cv` and `/og` routes are excluded from the middleware matcher, meaning they:

- Do not receive locale routing
- Are not wrapped in `NextIntlClientProvider`
- Always render in English

This is intentional, not a gap. These are developer/utility pages (CV export, OG image preview) where multilingual support adds no value.
