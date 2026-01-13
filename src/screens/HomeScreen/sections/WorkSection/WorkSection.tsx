'use client';

import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { SectionWrapper } from '@/components';
import { useTranslations } from 'next-intl';
import { Project, ProjectRole } from './types';
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
`;

const Industries = styled.div`
  margin-bottom: 40px;
  max-width: 900px;

  @media (max-width: 480px) {
    margin-bottom: 32px;
  }

  .work-industries {
    &__title {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
      margin-bottom: 10px;
    }

    &__desc {
      font-size: 0.9rem;
      line-height: 1.7;
      color: ${({ theme }) => theme.colors.muted};
      margin-bottom: 16px;
      max-width: 720px;
    }

    &__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    &__chip {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 12px;
      font-size: 0.65rem;
      font-weight: 650;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
      background: ${({ theme }) => theme.colors.surface};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 2px;
      white-space: nowrap;
      transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, color 0.2s ease,
        box-shadow 0.2s ease;

      @media (hover: hover) {
        &:hover {
          border-color: ${({ theme }) => theme.hex.foreground}22;
          color: ${({ theme }) => theme.colors.foreground};
          transform: translateY(-1px);
        }
      }
    }
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

type ProjectId = 'strive' | 'withinly' | 'mcr' | 'dara' | 'uk-tax' | 'circle-of-trust' | 'pp-platforma';

type ProjectBase = Omit<Project, 'description' | 'industry' | 'highlights'> & { id: ProjectId };

// Role definitions for each project
const projectRoles: Record<ProjectId, ProjectRole> = {
  strive: {
    title: 'Solo',
    scope: ['Frontend', 'Backend', 'AI', 'DevOps'],
    teamSize: 1,
  },
  withinly: {
    title: 'Tech Lead',
    scope: ['Frontend', 'Backend', 'AI', 'DevOps'],
    teamSize: 4,
  },
  mcr: {
    title: 'Tech Lead',
    scope: ['Mobile', 'Backend', 'CMS', 'App Store'],
    teamSize: 4,
  },
  dara: {
    title: 'Tech Lead',
    scope: ['Frontend', 'AI Integration'],
    teamSize: 3,
  },
  'uk-tax': {
    title: 'AI Engineer',
    scope: ['Frontend AI', 'Backend AI'],
    teamSize: 6,
  },
  'circle-of-trust': {
    title: 'Mobile Lead',
    scope: ['Mobile Frontend'],
    teamSize: 8,
  },
  'pp-platforma': {
    title: 'Solo',
    scope: ['Frontend', 'Backend', 'Infrastructure', 'DevOps'],
    teamSize: 1,
  },
};

const projectsBase: ProjectBase[] = [
  {
    id: 'strive',
    title: 'Strive Learning',
    tech: ['Next.js', 'LangGraph', 'OpenAI', 'Stripe', 'MongoDB'],
    role: projectRoles.strive,
    size: 'large',
    link: 'https://www.strive-learning.com',
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
    tech: ['Next.js', 'LangGraph', 'OpenAI', 'Pinecone', 'Stripe'],
    role: projectRoles.withinly,
    size: 'wide',
    link: 'https://withinly.app',
    images: ['/images/proj/withinly_1.png', '/images/proj/withinly_2.png', '/images/proj/withinly_3.png'],
  },
  {
    id: 'mcr',
    title: "Manchester's Finest",
    tech: ['React Native', 'Expo', 'MongoDB', 'RevenueCat'],
    role: projectRoles.mcr,
    images: ['/images/proj/mcr_phone.png'],
  },
  {
    id: 'dara',
    title: 'Dara Intellitech',
    tech: ['Next.js', 'Puppeteer', 'LangGraph', 'TypeScript'],
    role: projectRoles.dara,
    images: ['/images/proj/dara_1.png'],
  },
  {
    id: 'uk-tax',
    title: 'WiseMind AI',
    tech: ['Next.js', 'LangGraph', 'OpenAI', 'MongoDB', 'Stripe'],
    role: projectRoles['uk-tax'],
    size: 'wide',
    link: 'https://app.wisemindai.co.uk',
    images: ['/images/proj/wise_mind_1.png'],
  },
  {
    id: 'circle-of-trust',
    title: 'Circle of Trust',
    tech: ['React Native', 'GraphQL', 'Firebase', 'Branch.io'],
    role: projectRoles['circle-of-trust'],
    size: 'wide',
    images: ['/images/proj/cot_1.png', '/images/proj/cot_2.png', '/images/proj/cot_3.png'],
  },
  {
    id: 'pp-platforma',
    title: 'PP Platform',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'AWS S3'],
    role: projectRoles['pp-platforma'],
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
  const t = useTranslations('Work');
  const title = t.raw('TITLE') as Array<Array<{ text: string; type?: 'normal' | 'accent' | 'muted' }>>;
  const projects: Project[] = projectsBase.map((p) => ({
    ...p,
    description: t(`PROJECTS.${p.id}.DESCRIPTION`),
    industry: t(`PROJECTS.${p.id}.INDUSTRY`),
    highlights: (t.raw(`PROJECTS.${p.id}.HIGHLIGHTS`) as unknown as string[]) || [],
  }));
  const industries = (t.raw('INDUSTRIES.ITEMS') as unknown as Array<{ label: string; featured?: boolean }>) || [];

  return (
    <SectionWrapper
      id="work"
      index="03"
      label={t('LABEL')}
      title={title}
      sidebarText={t('SIDEBAR_LEFT')}
      sidebarRightText={t('SIDEBAR_RIGHT')}
      alternate
    >
      <Content>
        <Disclaimer>{t('DISCLAIMER')}</Disclaimer>

        <Industries>
          <div className="work-industries__title">{t('INDUSTRIES.TITLE')}</div>
          <div className="work-industries__desc">{t('INDUSTRIES.DESCRIPTION')}</div>
          <div className="work-industries__chips">
            {industries.map((item) => (
              <span key={item.label} className="work-industries__chip">
                {item.label}
              </span>
            ))}
          </div>
        </Industries>

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
      </Content>
    </SectionWrapper>
  );
};
