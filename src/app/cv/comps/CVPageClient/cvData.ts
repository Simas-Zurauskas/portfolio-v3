import type { CV, CVVariant, VariantId } from './types';

// ─── Shared data ───────────────────────────────────────────────

const contact: CV['contact'] = {
  location: 'Klaipeda, Lithuania',
  email: 'hello@simaszurauskas.com',
  phone: '+370 666 97781',
  websiteLabel: 'simaszurauskas.com',
  websiteUrl: 'https://simaszurauskas.com',
  linkedinLabel: 'linkedin.com/in/simas-zurauskas',
  linkedinUrl: 'https://www.linkedin.com/in/simas-zurauskas',
  githubLabel: 'github.com/Simas-Zurauskas',
  githubUrl: 'https://github.com/Simas-Zurauskas',
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
  { category: 'AI & LLM', items: ['LangGraph', 'LangChain', 'OpenAI & Anthropic APIs', 'RAG Pipelines', 'Multi-Agent Systems', 'Evals & Cost Metering'] },
  { category: 'AI Enablement', items: ['AI Dev Policies', 'Team Agent Workflows', 'Standards & Audits'] },
  { category: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'styled-components'] },
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
    'AI learning platform where LangGraph agents generate complete courses on demand — roadmap, lessons, quizzes, narration. Every generation is metered in microcents against its measured per-provider cost, so pricing holds through model migrations. Credits sold via Stripe. Built end-to-end: Next.js, MongoDB. Sole owner of product, engineering, and infrastructure.',
  featured: true,
};

const withinly: CV['projects'][number] = {
  name: 'Withinly',
  meta: 'Tech Lead · HealthTech',
  description:
    'Mental wellness application featuring a RAG-powered companion chat grounded in psychology literature, four personality assessments, and AI-generated psychological portraits. Built with a co-founder engineer. Owned architecture decisions, infrastructure setup, and the full AI integration layer.',
};

const circleOfTrust: CV['projects'][number] = {
  name: 'Circle of Trust',
  meta: 'Mobile Lead · Social',
  description:
    'Professional networking app built on trust-based recommendations — users vouch for connections, growing the network through verified relationships. Built cross-platform iOS and Android apps in React Native with QR-based in-person connections, Branch.io deep linking, and a GraphQL API.',
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
    'Local venue discovery app for Manchester with an AI-powered randomiser, favourites, and RevenueCat subscriptions. Sole engineer across all four repos. Managed App Store releases and integrated WordPress CMS for editorial content. React Native.',
};

const daraIntellitech: CV['projects'][number] = {
  name: 'Dara Intellitech',
  meta: 'Tech Lead · SaaS',
  description:
    'Document platform that restructures raw CVs into polished, agency-branded PDFs via a schema-locked LLM agent and a custom JSX-to-PDF rendering engine (headless Chromium). Chat-driven refinement until client-ready. Next.js, TypeScript.',
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
      title: 'AI Engineer',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      'AI engineer with five years of production experience across web, mobile, and AI — now focused on LLM and agent systems in TypeScript. I build end-to-end: RAG pipelines, multi-agent orchestration with LangGraph, and the React/Next.js and Node.js layers around them. Shipped products across banking, insurance, cybersecurity, logistics, healthcare, and edtech.\n\nFounder of Strive, a live AI learning platform that meters every generation in microcents against its measured per-provider cost. And I treat agent output as untrusted — in a recent multi-agent codebase audit, independent verification revised down three of my four Critical findings before anything was reported.',
    experience: [
      radicalSenior([
        'Lead technical delivery across engineering teams — architecture decisions, CI/CD, code reviews, mentorship, and the company’s AI development policy and standards.',
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
      title: 'AI Engineer',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      'AI and full-stack engineer who takes products from concept to production without needing a team of specialists. Five years, 25+ products across 10+ industries — web, mobile, and AI. Experienced in both building and leading: architecture decisions, hands-on development, deployment, and ongoing support.\n\nWork directly with founders and stakeholders on projects that need end-to-end ownership — AI features (RAG, agents), full-stack web apps, and cross-platform mobile apps. I also run Strive, my own AI SaaS, where every generation is metered against its real provider cost — I know what AI costs to run because I pay for mine.',
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
      title: 'Senior AI Engineer',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      'AI engineer with five years building production software across web, mobile, and AI — now focused on LLM and agent systems in TypeScript. Led small engineering teams with combined architecture ownership, mentorship, and hands-on delivery. Operate across every layer of the stack without ramp-up.\n\nProduction AI experience covers RAG pipelines, LangGraph agents, and the unglamorous parts — cost metering, evals, and verifying that agent-written code is safe to ship. Favour working systems over clever abstractions.',
    experience: [
      radicalSenior([
        'Lead technical delivery across engineering teams — architecture ownership, CI/CD pipelines, code reviews, and mentoring junior and mid-level developers.',
        'Delivered production AI systems for banking, cyber-risk, and insurance clients: RAG chatbots, document processing, psychological assessment tools, and multi-agent coordination.',
        'Lead the team’s adoption of AI-assisted development — authoring the company’s AI development policy: agent workflows, verified documentation, and standards anchored to OWASP ASVS and NIST. Ran a multi-agent codebase audit where independent verification revised down three of my own four Critical findings before reporting.',
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
    projects: [striveLearning, withinly, daraIntellitech, circleOfTrust],
  },

  // ── Contract / B2B ─────────────────────────────────────────
  contract: {
    header: {
      name: 'Simas Žurauskas',
      title: 'AI Engineer',
    },
    contact,
    skills,
    languages,
    education,
    summary:
      'Five years delivering production software across web, mobile, and AI — banking, insurance, cybersecurity, logistics, healthcare, edtech, construction, fintech. I pick up domain context fast, and work equally well embedded in a client team or as a sole engineer.\n\nTypeScript end-to-end: React/Next.js, Node.js, React Native, and LLM/agent systems via LangGraph (RAG, multi-agent workflows, document intelligence). I verify what agents write before it ships — in a recent multi-agent codebase audit, independent verification revised down three of my own four Critical findings before anything was reported.',
    experience: [
      radicalSenior([
        'Technical lead on client projects across banking, cyber risk, and insurance — owning architecture, CI/CD, code quality, delivery timelines, and the company’s AI development standards.',
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
    projects: [striveLearning, ukTaxAdviser, withinly, circleOfTrust],
  },
};

// Default export for backwards compatibility
export const cvData = cvVariants.general;
