'use client';

import { useTranslations } from 'next-intl';
import { Title } from '@/components';

export default function Home() {
  const t = useTranslations('navigation');

  return (
    <section>
      <div className="container">
        <Title tag="h1" size="h1">
          Wählen Sie ein Buch
        </Title>
      </div>
    </section>
  );
}
