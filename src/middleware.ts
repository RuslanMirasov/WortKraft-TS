import type { NextFetchEvent } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { routing } from './i18n/routing';
import { getLocaleFromPathname, isPublicRoute, normalizeLocalePath } from '@/shared/config/routes';

const intlMiddleware = createIntlMiddleware(routing);
const ONBOARDING_ROUTE = '/onboarding';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname, search } = req.nextUrl;
  const intlResponse = intlMiddleware(req, event);

  const locale = getLocaleFromPathname(pathname) ?? routing.defaultLocale;
  const normalizedPath = normalizeLocalePath(pathname);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token?.status === 'pending') {
    if (!normalizedPath.startsWith(ONBOARDING_ROUTE)) {
      const onboardingUrl = new URL(`/${locale}${ONBOARDING_ROUTE}`, req.url);
      onboardingUrl.searchParams.set('callbackUrl', pathname + search);
      return NextResponse.redirect(onboardingUrl);
    }

    return intlResponse;
  }

  if (normalizedPath.startsWith(ONBOARDING_ROUTE)) {
    return NextResponse.redirect(new URL(`/${locale}/404`, req.url));
  }

  if (normalizedPath === '/' || normalizedPath === '') {
    return NextResponse.redirect(new URL(`/${locale}/levels`, req.url));
  }

  if (isPublicRoute(pathname)) {
    return intlResponse;
  }

  if (!token) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set('callbackUrl', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // admin
  if (normalizedPath.startsWith('/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL(`/${locale}/404`, req.url));
  }

  return intlResponse;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
