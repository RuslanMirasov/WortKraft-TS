import { useTranslations } from 'next-intl';
import { ButtonMenu } from '../../components';
import css from './Navigation.module.scss';

const Navigation = () => {
  const t = useTranslations('navigation');

  return (
    <nav className={css.Navigation}>
      <menu>
        <li>
          <ButtonMenu href="./" icon="home">
            {t('library')}
          </ButtonMenu>
        </li>
        <li>
          <ButtonMenu href="./bookmarks" icon="bookmark">
            {t('bookmarks')}
          </ButtonMenu>
        </li>
        <li>
          <ButtonMenu href="./search" icon="search">
            {t('search')}
          </ButtonMenu>
        </li>
        <li>
          <ButtonMenu href="./statistic" icon="statistic">
            {t('statistic')}
          </ButtonMenu>
        </li>
      </menu>
    </nav>
  );
};

export default Navigation;
