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
  { category: 'AI & LLM', items: ['LangChain', 'LangGraph', 'OpenAI', 'RAG Pipelines', 'Multi-Agent Systems'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'styled-components'] },
  { category: 'Mobile', items: ['React Native', 'Expo'] },
  { category: 'Backend', items: ['Node.js', 'GraphQL', 'MongoDB', 'Socket.IO', 'Stripe'] },
  { category: 'Infrastructure', items: ['AWS (S3, EC2)', 'Docker', 'CI/CD', 'Vercel'] },
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
    'AI-powered learning platform with four LangGraph agents that generate personalised course roadmaps, modules, and lessons on demand. Users select a topic and receive a complete structured curriculum adapted to their pace. Built end-to-end: Next.js, Stripe subscriptions, MongoDB. Sole owner of product, engineering, and infrastructure.',
  featured: true,
};

const withinly: CV['projects'][number] = {
  name: 'Withinly',
  meta: 'Tech Lead · HealthTech',
  description:
    'Mental wellness application featuring a RAG-powered companion chat grounded in psychology literature, four personality assessments, and AI-generated psychological portraits. Led a team of four. Owned architecture decisions, infrastructure setup, and the full AI integration layer.',
};

const circleOfTrust: CV['projects'][number] = {
  name: 'Circle of Trust',
  meta: 'Mobile Lead · Social',
  description:
    'Professional networking app built on trust-based recommendations — users vouch for connections, growing the network through verified relationships. Built cross-platform iOS and Android apps in React Native with QR-based in-person connections and Branch.io deep linking. Team of eight, GraphQL API.',
};

const ukTaxAdviser: CV['projects'][number] = {
  name: 'WiseMind AI',
  meta: 'AI Engineer · FinTech',
  description:
    'Tax consultation platform with a LangGraph-powered advisory agent. Users upload financial documents; the agent interprets them and provides step-by-step tax guidance. Built the multi-step onboarding flow and document processing pipeline. Next.js, Node.js, MongoDB.',
};

const ppPlatform: CV['projects'][number] = {
  name: 'PP Platform',
  meta: 'Solo · Construction',
  description:
    'Project management system for a construction company with role-based views for site managers, contractors, and admin. Tracks payment cycles, calculates bonuses, and delivers real-time updates via Socket.IO. Solo-built: React, Node.js, AWS S3.',
};

const mcrPerks: CV['projects'][number] = {
  name: "Manchester's Finest",
  meta: 'Tech Lead · Lifestyle',
  description:
    'Local venue discovery app for Manchester with a randomiser feature, favourites, and RevenueCat-powered subscriptions. Led a mobile team of four. Managed App Store releases and integrated WordPress CMS for editorial content. React Native.',
};

const daraIntellitech: CV['projects'][number] = {
  name: 'Dara Intellitech',
  meta: 'Tech Lead · SaaS',
  description:
    'Document creation platform that transforms content into polished PDFs via a custom JSX-to-PDF rendering engine (Puppeteer). Integrated LangGraph-powered AI content enhancement. Led a team of three. Supports reports, proposals, and branded documents. Next.js, TypeScript.',
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
      title: 'AI & Full-Stack Engineer',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      'Full-stack engineer with five years of production experience across web, mobile, and AI. I build end-to-end — from RAG pipelines and multi-agent systems (LangChain, LangGraph) to React/Next.js frontends and Node.js backends. Shipped products across banking, insurance, cybersecurity, logistics, healthcare, and edtech, typically owning architecture through deployment.\n\nMost effective where projects require someone who operates across the full stack and makes independent technical decisions. Equally comfortable leading small teams, mentoring developers, and shipping as a sole engineer.',
    experience: [
      radicalSenior([
        'Lead technical delivery across engineering teams — architecture decisions, CI/CD pipelines, code reviews, and developer mentorship.',
        'Delivered production AI systems: RAG chatbots for domain-specific Q&A, psychological assessment tools, and multi-agent workflows coordinating complex business processes.',
        'Served clients in banking, cyber risk management, and insurance — translating complex domain requirements into reliable technical solutions.',
      ]),
      radicalJunior([
        'Shipped web and mobile applications in React, Next.js, and React Native across multiple industries. Progressed from feature implementation to full project ownership including architecture and client communication.',
        'Built real-time collaboration features, complex form flows, and data visualisation dashboards. Worked directly with founders and operations teams.',
      ]),
      frontIT([
        'Building a fleet management mobile app with real-time vehicle tracking (HERE Maps), tachograph compliance, and driver workflow tools.',
        'Engineered offline-first data sync and background location tracking for reliable operation in low-connectivity environments.',
      ]),
      freelance([
        'End-to-end delivery for founders and small teams — requirements, architecture, development, deployment, and ongoing support.',
        'Built a real-time collaboration platform for construction project management with live document sync and multi-user editing.',
      ]),
    ],
    projectsNote: 'Additional enterprise client work under NDA.',
    projects: [striveLearning, withinly, ukTaxAdviser, ppPlatform],
  },

  // ── Freelance ──────────────────────────────────────────────
  freelance: {
    header: {
      name: 'Simas Žurauskas',
      title: 'AI & Full-Stack Engineer',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      'Full-stack AI engineer who takes products from concept to production without requiring a team of specialists. Five years, 35+ projects across a dozen industries — web, mobile, and AI. Experienced in both building and leading: architecture decisions, hands-on development, deployment, and ongoing support.\n\nWork directly with founders and stakeholders. Specialise in projects that need end-to-end ownership — AI-powered features (RAG, multi-agent systems), full-stack web applications, and cross-platform mobile apps — delivered with fast turnaround and long-term reliability.',
    experience: [
      freelance([
        'End-to-end delivery for founders and small companies — requirements, architecture, development, deployment, and ongoing support.',
        'Built a real-time collaboration platform for construction project management with live document sync. Direct stakeholder collaboration, no intermediaries.',
        'Clients range from solo founders to growing teams. Deliver full product builds, AI feature integration, and technical consulting.',
      ]),
      radicalSenior([
        'Lead technical delivery on client teams — architecture decisions, CI/CD, code reviews, and mentoring.',
        'Delivered production AI systems: RAG chatbots, document processing pipelines, assessment tools, and multi-agent workflows serving real users.',
      ]),
      radicalJunior([
        'Shipped web and mobile apps across banking, insurance, and cybersecurity. Progressed from feature work to full project ownership.',
        'Developed ability to translate business problems into technical solutions through direct engagement with founders and operations teams.',
      ]),
      frontIT([
        'Fleet management mobile app — real-time vehicle tracking (HERE Maps), tachograph compliance, offline-first sync for low-connectivity environments.',
      ]),
    ],
    projectsNote: 'Additional enterprise client work under NDA.',
    projects: [striveLearning, ppPlatform, ukTaxAdviser, mcrPerks],
  },

  // ── Full-time ──────────────────────────────────────────────
  fulltime: {
    header: {
      name: 'Simas Žurauskas',
      title: 'Senior AI & Full-Stack Engineer',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      'Full-stack engineer with five years building production software across web, mobile, and AI. Led small engineering teams with combined architecture ownership, mentorship, and hands-on delivery. Operate across every layer of the stack without ramp-up.\n\nBring production AI integration experience (RAG pipelines, multi-agent systems, LLM-powered features) alongside deep full-stack proficiency. Write maintainable code, ship reliably, and focus on working systems over clever abstractions.',
    experience: [
      radicalSenior([
        'Lead technical delivery across engineering teams — architecture ownership, CI/CD pipelines, code reviews, and mentoring junior and mid-level developers.',
        'Delivered production AI systems for client projects: RAG chatbots, document processing, psychological assessment tools, and multi-agent coordination.',
        'Served banking, cyber risk management, and insurance sectors — adapting technical approaches to domain-specific compliance constraints.',
      ]),
      radicalJunior([
        'Delivered web and mobile apps in React, Next.js, and React Native. Progressed from feature implementation to full project ownership — architecture, client communication, sprint planning.',
        'Built real-time collaboration features, complex multi-step forms, and data dashboards. Engaged directly with stakeholders on requirements.',
      ]),
      frontIT([
        'Building a fleet management mobile app with real-time tracking (HERE Maps) and tachograph compliance for driver workflows.',
        'Designed offline-first data sync architecture for reliable operation in low-connectivity environments.',
      ]),
      freelance([
        'Direct client engagements including a real-time collaboration platform for construction project management. End-to-end delivery.',
      ]),
    ],
    projectsNote: 'Additional enterprise client work under NDA.',
    projects: [withinly, circleOfTrust, daraIntellitech, striveLearning],
  },

  // ── Contract / B2B ─────────────────────────────────────────
  contract: {
    header: {
      name: 'Simas Žurauskas',
      title: 'AI & Full-Stack Engineer',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      'Five years delivering production software across web, mobile, and AI — spanning banking, insurance, cybersecurity, logistics, healthcare, edtech, construction, and fintech. Rapid domain context acquisition. Effective both embedded in client teams and as a sole engineer.\n\nFull ownership of delivery end-to-end. Stack covers React/Next.js, Node.js, React Native, and AI integration via LangChain/LangGraph (RAG pipelines, multi-agent systems, document intelligence). Comfortable with architecture decisions, team leadership, and independent execution.',
    experience: [
      radicalSenior([
        'Technical lead on client projects across banking, cyber risk, and insurance — owning architecture, CI/CD, code quality, and delivery timelines.',
        'Delivered production AI systems: RAG chatbots for domain-specific Q&A, document processing pipelines, assessment tools, and multi-agent workflows.',
        "Rapid context-switching between domains, adapting to each client's regulatory, technical, and organisational constraints.",
      ]),
      radicalJunior([
        'Built web and mobile applications across multiple client engagements. Progressed from individual contributor to architecture ownership and client-facing communication.',
        'Delivered real-time features, complex data flows, and cross-platform mobile apps. Consistent delivery against timelines.',
      ]),
      frontIT([
        'Fleet management mobile app — real-time vehicle tracking (HERE Maps), offline-first sync, tachograph compliance. Rapid domain ramp-up and delivery.',
      ]),
      freelance([
        'Direct client engagements from requirements through deployment. Built a real-time construction project management platform as sole engineer.',
      ]),
    ],
    projectsNote: 'Additional enterprise client work under NDA.',
    projects: [withinly, ukTaxAdviser, striveLearning, circleOfTrust],
  },
};

// Default export for backwards compatibility
export const cvData = cvVariants.general;
