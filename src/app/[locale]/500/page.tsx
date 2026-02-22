'use client';

import { CenteredMessage, Title } from '@/components';
import Image from 'next/image';

export default function ErrorPage() {
  return (
    <CenteredMessage>
      <Image src="/img/lex/500.webp" width="200" height="200" alt="WordKraft" />
      <Title align="center" size="h4">
        500 | Server error
      </Title>
    </CenteredMessage>
  );
}
