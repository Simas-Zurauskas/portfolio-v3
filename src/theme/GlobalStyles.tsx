'use client';

import { createGlobalStyle } from 'styled-components';
import { themeColors } from './theme';

export const GlobalStyles = createGlobalStyle`
  :root {
    --background: ${themeColors.light.background};
    --foreground: ${themeColors.light.foreground};
    --muted: ${themeColors.light.muted};
    --border: ${themeColors.light.border};
    --surface: ${themeColors.light.surface};
    --surface-alt: ${themeColors.light.surfaceAlt};
    --accent: ${themeColors.light.accent};
    --accent-hover: ${themeColors.light.accentHover};
    --accent-muted: ${themeColors.light.accentMuted};
    --secondary: ${themeColors.light.secondary};
    --secondary-hover: ${themeColors.light.secondaryHover};
    --secondary-muted: ${themeColors.light.secondaryMuted};
    --success: ${themeColors.light.success};
    --success-muted: ${themeColors.light.successMuted};
    --error: ${themeColors.light.error};
    --error-muted: ${themeColors.light.errorMuted};
  }

  [data-theme="dark"],
  .dark {
    --background: ${themeColors.dark.background};
    --foreground: ${themeColors.dark.foreground};
    --muted: ${themeColors.dark.muted};
    --border: ${themeColors.dark.border};
    --surface: ${themeColors.dark.surface};
    --surface-alt: ${themeColors.dark.surfaceAlt};
    --accent: ${themeColors.dark.accent};
    --accent-hover: ${themeColors.dark.accentHover};
    --accent-muted: ${themeColors.dark.accentMuted};
    --secondary: ${themeColors.dark.secondary};
    --secondary-hover: ${themeColors.dark.secondaryHover};
    --secondary-muted: ${themeColors.dark.secondaryMuted};
    --success: ${themeColors.dark.success};
    --success-muted: ${themeColors.dark.successMuted};
    --error: ${themeColors.dark.error};
    --error-muted: ${themeColors.dark.errorMuted};
  }

  html {
    scroll-behavior: smooth;
    /* Prevent text size adjustment on orientation change */
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    /* Match overscroll background to theme */
    background-color: var(--background);
    color-scheme: light;
  }


  html,
  body {
    max-width: 100vw;
    overflow-x: clip; /* Use clip instead of hidden - allows sticky to work */
  }

  body {
    color: var(--foreground);
    background: var(--background);
    font-family: var(--font-geist-sans), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    /* Improve touch scrolling on iOS */
    -webkit-overflow-scrolling: touch;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    /* Improve touch targets */
    -webkit-tap-highlight-color: transparent;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    /* Improve touch targets */
    -webkit-tap-highlight-color: transparent;
  }

  /* Improve focus visibility for accessibility */
  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* Remove focus outline for mouse users */
  :focus:not(:focus-visible) {
    outline: none;
  }

  ::selection {
    background: var(--accent);
    color: ${themeColors.light.background};
  }

  /* Ensure images scale properly */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Better touch targets - minimum 44px for form elements only */
  @media (pointer: coarse) {
    input,
    select,
    textarea {
      min-height: 44px;
    }
  }

  /* Hide reCAPTCHA badge - branding text shown in form instead */
  .grecaptcha-badge {
    display: none !important;
  }

  /* GPU acceleration hints for animated elements */
  [data-framer-component-type],
  [style*="transform"] {
    will-change: transform;
    backface-visibility: hidden;
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
