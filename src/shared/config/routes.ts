export const PUBLIC_ROUTES = ['/login', '/levels', '/terms', '/policy', '/search', '/404', '/500'];
export const PRIVATE_ROUTES = ['/favorites', '/statistic', '/profile', '/race', '/admin', '/room'];

export const isPublicRoute = (pathname: string) =>
  PUBLIC_ROUTES.some(route => pathname.startsWith(route));

export const isPrivateRoute = (pathname: string) =>
  PRIVATE_ROUTES.some(route => pathname.startsWith(route));
