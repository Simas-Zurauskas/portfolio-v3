'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components';
import { LanguageSwitch } from './comps';

type NavLinkId = 'services' | 'work' | 'contact';

const NAV_LINK_IDS: NavLinkId[] = ['services', 'work', 'contact'];

const NAV_LINK_KEYS: Record<NavLinkId, string> = {
  services: 'SERVICES',
  work: 'WORK',
  contact: 'CONTACT',
};

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.hex.background}e6;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  .nav {
    &__inner {
      /* Align with section grid: 80px sidebar + content padding */
      padding: 0 80px;
      padding-left: calc(80px + clamp(24px, 5vw, 80px));
      padding-right: calc(80px + clamp(24px, 5vw, 80px));
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: 1024px) {
        padding-left: calc(60px + clamp(24px, 5vw, 60px));
        padding-right: calc(60px + clamp(24px, 5vw, 60px));
      }

      @media (max-width: 768px) {
        padding-left: calc(40px + 24px);
        padding-right: calc(40px + 24px);
      }

      @media (max-width: 480px) {
        padding: 0 20px;
      }
    }

    &__brand {
      display: flex;
      flex-direction: column;
      gap: 2px;
      cursor: pointer;
      position: relative;
      z-index: 10001;
    }

    &__name {
      font-weight: 700;
      font-size: 0.875rem;
      letter-spacing: -0.02em;
      color: ${({ theme }) => theme.colors.foreground};
    }

    &__role {
      font-size: 0.6rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};

      @media (max-width: 400px) {
        display: none;
      }
    }

    &__links {
      display: flex;
      align-items: center;
      gap: 32px;

      @media (max-width: 1100px) {
        gap: 24px;
      }

      @media (max-width: 1024px) {
        display: none;
      }
    }

    &__link {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
      transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      background: none;
      border: none;
      padding: 0;

      &:hover:not(.nav__link--active) {
        color: ${({ theme }) => theme.colors.foreground};
      }

      &--active {
        color: ${({ theme }) => theme.colors.accent};
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
      z-index: 10001;

      &__contact-button {
        width: 100px;

        @media (max-width: 1024px) {
          display: none;
        }
      }
    }

    &__availability {
      display: none;
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
      padding-right: 16px;
      border-right: 1px solid ${({ theme }) => theme.colors.border};

      @media (min-width: 1025px) {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.success};
        box-shadow: 0 0 8px ${({ theme }) => theme.hex.success}80;
        animation: pulse 2s ease-in-out infinite;
      }
    }

    &__mobile-toggle {
      display: none;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      /* Offset to align the 24px icon visually with content edge */
      /* Button is 44px, icon is 24px, so (44-24)/2 = 10px internal padding */
      margin-right: -10px;
      background: none;
      border: none;
      color: ${({ theme }) => theme.colors.foreground};
      cursor: pointer;
      position: relative;
      z-index: 10001;

      @media (max-width: 1024px) {
        display: flex;
      }

      @media (max-width: 480px) {
        /* Less offset on mobile where padding is smaller */
        margin-right: -8px;
      }

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  .theme-switcher {
    display: flex;
    align-items: center;
    padding: 2px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: transparent;

    @media (max-width: 768px) {
      display: none;
    }

    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      min-height: unset;
      border: none;
      background: transparent;
      color: ${({ theme }) => theme.colors.muted};
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover:not(.theme-switcher__btn--active) {
        color: ${({ theme }) => theme.colors.foreground};
      }

      &--active {
        background: ${({ theme }) => theme.colors.foreground};
        color: ${({ theme }) => theme.colors.background};
      }
    }
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.hex.background}f5;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  padding: 100px 24px 40px;
  overflow-y: auto;
`;

const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const MobileNavLink = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.foreground};
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  text-align: left;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  &.active {
    color: ${({ theme }) => theme.colors.accent};
  }

  span {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const MobileMenuFooter = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 32px;
  margin-top: auto;
`;

const MobileMenuRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  /* Hide the theme switcher row on tablets (theme switcher visible in main nav) */
  &.theme-row {
    @media (min-width: 769px) {
      display: none;
    }
  }
`;

const MobileAvailability = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.success};
    box-shadow: 0 0 12px ${({ theme }) => theme.hex.success}80;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
`;

const MobileThemeSwitcher = styled.div`
  display: none;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  width: fit-content;

  /* Only show on mobile when main nav theme switcher is hidden */
  @media (max-width: 768px) {
    display: flex;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    min-height: 40px;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.muted};
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover:not(.active) {
      color: ${({ theme }) => theme.colors.foreground};
    }

    &.active {
      background: ${({ theme }) => theme.colors.foreground};
      color: ${({ theme }) => theme.colors.background};
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

// Animation easing
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Animation variants
const menuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: smoothEase,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: -20 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: smoothEase },
  },
};

const footerVariants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: smoothEase, delay: 0.2 },
  },
};

export const Nav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Nav');
  const tc = useTranslations('Common');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Track which section is currently in view
  useEffect(() => {
    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.add(id);
          } else {
            visibleSections.delete(id);
          }
        });

        // Find the first visible section in DOM order
        if (visibleSections.size > 0) {
          const firstVisible = NAV_LINK_IDS.find((id) => visibleSections.has(id));
          setActiveSection(firstVisible || null);
        } else {
          setActiveSection(null);
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px', // Trigger when section is in middle 20% of viewport
        threshold: 0,
      },
    );

    NAV_LINK_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    },
    [setMobileMenuOpen],
  );

  const handleBrandClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [setMobileMenuOpen]);

  return (
    <StyledNav id="index">
      <div className="nav__inner">
        <div className="nav__brand" onClick={handleBrandClick}>
          <span className="nav__name">Simas Žurauskas</span>
          <span className="nav__role">Full-Stack · Web · Mobile · AI</span>
        </div>

        <div className="nav__links">
          {NAV_LINK_IDS.map((id) => (
            <button
              key={id}
              className={`nav__link ${activeSection === id ? 'nav__link--active' : ''}`}
              onClick={() => scrollToSection(id)}
            >
              {t(NAV_LINK_KEYS[id])}
            </button>
          ))}
        </div>

        <div className="nav__actions">
          <span className="nav__availability">{t('AVAILABLE')}</span>

          <LanguageSwitch />

          <div className="theme-switcher">
            <button
              className={`theme-switcher__btn ${mounted && theme === 'light' ? 'theme-switcher__btn--active' : ''}`}
              onClick={() => setTheme('light')}
              aria-label={tc('THEME_LIGHT')}
              title={tc('THEME_LIGHT')}
            >
              <Sun size={15} />
            </button>
            <button
              className={`theme-switcher__btn ${mounted && theme === 'dark' ? 'theme-switcher__btn--active' : ''}`}
              onClick={() => setTheme('dark')}
              aria-label={tc('THEME_DARK')}
              title={tc('THEME_DARK')}
            >
              <Moon size={15} />
            </button>
            <button
              className={`theme-switcher__btn ${
                mounted && (theme === 'system' || theme === undefined) ? 'theme-switcher__btn--active' : ''
              }`}
              onClick={() => setTheme('system')}
              aria-label={tc('THEME_SYSTEM')}
              title={tc('THEME_SYSTEM')}
            >
              <Monitor size={15} />
            </button>
          </div>

          <Button className="nav__actions__contact-button" size="sm" onClick={() => scrollToSection('contact')}>
            {t('EMAIL_ME')}
          </Button>

          <button
            className="nav__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? tc('CLOSE_MENU') : tc('OPEN_MENU')}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - rendered via Portal to escape stacking context */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <MobileMenuOverlay initial="closed" animate="open" exit="closed" variants={menuVariants}>
                <MobileMenuContent>
                  {NAV_LINK_IDS.map((id, index) => (
                    <MobileNavLink
                      key={id}
                      variants={linkVariants}
                      className={activeSection === id ? 'active' : ''}
                      onClick={() => scrollToSection(id)}
                    >
                      {t(NAV_LINK_KEYS[id])}
                      <span>0{index + 1}</span>
                    </MobileNavLink>
                  ))}
                </MobileMenuContent>

                <MobileMenuFooter variants={footerVariants}>
                  <MobileMenuRow>
                    <MobileAvailability>{t('AVAILABLE')}</MobileAvailability>
                  </MobileMenuRow>

                  <MobileMenuRow className="theme-row">
                    <MobileThemeSwitcher>
                      <button
                        className={mounted && theme === 'light' ? 'active' : ''}
                        onClick={() => setTheme('light')}
                        aria-label={tc('THEME_LIGHT')}
                      >
                        <Sun />
                      </button>
                      <button
                        className={mounted && theme === 'dark' ? 'active' : ''}
                        onClick={() => setTheme('dark')}
                        aria-label={tc('THEME_DARK')}
                      >
                        <Moon />
                      </button>
                      <button
                        className={mounted && (theme === 'system' || theme === undefined) ? 'active' : ''}
                        onClick={() => setTheme('system')}
                        aria-label={tc('THEME_SYSTEM')}
                      >
                        <Monitor />
                      </button>
                    </MobileThemeSwitcher>
                  </MobileMenuRow>

                  <Button fullWidth size="lg" onClick={() => scrollToSection('contact')}>
                    {t('EMAIL_ME')}
                  </Button>
                </MobileMenuFooter>
              </MobileMenuOverlay>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </StyledNav>
  );
};
