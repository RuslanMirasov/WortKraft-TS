'use client';

import { signIn } from 'next-auth/react';
import { Button } from './../../../components';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

const ButtonGoogle = () => {
  const t = useTranslations();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') ?? '/';
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn('google', { callbackUrl });
  };

  return (
    <Button variant="google" size="small" icon="google" loading={isLoading} full onClick={handleGoogleLogin}>
      {t('google-btn-text')}
    </Button>
  );
};

export default ButtonGoogle;
