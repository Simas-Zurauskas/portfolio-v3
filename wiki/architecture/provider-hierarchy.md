# Provider Hierarchy

## Full Provider Tree

```
RootLayout (server)                         [src/app/layout.tsx]
│  html lang="en" suppressHydrationWarning
│  body with Geist font classes
│
└─ Registry (client boundary)               [src/app/_registry/Registry.tsx]
   │
   └─ NextThemeProvider                     next-themes
   │    attribute="data-theme"
   │    themes=['light', 'dark', 'system']
   │    enableSystem, defaultTheme="system"
   │    disableTransitionOnChange
   │
   └─ GoogleReCaptchaProvider               react-google-recaptcha-v3
   │    reCaptchaKey from NEXT_PUBLIC_RECAPTCHA_SITE_KEY
   │    script: async, defer, appended to <head>
   │
   └─ StyledRegistry                        [src/app/_registry/comps/StyledRegistry.tsx]
   │    Server: StyleSheetManager + ThemeProvider
   │    Client: ThemeProvider only
   │
   └─ GlobalStyles                          CSS reset + CSS variable definitions
   │
   └─ NextIntlClientProvider                [src/app/[locale]/layout.tsx]
        locale={locale}
        messages={messages}
```

`Registry.tsx` is the single `'use client'` directive in the layout chain. Everything above it (RootLayout) is a server component. Everything inside it runs on the client.

`NextIntlClientProvider` is technically rendered in `LocaleLayout` (a server component), but because it is passed as `children` through the client boundary, it participates in the client tree.

---

## SSR Behavior of StyledRegistry

`StyledRegistry` handles styled-components differently depending on the rendering environment:

**Server (SSR):**

```tsx
// Wraps with StyleSheetManager for style extraction
<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
</StyleSheetManager>
```

The `ServerStyleSheet` collects all CSS generated during server rendering. The `useServerInsertedHTML` hook flushes those styles into the HTML stream:

```tsx
useServerInsertedHTML(() => {
  const styles = styledComponentsStyleSheet.getStyleElement();
  styledComponentsStyleSheet.instance.clearTag();
  return <>{styles}</>;
});
```

**Client (browser):**

```tsx
// No StyleSheetManager needed -- styled-components injects directly into DOM
<ThemeProvider theme={theme}>
  <GlobalStyles />
  {children}
</ThemeProvider>
```

The environment check uses `typeof window !== 'undefined'` to branch between the two paths.

---

## Theme Object Shape

The `DefaultTheme` interface is declared in `src/types/styled-components.d.ts`:

```ts
export interface DefaultTheme {
  /** CSS variables (var(--X)) -- no flash, use for solid colors */
  colors: ColorsSet;
  /** Hex values -- use when you need alpha suffix like `#ff6b3550` */
  hex: ColorsSet;
  colorsLib: typeof colorsLib;
  scheme: ColorScheme;  // 'light' | 'dark' | 'system'
}
```

### `colors` -- CSS variable references

```ts
{
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  accent: 'var(--accent)',
  // ... 16 tokens total
}
```

These resolve at runtime through CSS custom properties set by `GlobalStyles`. They produce no flash of incorrect theme because the CSS variables are defined via `[data-theme]` selectors that `next-themes` manages.

### `hex` -- resolved hex values

```ts
// light theme
{ background: '#f8fafc', foreground: '#0f172a', accent: '#ff6b35', ... }
// dark theme
{ background: '#030712', foreground: '#f1f5f9', accent: '#ff8a5c', ... }
```

Switches based on `resolvedTheme` from `next-themes`. Only updates after mount (`mounted` state) to avoid hydration mismatch.

### `colorsLib` -- raw color palette

The full palette of named colors (`colorsLib.orange`, `colorsLib.darkBackground`, etc.) available for one-off usage outside the theme system.

### `scheme`

The raw theme setting: `'light'`, `'dark'`, or `'system'`. Distinct from `resolvedTheme` which is always `'light'` or `'dark'`.

---

## Why `hex` Values Exist

CSS variables cannot be concatenated with hex alpha suffixes in styled-components template literals:

```ts
// BROKEN -- produces "var(--accent)50" which is invalid CSS
background: ${({ theme }) => theme.colors.accent}50;

// WORKS -- produces "#ff6b3550" which is valid 8-digit hex
background: ${({ theme }) => theme.hex.accent}50;
```

The `hex` map provides real hex strings so that alpha transparency can be applied by appending a two-character hex suffix. This is the only reason both `colors` and `hex` exist -- use `colors` (CSS variables) by default, and `hex` only when alpha manipulation is needed.

---

## `suppressHydrationWarning` on `<html>`

```tsx
// src/app/layout.tsx
<html lang="en" suppressHydrationWarning>
```

`next-themes` injects a `data-theme` attribute on `<html>` via an inline script that runs before React hydration. The server-rendered HTML has no `data-theme` attribute, so React would warn about the mismatch. `suppressHydrationWarning` suppresses this specific warning.

This is the [recommended approach](https://github.com/pacocoursey/next-themes#with-app) from the `next-themes` documentation. The prop only affects the `<html>` element itself -- it does not suppress warnings for child elements.

---

## Why reCAPTCHA is a Provider

The `GoogleReCaptchaProvider` loads the reCAPTCHA v3 script and exposes an execution function via React context. The `ContactSection` component uses this context through the `useGoogleReCaptcha` hook:

```
GoogleReCaptchaProvider (in Registry)
  └─ ...
     └─ ContactSection
          useGoogleReCaptcha() → executeRecaptcha(action)
          │
          └─ POST /api/contact with { recaptchaToken }
```

reCAPTCHA v3 runs invisibly -- no user interaction is required. The provider must wrap the entire app (not just `ContactSection`) because the script needs to observe user behavior across pages to calculate a trust score.

The site key is loaded from `process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY`. The corresponding secret key is server-side only, used in the `/api/contact` route handler.

---

## Related Documentation

- [System Overview](system-overview.md) -- route architecture, middleware, component rendering model
- [Design System](../personal-workspace/design-system.md) -- color tokens, typography, spacing
