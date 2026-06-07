'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { usePopup } from '@/stores/popup-store';
import { normalizeLocalePath } from '@/shared/config/routes';
import { useUrlError } from '@/shared/hooks/useUrlError';

export const restoreAccount = async (token: string, callbackUrl: string) => {
  return signIn('restore-account', {
    token,
    redirect: false,
    callbackUrl,
  });
};

export const useRestoreAccountActions = () => {
  const closePopup = usePopup(state => state.closePopup);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setUrlError } = useUrlError();
  const [loading, setLoading] = useState(false);

  const getCallbackUrl = () => {
    const normalizedPath = normalizeLocalePath(pathname);
    if (normalizedPath === '/login') return '/';

    const params = new URLSearchParams(searchParams.toString());
    params.delete('error');
    params.delete('restoreToken');

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const handleRestore = async () => {
    const token = searchParams.get('restoreToken');
    if (!token) {
      setUrlError('AccauntRestoreFailed');
      return;
    }

    setLoading(true);

    try {
      const result = await restoreAccount(token, getCallbackUrl());

      if (result?.error) {
        setUrlError('AccauntRestoreFailed');
        return;
      }

      if (result?.url) {
        window.location.href = result.url;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('restoreToken');

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    closePopup();
  };

  return {
    handleRestore,
    handleCancel,
    loading,
  };
};
