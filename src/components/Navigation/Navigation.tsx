'use client';

import { useTranslations } from 'next-intl';
import { useActiveRoute } from '@/shared/hooks/useActiveRoute';
import { ButtonMenu } from '../../components';
import css from './Navigation.module.scss';

const Navigation = () => {
  const t = useTranslations('navigation');
  const { isMainPage, isActivePage } = useActiveRoute();

  return (
    <nav className={css.Navigation}>
      <menu>
        <li>
          <ButtonMenu href="./" icon="home" active={isMainPage}>
            {t('library')}
          </ButtonMenu>
        </li>
        <li>
          <ButtonMenu href="./favorites" icon="bookmark" active={isActivePage('/favorites')}>
            {t('bookmarks')}
          </ButtonMenu>
        </li>
        <li>
          <ButtonMenu href="./search" icon="search" active={isActivePage('/search')}>
            {t('search')}
          </ButtonMenu>
        </li>
        <li>
          <ButtonMenu href="./statistic" icon="statistic" active={isActivePage('/statistic')}>
            {t('statistic')}
          </ButtonMenu>
        </li>
      </menu>
    </nav>
  );
};

export default Navigation;
