import type { CSSProperties } from 'react';
import css from './Skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
  margin?: string;
}

type SkeletonStyle = CSSProperties & {
  '--skeleton-width': string;
  '--skeleton-height': string;
  '--skeleton-radius': string;
  '--skeleton-margin': string;
};

const Skeleton = ({ width = '100%', height = '100%', radius = '100px', margin = 'none' }: SkeletonProps) => {
  const style: SkeletonStyle = {
    '--skeleton-width': width,
    '--skeleton-height': height,
    '--skeleton-radius': radius,
    '--skeleton-margin': margin,
  };

  return <div className={css.Skeleton} style={style}></div>;
};

export default Skeleton;
