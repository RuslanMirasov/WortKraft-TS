'use client';
import { ILevel } from '@/types/data';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components';
import clsx from 'clsx';
import css from './Levels.module.scss';
import Image from 'next/image';

interface Props {
  data: ILevel;
  className?: string;
}

const Level = ({ data, className }: Props) => {
  const t = useTranslations('main-page');
  const classes = clsx(css.Level, className);
  const { _id, level, title, subtitle, image, color } = data;

  return (
    <article className={classes} style={{ '--level-color': color } as React.CSSProperties}>
      <div className={css.Level__image}>
        <Link href={`./levels/${_id}`}>
          <Image src={image} alt={title} width="670" height="1005" loading="eager" />
        </Link>
      </div>
      <div className={css.Level__text}>
        <div className={css.Level__number}>{level}</div>
        <div className={css.Level__title}>
          <h2>
            {title}
            {subtitle && <span>{subtitle}</span>}
          </h2>

          <b>100%</b>
        </div>
        <div className={css.Level__footer}>
          <span>14 {t('themes')}</span>
          <span>158 {t('words')}</span>
          <Link href={`./levels/${_id}`} className={css.ToLevelButton}>
            <Icon name="next" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Level;
