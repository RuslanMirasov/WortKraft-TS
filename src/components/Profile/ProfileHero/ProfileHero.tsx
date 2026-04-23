'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Hero, Title, GoBack, Avatar, PrifileSkeleton } from '@/components';

const ProfileHero = () => {
  const t = useTranslations('profile');
  const { data: session, status = false } = useSession();

  if (status === 'loading') return <PrifileSkeleton />;
  if (!session) return;

  const { role, name, email, image } = session?.user;

  return (
    <Hero>
      <GoBack />
      <Title tag="h1" size="h1">
        {t('greeting')}
        <br />
        {name || email}
      </Title>
      <Avatar email={email ?? ''} name={name} image={image} role={role} size="big" />
    </Hero>
  );
};

export default ProfileHero;
