export const PUBLIC_ROUTES = ['/login', '/levels', '/terms', '/policy', '/search', '/404', '/500'];
export const PRIVATE_ROUTES = ['/favorites', '/statistic', '/profile', '/race', '/admin', '/room'];

export const getLocaleFromPathname = (pathname: string) => {
  return pathname.match(/^\/(de|en|uk)(\/|$)/)?.[1] ?? null;
};

export const normalizeLocalePath = (pathname: string) => {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) return pathname || '/';
  return pathname.replace(new RegExp(`^/${locale}`), '') || '/';
};

export const isPublicRoute = (pathname: string) => {
  const normalizedPath = normalizeLocalePath(pathname);
  return PUBLIC_ROUTES.some(route => normalizedPath.startsWith(route));
};

export const isPrivateRoute = (pathname: string) => {
  const normalizedPath = normalizeLocalePath(pathname);
  return PRIVATE_ROUTES.some(route => normalizedPath.startsWith(route));
};
