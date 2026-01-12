'use client';

import type { HTMLAttributes } from 'react';
import { Icon } from '../../../components';
import Link from 'next/link';
import clsx from 'clsx';
import css from './ButtonMenu.module.scss';

interface ButtonMenuTypes extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string | null;
  icon?: string | null;
  active?: boolean;
}

const ButtonMenu: React.FC<ButtonMenuTypes> = ({ href = null, icon = null, active = false, children, onClick }) => {
  const classes = clsx(css.ButtonMenu, active && css.Active);

  return href ? (
    <Link href={href} className={classes}>
      <div className={css.Icon}>{icon && <Icon name={icon} />}</div>
      <p>{children}</p>
    </Link>
  ) : (
    <button className={classes} onClick={onClick}>
      <div className={css.Icon}>{icon && <Icon name={icon} />}</div>
      <p>{children}</p>
    </button>
  );
};

export default ButtonMenu;
