'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform, animate, useSpring, Variants, useInView } from 'framer-motion';
import { COUNT_CLIENTS, COUNT_DOMAINS, COUNT_PROJECTS, COUNT_YEARS } from '@/conf';
import { Button } from '@/components';
import { useTranslations } from 'next-intl';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  padding-top: 64px; /* Account for fixed navbar */
  display: grid;
  grid-template-columns: minmax(0, 1fr) 80px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr) 60px;
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr) 40px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  /* Vertical grid line to match sections */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 60px; /* Stop before marquee */
    right: 80px;
    width: 1px;
    background: ${({ theme }) => theme.colors.border};

    @media (max-width: 1024px) {
      right: 60px;
    }

    @media (max-width: 768px) {
      right: 40px;
    }

    @media (max-width: 480px) {
      display: none;
    }
  }

  /* Noise texture overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 1;
  }

  .hero-main {
    &__spotlight {
      position: absolute;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        ${({ theme }) => theme.hex.accent}22 0%,
        ${({ theme }) => theme.hex.accent}08 30%,
        transparent 60%
      );
      filter: blur(60px);
      pointer-events: none;
      transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      z-index: 0;
    }

    &__body {
      display: flex;
      align-items: center;
      padding-bottom: 80px;

      @media (max-width: 480px) {
        align-items: stretch;
        padding-top: 0;
        padding-bottom: 0;
        min-height: calc(100dvh - 64px - 60px); /* viewport - navbar - marquee */
      }
    }

    &__container {
      position: relative;
      width: 100%;
      /* Align with section content: 80px left margin + content padding */
      padding-left: calc(80px + clamp(24px, 5vw, 80px));
      padding-right: clamp(24px, 5vw, 80px);
      z-index: 2;

      @media (max-width: 1024px) {
        padding-left: calc(60px + clamp(24px, 5vw, 60px));
        padding-right: clamp(24px, 5vw, 60px);
      }

      @media (max-width: 768px) {
        padding-left: calc(40px + clamp(24px, 5vw, 40px));
        padding-right: clamp(24px, 5vw, 40px);
      }

      @media (max-width: 480px) {
        padding-left: 20px;
        padding-right: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    }

    &__layout {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: clamp(40px, 8vw, 120px);
      align-items: center;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      @media (max-width: 480px) {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 32px;

      @media (max-width: 480px) {
        gap: 24px;
        flex: 1;
      }
    }

    &__overline {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.accent};

      @media (max-width: 480px) {
        margin-top: auto; /* Push text group down from top */
      }
    }

    &__overline-line {
      width: 48px;
      height: 2px;
      background: ${({ theme }) => theme.colors.accent};
      transform-origin: left;
    }

    &__title {
      font-size: clamp(2.75rem, 10vw, 8rem);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.04em;
      color: ${({ theme }) => theme.colors.foreground};
      white-space: nowrap;

      @media (max-width: 480px) {
        font-size: clamp(2.25rem, 12vw, 3.5rem);
      }
    }

    &__title-line {
      display: block;

      &:first-child {
        overflow: hidden;
        padding-bottom: 0.05em;
      }

      &:nth-child(2) {
        padding-top: 0.15em; /* Space for sketch marks */
        padding-bottom: 0.15em; /* Space for descenders and sketch marks */
        color: transparent;
        -webkit-text-stroke: 2px ${({ theme }) => theme.colors.foreground};
        text-stroke: 2px ${({ theme }) => theme.colors.foreground};
      }
    }

    &__title-accent {
      color: ${({ theme }) => theme.colors.accent};
      -webkit-text-stroke: 0;
      text-stroke: 0;
    }

    &__title-sketch {
      position: relative;
      display: inline-block;
      padding: 0.05em 0.15em;
      margin-left: -0.1em;

      /* Grid background */
      &::before {
        content: '';
        position: absolute;
        inset: -0.1em;
        background-image: linear-gradient(${({ theme }) => theme.colors.muted} 1px, transparent 1px),
          linear-gradient(90deg, ${({ theme }) => theme.colors.muted} 1px, transparent 1px);
        background-size: 0.18em 0.18em;
        opacity: 0.12;
        z-index: -1;
      }
    }

    &__sketch-marks {
      position: absolute;
      /* Match grid background: inset -0.1em */
      top: -0.1em;
      left: -0.1em;
      right: -0.1em;
      bottom: -0.1em;
      pointer-events: none;

      /* Corner brackets - top-left and bottom-right */
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 0.3em;
        height: 0.3em;
        opacity: 0.3;
      }

      &::before {
        top: -7px;
        left: -7px;
        border-top: 1px solid ${({ theme }) => theme.colors.foreground};
        border-left: 1px solid ${({ theme }) => theme.colors.foreground};
      }

      &::after {
        bottom: -7px;
        right: -7px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.foreground};
        border-right: 1px solid ${({ theme }) => theme.colors.foreground};
      }
    }

    &__description {
      max-width: 480px;
      font-size: 1.125rem;
      line-height: 1.7;
      color: ${({ theme }) => theme.colors.muted};

      @media (max-width: 480px) {
        font-size: 1rem;
        line-height: 1.6;
      }
    }

    &__cta-row {
      display: flex;
      gap: 16px;

      @media (max-width: 480px) {
        flex-direction: column;
        gap: 12px;
        margin-bottom: auto; /* Push text group up from metrics */

        button {
          width: 100%;
        }
      }
    }

    /* Mobile metrics - shown only on mobile when sidebar is hidden */
    &__mobile-metrics {
      display: none;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      padding: 24px 0;
      padding-bottom: 80px; /* Space for marquee */
      border-top: 1px solid ${({ theme }) => theme.colors.border};
      margin-top: auto; /* Push to bottom */

      @media (max-width: 480px) {
        display: grid;
      }

      @media (max-width: 360px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }

    &__mobile-metric {
      text-align: center;

      @media (max-width: 360px) {
        text-align: left;
      }
    }

    &__mobile-metric-value {
      font-size: 1.25rem;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.foreground};
      line-height: 1;
    }

    &__mobile-metric-label {
      font-size: 0.55rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
      margin-top: 4px;
    }

    &__side {
      position: relative;
      width: 320px;
      height: 400px;
      margin-right: clamp(40px, 8vw, 120px);

      @media (max-width: 1024px) {
        display: none;
      }
    }

    &__shape {
      position: absolute;
      border-radius: 8px;
      z-index: 1;

      &--1 {
        top: 0;
        right: 0;
        width: 200px;
        height: 200px;
        background: linear-gradient(
          135deg,
          ${({ theme }) => theme.hex.accent}55 0%,
          ${({ theme }) => theme.hex.accent}18 100%
        );
        border: 1px solid ${({ theme }) => theme.hex.accent}70;
      }

      &--2 {
        top: 80px;
        right: 120px;
        width: 140px;
        height: 140px;
        background: linear-gradient(135deg, ${({ theme }) => theme.hex.secondary}35 0%, transparent 100%);
        border: 1px solid ${({ theme }) => theme.hex.secondary}50;
      }

      &--3 {
        bottom: 0;
        right: 40px;
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, ${({ theme }) => theme.hex.secondary}28 0%, transparent 100%);
        border: 1px solid ${({ theme }) => theme.hex.secondary}45;
      }
    }

    &__orbit {
      position: absolute;
      top: 50%;
      right: 50%;
      width: 300px;
      height: 300px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 50%;
      transform: translate(50%, -50%);
      z-index: 0;
    }

    &__dot {
      position: absolute;
      width: 10px;
      height: 10px;
      background: ${({ theme }) => theme.colors.accent};
      border-radius: 50%;
      box-shadow: 0 0 25px ${({ theme }) => theme.hex.accent}cc;

      &--1 {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      &--2 {
        bottom: 20%;
        right: 0;
      }

      &--3 {
        bottom: 20%;
        left: 0;
      }
    }

    /* Right sidebar with metrics */
    &__sidebar {
      position: relative;
      grid-column: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 40px;
      padding: 80px 0;
      margin-bottom: 60px; /* Leave space for marquee */
      z-index: 2;

      @media (max-width: 768px) {
        gap: 32px;
        padding: 60px 0;
      }

      @media (max-width: 480px) {
        display: none;
      }
    }

    &__metric {
      text-align: center;
    }

    &__metric-value {
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 900;
      color: ${({ theme }) => theme.colors.foreground};
      line-height: 1;
    }

    &__metric-label {
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
      margin-top: 6px;
    }

    &__sidebar-text {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
    }
  }

  .hero-main__marquee {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0px;
    padding: 20px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    overflow: hidden;
    z-index: 2;

    @media (max-width: 768px) {
      right: 40px;
    }

    @media (max-width: 480px) {
      right: 0;
    }

    &-track {
      display: flex;
      width: max-content;
    }

    &-item {
      display: inline-flex;
      align-items: center;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
      white-space: nowrap;

      &::after {
        content: '';
        width: 3px;
        height: 3px;
        margin: 0 40px;
        background: ${({ theme }) => theme.colors.accent};
        border-radius: 50%;
        flex-shrink: 0;
      }
    }
  }
`;

// Animation easing
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Parent container controls all animation timing
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Animation variants - delays now handled by staggerChildren
const revealUpVariants: Variants = {
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

const slideInVariants: Variants = {
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

const lineExpandVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

const pulseVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

const marqueeVariants: Variants = {
  animate: {
    x: [0, '-50%'],
    transition: {
      duration: 30,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

// Animated counter component using Framer Motion
const AnimatedCounter = ({ value, suffix = '+', delay = 0 }: { value: number; suffix?: string; delay?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Start animation after delay
    const timeout = setTimeout(() => {
      const controls = animate(count, value, {
        duration: 2,
        ease: 'easeOut',
      });

      const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));

      return () => {
        controls.stop();
        unsubscribe();
      };
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [count, rounded, value, delay]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
};

// Floating shape variants
const shapeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

// Interactive floating shape with mouse proximity effect
interface FloatingShapeProps {
  className: string;
  floatDelay: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  centerX: number;
  centerY: number;
  isInView: boolean;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  className,
  floatDelay,
  mouseX,
  mouseY,
  centerX,
  centerY,
  isInView,
}) => {
  // Calculate distance-based offset (shapes move away from cursor slightly)
  const offsetX = useTransform(mouseX, (x) => {
    const distance = x - centerX;
    const maxOffset = 5;
    const influence = Math.max(0, 1 - Math.abs(distance) / 200);
    return distance * influence * 0.04 * maxOffset;
  });

  const offsetY = useTransform(mouseY, (y) => {
    const distance = y - centerY;
    const maxOffset = 5;
    const influence = Math.max(0, 1 - Math.abs(distance) / 200);
    return distance * influence * 0.04 * maxOffset;
  });

  // Smooth the offsets with springs (softer response)
  const springX = useSpring(offsetX, { stiffness: 80, damping: 25 });
  const springY = useSpring(offsetY, { stiffness: 80, damping: 25 });

  return (
    <motion.div
      className={className}
      variants={shapeVariants}
      animate={
        isInView
          ? {
              y: [0, -20, 0],
              rotate: [0, 3, 0],
            }
          : {}
      }
      transition={{
        y: { duration: 6, ease: 'easeInOut', repeat: Infinity, delay: floatDelay },
        rotate: { duration: 6, ease: 'easeInOut', repeat: Infinity, delay: floatDelay },
      }}
      style={{
        x: springX,
        translateY: springY,
      }}
    />
  );
};

export const Hero = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Hero');

  // Single animation controller via useInView
  const isInView = useInView(contentRef, { once: false, margin: '-100px' });

  // Mouse position for floating shapes
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse tracking for spotlight and floating shapes
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${x - 400}px, ${y - 400}px)`;
      }

      // Update mouse position for floating shapes (relative to side container)
      if (sideRef.current) {
        const sideRect = sideRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - sideRect.left - sideRect.width / 2);
        mouseY.set(e.clientY - sideRect.top - sideRect.height / 2);
      }
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    if (!mounted) return;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, handleMouseMove]);

  const marqueeItems = [
    ...((t.raw('MARQUEE.ITEMS') as unknown as string[]) || []),
    t('MARQUEE.PRODUCTS_DELIVERED', { count: COUNT_PROJECTS }),
    t('MARQUEE.YEARS_EXPERIENCE', { count: COUNT_YEARS }),
    t('MARQUEE.DOMAINS', { count: COUNT_DOMAINS }),
    t('MARQUEE.CLIENTS', { count: COUNT_CLIENTS }),
  ];

  return (
    <Section ref={sectionRef}>
      <div className="hero-main__spotlight" ref={spotlightRef} />

      <motion.div
        className="hero-main__body"
        ref={contentRef}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <div className="hero-main__container">
          <div className="hero-main__layout">
            <div className="hero-main__content">
              <motion.span className="hero-main__overline" variants={revealUpVariants}>
                <motion.span className="hero-main__overline-line" variants={lineExpandVariants} />
                {t('AVAILABLE_FOR_PROJECTS')}
              </motion.span>

              <motion.h1 className="hero-main__title" variants={revealUpVariants}>
                <span className="hero-main__title-line">
                  <motion.span style={{ display: 'inline-block' }} variants={slideInVariants}>
                    I build
                  </motion.span>
                </span>
                <span className="hero-main__title-line">
                  <motion.span style={{ display: 'inline-block' }} variants={slideInVariants}>
                    <span className="hero-main__title-accent">Soft</span>
                    <span className="hero-main__title-sketch">
                      <span className="hero-main__sketch-marks" />
                      ware
                    </span>
                  </motion.span>
                </span>
              </motion.h1>

              <motion.p className="hero-main__description" variants={revealUpVariants}>
                {t('DESCRIPTION')}
              </motion.p>

              <motion.div className="hero-main__cta-row" variants={revealUpVariants}>
                <Button
                  size="lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('CTA_PRIMARY')}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('CTA_SECONDARY')}
                </Button>
              </motion.div>

              {/* Mobile Metrics - shown when sidebar is hidden */}
              <motion.div className="hero-main__mobile-metrics" variants={revealUpVariants}>
                <div className="hero-main__mobile-metric">
                  <div className="hero-main__mobile-metric-value">{COUNT_YEARS}+</div>
                  <div className="hero-main__mobile-metric-label">{t('METRICS.YEARS')}</div>
                </div>
                <div className="hero-main__mobile-metric">
                  <div className="hero-main__mobile-metric-value">{COUNT_PROJECTS}+</div>
                  <div className="hero-main__mobile-metric-label">{t('METRICS.PROJECTS')}</div>
                </div>
                <div className="hero-main__mobile-metric">
                  <div className="hero-main__mobile-metric-value">{COUNT_CLIENTS}+</div>
                  <div className="hero-main__mobile-metric-label">{t('METRICS.CLIENTS')}</div>
                </div>
                <div className="hero-main__mobile-metric">
                  <div className="hero-main__mobile-metric-value">{COUNT_DOMAINS}+</div>
                  <div className="hero-main__mobile-metric-label">{t('METRICS.DOMAINS')}</div>
                </div>
              </motion.div>
            </div>

            <motion.div className="hero-main__side" ref={sideRef} variants={revealUpVariants}>
              <motion.div className="hero-main__orbit" variants={pulseVariants}>
                <span className="hero-main__dot hero-main__dot--1" />
                <span className="hero-main__dot hero-main__dot--2" />
                <span className="hero-main__dot hero-main__dot--3" />
              </motion.div>
              <FloatingShape
                className="hero-main__shape hero-main__shape--1"
                floatDelay={0}
                mouseX={mouseX}
                mouseY={mouseY}
                centerX={100}
                centerY={100}
                isInView={isInView}
              />
              <FloatingShape
                className="hero-main__shape hero-main__shape--2"
                floatDelay={2}
                mouseX={mouseX}
                mouseY={mouseY}
                centerX={20}
                centerY={150}
                isInView={isInView}
              />
              <FloatingShape
                className="hero-main__shape hero-main__shape--3"
                floatDelay={4}
                mouseX={mouseX}
                mouseY={mouseY}
                centerX={60}
                centerY={300}
                isInView={isInView}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right sidebar with metrics */}
      <motion.div
        className="hero-main__sidebar"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        <span className="hero-main__sidebar-text">SZ.{new Date().getFullYear().toString().slice(2)}</span>

        <div className="hero-main__metric">
          <div className="hero-main__metric-value">
            <AnimatedCounter value={COUNT_YEARS} delay={0.7} />
          </div>
          <div className="hero-main__metric-label">{t('METRICS.YEARS')}</div>
        </div>
        <div className="hero-main__metric">
          <div className="hero-main__metric-value">
            <AnimatedCounter value={COUNT_PROJECTS} delay={0.9} />
          </div>
          <div className="hero-main__metric-label">{t('METRICS.PROJECTS')}</div>
        </div>
        <div className="hero-main__metric">
          <div className="hero-main__metric-value">
            <AnimatedCounter value={COUNT_CLIENTS} delay={1.1} />
          </div>
          <div className="hero-main__metric-label">{t('METRICS.CLIENTS')}</div>
        </div>

        <span className="hero-main__sidebar-text">{t('MORE')}</span>
      </motion.div>

      <div className="hero-main__marquee">
        <motion.div className="hero-main__marquee-track" initial="hidden" animate="animate" variants={marqueeVariants}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="hero-main__marquee-item">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
