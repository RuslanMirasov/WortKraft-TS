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

  UserAlreadyExists: {
    title: 'register-popup-error-title',
    text: 'UserAlreadyExists',
    action: 'login',
  },

  RegisterValidationError: {
    title: 'register-popup-error-title',
    text: 'RegisterValidationError',
  },

  ConsentsRequired: {
    title: 'register-popup-error-title',
    text: 'ConsentsRequired',
  },

  RegistrationFailed: {
    title: 'register-popup-error-title',
    text: 'RegistrationFailed',
  },

  OnboardingValidationError: {
    title: 'onboarding-popup-error-title',
    text: 'OnboardingValidationError',
  },

  OnboardingFailed: {
    title: 'onboarding-popup-error-title',
    text: 'default-popup-error-text',
  },

  ProfileUpdateFailed: {
    title: 'profile-update-error-title',
    text: 'ProfileUpdateFailed',
  },

  FormValidationError: {
    title: 'profile-update-error-title',
    text: 'FormValidationError',
  },

  PasswordUpdateFailed: {
    title: 'password-update-error-title',
    text: 'PasswordUpdateFailed',
  },

  OldPasswordRequired: {
    title: 'password-update-error-title',
    text: 'OldPasswordRequired',
  },

  InvalidOldPassword: {
    title: 'password-update-error-title',
    text: 'InvalidOldPassword',
  },

  ProfileDeleteFailed: {
    title: 'default-popup-error-title',
    text: 'ProfileDeleteFailed',
  },

  TooManyLoginAttempts: {
    title: 'access-popup-error-title',
    text: 'TooManyLoginAttempts',
    action: 'login',
  },

  Unauthorized: {
    title: 'access-popup-error-title',
    text: 'Unauthorized',
  },

  AccessDenied: {
    title: 'access-popup-error-title',
    text: 'AccessDenied',
  },

  Configuration: {
    text: 'Configuration',
  },

  UserNotFound: {
    title: 'default-popup-error-title',
    text: 'UserNotFound',
  },

  AccauntDeleted: {
    title: 'accaunt-deleted-popup-error-title',
    text: 'AccauntDeleted',
    buttonText: 'AccauntDeletedBtn',
    action: 'accaunt',
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

  const getErrorText = (key: string) => {
    if (!tErrors.has(key)) {
      return tErrors('default-popup-error-text');
    }

    return tErrors(key);
  };

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
      ...(config?.title && { title: getErrorText(config.title) }),
      ...(config?.text && { text: getErrorText(config.text) }),
      ...(config?.buttonText && { buttonText: getErrorText(config.buttonText) }),
      ...(config?.action && { buttonEvent: () => openPopup(config.action!) }),
      onClose: clearErrorFromUrl,
    };

    openPopup('error', options);
  }, [error, config, openPopup, tErrors, clearErrorFromUrl]);

  return null;
};

export default ErrorPopupController;
