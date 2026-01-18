import type { CV } from './types';

export const cvData: CV = {
  header: {
    name: 'Simas Žurauskas',
    title: 'Software Engineer — Full-Stack, Mobile & AI',
  },
  contact: {
    location: 'Kaunas, Lithuania',
    email: 'hello@simaszurauskas.com',
    phone: '+370 666 97781',
    websiteLabel: 'simaszurauskas.com',
    websiteUrl: 'https://simaszurauskas.com',
    linkedinLabel: 'linkedin.com/in/simas-zurauskas',
    linkedinUrl: 'https://www.linkedin.com/in/simas-zurauskas',
    githubLabel: 'github.com/simaszurauskas',
    githubUrl: 'https://github.com/simaszurauskas',
  },
  skills: [
    'React',
    'Next.js',
    'TypeScript',
    'React Native',
    'Expo',
    'Node.js',
    'GraphQL',
    'PostgreSQL',
    'MongoDB',
    'AWS',
    'GitHub Actions',
    'LangChain',
    'RAG',
    'AWS',
  ],
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Lithuanian', level: 'Native' },
  ],
  education: [
    {
      title: 'Turing College — AI Engineering',
      meta: '2025 · LLMs, RAG, Agents',
    },
  ],
  summary:
    "Full-stack engineer building production software across web, mobile, and AI. I've shipped 35+ projects across 10+ industries—fintech, healthtech, cybersecurity, logistics. I do my best work owning outcomes end-to-end: aligning with stakeholders, making architecture decisions, shipping, and keeping systems stable over time.",
  experience: [
    {
      role: 'Full-Stack Developer',
      date: 'Mar 2021 — Present',
      company: 'Radical Company · UK · Remote · Full-time',
      points: [
        "Shipped 20+ web apps and 10 mobile apps (React/Next.js, React Native) for banking, insurance, cybersecurity, logistics, healthcare, and fleet management.",
        'Delivered AI features to production on 8 products: RAG chatbots, document processing pipelines, assessment tools, and agent workflows.',
        'Tech lead on teams of 3–8: architecture decisions, CI/CD, code reviews, and mentoring.',
      ],
    },
    {
      role: 'React Native Developer',
      date: 'Apr 2025 — Present',
      company: 'FrontIT · Lithuania · Remote · Part-time',
      points: [
        'Fleet management app with real-time vehicle tracking, HERE Maps, tachograph compliance, and driver workflows.',
        'Offline-first sync and background location designed to stay reliable in low-connectivity conditions.',
      ],
    },
    {
      role: 'Freelance Engineer',
      date: '2023 — Present',
      company: 'Independent',
      points: [
        'End-to-end delivery: scoping, building, deployment, and support—often working directly with founders and ops.',
        'Built a real-time collaboration tool for construction with live document sync and multi-user editing.',
        "I focus on clarity and durability: explicit trade-offs, predictable delivery, and systems that are easy to run.",
      ],
    },
  ],
  projects: [
    {
      name: 'Strive Learning',
      meta: 'Solo · EdTech',
      description:
        'AI learning platform built from scratch. Four agents generate roadmaps, lessons, and mentoring. Implemented on Next.js (server actions) to keep infrastructure minimal and maintenance low. Reached 3K users organically.',
      featured: true,
    },
    {
      name: 'Withinly',
      meta: 'Tech Lead · HealthTech · Team of 4',
      description:
        'Mental wellness app. Owned frontend, backend, and infrastructure. Built a fast RAG chatbot by iterating on retrieval quality and evaluation. Delivered 4 personality assessments and AI portrait generation.',
    },
    {
      name: 'Circle of Trust',
      meta: 'Mobile Lead · Social · Team of 8',
      description:
        'Professional networking app with LinkedIn-style 1st/2nd degree connections. Chose GraphQL because relationship queries become complex quickly. iOS & Android, QR onboarding.',
    },
    {
      name: 'WiseMind AI',
      meta: 'AI Engineer · FinTech · Team of 6',
      description:
        'AI tax advisor in a compliance-heavy domain. Users upload documents, complete onboarding, then receive guidance via chat. Built with careful guardrails and strong handling for edge cases.',
    },
    {
      name: 'PP Platform',
      meta: 'Solo · Construction · B2B',
      description:
        'Project management for site managers. Designed for at-a-glance usage: dashboards, salary calculations, finance tracking, and quality-of-life improvements aligned to real workflows.',
    },
  ],
};
