'use client';

import React from 'react';
import { ILevelCard } from '@/types/dto';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components';
import clsx from 'clsx';
import css from './Levels.module.scss';
import Image from 'next/image';

interface Props {
  data: ILevelCard;
  className?: string;
}

const Level = ({ data, className }: Props) => {
  const t = useTranslations('main-page');
  const classes = clsx(css.Level, className);

  const { level, title, subtitle, image, color, categoryCount, wordCount, progressPercent } = data;

  return (
    <article className={classes} style={{ '--level-color': color } as React.CSSProperties}>
      <div className={css.Level__image}>
        <Link href={`./levels/${level}`}>
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
          <b>{progressPercent !== null ? `${progressPercent}%` : '0%'}</b>
        </div>
        <div className={css.Level__footer}>
          <span>
            {categoryCount} {t('themes')}
          </span>
          <span>
            {wordCount} {t('words')}
          </span>
          <Link href={`./levels/${level}`} className={css.ToLevelButton}>
            <Icon name="next" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Level;
