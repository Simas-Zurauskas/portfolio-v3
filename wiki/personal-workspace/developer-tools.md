# Developer Tools

Development-only utilities for generating visual assets. Both tools share a common pattern: gated behind `notFound()` in production, use `html-to-image` for PNG export, and implement deterministic shuffle for layout randomisation.

**Related**: [CV System](cv-system.md) | [Configuration](configuration.md)

---

## Shared Pattern

Both the OG Image Studio and the Favicon Preview implement the same core mechanisms:

### Dev-Only Gate

```ts
const isDev = process.env.NODE_ENV === 'development';
export default function Page() {
  if (!isDev) notFound();
  return <Component />;
}
```

### PNG Export via `html-to-image`

Both tools render their content as styled DOM elements, then use `toPng` from `html-to-image` to convert them to downloadable PNGs. Export targets are positioned off-screen at native resolution.

### Seeded Shuffle

Both use identical `mulberry32` (PRNG) + Fisher-Yates shuffle implementations:

```ts
function mulberry32(seedInit: number) {
  let seed = seedInit | 0;
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
```

The seed is stored in state and incremented via a "Shuffle" button, producing a new deterministic ordering each time.

---

## OG Image Studio

**Route**: `/og` (dev only)
**Files**: `src/app/og/page.tsx`, `src/components/OgImageStudio.tsx`

### Variants

Five OG image variants are available:

| ID            | Label          | Content                          |
| ------------- | -------------- | -------------------------------- |
| `hero`        | Simple Intro   | Name + role + key metrics        |
| `work`        | Track Record   | Project count + industry chips   |
| `capabilities`| What I Build   | Service areas + tech chips       |
| `code`        | Tech Stack     | Tool names + capabilities        |
| `certificate` | AI Credential  | Turing College AI certification  |

### Dimensions

- **Standard**: 1200 x 630 px (Open Graph / Twitter `summary_large_image` recommended size)
- **Retina 2x**: 2400 x 1260 px (achieved via `pixelRatio: 2` in the `toPng` call)

```ts
const pixelRatio = exportPreset === 'og' ? 1 : 2;
```

### Design Language

All variants share a consistent visual system:
- **Dark background** (`#030712`)
- **Noise texture** -- SVG fractalNoise filter at 4% opacity
- **Grid lines** -- 64px grid, 18% opacity
- **Spotlight gradient** -- radial orange glow (`rgba(255, 107, 53, 0.18)`) positioned top-left with 55px blur
- **Accent pills** -- monospace labels with an orange dot indicator
- **Footer bar** -- metrics (years, projects, clients) on the left, URL on the right, separated by a border-top

### Export

```ts
const downloadOne = async (id: VariantId) => {
  const dataUrl = await toPng(node, {
    width: OG_W,
    height: OG_H,
    pixelRatio,
    cacheBust: true,
    backgroundColor: '#030712',
  });
  // Trigger download via temporary <a> element
};
```

- **Single download**: exports the currently selected variant
- **Download all**: processes all 5 variants sequentially with a 200ms delay between each to avoid memory spikes
- **Hidden export targets**: rendered in a `div` positioned at `left: -99999` so they exist in the DOM at native resolution without being visible

### Controls

- Variant selector dropdown
- Export preset toggle (1x / Retina 2x)
- Shuffle button (re-orders the card grid)
- Download selected / Download all buttons

---

## Favicon Preview

**Component**: `src/components/FaviconPreview.tsx`

> **Note**: This component is defined and exported but **not currently mounted in any page route**. It may be intended for future integration or manual dev use.

### Icon Variants

15 icon variants organised into 5 families:

| Family          | IDs                                                                 | Count |
| --------------- | ------------------------------------------------------------------- | ----- |
| Bracket         | `corners-dot`, `square-brackets`, `round-parens`, `angle-brackets`, `brackets-double` | 5 |
| Cut Badge       | `cut-solid`, `cut-outline`, `cut-minimal`                           | 3     |
| Premium Frames  | `ring-dual`, `double-frame`, `pill-cut`                             | 3     |
| Ultra-Minimal   | `dot`, `bar`, `dot-bar`, `corner-mark`                              | 4     |

All icons use the orange accent (`#ff6b35`) as the primary colour and white (`#fafafa`) for secondary elements.

### SVG Specification

```tsx
<Svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  {children}
</Svg>
```

- **ViewBox**: 512 x 512
- **Design constraint**: all icons use thick strokes and minimal detail to survive rendering at 16px
- **Shape rendering**: `geometricPrecision` for clean edges

### Export

Export uses `toPng` followed by canvas re-rendering for precise size control:

```ts
const canvas = document.createElement('canvas');
canvas.width = exportSize;
canvas.height = exportSize;
const ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, exportSize, exportSize);

const dataUrl = await toPng(exportRef.current, {
  width: exportSize,
  height: exportSize,
  pixelRatio: 1,
  cacheBust: true,
});

// Draw onto canvas, then export as PNG
```

Available export sizes: **16, 32, 64, 128, 256, 512** px.

### Controls

- Icon grid (click to select, with visual highlight)
- Size selector dropdown
- **Checkerboard toggle** -- overlays a checkerboard pattern behind icons for transparency preview
- Shuffle button (re-orders the grid)
- Download PNG button
