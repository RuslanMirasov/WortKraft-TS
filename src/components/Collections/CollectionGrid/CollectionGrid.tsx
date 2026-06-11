import { type ReactNode } from 'react';
import css from './CollectionGrid.module.scss';
import { Title } from '@/components';

interface Props {
  children: ReactNode;
  title?: string | null;
}

const CollectionGrid = ({ title = null, children }: Props) => {
  return (
    <div className={css.CollectionGrid}>
      {title && (
        <Title size="h1" tag="h1" className={css.Title}>
          {title}
        </Title>
      )}
      {children}
    </div>
  );
};

export default CollectionGrid;
