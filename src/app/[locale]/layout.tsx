import type { Viewport } from 'next';
import { buildLocaleMetadata } from '@/shared/config/metadata';
import { cookies } from 'next/headers';
import { NextIntlClientProvider, hasLocale } from 'next-intl'; //hasLocale
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import localFont from 'next/font/local';
import SessionProviderWrapper from '@/shared/providers/session-provider';
import { Header, Popup, Main } from '@/components';

import '@/styles/globals.scss';

/* ================= FONTS ================= */

const dmsansLight = localFont({
  src: './../../fonts/dmsans-light.woff2',
  variable: '--light',
  weight: '300',
  display: 'swap',
  preload: true,
});

const dmsansRegular = localFont({
  src: './../../fonts/dmsans-regular.woff2',
  variable: '--regular',
  weight: '400',
  display: 'swap',
  preload: true,
});

const robotoMedium = localFont({
  src: './../../fonts/roboto-medium.woff2',
  variable: '--roboto-medium',
  weight: '500',
  display: 'swap',
  preload: true,
});

/* ================= METADATA ================= */

export function generateViewport(): Viewport {
  return {
    themeColor: '#4cb210',
  };
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  return buildLocaleMetadata(locale);
}

/* ================= LAYOUT ================= */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const sidebarCookie = cookieStore.get('sidebar')?.value;
  const sidebarAttr = sidebarCookie === 'min' ? 'min' : 'full';

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} data-sidebar={sidebarAttr}>
      <body className={`body ${dmsansLight.variable} ${dmsansRegular.variable} ${robotoMedium.variable}`}>
        <NextIntlClientProvider locale={locale}>
          <SessionProviderWrapper>
            <Header />
            <Main>{children}</Main>
            <Popup />
          </SessionProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
