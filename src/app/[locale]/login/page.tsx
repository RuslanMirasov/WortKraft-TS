'use client';

import { useTranslations } from 'next-intl';
import { usePopup } from '@/stores/popup-store';
import { getErrorTextTranslation } from '@/shared/lib/getErrorTextTranslation';
import { Button, CenteredMessage, Text } from '@/components';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const params = useSearchParams();
  const error = params.get('error');
  const t = useTranslations();
  const tErrors = useTranslations('errors');
  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    if (error) {
      openPopup('error', {
        freeze: true,
        title: tErrors('login-popup-error-title'),
        text: getErrorTextTranslation(tErrors, error),
        buttonEvent: () => openPopup('login'),
      });
    }
  }, [error, openPopup]);

  return (
    <CenteredMessage>
      <Image src="/img/lex/privat.webp" width="300" height="300" alt="WordKraft fox shows hush" loading="eager" />
      <Text align="center">{t('login-texts.please-login')}</Text>
      <Button icon="arrow-right" full size="small" variant="green" onClick={() => openPopup('login')}>
        {t('navigation.login')}
      </Button>
    </CenteredMessage>
  );
}
