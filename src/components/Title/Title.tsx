import type { JSX } from 'react';
import clsx from 'clsx';
import css from './Title.module.scss';

interface TitlePropTypes {
  tag?: keyof JSX.IntrinsicElements;
  color?: 'green' | 'red' | 'orange' | 'white' | 'grey' | 'grey-light' | 'black';
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  align?: 'center' | 'right';
  children: React.ReactNode;
}

const Title: React.FC<TitlePropTypes> = ({ tag = 'b', align, size, color, children }) => {
  const Tag = tag;
  const classes = clsx(
    css.Title,
    color === 'green' && css.Green,
    color === 'red' && css.Red,
    color === 'orange' && css.Orange,
    color === 'white' && css.White,
    color === 'grey' && css.Grey,
    color === 'grey-light' && css.GreyLight,
    color === 'black' && css.Black,
    size === 'h1' && css.H1,
    size === 'h2' && css.H2,
    size === 'h3' && css.H3,
    size === 'h4' && css.H4,
    size === 'h5' && css.H5,
    size === 'h6' && css.H6,
    align === 'center' && css.Center,
    align === 'right' && css.Right
  );

  return <Tag className={classes}>{children}</Tag>;
};

export default Title;
