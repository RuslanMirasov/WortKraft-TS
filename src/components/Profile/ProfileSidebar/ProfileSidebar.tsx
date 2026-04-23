'use client';

import { useSession } from 'next-auth/react';
import { Title, Skeleton, LogOutButton, DeleteAccountButton } from '@/components';
import { useTranslations } from 'next-intl';

import css from './ProfileSidebar.module.scss';

const ProfileSidebar = () => {
  const { status } = useSession();
  const t = useTranslations('profile');

  return (
    <aside className={css.ProfileSidebar}>
      <Title tag="h2" size="h3">
        {t('logout-settings-title')}
      </Title>
      <hr />

      {status === 'loading' && (
        <>
          <Skeleton height="48px" radius="48px" />
          <Skeleton height="48px" radius="48px" />
        </>
      )}

      {status !== 'loading' && (
        <>
          <LogOutButton />
          <DeleteAccountButton />
        </>
      )}
    </aside>
  );
};

export default ProfileSidebar;
