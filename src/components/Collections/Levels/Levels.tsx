import { ILevelCard } from '@/types/dto';
import { getTranslations } from 'next-intl/server';
import { Title } from '@/components';
import LevelFocus from './LevelFocus';
import Level from './Level';
import css from './Levels.module.scss';

interface LevelsProps {
  levels: ILevelCard[];
}

const Levels = async ({ levels }: LevelsProps) => {
  const t = await getTranslations('main-page');

  return (
    <>
      <Title tag="h1" size="h1" className={css.Title}>
        {t('title')}
      </Title>
      <LevelFocus className={css.Levels}>
        {levels.map(level => (
          <li key={level._id} tabIndex={0} data-id={level._id}>
            <Level data={level} />
          </li>
        ))}
      </LevelFocus>
    </>
  );
};

export default Levels;
