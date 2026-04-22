'use client';

import { useSession } from 'next-auth/react';
import { Button, Title, Skeleton } from '@/components';
import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';
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
          <Button icon="login" size="small" full onClick={() => signOut()}>
            {t('logout-button-text')}
          </Button>
          <Button icon="user" size="small" full variant="red" onClick={() => console.log('Удаляем аккаунт')}>
            {t('delete-button-text')}
          </Button>
        </>
      )}
    </aside>
  );
};

export default ProfileSidebar;
