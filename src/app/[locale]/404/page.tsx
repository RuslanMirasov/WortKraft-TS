'use client';

import { useTranslations } from 'next-intl';
import { Button, CenteredMessage, Title, Text } from '@/components';
import { useBackNavigation } from '@/shared/hooks/useBackNavigation';
import Image from 'next/image';

export default function NotFoundPage() {
  const t = useTranslations('not-found-page');
  const goBack = useBackNavigation('/');

  return (
    <CenteredMessage>
      <Image src="/img/lex/404.webp" width="330" height="330" alt="WordKraft fox shows hush" />

      <Title align="center" size="h5">
        {t('title')}
      </Title>

      <Text size="small" align="center" color="grey">
        {t('subtitle')}
      </Text>

      <Button icon="arrow-right" full size="small" variant="green" onClick={goBack}>
        {t('button-text')}
      </Button>
    </CenteredMessage>
  );
}
