'use client';

import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';
import { COUNT_DOMAINS, COUNT_PROJECTS, COUNT_YEARS } from '@/conf';
import { Button } from '@/components';
import { useTranslations } from 'next-intl';

/**
 * Hero1 — "Agent session"
 * Existing editorial text left; a premium dark terminal card right, story-boarded to
 * the real work: LangGraph agent chain, Pinecone retrieval, microcent metering,
 * verification (including a revised finding), price-held model migration.
 * The terminal stays DARK in both themes — idiomatic, and it gives light mode the
 * contrast the old floating squares lacked.
 */

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  padding-top: 64px; /* Account for fixed navbar */
  --gutter: max(80px, calc((100% - 1300px) / 2));
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--gutter);
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 1024px) {
    --gutter: 60px;
  }

  @media (max-width: 768px) {
    --gutter: 40px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  /* No vertical rails in the hero — the giant H1 runs past the gutter at narrower
     widths, so a rail would cut through the type. The rail system starts at Services. */

  /* Noise texture overlay (same as live hero) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 1;
  }

  .hero1 {
    &__body {
      display: flex;
      align-items: center;
      padding-bottom: 80px; /* Bottom clearance (marquee strip in production) */
      z-index: 2;

      @media (max-width: 480px) {
        padding-top: 24px;
        padding-bottom: 80px;
      }
    }

    &__container {
      position: relative;
      width: 100%;
      /* Align with the section frame: gutter + content padding */
      padding-left: calc(var(--gutter) + clamp(24px, 5vw, 80px));
      padding-right: clamp(24px, 5vw, 80px);
      z-index: 2;

      @media (max-width: 1024px) {
        padding-left: calc(var(--gutter) + clamp(24px, 5vw, 60px));
        padding-right: clamp(24px, 5vw, 60px);
      }

      @media (max-width: 768px) {
        padding-left: calc(var(--gutter) + clamp(24px, 5vw, 40px));
        padding-right: clamp(24px, 5vw, 40px);
      }

      @media (max-width: 480px) {
        padding-left: 20px;
        padding-right: 20px;
      }
    }

    &__layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: clamp(32px, 3.5vw, 72px);
      align-items: center;

      @media (max-width: 1100px) {
        grid-template-columns: 1fr;
        gap: 48px;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 32px;

      @media (max-width: 480px) {
        gap: 24px;
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

      /* Side-by-side band: keep the nowrap H1 clear of the terminal card */
      @media (max-width: 1366px) and (min-width: 1101px) {
        font-size: clamp(2.5rem, 7vw, 6rem);
      }

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
        padding-top: 0.15em;
        padding-bottom: 0.15em;
        color: transparent;
        -webkit-text-stroke: 2px ${({ theme }) => theme.colors.foreground};
      }
    }

    &__title-accent {
      color: ${({ theme }) => theme.colors.accent};
      -webkit-text-stroke: 0;
    }

    &__title-sketch {
      position: relative;
      display: inline-block;
      padding: 0.05em 0.15em;
      margin-left: -0.1em;

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
      top: -0.1em;
      left: -0.1em;
      right: -0.1em;
      bottom: -0.1em;
      pointer-events: none;

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

        button {
          width: 100%;
        }
      }
    }

    &__metrics {
      display: flex;
      gap: clamp(24px, 3vw, 40px);
      max-width: 480px;
      padding-top: 24px;
      border-top: 1px solid ${({ theme }) => theme.colors.border};
    }

    &__metric {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    &__metric-value {
      font-size: 1.25rem;
      font-weight: 800;
      line-height: 1;
      color: ${({ theme }) => theme.colors.foreground};
    }

    &__metric-label {
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
    }

    /* ---- Terminal composition (right) ---- */

    &__visual {
      position: relative;
      width: clamp(300px, 26vw, 380px);
      pointer-events: none;
      user-select: none;

      /* When the layout stacks, drop the terminal entirely — text carries the hero */
      @media (max-width: 1100px) {
        display: none;
      }
    }

    /* Sizes to the card only, so the ghost mirrors the card — not the caption */
    &__stack {
      position: relative;
    }

    /* Ghost card behind, for depth — theme-aware paper */
    &__ghost {
      position: absolute;
      top: 20px;
      left: 20px;
      right: -14px;
      bottom: -14px;
      background: ${({ theme }) => theme.colors.surfaceAlt};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 8px;
      z-index: 0;
    }

    /* The terminal stays dark in BOTH themes — pinned palette, not theme tokens */
    &__card {
      position: relative;
      z-index: 1;
      background: ${({ theme }) => theme.colorsLib.darkSurface};
      border: 1px solid ${({ theme }) => theme.colorsLib.darkBorder};
      border-radius: 8px;
      transform: rotate(-1.5deg);
      box-shadow:
        0 30px 70px -24px ${({ theme }) => theme.colorsLib.black}b3,
        0 8px 24px -12px ${({ theme }) => theme.colorsLib.black}80;

      @media (max-width: 1100px) {
        transform: none;
      }
    }

    &__chrome {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid ${({ theme }) => theme.colorsLib.darkBorder};
    }

    &__dots {
      display: flex;
      gap: 6px;

      span {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colorsLib.darkMuted};
        opacity: 0.4;
      }
    }

    &__chrome-title {
      font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.65rem;
      letter-spacing: 0.08em;
      color: ${({ theme }) => theme.colorsLib.darkMuted};
    }

    &__lines {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 14px 16px 16px;
      font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.72rem;
      line-height: 1.6;
      color: ${({ theme }) => theme.colorsLib.darkForeground};

      @media (max-width: 480px) {
        font-size: 0.68rem;
      }
    }

    &__caption {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 32px; /* Clears the ghost's 14px overhang below the card */
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};

      &::before {
        content: '';
        width: 20px;
        height: 1px;
        background: ${({ theme }) => theme.colors.border};
        flex-shrink: 0;
      }
    }
  }

  .t-line {
    display: grid;
    /* ch-based columns scale with the mono font (7-char labels like "migrate") */
    grid-template-columns: 1.5ch 8ch minmax(0, 1fr);
    column-gap: 1ch;
  }

  .t-cmd {
    grid-column: 2 / -1;
  }

  .t-glyph {
    text-align: left;
  }

  /* Accent used only for the ▸ glyphs and the final ✓ */
  .t-acc {
    color: ${({ theme }) => theme.colorsLib.orangeLight};
  }

  .t-label {
    color: ${({ theme }) => theme.colorsLib.darkMuted};
  }

  .t-dim {
    color: ${({ theme }) => theme.colorsLib.darkMuted};
  }

  .t-ok {
    color: ${({ theme }) => theme.colorsLib.greenLight};
  }

  .t-cursor {
    display: inline-block;
    width: 0.55em;
    height: 1.05em;
    transform: translateY(2px);
    background: ${({ theme }) => theme.colorsLib.darkForeground};
    animation: hero1-blink 1.15s steps(1, end) infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  @keyframes hero1-blink {
    0%,
    55% {
      opacity: 1;
    }
    56%,
    100% {
      opacity: 0;
    }
  }

  /* Bottom marquee strip — ported from the previous production hero */
  .hero1__marquee {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    overflow: hidden;
    z-index: 2;

    &-track {
      display: flex;
      width: max-content;
      animation: hero1-marquee-scroll 33s linear infinite;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }

    @keyframes hero1-marquee-scroll {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(-50%, 0, 0);
      }
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

// Animation easing (same cadence as live hero)
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const revealUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

const lineExpandVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

// Terminal lines: sequential ~75ms/line, once, then static
const termContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.55,
    },
  },
};

const termLineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.16, ease: 'easeOut' },
  },
};

// Session storyboard — a representative agent run; every practice shown is real:
// LangGraph chain, Pinecone retrieval, microcent metering with an audit trail,
// verification with a revised finding, price held through a model migration.
type TermSeg = { t: string; c?: 'dim' | 'ok' };
type TermLine =
  | { kind: 'cmd'; text: string }
  | { kind: 'step'; glyph: string; label: string; segs: TermSeg[] }
  | { kind: 'cursor' };

const TERM_LINES: TermLine[] = [
  { kind: 'cmd', text: 'agent run --session rag-pipeline' },
  { kind: 'step', glyph: '▸', label: 'plan', segs: [{ t: 'derive structure ' }, { t: '← uploaded docs', c: 'dim' }] },
  {
    kind: 'step',
    glyph: '▸',
    label: 'agent',
    segs: [{ t: 'clarify → design → generate' }, { t: ' · LangGraph', c: 'dim' }],
  },
  {
    kind: 'step',
    glyph: '▸',
    label: 'tool',
    segs: [{ t: 'pinecone.query' }, { t: '  k=12  ns=source-docs', c: 'dim' }],
  },
  {
    kind: 'step',
    glyph: '▸',
    label: 'gen',
    segs: [{ t: 'section 04/12' }, { t: ' · streamed 2.3k tokens', c: 'dim' }],
  },
  {
    kind: 'step',
    glyph: '▸',
    label: 'verify',
    segs: [
      { t: 'schema ' },
      { t: '✓', c: 'ok' },
      { t: '  citations ' },
      { t: '✓', c: 'ok' },
      { t: '  cost ' },
      { t: '✓', c: 'ok' },
    ],
  },
  { kind: 'step', glyph: '▸', label: 'verify', segs: [{ t: 'finding 02 revised · re-generated' }] },
  {
    kind: 'step',
    glyph: '▸',
    label: 'meter',
    segs: [{ t: '$0.0042' }, { t: ' · anthropic · debited in microcents', c: 'dim' }],
  },
  {
    kind: 'step',
    glyph: '▸',
    label: 'meter',
    segs: [{ t: 'per-provider ledger' }, { t: ' · audit row written', c: 'dim' }],
  },
  { kind: 'step', glyph: '▸', label: 'migrate', segs: [{ t: 'model swap absorbed — pricing held' }] },
  {
    kind: 'step',
    glyph: '✓',
    label: 'shipped',
    segs: [{ t: 'in production' }],
  },
  { kind: 'cursor' },
];

export const Hero1 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('Hero');
  const reduce = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const show = reduce || isInView;

  const metrics = [
    { value: COUNT_YEARS, label: t('METRICS.YEARS') },
    { value: COUNT_PROJECTS, label: t('METRICS.PROJECTS') },
    { value: COUNT_DOMAINS, label: t('METRICS.DOMAINS') },
  ];

  const marqueeItems = [
    ...((t.raw('MARQUEE.ITEMS') as unknown as string[]) || []),
    t('MARQUEE.PRODUCTS_DELIVERED', { count: COUNT_PROJECTS }),
    t('MARQUEE.YEARS_EXPERIENCE', { count: COUNT_YEARS }),
    t('MARQUEE.DOMAINS', { count: COUNT_DOMAINS }),
  ];

  return (
    <Section ref={sectionRef}>
      <motion.div
        className="hero1__body"
        initial={reduce ? false : 'hidden'}
        animate={show ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <div className="hero1__container">
          <div className="hero1__layout">
            <div className="hero1__content">
              <motion.span className="hero1__overline" variants={revealUpVariants}>
                <motion.span className="hero1__overline-line" variants={lineExpandVariants} />
                {t('AVAILABLE_FOR_PROJECTS')}
              </motion.span>

              <motion.h1
                className="hero1__title"
                variants={revealUpVariants}
                aria-label={`${t('TITLE_LINE1')} ${t('TITLE_ACCENT')}${t('TITLE_SKETCH')}`}
              >
                <span className="hero1__title-line" aria-hidden="true">
                  <motion.span style={{ display: 'inline-block' }} variants={slideInVariants}>
                    {t('TITLE_LINE1')}
                  </motion.span>
                </span>
                <span className="hero1__title-line" aria-hidden="true">
                  <motion.span style={{ display: 'inline-block' }} variants={slideInVariants}>
                    <span className="hero1__title-accent">{t('TITLE_ACCENT')}</span>
                    <span className="hero1__title-sketch">
                      <span className="hero1__sketch-marks" />
                      {t('TITLE_SKETCH')}
                    </span>
                  </motion.span>
                </span>
              </motion.h1>

              <motion.p className="hero1__description" variants={revealUpVariants}>
                {t('DESCRIPTION')}
              </motion.p>

              <motion.div className="hero1__cta-row" variants={revealUpVariants}>
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

              <motion.div className="hero1__metrics" variants={revealUpVariants}>
                {metrics.map((m) => (
                  <div className="hero1__metric" key={m.label}>
                    <span className="hero1__metric-value">{m.value}+</span>
                    <span className="hero1__metric-label">{m.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div className="hero1__visual" variants={revealUpVariants} aria-hidden="true">
              <div className="hero1__stack">
                <div className="hero1__ghost" />
                <div className="hero1__card">
                  <div className="hero1__chrome">
                    <span className="hero1__dots">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="hero1__chrome-title">agent</span>
                  </div>

                  <motion.div className="hero1__lines" variants={termContainerVariants}>
                    {TERM_LINES.map((line, i) => {
                      if (line.kind === 'cmd') {
                        return (
                          <motion.div className="t-line" key={i} variants={termLineVariants}>
                            <span className="t-glyph t-dim">$</span>
                            <span className="t-cmd">{line.text}</span>
                          </motion.div>
                        );
                      }
                      if (line.kind === 'cursor') {
                        return (
                          <motion.div className="t-line" key={i} variants={termLineVariants}>
                            <span className="t-glyph t-dim">$</span>
                            <span className="t-cmd">
                              <span className="t-cursor" />
                            </span>
                          </motion.div>
                        );
                      }
                      return (
                        <motion.div className="t-line" key={i} variants={termLineVariants}>
                          <span className="t-glyph t-acc">{line.glyph}</span>
                          <span className="t-label">{line.label}</span>
                          <span className="t-text">
                            {line.segs.map((seg, j) => (
                              <span
                                key={j}
                                className={seg.c === 'ok' ? 't-ok' : seg.c === 'dim' ? 't-dim' : undefined}
                              >
                                {seg.t}
                              </span>
                            ))}
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="hero1__marquee">
        <div className="hero1__marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="hero1__marquee-item">
              {item}
            </span>
          ))}
          {/* Visual loop duplicate — hidden from screen readers */}
          {marqueeItems.map((item, i) => (
            <span key={`dup-${i}`} className="hero1__marquee-item" aria-hidden="true">
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};
