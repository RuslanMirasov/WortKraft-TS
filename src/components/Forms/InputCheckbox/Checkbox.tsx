'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '../..';
import css from './InputCheckbox.module.scss';

type CheckboxProps = {
  name?: string;
  children?: React.ReactNode;
  error?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ name, children, error, disabled, checked = false, onChange }) => {
  const tErrors = useTranslations('errors');

  return (
    <label className={`${css.Checkbox} ${disabled ? css.Disabled : ''}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={event => onChange?.(event.target.checked)}
      />

      <div className={css.Label}>
        <Icon name="checkbox" fill="var(--white)" stroke="2" />
        {children}
      </div>

      {error && <p className={css.Error}>{tErrors(error)}</p>}
    </label>
  );
};

export default Checkbox;
