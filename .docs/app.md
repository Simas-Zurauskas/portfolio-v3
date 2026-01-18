# Portfolio V3 - App Inventory & Business Review

This document is a full, line-by-line inventory and business-focused review of the current app. It covers structure, content, UI feel, features, and what is missing for next‑level client attraction.

---

## 1) App Structure (Pages, Routing, Providers)

### App Router

- `/src/app/layout.tsx`: Root layout, Google Analytics scripts, Geist fonts, metadata.
- `/src/app/[locale]/layout.tsx`: Locale wrapper, `next-intl` provider, async message loading.
- `/src/app/[locale]/page.tsx`: Routes to `HomeScreen`.
- `/src/app/api/contact/route.ts`: Contact form API (Mailjet + reCAPTCHA v3).
- `/src/app/cv/page.tsx`: Dev-only CV print page (hidden in production).
- `/src/app/_registry/*`: Theme, reCAPTCHA provider, styled-components SSR.

### Providers & Theming

Provider hierarchy:

```
RootLayout
└── Registry (client)
    └── NextThemeProvider (next-themes)
        └── GoogleReCaptchaProvider
            └── StyledRegistry
                └── ThemeProvider (styled-components)
                    └── GlobalStyles
                        └── NextIntlClientProvider
```

### Internationalization

- Locales: `en`, `lt`.
- Default locale: `en` (no `/en` prefix).
- Locale switching via `LanguageSwitch`.
- Messages stored in `/src/messages/en.json` and `/src/messages/lt.json`.

---

## 2) Screens & Section Layout

### HomeScreen

- Render order:
  1. `Nav`
  2. `Hero`
  3. `ServicesSection`
  4. `ProcessSection`
  5. `WorkSection`
  6. `ContactSection`
  7. `Footer`

### SectionWrapper (layout system)

- Grid layout: `80px | content | 80px` (shrinks on tablet/mobile).
- Vertical grid lines on left/right.
- Large background index (`01`, `02`, etc.) per section.
- Sticky vertical sidebar labels on left/right.
- Decorative corner brackets and bottom accent bar.
- Motion: label line, title lines, divider, content reveal.

---

## 3) Content Inventory (By Section)

### 3.1 Navigation

- Brand: "Simas Žurauskas", subline: "Full-Stack · Web · Mobile · AI".
- Nav links: Services, Process, Work, Contact.
- Status: "Available" with pulsing dot.
- Actions: Language switcher, theme switcher (light/dark/system), CTA button "Email me".
- Mobile menu: full-screen overlay with sections and CTA.

### 3.2 Hero

- Overline: "Available for Projects".
- Headline: "I build Soft ware" with sketch mark and accent.
- Description (EN): "End-to-end product development — from discovery and MVP to scale. Building new products or improving existing ones, owning the full technical journey."
- CTAs: "Start a Project" (scroll to Contact), "Explore Services".
- Metrics: Years, Projects, Clients, Domains (`COUNT_YEARS`, `COUNT_PROJECTS`, `COUNT_CLIENTS`, `COUNT_DOMAINS`).
- Animated side shapes + orbit dots.
- Marquee keywords: Web Apps, Mobile Apps, AI Integration, SaaS, MVP, Enterprise, e‑commerce, real-time, APIs, consulting, performance, scalable architecture.

### 3.3 Services

**Section label:** "Capabilities"  
**Title:** "How I Can Help you ship"

Services list (with tech tags + project counts):

1. **Web Applications**  
   "Full-stack web products from architecture to deployment. Dashboards, SaaS platforms, e-commerce — built to scale."  
   Tech: React, Next.js, TypeScript, GraphQL, Node.js.
2. **Mobile Development**  
   "Cross-platform iOS and Android apps. From concept to App Store — native performance with shared codebase."  
   Tech: React Native, Expo, iOS, Android.
3. **AI Integration**  
   "Adding intelligence to your product. Custom AI agents, chatbots, document processing, and automation workflows."  
   Tech: LangChain, OpenAI, RAG, Agents.
4. **Backend & Infrastructure**  
   "Scalable APIs, databases, and cloud infrastructure. CI/CD pipelines, containerization, and production-ready deployments."  
   Tech: Node.js, PostgreSQL, AWS, Docker, CI/CD.
5. **UI/UX Design**  
   "Product strategy, user flows, wireframes, and prototypes. Clear UX direction before development starts."  
   Tech: Product Strategy, UX Flows, Wireframes, Prototypes.
6. **UI/UX Implementation**  
   "Turning designs into production-ready interfaces. Design systems, responsive UI, motion, and accessibility."  
   Tech: Design Systems, Responsive UI, Framer Motion, A11y.
7. **Technical Consulting**  
   "Architecture reviews, performance optimization, and technology decisions. Helping teams ship better software."  
   Tech: Code Reviews, Architecture, Mentorship, DevOps.
8. **Existing Projects**  
   "Already have a codebase? Bug fixes, feature additions, refactoring, or taking over maintenance. Fresh eyes on your product."  
   Tech: Bug Fixes, Refactoring, Performance, Features.

Visual: large numeric index per service with parallax.

### 3.4 Process

**Section label:** "How I Work"  
**Title:** "From Idea to Launch"

Phases (with durations):

1. Discovery — "Understanding your goals, users, and constraints. We align on scope, priorities, and what success looks like." (1–2 days)
2. Design — "Architecture decisions, tech stack, and wireframes. Building the blueprint before writing code." (2–5 days)
3. Build — "Iterative development with regular demos. You see progress every week, not just at the end." (2–12 weeks)
4. Launch — "Deployment, monitoring, and handoff. Production-ready with documentation and support." (1–3 days)

Expectations:

- Flexible Engagement — Hourly, fixed price, or retainer
- Iterative Delivery — Working software every 1–2 weeks
- No Middlemen — Direct Slack or email, fast responses
- Full Ownership — Your code, your repo, clean handoff
- Transparent Scope — Clear pricing, no surprises
- Post‑Launch Support — Optional bug fixes and iterations

### 3.5 Work (Selected Projects)

**Section label:** "Selected Projects"  
**Title:** "Real Problems solved"

Disclaimer: NDA‑bound work not shown; selection is representative.  
Industries list (17 items): Cyber Security, Banking & Financial Services, Insurance, FinTech, InsurTech / Risk Management, Logistics, Fleet Management, Healthcare / Wellness, EdTech, Real Estate, HR / Talent Management, B2B SaaS, Social / Community, Construction, Consumer / Lifestyle, Gaming / Entertainment, Legal.

Projects (base data + i18n):

1. **Strive Learning** (EdTech)  
   Role: Solo — Scope: Frontend, Backend, AI, DevOps — Team: 1  
   Tech: Next.js, LangGraph, OpenAI, Stripe, MongoDB  
   Highlights: 4 AI agents, roadmap editor, credit subscriptions  
   Link: `https://www.strive-learning.com`

2. **Withinly** (HealthTech)  
   Role: Tech Lead — Scope: Frontend, Backend, AI, DevOps — Team: 4  
   Tech: Next.js, LangGraph, OpenAI, Pinecone, Stripe  
   Highlights: RAG companion, assessments, AI portraits  
   Link: `https://withinly.app`

3. **Manchester's Finest** (Lifestyle)  
   Role: Tech Lead — Scope: Mobile, Backend, CMS, App Store — Team: 4  
   Tech: React Native, Expo, MongoDB, RevenueCat

4. **Dara Intellitech** (SaaS)  
   Role: Tech Lead — Scope: Frontend, AI Integration — Team: 3  
   Tech: Next.js, Puppeteer, LangGraph, TypeScript

5. **WiseMind AI** (FinTech)  
   Role: AI Engineer — Scope: Frontend AI, Backend AI — Team: 6  
   Tech: Next.js, LangGraph, OpenAI, MongoDB, Stripe  
   Link: `https://app.wisemindai.co.uk`

6. **Circle of Trust** (Social)  
   Role: Mobile Lead — Scope: Mobile Frontend — Team: 8  
   Tech: React Native, GraphQL, Firebase, Branch.io

7. **PP Platform** (Construction)  
   Role: Solo — Scope: Frontend, Backend, Infrastructure, DevOps — Team: 1  
   Tech: React, Node.js, MongoDB, Socket.IO, AWS S3

### 3.6 Contact

- Description: "Have a project in mind or want to discuss an opportunity? ..."
- Email: `hello@simaszurauskas.com` with copy-to-clipboard.
- Form fields: Name, Email, Message.
- Button states: Send Message, Loading, Sent, Try Again.
- Reply time hint: "Typical reply within 24h".
- reCAPTCHA v3 notice with privacy/terms links.

### 3.7 Footer

- Brand & tagline: "Simas Žurauskas — Software Engineer".
- Credential: AI Engineering certificate (Turing College) with tooltip.
- Navigation links: Home, Services, Work, Contact.
- Contact: email + copy action.
- Social: LinkedIn (GitHub link commented out).

---

## 4) Internal / Dev‑Only Utilities

- **CV Print Page** (`/cv`): Dev‑only; 850×1200 print size via `react-to-print`. Two‑column CV layout for PDF export.
- **OG Image Studio** (`OgImageStudio`): Builds and exports Open Graph images (hero/work/capabilities/code/certificate).
- **Favicon Studio** (`FaviconPreview`): Generate favicon variants and export PNGs.

These are hidden from production UI but exist in codebase as internal tools.

---

## 5) Design Feel & UX Character

**Overall feel:** premium editorial + tech studio.  
**Core attributes:** grid‑based, structured, high contrast, orange accent, large typography, subtle motion.

**Visual language:**

- Vertical sidebars and index numbers create a “systematic” feel.
- Orange accent used for highlights, labels, and motion.
- Heavy typography with large display headlines.
- Extensive motion with Framer Motion, but restrained.

**Interaction style:**

- CTA buttons with clear hierarchy.
- Hover effects on cards, chips, buttons.
- Mobile navigation is full‑screen, clean, with clear CTA.

---

## 6) What’s Great (Business & Client Attraction)

1. **Strong visual identity** — immediately signals premium, deliberate design.
2. **Clear capability breadth** — web, mobile, AI, infra, consulting, existing codebases.
3. **Process clarity** — structured approach with time estimates; builds trust.
4. **Project credibility** — real client work, industries, NDAs acknowledged.
5. **Professional contact flow** — reliable contact form, reCAPTCHA, reply‑time promise.
6. **Bilingual** — expands reach and professionalizes communication.
7. **Trust signals** — credential in footer and visible tech maturity.

---

## 7) What’s Missing for Next‑Level Client Attraction

These gaps block higher‑ticket clients and enterprise buyers from immediate confidence:

### A) Outcome‑level proof

- No measurable outcomes per project (e.g., revenue impact, performance gains, cost savings).
- No before/after comparisons for existing codebase work.

### B) Case studies / deep dives

- No dedicated case study pages, even for top flagship projects.
- No problem → approach → result narrative.

### C) Social proof

- No client logos, testimonials, or recognisable references.
- No quotes or names to validate trust.

### D) Engagement clarity

- “Flexible engagement” is there but lacks scope clarity (e.g., typical timelines, minimums, or sample packages).
- No booking link, availability calendar, or CTA for discovery call.

### E) Consistency & numbers

- Conflicting stats: `COUNT_YEARS` = 5 while CV copy says 7+.
- Service project counts do not reflect total project count.  
  This creates doubt for enterprise clients.

### F) Positioning depth

- Strong “I build” narrative, but limited differentiation vs. other senior engineers.
- Missing “why me” statements, e.g., risk management, speed with quality, or a unique value proposition.

### G) Trust & risk handling

- No explicit mention of security/compliance, QA process, or SLA‑like guarantees.
- No clear process for takeover projects (audit first, scope, stabilization).

---

## 8) What This App Is Good For Right Now

**Best‑fit clients:**

- Startup founders needing MVP → Launch.
- Product teams needing fast senior implementation.
- Agencies needing subcontracted lead engineer.
- Teams needing AI integration or mobile expertise.
- Projects needing maintenance or stabilization.

**Deal size fit (current messaging):**

- Small to mid‑size engagements.
- Fixed‑scope MVPs or retained feature development.
- Technical consulting/architecture advisory.

---

## 9) Recommended Next Steps (Business‑Focused)

1. **Add 2 flagship case studies**  
   Focus on impact, results, and role clarity.
2. **Add outcomes/metrics to each project card**  
   Short, quantifiable statements.
3. **Add testimonial(s) or client logos**  
   Even 2–3 logos/quotes improve conversion.
4. **Add “Engagement Models” section**  
   Typical timeline + pricing style + how to start.
5. **Clarify stats consistency**  
   Align years/projects across hero, CV, services.
6. **Add “Existing Codebase” mini‑process**  
   Audit → Stabilize → Improve (distinct from MVP flow).
7. **Add scheduling link**  
   Direct call booking increases conversion for higher ticket.

---

## 10) Summary (Business Lens)

The site already communicates premium design, technical range, and process clarity. It is strong for startup and mid‑size engagements, especially when the buyer values design quality and engineering depth. To attract higher‑tier, enterprise‑level clients, the next leap is evidence: outcomes, case studies, logos/testimonials, and tighter positioning. Once those are in place, the app will convert not only on taste and skill, but on business proof.
