import type { HTMLAttributes, MouseEvent } from 'react';
import clsx from 'clsx';
import css from './Text.module.scss';
import Link from 'next/link';

interface TextPropTypes extends HTMLAttributes<HTMLDivElement> {
  color?: 'green' | 'red' | 'orange' | 'white' | 'grey' | 'grey-light' | 'black';
  align?: 'center' | 'right';
  size?: 'big' | 'small' | 'subtitle';
  light?: boolean;
  children: React.ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const Text: React.FC<TextPropTypes> = ({ color, align, size, light, children, className, href, onClick }) => {
  const classes = clsx(
    css.Text,
    color === 'green' && css.Green,
    color === 'red' && css.Red,
    color === 'orange' && css.Orange,
    color === 'white' && css.White,
    color === 'grey' && css.Grey,
    color === 'grey-light' && css.GreyLight,
    color === 'black' && css.Black,
    size === 'small' && css.Small,
    size === 'big' && css.Big,
    size === 'subtitle' && css.Subtitle,
    align === 'center' && css.Center,
    align === 'right' && css.Right,
    light && css.Light,
    onClick && css.Clickable,
    href && css.Clickable,
    className
  );
  return href ? (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <p className={classes} onClick={onClick}>
      {children}
    </p>
  );
};

export default Text;
