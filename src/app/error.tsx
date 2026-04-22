'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLocaleFromPathname } from '@/shared/config/routes';

export default function GlobalError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);

    const pathname = window.location.pathname;
    const locale = getLocaleFromPathname(pathname) ?? 'de';

    router.replace(`/${locale}/500`);
  }, [error, router]);

  return null;
}
