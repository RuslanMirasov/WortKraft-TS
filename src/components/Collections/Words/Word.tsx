'use client';

import { AddToFavorites } from '@/components';
import clsx from 'clsx';
import css from './Words.module.scss';
import Link from 'next/link';

interface WordPropTypes {
  link: string;
  text: string;
  progress?: number;
}

const Word = ({ link, text, progress = 0 }: WordPropTypes) => {
  const classes = clsx(css.Word, progress === 100 && css.Green, progress !== 0 && css.Orange);
  return (
    <div className={classes}>
      <AddToFavorites />
      <Link href={link}>
        <span className={css.Text}>{text}</span>
        <span className={css.Progress}>{progress}%</span>
      </Link>
    </div>
  );
};

export default Word;
