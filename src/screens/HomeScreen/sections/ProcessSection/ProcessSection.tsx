'use client';

import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components';

const Content = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const ProcessFlow = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 80px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const FlowStep = styled(motion.div)<{ $isLast?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border-right: ${({ $isLast, theme }) => ($isLast ? 'none' : `1px solid ${theme.colors.border}`)};
  overflow: hidden;
  transition: background 0.4s ease;

  @media (max-width: 800px) {
    border-right: none;
    border-bottom: ${({ $isLast, theme }) => ($isLast ? 'none' : `1px solid ${theme.colors.border}`)};
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.surfaceAlt};

      .flow-step__number {
        opacity: 0.08;
        transform: translateY(-4px);
      }
    }
  }

  .flow-step {
    &__number {
      position: absolute;
      top: 16px;
      right: 16px;
      font-size: 5rem;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.04em;
      color: ${({ theme }) => theme.colors.foreground};
      opacity: 0.04;
      transition: all 0.4s ease;
      user-select: none;

      @media (max-width: 800px) {
        font-size: 4rem;
        top: 12px;
        right: 12px;
      }
    }

    &__content {
      position: relative;
      z-index: 1;
      flex: 1;
      padding: 48px 32px 24px;

      @media (max-width: 800px) {
        padding: 36px 28px 20px;
      }
    }

    &__title {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.foreground};
      letter-spacing: -0.02em;
      margin-bottom: 12px;
    }

    &__description {
      font-size: 0.8rem;
      line-height: 1.6;
      color: ${({ theme }) => theme.colors.muted};
    }

    &__footer {
      border-top: 1px solid ${({ theme }) => theme.colors.border};
      padding: 16px 32px;
      margin-top: auto;

      @media (max-width: 800px) {
        padding: 14px 28px;
      }
    }

    &__duration {
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const CommitmentsSection = styled.div`
  display: flex;
  gap: 80px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const CommitmentsIntro = styled.div`
  flex-shrink: 0;
  max-width: 280px;

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

const CommitmentsLabel = styled.h3`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 16px;
`;

const CommitmentsTagline = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.foreground};

  span {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

const CommitmentsList = styled(motion.div)`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CommitmentItem = styled(motion.div)`
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:nth-child(odd) {
    padding-right: 32px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};

    @media (max-width: 600px) {
      padding-right: 0;
      border-right: none;
    }
  }

  &:nth-child(even) {
    padding-left: 32px;

    @media (max-width: 600px) {
      padding-left: 0;
    }
  }

  &:nth-last-child(-n + 2) {
    border-bottom: none;

    @media (max-width: 600px) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  &:last-child {
    border-bottom: none;
  }

  .commitment {
    &__title {
      font-size: 0.85rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.foreground};
      margin-bottom: 4px;
    }

    &__description {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.muted};
      line-height: 1.5;
    }
  }
`;

// Animation
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

type PhaseKey = 'DISCOVERY' | 'DESIGN' | 'BUILD' | 'LAUNCH';
type ExpectKey = 'ITERATIONS' | 'TRANSPARENT' | 'DIRECT' | 'OWNERSHIP' | 'FLEXIBLE' | 'SUPPORT';

const PHASE_KEYS: PhaseKey[] = ['DISCOVERY', 'DESIGN', 'BUILD', 'LAUNCH'];
const EXPECT_KEYS: ExpectKey[] = ['ITERATIONS', 'TRANSPARENT', 'DIRECT', 'OWNERSHIP', 'FLEXIBLE', 'SUPPORT'];

export const ProcessSection: React.FC = () => {
  const t = useTranslations('Process');
  const title = t.raw('TITLE') as Array<Array<{ text: string; type?: 'normal' | 'accent' | 'muted' }>>;

  return (
    <SectionWrapper
      id="process"
      index="02"
      label={t('LABEL')}
      title={title}
      sidebarText={t('SIDEBAR_LEFT')}
      sidebarRightText={t('SIDEBAR_RIGHT')}
    >
      <Content>
        <ProcessFlow>
          {PHASE_KEYS.map((key, index) => (
            <FlowStep
              key={key}
              $isLast={index === PHASE_KEYS.length - 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
            >
              <span className="flow-step__number">{index + 1}</span>
              <div className="flow-step__content">
                <h3 className="flow-step__title">{t(`PHASES.${key}.TITLE`)}</h3>
                <p className="flow-step__description">{t(`PHASES.${key}.DESCRIPTION`)}</p>
              </div>
              <div className="flow-step__footer">
                <span className="flow-step__duration">{t(`PHASES.${key}.DURATION`)}</span>
              </div>
            </FlowStep>
          ))}
        </ProcessFlow>

        <CommitmentsSection>
          <CommitmentsIntro>
            <CommitmentsLabel>{t('EXPECTATIONS.LABEL')}</CommitmentsLabel>
            <CommitmentsTagline>
              Clear terms,
              <br />
              <span>no surprises.</span>
            </CommitmentsTagline>
          </CommitmentsIntro>

          <CommitmentsList
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {EXPECT_KEYS.map((key) => (
              <CommitmentItem key={key} variants={fadeUp}>
                <h4 className="commitment__title">{t(`EXPECTATIONS.${key}.TITLE`)}</h4>
                <p className="commitment__description">{t(`EXPECTATIONS.${key}.DESCRIPTION`)}</p>
              </CommitmentItem>
            ))}
          </CommitmentsList>
        </CommitmentsSection>
      </Content>
    </SectionWrapper>
  );
};
