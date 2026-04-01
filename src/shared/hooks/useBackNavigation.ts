'use client';

import { useRouter } from '@/i18n/navigation';
import { useCallback } from 'react';

export const useBackNavigation = (href: string = '/') => {
  const router = useRouter();

  return useCallback(() => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.replace(href);
  }, [router, href]);
};
