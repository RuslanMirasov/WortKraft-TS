'use client';

import React from 'react';
import { ILevelCard } from '@/types/dto';
import { useTranslations } from 'next-intl';
import { GoBack } from '@/components';
import clsx from 'clsx';
import css from './Levels.module.scss';
import Image from 'next/image';

interface Props {
  data: ILevelCard;
  className?: string;
}

const LevelSingle = ({ data, className }: Props) => {
  const t = useTranslations('main-page');
  const classes = clsx(css.Level, css.Single, className);
  const { level, title, subtitle, image, color, categoryCount, wordCount, progressPercent } = data;

  return (
    <article className={classes} style={{ '--level-color': color } as React.CSSProperties}>
      <div className={css.Level__header}>
        <GoBack />
        <b>{progressPercent !== null ? `${progressPercent}%` : '0%'}</b>
      </div>
      <div className={css.Level__text}>
        <div className={css.Level__title}>
          <h2>
            {title}
            {subtitle && <span>{subtitle}</span>}
          </h2>
        </div>
        <div className={css.Level__footer}>
          <span>{level}</span>
          <span>
            {categoryCount} {t('themes')}
          </span>
          <span>
            {wordCount} {t('words')}
          </span>
        </div>
      </div>
      <div className={css.Level__thumbnail}>
        <Image src={image} alt={title} width="670" height="1005" loading="eager" />
      </div>
    </article>
  );
};

export default LevelSingle;
