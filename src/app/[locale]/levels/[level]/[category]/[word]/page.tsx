'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Title } from '@/components';

export default function WordPage() {
  const params = useParams();
  const t = useTranslations('navigation');

  const { level, category, word } = params;

  return (
    <>
      <Title tag="h1" size="h1">
        Page: {level} / {category} / {word}
      </Title>
    </>
  );
}
