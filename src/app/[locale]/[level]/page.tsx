'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Title } from '@/components';

export default function LavelPage() {
  const params = useParams();
  const t = useTranslations('navigation');

  const { level } = params;

  return (
    <>
      <Title tag="h1" size="h1">
        Lavel number {level}
      </Title>
    </>
  );
}
