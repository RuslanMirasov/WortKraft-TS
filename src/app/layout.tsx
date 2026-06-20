import React from 'react';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import localFont from 'next/font/local';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { authOptions } from '@/shared/lib/api/auth';
import { routing } from '@/i18n/routing';
import { buildLocaleMetadata, buildLocaleViewport } from '@/shared/config/metadata';
import SessionProviderWrapper from '@/shared/providers/session-provider';
import PWAInstallProvider from '@/shared/providers/PWAInstallProvider';
import PWAInstallController from '@/shared/providers/PWAInstallController';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister/ServiceWorkerRegister';
import { Header, Footer, Popup, Main } from '@/components';

import '@/styles/globals.scss';

const dmsansLight = localFont({
  src: './../fonts/dmsans-light.woff2',
  variable: '--light',
  weight: '300',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ['system-ui', 'Inter', 'Roboto', 'sans-serif'],
});

const dmsansRegular = localFont({
  src: './../fonts/dmsans-regular.woff2',
  variable: '--regular',
  weight: '400',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ['system-ui', 'Inter', 'Roboto', 'sans-serif'],
});

const dmsansMedium = localFont({
  src: './../fonts/dmsans-medium.woff2',
  variable: '--medium',
  weight: '500',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ['system-ui', 'Inter', 'Roboto', 'sans-serif'],
});

export function generateViewport(): Viewport {
  return buildLocaleViewport();
}

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata('de');
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sidebarCookie = cookieStore.get('sidebar')?.value;
  const sidebarAttr = sidebarCookie === 'min' ? 'min' : 'full';
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = hasLocale(routing.locales, localeCookie) ? localeCookie! : routing.defaultLocale;

  setRequestLocale(locale);

  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale} data-sidebar={sidebarAttr}>
      <body className={`body ${dmsansLight.variable} ${dmsansRegular.variable} ${dmsansMedium.variable}`}>
        <SessionProviderWrapper session={session}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ServiceWorkerRegister />
            <Header />
            <Main>
              <PWAInstallProvider />
              <PWAInstallController />
              {children}
              <Footer />
            </Main>
            <Popup />
          </NextIntlClientProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
