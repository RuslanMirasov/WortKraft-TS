import { ILevel } from '@/types/data';

import levels from '@/database/levels.json';
import { Level } from '@/components';
import css from './Levels.module.scss';

const Levels = () => {
  return (
    <ul className={css.Levels}>
      {(levels as ILevel[]).map(level => (
        <li key={level._id}>
          <Level data={level} />
        </li>
      ))}
    </ul>
  );
};

export default Levels;
