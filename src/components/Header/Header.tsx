'use client';

import { Icon, LanguageSwitcher, Navigation, ButtonProfile, Text, ButtonMenu } from '../../components';
import { usePopup } from '@/stores/popup-store';
import { useActiveRoute } from '@/shared/hooks/useActiveRoute';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import css from './Header.module.scss';

const Header = () => {
  const t = useTranslations('navigation');
  const { openPopup } = usePopup();
  const { isActivePage } = useActiveRoute();
  const isHidden = isActivePage('/race');
  const isHiddenNavigation = isActivePage('/onboarding');
  const { data: session } = useSession();

  if (isHidden) return null;

  const toggleSidebar = () => {
    const html = document.documentElement;
    const isMin = html.dataset.sidebar === 'min';
    const next = isMin ? 'full' : 'min';

    html.dataset.sidebar = next;
    document.cookie = `sidebar=${next}; path=/`;
  };

  return (
    <header className={css.Header}>
      <div className={`${css.Inner} ${css.Bb} ${css.Btn}`}>
        <Link href="./" className={css.Logo}>
          <Icon name="logo" size="70" />
          <Text>kraft</Text>
        </Link>
        <button className={css.SideButton} onClick={toggleSidebar}>
          <Icon name="sidebar" size="20" />
        </button>
      </div>

      <div className={`${css.Inner} ${css.Bb}`}>
        <LanguageSwitcher />
      </div>

      {!isHiddenNavigation && (
        <div className={`${css.Inner} ${css.Nav}`}>
          <Navigation />
        </div>
      )}

      <div className={css.ProfileButtons}>
        {!session?.user && (
          <div className={`${css.Inner} ${css.Bt}`}>
            <ButtonMenu icon="login" onClick={() => openPopup('login')}>
              {t('login')}
            </ButtonMenu>
          </div>
        )}

        {session?.user && (
          <div className={`${css.Inner} ${css.Bt}`}>
            <ButtonProfile />
          </div>
        )}

        {session?.user.role === 'admin' && (
          <div className={`${css.Inner} ${css.Bt}`}>
            <ButtonMenu href="/admin" icon="admin" active={isActivePage('/admin')}>
              {t('admin')}
            </ButtonMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
