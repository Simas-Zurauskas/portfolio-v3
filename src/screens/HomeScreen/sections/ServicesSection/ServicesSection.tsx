'use client';

import React from 'react';
import styled from 'styled-components';
import { SectionWrapper } from '@/components';
import { Service } from './types';
import { ServiceItemWithParallax } from './comps';

const Content = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const services: Service[] = [
  {
    index: '01',
    title: 'Web Applications',
    description:
      'Full-stack web products from architecture to deployment. Dashboards, SaaS platforms, e-commerce — built to scale.',
    tech: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Node.js'],
    projectCount: 25,
  },
  {
    index: '02',
    title: 'Mobile Development',
    description:
      'Cross-platform iOS and Android apps. From concept to App Store — native performance with shared codebase.',
    tech: ['React Native', 'Expo', 'iOS', 'Android'],
    projectCount: 8,
  },
  {
    index: '03',
    title: 'AI Integration',
    description:
      'Adding intelligence to your product. Custom AI agents, chatbots, document processing, and automation workflows.',
    tech: ['LangChain', 'OpenAI', 'RAG', 'Agents'],
    projectCount: 6,
  },
  {
    index: '04',
    title: 'Backend & Infrastructure',
    description:
      'Scalable APIs, databases, and cloud infrastructure. CI/CD pipelines, containerization, and production-ready deployments.',
    tech: ['Node.js', 'PostgreSQL', 'AWS', 'Docker', 'CI/CD'],
    projectCount: 20,
  },
  {
    index: '05',
    title: 'UI/UX Implementation',
    description:
      'Turning designs into polished interfaces. Design systems, responsive layouts, animations, and accessibility.',
    tech: ['Figma', 'Design Systems', 'Framer Motion', 'A11y'],
    projectCount: 35,
  },
  {
    index: '06',
    title: 'Technical Consulting',
    description:
      'Architecture reviews, performance optimization, and technology decisions. Helping teams ship better software.',
    tech: ['Code Reviews', 'Architecture', 'Mentorship', 'DevOps'],
    projectCount: 15,
  },
];

// Animation variants

// Service item component with parallax

export const ServicesSection: React.FC = () => {
  return (
    <SectionWrapper
      id="services"
      index="01"
      label="Capabilities"
      title={[
        [{ text: 'How I Can' }],
        [
          { text: 'Help', type: 'accent' },
          { text: ' you ship', type: 'muted' },
        ],
      ]}
      sidebarText="Services"
      sidebarRightText="What I Do"
    >
      <Content>
        <ServicesList>
          {services.map((service) => (
            <ServiceItemWithParallax key={service.index} service={service} />
          ))}
        </ServicesList>
      </Content>
    </SectionWrapper>
  );
};
