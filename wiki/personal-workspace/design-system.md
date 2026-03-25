# Design System

This document describes the visual foundation of the portfolio-v3 project: colors, theming, typography, layout grid, responsive breakpoints, global styles, and the Button component API.

---

## 1. Color System -- 3 Layers

The color system is built in three layers, each serving a different purpose. All definitions live in `src/theme/theme.ts`.

### Layer 1: `colorsLib` -- Raw Hex Palette

A flat object of every raw hex value in the project. These are **never used directly in components** -- they exist solely as the source of truth that feeds the semantic layer.

| Token | Hex | Role |
|---|---|---|
| `white` | `#ffffff` | Pure white |
| `black` | `#030712` | Near-black (blue-slate tint) |
| **Light theme** | | |
| `lightBackground` | `#f8fafc` | Light page background |
| `lightForeground` | `#0f172a` | Light primary text |
| `lightMuted` | `#64748b` | Light secondary text |
| `lightBorder` | `#e2e8f0` | Light borders / dividers |
| `lightSurface` | `#ffffff` | Light card / elevated surface |
| `lightSurfaceAlt` | `#f1f5f9` | Light alternate surface |
| **Dark theme** | | |
| `darkBackground` | `#030712` | Dark page background |
| `darkForeground` | `#f1f5f9` | Dark primary text |
| `darkMuted` | `#94a3b8` | Dark secondary text |
| `darkBorder` | `#1e293b` | Dark borders / dividers |
| `darkSurface` | `#0f172a` | Dark card / elevated surface |
| `darkSurfaceAlt` | `#1e293b` | Dark alternate surface |
| **Accent -- orange** | | |
| `orange` | `#ff6b35` | Primary accent |
| `orangeHover` | `#ff5722` | Accent hover state |
| `orangeLight` | `#ff8a5c` | Lighter accent (dark-mode primary) |
| `orangeMuted` | `#fff0eb` | Accent background tint |
| **Secondary -- slate** | | |
| `slate` | `#64748b` | Neutral secondary |
| `slateLight` | `#94a3b8` | Lighter slate |
| `slateDark` | `#475569` | Darker slate |
| **Tertiary -- blue** | | |
| `blue` | `#0ea5e9` | Blue accent (orange complement) |
| `blueLight` | `#38bdf8` | Lighter blue |
| `blueMuted` | `#e0f2fe` | Blue background tint |
| **Status -- green** | | |
| `green` | `#22c55e` | Success |
| `greenLight` | `#4ade80` | Lighter success |
| `greenDark` | `#16a34a` | Darker success |
| `greenMuted` | `#dcfce7` | Success background tint |
| **Status -- red** | | |
| `red` | `#ef4444` | Error |
| `redLight` | `#f87171` | Lighter error |
| `redDark` | `#dc2626` | Darker error |
| `redMuted` | `#fee2e2` | Error background tint |

### Layer 2: `themeColors` -- Semantic Mapping

`themeColors` is typed as `Record<'light' | 'dark', ColorsSet>`. It maps 16 semantic names to `colorsLib` values for each scheme.

| Semantic Token | Light | Dark |
|---|---|---|
| `background` | `lightBackground` `#f8fafc` | `darkBackground` `#030712` |
| `foreground` | `lightForeground` `#0f172a` | `darkForeground` `#f1f5f9` |
| `muted` | `lightMuted` `#64748b` | `darkMuted` `#94a3b8` |
| `border` | `lightBorder` `#e2e8f0` | `darkBorder` `#1e293b` |
| `surface` | `lightSurface` `#ffffff` | `darkSurface` `#0f172a` |
| `surfaceAlt` | `lightSurfaceAlt` `#f1f5f9` | `darkSurfaceAlt` `#1e293b` |
| `accent` | `orange` `#ff6b35` | `orangeLight` `#ff8a5c` |
| `accentHover` | `orangeHover` `#ff5722` | `orange` `#ff6b35` |
| `accentMuted` | `orangeMuted` `#fff0eb` | `darkSurfaceAlt` `#1e293b` |
| `secondary` | `blue` `#0ea5e9` | `blueLight` `#38bdf8` |
| `secondaryHover` | `blueLight` `#38bdf8` | `blue` `#0ea5e9` |
| `secondaryMuted` | `blueMuted` `#e0f2fe` | `blueMuted` `#e0f2fe` |
| `success` | `green` `#22c55e` | `greenLight` `#4ade80` |
| `successMuted` | `greenMuted` `#dcfce7` | `greenDark` `#16a34a` |
| `error` | `red` `#ef4444` | `redLight` `#f87171` |
| `errorMuted` | `redMuted` `#fee2e2` | `redDark` `#dc2626` |

`themeColors` is consumed by `GlobalStyles` to populate CSS custom properties.

### Layer 3: `cssColors` -- CSS Variable References

`cssColors` is a `ColorsSet` where every value is a `var(--<name>)` string. This is the **primary way components reference colors** because CSS variables switch automatically when the theme changes -- no re-render required, no flash of wrong color.

| Property | CSS Variable |
|---|---|
| `background` | `var(--background)` |
| `foreground` | `var(--foreground)` |
| `muted` | `var(--muted)` |
| `border` | `var(--border)` |
| `surface` | `var(--surface)` |
| `surfaceAlt` | `var(--surface-alt)` |
| `accent` | `var(--accent)` |
| `accentHover` | `var(--accent-hover)` |
| `accentMuted` | `var(--accent-muted)` |
| `secondary` | `var(--secondary)` |
| `secondaryHover` | `var(--secondary-hover)` |
| `secondaryMuted` | `var(--secondary-muted)` |
| `success` | `var(--success)` |
| `successMuted` | `var(--success-muted)` |
| `error` | `var(--error)` |
| `errorMuted` | `var(--error-muted)` |

### Usage Examples in Styled-Components

The styled-components `DefaultTheme` (declared in `src/types/styled-components.d.ts`) exposes three objects:

```ts
interface DefaultTheme {
  /** CSS variables -- use for solid colors (no flash, automatic switching) */
  colors: ColorsSet;
  /** Resolved hex values -- use when you need alpha suffixes like ${hex}50 */
  hex: ColorsSet;
  /** Full raw palette */
  colorsLib: typeof colorsLib;
  scheme: ColorScheme;
}
```

**`theme.colors` (CSS variables) -- default choice:**

```ts
const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};
`;
```

**`theme.hex` (resolved hex) -- when you need alpha channels:**

```ts
const Overlay = styled.div`
  /* Append alpha hex -- CSS variables can't do this */
  box-shadow: 0 10px 30px ${({ theme }) => theme.hex.accent}25;
`;
```

**`theme.colorsLib` (raw palette) -- escape hatch for one-off values:**

```ts
const Badge = styled.span`
  background: ${({ theme }) => theme.colorsLib.greenDark};
`;
```

---

## 2. Dark Mode

Dark mode is driven by CSS custom properties, toggled via the `data-theme` attribute on the `<html>` element.

**Mechanism:**

1. `next-themes` is configured with `attribute="data-theme"` in the provider hierarchy.
2. `GlobalStyles` sets light-mode values on `:root` and overrides them inside `[data-theme="dark"], .dark`.
3. Because all component styles reference `var(--*)`, the entire UI re-themes instantly when the attribute changes -- no React re-render needed for CSS-driven values.

```css
/* Simplified from GlobalStyles */
:root {
  --background: #f8fafc;
  --foreground: #0f172a;
  /* ... 14 more tokens */
}

[data-theme="dark"],
.dark {
  --background: #030712;
  --foreground: #f1f5f9;
  /* ... 14 more tokens */
}
```

See [Provider Hierarchy](../architecture/provider-hierarchy.md) for the full wrapper stack.

---

## 3. `useAppTheme` Hook

**File:** `src/hooks/useAppTheme.ts`

For cases where CSS variables cannot be used (Framer Motion `animate` values, canvas drawing, dynamic JavaScript calculations), the `useAppTheme` hook resolves the current CSS variable values to concrete hex strings at runtime.

### How It Works

1. Calls `getComputedStyle(document.documentElement)` to read all 16 `--*` properties.
2. Watches for theme changes via a `MutationObserver` on the `data-theme` attribute of `document.documentElement`.
3. Updates state inside `useLayoutEffect` (synchronous, avoids a flash frame).
4. Falls back to `themeColors.light` during SSR (`typeof window === 'undefined'`).

### Return Value

```ts
const theme = useAppTheme();

theme.colors   // ColorsSet -- resolved hex from getComputedStyle (e.g. "#ff6b35")
theme.hex      // ColorsSet -- from themeColors[scheme] (same hex values, static lookup)
theme.colorsLib // Raw colorsLib palette
theme.scheme   // 'light' | 'dark' | 'system'
```

### When to Use Each Property

| Need | Use |
|---|---|
| Styled-component `color`, `background`, `border` | `theme.colors.*` (CSS variables via theme context) |
| Framer Motion `animate={{ color: ... }}` | `theme.colors.*` from `useAppTheme()` (resolved hex) |
| Box-shadow / gradient with alpha suffix | `theme.hex.*` + alpha hex (`${theme.hex.accent}25`) |
| One-off raw color | `theme.colorsLib.*` |

---

## 4. Responsive Breakpoints

The project uses seven breakpoints, applied directly as `@media (max-width: Xpx)` rules in styled-components. There is no breakpoint abstraction object -- values are written inline.

| Breakpoint | Width | Primary purpose |
|---|---|---|
| `1200px` | Large desktop | Grid column count reductions (e.g. project cards 5 -> 4 columns) |
| `1024px` | Tablet landscape | Sidebar gutters shrink 80px -> 60px; Hero internal layout collapses to single column |
| `768px` | Tablet portrait | Sidebar gutters shrink 60px -> 40px; section `min-height` switches to `100svh`; sidebar text font shrinks |
| `600px` | Large phone | Service items, process steps, project cards, and footer reflow to stacked layouts |
| `480px` | Phone | Sidebar gutters hidden (0px); grid lines removed; section corners hidden; main content padding becomes `80px 20px 60px`; Button `sm` increases to 44px min-height for touch targets |
| `400px` | Small phone | Nav subtitle hidden |
| `360px` | Extra-small phone | Hero mobile metrics grid collapses from 4 to 2 columns |

### Example

```ts
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
```

---

## 5. Grid System

The layout uses a three-column CSS grid with decorative sidebar gutters. Two variants exist.

### Standard Section Grid (`SectionWrapper`)

**File:** `src/components/SectionWrapper/SectionWrapper.tsx`

```
|  sidebar  |        main content        |  sidebar  |
|   80px    |            1fr             |   80px    |
```

```css
grid-template-columns: 80px 1fr 80px;
```

| Breakpoint | Columns | Notes |
|---|---|---|
| Desktop (> 1024px) | `80px 1fr 80px` | Full sidebar gutters with vertical grid lines |
| Tablet (1024px) | `60px 1fr 60px` | Narrower gutters |
| Tablet portrait (768px) | `40px 1fr 40px` | Narrower gutters; `min-height: 100svh` |
| Phone (480px) | `0 1fr 0` | Sidebars hidden; grid lines and corner decorations removed |

Sidebar gutters contain a sticky, vertically-rotated label (`writing-mode: vertical-rl`) centered at `top: 50vh`. Pseudo-elements (`::before` / `::after`) draw 1px vertical grid lines at the inner edge of each sidebar.

The `$alternate` prop swaps the background from `theme.colors.background` to `theme.colors.surface` and changes corner/index styling for visual rhythm.

### Hero Grid

**File:** `src/screens/HomeScreen/sections/Hero/Hero.tsx`

The Hero uses a two-column grid (content + right sidebar only):

```css
grid-template-columns: minmax(0, 1fr) 80px;
```

| Breakpoint | Columns |
|---|---|
| Desktop (> 1024px) | `minmax(0, 1fr) 80px` |
| Tablet (1024px) | `minmax(0, 1fr) 60px` |
| Tablet portrait (768px) | `minmax(0, 1fr) 40px` |
| Phone (480px) | `1fr` (sidebar removed) |

---

## 6. Typography

### Primary Fonts (site-wide)

Loaded in `src/app/layout.tsx` via `next/font/google`:

```ts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
```

Both CSS variable classes are applied to `<body>`:

```tsx
<body className={`${geistSans.variable} ${geistMono.variable}`}>
```

`GlobalStyles` sets the default body font:

```css
body {
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}
```

| Variable | Font | Usage |
|---|---|---|
| `--font-geist-sans` | Geist Sans | All body text, headings, UI elements |
| `--font-geist-mono` | Geist Mono | Code snippets, monospace elements |

### CV Page Font

**File:** `src/app/cv/comps/CVPageClient/CVPageClient.tsx`

The CV page uses **Inter** loaded via `@fontsource/inter` (weights 400, 500, 600, 700) for PDF-export compatibility. A Google Fonts `@import` fallback is included in the print stylesheet to ensure the exported PDF retains typography even when `@fontsource` bundles are not available.

```ts
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
```

Font stack for CV: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

---

## 7. GlobalStyles

**File:** `src/theme/GlobalStyles.tsx`

`GlobalStyles` is a `createGlobalStyle` component that sets CSS variables, resets, and global behavior rules.

### CSS Reset

- `* { box-sizing: border-box; padding: 0; margin: 0; }` -- universal reset.
- `a { color: inherit; text-decoration: none; }` -- unstyled links.
- `button { font-family: inherit; cursor: pointer; }` -- inherits body font.
- `img { max-width: 100%; height: auto; }` -- responsive images.

### Scroll Behavior

- `html { scroll-behavior: smooth; }` -- smooth anchor scrolling.
- `html, body { overflow-x: clip; }` -- prevents horizontal overflow while preserving `position: sticky` (unlike `overflow: hidden` which breaks sticky positioning).

### Accessibility

- **Focus-visible outlines:** `2px solid var(--accent)` with `2px` offset on `:focus-visible`. Outlines are removed for mouse users (`:focus:not(:focus-visible)`).
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` forces all animation and transition durations to `0.01ms` (not `0ms`, which some browsers ignore), sets `scroll-behavior: auto`, and limits animation iterations to 1.
- **Touch targets:** `@media (pointer: coarse)` enforces `min-height: 44px` on `input`, `select`, and `textarea` elements.

### Performance Hints

- GPU acceleration on animated elements: `[data-framer-component-type], [style*="transform"] { will-change: transform; backface-visibility: hidden; }`.
- iOS touch scrolling: `-webkit-overflow-scrolling: touch` on `body`.
- Text rendering: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale`.

### Misc

- **reCAPTCHA badge:** `.grecaptcha-badge { display: none !important; }` -- hidden because branding text is shown inline in the contact form.
- **Selection styling:** `::selection { background: var(--accent); color: #f8fafc; }` -- accent-colored text selection.
- **Text size adjust:** `-webkit-text-size-adjust: 100%` prevents font inflation on orientation change.
- **Tap highlight:** `-webkit-tap-highlight-color: transparent` on links and buttons removes the default mobile tap flash.

---

## 8. Button Component API

**File:** `src/components/form/Button.tsx`

A styled `<button>` element with variant and size support. Uses transient props (`$variant`, `$size`, etc.) to avoid DOM pollution.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls padding and min-height |
| `loading` | `boolean` | `false` | Shows a spinner and disables the button |
| `icon` | `React.ReactNode` | -- | Optional icon element (16x16 SVG) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Which side of the label the icon appears |
| `fullWidth` | `boolean` | `false` | Stretches button to `width: 100%` |
| `disabled` | `boolean` | -- | Standard HTML disabled (also set when `loading` is true) |
| ...rest | `ButtonHTMLAttributes` | -- | All native button attributes are forwarded |

### Variants

**`primary`:** Solid foreground background, inverted text color. On hover, background transitions to the accent color with a subtle lift (`translateY(-2px)`) and an accent-tinted box shadow.

```ts
background: ${({ theme }) => theme.colors.foreground};
color: ${({ theme }) => theme.colors.background};

&:hover:not(:disabled) {
  background: ${({ theme }) => theme.colors.accent};
  transform: translateY(-2px);
  box-shadow: 0 10px 30px ${({ theme }) => theme.hex.accent}25;
}
```

**`ghost`:** Transparent background with a 2px border. On hover, border darkens to foreground color and background fills with `surfaceAlt`.

```ts
background: transparent;
color: ${({ theme }) => theme.colors.foreground};
border: 2px solid ${({ theme }) => theme.colors.border};

&:hover:not(:disabled) {
  border-color: ${({ theme }) => theme.colors.foreground};
  background: ${({ theme }) => theme.colors.surfaceAlt};
}
```

### Sizes

| Size | Padding | Font Size | Min-Height | Mobile (480px) Min-Height |
|---|---|---|---|---|
| `sm` | `10px 20px` | `0.65rem` | `40px` | `44px` |
| `md` | `14px 28px` | `0.7rem` | `48px` | `48px` |
| `lg` | `18px 36px` | `0.75rem` | `56px` | `52px` |

### Shared Easing

All button transitions use the cubic-bezier easing `[0.16, 1, 0.3, 1]` -- an ease-out curve with a strong deceleration that matches the animation easing used throughout the project (see [Animation System](animations.md)):

```css
transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
```

### Loading State

When `loading` is `true`, the button content is replaced with a 14x14 CSS spinner (2px `currentColor` border, transparent top) rotating at `0.8s linear infinite`. The button is simultaneously disabled.

### Disabled State

Disabled buttons receive `opacity: 0.6`, `cursor: not-allowed`, and all hover transforms/shadows are suppressed.

---

## Cross-References

- [Provider Hierarchy](../architecture/provider-hierarchy.md) -- how `ThemeProvider`, `next-themes`, and `GlobalStyles` are wired together
- [Sections & Components](sections-and-components.md) -- component catalog with section-level layout details
- [Animation System](animations.md) -- shared easing curves, Framer Motion variants, and intersection-triggered animations
