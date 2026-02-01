import type { NextFetchEvent } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

const PUBLIC_ROUTES = ['/login', '/terms', '/policy', '/search', '/404', '/500'];

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname, search } = req.nextUrl;

  const intlResponse = intlMiddleware(req, event);
  const localeMatch = pathname.match(/^\/(de|en|uk)(\/|$)/);
  const locale = localeMatch?.[1] ?? routing.defaultLocale;
  const normalizedPath = pathname.replace(new RegExp(`^/${locale}`), '');

  if (normalizedPath === '/' || normalizedPath === '') {
    return intlResponse;
  }

  if (PUBLIC_ROUTES.some(route => normalizedPath.startsWith(route))) {
    return intlResponse;
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set('callbackUrl', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
