'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { GoBack, Hero, Title } from '@/components';

export default function CategoryPage() {
  const params = useParams();
  const t = useTranslations('navigation');

  const { category } = params;

  return (
    <div className="container">
      <Hero color="green">
        <GoBack />
        <Title tag="h1" size="h1">
          {category}
        </Title>
      </Hero>
    </div>
  );
}
