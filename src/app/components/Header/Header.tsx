'use client';

import { Icon, LanguageSwitcher, Navigation, ButtonLogin, ButtonProfile } from '../../components';
import Link from 'next/link';
import { usePopup } from '@/stores/popup-store';
import { useTranslations } from 'next-intl';
import css from './Header.module.scss';

const Header = () => {
  const t = useTranslations('navigation');
  const { openPopup } = usePopup();
  return (
    <header className={css.Header}>
      <Link href="./" className={css.Logo}>
        <Icon name="logo" size="120" />
      </Link>
      <LanguageSwitcher />
      <Navigation />

      <div className={css.ProfileButtons}>
        <ButtonLogin onClick={() => openPopup('login')}>{t('login')}</ButtonLogin>
        <ButtonProfile />
      </div>
    </header>
  );
};

export default Header;
