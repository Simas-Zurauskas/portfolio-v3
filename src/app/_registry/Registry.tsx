'use client';

import React from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { StyledRegistry } from './comps';
import { ColorScheme } from '@/theme';

const Registry = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider
      enableSystem
      attribute="data-theme"
      defaultTheme="system"
      disableTransitionOnChange
      themes={['light', 'dark', 'system'] satisfies ColorScheme[]}
    >
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'head',
        }}
      >
        <StyledRegistry>{children}</StyledRegistry>
      </GoogleReCaptchaProvider>
    </NextThemeProvider>
  );
};

export default Registry;
