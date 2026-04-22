import type { Viewport } from 'next';
import { buildLocaleMetadata, buildLocaleViewport } from '@/shared/config/metadata';
import { NextIntlClientProvider, hasLocale } from 'next-intl'; //hasLocale
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import PWAInstallProvider from '@/shared/providers/PWAInstallProvider';
import PWAInstallController from '@/shared/providers/PWAInstallController';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister/ServiceWorkerRegister';

import { Header, Footer, Popup, Main } from '@/components';

/* ================= METADATA ================= */

export function generateViewport(): Viewport {
  return buildLocaleViewport();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocaleMetadata(locale);
}

/* ================= LAYOUT ================= */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
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
  );
}
