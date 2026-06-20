import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { isPublicRoute, isPrivateRoute } from '@/shared/config/routes';

const ONBOARDING_ROUTE = '/onboarding';

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token?.status === 'pending') {
    if (!pathname.startsWith(ONBOARDING_ROUTE)) {
      const onboardingUrl = new URL(ONBOARDING_ROUTE, req.url);
      onboardingUrl.searchParams.set('callbackUrl', pathname + search);
      return NextResponse.redirect(onboardingUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith(ONBOARDING_ROUTE)) {
    return NextResponse.redirect(new URL('/404', req.url));
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/levels', req.url));
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  if (isPrivateRoute(pathname) && !token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith('/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/404', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
