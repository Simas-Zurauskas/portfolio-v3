import createMiddleware from 'next-intl/middleware';
import { LOCALES, DEFAULT_LOCALE } from './types';

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed', // Don't show /en prefix for default locale, show /lt for Lithuanian
  localeDetection: false, // Don't auto-detect from browser - let user choose
});

export const config = {
  // Exclude api, _next, _vercel, static files, and /cv (dev-only page)
  matcher: ['/((?!api|_next|_vercel|cv|.*\\..*).*)'],
};
