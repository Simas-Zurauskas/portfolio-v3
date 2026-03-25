# Animation System

This document catalogs every animation pattern used across the portfolio site, explains the shared easing curve, and records the performance decisions behind implementation choices.

All motion is powered by **Framer Motion v11** unless explicitly noted otherwise. The project uses a consistent set of variant objects and hooks that are composed per-section rather than abstracted into a shared module -- each file declares its own variants, but they all follow the conventions documented here.

---

## Table of Contents

- [Shared Easing](#shared-easing)
- [Animation Pattern Catalog](#animation-pattern-catalog)
  - [Staggered Reveal](#a-staggered-reveal)
  - [Slide-In](#b-slide-in)
  - [Line Expand](#c-line-expand)
  - [Parallax Index Numbers](#d-parallax-index-numbers)
  - [Mouse-Tracking Spotlight](#e-mouse-tracking-spotlight)
  - [Floating Shapes with Spring Physics](#f-floating-shapes-with-spring-physics)
  - [Animated Counters](#g-animated-counters)
  - [CSS Marquee](#h-css-marquee)
  - [Pulse Animation](#i-pulse-animation)
  - [Mobile Menu AnimatePresence](#j-mobile-menu-animatepresence)
  - [Bento Grid Stagger](#k-bento-grid-stagger)
- [Performance Considerations](#performance-considerations)
- [`useInView` vs `whileInView`](#useinview-vs-whileinview)
- [Viewport Detection Conventions](#viewport-detection-conventions)
- [Cross-References](#cross-references)

---

## Shared Easing

```ts
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
```

This cubic-bezier curve is declared in virtually every file that contains Framer Motion animations: `Hero.tsx`, `SectionWrapper.tsx`, `ServiceItemWithParallax.tsx`, `Nav.tsx`, and `ProcessSection.tsx`. Rather than being imported from a shared module, it is redeclared locally -- a deliberate trade-off that keeps each file self-contained at the cost of some repetition.

**Character:** The curve starts fast (first control point y = 1) then decelerates smoothly into its final value (second control point at 0.3, 1). The result is a snappy entrance that eases out gradually, avoiding a mechanical or linear feel. It closely resembles the `ease-out-expo` family of easings but with a slightly softer tail. The equivalent CSS value is `cubic-bezier(0.16, 1, 0.3, 1)`.

All duration values across the project sit between 0.3 s and 1.0 s, with 0.6 s being the most common default.

---

## Animation Pattern Catalog

### a. Staggered Reveal

**Description:** A parent `motion` element orchestrates the timing of its children via `staggerChildren` and `delayChildren`. Each child uses a `revealUp` variant that fades in (`opacity: 0 -> 1`) and translates up (`y: 30 -> 0`).

**Where it is used:**
- Hero (`containerVariants` + `revealUpVariants`)
- SectionWrapper (`containerVariants` + `contentVariants`)
- ProcessSection (`stagger` + `fadeUp`)
- WorkSection (`gridVariants` + `cardVariants` in ProjectCard)
- ServiceItemWithParallax (`wrapperVariants` + `contentVariants`)

**Code (Hero.tsx):**

```ts
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const revealUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};
```

**Typical stagger values across the project:**

| Location | `staggerChildren` | `delayChildren` |
|---|---|---|
| Hero | 0.1 | 0.3 |
| SectionWrapper | 0.15 | 0.2 |
| ProcessSection (commitments) | 0.06 | -- |
| WorkSection (bento grid) | 0.3 | 0.2 |
| ServiceItemWithParallax | 0.1 | 0.1 |

---

### b. Slide-In

**Description:** Title lines slide in from the left. The element starts at `x: '-100%'` (fully off-screen to the left) and animates to `x: 0`. An `overflow: hidden` wrapper on the parent `<span>` clips the text until it arrives.

**Where it is used:**
- Hero title lines
- SectionWrapper section titles

**Code (SectionWrapper.tsx):**

```ts
const slideInVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};
```

The wrapping `<TitleLine>` styled-component sets `display: block; overflow: hidden;` so the text is masked until it slides into place. Each line is a child of a stagger container (`titleVariants` with `staggerChildren: 0.1`), so multi-line headings cascade.

---

### c. Line Expand

**Description:** Decorative horizontal lines scale from zero width to full width using `scaleX: 0 -> 1` with `transform-origin: left`. This avoids layout shifts that would occur with width animation.

**Where it is used:**
- Hero overline accent bar (`lineExpandVariants`)
- SectionWrapper label line (`lineVariants`)
- SectionWrapper divider below titles (`expandVariants`)

**Code (Hero.tsx):**

```ts
const lineExpandVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};
```

**Code (SectionWrapper.tsx) -- with additional opacity and delay:**

```ts
const expandVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};
```

The `<LabelLine>` and `<Divider>` styled-components both apply `transform-origin: left` via CSS so the expansion anchors to the left edge.

---

### d. Parallax Index Numbers

**Description:** The large index numbers beside each service item (01, 02, ...) move at a slower rate than the page scroll, creating a subtle parallax depth effect. This is achieved purely with Framer Motion's `useScroll` and `useTransform` hooks -- no scroll event listeners.

**Where it is used:**
- `ServiceItemWithParallax.tsx`

**Code:**

```ts
const { scrollYProgress } = useScroll({
  target: itemRef,
  offset: ['start end', 'end start'],
});

// Parallax: maps scroll progress [0,1] to y-offset [30,-30]
const indexY = useTransform(scrollYProgress, [0, 1], [30, -30]);
```

```tsx
<ServiceIndex style={{ y: indexY }}>{service.index}</ServiceIndex>
```

The `offset` pair `['start end', 'end start']` means progress is 0 when the element's top enters the viewport bottom and 1 when its bottom exits the viewport top -- covering the entire visible travel. The 60 px total range (30 to -30) is subtle enough to add depth without feeling disorienting.

---

### e. Mouse-Tracking Spotlight

**Description:** A large, blurred radial gradient follows the user's cursor across the Hero section. For performance, this uses **raw DOM manipulation** rather than Framer Motion -- the transform is applied directly to the element's `style` property inside a `mousemove` handler.

**Where it is used:**
- Hero section

**Code:**

```ts
const handleMouseMove = useCallback((e: MouseEvent) => {
  if (!sectionRef.current) return;

  const rect = sectionRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Direct DOM mutation -- bypasses React reconciliation
  if (spotlightRef.current) {
    spotlightRef.current.style.transform = `translate(${x - 400}px, ${y - 400}px)`;
  }
}, []);
```

The spotlight element itself has a CSS `transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)` for smooth trailing. The 400 px offset centers the 800x800 px gradient on the cursor. The gradient uses the theme accent color at low alpha values (`#accent22` center, `#accent08` mid-ring, transparent edge) combined with `filter: blur(60px)`.

**Why raw DOM?** Mouse events fire at 60+ Hz. Running these through React state or Framer Motion's animation pipeline would create unnecessary re-renders. Direct `style.transform` writes go straight to the compositor with no VDOM diffing.

---

### f. Floating Shapes with Spring Physics

**Description:** Three decorative geometric shapes in the Hero sidebar float continuously and also react to the mouse cursor via spring-based physics. The system layers two independent motions:

1. **Mouse proximity offset** -- `useTransform` calculates a distance-based displacement from the cursor, then `useSpring` smooths it.
2. **Infinite float** -- A Framer Motion `animate` prop loops `y: [0, -20, 0]` with staggered delays per shape.

**Where it is used:**
- Hero side panel (`FloatingShape` component)

**Code (spring physics):**

```ts
const offsetX = useTransform(mouseX, (x) => {
  const distance = x - centerX;
  const maxOffset = 5;
  const influence = Math.max(0, 1 - Math.abs(distance) / 200);
  return distance * influence * 0.04 * maxOffset;
});

const springX = useSpring(offsetX, { stiffness: 50, damping: 30 });
const springY = useSpring(offsetY, { stiffness: 50, damping: 30 });
```

**Code (infinite float):**

```tsx
<motion.div
  animate={isInView ? {
    y: [0, -20, 0],
    rotate: [0, 3, 0],
  } : {}}
  transition={{
    y: { duration: 6, ease: 'easeInOut', repeat: Infinity, delay: floatDelay },
    rotate: { duration: 6, ease: 'easeInOut', repeat: Infinity, delay: floatDelay },
  }}
  style={{ x: springX, translateY: springY }}
/>
```

The spring configuration (`stiffness: 50`, `damping: 30`) produces a slow, smooth response -- high damping prevents oscillation, and low stiffness prevents jerky tracking. Each shape uses a different `floatDelay` (0, 2, 4 seconds) so they bob out of phase.

The shapes carry GPU hints in CSS:

```css
will-change: transform;
backface-visibility: hidden;
transform: translateZ(0);
```

---

### g. Animated Counters

**Description:** Numeric statistics in the Hero sidebar (years of experience, project count, client count) count up from 0 to their target value. This uses `useMotionValue` as the underlying store, Framer Motion's `animate()` function to tween it, and `useTransform` to round intermediate values.

**Where it is used:**
- Hero sidebar metrics

**Code:**

```ts
const AnimatedCounter = ({ value, suffix = '+', delay = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(count, value, {
        duration: 2,
        ease: 'easeOut',
      });
      const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
      return () => { controls.stop(); unsubscribe(); };
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [count, rounded, value, delay]);

  return <>{displayValue}{suffix}</>;
};
```

The counters are sequentially delayed: 0.7 s, 0.9 s, and 1.1 s respectively, creating a cascade effect that begins after the sidebar's own entrance animation (which has a 0.5 s delay).

---

### h. CSS Marquee

**Description:** An infinitely scrolling horizontal ticker at the bottom of the Hero section. This intentionally does **not** use Framer Motion. It relies on a pure CSS `@keyframes` animation with `translate3d` for GPU compositing.

**Where it is used:**
- Hero bottom marquee bar

**Code (CSS):**

```css
&-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: marquee-scroll 33s linear infinite;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

@keyframes marquee-scroll {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
```

**Code (seamless loop):**

```tsx
{[...marqueeItems, ...marqueeItems].map((item, i) => (
  <span key={i} className="hero-main__marquee-item">{item}</span>
))}
```

**Design decisions:**

- The items array is **doubled** so that when the track translates -50%, the second copy seamlessly replaces the first.
- The 33-second cycle provides a calm, readable scroll speed.
- `translate3d(0, 0, 0)` forces GPU layer promotion even at the start frame.
- CSS was chosen over Framer Motion specifically for mobile GPU performance -- a Framer Motion `animate` on `x` would run through JS on every frame, while CSS `@keyframes` + `transform` can be fully offloaded to the compositor thread.

---

### i. Pulse Animation

**Description:** An infinite opacity oscillation used for ambient "breathing" indicators. The opacity cycles through `[0.4, 0.8, 0.4]` over 4 seconds using Framer Motion in the Hero orbit, and through a CSS `@keyframes` in the Nav availability indicator.

**Where it is used:**
- Hero orbit ring (`pulseVariants`)
- Nav "available for projects" dot (CSS `@keyframes pulse`)

**Code (Framer Motion -- Hero orbit):**

```ts
const pulseVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};
```

**Code (CSS -- Nav availability dot):**

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}

/* Applied via: */
animation: pulse 2s ease-in-out infinite;
```

The Nav uses CSS rather than Framer Motion because the dot is a `::before` pseudo-element, which cannot be animated by Framer Motion.

---

### j. Mobile Menu AnimatePresence

**Description:** The mobile navigation overlay is rendered via a React portal and wrapped in `AnimatePresence` for enter/exit transitions. The overlay fades in, then its children stagger: nav links slide in from the left (`x: -15 -> 0`) and the footer fades up (`y: 15 -> 0`).

**Where it is used:**
- `Nav.tsx` mobile menu (viewport widths <= 1024 px)

**Code:**

```ts
const menuVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3, ease: smoothEase },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: smoothEase,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: -15 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: smoothEase },
  },
};

const footerVariants = {
  closed: { opacity: 0, y: 15 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: smoothEase, delay: 0.15 },
  },
};
```

```tsx
{createPortal(
  <AnimatePresence>
    {mobileMenuOpen && (
      <MobileMenuOverlay
        initial="closed"
        animate="open"
        exit="closed"
        variants={menuVariants}
      >
        <MobileMenuContent>
          {NAV_LINK_IDS.map((id, index) => (
            <MobileNavLink key={id} variants={linkVariants} ...>
              {t(NAV_LINK_KEYS[id])}
            </MobileNavLink>
          ))}
        </MobileMenuContent>
        <MobileMenuFooter variants={footerVariants}>...</MobileMenuFooter>
      </MobileMenuOverlay>
    )}
  </AnimatePresence>,
  document.body
)}
```

The portal-based rendering is necessary to escape the Nav's stacking context (`z-index: 10000`) and ensure the overlay covers the full viewport.

---

### k. Bento Grid Stagger

**Description:** The WorkSection project cards are laid out in a CSS grid and staggered into view as a group. The parent `BentoGrid` uses `staggerChildren: 0.3` with `delayChildren: 0.2`, creating a noticeable wave as cards appear. Each `ProjectCard` uses its own `cardVariants` (`opacity: 0, y: 30 -> opacity: 1, y: 0`).

**Where it is used:**
- `WorkSection.tsx` / `ProjectCard.tsx`

**Code (WorkSection.tsx -- parent):**

```ts
const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};
```

```tsx
<BentoGrid
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-100px' }}
  variants={gridVariants}
>
  {projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ))}
</BentoGrid>
```

**Code (ProjectCard.tsx -- child):**

```ts
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
```

The 0.3 s stagger is the longest in the project (most sections use 0.06 -- 0.15), chosen deliberately because the bento grid displays large visual cards where a faster cascade would look frantic.

---

## Performance Considerations

### GPU Layer Promotion

Animated elements use one or more of these CSS properties to promote them to their own compositor layer:

```css
will-change: transform;
backface-visibility: hidden;
transform: translateZ(0);
```

These are applied in two ways:

1. **Per-component** -- styled-components like `.hero-main__shape` and `ServiceIndex` declare them directly.
2. **Globally** -- `GlobalStyles.tsx` applies `will-change` and `backface-visibility` to any element with `[data-framer-component-type]` or `[style*="transform"]`.

### `prefers-reduced-motion`

`GlobalStyles.tsx` contains a blanket reduced-motion rule:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This collapses all CSS animations and transitions to effectively instant. Framer Motion animations that use the `transition` prop are not directly affected by this media query, but Framer Motion respects the user's preference internally for its own spring/tween calculations.

### CSS Animations Over Framer Motion Where Appropriate

Two cases where CSS `@keyframes` are used instead of Framer Motion:

| Element | Reason |
|---|---|
| Marquee scroll | Runs continuously at 60 fps. A JS-driven animation would compete with React on the main thread. CSS `transform` animations run on the compositor thread. |
| Nav pulse dot | Animates a `::before` pseudo-element, which Framer Motion cannot target. |

### Raw DOM Manipulation for High-Frequency Updates

The mouse-tracking spotlight in the Hero uses direct `element.style.transform` writes instead of Framer Motion or React state. At 60+ Hz mouse event frequency, this avoids:

- React re-renders on every frame
- Framer Motion's animation scheduling overhead
- VDOM diffing for a single style property change

---

## `useInView` vs `whileInView`

The project uses both approaches depending on the level of control needed.

### `useInView` (programmatic)

Used in the Hero section where the visibility state drives multiple downstream behaviors: the container variant animation, the floating shape `isInView` flag, and potentially future logic.

```ts
const isInView = useInView(contentRef, { once: false, margin: '-100px' });

// Used in JSX:
<motion.div
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
  variants={containerVariants}
>
```

Note that the Hero uses `once: false`, meaning its animations can replay if the user scrolls away and back. This is an intentional choice for the landing section.

### `whileInView` (declarative)

Used in SectionWrapper, ProcessSection, WorkSection, and ServiceItemWithParallax where the animation is fire-and-forget.

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-100px' }}
  variants={containerVariants}
>
```

The `once: true` option means the element animates in once and stays visible permanently. This is the default for all content sections below the fold.

---

## Viewport Detection Conventions

The project uses consistent `viewport` options across sections:

| Component | `once` | `amount` / `margin` | Notes |
|---|---|---|---|
| SectionWrapper | `true` | `margin: '-100px'` | Triggers 100 px before element enters viewport |
| ProcessSection (flow steps) | `true` | `margin: '-50px'` | Slightly earlier trigger for smaller elements |
| ProcessSection (commitments) | `true` | `margin: '-50px'` | |
| WorkSection (bento grid) | `true` | `margin: '-100px'` | |
| ServiceItemWithParallax | `true` | `margin: '-50px'` | |
| Hero | `false` | `margin: '-100px'` | Re-triggers on scroll back |

The negative margin convention means "trigger before the element is fully in the viewport." A `-100px` margin triggers the animation when the element is 100 px away from the viewport edge, giving the impression that content appears just as the user reaches it rather than after a visible delay.

---

## Cross-References

- [Design System](design-system.md) -- covers `GlobalStyles.tsx` including the `prefers-reduced-motion` rule, GPU acceleration hints, and CSS custom properties that theme the accent colors used in animation gradients.
- [Sections & Components](sections-and-components.md) -- documents the component tree and explains where each animated section lives in the page hierarchy.
