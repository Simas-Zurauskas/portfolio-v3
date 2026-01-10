export type ColorScheme = 'light' | 'dark' | 'system';

export const colorsLib = {
  // Base
  white: '#ffffff',
  black: '#030712',

  // Light theme - cool slate undertones
  lightBackground: '#f8fafc',
  lightForeground: '#0f172a',
  lightMuted: '#64748b',
  lightBorder: '#e2e8f0',
  lightSurface: '#ffffff',
  lightSurfaceAlt: '#f1f5f9',

  // Dark theme - deep blue-slate
  darkBackground: '#030712',
  darkForeground: '#f1f5f9',
  darkMuted: '#94a3b8',
  darkBorder: '#1e293b',
  darkSurface: '#0f172a',
  darkSurfaceAlt: '#1e293b',

  // Accent - vibrant orange
  orange: '#ff6b35',
  orangeHover: '#ff5722',
  orangeLight: '#ff8a5c',
  orangeMuted: '#fff0eb',

  // Secondary - slate
  slate: '#64748b',
  slateLight: '#94a3b8',
  slateDark: '#475569',

  // Tertiary - clear blue (complement to orange)
  blue: '#0ea5e9',
  blueLight: '#38bdf8',
  blueMuted: '#e0f2fe',

  // Status - success green
  green: '#22c55e',
  greenLight: '#4ade80',
  greenDark: '#16a34a',
  greenMuted: '#dcfce7',

  // Status - error red
  red: '#ef4444',
  redLight: '#f87171',
  redDark: '#dc2626',
  redMuted: '#fee2e2',
};

export type ColorsSet = {
  background: string;
  foreground: string;
  muted: string;
  border: string;
  surface: string;
  surfaceAlt: string;
  accent: string;
  accentHover: string;
  accentMuted: string;
  secondary: string;
  secondaryHover: string;
  secondaryMuted: string;
  success: string;
  successMuted: string;
  error: string;
  errorMuted: string;
};

// Color mapping for each theme scheme (used by GlobalStyles to set CSS variables)
export const themeColors: Record<'light' | 'dark', ColorsSet> = {
  light: {
    background: colorsLib.lightBackground,
    foreground: colorsLib.lightForeground,
    muted: colorsLib.lightMuted,
    border: colorsLib.lightBorder,
    surface: colorsLib.lightSurface,
    surfaceAlt: colorsLib.lightSurfaceAlt,
    accent: colorsLib.orange,
    accentHover: colorsLib.orangeHover,
    accentMuted: colorsLib.orangeMuted,
    secondary: colorsLib.blue,
    secondaryHover: colorsLib.blueLight,
    secondaryMuted: colorsLib.blueMuted,
    success: colorsLib.green,
    successMuted: colorsLib.greenMuted,
    error: colorsLib.red,
    errorMuted: colorsLib.redMuted,
  },
  dark: {
    background: colorsLib.darkBackground,
    foreground: colorsLib.darkForeground,
    muted: colorsLib.darkMuted,
    border: colorsLib.darkBorder,
    surface: colorsLib.darkSurface,
    surfaceAlt: colorsLib.darkSurfaceAlt,
    accent: colorsLib.orangeLight,
    accentHover: colorsLib.orange,
    accentMuted: colorsLib.darkSurfaceAlt,
    secondary: colorsLib.blueLight,
    secondaryHover: colorsLib.blue,
    secondaryMuted: colorsLib.blueMuted,
    success: colorsLib.greenLight,
    successMuted: colorsLib.greenDark,
    error: colorsLib.redLight,
    errorMuted: colorsLib.redDark,
  },
};

// CSS variable references for styled-components (resolves at runtime via CSS)
export const cssColors: ColorsSet = {
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  muted: 'var(--muted)',
  border: 'var(--border)',
  surface: 'var(--surface)',
  surfaceAlt: 'var(--surface-alt)',
  accent: 'var(--accent)',
  accentHover: 'var(--accent-hover)',
  accentMuted: 'var(--accent-muted)',
  secondary: 'var(--secondary)',
  secondaryHover: 'var(--secondary-hover)',
  secondaryMuted: 'var(--secondary-muted)',
  success: 'var(--success)',
  successMuted: 'var(--success-muted)',
  error: 'var(--error)',
  errorMuted: 'var(--error-muted)',
};
