import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { LOCALES, Locale } from '@/types';

export const generateStaticParams = () => {
  return LOCALES.map((locale) => ({ locale }));
};

const getMessages = async (locale: string) => {
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return messages;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return (await import(`../../messages/en.json`)).default;
  }
};

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params;
  const isValidLocale = LOCALES.includes(locale as Locale);
  if (!isValidLocale) notFound();

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
