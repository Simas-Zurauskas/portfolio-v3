'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface StyledSectionProps {
  $alternate?: boolean;
}

const Section = styled.section<StyledSectionProps>`
  position: relative;
  min-height: 100dvh;
  /* Frame cap: the gutter grows past 80px on wide viewports so the whole frame
     (rails, watermark, corners, content) stays centered around a ~1300px column. */
  --gutter: max(80px, calc((100% - 1300px) / 2));
  --corner-inset: 24px;
  display: grid;
  grid-template-columns: var(--gutter) 1fr var(--gutter);
  background: ${({ theme, $alternate }) => ($alternate ? theme.colors.surface : theme.colors.background)};

  @media (max-width: 1024px) {
    --gutter: 60px;
    --corner-inset: 16px;
  }

  @media (max-width: 768px) {
    --gutter: 40px;
    min-height: 100svh;
  }

  @media (max-width: 480px) {
    --gutter: 0px;
    min-height: auto;
  }

  /* Vertical grid lines */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  &::before {
    left: var(--gutter);
    @media (max-width: 480px) {
      display: none;
    }
  }

  &::after {
    right: var(--gutter);
    @media (max-width: 480px) {
      display: none;
    }
  }

  .section {
    &__index {
      position: absolute;
      top: 100px;
      left: var(--gutter);
      transform: translateX(-50%);
      font-size: clamp(6rem, 15vw, 12rem);
      font-weight: 900;
      line-height: 1;
      color: ${({ theme, $alternate }) => ($alternate ? theme.colors.accent : theme.colors.border)};
      opacity: ${({ $alternate }) => ($alternate ? 0.15 : 0.5)};
      z-index: 0;
      user-select: none;
      pointer-events: none;

      /* Light borders are much fainter than dark ones — boost so the numeral rhythm survives */
      [data-theme='light'] & {
        opacity: ${({ $alternate }) => ($alternate ? 0.22 : 0.85)};
      }

      @media (max-width: 1024px) {
        font-size: clamp(5rem, 12vw, 10rem);
      }

      @media (max-width: 768px) {
        top: 80px;
        font-size: clamp(4rem, 12vw, 8rem);
      }

      @media (max-width: 480px) {
        position: absolute;
        top: 70px;
        left: 20px;
        transform: none;
        font-size: 4rem;
        opacity: 0.1;
      }
    }

    &__sidebar {
      grid-column: 1;
      grid-row: 1 / -1; /* Stretch full height */
      border-right: 1px solid ${({ theme }) => theme.colors.border};

      @media (max-width: 480px) {
        display: none;
      }
    }

    &__sidebar-text {
      display: block;
      position: sticky;
      top: 50vh;
      transform: translateY(-50%);
      margin-top: 50vh;
      margin-bottom: 50vh;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      white-space: nowrap;
      color: ${({ theme }) => theme.colors.muted};
      width: fit-content;
      margin-left: auto;
      margin-right: auto;

      @media (max-width: 768px) {
        font-size: 0.5rem;
      }
    }

    /* Wide gutters: keep the labels near the inner rails, not floating mid-gutter */
    @media (min-width: 1461px) {
      &__sidebar .section__sidebar-text {
        margin-right: 32px;
      }

      &__sidebar-right .section__sidebar-text {
        margin-left: 32px;
      }
    }

    &__sidebar-right {
      grid-column: 3;
      grid-row: 1 / -1; /* Stretch full height */
      border-left: 1px solid ${({ theme }) => theme.colors.border};

      @media (max-width: 480px) {
        display: none;
      }
    }

    &__main {
      grid-column: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px);
      z-index: 1;

      @media (max-width: 480px) {
        padding: 80px 20px 60px;
      }
    }

    &__corner {
      position: absolute;
      width: 48px;
      height: 48px;
      border: 1px solid ${({ theme, $alternate }) => ($alternate ? `${theme.hex.accent}40` : theme.colors.border)};

      &--tl {
        top: 24px;
        left: calc(var(--gutter) + var(--corner-inset));
        border-right: none;
        border-bottom: none;
      }

      &--br {
        bottom: 24px;
        right: calc(var(--gutter) + var(--corner-inset));
        border-left: none;
        border-top: none;
      }

      @media (max-width: 1024px) {
        width: 40px;
        height: 40px;
      }

      @media (max-width: 768px) {
        width: 32px;
        height: 32px;
      }

      @media (max-width: 480px) {
        display: none;
      }
    }

    &__accent-bar {
      position: absolute;
      bottom: 0;
      left: var(--gutter);
      right: var(--gutter);
      height: 3px;
      background: ${({ theme, $alternate }) =>
        $alternate
          ? `linear-gradient(90deg, transparent 0%, ${theme.colors.border} 50%, ${theme.colors.accent} 100%)`
          : `linear-gradient(90deg, ${theme.colors.accent} 0%, ${theme.colors.border} 50%, transparent 100%)`};

      @media (max-width: 480px) {
        height: 2px;
      }
    }
  }
`;

const LabelContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 1200px;
`;

const LabelLine = styled(motion.span)`
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.border} 50%,
    transparent 100%
  );
  transform-origin: left;
`;

const LabelText = styled(motion.span)`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.muted};
`;

const Title = styled.h2`
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 48px;

  @media (max-width: 480px) {
    font-size: clamp(1.75rem, 8vw, 2.5rem);
    margin-bottom: 32px;
  }
`;

const TitleLine = styled.span`
  display: block;
  overflow: hidden;
  /* Prevent clipping of diacritics (e.g. Lithuanian „į“) on big type */
  padding-bottom: 0.14em;
`;

const TitleAccent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0.1em;
    left: 0;
    right: 0;
    height: 0.15em;
    background: ${({ theme }) => theme.hex.accent}30;
  }
`;

const TitleMuted = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 400;
`;

const Divider = styled(motion.div)`
  max-width: 600px;
  height: 1px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.border} 50%,
    transparent 100%
  );
  margin-bottom: 48px;
  transform-origin: left;
`;

// Animation easing
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Single parent controls all animation timing
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Label group
const labelGroupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: smoothEase,
      delay: 0.5,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
      delay: 0.7,
    },
  },
};

// Title group - staggers lines
const titleVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideInVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

const expandVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

// Title segment types
type TitleSegmentType = 'normal' | 'accent' | 'muted';

interface TitleSegment {
  text: string;
  type?: TitleSegmentType;
}

type TitleLine = TitleSegment[];

interface SectionWrapperProps {
  children: React.ReactNode;
  index?: string;
  label?: string;
  title?: TitleLine[];
  showDivider?: boolean;
  sidebarText?: string;
  sidebarRightText?: string;
  alternate?: boolean;
  showCorners?: boolean;
  showAccentBar?: boolean;
  id?: string;
}

// Helper to render a segment
const renderSegment = (segment: TitleSegment, idx: number) => {
  switch (segment.type) {
    case 'accent':
      return <TitleAccent key={idx}>{segment.text}</TitleAccent>;
    case 'muted':
      return <TitleMuted key={idx}>{segment.text}</TitleMuted>;
    default:
      return <React.Fragment key={idx}>{segment.text}</React.Fragment>;
  }
};

const MotionTitle = motion(Title);

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  index,
  label,
  title,
  showDivider = true,
  sidebarText,
  sidebarRightText,
  alternate = false,
  showCorners = true,
  showAccentBar = true,
  id,
}) => {
  return (
    <Section $alternate={alternate} id={id}>
      {index && <span className="section__index">{index}</span>}

      <div className="section__sidebar">
        {sidebarText && <span className="section__sidebar-text">{sidebarText}</span>}
      </div>

      <motion.div
        className="section__main"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        {label && (
          <LabelContainer variants={labelGroupVariants}>
            <LabelLine variants={lineVariants} />
            <LabelText variants={textVariants}>{label}</LabelText>
          </LabelContainer>
        )}

        {title && (
          <MotionTitle variants={titleVariants}>
            {title.map((line, lineIdx) => (
              <TitleLine key={lineIdx}>
                <motion.span style={{ display: 'inline-block' }} variants={slideInVariants}>
                  {line.map((segment, segIdx) => renderSegment(segment, segIdx))}
                </motion.span>
              </TitleLine>
            ))}
          </MotionTitle>
        )}

        {title && showDivider && <Divider variants={expandVariants} />}

        <motion.div variants={contentVariants}>{children}</motion.div>
      </motion.div>

      <div className="section__sidebar-right">
        {sidebarRightText && <span className="section__sidebar-text">{sidebarRightText}</span>}
      </div>

      {showCorners && (
        <>
          <div className="section__corner section__corner--tl" />
          <div className="section__corner section__corner--br" />
        </>
      )}

      {showAccentBar && <div className="section__accent-bar" />}
    </Section>
  );
};
