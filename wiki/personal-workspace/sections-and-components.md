# Sections & Components

> Page composition, section architecture, and component inventory for the portfolio home page.

**Related docs:** [Design System](design-system.md) | [Animation System](animations.md) | [Internationalization](internationalization.md)

---

## HomeScreen Composition

**File:** `src/screens/HomeScreen/HomeScreen.tsx`

The single-page portfolio renders all sections sequentially inside a `<main>` element:

```tsx
<Main>          {/* min-height: 100vh */}
  <Nav />
  <Hero />
  <ServicesSection />
  <ProcessSection />
  <WorkSection />
  <ContactSection />
  <Footer />
</Main>
```

All sections except Hero use `SectionWrapper` as their outer shell. The Hero has a completely custom layout.

---

## SectionWrapper

**File:** `src/components/SectionWrapper/SectionWrapper.tsx`

A reusable section shell that provides the site's signature 3-column grid layout (sidebar | content | sidebar) with decorative elements and scroll-triggered animations.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | -- | Scroll target for nav links (e.g., `"services"`) |
| `index` | `string` | -- | Large background number (e.g., `"01"`) |
| `label` | `string` | -- | Overline text with animated gradient line |
| `title` | `TitleLine[]` | -- | Styled multi-line heading (see below) |
| `sidebarText` | `string` | -- | Vertical text in left sidebar |
| `sidebarRightText` | `string` | -- | Vertical text in right sidebar |
| `alternate` | `boolean` | `false` | Swaps background/surface colors |
| `showCorners` | `boolean` | `true` | Corner bracket decorations (top-left, bottom-right) |
| `showAccentBar` | `boolean` | `true` | Gradient accent line at section bottom |
| `showDivider` | `boolean` | `true` | Gradient divider below title |

### Grid Structure

```
| 80px sidebar | flexible content | 80px sidebar |
```

Responsive breakpoints: 80px -> 60px (1024px) -> 40px (768px) -> 0px (480px, sidebars hidden).

### Title Rendering

The `title` prop accepts `TitleLine[]` -- an array of lines, each containing typed segments:

```ts
type TitleSegment = { text: string; type?: 'normal' | 'accent' | 'muted' };
type TitleLine = TitleSegment[];
```

Segments render as:
- **normal** (default): plain foreground text
- **accent**: theme accent color with a translucent underline highlight (`TitleAccent`)
- **muted**: lighter weight, muted color (`TitleMuted`)

### Animation Orchestration

The main content area uses Framer Motion's `whileInView` with a parent `containerVariants` that staggers children:

1. **Label** fades in, gradient line expands left-to-right
2. **Title lines** slide in from the left, staggered per line
3. **Divider** scales horizontally
4. **Content** (children) fades up

Viewport trigger: `{ once: true, margin: '-100px' }`.

### Usage Example

```tsx
<SectionWrapper
  id="services"
  index="01"
  label={t('LABEL')}
  title={t.raw('TITLE')}
  sidebarText={t('SIDEBAR_LEFT')}
  sidebarRightText={t('SIDEBAR_RIGHT')}
>
  {/* Section-specific content */}
</SectionWrapper>
```

With `alternate` background for visual rhythm:

```tsx
<SectionWrapper
  id="work"
  index="03"
  label={t('LABEL')}
  title={title}
  sidebarText={t('SIDEBAR_LEFT')}
  sidebarRightText={t('SIDEBAR_RIGHT')}
  alternate
>
  {/* ... */}
</SectionWrapper>
```

---

## Hero Section

**File:** `src/screens/HomeScreen/sections/Hero/Hero.tsx`

The Hero does **not** use `SectionWrapper`. It has a completely custom 2-column grid:

```
| Main content area (1fr) | Right metrics sidebar (80px) |
```

### Features

- **Spotlight effect** -- a radial gradient that follows mouse position via direct DOM manipulation (`transform` on a ref), not React state
- **Floating shapes** -- 3 overlapping rectangles with mouse-proximity parallax (spring physics via Framer Motion's `useSpring`), floating vertical oscillation
- **Animated counters** -- years, projects, clients count up on load using `useMotionValue` + `animate`
- **Tech marquee** -- CSS-only infinite scroll (`animation: marquee-scroll 33s linear infinite`) with items from `Hero.MARQUEE.ITEMS` messages plus interpolated stat strings
- **Mobile metrics** -- below 480px the right sidebar hides and metrics appear inline as a 4-column grid

The title is hardcoded ("I build / Software") rather than pulled from messages, with a sketch-mark grid overlay on the "ware" segment.

---

## Section Inventory

### ServicesSection

**File:** `src/screens/HomeScreen/sections/ServicesSection/ServicesSection.tsx`

- **8 service items**: Web, Mobile, AI, Backend, Design, UI/UX Implementation, Consulting, Existing Projects
- Each item rendered via `ServiceItemWithParallax` with parallax index numbers (`01`--`08`)
- Data: tech pills (e.g., `['React', 'Next.js', 'TypeScript']`), project counts, and credential badges
- Title and descriptions pulled from `Services.ITEMS.{KEY}` messages
- SectionWrapper: `id="services"`, `index="01"`

### ProcessSection

**File:** `src/screens/HomeScreen/sections/ProcessSection/ProcessSection.tsx`

- **4-phase workflow**: Discovery, Design, Build, Launch
- Rendered as a horizontal `ProcessFlow` strip (stacks vertically on mobile at 800px)
- Each phase card shows: large background number, title, description, and duration footer
- **6 commitment cards** below in a 2-column grid: Iterative Delivery, Transparent Scope, No Middlemen, Full Ownership, Flexible Engagement, Post-Launch Support
- SectionWrapper: `id="process"`, `index="02"`

### WorkSection

**File:** `src/screens/HomeScreen/sections/WorkSection/WorkSection.tsx`

- **Bento grid layout**: 5 columns at desktop, responsive down to single column
- 7 projects with variable card sizes: `large` (span 5), `wide` (span 3), default (span 2)
- NDA disclaimer and industry chips (17 industries) shown above the grid
- SectionWrapper: `id="work"`, `index="03"`, `alternate` (surface background)

**ProjectCard** (`src/screens/HomeScreen/sections/WorkSection/comps/ProjectCard.tsx`):
- Image area with `ImageSlider` (keen-slider), industry badge overlay
- Role info: badge (Solo/Tech Lead/etc.), team size, scope tags
- Description, tech tags (capped at 4--6 depending on card size), highlight bullets (large cards only)
- External link button when URL is available

**ImageSlider** (`src/screens/HomeScreen/sections/WorkSection/comps/ImageSlider.tsx`):
- Powered by `keen-slider` with looping enabled
- Dot pagination and arrow navigation (appear on hover)
- **Lightbox**: expand button opens a full-screen modal via `createPortal` with its own keen-slider instance
- Escape key closes the lightbox
- Empty state: shows "Images coming soon" text

### ContactSection

**File:** `src/screens/HomeScreen/sections/ContactSection/ContactSection.tsx`

- Contact form: name, email, message fields
- **reCAPTCHA v3** integration via `react-google-recaptcha-v3` (`useGoogleReCaptcha` hook)
- Form submission POSTs to `/api/contact` with reCAPTCHA token
- Status states: idle, loading, success, error (auto-reset after 5 seconds)
- Email copy-to-clipboard button with visual feedback
- Reply time indicator ("Typical reply within 24h")
- SectionWrapper: `id="contact"`, `index="04"`

---

## Nav

**File:** `src/components/Nav/Nav.tsx`

Fixed 64px navbar with glass-morphism background (`backdrop-filter: blur(20px)`).

### Active Section Tracking

Uses `IntersectionObserver` with `rootMargin: '-40% 0px -40% 0px'` to detect when a section enters the middle 20% of the viewport. Observed sections: `services`, `process`, `work`, `contact`.

### Desktop (>1024px)

- Brand name + role subtitle (left)
- Section links with active highlight (center)
- Actions group (right): "Available" pulse indicator, LanguageSwitch, theme switcher (light/dark/system), contact CTA button

### Mobile (<=1024px)

- Brand + hamburger toggle
- Full-screen overlay menu via `createPortal` to `document.body` with `AnimatePresence` transitions
- Menu content: section links with index numbers, availability badge, theme switcher (shown only below 768px), full-width contact CTA
- Body scroll locked when menu is open

### Theme Switcher

Three buttons: Sun (light), Moon (dark), Monitor (system). Uses `next-themes` `useTheme()`. Active state: inverted foreground/background fill. Hidden in main nav below 768px; appears in mobile menu instead.

---

## Footer

**File:** `src/components/Footer/Footer.tsx`

3-column grid matching SectionWrapper's sidebar pattern (`80px | content | 80px`). Collapses to single column at 480px.

### Content

- **Brand column**: name, tagline, Turing College credential badge with hover tooltip (shows issue date and ID)
- **Navigation links**: Home, Services, Work, Contact (smooth scroll)
- **Contact links**: email with copy-to-clipboard button, LinkedIn icon link
- **Bottom bar**: copyright line + social links

---

## i18n Pattern

All visible text in sections and components is accessed via `useTranslations`:

```tsx
const t = useTranslations('Services');

// Simple string
t('LABEL')                    // "Capabilities"

// Nested key
t('ITEMS.WEB.TITLE')          // "Web Applications"

// Raw structured data (for TitleLine arrays)
t.raw('TITLE')                // [[{text, type}, ...], ...]

// Raw array data
t.raw('PROJECTS.strive.HIGHLIGHTS')  // ["4 AI agents...", ...]

// Interpolation
t('MARQUEE.PRODUCTS_DELIVERED', { count: 25 })  // "25+ Products Delivered"
```

Message keys follow the pattern `SectionName.CONSTANT_CASE` for flat values and `SectionName.GROUP.KEY` for nested structures. The `t.raw()` call is used when the message value is a complex object (arrays, nested objects) rather than a plain string.
