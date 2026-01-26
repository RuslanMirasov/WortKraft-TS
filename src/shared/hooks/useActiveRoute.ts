'use client';

import { usePathname } from 'next/navigation';

const LOCALES = ['en', 'de', 'uk'];
const MENU_PAGES = ['/favorites', '/search', '/statistic', '/profile', '/race', '/admin', '/policy'];

export const useActiveRoute = () => {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(new RegExp(`^/(${LOCALES.join('|')})(?=/|$)`), '') || '/';

  const isMainPage =
    normalizedPath === '' || normalizedPath === '/' || !MENU_PAGES.some(section => normalizedPath.startsWith(section));

  const isActivePage = (path: string) => {
    if (path === '/') {
      return normalizedPath === '/';
    }

    return normalizedPath === path || normalizedPath.startsWith(`${path}/`);
  };

  return {
    isActivePage,
    isMainPage,
  };
};
