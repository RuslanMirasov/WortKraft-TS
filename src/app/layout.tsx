import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import localFont from 'next/font/local';
import { authOptions } from '@/shared/lib/api/auth';
import SessionProviderWrapper from '@/shared/providers/session-provider';
import { routing } from '@/i18n/routing';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarCookie = cookieStore.get('sidebar')?.value;
  const sidebarAttr = sidebarCookie === 'min' ? 'min' : 'full';
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = routing.locales.includes(localeCookie ?? '') ? localeCookie! : routing.defaultLocale;
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale} data-sidebar={sidebarAttr}>
      <body className={`body ${dmsansLight.variable} ${dmsansRegular.variable} ${dmsansMedium.variable}`}>
        <SessionProviderWrapper session={session}>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
