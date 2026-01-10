'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Copy, Check, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { EMAIL } from '@/conf';

const StyledFooter = styled.footer`
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr 80px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 1024px) {
    grid-template-columns: 60px 1fr 60px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 40px 1fr 40px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
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
    left: 80px;
    @media (max-width: 1024px) {
      left: 60px;
    }
    @media (max-width: 768px) {
      left: 40px;
    }
    @media (max-width: 480px) {
      display: none;
    }
  }

  &::after {
    right: 80px;
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

  .footer {
    &__sidebar {
      grid-column: 1;

      @media (max-width: 480px) {
        display: none;
      }
    }

    &__main {
      grid-column: 2;
      padding: clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px);

      @media (max-width: 480px) {
        grid-column: 1;
        padding: 40px 20px;
      }
    }

    &__sidebar-right {
      grid-column: 3;

      @media (max-width: 480px) {
        display: none;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 48px;
      max-width: 1200px;
    }

    &__top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 48px;
      flex-wrap: wrap;

      @media (max-width: 600px) {
        flex-direction: column;
        gap: 32px;
      }
    }

    &__brand {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__name {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: ${({ theme }) => theme.colors.foreground};
    }

    &__tagline {
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      color: ${({ theme }) => theme.colors.muted};
    }

    &__links {
      display: flex;
      gap: 48px;

      @media (max-width: 600px) {
        gap: 32px;
      }
    }

    &__link-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    &__link-title {
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
      margin-bottom: 4px;
    }

    &__link {
      font-size: 0.8rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.foreground};
      text-decoration: none;
      transition: color 0.2s ease;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      text-align: left;

      @media (hover: hover) {
        &:hover {
          color: ${({ theme }) => theme.colors.accent};
        }
      }
    }

    &__email-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__copy-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      min-height: unset;
      min-width: unset;
      flex-shrink: 0;
      padding: 0;
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.muted};
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.accent};
      }

      &--copied {
        border-color: ${({ theme }) => theme.colors.success};
        color: ${({ theme }) => theme.colors.success};
        background: ${({ theme }) => theme.hex.success}15;
      }

      svg {
        width: 12px;
        height: 12px;
      }
    }

    &__divider {
      height: 1px;
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.border} 0%,
        ${({ theme }) => theme.hex.border}50 50%,
        transparent 100%
      );
    }

    &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;

      @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }

    &__copyright {
      font-size: 0.7rem;
      color: ${({ theme }) => theme.colors.muted};
      letter-spacing: 0.02em;
    }

    &__social {
      display: flex;
      gap: 16px;
    }

    &__social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      min-height: unset;
      border: 1px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.muted};
      transition: all 0.2s ease;

      &:hover {
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.accent};
      }

      svg {
        width: 14px;
        height: 14px;
      }
    }

    &__credential {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 12px;
      padding: 6px 10px;
      font-size: 0.65rem;
      color: ${({ theme }) => theme.colors.muted};
      letter-spacing: 0.02em;
      text-decoration: none;
      border: 1px solid ${({ theme }) => theme.colors.border};
      background: ${({ theme }) => theme.colors.surface};
      transition: all 0.2s ease;

      &:hover {
        border-color: ${({ theme }) => theme.colors.accent};
        background: ${({ theme }) => theme.hex.accent}08;

        .footer__credential-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
      }

      svg {
        width: 11px;
        height: 11px;
        color: ${({ theme }) => theme.colors.accent};
        flex-shrink: 0;
        margin-right: -4px;
      }

      img {
        height: 20px;
        width: auto;
        opacity: 0.7;

        [data-theme='dark'] & {
          filter: invert(1);
        }
      }

      > span {
        color: ${({ theme }) => theme.colors.foreground};
        font-weight: 500;
      }
    }

    &__credential-tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%) translateY(4px);
      padding: 10px 14px;
      background: ${({ theme }) => theme.colors.surfaceAlt};
      border: 1px solid ${({ theme }) => theme.colors.border};
      box-shadow: 0 4px 20px ${({ theme }) => theme.hex.background}80;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      pointer-events: none;
      z-index: 100;

      /* Arrow */
      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: ${({ theme }) => theme.colors.border};
      }

      &::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: ${({ theme }) => theme.colors.surfaceAlt};
        z-index: 1;
      }
    }

    &__tooltip-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.65rem;
      color: ${({ theme }) => theme.colors.muted};

      &:not(:last-child) {
        margin-bottom: 6px;
      }

      strong {
        color: ${({ theme }) => theme.colors.foreground};
        font-weight: 600;
      }

      code {
        font-family: 'SF Mono', 'Fira Code', monospace;
        font-size: 0.6rem;
        padding: 2px 6px;
        background: ${({ theme }) => theme.hex.accent}10;
        color: ${({ theme }) => theme.colors.accent};
        letter-spacing: 0.02em;
      }
    }
  }
`;

const scrollToSection = (id: string) => {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

export const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const tc = useTranslations('Common');
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <StyledFooter>
      <div className="footer__sidebar" />

      <div className="footer__main">
        <div className="footer__content">
          <div className="footer__top">
            <div className="footer__brand">
              <span className="footer__name">Simas Žurauskas</span>
              <span className="footer__tagline">{t('TAGLINE')}</span>
              <a href="/certificate.pdf" target="_blank" rel="noopener noreferrer" className="footer__credential">
                <Award />
                <span>{t('CREDENTIAL_TITLE')}</span>
                <img src="/turing.svg" alt="Turing College" />
                <div className="footer__credential-tooltip">
                  <div className="footer__tooltip-row">
                    <strong>{t('CREDENTIAL_ISSUED')}</strong>
                  </div>
                  <div className="footer__tooltip-row">
                    {t('CREDENTIAL_ID_PREFIX')} <code>TC2506108004</code>
                  </div>
                </div>
              </a>
            </div>

            <div className="footer__links">
              <div className="footer__link-group">
                <span className="footer__link-title">{t('LINK_GROUP_NAV')}</span>
                <button className="footer__link" onClick={() => scrollToSection('top')}>
                  {t('HOME')}
                </button>
                <button className="footer__link" onClick={() => scrollToSection('services')}>
                  {tNav('SERVICES')}
                </button>
                <button className="footer__link" onClick={() => scrollToSection('work')}>
                  {tNav('WORK')}
                </button>
                <button className="footer__link" onClick={() => scrollToSection('contact')}>
                  {tNav('CONTACT')}
                </button>
              </div>

              <div className="footer__link-group">
                <span className="footer__link-title">{t('LINK_GROUP_CONTACT')}</span>
                <div className="footer__email-row">
                  <a className="footer__link" href={`mailto:${EMAIL}`} target="_blank" rel="noopener noreferrer">
                    {EMAIL}
                  </a>
                  <button
                    className={`footer__copy-btn ${copied ? 'footer__copy-btn--copied' : ''}`}
                    onClick={copyEmail}
                    aria-label={copied ? tc('COPIED') : tc('COPY_EMAIL')}
                    title={copied ? tc('COPIED') : tc('COPY_EMAIL')}
                  >
                    {copied ? <Check /> : <Copy />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__divider" />

          <div className="footer__bottom">
            <span className="footer__copyright">© {currentYear} Simas Žurauskas</span>

            <div className="footer__social">
              {/* <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a> */}
              <a
                href="https://www.linkedin.com/in/simas-zurauskas"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__sidebar-right" />
    </StyledFooter>
  );
};
