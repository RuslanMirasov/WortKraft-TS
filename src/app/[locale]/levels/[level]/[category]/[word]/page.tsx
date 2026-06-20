'use client';

import { useParams } from 'next/navigation';
import { GoBack, Hero, Title } from '@/components';

export default function WordPage() {
  const params = useParams();

  const { word } = params;

  return (
    <div className="container">
      <Hero>
        <GoBack />
        <Title tag="h1" size="h1">
          {word}
        </Title>
      </Hero>
    </div>
  );
}
