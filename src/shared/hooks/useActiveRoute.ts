'use client';

import { usePathname } from '@/i18n/navigation';
const MENU_PAGES = ['/favorites', '/search', '/statistic', '/profile', '/race', '/admin', '/policy', '/login'];

export const useActiveRoute = () => {
  const pathname = usePathname();
  const normalizedPath = pathname || '/';
  const isMainPage = normalizedPath === '/' || !MENU_PAGES.some(section => normalizedPath.startsWith(section));

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
