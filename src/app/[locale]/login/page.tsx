'use client';

import { useTranslations } from 'next-intl';
import { usePopup } from '@/stores/popup-store';
import { Button, CenteredMessage, Text } from '@/components';
import Image from 'next/image';

export default function LoginPage() {
  const t = useTranslations();
  const { openPopup } = usePopup();

  return (
    <CenteredMessage>
      <Image src="/img/lex/privat.webp" width="300" height="300" alt="WordKraft fox shows hush" />
      <Text align="center">{t('login-texts.please-login')}</Text>
      <Button icon="arrow-right" full size="small" variant="green" onClick={() => openPopup('login')}>
        {t('navigation.login')}
      </Button>
    </CenteredMessage>
  );
}
