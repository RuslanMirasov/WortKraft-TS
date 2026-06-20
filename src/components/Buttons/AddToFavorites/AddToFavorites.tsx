'use client';

import { Icon } from '@/components';
import css from './AddToFavorites.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

const AddToFavorites = () => {
  const [isActive, setIsActive] = useState(false);
  const classes = clsx(css.AddToFavorites, isActive && css.Active);

  return (
    <button type="button" className={classes} onClick={() => setIsActive(!isActive)}>
      <Icon name="bookmark" size="32" fill={isActive ? 'currentColor' : ''} />
    </button>
  );
};

export default AddToFavorites;
