'use client';

import { Icon, LanguageSwitcher, Navigation, ButtonProfile, Text, ButtonMenu } from '../../components';
import { useSidebarStore } from '@/stores/sidebar-store';
import { usePopup } from '@/stores/popup-store';
import { useActiveRoute } from '@/shared/hooks/useActiveRoute';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import clsx from 'clsx';
import css from './Header.module.scss';

const Header = () => {
  const t = useTranslations('navigation');
  const { openPopup } = usePopup();
  const { isActivePage } = useActiveRoute();
  const minify = useSidebarStore(s => s.minify);
  const toggle = useSidebarStore(s => s.toggle);
  const isHidden = isActivePage('/race');

  const classes = clsx(css.Header, minify && css.Minify);

  if (isHidden) return;

  return (
    <header className={classes}>
      <div className={`${css.Inner} ${css.Bb} ${css.Btn}`}>
        <Link href="./" className={css.Logo}>
          <Icon name="logo" size="70" />
          <Text>kraft</Text>
        </Link>
        <button className={css.SideButton} onClick={toggle}>
          <Icon name="sidebar" size="20" />
        </button>
      </div>

      <div className={`${css.Inner} ${css.Bb}`}>
        <LanguageSwitcher />
      </div>

      <div className={`${css.Inner} ${css.Nav}`}>
        <Navigation />
      </div>

      <div className={css.ProfileButtons}>
        {/* <div className={`${css.Inner} ${css.Bt}`}>
          <ButtonMenu icon="login" onClick={() => openPopup('login')}>
            {t('login')}
          </ButtonMenu>
        </div> */}

        <div className={`${css.Inner} ${css.Bt}`}>
          <ButtonProfile />
        </div>

        <div className={`${css.Inner} ${css.Bt}`}>
          <ButtonMenu href="./admin" icon="admin" active={isActivePage('/admin')}>
            {t('admin')}
          </ButtonMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
