import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Service } from '../types';

const ServiceItem = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: clamp(24px, 4vw, 48px);
  padding: clamp(32px, 5vw, 56px) 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (max-width: 900px) {
    grid-template-columns: 60px 1fr;
    gap: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 28px 0;
  }
`;

const ServiceIndex = styled(motion.span)`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.border};
  opacity: 0.5;
  user-select: none;
  will-change: transform;

  @media (max-width: 600px) {
    position: absolute;
    top: 24px;
    right: 0;
    font-size: 3rem;
    opacity: 0.15;
  }
`;

const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
`;

const ServiceTitle = styled(motion.h3)`
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const ServiceDescription = styled(motion.p)`
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 500px;
`;

const ServiceMeta = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  padding-top: 8px;

  @media (max-width: 900px) {
    grid-column: 2;
    align-items: flex-start;
  }

  @media (max-width: 600px) {
    grid-column: 1;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
  max-width: 280px;

  @media (max-width: 900px) {
    justify-content: flex-start;
    max-width: none;
  }
`;

const TechPill = styled(motion.span)`
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    padding: 8px 14px;
    font-size: 0.6rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.hex.accent}50;
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const ProjectCount = styled(motion.div)`
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};

  span {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.accent};
    letter-spacing: -0.02em;
  }
`;

const CredentialBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: ${({ theme }) => theme.hex.accent}08;
  border: 1px solid ${({ theme }) => theme.hex.accent}25;
  margin-top: 16px;

  svg {
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.accent};
    flex-shrink: 0;
  }
`;

const CredentialInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CredentialTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  letter-spacing: 0.01em;
`;

const CredentialIssuer = styled.span`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.02em;
`;

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
      staggerChildren: 0.08,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

// Wrapper variants for unified animation control
const wrapperVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const ServiceItemWithParallax: React.FC<{ service: Service }> = ({ service }) => {
  const t = useTranslations('Services');
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for the index number - moves slower than scroll
  const indexY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <ServiceItem
      as={motion.div}
      ref={itemRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={wrapperVariants}
    >
      <ServiceIndex style={{ y: indexY }}>{service.index}</ServiceIndex>

      <motion.div variants={itemVariants}>
        <ServiceContent>
          <ServiceTitle variants={contentVariants}>{service.title}</ServiceTitle>
          <ServiceDescription variants={contentVariants}>{service.description}</ServiceDescription>
          {service.credential && (
            <CredentialBadge variants={contentVariants}>
              <Award />
              <CredentialInfo>
                <CredentialTitle>{service.credential.title}</CredentialTitle>
                <CredentialIssuer>
                  {service.credential.issuer}
                  {service.credential.year && ` • ${service.credential.year}`}
                </CredentialIssuer>
              </CredentialInfo>
            </CredentialBadge>
          )}
        </ServiceContent>
      </motion.div>

      <ServiceMeta variants={itemVariants}>
        <TechStack>
          {service.tech.map((tech) => (
            <TechPill key={tech} variants={pillVariants}>
              {tech}
            </TechPill>
          ))}
        </TechStack>
        <ProjectCount variants={contentVariants}>
          <span>{service.projectCount}+</span> {t('PROJECTS_LABEL')}
        </ProjectCount>
      </ServiceMeta>
    </ServiceItem>
  );
};
