'use client';

import { useTranslations } from 'next-intl';
import { CenteredMessage, Title, Text, Button } from '@/components';
import Image from 'next/image';

export default function ErrorPage() {
  const t = useTranslations('server-error-page');

  return (
    <CenteredMessage>
      <Image src="/img/lex/500.webp" width="330" height="330" alt="WordKraft" />

      <Title align="center" size="h5">
        {t('title')}
      </Title>

      <Text size="small" align="center" color="grey">
        {t('subtitle')}
      </Text>

      <Button href="/" icon="arrow-right" full size="small" variant="green">
        {t('button-text')}
      </Button>
    </CenteredMessage>
  );
}
