import { colorsLib, GlobalStyles, ColorScheme, themeColors, cssColors } from '@/theme';
import { useServerInsertedHTML } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { DefaultTheme, ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import { useTheme } from 'next-themes';

interface StyledRegistryProps {
  children: React.ReactNode;
}

export const StyledRegistry: React.FC<StyledRegistryProps> = ({ children }) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const [mounted, setMounted] = useState(false);
  const { theme: scheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // Determine active theme colors (hex values for alpha support)
  const isDark = mounted ? resolvedTheme === 'dark' : false;
  const activeHexColors = themeColors[isDark ? 'dark' : 'light'];

  const theme: DefaultTheme = {
    // CSS variables - no flash, works instantly (use for solid colors)
    colors: cssColors,
    // Hex values - use when you need alpha suffix like }50
    hex: activeHexColors,
    colorsLib,
    scheme: (scheme as ColorScheme) || 'system',
  };

  // On the client side, only provide the ThemeProvider
  if (typeof window !== 'undefined') {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    );
  }

  // On the server side, use StyleSheetManager + ThemeProvider
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  );
};
