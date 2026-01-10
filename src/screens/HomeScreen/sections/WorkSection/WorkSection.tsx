'use client';

import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { SectionWrapper } from '@/components';
import { Project } from './types';
import { ProjectCard } from './comps';

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 32px;
  max-width: 600px;

  strong {
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: 600;
  }
`;

const BentoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: dense;
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const projects: Project[] = [
  {
    id: 'strive',
    title: 'Strive Learning',
    description:
      'Personalized learning platform that transforms any topic into a complete course. AI generates structured roadmaps, modules, and interactive lessons, while a built-in tutor guides learners through their journey.',
    industry: 'EdTech',
    tech: ['Next.js', 'LangGraph', 'OpenAI', 'Stripe', 'MongoDB'],
    highlights: [
      '4 AI agents (roadmap, module, lesson, chat)',
      'Visual course roadmap editor',
      'Credit-based subscriptions',
    ],
    size: 'large',
    link: 'https://www.strive-learning.com',
    linkLabel: 'Visit Site',
    images: [
      '/images/proj/strive_5.png',
      '/images/proj/strive_1.png',
      '/images/proj/strive_2.png',
      '/images/proj/strive_3.png',
      '/images/proj/strive_4.png',
    ],
  },
  {
    id: 'withinly',
    title: 'Withinly',
    description:
      'Mental wellness companion that helps you understand yourself and your relationships. Take personality assessments, chat with an AI that remembers your journey, and receive beautifully crafted psychological insights.',
    industry: 'HealthTech',
    tech: ['Next.js', 'LangGraph', 'OpenAI', 'Pinecone', 'Stripe'],
    size: 'wide',
    highlights: [
      'RAG-powered companion agent',
      '4 personality assessments',
      'AI-generated Inner & Relational Portraits',
    ],
    link: 'https://withinly.com',
    images: ['/images/proj/withinly_1.png', '/images/proj/withinly_2.png', '/images/proj/withinly_3.png'],
  },
  {
    id: 'mcr',
    title: 'MCR Perks',
    description:
      'Mobile app for discovering local hotspots and exclusive perks. Browse curated places, save favorites, and let the randomizer surprise you with your next adventure—all with member-only benefits.',
    industry: 'Lifestyle',
    tech: ['React Native', 'Expo', 'MongoDB', 'RevenueCat'],
    highlights: ['Place randomizer feature', 'RevenueCat subscriptions', 'WordPress CMS integration'],
    images: ['/images/proj/mcr_phone.png'],
  },
  {
    id: 'dara',
    title: 'Dara INTELLITECH',
    description:
      'Document creation platform that turns your content into polished, professional PDFs. Choose from beautifully designed templates, customize with ease, and let AI help you write compelling content.',
    industry: 'SaaS',
    tech: ['Next.js', 'Puppeteer', 'LangGraph', 'TypeScript'],
    highlights: ['JSX-to-PDF rendering', 'Multiple template types', 'AI content enhancement'],
    images: ['/images/proj/dara_1.png'],
  },
  {
    id: 'uk-tax',
    title: 'WiseMind AI',
    description:
      'Financial guidance platform helping UK businesses and sole traders keep more of what they earn. Get confidential, jargon-free advice on tax savings, smarter pay strategies, and hidden government benefits—all FCA-compliant.',
    industry: 'FinTech',
    tech: ['Next.js', 'LangGraph', 'OpenAI', 'MongoDB', 'Stripe'],
    highlights: ['AI tax advice agent', 'Document file processing', 'Multi-step onboarding flow'],
    size: 'wide',
    link: 'https://app.wisemindai.co.uk',
    images: ['/images/proj/wise_mind_1.png'],
  },
  {
    id: 'circle-of-trust',
    title: 'Circle of Trust',
    description:
      'Professional networking app built on trust. Build meaningful connections through circles, get recommendations from people you already trust, and grow your network with confidence on iOS and Android.',
    industry: 'Social',
    tech: ['React Native', 'GraphQL', 'Firebase', 'Branch.io'],
    highlights: ['Trust-based recommendation engine', 'QR code connection system', '52 MJML email templates'],
    size: 'wide',
    images: ['/images/proj/cot_1.png', '/images/proj/cot_2.png', '/images/proj/cot_3.png'],
  },
  {
    id: 'pp-platforma',
    title: 'PP Platform',
    description:
      'Construction project management system that keeps teams aligned. Track projects from start to finish, manage payments and bonuses, and give every role—from engineers to accountants—exactly the access they need.',
    industry: 'Construction',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'AWS S3'],
    highlights: ['4-tier role system', 'Payment cycle & bonus tracking', 'Real-time project updates'],
  },
];

// Animation variants
const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const WorkSection: React.FC = () => {
  return (
    <SectionWrapper
      id="work"
      index="02"
      label="Selected Projects"
      title={[
        [{ text: 'Real' }],
        [
          { text: 'Problems', type: 'accent' },
          { text: ' solved', type: 'muted' },
        ],
      ]}
      sidebarText="Work"
      sidebarRightText="Projects"
      alternate
    >
      <Content>
        <Disclaimer>
          Due to <strong>confidentiality agreements</strong> with agencies and clients, many projects cannot be
          disclosed. The selection below represents publicly shareable work across various industries.
        </Disclaimer>

        <BentoGrid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
          variants={gridVariants}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </BentoGrid>
      </Content>
    </SectionWrapper>
  );
};
