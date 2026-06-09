import { getLevels } from '@/shared/lib/data';
import { getTranslations } from 'next-intl/server';
import { Title } from '@/components';
import LevelFocus from './LevelFocus';
import Level from './Level';
import css from './Levels.module.scss';

const Levels = async () => {
  const levels = getLevels();
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
