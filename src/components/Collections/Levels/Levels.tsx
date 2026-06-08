'use client';

import { ILevel } from '@/types/data';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import levels from '@/database/levels.json';
import { Title } from '@/components';
import Level from './Level';
import css from './Levels.module.scss';

const Levels = () => {
  const firstRef = useRef<HTMLLIElement>(null);
  const t = useTranslations('main-page');

  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  return (
    <>
      <Title tag="h1" size="h1" className={css.Title}>
        {t('title')}
      </Title>

      <ul className={css.Levels}>
        {(levels as ILevel[]).map((level, index) => (
          <li key={level._id} tabIndex={0} ref={index === 0 ? firstRef : null}>
            <Level data={level} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Levels;
