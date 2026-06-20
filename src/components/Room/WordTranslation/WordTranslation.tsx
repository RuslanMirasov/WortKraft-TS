'use client';

import { GoBack, AddToFavorites, AudioPlayer } from '@/components';
import clsx from 'clsx';
import css from './WordTranslation.module.scss';

interface WordTranslationProps {
  text: string;
  color?: string;
  audio?: string | null;
  translation: string;
}

const WordTranslation = ({
  text,
  color = 'black',
  audio = null,
  translation,
}: WordTranslationProps) => {
  const textClasses = clsx(
    css.Text,
    color === 'red' && css.Red,
    color === 'green' && css.Green,
    color === 'blue' && css.Blue
  );

  return (
    <div className={css.WordTranslation}>
      <div className={css.Header}>
        <GoBack />
        <AddToFavorites />
      </div>
      <h1 className={textClasses}>{text}</h1>
      <p className={css.Translation}>{translation}</p>
      {audio && <AudioPlayer playlist={[audio]} />}
    </div>
  );
};

export default WordTranslation;
