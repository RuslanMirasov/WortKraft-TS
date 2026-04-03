'use client';

import { Link } from '@/i18n/navigation';
import { useActiveRoute } from '@/shared/hooks/useActiveRoute';
import { useTranslations } from 'next-intl';
import css from './Footer.module.scss';

const Footer = () => {
  const t = useTranslations('policy-terms');
  const { isActivePage } = useActiveRoute();
  const isHidden = isActivePage('/race');

  if (isHidden) return null;

  return (
    <footer className={css.Footer}>
      <p className={css.Copy}>&copy;WortKraft {new Date().getFullYear()}</p>
      <ul className={css.Links}>
        <li>
          <Link href="/policy">{t('policy')}</Link>
        </li>
        <li>
          <Link href="/terms">{t('terms')}</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
