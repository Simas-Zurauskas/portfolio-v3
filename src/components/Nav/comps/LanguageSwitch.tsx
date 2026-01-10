'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Locale, LOCALES, DEFAULT_LOCALE } from '@/types';

const StyledLanguageSwitch = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;

  .lang-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    min-height: unset; /* Override global touch target */
    height: auto;

    &:hover:not(.lang-btn--active) {
      color: ${({ theme }) => theme.colors.foreground};
    }

    &--active {
      background: ${({ theme }) => theme.colors.foreground};
      color: ${({ theme }) => theme.colors.background};
    }
  }
`;

export const LanguageSwitch: React.FC = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Remove current locale prefix from pathname if present
    let pathWithoutLocale = pathname;
    for (const loc of LOCALES) {
      if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
        pathWithoutLocale = pathname.slice(`/${loc}`.length) || '/';
        break;
      }
    }

    // Construct new path
    let newPath: string;
    if (newLocale === DEFAULT_LOCALE) {
      // Default locale doesn't need prefix
      newPath = pathWithoutLocale;
    } else {
      // Non-default locales need prefix
      newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    }

    // Ensure we have at least root path
    if (!newPath || newPath === '') {
      newPath = '/';
    }

    router.push(newPath);
  };

  return (
    <StyledLanguageSwitch>
      {LOCALES.map((loc) => (
        <button
          key={loc}
          className={`lang-btn ${locale === loc ? 'lang-btn--active' : ''}`}
          onClick={() => handleLocaleChange(loc)}
          aria-label={`Switch to ${loc === 'en' ? 'English' : 'Lithuanian'}`}
          title={loc === 'en' ? 'English' : 'Lietuvių'}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </StyledLanguageSwitch>
  );
};
