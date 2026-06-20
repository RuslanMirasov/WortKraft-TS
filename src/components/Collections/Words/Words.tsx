'use client';

import React from 'react';
import css from './Words.module.scss';

interface WordsPropTypes {
  children: React.ReactNode;
}

const Words = ({ children }: WordsPropTypes) => {
  return <ul className={css.Words}>{children}</ul>;
};

export default Words;
