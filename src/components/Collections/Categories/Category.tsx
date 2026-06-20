import React from 'react';
import { ICategoryCard } from '@/types/dto';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components';
import css from './Categories.module.scss';

interface Props {
  data: ICategoryCard;
}

const Category = async ({ data }: Props) => {
  const t = await getTranslations('main-page');
  const { level, name, slug, color, wordCount } = data;

  return (
    <article className={css.Category} style={{ '--category-color': color } as React.CSSProperties}>
      <h2 className={css.Title}>{name}</h2>
      <ul className={css.Statistic}>
        <li>
          <span>{wordCount} {t('words')}</span>
        </li>
        <li>
          <span>0 {t('done')}</span>
        </li>
        <li>
          <Link href={`./${level}/${slug}`} className={css.NextButton}>
            <Icon name="next" />
          </Link>
        </li>
      </ul>
    </article>
  );
};

export default Category;
