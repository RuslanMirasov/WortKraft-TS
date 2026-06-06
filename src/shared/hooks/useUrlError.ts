'use client';

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';

export const useUrlError = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setUrlError = useCallback(
    (code: string, paramsToSet?: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('error', code);

      Object.entries(paramsToSet ?? {}).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return { setUrlError };
};
