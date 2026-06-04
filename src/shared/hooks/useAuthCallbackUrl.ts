'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { normalizeLocalePath } from '@/shared/config/routes';

const DEFAULT_CALLBACK_URL = '/';

const isSafeRelativeUrl = (url: string | null) => {
  return Boolean(url?.startsWith('/') && !url.startsWith('//'));
};

export const useAuthCallbackUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl');
  if (isSafeRelativeUrl(callbackUrl)) return callbackUrl!;

  const currentPath = pathname || DEFAULT_CALLBACK_URL;
  const normalizedPath = normalizeLocalePath(currentPath);

  if (normalizedPath === '/login') return DEFAULT_CALLBACK_URL;

  const query = searchParams.toString();
  return query ? `${currentPath}?${query}` : currentPath;
};
