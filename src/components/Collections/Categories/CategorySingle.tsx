import React from 'react';
import { ICategoryCard } from '@/types/dto';
import { getTranslations } from 'next-intl/server';
import css from './Categories.module.scss';
import { GoBack, Title } from '@/components';

interface Props {
  data: ICategoryCard;
}

const CategorySingle = async ({ data }: Props) => {
  const t = await getTranslations('main-page');
  const { name, color, wordCount, progressPercent = null } = data;

  return (
    <article className={`${css.Category} ${css.Single}`} style={{ '--category-color': color } as React.CSSProperties}>
      <div className={css.Category__header}>
        <GoBack />
        <b>{progressPercent !== null ? `${progressPercent}%` : '0%'}</b>
      </div>
      <Title tag="h1" size="h1">
        {name}
      </Title>
      <ul className={css.Statistic}>
        <li>
          <span>
            {wordCount} {t('words')}
          </span>
        </li>
        <li>
          <span>0 {t('done')}</span>
        </li>
      </ul>
    </article>
  );
};

export default CategorySingle;
