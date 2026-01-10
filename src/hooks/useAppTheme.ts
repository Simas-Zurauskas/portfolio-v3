import { colorsLib, ColorsSet, ColorScheme, themeColors } from '@/theme';
import { useTheme } from 'next-themes';
import { DefaultTheme } from 'styled-components';
import { useLayoutEffect, useState } from 'react';

const getComputedCSSColors = (): ColorsSet => {
  if (typeof window === 'undefined') {
    return themeColors.light;
  }

  const computedStyle = getComputedStyle(document.documentElement);

  return {
    background: computedStyle.getPropertyValue('--background').trim(),
    foreground: computedStyle.getPropertyValue('--foreground').trim(),
    muted: computedStyle.getPropertyValue('--muted').trim(),
    border: computedStyle.getPropertyValue('--border').trim(),
    surface: computedStyle.getPropertyValue('--surface').trim(),
    surfaceAlt: computedStyle.getPropertyValue('--surface-alt').trim(),
    accent: computedStyle.getPropertyValue('--accent').trim(),
    accentHover: computedStyle.getPropertyValue('--accent-hover').trim(),
    accentMuted: computedStyle.getPropertyValue('--accent-muted').trim(),
    secondary: computedStyle.getPropertyValue('--secondary').trim(),
    secondaryHover: computedStyle.getPropertyValue('--secondary-hover').trim(),
    secondaryMuted: computedStyle.getPropertyValue('--secondary-muted').trim(),
    success: computedStyle.getPropertyValue('--success').trim(),
    successMuted: computedStyle.getPropertyValue('--success-muted').trim(),
    error: computedStyle.getPropertyValue('--error').trim(),
    errorMuted: computedStyle.getPropertyValue('--error-muted').trim(),
  };
};

export const useAppTheme = (): DefaultTheme => {
  const { theme: scheme } = useTheme();
  const resolvedScheme = (scheme as ColorScheme) || 'system';
  const [colors, setColors] = useState(() => getComputedCSSColors());

  useLayoutEffect(() => {
    const updateColors = () => {
      setColors(getComputedCSSColors());
    };

    updateColors();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((el) => {
        if (el.attributeName === 'data-theme') {
          updateColors();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [scheme]);

  return {
    colors,
    colorsLib,
    scheme: resolvedScheme,
    hex: themeColors[resolvedScheme === 'dark' ? 'dark' : 'light'],
  };
};
