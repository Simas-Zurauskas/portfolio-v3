import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { Locale, LOCALES, DEFAULT_LOCALE } from './types';

export const defaultLocale: Locale = DEFAULT_LOCALE;

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale as Locale)) {
    console.error(`Unsupported locale requested: ${locale}, defaulting to ${defaultLocale}`);
    locale = defaultLocale;
  }

  try {
    const messages = (await import(`./messages/${locale}.json`)).default;
    return {
      messages,
      locale: locale as Locale,
    };
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    notFound();
  }
});
