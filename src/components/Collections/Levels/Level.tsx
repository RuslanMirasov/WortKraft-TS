import { ILevel } from '@/types/data';

import { Link } from '@/i18n/navigation';
import { Icon } from '@/components';
import css from './Levels.module.scss';
import Image from 'next/image';

interface Props {
  data: ILevel;
}

const Level = ({ data }: Props) => {
  const { _id, level, title, subtitle, image, color } = data;

  return (
    <article className={css.Level} style={{ '--level-color': color } as React.CSSProperties}>
      <div className={css.Level__image}>
        <Link href={`./levels/${_id}`}>
          <Image src={image} alt={title} width="670" height="1005" loading="lazy" />
        </Link>
      </div>
      <div className={css.Level__text}>
        <div className={css.Level__number}>{level}</div>
        <div className={css.Level__title}>
          <h2>
            {title}
            {subtitle && <span>{subtitle}</span>}
          </h2>

          <b>100%</b>
        </div>
        <div className={css.Level__footer}>
          <span>14 themen</span>
          <span>158 wörter</span>
          <Link href={`./levels/${_id}`} className={css.ToLevelButton}>
            <Icon name="next" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Level;
