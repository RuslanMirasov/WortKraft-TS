'use client';

import { signIn } from 'next-auth/react';
import { Icon } from './../../../components';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import './ButtonGoogle.scss';

const ButtonGoogle = () => {
  const t = useTranslations();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') ?? '/';

  return (
    <button className="gsi-material-button" onClick={() => signIn('google', { callbackUrl })}>
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <Icon name="google" />
        </div>
        <span className="gsi-material-button-contents">{t('google-btn-text')}</span>
      </div>
    </button>
  );
};

export default ButtonGoogle;
