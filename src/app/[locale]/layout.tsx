import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { LOCALES, Locale } from '@/types';

const BASE_URL = 'https://www.simaszurauskas.com';

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Simas Žurauskas',
  jobTitle: 'AI Engineer',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/in/simas-zurauskas', 'https://github.com/Simas-Zurauskas'],
};

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

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await params;
  const safeLocale = (LOCALES.includes(locale as Locale) ? locale : 'en') as Locale;
  const messages = await getMessages(safeLocale);
  const meta = messages.Meta as { TITLE: string; DESCRIPTION: string };
  const path = safeLocale === 'lt' ? '/lt' : '/';

  return {
    metadataBase: new URL(BASE_URL),
    title: meta.TITLE,
    description: meta.DESCRIPTION,
    alternates: {
      canonical: path,
      languages: { en: '/', lt: '/lt', 'x-default': '/' },
    },
    openGraph: {
      title: meta.TITLE,
      description: meta.DESCRIPTION,
      url: path,
      siteName: 'Simas Žurauskas',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: meta.TITLE }],
      locale: safeLocale === 'lt' ? 'lt_LT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.TITLE,
      description: meta.DESCRIPTION,
      images: ['/og.png'],
    },
  };
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
      {children}
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
