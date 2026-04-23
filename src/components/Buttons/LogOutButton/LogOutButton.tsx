'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components';

const LogOutButton = () => {
  const t = useTranslations('profile');
  const [logoutLoading, setLogoutLoading] = useState(false);

  const onLogOutButtonClick = async () => {
    setLogoutLoading(true);

    try {
      await signOut();
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <Button icon="login" size="small" full onClick={onLogOutButtonClick} loading={logoutLoading}>
      {t('logout-button-text')}
    </Button>
  );
};

export default LogOutButton;
