# CV System

A development-only tool for generating, previewing, and exporting a multi-variant CV as a styled PDF. Accessible at `/cv` in local development; returns `notFound()` in production.

**Related**: [Developer Tools](developer-tools.md) | [System Overview](../architecture/system-overview.md)

---

## Access

```ts
// src/app/cv/page.tsx
const isDev = process.env.NODE_ENV === 'development';

export default function CVPage() {
  if (!isDev) notFound();
  return <CVPageClient />;
}
```

The `/cv` route is excluded from the i18n middleware so it does not require a locale prefix.

---

## Architecture

```
page.tsx (Server Component)
  |-- Guards: notFound() if production
  |-- Renders: <CVPageClient />

CVPageClient.tsx (Client Component, 'use client')
  |-- Reads variant data from cvData.ts
  |-- Renders CV sections
  |-- Provides variant selector + print export
```

The server component exists solely to gate access. All rendering and interaction logic lives in the client component.

---

## CV Variants

Four variants are defined by the `VariantId` union type:

```ts
type VariantId = 'freelance' | 'fulltime' | 'contract' | 'general';
```

| Variant    | `header.title`                                | Emphasis                                           |
| ---------- | --------------------------------------------- | -------------------------------------------------- |
| General    | Software Engineer -- Full-Stack, Mobile & AI  | Balanced overview of all roles                     |
| Freelance  | Full-Stack & AI Engineer                      | Direct client work, independence, fast turnaround  |
| Full-time  | Senior Software Engineer                      | Team leadership, mentorship, reliability           |
| Contract   | Software Engineer -- Full-Stack, Mobile & AI  | Domain breadth, context-switching, delivery speed  |

Each variant selects different:
- **Summary** text
- **Experience entries** (same factory functions, different bullet points and ordering)
- **Project selections** from a shared pool

---

## CV Type Structure

Defined in `src/app/cv/comps/CVPageClient/types.ts`:

```ts
type CV = {
  header:     { name: string; title: string };
  contact:    { location, email, phone?, websiteLabel, websiteUrl,
                linkedinLabel, linkedinUrl, githubLabel, githubUrl };
  skills:     SkillGroup[];       // { category: string; items: string[] }
  languages:  Array<{ name: string; level: string }>;
  education:  Array<{ title: string; meta: string }>;
  summary:    string;
  experience: ExperienceEntry[];  // { role, date, company, points: string[] }
  projects:   ProjectEntry[];     // { name, meta, description, featured? }
  projectsNote?: string;
};
```

---

## Data Composition Pattern

**File**: `src/app/cv/comps/CVPageClient/cvData.ts`

The data layer uses a composition pattern with three tiers:

### 1. Shared Constants

Values reused across all variants without modification:

```ts
const contact: CV['contact'] = { /* ... */ };
const languages: CV['languages'] = [ /* ... */ ];
const education: CV['education'] = [ /* ... */ ];
const skills: CV['skills'] = [ /* ... */ ];
```

### 2. Experience Factory Functions

Each role is a function that accepts variant-specific bullet points:

```ts
const radicalSenior = (points: string[]) => ({
  role: 'Tech Lead & AI Engineer',
  date: '2023 -- Present',
  company: 'Radical Company . UK . Remote . Full-time',
  points,
});
```

Other factories: `radicalJunior`, `frontIT`, `freelance`. The role metadata stays constant; only the `points` array varies per variant.

### 3. Project Pool

Individual project objects are defined as standalone constants:

```ts
const striveLearning: CV['projects'][number] = { name: '...', meta: '...', description: '...' };
const withinly: CV['projects'][number] = { /* ... */ };
// ... 7 total projects in the pool
```

### 4. Variant Assembly

Each variant picks from the shared parts:

```ts
export const cvVariants: Record<VariantId, CV> = {
  general: {
    header: { name: 'Simas Zurauskas', title: 'Software Engineer -- ...' },
    contact,
    skills,
    languages,
    education,
    summary: '...',
    experience: [
      radicalSenior([/* general-specific bullets */]),
      radicalJunior([/* ... */]),
      frontIT([/* ... */]),
      freelance([/* ... */]),
    ],
    projects: [striveLearning, withinly, ukTaxAdviser, ppPlatform],
  },
  // freelance, fulltime, contract follow the same pattern
};
```

---

## PDF Export

Export uses the `useReactToPrint` hook from `react-to-print`:

```ts
const handlePrint = useReactToPrint({
  contentRef: cvRef,
  documentTitle: 'Simas_Zurauskas_CV',
  pageStyle: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @page {
      size: 850px 2340px;
      margin: 0;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }
    }
  `,
});
```

Key details:
- **Page size**: 850 x 2340 px (a tall single-page layout, not standard A4)
- **Fonts**: Inter at weights 400/500/600/700, imported via `@fontsource/inter` (not Geist)
- **Colour preservation**: `-webkit-print-color-adjust: exact` ensures backgrounds and colours render in the PDF
- The browser's print dialog doubles as "Save as PDF"

---

## UI

The page layout consists of:

1. **Variant selector** -- a row of buttons at the top, one per variant. The active variant is visually highlighted (`$active` styled-component prop).
2. **Print button** -- triggers `handlePrint()`, labelled "Print / Save PDF" with a `<Printer>` icon.
3. **CV preview** -- a scrollable container (`CVContainer`) rendered at the actual print dimensions, displaying all CV sections in order: Header, Contact Bar, Summary, Technical Skills, Experience, Selected Projects, Education, Languages.
