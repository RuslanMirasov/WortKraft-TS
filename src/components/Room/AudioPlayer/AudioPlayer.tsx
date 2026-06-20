'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components';
import css from './AudioPlayer.module.scss';
import { useRef, useState } from 'react';

interface AudioPlayerProps {
  playlist: string[];
}

const AudioPlayer = ({ playlist }: AudioPlayerProps) => {
  const t = useTranslations('room');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const stoppedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = () => {
    stoppedRef.current = true;
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const play = async () => {
    if (isPlaying) {
      stop();
      return;
    }

    stoppedRef.current = false;
    setIsLoading(true);
    const audios = playlist.map(src => new Audio(src));
    await Promise.all(
      audios.map(
        a =>
          new Promise<void>(res => {
            a.oncanplaythrough = () => res();
            a.load();
          })
      )
    );
    setIsLoading(false);
    setIsPlaying(true);

    for (let i = 0; i < audios.length; i++) {
      if (stoppedRef.current) return;
      audioRef.current = audios[i];
      await new Promise<void>(res => {
        audios[i].onended = () => res();
        audios[i].play();
      });
      if (i < audios.length - 1 && !stoppedRef.current)
        await new Promise(res => setTimeout(res, 500));
    }

    setIsPlaying(false);
  };

  return (
    <div className={css.AudioPlayer}>
      <Button
        icon={isPlaying ? 'stop' : 'sound'}
        full
        variant="green"
        loading={isLoading}
        onClick={play}
      >
        {isPlaying ? t('stop') : t('play')}
      </Button>
    </div>
  );
};

export default AudioPlayer;
