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

type ServiceI18nKey = 'WEB' | 'MOBILE' | 'AI' | 'BACKEND' | 'UIUX' | 'CONSULTING';

const servicesBase: Array<{
  key: ServiceI18nKey;
  index: Service['index'];
  tech: Service['tech'];
  projectCount: Service['projectCount'];
}> = [
  { key: 'WEB', index: '01', tech: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Node.js'], projectCount: 20 },
  { key: 'MOBILE', index: '02', tech: ['React Native', 'Expo', 'iOS', 'Android'], projectCount: 10 },
  { key: 'AI', index: '03', tech: ['LangChain', 'OpenAI', 'RAG', 'Agents'], projectCount: 8 },
  { key: 'BACKEND', index: '04', tech: ['Node.js', 'PostgreSQL', 'AWS', 'Docker', 'CI/CD'], projectCount: 15 },
  { key: 'UIUX', index: '05', tech: ['Figma', 'Design Systems', 'Framer Motion', 'A11y'], projectCount: 25 },
  { key: 'CONSULTING', index: '06', tech: ['Code Reviews', 'Architecture', 'Mentorship', 'DevOps'], projectCount: 20 },
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
