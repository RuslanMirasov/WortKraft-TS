'use client';

import { useTranslations } from 'next-intl';
import { Title, Hero, AudioPlayer } from '@/components';
import css from './Dialog.module.scss';
import Image from 'next/image';

interface dialogProps {
  textA: string;
  textB: string;
  audioA: string | null;
  audioB: string | null;
}

const Dialog = ({ textA, textB, audioA, audioB }: dialogProps) => {
  const t = useTranslations('room');

  return (
    <div>
      <Title tag="h2" size="h3">
        {t('example')}
      </Title>
      <Hero>
        <div className={css.Dialog}>
          <div className={`${css.Person} ${css.First}`}>
            <Image
              src={`/img/dialog/w-${Math.floor(Math.random() * 4) + 1}.png`}
              alt={textA}
              width={300}
              height={300}
            />
            <p>
              <span>{textA}</span>
            </p>
          </div>
          <div className={css.Person}>
            <Image
              src={`/img/dialog/m-${Math.floor(Math.random() * 3) + 1}.png`}
              alt={textB}
              width={300}
              height={300}
            />
            <p>
              <span>{textB}</span>
            </p>
          </div>
          {audioA && audioB && <AudioPlayer playlist={[audioA, audioB]} />}
        </div>
      </Hero>
    </div>
  );
};

export default Dialog;
