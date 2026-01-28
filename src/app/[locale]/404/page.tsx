'use client';

import { Button, CenteredMessage, Title } from '@/components';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <CenteredMessage>
      <Image src="/img/lex/404.webp" width="200" height="200" alt="WordKraft fox shows hush" />
      <Title align="center" size="h4">
        404 | Page not found
      </Title>
      <Button href="./" icon="arrow-right" full size="small" variant="green">
        Back to main page
      </Button>
    </CenteredMessage>
  );
}
