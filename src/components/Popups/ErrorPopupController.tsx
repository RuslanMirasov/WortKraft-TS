'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { usePopup } from '@/stores/popup-store';
import type { Popup } from '@/types/popup';

type ErrorPopupConfig = {
  icon?: string;
  title?: string;
  text?: string;
  buttonText?: string;
  action?: Popup['id'];
};

const ERRORS: Record<string, ErrorPopupConfig> = {
  CredentialsSignin: {
    title: 'login-popup-error-title',
    text: 'CredentialsSignin',
    action: 'login',
  },
};

const ErrorPopupController = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const error = searchParams.get('error');
  const tErrors = useTranslations('errors');
  const openPopup = usePopup(state => state.openPopup);
  const openedErrorRef = useRef<string | null>(null);

  const config = error ? ERRORS[error] : undefined;

  const clearErrorFromUrl = useCallback(() => {
    const params = new URLSearchParams(search);

    params.delete('error');

    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, search]);

  useEffect(() => {
    if (!error) {
      openedErrorRef.current = null;
      return;
    }

    if (openedErrorRef.current === error) return;

    openedErrorRef.current = error;

    const options = {
      freeze: true,
      ...(config?.icon && { icon: config.icon }),
      ...(config?.title && { title: tErrors(config.title) }),
      ...(config?.text && { text: tErrors(config.text) }),
      ...(config?.buttonText && { buttonText: tErrors(config.buttonText) }),
      ...(config?.action && { buttonEvent: () => openPopup(config.action!) }),
      onClose: clearErrorFromUrl,
    };

    openPopup('error', options);
  }, [error, config, openPopup, tErrors, clearErrorFromUrl]);

  return null;
};

export default ErrorPopupController;
