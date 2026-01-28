'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function GlobalError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.error(error);

    const match = pathname.match(/^\/(de|en|uk)(\/|$)/);
    const locale = match?.[1] ?? 'de';

    router.replace(`/${locale}/500`);
  }, [error, pathname, router]);

  return null;
}
