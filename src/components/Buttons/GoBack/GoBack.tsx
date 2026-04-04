'use client';

import { useBackNavigation } from '@/shared/hooks/useBackNavigation';
import { Icon } from '@/components';
import css from './GoBack.module.scss';

const GoBack = () => {
  const goBack = useBackNavigation('/');

  return (
    <button className={css.GoBack} onClick={goBack}>
      <Icon name="go-back" />
    </button>
  );
};

export default GoBack;
