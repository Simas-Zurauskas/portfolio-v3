import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import Registry from './_registry';

const GA_TRACKING_ID = 'G-1SENQVYX6C';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Simas Žurauskas | Software Engineer',
  description:
    'Building web applications, mobile products, and AI workflows. Modern stack, clean code, reliable delivery.',
  openGraph: {
    title: 'Simas Žurauskas | Software Engineer',
    description:
      'Building web applications, mobile products, and AI workflows. Modern stack, clean code, reliable delivery.',
    url: 'https://simaszurauskas.com',
    siteName: 'Simas Žurauskas',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Simas Žurauskas - Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simas Žurauskas | Software Engineer',
    description:
      'Building web applications, mobile products, and AI workflows. Modern stack, clean code, reliable delivery.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme color for browser chrome - light and dark variants */}
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#030712" media="(prefers-color-scheme: dark)" />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Registry>{children}</Registry>
      </body>
    </html>
  );
}
