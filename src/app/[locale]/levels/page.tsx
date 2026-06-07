'use client';

import { Levels, Title } from '@/components';

export default function Home() {
  return (
    <section>
      <div className="container">
        <Title tag="h1" size="h1">
          Wählen Sie ein Buch
        </Title>

        <Levels />
      </div>
    </section>
  );
}
