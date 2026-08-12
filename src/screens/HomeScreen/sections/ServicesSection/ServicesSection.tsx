'use client';

import React from 'react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
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

type ServiceI18nKey = 'WEB' | 'MOBILE' | 'AI' | 'BACKEND' | 'DESIGN' | 'UIUX' | 'CONSULTING' | 'EXISTING';

const servicesBase: Array<{
  key: ServiceI18nKey;
  index: Service['index'];
  tech: Service['tech'];
  projectCount: Service['projectCount'];
}> = [
  { key: 'AI', index: '01', tech: ['LangGraph', 'OpenAI', 'Anthropic', 'RAG', 'Multi-Agent Systems'], projectCount: 8 },
  { key: 'CONSULTING', index: '02', tech: ['AI Strategy', 'Agent Workflows', 'Code Reviews', 'Architecture', 'Mentorship'], projectCount: 10 },
  { key: 'WEB', index: '03', tech: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Node.js'], projectCount: 20 },
  { key: 'MOBILE', index: '04', tech: ['React Native', 'Expo', 'iOS', 'Android'], projectCount: 8 },
  { key: 'BACKEND', index: '05', tech: ['Node.js', 'PostgreSQL', 'AWS', 'Docker', 'CI/CD'], projectCount: 15 },
  { key: 'DESIGN', index: '06', tech: ['Product Strategy', 'UX Flows', 'Wireframes', 'Prototypes'], projectCount: 8 },
  { key: 'UIUX', index: '07', tech: ['Design Systems', 'Responsive UI', 'Framer Motion', 'A11y'], projectCount: 25 },
  { key: 'EXISTING', index: '08', tech: ['Bug Fixes', 'Refactoring', 'Performance', 'Features'], projectCount: 15 },
];

// Animation variants

// Service item component with parallax

export const ServicesSection: React.FC = () => {
  const t = useTranslations('Services');

  const title = t.raw('TITLE') as Array<Array<{ text: string; type?: 'normal' | 'accent' | 'muted' }>>;

  const services: Service[] = servicesBase.map((s) => ({
    ...s,
    title: t(`ITEMS.${s.key}.TITLE`),
    description: t(`ITEMS.${s.key}.DESCRIPTION`),
  }));

  return (
    <SectionWrapper
      id="services"
      index="01"
      label={t('LABEL')}
      title={title}
      sidebarText={t('SIDEBAR_LEFT')}
      sidebarRightText={t('SIDEBAR_RIGHT')}
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
