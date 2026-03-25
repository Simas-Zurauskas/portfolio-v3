import type { CV, CVVariant, VariantId } from './types';

// ─── Shared data ───────────────────────────────────────────────

const contact: CV['contact'] = {
  location: 'Klaipeda, Lithuania',
  email: 'simaszurauskas@gmail.com',
  phone: '+370 666 97781',
  websiteLabel: 'simaszurauskas.com',
  websiteUrl: 'https://simaszurauskas.com',
  linkedinLabel: 'linkedin.com/in/simas-zurauskas',
  linkedinUrl: 'https://www.linkedin.com/in/simas-zurauskas',
  githubLabel: 'github.com/simaszurauskas',
  githubUrl: 'https://github.com/simaszurauskas',
};

const languages: CV['languages'] = [
  { name: 'English', level: 'Fluent' },
  { name: 'Lithuanian', level: 'Native' },
];

const education: CV['education'] = [
  {
    title: 'Turing College — AI Engineering',
    meta: '2025 · LLMs, RAG, Agents',
  },
];

const skills: CV['skills'] = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript'] },
  { category: 'Mobile', items: ['React Native', 'Expo'] },
  { category: 'Backend', items: ['Node.js', 'GraphQL', 'MongoDB'] },
  { category: 'AI', items: ['LangChain', 'LangGraph', 'OpenAI', 'RAG'] },
  { category: 'Infrastructure', items: ['AWS', 'Docker', 'CI/CD'] },
];

// ─── Experience entries ────────────────────────────────────────

const radicalSenior = (points: string[]) => ({
  role: 'Tech Lead & AI Engineer',
  date: '2023 — Present',
  company: 'Radical Company · UK · Remote · Full-time',
  points,
});

const radicalJunior = (points: string[]) => ({
  role: 'Full-Stack Developer',
  date: 'Mar 2021 — 2023',
  company: 'Radical Company · UK · Remote · Full-time',
  points,
});

const frontIT = (points: string[]) => ({
  role: 'Mobile Engineer',
  date: 'Apr 2025 — Present',
  company: 'FrontIT · Lithuania · Remote · Part-time',
  points,
});

const freelance = (points: string[]) => ({
  role: 'Freelance Engineer',
  date: '2023 — Present',
  company: 'Independent',
  points,
});

// ─── Projects pool ─────────────────────────────────────────────

const striveLearning: CV['projects'][number] = {
  name: 'Strive Learning',
  meta: 'Founder · EdTech',
  description:
    'My own product. I built a learning platform where four LangGraph agents create personalised roadmaps, modules, and lessons from scratch. Users pick a topic, the AI maps out a full course, and they work through it at their own pace. Next.js frontend, Stripe for subscriptions, the whole thing runs on MongoDB. I handle everything — product decisions, code, infrastructure, support.',
  featured: true,
};

const withinly: CV['projects'][number] = {
  name: 'Withinly',
  meta: 'Tech Lead · HealthTech',
  description:
    'Mental wellness app where I owned the full stack. Built a RAG-powered companion chat that references psychology literature, four personality assessments, and a system that generates detailed psychological portraits from the results. Led a team of four. I picked the architecture, set up the infrastructure, and wrote most of the AI integration layer myself.',
};

const circleOfTrust: CV['projects'][number] = {
  name: 'Circle of Trust',
  meta: 'Mobile Lead · Social',
  description:
    'Professional networking app with a trust-based recommendation engine — people vouch for each other and the network grows through real relationships, not cold connections. I built the iOS and Android apps in React Native, integrated a QR code system for in-person connections, and set up deep linking with Branch.io. Team of eight, GraphQL API.',
};

const ukTaxAdviser: CV['projects'][number] = {
  name: 'WiseMind AI',
  meta: 'AI Engineer · FinTech',
  description:
    'Tax consultation platform where I built the advisory agent with LangGraph. Users upload financial documents, the agent reads and interprets them, then walks people through their tax situation step by step. I also handled the multi-step onboarding flow and document processing pipeline. Next.js, Node.js, MongoDB.',
};

const ppPlatform: CV['projects'][number] = {
  name: 'PP Platform',
  meta: 'Solo · Construction',
  description:
    'Project management system I built solo for a construction company. Multiple user roles — site managers, contractors, admin — each see different views. Tracks payment cycles, calculates bonuses, and pushes real-time updates through Socket.IO. React frontend, Node.js backend, files on AWS S3.',
};

const mcrPerks: CV['projects'][number] = {
  name: "Manchester's Finest",
  meta: 'Tech Lead · Lifestyle',
  description:
    "Local venue discovery app for Manchester. Built the React Native app with a place randomiser (can't decide where to go? shake your phone), favourites, and a subscription tier through RevenueCat. I led the mobile team of four, managed the App Store releases, and integrated a WordPress CMS for the editorial content.",
};

const daraIntellitech: CV['projects'][number] = {
  name: 'Dara Intellitech',
  meta: 'Tech Lead · SaaS',
  description:
    'Document creation platform that turns content into polished PDFs. I built a JSX-to-PDF rendering engine with Puppeteer, integrated AI content enhancement through LangGraph, and led a team of three. Multiple template types — reports, proposals, branded documents. Next.js and TypeScript throughout.',
};

// ─── Variants ──────────────────────────────────────────────────

export const variants: CVVariant[] = [
  { id: 'general', label: 'General' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'fulltime', label: 'Full-time' },
  { id: 'contract', label: 'Contract' },
];

export const cvVariants: Record<VariantId, CV> = {
  // ── General ────────────────────────────────────────────────
  general: {
    header: {
      name: 'Simas Žurauskas',
      title: 'Software Engineer — Full-Stack, Mobile & AI',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      "I build software across the full stack — web, mobile, and increasingly AI. Over the past five years I've shipped products in banking, insurance, cybersecurity, logistics, healthcare, and edtech, usually taking end-to-end ownership from architecture through to deployment. I'm most useful when a project needs someone who can work across layers without waiting for handoffs.\n\nMy day-to-day is React, Next.js, and TypeScript on the frontend, Node.js and MongoDB on the backend, React Native for mobile. More recently I've been deep in AI integration — RAG pipelines, multi-agent workflows, and LLM-powered features using LangChain and LangGraph.",
    experience: [
      radicalSenior([
        'Leading technical delivery across engineering teams. I make the architecture calls, set up CI/CD, run code reviews, and mentor developers who are earlier in their careers.',
        'Built AI features that actually went to production — RAG chatbots that answer domain-specific questions from real documents, assessment tools that generate psychological profiles, multi-agent workflows that coordinate complex tasks.',
        'Clients include companies in banking, cyber risk management, and insurance. Most of this work is under NDA, but the pattern is the same: take a messy real-world problem, figure out the right technical approach, and deliver it.',
      ]),
      radicalJunior([
        'Shipped web and mobile apps in React, Next.js, and React Native for clients across multiple industries. Started with feature work, gradually took on more ownership — architecture decisions, client-facing communication, sprint planning.',
        'Built real-time collaboration features, complex form flows, and data visualisation dashboards. Got comfortable working directly with founders and operations teams, not just product managers.',
      ]),
      frontIT([
        'Building a fleet management mobile app — real-time vehicle tracking with HERE Maps, tachograph compliance features, and driver workflow tools.',
        'Implemented offline-first data sync and background location tracking so the app works reliably even in areas with patchy signal.',
      ]),
      freelance([
        'I work directly with founders and small teams. Requirements, development, deployment, ongoing support — the full loop. No project managers in between.',
        'Built a real-time collaboration platform for construction project management. Live document sync, multi-user editing, the kind of features where latency matters.',
      ]),
    ],
    projectsNote: 'Additional enterprise client work under NDA.',
    projects: [striveLearning, withinly, ukTaxAdviser, ppPlatform],
  },

  // ── Freelance ──────────────────────────────────────────────
  freelance: {
    header: {
      name: 'Simas Žurauskas',
      title: 'Full-Stack & AI Engineer',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      "I take ideas from napkin sketch to production. Web, mobile, AI — I don't need a team of specialists to ship a working product. Over five years I've delivered 35+ projects across a dozen industries, and I'm used to being the person who figures out both what to build and how to build it.\n\nI work directly with founders and stakeholders. No middlemen, fast turnaround, and I stick around after launch to make sure things actually work. My sweet spot is projects that need someone who can handle the full stack and make technical decisions independently.",
    experience: [
      freelance([
        'End-to-end delivery for founders and small companies. I handle requirements, architecture, development, deployment, and ongoing support — the whole thing.',
        'Built a real-time collaboration platform for construction project management with live document sync. Working directly with the operations team, no PMs in between.',
        "Clients range from solo founders to small teams. I adapt to what they need — sometimes that's a full product build, sometimes it's adding AI features to an existing app.",
      ]),
      radicalSenior([
        'Leading technical delivery on client teams. Architecture decisions, CI/CD setup, code reviews, mentoring. The AI work I do here feeds directly into what I offer freelance clients.',
        'Built production AI systems: RAG chatbots, document processing pipelines, assessment tools, multi-agent workflows. All of it actually used by real people, not demos.',
      ]),
      radicalJunior([
        'Shipped web and mobile apps across banking, insurance, and cybersecurity. Grew from feature work into full project ownership over two years.',
        'Got comfortable talking directly to founders and ops teams. Learned to translate business problems into technical solutions without over-engineering.',
      ]),
      frontIT([
        'Fleet management app — real-time vehicle tracking, HERE Maps, tachograph compliance. Offline-first sync for areas with poor connectivity.',
      ]),
    ],
    projectsNote: 'Additional enterprise client work under NDA.',
    projects: [striveLearning, ppPlatform, ukTaxAdviser, mcrPerks],
  },

  // ── Full-time ──────────────────────────────────────────────
  fulltime: {
    header: {
      name: 'Simas Žurauskas',
      title: 'Senior Software Engineer',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      "I'm a full-stack engineer who's spent the last five years building production software across web, mobile, and AI. I've led small engineering teams, and I'm at the point where I naturally take on architecture decisions, mentorship, and technical direction alongside hands-on coding.\n\nWhat I bring to a team: I can pick up any layer of the stack without a ramp-up period, I write code that other people can actually maintain, and I've got enough AI integration experience to be useful in that space without being a one-trick pony. I care about shipping things that work, not just things that look clever.",
    experience: [
      radicalSenior([
        'Lead technical delivery on engineering teams. I own the architecture, set up CI/CD, run code reviews, and mentor junior and mid-level developers.',
        'Built AI features for production systems used by real clients — RAG chatbots, document processing, psychological assessment tools, multi-agent coordination. Not prototypes, actual shipped software.',
        'Worked across banking, cyber risk management, and insurance sectors. Each domain required learning new compliance constraints and adapting the tech approach accordingly.',
      ]),
      radicalJunior([
        'Delivered web and mobile apps in React, Next.js, and React Native. Progressed from feature implementation to owning full project delivery — architecture, client communication, sprint planning.',
        'Built real-time collaboration features, complex multi-step forms, and data dashboards. Learned to work directly with stakeholders rather than just taking tickets.',
      ]),
      frontIT([
        'Building a fleet management mobile app with real-time tracking, HERE Maps integration, and tachograph compliance for driver workflows.',
        'Designed offline-first data sync architecture for reliable operation in low-connectivity environments.',
      ]),
      freelance([
        'Side projects and direct client work. End-to-end delivery including a real-time collaboration platform for construction project management.',
      ]),
    ],
    projectsNote: 'Additional enterprise client work under NDA.',
    projects: [withinly, circleOfTrust, daraIntellitech, striveLearning],
  },

  // ── Contract / B2B ─────────────────────────────────────────
  contract: {
    header: {
      name: 'Simas Žurauskas',
      title: 'Software Engineer — Full-Stack, Mobile & AI',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      "Five years delivering production software across web, mobile, and AI — and across more industries than most engineers see in a decade. Banking, insurance, cybersecurity, logistics, healthcare, edtech, construction, fintech. I pick up domain context fast and don't need hand-holding.\n\nI've worked embedded in client teams and as the sole engineer on projects. Either way, I take full ownership of delivery. My stack covers the full range: React/Next.js on the frontend, Node.js on the backend, React Native for mobile, and LangChain/LangGraph for AI integration.",
    experience: [
      radicalSenior([
        'Technical lead on client projects across banking, cyber risk, and insurance. I own architecture, CI/CD, code quality, and delivery timelines.',
        'Delivered production AI systems: RAG chatbots for domain-specific Q&A, document processing pipelines, assessment tools, and multi-agent workflows. All battle-tested with real users.',
        'Comfortable context-switching between domains. Each client brings different constraints — regulatory, technical, organisational — and I adapt quickly.',
      ]),
      radicalJunior([
        'Built web and mobile applications across multiple client engagements. Grew from individual contributor to taking on architecture ownership and client-facing communication.',
        'Delivered real-time features, complex data flows, and cross-platform mobile apps. Consistently reliable on timelines.',
      ]),
      frontIT([
        'Fleet management mobile app — real-time vehicle tracking, HERE Maps, offline-first sync, tachograph compliance. A good example of picking up a niche domain and delivering fast.',
      ]),
      freelance([
        'Direct client engagements: requirements through to deployment and support. Built a real-time construction project management platform as a solo engineer.',
      ]),
    ],
    projectsNote: 'Additional enterprise client work under NDA.',
    projects: [withinly, ukTaxAdviser, striveLearning, circleOfTrust],
  },
};

// Default export for backwards compatibility
export const cvData = cvVariants.general;
