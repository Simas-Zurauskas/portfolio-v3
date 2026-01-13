'use client';

import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, User, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Project, CardSize } from '../types';
import { ImageSlider } from './ImageSlider';

interface StyledCardProps {
  $size?: CardSize;
}

const getGridSpan = (size?: CardSize) => {
  switch (size) {
    case 'large':
      return `
        grid-column: span 5;
        grid-row: span 1;
      `;
    case 'wide':
      return `
        grid-column: span 3;
      `;
    case 'tall':
      return `
        grid-column: span 2;
        grid-row: span 2;
      `;
    default:
      // regular cards span 2 columns
      return `
        grid-column: span 2;
      `;
  }
};

const Card = styled(motion.article)<StyledCardProps>`
  position: relative;
  display: ${({ $size }) => ($size === 'large' ? 'grid' : 'flex')};
  ${({ $size }) =>
    $size === 'large'
      ? `
    grid-template-columns: 1fr 1fr;
    gap: 0;
  `
      : 'flex-direction: column;'}
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.hex.border};
  border-radius: 2px;
  overflow: hidden;
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  ${({ $size }) => getGridSpan($size)}

  @media (max-width: 1024px) {
    grid-column: ${({ $size }) => ($size === 'large' ? 'span 3' : $size === 'wide' ? 'span 2' : 'span 1')};
    grid-row: span 1;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    grid-column: ${({ $size }) => ($size === 'large' || $size === 'wide' ? 'span 2' : 'span 1')};
  }

  @media (max-width: 600px) {
    grid-column: span 1;
    grid-row: span 1;
    display: flex;
    flex-direction: column;
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.hex.muted};
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);

      .project-card__image {
        transform: scale(1.05);
      }
    }
  }

  .project-card {
    &__image-container {
      position: relative;
      width: 100%;
      aspect-ratio: ${({ $size }) => ($size === 'large' ? '16/10' : $size === 'tall' ? '16/12' : '16/9')};
      background: ${({ theme }) => theme.colors.surfaceAlt};
      overflow: hidden;
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};

      ${({ $size }) =>
        $size === 'large' &&
        `
        border-bottom: none;
        border-right: 1px solid var(--border);
        aspect-ratio: 16/11;
        
        @media (max-width: 900px) {
          border-right: none;
          border-bottom: 1px solid var(--border);
          aspect-ratio: 16/9;
        }
      `}

      /* Grid pattern background */
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(${({ theme }) => theme.hex.muted}25 1px, transparent 1px),
          linear-gradient(90deg, ${({ theme }) => theme.hex.muted}25 1px, transparent 1px);
        background-size: 20px 20px;
        opacity: 1;
        z-index: 0;
        mask-image: radial-gradient(ellipse 80% 70% at center, black 30%, transparent 80%);
        -webkit-mask-image: radial-gradient(ellipse 80% 70% at center, black 30%, transparent 80%);
      }

      /* Subtle inner shadow for depth */
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.hex.foreground}12;
        pointer-events: none;
        z-index: 3;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    &__industry {
      position: absolute;
      top: 16px;
      left: 16px;
      padding: 6px 12px;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: ${({ theme }) => theme.colors.surface};
      color: ${({ theme }) => theme.colors.foreground};
      border: 1px solid ${({ theme }) => theme.colors.border};
      backdrop-filter: blur(8px);
      z-index: 15;
    }

    &__complexity {
      position: absolute;
      top: 16px;
      right: 16px;
      display: flex;
      gap: 2px;
      z-index: 15;
    }

    &__star {
      width: 12px;
      height: 12px;
      color: ${({ theme }) => theme.colors.accent};
      fill: ${({ theme }) => theme.colors.accent};

      &--empty {
        fill: transparent;
        opacity: 0.3;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: ${({ $size }) => ($size === 'large' ? '32px' : '20px')};
      flex: 1;
      background: ${({ theme }) => theme.colors.surface};

      @media (max-width: 600px) {
        padding: 20px;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
    }

    &__title {
      font-size: ${({ $size }) => ($size === 'large' ? '1.75rem' : $size === 'wide' ? '1.5rem' : '1.125rem')};
      font-weight: 700;
      color: ${({ theme }) => theme.colors.foreground};
      letter-spacing: -0.02em;
      line-height: 1.2;
      transition: color 0.3s ease;
    }

    &__role {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 0;
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }

    &__role-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 10px;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.accent};
      background: ${({ theme }) => theme.hex.accent}12;
      border: 1px solid ${({ theme }) => theme.hex.accent}30;
      border-radius: 2px;

      svg {
        width: 11px;
        height: 11px;
        opacity: 0.9;
      }
    }

    &__role-team {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 10px;
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: ${({ theme }) => theme.colors.muted};
      background: ${({ theme }) => theme.colors.surfaceAlt};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 2px;

      svg {
        width: 11px;
        height: 11px;
        opacity: 0.7;
      }
    }

    &__role-scope {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-left: auto;

      @media (max-width: 600px) {
        margin-left: 0;
        width: 100%;
        margin-top: 4px;
      }
    }

    &__scope-tag {
      padding: 3px 8px;
      font-size: 0.55rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      color: ${({ theme }) => theme.colors.muted};
      background: transparent;
      border: 1px solid ${({ theme }) => theme.hex.border};
      border-radius: 2px;
      transition: border-color 0.2s ease, color 0.2s ease;

      @media (hover: hover) {
        &:hover {
          border-color: ${({ theme }) => theme.hex.muted}60;
          color: ${({ theme }) => theme.colors.foreground};
        }
      }
    }

    &__description {
      font-size: ${({ $size }) => ($size === 'large' ? '0.9375rem' : '0.875rem')};
      line-height: 1.6;
      color: ${({ theme }) => theme.colors.muted};
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &__tech {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: auto;
      padding-top: 12px;
    }

    &__tech-tag {
      padding: 4px 10px;
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
      background: ${({ theme }) => theme.colors.surface};
      border: 1px solid ${({ theme }) => theme.colors.border};
      transition: border-color 0.2s ease, color 0.2s ease;

      @media (hover: hover) {
        &:hover {
          border-color: ${({ theme }) => theme.hex.foreground}40;
          color: ${({ theme }) => theme.colors.foreground};
        }
      }
    }

    &__highlights {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 8px;
      padding-top: 12px;
      border-top: 1px solid ${({ theme }) => theme.colors.border};
    }

    &__highlight {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.muted};

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        background: ${({ theme }) => theme.colors.accent};
        border-radius: 50%;
        flex-shrink: 0;
      }
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid ${({ theme }) => theme.colors.border};
    }

    &__link-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      color: ${({ theme }) => theme.colors.foreground};
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.3s ease;
      min-height: 44px; /* Touch-friendly target */

      @media (max-width: 600px) {
        width: 100%;
        justify-content: center;
        padding: 14px 20px;
      }

      &:hover {
        background: ${({ theme }) => theme.colors.accent};
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.background};
        transform: translateY(-1px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.hex.accent}30;
      }

      &:active {
        transform: translateY(0);
      }

      svg {
        width: 14px;
        height: 14px;
        transition: transform 0.3s ease;
      }

      &:hover svg {
        transform: translateX(2px);
      }
    }
  }
`;

// Animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const t = useTranslations('Work');
  const { title, description, industry, tech, highlights, images, size, link, linkLabel, role } = project;
  const isLargeCard = size === 'large' || size === 'tall';
  const slideImages = images && images.length > 0 ? images : [];
  const hasLink = Boolean(link);
  const isSolo = role.teamSize === 1;

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card variants={cardVariants} $size={size}>
      <div className="project-card__image-container">
        <ImageSlider images={slideImages} alt={title} />
        <span className="project-card__industry">{industry}</span>
      </div>

      <div className="project-card__content">
        <div className="project-card__header">
          <h3 className="project-card__title">{title}</h3>
        </div>

        <div className="project-card__role">
          <span className="project-card__role-badge">
            {isSolo ? <User /> : <Users />}
            {role.title}
          </span>
          {!isSolo && (
            <span className="project-card__role-team">
              <Users />
              Team of {role.teamSize}
            </span>
          )}
        </div>

        <p className="project-card__description">{description}</p>

        {isLargeCard && highlights.length > 0 && (
          <div className="project-card__highlights">
            {highlights.slice(0, 3).map((highlight, idx) => (
              <span key={idx} className="project-card__highlight">
                {highlight}
              </span>
            ))}
          </div>
        )}

        <div className="project-card__tech">
          {tech.slice(0, isLargeCard ? 6 : 4).map((t) => (
            <span key={t} className="project-card__tech-tag">
              {t}
            </span>
          ))}
        </div>

        {hasLink && (
          <div className="project-card__footer">
            <button className="project-card__link-btn" onClick={handleLinkClick}>
              {linkLabel || t('LINK.VISIT_SITE')}
              <ExternalLink />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};
