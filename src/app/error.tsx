'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocaleFromPathname } from '@/shared/config/routes';

export default function GlobalError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.error(error);

    const locale = getLocaleFromPathname(pathname) ?? 'de';

    router.replace(`/${locale}/500`);
  }, [error, pathname, router]);

  return null;
}
