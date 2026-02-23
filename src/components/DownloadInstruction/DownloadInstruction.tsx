'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@/components';
import css from './DownloadInstruction.module.scss';

const DownloadInstruction = () => {
  const t = useTranslations('download-app');

  return (
    <div className={css.DownloadInstruction}>
      <div className={css.Inner}>
        <span>{t('tap-share')}</span> <Icon name="schare" stroke="var(--green)" size="24" />
      </div>

      <Icon name="arrow" size="20" stroke="var(--green)" />

      <div className={css.Inner}>
        <span>{t('add-to-main-screen')}</span>
      </div>
    </div>
  );
};

export default DownloadInstruction;
